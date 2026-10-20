namespace DevilishServices.DfbhdUpdater;

internal sealed class GraphicsOptions
{
    public string RendererMode { get; set; } = "Direct3D 12 (safe)";
    public string ResolutionPreset { get; set; } = "Desktop native";
    public int Width { get; set; } = 0;
    public int Height { get; set; } = 0;
    public int RefreshRate { get; set; } = 0;
    public bool BorderlessFullscreen { get; set; } = false;
    public bool VSync { get; set; } = true;
    public bool AnisotropicFiltering { get; set; } = true;
    public int AntiAliasingSamples { get; set; } = 0;

    public GraphicsOptions Clone() =>
        new()
        {
            RendererMode = RendererMode,
            ResolutionPreset = ResolutionPreset,
            Width = Width,
            Height = Height,
            RefreshRate = RefreshRate,
            BorderlessFullscreen = BorderlessFullscreen,
            VSync = VSync,
            AnisotropicFiltering = AnisotropicFiltering,
            AntiAliasingSamples = AntiAliasingSamples
        };
}
