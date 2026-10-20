using System.Reflection;
using System.Security.Cryptography;
using System.Text.Json;

namespace DevilishServices.DfbhdUpdater;

internal sealed record EngineModernizationResult(
    bool Success,
    bool Changed,
    string Summary);

internal static class EngineModernization
{
    public const string EngineVersion = "1.7.0.0";

    private const string RendererVersion = "1.16.0";

    private const string RendererResourceName =
        "DevilDFBHD.Renderer.d3d8.dll";

    private const string RendererLicenseResourceName =
        "DevilDFBHD.Renderer.LICENSE.md";

    private const string ExpectedRendererSha256 =
        "122928CFE225C25D30DECF7184A5D37E490CECF3B58256BA3206C7E1853F8AB8";

    private const string EngineConfigFileName =
        "DevilDFBHD.Engine.json";

    private const string ThirdPartyNoticeFileName =
        "DevilDFBHD-ThirdParty-Notices.txt";

    public static EngineModernizationResult Install(
        UpdateProfile profile,
        string targetPath)
    {
        try
        {
            string exe = ResolveTarget(targetPath);

            if (!File.Exists(exe))
            {
                return Fail(
                    $"Engine modernization target does not exist:{Environment.NewLine}{exe}");
            }

            if (!Is32BitX86Pe(exe))
            {
                return Fail(
                    "Engine modernization stopped: dfbhd.exe is not the expected 32-bit x86 PE executable.");
            }

            string folder =
                Path.GetDirectoryName(exe)
                ?? throw new InvalidOperationException(
                    "Unable to determine the selected game folder.");

            if (profile == UpdateProfile.DfbhdServer)
            {
                WriteEngineConfig(
                    folder,
                    profile,
                    rendererInstalled: false,
                    rendererHash: null);

                return new EngineModernizationResult(
                    true,
                    false,
                    "Devil DFBHD Engine 1.7.0.0 server profile installed." +
                    Environment.NewLine +
                    "Graphics translation is intentionally not installed on the dedicated server profile.");
            }

            byte[] renderer =
                ReadEmbeddedBytes(RendererResourceName);

            string embeddedHash =
                Convert.ToHexString(
                    SHA256.HashData(renderer));

            if (!string.Equals(
                    embeddedHash,
                    ExpectedRendererSha256,
                    StringComparison.OrdinalIgnoreCase))
            {
                return Fail(
                    "The embedded D3D8 renderer payload failed SHA-256 validation.");
            }

            string destination =
                Path.Combine(folder, "d3d8.dll");

            bool changed = true;

            if (File.Exists(destination))
            {
                string existingHash =
                    HashFile(destination);

                if (string.Equals(
                        existingHash,
                        ExpectedRendererSha256,
                        StringComparison.OrdinalIgnoreCase))
                {
                    changed = false;
                }
                else
                {
                    BackupExistingRenderer(
                        folder,
                        destination,
                        existingHash);
                }
            }

            if (changed)
            {
                string temp =
                    destination +
                    ".devil-" +
                    Guid.NewGuid().ToString("N") +
                    ".tmp";

                File.WriteAllBytes(temp, renderer);

                string tempHash =
                    HashFile(temp);

                if (!string.Equals(
                        tempHash,
                        ExpectedRendererSha256,
                        StringComparison.OrdinalIgnoreCase))
                {
                    File.Delete(temp);

                    return Fail(
                        "The temporary D3D8 renderer file failed SHA-256 validation.");
                }

                File.Copy(
                    temp,
                    destination,
                    overwrite: true);

                File.Delete(temp);
            }

            string installedHash =
                HashFile(destination);

            if (!string.Equals(
                    installedHash,
                    ExpectedRendererSha256,
                    StringComparison.OrdinalIgnoreCase))
            {
                return Fail(
                    "Installed d3d8.dll failed SHA-256 validation.");
            }

            WriteThirdPartyNotice(folder);

            WriteEngineConfig(
                folder,
                profile,
                rendererInstalled: true,
                rendererHash: installedHash);

            return new EngineModernizationResult(
                true,
                changed,
                changed
                    ? "Devil DFBHD Engine 1.7.0.0 graphics compatibility layer installed."
                    : "Devil DFBHD Engine 1.7.0.0 graphics compatibility layer was already installed.");
        }
        catch (Exception ex)
        {
            return Fail(
                "Engine modernization failed: " +
                ex.Message);
        }
    }

    public static EngineModernizationResult Restore(
        string selectedPath)
    {
        try
        {
            string folder = ResolveFolder(selectedPath);

            if (!Directory.Exists(folder))
            {
                return Fail(
                    $"Restore folder does not exist:{Environment.NewLine}{folder}");
            }

            string destination =
                Path.Combine(folder, "d3d8.dll");

            bool changed = false;
            var notes = new List<string>();

            if (File.Exists(destination))
            {
                string currentHash =
                    HashFile(destination);

                if (string.Equals(
                        currentHash,
                        ExpectedRendererSha256,
                        StringComparison.OrdinalIgnoreCase))
                {
                    File.Delete(destination);
                    changed = true;
                    notes.Add("Removed the Devil DFBHD D3D8 compatibility layer.");
                }
                else
                {
                    notes.Add(
                        "Current d3d8.dll is not the Devil DFBHD renderer payload, so it was left untouched.");
                }
            }

            string backupDir =
                Path.Combine(
                    folder,
                    ".devil-dfbhd-backups");

            if (Directory.Exists(backupDir) &&
                !File.Exists(destination))
            {
                FileInfo? backup =
                    new DirectoryInfo(backupDir)
                        .EnumerateFiles(
                            "d3d8.*.dll",
                            SearchOption.TopDirectoryOnly)
                        .OrderByDescending(f => f.LastWriteTimeUtc)
                        .FirstOrDefault();

                if (backup is not null)
                {
                    File.Copy(
                        backup.FullName,
                        destination,
                        overwrite: false);

                    changed = true;

                    notes.Add(
                        $"Restored previous graphics wrapper: {backup.Name}");
                }
            }

            DeleteIfExists(
                Path.Combine(
                    folder,
                    EngineConfigFileName));

            DeleteIfExists(
                Path.Combine(
                    folder,
                    ThirdPartyNoticeFileName));

            if (notes.Count == 0)
            {
                notes.Add(
                    "No Devil DFBHD graphics compatibility files needed restoring.");
            }

            return new EngineModernizationResult(
                true,
                changed,
                string.Join(
                    Environment.NewLine,
                    notes));
        }
        catch (Exception ex)
        {
            return Fail(
                "Engine modernization restore failed: " +
                ex.Message);
        }
    }

    public static string Describe(
        UpdateProfile profile,
        string targetPath)
    {
        string exe = ResolveTarget(targetPath);

        if (!File.Exists(exe))
            return "Engine 1.7.0.0: dfbhd.exe not found.";

        string folder =
            Path.GetDirectoryName(exe)
            ?? ".";

        string renderer =
            Path.Combine(
                folder,
                "d3d8.dll");

        string rendererState;

        if (profile == UpdateProfile.DfbhdServer)
        {
            rendererState =
                "not required for server";
        }
        else if (!File.Exists(renderer))
        {
            rendererState =
                "not installed";
        }
        else
        {
            string hash =
                HashFile(renderer);

            rendererState =
                string.Equals(
                    hash,
                    ExpectedRendererSha256,
                    StringComparison.OrdinalIgnoreCase)
                    ? $"installed / verified ({RendererVersion})"
                    : "another d3d8.dll is present";
        }

        bool weaponHardening =
            DetectWeaponHardeningMarker(folder);

        return
            $"Devil DFBHD Engine: {EngineVersion}{Environment.NewLine}" +
            $"Renderer: {rendererState}{Environment.NewLine}" +
            $"Weapon-origin hardening marker: {(weaponHardening ? "present" : "not confirmed")}{Environment.NewLine}" +
            "World-raycast muzzle blocking: not yet installed by this compatibility module" +
            Environment.NewLine +
            "First-person weapon retraction: not yet installed by this compatibility module";
    }

    private static void BackupExistingRenderer(
        string folder,
        string path,
        string sha256)
    {
        string backupDir =
            Path.Combine(
                folder,
                ".devil-dfbhd-backups");

        Directory.CreateDirectory(backupDir);

        string stamp =
            DateTime.UtcNow.ToString(
                "yyyyMMdd-HHmmss");

        string shortHash =
            sha256.Length >= 12
                ? sha256[..12]
                : sha256;

        string backupPath =
            Path.Combine(
                backupDir,
                $"d3d8.{stamp}.{shortHash}.dll");

        File.Copy(
            path,
            backupPath,
            overwrite: false);
    }

    private static void WriteEngineConfig(
        string folder,
        UpdateProfile profile,
        bool rendererInstalled,
        string? rendererHash)
    {
        string profileName =
            profile switch
            {
                UpdateProfile.DfbhdServer =>
                    "DFBHD Server",

                UpdateProfile.Dfbhd =>
                    "DFBHD",

                _ =>
                    "DFBHDTS"
            };

        bool weaponHardening =
            DetectWeaponHardeningMarker(folder);

        var config = new
        {
            product =
                "Devilish Services DFBHD Engine",

            engineVersion =
                EngineVersion,

            updaterVersion =
                PatchEngine.Version,

            profile =
                profileName,

            installedUtc =
                DateTime.UtcNow.ToString("O"),

            renderer = new
            {
                installed =
                    rendererInstalled,

                translation =
                    rendererInstalled
                        ? "Direct3D 8 to Direct3D 9"
                        : "None",

                component =
                    rendererInstalled
                        ? "d3d8to9"
                        : null,

                componentVersion =
                    rendererInstalled
                        ? RendererVersion
                        : null,

                sha256 =
                    rendererHash
            },

            enginePatches = new
            {
                /*
                 * These values describe what this modernization layer itself
                 * can confirm. Existing legacy updater patches remain managed
                 * by UpdateEngine/PatchEngine.
                 */
                weaponOriginHardening =
                    weaponHardening,

                weaponWorldRaycast =
                    false,

                firstPersonWeaponRetraction =
                    false,

                fixedFrameTiming =
                    false,

                fixedProjectileTiming =
                    false,

                improvedNetworkInterpolation =
                    false
            },

            compatibility = new
            {
                multiplayerProtocolModified =
                    false,

                server125Hz =
                    profile == UpdateProfile.DfbhdServer
            }
        };

        string path =
            Path.Combine(
                folder,
                EngineConfigFileName);

        File.WriteAllText(
            path,
            JsonSerializer.Serialize(
                config,
                new JsonSerializerOptions
                {
                    WriteIndented = true
                }));
    }

    private static bool DetectWeaponHardeningMarker(
        string folder)
    {
        string marker =
            Path.Combine(
                folder,
                "Devil_DFBHD_Version.json");

        if (!File.Exists(marker))
            return false;

        try
        {
            using JsonDocument doc =
                JsonDocument.Parse(
                    File.ReadAllText(marker));

            JsonElement root =
                doc.RootElement;

            if (root.TryGetProperty(
                    "WeaponWallEnginePatch",
                    out JsonElement value) &&
                value.ValueKind == JsonValueKind.True)
            {
                return true;
            }
        }
        catch
        {
            // Existing marker may be from an older build.
        }

        return false;
    }

    private static void WriteThirdPartyNotice(
        string folder)
    {
        byte[] notice =
            ReadEmbeddedBytes(
                RendererLicenseResourceName);

        File.WriteAllBytes(
            Path.Combine(
                folder,
                ThirdPartyNoticeFileName),
            notice);
    }

    private static byte[] ReadEmbeddedBytes(
        string resourceName)
    {
        Assembly assembly =
            Assembly.GetExecutingAssembly();

        using Stream stream =
            assembly.GetManifestResourceStream(
                resourceName)
            ?? throw new InvalidOperationException(
                "Missing embedded resource: " +
                resourceName);

        using var memory =
            new MemoryStream();

        stream.CopyTo(memory);

        return memory.ToArray();
    }

    private static string ResolveTarget(
        string selectedPath)
    {
        selectedPath =
            selectedPath.Trim();

        if (Directory.Exists(selectedPath))
        {
            return Path.Combine(
                selectedPath,
                "dfbhd.exe");
        }

        return selectedPath;
    }

    private static string ResolveFolder(
        string selectedPath)
    {
        selectedPath =
            selectedPath.Trim();

        if (Directory.Exists(selectedPath))
            return selectedPath;

        if (File.Exists(selectedPath))
        {
            return Path.GetDirectoryName(
                       selectedPath)
                   ?? selectedPath;
        }

        /*
         * Restore may be invoked after dfbhd.exe has been moved or removed.
         * If the supplied text looks like an EXE path, use its parent.
         */
        if (string.Equals(
                Path.GetExtension(selectedPath),
                ".exe",
                StringComparison.OrdinalIgnoreCase))
        {
            return Path.GetDirectoryName(
                       selectedPath)
                   ?? selectedPath;
        }

        return selectedPath;
    }

    private static string HashFile(
        string path)
    {
        return Convert.ToHexString(
            SHA256.HashData(
                File.ReadAllBytes(path)));
    }

    private static bool Is32BitX86Pe(
        string path)
    {
        using FileStream stream =
            File.OpenRead(path);

        using var reader =
            new BinaryReader(stream);

        if (stream.Length < 0x100)
            return false;

        if (reader.ReadUInt16() != 0x5A4D)
            return false;

        stream.Position = 0x3C;

        int peOffset =
            reader.ReadInt32();

        if (peOffset <= 0 ||
            peOffset + 6 >= stream.Length)
        {
            return false;
        }

        stream.Position = peOffset;

        if (reader.ReadUInt32() != 0x00004550)
            return false;

        ushort machine =
            reader.ReadUInt16();

        return machine == 0x014C;
    }

    private static void DeleteIfExists(
        string path)
    {
        if (File.Exists(path))
            File.Delete(path);
    }

    private static EngineModernizationResult Fail(
        string message)
    {
        return new EngineModernizationResult(
            false,
            false,
            message);
    }
}
