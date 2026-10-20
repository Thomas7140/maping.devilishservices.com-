using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace DevilishServices.DfbhdUpdater;

internal sealed record ConfigUpdateResult(
    bool Success,
    bool Changed,
    string Summary);

internal static class GameConfigUpdater
{
    private const string FileName = "dfv.cfg";

    public static ConfigUpdateResult Apply(
        string gameFolder,
        UpdateProfile profile,
        GraphicsOptions? graphics,
        NetworkOptions? network)
    {
        try
        {
            string path = Path.Combine(gameFolder, FileName);

            if (!File.Exists(path))
            {
                return new ConfigUpdateResult(
                    true,
                    false,
                    "dfv.cfg was not found. Executable/renderer updates were installed, but game.cfg-style resolution/network preferences were not written. Launch the game once to create dfv.cfg, then run the updater again.");
            }

            string original = File.ReadAllText(path);
            string updated = original;
            var notes = new List<string>();

            NetworkOptions n =
                (network ?? new NetworkOptions()).Clone();

            n.MaxPacketSize =
                Math.Clamp(
                    n.MaxPacketSize,
                    576,
                    1472);

            updated =
                SetAssignment(
                    updated,
                    "mpmaxpacketsize",
                    $"\"{n.MaxPacketSize}\"");

            notes.Add(
                $"Network packet ceiling: {n.MaxPacketSize} bytes.");

            if (profile != UpdateProfile.DfbhdServer &&
                graphics is not null &&
                !string.Equals(
                    graphics.ResolutionPreset,
                    "Game default",
                    StringComparison.OrdinalIgnoreCase))
            {
                // The known BHD widescreen patch replaces the 1024x768 slot.
                // Keeping game_res=6 selects that patched slot and also avoids
                // startup problems reported when higher legacy slots are left active.
                updated =
                    SetAssignment(
                        updated,
                        "hw3d_res1024x768",
                        "1");

                updated =
                    SetAssignment(
                        updated,
                        "game_res",
                        "6");

                notes.Add(
                    "dfv.cfg selects the patched 1024x768 resolution slot (game_res = 6).");
            }

            if (string.Equals(
                    original,
                    updated,
                    StringComparison.Ordinal))
            {
                return new ConfigUpdateResult(
                    true,
                    false,
                    string.Join(
                        Environment.NewLine,
                        notes.Select(x => "- " + x)));
            }

            BackupConfig(
                gameFolder,
                path,
                profile);

            string temp =
                path + ".devil-" +
                Guid.NewGuid().ToString("N") +
                ".tmp";

            File.WriteAllText(
                temp,
                updated,
                new UTF8Encoding(
                    encoderShouldEmitUTF8Identifier: false));

            File.Move(
                temp,
                path,
                true);

            return new ConfigUpdateResult(
                true,
                true,
                string.Join(
                    Environment.NewLine,
                    notes.Select(x => "- " + x)));
        }
        catch (Exception ex)
        {
            return new ConfigUpdateResult(
                false,
                false,
                "dfv.cfg update failed: " + ex.Message);
        }
    }

    public static ConfigUpdateResult RestoreLast(
        string gameFolder,
        UpdateProfile profile)
    {
        try
        {
            string backupDir =
                Path.Combine(
                    gameFolder,
                    BackupService.BackupDirectoryName);

            if (!Directory.Exists(backupDir))
            {
                return new ConfigUpdateResult(
                    true,
                    false,
                    "No dfv.cfg backup directory was found.");
            }

            string pattern =
                $"dfv-{profile.FileToken()}-*.cfg.bak";

            FileInfo? latest =
                new DirectoryInfo(backupDir)
                    .GetFiles(pattern)
                    .OrderByDescending(
                        f => f.LastWriteTimeUtc)
                    .FirstOrDefault();

            if (latest is null)
            {
                return new ConfigUpdateResult(
                    true,
                    false,
                    "No matching dfv.cfg backup was found.");
            }

            string target =
                Path.Combine(
                    gameFolder,
                    FileName);

            File.Copy(
                latest.FullName,
                target,
                true);

            return new ConfigUpdateResult(
                true,
                true,
                $"Restored dfv.cfg from:{Environment.NewLine}{latest.FullName}");
        }
        catch (Exception ex)
        {
            return new ConfigUpdateResult(
                false,
                false,
                "dfv.cfg restore failed: " + ex.Message);
        }
    }

    private static string SetAssignment(
        string text,
        string key,
        string value)
    {
        string pattern =
            $@"(?im)^[ \t]*{Regex.Escape(key)}[ \t]*=[ \t]*[^\r\n]*$";

        string replacement =
            key + " = " + value;

        if (Regex.IsMatch(
                text,
                pattern,
                RegexOptions.CultureInvariant))
        {
            return Regex.Replace(
                text,
                pattern,
                replacement,
                RegexOptions.CultureInvariant);
        }

        string newline =
            text.Contains("\r\n", StringComparison.Ordinal)
                ? "\r\n"
                : "\n";

        if (text.Length != 0 &&
            !text.EndsWith("\r", StringComparison.Ordinal) &&
            !text.EndsWith("\n", StringComparison.Ordinal))
        {
            text += newline;
        }

        return text +
            replacement +
            newline;
    }

    private static void BackupConfig(
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

        byte[] bytes =
            File.ReadAllBytes(
                source);

        string hash =
            Convert.ToHexString(
                SHA256.HashData(bytes));

        string stamp =
            DateTime.UtcNow.ToString(
                "yyyyMMdd-HHmmss-fff");

        string backup =
            Path.Combine(
                backupDir,
                $"dfv-{profile.FileToken()}-{stamp}-{hash[..12]}.cfg.bak");

        File.Copy(
            source,
            backup,
            false);
    }
}
