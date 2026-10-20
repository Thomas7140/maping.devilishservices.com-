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

        ApplicationConfiguration.Initialize();
        Application.Run(new MainForm());
        return 0;
    }
}
