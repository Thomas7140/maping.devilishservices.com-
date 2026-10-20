namespace DevilishServices.DfbhdUpdater;

internal static class Program
{
    [STAThread]
    private static int Main(string[] args)
    {
        if (args.Length == 2 &&
            string.Equals(
                args[0],
                "--self-test-version-resource",
                StringComparison.OrdinalIgnoreCase))
        {
            try
            {
                VersionResourceUpdater.Stamp(
                    args[1],
                    PatchEngine.Version);

                return 0;
            }
            catch
            {
                return 10;
            }
        }

        if (args.Length == 2 &&
            string.Equals(
                args[0],
                "--self-test-game-files",
                StringComparison.OrdinalIgnoreCase))
        {
            try
            {
                string folder = args[1];

                Directory.CreateDirectory(folder);

                File.WriteAllText(
                    Path.Combine(
                        folder,
                        "VERSION.TXT"),
                    "Delta Force Black Hawk Down, V1.0.0.5; English\r\n");

                var graphics =
                    new GraphicsOptions
                    {
                        RendererMode = "Original Direct3D 8",
                        ResolutionPreset = "1920 x 1080",
                        Width = 1920,
                        Height = 1080,
                        BorderlessFullscreen = false,
                        AntiAliasingSamples = 0
                    };

                VersionTextResult version =
                    VersionTextUpdater.Apply(
                        folder,
                        UpdateProfile.Dfbhd,
                        PatchEngine.Version);

                if (!version.Success)
                    return 21;

                HudCompatibilityResult hud =
                    HudCompatibilityUpdater.Apply(
                        folder,
                        UpdateProfile.Dfbhd,
                        graphics);

                if (!hud.Success)
                    return 22;

                string versionText =
                    File.ReadAllText(
                        Path.Combine(
                            folder,
                            "VERSION.TXT"));

                string hudText =
                    File.ReadAllText(
                        Path.Combine(
                            folder,
                            "hudpos.def"));

                if (!versionText.Contains(
                        "V" + PatchEngine.Version,
                        StringComparison.OrdinalIgnoreCase))
                {
                    return 23;
                }

                if (!hudText.Contains(
                        "HUDSPINMAPY1 354",
                        StringComparison.Ordinal) ||
                    !hudText.Contains(
                        "HUDSPINMAPY2 554",
                        StringComparison.Ordinal) ||
                    !hudText.Contains(
                        "HUDDECLUT_SPINMAP 1 1 1 1",
                        StringComparison.Ordinal))
                {
                    return 24;
                }

                return 0;
            }
            catch
            {
                return 25;
            }
        }

        ApplicationConfiguration.Initialize();
        Application.Run(new MainForm());
        return 0;
    }
}
