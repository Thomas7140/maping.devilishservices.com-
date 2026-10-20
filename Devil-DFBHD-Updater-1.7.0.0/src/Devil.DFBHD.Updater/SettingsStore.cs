using System.Text.Json;

namespace DevilishServices.DfbhdUpdater;

internal sealed class AppSettings
{
    public string DfbhdServerPath { get; set; } = "";
    public string DfbhdPath { get; set; } = "";
    public string DfbhdTsPath { get; set; } = "";
    public GraphicsOptions Graphics { get; set; } = new();
}

internal static class SettingsStore
{
    private static readonly string DirectoryPath =
        Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "DevilishServices",
            "DFBHDUpdater");

    private static readonly string FilePath =
        Path.Combine(DirectoryPath, "settings.json");

    public static AppSettings Load()
    {
        try
        {
            if (!File.Exists(FilePath))
                return new AppSettings();

            string json = File.ReadAllText(FilePath);
            AppSettings settings = JsonSerializer.Deserialize<AppSettings>(json) ?? new AppSettings();
            settings.Graphics ??= new GraphicsOptions();
            return settings;
        }
        catch
        {
            return new AppSettings();
        }
    }

    public static void Save(AppSettings settings)
    {
        Directory.CreateDirectory(DirectoryPath);

        string temp = FilePath + ".tmp";
        File.WriteAllText(
            temp,
            JsonSerializer.Serialize(
                settings,
                new JsonSerializerOptions { WriteIndented = true }));

        File.Move(temp, FilePath, true);
    }

    public static string GetPath(AppSettings settings, UpdateProfile profile) =>
        profile switch
        {
            UpdateProfile.DfbhdServer => settings.DfbhdServerPath,
            UpdateProfile.Dfbhd => settings.DfbhdPath,
            UpdateProfile.DfbhdTs => settings.DfbhdTsPath,
            _ => ""
        };

    public static void SetPath(AppSettings settings, UpdateProfile profile, string value)
    {
        switch (profile)
        {
            case UpdateProfile.DfbhdServer:
                settings.DfbhdServerPath = value;
                break;
            case UpdateProfile.Dfbhd:
                settings.DfbhdPath = value;
                break;
            case UpdateProfile.DfbhdTs:
                settings.DfbhdTsPath = value;
                break;
        }

        Save(settings);
    }
}
