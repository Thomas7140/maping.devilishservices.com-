namespace DevilishServices.DfbhdUpdater;

internal sealed class NetworkOptions
{
    public int MaxPacketSize { get; set; } = 1400;

    public NetworkOptions Clone() =>
        new()
        {
            MaxPacketSize = MaxPacketSize
        };
}
