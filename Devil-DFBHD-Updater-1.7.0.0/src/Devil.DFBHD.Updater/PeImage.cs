using System.Buffers.Binary;
using System.Text;

namespace DevilishServices.DfbhdUpdater;

internal sealed class PeImage
{
    private readonly byte[] _data;

    public int PeOffset { get; }
    public ushort Machine { get; }
    public ushort NumberOfSections { get; }
    public ushort OptionalHeaderSize { get; }
    public uint ImageBase { get; }
    public int SectionTableOffset { get; }
    public int CharacteristicsOffset { get; }

    public bool IsX86 => Machine == 0x014C;

    public PeImage(byte[] data)
    {
        _data = data;

        if (data.Length < 0x100 || data[0] != (byte)'M' || data[1] != (byte)'Z')
            throw new InvalidDataException("Not a valid MZ executable.");

        PeOffset = BinaryPrimitives.ReadInt32LittleEndian(data.AsSpan(0x3C, 4));

        if (PeOffset <= 0 || PeOffset + 24 > data.Length)
            throw new InvalidDataException("Invalid PE header offset.");

        if (data[PeOffset] != (byte)'P' ||
            data[PeOffset + 1] != (byte)'E' ||
            data[PeOffset + 2] != 0 ||
            data[PeOffset + 3] != 0)
        {
            throw new InvalidDataException("PE signature not found.");
        }

        Machine = BinaryPrimitives.ReadUInt16LittleEndian(data.AsSpan(PeOffset + 4, 2));
        NumberOfSections = BinaryPrimitives.ReadUInt16LittleEndian(data.AsSpan(PeOffset + 6, 2));
        OptionalHeaderSize = BinaryPrimitives.ReadUInt16LittleEndian(data.AsSpan(PeOffset + 20, 2));
        CharacteristicsOffset = PeOffset + 4 + 18;

        int optional = PeOffset + 24;
        ushort magic = BinaryPrimitives.ReadUInt16LittleEndian(data.AsSpan(optional, 2));

        if (magic != 0x10B)
            throw new InvalidDataException("Expected a 32-bit PE32 executable.");

        ImageBase = BinaryPrimitives.ReadUInt32LittleEndian(data.AsSpan(optional + 28, 4));
        SectionTableOffset = optional + OptionalHeaderSize;
    }

    public int VaToOffset(uint va)
    {
        foreach (var section in Sections())
        {
            ulong start = (ulong)ImageBase + section.VirtualAddress;
            ulong span = Math.Max(section.VirtualSize, section.RawSize);
            ulong end = start + span;

            if (va >= start && va < end)
            {
                long offset = section.RawOffset + ((long)va - (long)start);

                if (offset < 0 || offset >= _data.Length)
                    throw new InvalidDataException($"VA 0x{va:X8} resolves outside the file.");

                return checked((int)offset);
            }
        }

        throw new InvalidDataException($"VA 0x{va:X8} is not mapped by a PE section.");
    }

    public int FindSectionHeader(string name)
    {
        for (int i = 0; i < NumberOfSections; i++)
        {
            int offset = SectionTableOffset + i * 40;

            if (offset + 40 > _data.Length)
                throw new InvalidDataException("Truncated PE section table.");

            string current = Encoding.ASCII.GetString(_data, offset, 8).TrimEnd('\0');

            if (string.Equals(current, name, StringComparison.Ordinal))
                return offset;
        }

        throw new InvalidDataException($"PE section '{name}' was not found.");
    }

    public uint ReadTextVirtualSize()
    {
        int section = FindSectionHeader(".text");
        return BinaryPrimitives.ReadUInt32LittleEndian(_data.AsSpan(section + 8, 4));
    }

    public int TextVirtualSizeOffset() =>
        FindSectionHeader(".text") + 8;

    private IEnumerable<SectionInfo> Sections()
    {
        for (int i = 0; i < NumberOfSections; i++)
        {
            int offset = SectionTableOffset + i * 40;

            if (offset + 40 > _data.Length)
                throw new InvalidDataException("Truncated PE section table.");

            uint virtualSize = BinaryPrimitives.ReadUInt32LittleEndian(_data.AsSpan(offset + 8, 4));
            uint virtualAddress = BinaryPrimitives.ReadUInt32LittleEndian(_data.AsSpan(offset + 12, 4));
            uint rawSize = BinaryPrimitives.ReadUInt32LittleEndian(_data.AsSpan(offset + 16, 4));
            uint rawOffset = BinaryPrimitives.ReadUInt32LittleEndian(_data.AsSpan(offset + 20, 4));

            yield return new SectionInfo(
                virtualAddress,
                virtualSize,
                rawOffset,
                rawSize);
        }
    }

    private readonly record struct SectionInfo(
        uint VirtualAddress,
        uint VirtualSize,
        uint RawOffset,
        uint RawSize);
}
