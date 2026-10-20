using System.Runtime.InteropServices;
using System.Text;

namespace DevilishServices.DfbhdUpdater;

internal static class VersionResourceUpdater
{
    private const int RtVersion = 16;
    private const int VersionResourceId = 1;

    public static void Stamp(string exePath, string version)
    {
        if (!OperatingSystem.IsWindows())
            throw new PlatformNotSupportedException("Version resource updates require Windows.");

        if (!File.Exists(exePath))
            throw new FileNotFoundException("Executable was not found.", exePath);

        VersionParts parts = VersionParts.Parse(version);
        byte[] resource = BuildVersionResource(parts);

        IntPtr handle = BeginUpdateResourceW(exePath, false);

        if (handle == IntPtr.Zero)
            throw new InvalidOperationException(
                "BeginUpdateResource failed. Win32 error: " +
                Marshal.GetLastWin32Error());

        bool committed = false;

        try
        {
            // Write an English resource plus neutral fallback. This changes
            // Windows Explorer FileVersion/ProductVersion only; it does not
            // touch the game's network protocol/version handshake.
            foreach (ushort language in new ushort[] { 0x0409, 0x0000 })
            {
                if (!UpdateResourceW(
                        handle,
                        new IntPtr(RtVersion),
                        new IntPtr(VersionResourceId),
                        language,
                        resource,
                        (uint)resource.Length))
                {
                    throw new InvalidOperationException(
                        "UpdateResource failed. Win32 error: " +
                        Marshal.GetLastWin32Error());
                }
            }

            if (!EndUpdateResourceW(handle, false))
            {
                handle = IntPtr.Zero;
                throw new InvalidOperationException(
                    "EndUpdateResource failed. Win32 error: " +
                    Marshal.GetLastWin32Error());
            }

            handle = IntPtr.Zero;
            committed = true;
        }
        finally
        {
            if (!committed && handle != IntPtr.Zero)
                EndUpdateResourceW(handle, true);
        }
    }

    private static byte[] BuildVersionResource(VersionParts v)
    {
        byte[] stringTable = BuildStringTable(
            new Dictionary<string, string>
            {
                ["CompanyName"] = "Devilish Services",
                ["FileDescription"] = "Delta Force: Black Hawk Down - Devil Update",
                ["FileVersion"] = v.Text,
                ["InternalName"] = "dfbhd.exe",
                ["OriginalFilename"] = "dfbhd.exe",
                ["ProductName"] = "Delta Force: Black Hawk Down - Devilish Services Update",
                ["ProductVersion"] = v.Text,
                ["Comments"] = "Compatibility update; multiplayer protocol unchanged."
            });

        byte[] stringFileInfo =
            BuildContainer(
                "StringFileInfo",
                type: 1,
                stringTable);

        byte[] translation = BuildTranslation();
        byte[] varFileInfo =
            BuildContainer(
                "VarFileInfo",
                type: 1,
                translation);

        using var ms = new MemoryStream();
        using var bw = new BinaryWriter(ms, Encoding.Unicode, leaveOpen: true);

        WriteUInt16(bw, 0);     // wLength
        WriteUInt16(bw, 52);    // wValueLength = VS_FIXEDFILEINFO bytes
        WriteUInt16(bw, 0);     // wType = binary
        WriteUnicodeZ(bw, "VS_VERSION_INFO");
        Align4(bw);

        WriteFixedFileInfo(bw, v);
        Align4(bw);

        bw.Write(stringFileInfo);
        Align4(bw);
        bw.Write(varFileInfo);
        Align4(bw);

        byte[] result = ms.ToArray();
        PatchUInt16(result, 0, checked((ushort)result.Length));
        return result;
    }

    private static byte[] BuildStringTable(
        IReadOnlyDictionary<string, string> values)
    {
        using var ms = new MemoryStream();
        using var bw = new BinaryWriter(ms, Encoding.Unicode, leaveOpen: true);

        WriteUInt16(bw, 0);
        WriteUInt16(bw, 0);
        WriteUInt16(bw, 1);
        WriteUnicodeZ(bw, "040904B0");
        Align4(bw);

        foreach (var pair in values)
        {
            bw.Write(BuildString(pair.Key, pair.Value));
            Align4(bw);
        }

        byte[] result = ms.ToArray();
        PatchUInt16(result, 0, checked((ushort)result.Length));
        return result;
    }

    private static byte[] BuildString(string key, string value)
    {
        using var ms = new MemoryStream();
        using var bw = new BinaryWriter(ms, Encoding.Unicode, leaveOpen: true);

        WriteUInt16(bw, 0);
        WriteUInt16(bw, checked((ushort)(value.Length + 1)));
        WriteUInt16(bw, 1);
        WriteUnicodeZ(bw, key);
        Align4(bw);
        WriteUnicodeZ(bw, value);
        Align4(bw);

        byte[] result = ms.ToArray();
        PatchUInt16(result, 0, checked((ushort)result.Length));
        return result;
    }

    private static byte[] BuildContainer(
        string key,
        ushort type,
        byte[] child)
    {
        using var ms = new MemoryStream();
        using var bw = new BinaryWriter(ms, Encoding.Unicode, leaveOpen: true);

        WriteUInt16(bw, 0);
        WriteUInt16(bw, 0);
        WriteUInt16(bw, type);
        WriteUnicodeZ(bw, key);
        Align4(bw);
        bw.Write(child);
        Align4(bw);

        byte[] result = ms.ToArray();
        PatchUInt16(result, 0, checked((ushort)result.Length));
        return result;
    }

    private static byte[] BuildTranslation()
    {
        using var ms = new MemoryStream();
        using var bw = new BinaryWriter(ms, Encoding.Unicode, leaveOpen: true);

        WriteUInt16(bw, 0);
        WriteUInt16(bw, 4);
        WriteUInt16(bw, 0);
        WriteUnicodeZ(bw, "Translation");
        Align4(bw);

        WriteUInt16(bw, 0x0409);  // English (United States)
        WriteUInt16(bw, 1200);    // Unicode code page
        Align4(bw);

        byte[] result = ms.ToArray();
        PatchUInt16(result, 0, checked((ushort)result.Length));
        return result;
    }

    private static void WriteFixedFileInfo(
        BinaryWriter bw,
        VersionParts v)
    {
        bw.Write(0xFEEF04BDu); // dwSignature
        bw.Write(0x00010000u); // dwStrucVersion

        bw.Write(
            ((uint)v.Major << 16) |
            v.Minor);

        bw.Write(
            ((uint)v.Build << 16) |
            v.Revision);

        bw.Write(
            ((uint)v.Major << 16) |
            v.Minor);

        bw.Write(
            ((uint)v.Build << 16) |
            v.Revision);

        bw.Write(0x0000003Fu); // dwFileFlagsMask
        bw.Write(0u);          // dwFileFlags
        bw.Write(0x00040004u); // VOS_NT_WINDOWS32
        bw.Write(0x00000001u); // VFT_APP
        bw.Write(0u);          // dwFileSubtype
        bw.Write(0u);          // dwFileDateMS
        bw.Write(0u);          // dwFileDateLS
    }

    private static void WriteUnicodeZ(
        BinaryWriter bw,
        string text)
    {
        bw.Write(
            Encoding.Unicode.GetBytes(
                text + "\0"));
    }

    private static void Align4(BinaryWriter bw)
    {
        while ((bw.BaseStream.Position & 3) != 0)
            bw.Write((byte)0);
    }

    private static void WriteUInt16(
        BinaryWriter bw,
        ushort value) =>
        bw.Write(value);

    private static void PatchUInt16(
        byte[] data,
        int offset,
        ushort value)
    {
        data[offset] = (byte)(value & 0xFF);
        data[offset + 1] = (byte)(value >> 8);
    }

    private readonly record struct VersionParts(
        ushort Major,
        ushort Minor,
        ushort Build,
        ushort Revision)
    {
        public string Text =>
            $"{Major}.{Minor}.{Build}.{Revision}";

        public static VersionParts Parse(string value)
        {
            string[] parts = value.Split('.');

            if (parts.Length != 4 ||
                !ushort.TryParse(parts[0], out ushort major) ||
                !ushort.TryParse(parts[1], out ushort minor) ||
                !ushort.TryParse(parts[2], out ushort build) ||
                !ushort.TryParse(parts[3], out ushort revision))
            {
                throw new FormatException(
                    "Version must contain four 16-bit numeric components.");
            }

            return new VersionParts(
                major,
                minor,
                build,
                revision);
        }
    }

    [DllImport(
        "kernel32.dll",
        CharSet = CharSet.Unicode,
        SetLastError = true)]
    private static extern IntPtr BeginUpdateResourceW(
        string pFileName,
        bool bDeleteExistingResources);

    [DllImport(
        "kernel32.dll",
        CharSet = CharSet.Unicode,
        SetLastError = true)]
    [return: MarshalAs(UnmanagedType.Bool)]
    private static extern bool UpdateResourceW(
        IntPtr hUpdate,
        IntPtr lpType,
        IntPtr lpName,
        ushort wLanguage,
        byte[] lpData,
        uint cbData);

    [DllImport(
        "kernel32.dll",
        CharSet = CharSet.Unicode,
        SetLastError = true)]
    [return: MarshalAs(UnmanagedType.Bool)]
    private static extern bool EndUpdateResourceW(
        IntPtr hUpdate,
        bool fDiscard);
}
