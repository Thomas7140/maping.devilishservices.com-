using System.Buffers.Binary;
using System.Security.Cryptography;

namespace DevilishServices.DfbhdUpdater;

internal sealed record PatchReport(
    byte[] Image,
    bool Changed,
    IReadOnlyList<string> Notes);

internal static class PatchEngine
{
    public const string Version = "1.8.0.1";

    public const string StockBhdSha256 =
        "693676B5FB96012D32EE395AC23B4A8BF4D7DD9A9F25AE8E500749A2F0DF34EA";

    private const uint ListFind = 0x432E50;
    private const uint CaveClient = 0x5E4860;
    private const uint CaveServer = 0x5E48D0;
    private const uint CaveNpc = 0x5E4C00;

    private const byte MinQueued = 6;
    private const byte MaxLag = 32;

    private const uint ClientList = 0x71F3A8;
    private const uint ClientHead = 0x71F3C0;
    private const uint ClientCount = 0x71F3C8;
    private const uint ClientCursor = 0x71F4F4;
    private const uint ClientHighest = 0x71F4F8;

    private const int ServerCursorRelative = 0x6984 - 0xADB48;
    private const int ServerHighestRelative = 0x6988 - 0xADB48;

    private const uint NpcSite = 0x477426;
    private const uint NpcContinue = 0x47742C;
    private const uint NpcJoin = 0x4774B3;
    private const uint NetHost = 0x9F2190;

    public static string Sha256(byte[] data) =>
        Convert.ToHexString(SHA256.HashData(data));

    public static PatchReport BuildPatchedImage(
        UpdateProfile profile,
        byte[] original,
        GraphicsOptions? graphics = null)
    {
        byte[] data = (byte[])original.Clone();
        var notes = new List<string>();
        bool changed = false;

        var pe = new PeImage(data);

        if (!pe.IsX86)
            throw new InvalidDataException("dfbhd.exe is not a 32-bit x86 PE executable.");

        string inputHash = Sha256(original);

        if (profile == UpdateProfile.DfbhdTs)
        {
            changed |= ApplyLargeAddressAware(data, notes);

            if (graphics is not null &&
                !string.Equals(
                    graphics.ResolutionPreset,
                    "Game default",
                    StringComparison.OrdinalIgnoreCase))
            {
                changed |= ApplyResolutionOverride(
                    data,
                    graphics,
                    notes);
            }

            notes.Add("Team Sabre safety mode: BHD fixed-address gameplay/network patches were not applied.");
            notes.Add("Team Sabre receives LAA, the validated resolution signature patch, and the client graphics compatibility layer.");
            return new PatchReport(data, changed, notes);
        }

        if (inputHash == StockBhdSha256)
            notes.Add("Detected stock DFBHD v1.5.0.5 baseline.");
        else
            notes.Add("Using expected-byte validation for a signature-compatible DFBHD derivative.");

        changed |= ApplyMissionMemory512(data, notes);
        changed |= ApplyLargeAddressAware(data, notes);
        changed |= ApplyOrderedHoleSkip(data, notes);

        if (profile == UpdateProfile.DfbhdServer)
        {
            changed |= ApplyServer125Hz(data, notes);
        }
        else
        {
            changed |= ApplyClientNpcNavigationSkip(data, notes);

            if (graphics is not null &&
                !string.Equals(
                    graphics.ResolutionPreset,
                    "Game default",
                    StringComparison.OrdinalIgnoreCase))
            {
                changed |= ApplyResolutionOverride(
                    data,
                    graphics,
                    notes);
            }
        }

        return new PatchReport(data, changed, notes);
    }

    private static bool ApplyResolutionOverride(
        byte[] data,
        GraphicsOptions graphics,
        List<string> notes)
    {
        int width = graphics.Width;
        int height = graphics.Height;

        if (width < 640 || width > 16384 ||
            height < 480 || height > 8640)
        {
            throw new InvalidDataException(
                $"Invalid custom render resolution {width}x{height}.");
        }

        // Known BHD/Team Sabre 1.5.0.5 widescreen signature:
        // EB 42 BF [width dword] BE [height dword] EB 36 BF
        // The original values are 1024x768. We keep the surrounding
        // instruction signature fixed and allow the two immediates to vary
        // so an already-patched executable can be safely updated.
        var matches = new List<int>();

        for (int i = 0; i <= data.Length - 15; i++)
        {
            if (data[i] == 0xEB &&
                data[i + 1] == 0x42 &&
                data[i + 2] == 0xBF &&
                data[i + 7] == 0xBE &&
                data[i + 12] == 0xEB &&
                data[i + 13] == 0x36 &&
                data[i + 14] == 0xBF)
            {
                matches.Add(i);
            }
        }

        if (matches.Count != 1)
        {
            throw new InvalidDataException(
                $"Resolution signature validation failed: expected exactly one match, found {matches.Count}. No resolution bytes were written.");
        }

        int offset = matches[0];
        int currentWidth =
            BinaryPrimitives.ReadInt32LittleEndian(
                data.AsSpan(offset + 3, 4));

        int currentHeight =
            BinaryPrimitives.ReadInt32LittleEndian(
                data.AsSpan(offset + 8, 4));

        if (currentWidth == width &&
            currentHeight == height)
        {
            notes.Add(
                $"Resolution override: already {width}x{height}.");
            return false;
        }

        if (currentWidth < 320 || currentWidth > 16384 ||
            currentHeight < 200 || currentHeight > 8640)
        {
            throw new InvalidDataException(
                $"Resolution signature matched, but existing dimensions {currentWidth}x{currentHeight} are not plausible. No resolution bytes were written.");
        }

        BinaryPrimitives.WriteInt32LittleEndian(
            data.AsSpan(offset + 3, 4),
            width);

        BinaryPrimitives.WriteInt32LittleEndian(
            data.AsSpan(offset + 8, 4),
            height);

        notes.Add(
            $"Resolution override: {currentWidth}x{currentHeight} -> {width}x{height}.");

        return true;
    }

    private static bool ApplyMissionMemory512(byte[] data, List<string> notes)
    {
        return ApplyVa(
            data,
            0x469572,
            Hex("00 00 00 06"),
            Hex("00 00 00 20"),
            "Mission memory pool: 96 MB -> 512 MB",
            notes);
    }

    private static bool ApplyLargeAddressAware(byte[] data, List<string> notes)
    {
        var pe = new PeImage(data);
        int offset = pe.CharacteristicsOffset;

        ushort current =
            BinaryPrimitives.ReadUInt16LittleEndian(
                data.AsSpan(offset, 2));

        if ((current & 0x20) != 0)
        {
            notes.Add("Large Address Aware: already enabled.");
            return false;
        }

        ushort updated = (ushort)(current | 0x20);

        BinaryPrimitives.WriteUInt16LittleEndian(
            data.AsSpan(offset, 2),
            updated);

        notes.Add($"Large Address Aware: 0x{current:X4} -> 0x{updated:X4}.");
        return true;
    }

    private static bool ApplyServer125Hz(byte[] data, List<string> notes)
    {
        bool changed = false;

        changed |= ApplyVa(
            data,
            0x431959,
            Hex("77"),
            Hex("EB"),
            "Server scheduler: force default holdoff branch",
            notes);

        int holdoffOffset = new PeImage(data).VaToOffset(0x4319D3);
        byte holdoff = data[holdoffOffset];

        if (holdoff == 0x01)
        {
            notes.Add("Server scheduler: one-tick holdoff already selected (~125 Hz).");
        }
        else if (holdoff == 0x02)
        {
            data[holdoffOffset] = 0x01;
            changed = true;
            notes.Add("Server scheduler: two-tick holdoff -> one tick (~125 Hz).");
        }
        else
        {
            throw Unexpected(
                "server holdoff",
                0x4319D3,
                new byte[] { 0x01, 0x02 },
                new byte[] { holdoff });
        }

        changed |= ApplyVa(
            data,
            0x431987,
            Hex("75 14 8B 4D 0C 85 C9 B8 0C 00 00 00 74 46 C7 01 01 00 00 00 5D C3"),
            Hex("66 90 90 90 90 66 90 90 90 90 90 90 66 90 90 90 90 90 90 90 90 90"),
            "Server scheduler: unreachable 12-tick block disabled",
            notes);

        return changed;
    }

    private static bool ApplyOrderedHoleSkip(byte[] data, List<string> notes)
    {
        bool changed = false;

        changed |= EnsureTextVirtualSize(data, notes);

        byte[] caveClient = BuildClientHoleSkipCave();
        byte[] caveServer = BuildServerHoleSkipCave();

        changed |= ApplyRaw(
            data,
            checked((int)(CaveClient - 0x400000)),
            new byte[caveClient.Length],
            caveClient,
            "Reliable ordered channel: client hole-skip cave",
            notes);

        changed |= ApplyRaw(
            data,
            checked((int)(CaveServer - 0x400000)),
            new byte[caveServer.Length],
            caveServer,
            "Reliable ordered channel: server hole-skip cave",
            notes);

        changed |= ApplyVa(
            data,
            0x424015,
            CallBytes(0x424015, ListFind),
            CallBytes(0x424015, CaveClient),
            "Client drain ListFind -> hole-skip cave",
            notes);

        changed |= ApplyVa(
            data,
            0x424051,
            CallBytes(0x424051, ListFind),
            CallBytes(0x424051, CaveClient),
            "Client drain loop ListFind -> hole-skip cave",
            notes);

        changed |= ApplyVa(
            data,
            0x4AAAAF,
            CallBytes(0x4AAAAF, ListFind),
            CallBytes(0x4AAAAF, CaveServer),
            "Server drain ListFind -> hole-skip cave",
            notes);

        changed |= ApplyVa(
            data,
            0x4AAAEB,
            CallBytes(0x4AAAEB, ListFind),
            CallBytes(0x4AAAEB, CaveServer),
            "Server drain loop ListFind -> hole-skip cave",
            notes);

        return changed;
    }

    private static bool ApplyClientNpcNavigationSkip(byte[] data, List<string> notes)
    {
        bool changed = false;

        changed |= EnsureTextVirtualSize(data, notes);

        byte[] cave = BuildNpcCave();

        changed |= ApplyRaw(
            data,
            checked((int)(CaveNpc - 0x400000)),
            new byte[cave.Length],
            cave,
            "Client co-op NPC replication: Net_Host gate cave",
            notes);

        byte[] oldSite = Concat(
            new byte[] { 0x0F, 0x85 },
            Rel32Bytes(unchecked((int)(NpcSite + 6)), unchecked((int)NpcJoin)));

        byte[] newSite = Concat(
            new byte[] { 0xE9 },
            Rel32Bytes(unchecked((int)(NpcSite + 5)), unchecked((int)CaveNpc)),
            new byte[] { 0x90 });

        changed |= ApplyVa(
            data,
            NpcSite,
            oldSite,
            newSite,
            "Client NPC navigation: host-only gate",
            notes);

        return changed;
    }

    private static bool EnsureTextVirtualSize(byte[] data, List<string> notes)
    {
        var pe = new PeImage(data);
        int offset = pe.TextVirtualSizeOffset();

        uint current =
            BinaryPrimitives.ReadUInt32LittleEndian(
                data.AsSpan(offset, 4));

        if (current == 0x1E4000)
        {
            notes.Add(".text VirtualSize already covers the engine code caves.");
            return false;
        }

        if (current != 0x1E385A)
        {
            throw new InvalidDataException(
                $"Unexpected .text VirtualSize 0x{current:X}. Expected 0x1E385A or 0x1E4000.");
        }

        BinaryPrimitives.WriteUInt32LittleEndian(
            data.AsSpan(offset, 4),
            0x1E4000);

        notes.Add(".text VirtualSize: 0x1E385A -> 0x1E4000.");
        return true;
    }

    private static bool ApplyVa(
        byte[] data,
        uint va,
        byte[] oldBytes,
        byte[] newBytes,
        string note,
        List<string> notes)
    {
        int offset = new PeImage(data).VaToOffset(va);

        return ApplyAtOffset(
            data,
            offset,
            oldBytes,
            newBytes,
            note + $" (VA 0x{va:X8})",
            notes);
    }

    private static bool ApplyRaw(
        byte[] data,
        int offset,
        byte[] oldBytes,
        byte[] newBytes,
        string note,
        List<string> notes)
    {
        return ApplyAtOffset(
            data,
            offset,
            oldBytes,
            newBytes,
            note + $" (file 0x{offset:X})",
            notes);
    }

    private static bool ApplyAtOffset(
        byte[] data,
        int offset,
        byte[] oldBytes,
        byte[] newBytes,
        string note,
        List<string> notes)
    {
        if (oldBytes.Length != newBytes.Length)
            throw new InvalidOperationException("Patch old/new lengths do not match.");

        if (offset < 0 || offset + oldBytes.Length > data.Length)
            throw new InvalidDataException($"{note}: patch range is outside the executable.");

        ReadOnlySpan<byte> current =
            data.AsSpan(offset, oldBytes.Length);

        if (current.SequenceEqual(newBytes))
        {
            notes.Add(note + ": already installed.");
            return false;
        }

        if (!current.SequenceEqual(oldBytes))
        {
            throw Unexpected(
                note,
                unchecked((uint)offset),
                oldBytes,
                current.ToArray());
        }

        newBytes.CopyTo(data.AsSpan(offset, newBytes.Length));
        notes.Add(note + ": installed.");
        return true;
    }

    private static InvalidDataException Unexpected(
        string note,
        uint location,
        byte[] expected,
        byte[] found)
    {
        return new InvalidDataException(
            $"{note}: unexpected bytes at 0x{location:X8}.{Environment.NewLine}" +
            $"Expected: {Convert.ToHexString(expected)}{Environment.NewLine}" +
            $"Found:    {Convert.ToHexString(found)}{Environment.NewLine}" +
            "The executable was not written.");
    }

    private static byte[] BuildClientHoleSkipCave()
    {
        var b = new List<byte>(100);

        void Add(params byte[] values) => b.AddRange(values);
        void AddU32(uint value)
        {
            Span<byte> temp = stackalloc byte[4];
            BinaryPrimitives.WriteUInt32LittleEndian(temp, value);
            b.AddRange(temp.ToArray());
        }
        void AddRel32(int target)
        {
            int next = unchecked((int)CaveClient) + b.Count + 4;
            Span<byte> temp = stackalloc byte[4];
            BinaryPrimitives.WriteInt32LittleEndian(temp, target - next);
            b.AddRange(temp.ToArray());
        }
        void Call(int target)
        {
            b.Add(0xE8);
            AddRel32(target);
        }

        Add(0xFF,0x74,0x24,0x08);
        Add(0xFF,0x74,0x24,0x08);
        Call(unchecked((int)ListFind));
        Add(0x83,0xC4,0x08);
        Add(0x85,0xC0);
        Add(0x75,0x4F);
        Add(0x83,0x3D); AddU32(ClientCount); Add(MinQueued);
        Add(0x7C,0x46);
        Add(0x8B,0x0D); AddU32(ClientHighest);
        Add(0x2B,0x0D); AddU32(ClientCursor);
        Add(0x83,0xF9,MaxLag);
        Add(0x76,0x35);
        Add(0x8B,0x0D); AddU32(ClientHead);
        Add(0x85,0xC9);
        Add(0x74,0x2B);
        Add(0x8B,0x51,0x0C);
        Add(0x8B,0x49,0x08);
        Add(0x85,0xC9);
        Add(0x74,0x0A);
        Add(0x39,0x51,0x0C);
        Add(0x73,0xF4);
        Add(0x8B,0x51,0x0C);
        Add(0xEB,0xEF);
        Add(0x8D,0x4A,0xFF);
        Add(0x89,0x0D); AddU32(ClientCursor);
        Add(0x52);
        Add(0x68); AddU32(ClientList);
        Call(unchecked((int)ListFind));
        Add(0x83,0xC4,0x08);
        Add(0xC3);

        if (b.Count != 0x64)
            throw new InvalidOperationException($"Client hole-skip cave length is {b.Count}, expected 100.");

        return b.ToArray();
    }

    private static byte[] BuildServerHoleSkipCave()
    {
        var b = new List<byte>(98);

        void Add(params byte[] values) => b.AddRange(values);
        void AddI32(int value)
        {
            Span<byte> temp = stackalloc byte[4];
            BinaryPrimitives.WriteInt32LittleEndian(temp, value);
            b.AddRange(temp.ToArray());
        }
        void AddRel32(int target)
        {
            int next = unchecked((int)CaveServer) + b.Count + 4;
            Span<byte> temp = stackalloc byte[4];
            BinaryPrimitives.WriteInt32LittleEndian(temp, target - next);
            b.AddRange(temp.ToArray());
        }
        void Call(int target)
        {
            b.Add(0xE8);
            AddRel32(target);
        }

        Add(0xFF,0x74,0x24,0x08);
        Add(0xFF,0x74,0x24,0x08);
        Call(unchecked((int)ListFind));
        Add(0x83,0xC4,0x08);
        Add(0x85,0xC0);
        Add(0x75,0x4D);
        Add(0x8B,0x4C,0x24,0x04);
        Add(0x83,0x79,0x20,MinQueued);
        Add(0x7C,0x43);
        Add(0x8B,0x91); AddI32(ServerHighestRelative);
        Add(0x2B,0x91); AddI32(ServerCursorRelative);
        Add(0x83,0xFA,MaxLag);
        Add(0x76,0x32);
        Add(0x8B,0x49,0x18);
        Add(0x85,0xC9);
        Add(0x74,0x2B);
        Add(0x8B,0x51,0x0C);
        Add(0x8B,0x49,0x08);
        Add(0x85,0xC9);
        Add(0x74,0x0A);
        Add(0x39,0x51,0x0C);
        Add(0x73,0xF4);
        Add(0x8B,0x51,0x0C);
        Add(0xEB,0xEF);
        Add(0x8B,0x4C,0x24,0x04);
        Add(0x8D,0x42,0xFF);
        Add(0x89,0x81); AddI32(ServerCursorRelative);
        Add(0x52);
        Add(0x51);
        Call(unchecked((int)ListFind));
        Add(0x83,0xC4,0x08);
        Add(0xC3);

        if (b.Count != 0x62)
            throw new InvalidOperationException($"Server hole-skip cave length is {b.Count}, expected 98.");

        return b.ToArray();
    }

    private static byte[] BuildNpcCave()
    {
        var b = new List<byte>(24);

        void Add(params byte[] values) => b.AddRange(values);
        void AddU32(uint value)
        {
            Span<byte> temp = stackalloc byte[4];
            BinaryPrimitives.WriteUInt32LittleEndian(temp, value);
            b.AddRange(temp.ToArray());
        }
        void AddRel32(int target)
        {
            int next = unchecked((int)CaveNpc) + b.Count + 4;
            Span<byte> temp = stackalloc byte[4];
            BinaryPrimitives.WriteInt32LittleEndian(temp, target - next);
            b.AddRange(temp.ToArray());
        }

        Add(0x0F,0x85); AddRel32(unchecked((int)NpcJoin));
        Add(0xA1); AddU32(NetHost);
        Add(0x85,0xC0);
        Add(0x0F,0x84); AddRel32(unchecked((int)NpcJoin));
        Add(0xE9); AddRel32(unchecked((int)NpcContinue));

        if (b.Count != 24)
            throw new InvalidOperationException($"NPC cave length is {b.Count}, expected 24.");

        return b.ToArray();
    }

    private static byte[] CallBytes(uint site, uint target) =>
        Concat(
            new byte[] { 0xE8 },
            Rel32Bytes(
                unchecked((int)(site + 5)),
                unchecked((int)target)));

    private static byte[] Rel32Bytes(int nextIp, int target)
    {
        byte[] result = new byte[4];
        BinaryPrimitives.WriteInt32LittleEndian(result, target - nextIp);
        return result;
    }

    private static byte[] Concat(params byte[][] parts)
    {
        int length = parts.Sum(p => p.Length);
        byte[] result = new byte[length];
        int offset = 0;

        foreach (byte[] part in parts)
        {
            Buffer.BlockCopy(part, 0, result, offset, part.Length);
            offset += part.Length;
        }

        return result;
    }

    private static byte[] Hex(string text) =>
        Convert.FromHexString(text.Replace(" ", ""));
}
