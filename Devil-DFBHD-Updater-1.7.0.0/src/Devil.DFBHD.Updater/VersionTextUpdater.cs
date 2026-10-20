using System.Text;
using System.Text.RegularExpressions;

namespace DevilishServices.DfbhdUpdater;

internal sealed record VersionTextResult(
    bool Success,
    bool Changed,
    string Summary);

internal static class VersionTextUpdater
{
    private const string FileName = "VERSION.TXT";

    public static VersionTextResult Apply(
        string gameFolder,
        UpdateProfile profile,
        string version)
    {
        try
        {
            string path =
                Path.Combine(
                    gameFolder,
                    FileName);

            string original =
                File.Exists(path)
                    ? File.ReadAllText(path)
                    : "";

            string newline =
                original.Contains("\r\n", StringComparison.Ordinal)
                    ? "\r\n"
                    : "\r\n";

            string[] lines =
                original
                    .Replace("\r\n", "\n", StringComparison.Ordinal)
                    .Replace("\r", "\n", StringComparison.Ordinal)
                    .Split('\n');

            string first =
                lines.FirstOrDefault(x => !string.IsNullOrWhiteSpace(x))
                ?? "";

            string updatedFirst;

            if (!string.IsNullOrWhiteSpace(first))
            {
                const string versionPattern =
                    @"(?i)\bV\d+\.\d+\.\d+\.\d+\b";

                if (Regex.IsMatch(
                        first,
                        versionPattern,
                        RegexOptions.CultureInvariant))
                {
                    updatedFirst =
                        Regex.Replace(
                            first,
                            versionPattern,
                            "V" + version,
                            RegexOptions.CultureInvariant);
                }
                else
                {
                    updatedFirst =
                        first.TrimEnd() +
                        $" [Devil Update V{version}]";
                }
            }
            else
            {
                updatedFirst =
                    $"Delta Force Black Hawk Down, V{version}; English";
            }

            var outputLines =
                lines.ToList();

            int firstIndex =
                outputLines.FindIndex(
                    x => !string.IsNullOrWhiteSpace(x));

            if (firstIndex >= 0)
                outputLines[firstIndex] = updatedFirst;
            else
                outputLines = new List<string> { updatedFirst };

            string updated =
                string.Join(
                    newline,
                    outputLines);

            if (!updated.EndsWith(newline, StringComparison.Ordinal))
                updated += newline;

            if (string.Equals(
                    original,
                    updated,
                    StringComparison.Ordinal))
            {
                return new VersionTextResult(
                    true,
                    false,
                    $"VERSION.TXT already reports V{version}.");
            }

            if (File.Exists(path))
            {
                Backup(
                    gameFolder,
                    path,
                    profile);
            }

            string temp =
                path +
                ".devil-" +
                Guid.NewGuid().ToString("N") +
                ".tmp";

            File.WriteAllText(
                temp,
                updated,
                Encoding.ASCII);

            File.Move(
                temp,
                path,
                true);

            string verify =
                File.ReadAllText(path);

            if (!verify.Contains(
                    "V" + version,
                    StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidDataException(
                    "VERSION.TXT verification failed after writing.");
            }

            return new VersionTextResult(
                true,
                true,
                $"VERSION.TXT updated to V{version}.");
        }
        catch (Exception ex)
        {
            return new VersionTextResult(
                false,
                false,
                "VERSION.TXT update failed: " + ex.Message);
        }
    }

    public static VersionTextResult RestoreLast(
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
                return new VersionTextResult(
                    true,
                    false,
                    "No VERSION.TXT backup directory was found.");
            }

            string pattern =
                $"VERSION-{profile.FileToken()}-*.TXT.bak";

            FileInfo? latest =
                new DirectoryInfo(backupDir)
                    .GetFiles(pattern)
                    .OrderByDescending(
                        f => f.LastWriteTimeUtc)
                    .FirstOrDefault();

            if (latest is null)
            {
                return new VersionTextResult(
                    true,
                    false,
                    "No VERSION.TXT backup was found.");
            }

            File.Copy(
                latest.FullName,
                Path.Combine(
                    gameFolder,
                    FileName),
                true);

            return new VersionTextResult(
                true,
                true,
                $"Restored VERSION.TXT from:{Environment.NewLine}{latest.FullName}");
        }
        catch (Exception ex)
        {
            return new VersionTextResult(
                false,
                false,
                "VERSION.TXT restore failed: " + ex.Message);
        }
    }

    private static void Backup(
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
                $"VERSION-{profile.FileToken()}-{stamp}.TXT.bak");

        File.Copy(
            source,
            backup,
            false);
    }
}
