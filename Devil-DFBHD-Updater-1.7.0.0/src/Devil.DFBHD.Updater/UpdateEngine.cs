using System.Diagnostics;
using System.Security.Cryptography;
using System.Text.Json;

namespace DevilishServices.DfbhdUpdater;

internal static class UpdateEngine
{
    public static ScanResult Scan(
        UpdateProfile profile,
        string selectedFolder)
    {
        try
        {
            string folder = NormalizeFolder(selectedFolder);

            if (!Directory.Exists(folder))
            {
                return new ScanResult(
                    false,
                    false,
                    Path.Combine(folder, "dfbhd.exe"),
                    "",
                    "Selected folder does not exist.");
            }

            string target = Path.Combine(folder, "dfbhd.exe");

            if (!File.Exists(target))
            {
                return new ScanResult(
                    false,
                    false,
                    target,
                    "",
                    "dfbhd.exe was not found in the selected folder.");
            }

            bool hasTeamSabreMarker =
                File.Exists(Path.Combine(folder, "EXP1.pff")) ||
                File.Exists(Path.Combine(folder, "BHDTS.CMD"));

            if (profile == UpdateProfile.DfbhdTs && !hasTeamSabreMarker)
            {
                return new ScanResult(
                    false,
                    false,
                    target,
                    "",
                    "DFBHDTS was selected, but this folder does not contain the Team Sabre expansion markers (EXP1.pff/BHDTS.CMD). No changes were made.");
            }

            if (profile != UpdateProfile.DfbhdTs && hasTeamSabreMarker)
            {
                return new ScanResult(
                    false,
                    false,
                    target,
                    "",
                    $"{profile.DisplayName()} was selected, but this folder appears to be Team Sabre. No changes were made.");
            }

            byte[] image = File.ReadAllBytes(target);
            string hash = Convert.ToHexString(SHA256.HashData(image));

            PatchReport report = PatchEngine.BuildPatchedImage(profile, image);

            FileVersionInfo vi = FileVersionInfo.GetVersionInfo(target);

            bool needsVersionStamp =
                !string.Equals(
                    vi.FileVersion,
                    PatchEngine.Version,
                    StringComparison.OrdinalIgnoreCase) ||
                !string.Equals(
                    vi.ProductVersion,
                    PatchEngine.Version,
                    StringComparison.OrdinalIgnoreCase);

            var lines = new List<string>
            {
                $"Profile: {profile.DisplayName()}",
                $"Executable: {target}",
                $"SHA256: {hash}",
                $"Windows FileVersion: {vi.FileVersion ?? "(not set)"}",
                $"Windows ProductVersion: {vi.ProductVersion ?? "(not set)"}",
                $"Patch status: {(report.Changed || needsVersionStamp ? "updates are available" : "supported patches/version already installed")}",
                ""
            };

            lines.AddRange(report.Notes.Select(x => "- " + x));

            if (profile == UpdateProfile.DfbhdTs)
            {
                lines.Add("");
                lines.Add("Team Sabre safety mode is active: only generic LAA plus the client graphics wrapper are enabled until TS-specific engine offsets are independently validated.");
            }

            return new ScanResult(
                true,
                true,
                target,
                hash,
                string.Join(Environment.NewLine, lines));
        }
        catch (Exception ex)
        {
            return new ScanResult(
                false,
                false,
                Path.Combine(
                    string.IsNullOrWhiteSpace(selectedFolder) ? "." : selectedFolder,
                    "dfbhd.exe"),
                "",
                "Scan failed: " + ex.Message);
        }
    }

    public static InstallResult Install(
        UpdateProfile profile,
        string selectedFolder,
        GraphicsOptions? graphics = null)
    {
        string folder = NormalizeFolder(selectedFolder);
        string target = Path.Combine(folder, "dfbhd.exe");

        ScanResult scan = Scan(profile, folder);

        if (!scan.Success || !scan.Compatible)
            return new InstallResult(false, scan.Summary);

        BackupResult backup = BackupService.CreateBackup(target, profile);

        if (!backup.Success || string.IsNullOrWhiteSpace(backup.BackupPath))
            return new InstallResult(false, backup.Summary);

        try
        {
            byte[] original = File.ReadAllBytes(target);
            PatchReport report = PatchEngine.BuildPatchedImage(profile, original);

            string temp =
                target + ".devil-update-" + Guid.NewGuid().ToString("N") + ".tmp";

            File.WriteAllBytes(temp, report.Image);

            byte[] verify = File.ReadAllBytes(temp);

            if (!verify.SequenceEqual(report.Image))
            {
                File.Delete(temp);
                throw new InvalidDataException("Temporary patched executable verification failed.");
            }

            _ = new PeImage(verify);

            VersionResourceUpdater.Stamp(
                temp,
                PatchEngine.Version);

            byte[] stampedVerify = File.ReadAllBytes(temp);
            _ = new PeImage(stampedVerify);

            FileVersionInfo stampedInfo =
                FileVersionInfo.GetVersionInfo(temp);

            if (!string.Equals(
                    stampedInfo.FileVersion,
                    PatchEngine.Version,
                    StringComparison.OrdinalIgnoreCase) ||
                !string.Equals(
                    stampedInfo.ProductVersion,
                    PatchEngine.Version,
                    StringComparison.OrdinalIgnoreCase))
            {
                File.Delete(temp);
                throw new InvalidDataException(
                    "Windows FileVersion/ProductVersion stamping did not verify.");
            }

            File.Move(temp, target, true);

            byte[] installed = File.ReadAllBytes(target);
            string installedHash =
                Convert.ToHexString(
                    SHA256.HashData(installed));

            EngineModernizationResult modernization =
                EngineModernization.Install(profile, target, graphics);

            if (!modernization.Success)
                throw new InvalidOperationException(modernization.Summary);

            WriteVersionMarker(
                folder,
                profile,
                installedHash,
                report.Notes);

            var lines = new List<string>
            {
                $"Devilish Services DFBHD Update {PatchEngine.Version}",
                $"Profile: {profile.DisplayName()}",
                $"Executable: {target}",
                $"SHA256: {installedHash}",
                $"Windows FileVersion: {PatchEngine.Version}",
                $"Windows ProductVersion: {PatchEngine.Version}",
                "",
                backup.Summary,
                "",
                modernization.Summary,
                ""
            };

            lines.AddRange(report.Notes.Select(x => "- " + x));

            lines.Add("");
            lines.Add("NovaLogic multiplayer protocol/version fields were not intentionally changed.");

            return new InstallResult(
                true,
                string.Join(Environment.NewLine, lines));
        }
        catch (Exception ex)
        {
            string rollback;

            try
            {
                File.Copy(backup.BackupPath!, target, true);
                rollback = "The original dfbhd.exe was restored automatically.";
            }
            catch (Exception restoreEx)
            {
                rollback =
                    "Automatic executable rollback failed: " +
                    restoreEx.Message;
            }

            try
            {
                EngineModernization.Restore(profile, folder);
            }
            catch
            {
                // Best-effort renderer rollback. Preserve the primary error.
            }

            return new InstallResult(
                false,
                "Install failed: " +
                ex.Message +
                Environment.NewLine +
                Environment.NewLine +
                rollback);
        }
    }

    public static InstallResult Restore(
        UpdateProfile profile,
        string selectedFolder)
    {
        try
        {
            string folder = NormalizeFolder(selectedFolder);

            BackupResult exeRestore =
                BackupService.RestoreLast(folder, profile);

            EngineModernizationResult engineRestore =
                EngineModernization.Restore(profile, folder);

            DeleteIfExists(
                Path.Combine(
                    folder,
                    "Devil_DFBHD_Version.json"));

            string summary =
                exeRestore.Summary +
                Environment.NewLine +
                Environment.NewLine +
                engineRestore.Summary;

            return new InstallResult(
                exeRestore.Success && engineRestore.Success,
                summary);
        }
        catch (Exception ex)
        {
            return new InstallResult(
                false,
                "Restore failed: " + ex.Message);
        }
    }

    private static void WriteVersionMarker(
        string folder,
        UpdateProfile profile,
        string sha256,
        IReadOnlyList<string> notes)
    {
        try
        {
            var marker = new
            {
                product = "Devilish Services DFBHD Update",
                version = PatchEngine.Version,
                profile = profile.DisplayName(),
                executable = "dfbhd.exe",
                sha256,
                installedUtc = DateTime.UtcNow.ToString("O"),
                notes,
                multiplayerProtocolModified = false
            };

            File.WriteAllText(
                Path.Combine(
                    folder,
                    "Devil_DFBHD_Version.json"),
                JsonSerializer.Serialize(
                    marker,
                    new JsonSerializerOptions
                    {
                        WriteIndented = true
                    }));
        }
        catch
        {
            // The executable install is already verified. Marker failure is non-fatal.
        }
    }

    private static string NormalizeFolder(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            return "";

        value = value.Trim().Trim('"');

        if (File.Exists(value) &&
            string.Equals(
                Path.GetFileName(value),
                "dfbhd.exe",
                StringComparison.OrdinalIgnoreCase))
        {
            return Path.GetDirectoryName(value) ?? "";
        }

        return value;
    }

    private static void DeleteIfExists(string path)
    {
        if (File.Exists(path))
            File.Delete(path);
    }
}
