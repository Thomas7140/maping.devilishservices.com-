using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace DevilishServices.DfbhdUpdater;

internal sealed record VersionTextResult(
    bool Success,
    bool Changed,
    string Summary);

internal static class VersionTextService
{
    private const string FileName = "VERSION.TXT";

    private static readonly Regex FourPartVersion =
        new(
            @"(?<!\d)\d+\.\d+\.\d+\.\d+(?!\d)",
            RegexOptions.Compiled |
            RegexOptions.CultureInvariant);

    public static VersionTextResult Apply(
        string gameFolder,
        UpdateProfile profile)
    {
        try
        {
            string path =
                Path.Combine(
                    gameFolder,
                    FileName);

            string version =
                PatchEngine.Version;

            string original =
                File.Exists(path)
                    ? File.ReadAllText(path)
                    : string.Empty;

            string updated;

            Match match =
                FourPartVersion.Match(original);

            if (match.Success)
            {
                updated =
                    original.Remove(
                        match.Index,
                        match.Length)
                    .Insert(
                        match.Index,
                        version);
            }
            else
            {
                string newline =
                    original.Contains("\r\n", StringComparison.Ordinal)
                        ? "\r\n"
                        : Environment.NewLine;

                string prefix =
                    original.Length == 0
                        ? string.Empty
                        : original.EndsWith("\r", StringComparison.Ordinal) ||
                          original.EndsWith("\n", StringComparison.Ordinal)
                            ? string.Empty
                            : newline;

                updated =
                    original +
                    prefix +
                    $"Devilish Services DFBHD Update {version}" +
                    newline;
            }

            if (string.Equals(
                    original,
                    updated,
                    StringComparison.Ordinal))
            {
                return new VersionTextResult(
                    true,
                    false,
                    $"VERSION.TXT already reports {version}.");
            }

            if (File.Exists(path))
            {
                BackupExisting(
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
                new UTF8Encoding(
                    encoderShouldEmitUTF8Identifier: false));

            string verify =
                File.ReadAllText(temp);

            if (!FourPartVersion.IsMatch(verify) ||
                !verify.Contains(
                    version,
                    StringComparison.Ordinal))
            {
                File.Delete(temp);

                throw new InvalidDataException(
                    "VERSION.TXT verification failed.");
            }

            File.Move(
                temp,
                path,
                true);

            return new VersionTextResult(
                true,
                true,
                $"VERSION.TXT updated to {version}.");
        }
        catch (Exception ex)
        {
            return new VersionTextResult(
                false,
                false,
                "VERSION.TXT update failed: " +
                ex.Message);
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
                $"version-{profile.FileToken()}-*.txt.bak";

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
                    "No matching VERSION.TXT backup was found.");
            }

            string target =
                Path.Combine(
                    gameFolder,
                    FileName);

            File.Copy(
                latest.FullName,
                target,
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
                "VERSION.TXT restore failed: " +
                ex.Message);
        }
    }

    public static string Describe(
        string gameFolder)
    {
        string path =
            Path.Combine(
                gameFolder,
                FileName);

        if (!File.Exists(path))
            return "VERSION.TXT: not found";

        try
        {
            string text =
                File.ReadAllText(path);

            Match match =
                FourPartVersion.Match(text);

            return match.Success
                ? $"VERSION.TXT: {match.Value}"
                : "VERSION.TXT: present, version number not recognized";
        }
        catch
        {
            return "VERSION.TXT: present, could not be read";
        }
    }

    private static void BackupExisting(
        string gameFolder,
        string sourcePath,
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
                sourcePath);

        string hash =
            Convert.ToHexString(
                SHA256.HashData(bytes));

        string stamp =
            DateTime.UtcNow.ToString(
                "yyyyMMdd-HHmmss-fff");

        string backup =
            Path.Combine(
                backupDir,
                $"version-{profile.FileToken()}-{stamp}-{hash[..12]}.txt.bak");

        File.Copy(
            sourcePath,
            backup,
            false);
    }
}
