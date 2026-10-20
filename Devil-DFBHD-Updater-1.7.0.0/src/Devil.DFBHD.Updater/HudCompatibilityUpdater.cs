using System.Text;

namespace DevilishServices.DfbhdUpdater;

internal sealed record HudCompatibilityResult(
    bool Success,
    bool Changed,
    string Summary);

internal static class HudCompatibilityUpdater
{
    private const string FileName = "hudpos.def";
    private const string Marker =
        "// Devil DFBHD 1920x1080 compass/minimap fix 1.8.0.2";

    public static HudCompatibilityResult Apply(
        string gameFolder,
        UpdateProfile profile,
        GraphicsOptions? graphics)
    {
        try
        {
            if (profile == UpdateProfile.DfbhdServer ||
                graphics is null)
            {
                return new HudCompatibilityResult(
                    true,
                    false,
                    "HUD compatibility file is not used by the dedicated server.");
            }

            if (graphics.Width != 1920 ||
                graphics.Height != 1080)
            {
                return RemoveOwnedOverride(
                    gameFolder,
                    profile,
                    restorePrevious: true);
            }

            string path =
                Path.Combine(
                    gameFolder,
                    FileName);

            if (File.Exists(path))
            {
                string existing =
                    File.ReadAllText(path);

                if (!existing.StartsWith(
                        Marker,
                        StringComparison.Ordinal))
                {
                    BackupExisting(
                        gameFolder,
                        path,
                        profile);
                }
            }

            // DFBHD's widescreen EXE hack replaces the 1024x768 render slot
            // with 1920x1080. The HUD still uses its 1024-wide design space.
            //
            // At 1920 wide, the effective vertical design extent is:
            //     1080 / (1920/1024) = 576
            //
            // The stock 200x200 spinmap uses a 22-design-unit bottom/right
            // margin. Moving its Y range from the original 546..746 to
            // 354..554 keeps the same margin inside a 576-high visible design
            // area. MAPCOORDS moves by the same -192 design units.
            string content =
$@"{Marker}
// Only the corner map/compass rows are overridden.
// Other HUD positions continue to use the game's normal defaults.
HUDSPINMAPX1 802
HUDSPINMAPX2 1002
HUDSPINMAPY1 354
HUDSPINMAPY2 554
MAPCOORDS 1012,314,0
HUDDECLUT_SPINMAP 1 1 1 1
";

            bool changed =
                !File.Exists(path) ||
                !string.Equals(
                    File.ReadAllText(path),
                    content,
                    StringComparison.Ordinal);

            File.WriteAllText(
                path,
                content,
                new UTF8Encoding(
                    encoderShouldEmitUTF8Identifier: false));

            return new HudCompatibilityResult(
                true,
                changed,
                changed
                    ? "Installed the 1920x1080 compass/minimap HUD position correction."
                    : "The 1920x1080 compass/minimap HUD position correction is already installed.");
        }
        catch (Exception ex)
        {
            return new HudCompatibilityResult(
                false,
                false,
                "HUD compatibility update failed: " + ex.Message);
        }
    }

    public static HudCompatibilityResult RestoreLast(
        string gameFolder,
        UpdateProfile profile)
    {
        try
        {
            HudCompatibilityResult removed =
                RemoveOwnedOverride(
                    gameFolder,
                    profile,
                    restorePrevious: false);

            string backupDir =
                Path.Combine(
                    gameFolder,
                    BackupService.BackupDirectoryName);

            if (!Directory.Exists(backupDir))
                return removed;

            string pattern =
                $"hudpos-{profile.FileToken()}-*.def.bak";

            FileInfo? latest =
                new DirectoryInfo(backupDir)
                    .GetFiles(pattern)
                    .OrderByDescending(
                        f => f.LastWriteTimeUtc)
                    .FirstOrDefault();

            if (latest is null)
                return removed;

            File.Copy(
                latest.FullName,
                Path.Combine(
                    gameFolder,
                    FileName),
                true);

            return new HudCompatibilityResult(
                true,
                true,
                $"Restored previous hudpos.def from:{Environment.NewLine}{latest.FullName}");
        }
        catch (Exception ex)
        {
            return new HudCompatibilityResult(
                false,
                false,
                "hudpos.def restore failed: " + ex.Message);
        }
    }

    private static HudCompatibilityResult RemoveOwnedOverride(
        string gameFolder,
        UpdateProfile profile,
        bool restorePrevious)
    {
        string path =
            Path.Combine(
                gameFolder,
                FileName);

        bool changed = false;
        var notes = new List<string>();

        if (File.Exists(path))
        {
            string existing =
                File.ReadAllText(path);

            if (existing.StartsWith(
                    Marker,
                    StringComparison.Ordinal))
            {
                File.Delete(path);
                changed = true;
                notes.Add(
                    "Removed the Devil 1920x1080 hudpos.def override.");
            }
        }

        if (restorePrevious)
        {
            string backupDir =
                Path.Combine(
                    gameFolder,
                    BackupService.BackupDirectoryName);

            if (Directory.Exists(backupDir))
            {
                FileInfo? latest =
                    new DirectoryInfo(backupDir)
                        .GetFiles($"hudpos-{profile.FileToken()}-*.def.bak")
                        .OrderByDescending(
                            f => f.LastWriteTimeUtc)
                        .FirstOrDefault();

                if (latest is not null &&
                    !File.Exists(path))
                {
                    File.Copy(
                        latest.FullName,
                        path,
                        true);

                    changed = true;
                    notes.Add(
                        "Restored the previous hudpos.def.");
                }
            }
        }

        return new HudCompatibilityResult(
            true,
            changed,
            notes.Count == 0
                ? "No 1920x1080 HUD override change was required."
                : string.Join(
                    Environment.NewLine,
                    notes));
    }

    private static void BackupExisting(
        string gameFolder,
        string source,
        UpdateProfile profile)
    {
        string backupDir =
            Path.Combine(
                gameFolder,
                BackupService.BackupDirectoryName);

        Directory.CreateDirectory(
            backupDir);

        string stamp =
            DateTime.UtcNow.ToString(
                "yyyyMMdd-HHmmss-fff");

        string backup =
            Path.Combine(
                backupDir,
                $"hudpos-{profile.FileToken()}-{stamp}.def.bak");

        File.Copy(
            source,
            backup,
            false);
    }
}
