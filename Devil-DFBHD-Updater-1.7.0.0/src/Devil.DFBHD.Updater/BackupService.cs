using System.Security.Cryptography;

namespace DevilishServices.DfbhdUpdater;

internal static class BackupService
{
    public const string BackupDirectoryName = ".devil-dfbhd-backups";

    public static BackupResult CreateBackup(string targetPath, UpdateProfile profile)
    {
        try
        {
            if (!File.Exists(targetPath))
                return new BackupResult(false, "Target executable does not exist.");

            string folder = Path.GetDirectoryName(targetPath)
                ?? throw new InvalidOperationException("Unable to determine the game folder.");

            string backupDir = Path.Combine(folder, BackupDirectoryName);
            Directory.CreateDirectory(backupDir);

            string hash = Convert.ToHexString(SHA256.HashData(File.ReadAllBytes(targetPath)));
            string shortHash = hash[..12];
            string stamp = DateTime.UtcNow.ToString("yyyyMMdd-HHmmss-fff");

            string name = $"dfbhd-{profile.FileToken()}-{stamp}-{shortHash}.exe.bak";
            string backup = Path.Combine(backupDir, name);

            File.Copy(targetPath, backup, overwrite: false);

            return new BackupResult(
                true,
                $"Backup created:{Environment.NewLine}{backup}",
                backup);
        }
        catch (Exception ex)
        {
            return new BackupResult(false, "Backup failed: " + ex.Message);
        }
    }

    public static BackupResult RestoreLast(string gameFolder, UpdateProfile profile)
    {
        try
        {
            string target = Path.Combine(gameFolder, "dfbhd.exe");
            string backupDir = Path.Combine(gameFolder, BackupDirectoryName);

            if (!Directory.Exists(backupDir))
                return new BackupResult(false, "No backup directory was found.");

            string pattern = $"dfbhd-{profile.FileToken()}-*.exe.bak";

            FileInfo? latest =
                new DirectoryInfo(backupDir)
                    .GetFiles(pattern)
                    .OrderByDescending(f => f.LastWriteTimeUtc)
                    .FirstOrDefault();

            if (latest is null)
                return new BackupResult(false, $"No {profile.DisplayName()} executable backup was found.");

            string temp = target + ".restore-" + Guid.NewGuid().ToString("N") + ".tmp";
            File.Copy(latest.FullName, temp, true);

            if (new FileInfo(temp).Length == 0)
                throw new InvalidOperationException("Restored temporary executable is empty.");

            File.Move(temp, target, true);

            return new BackupResult(
                true,
                $"Restored:{Environment.NewLine}{latest.FullName}",
                latest.FullName);
        }
        catch (Exception ex)
        {
            return new BackupResult(false, "Restore failed: " + ex.Message);
        }
    }
}
