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

    private const string RendererResource =
        "DevilDFBHD.Renderer.d3d8.dll";

    private const string RendererLicenseResource =
        "DevilDFBHD.Renderer.LICENSE.md";

    private const string ExpectedRendererSha256 =
        "122928CFE225C25D30DECF7184A5D37E490CECF3B58256BA3206C7E1853F8AB8";

    public static EngineModernizationResult Install(
        UpdateProfile profile,
        string targetPath)
    {
        try
        {
            string folder = Path.GetDirectoryName(targetPath)
                ?? throw new InvalidOperationException("Unable to determine game folder.");

            if (profile == UpdateProfile.DfbhdServer)
            {
                WriteEngineConfig(folder, profile, false, null);

                return new EngineModernizationResult(
                    true,
                    false,
                    "Dedicated-server profile: graphics wrapper not installed.");
            }

            byte[] renderer = ReadEmbeddedBytes(RendererResource);
            string rendererHash = Convert.ToHexString(SHA256.HashData(renderer));

            if (!string.Equals(
                    rendererHash,
                    ExpectedRendererSha256,
                    StringComparison.OrdinalIgnoreCase))
            {
                return new EngineModernizationResult(
                    false,
                    false,
                    "Embedded d3d8 renderer failed SHA256 verification.");
            }

            string destination = Path.Combine(folder, "d3d8.dll");
            bool changed = false;

            if (File.Exists(destination))
            {
                string currentHash =
                    Convert.ToHexString(
                        SHA256.HashData(
                            File.ReadAllBytes(destination)));

                if (!string.Equals(
                        currentHash,
                        ExpectedRendererSha256,
                        StringComparison.OrdinalIgnoreCase))
                {
                    BackupExistingRenderer(folder, destination, currentHash);
                    changed = true;
                }
            }
            else
            {
                changed = true;
            }

            if (changed)
            {
                string temp =
                    destination + ".devil-" + Guid.NewGuid().ToString("N") + ".tmp";

                File.WriteAllBytes(temp, renderer);

                string tempHash =
                    Convert.ToHexString(
                        SHA256.HashData(
                            File.ReadAllBytes(temp)));

                if (!string.Equals(
                        tempHash,
                        ExpectedRendererSha256,
                        StringComparison.OrdinalIgnoreCase))
                {
                    File.Delete(temp);
                    return new EngineModernizationResult(
                        false,
                        false,
                        "Temporary d3d8 renderer verification failed.");
                }

                File.Move(temp, destination, true);
            }

            string installedHash =
                Convert.ToHexString(
                    SHA256.HashData(
                        File.ReadAllBytes(destination)));

            if (!string.Equals(
                    installedHash,
                    ExpectedRendererSha256,
                    StringComparison.OrdinalIgnoreCase))
            {
                return new EngineModernizationResult(
                    false,
                    changed,
                    "Installed d3d8 renderer verification failed.");
            }

            WriteThirdPartyNotice(folder);
            WriteEngineConfig(folder, profile, true, installedHash);

            return new EngineModernizationResult(
                true,
                changed,
                changed
                    ? "Modern D3D8 -> D3D9 compatibility layer installed."
                    : "Modern D3D8 -> D3D9 compatibility layer already installed.");
        }
        catch (Exception ex)
        {
            return new EngineModernizationResult(
                false,
                false,
                "Engine modernization failed: " + ex.Message);
        }
    }

    public static EngineModernizationResult Restore(
        UpdateProfile profile,
        string gameFolder)
    {
        try
        {
            bool changed = false;
            var notes = new List<string>();

            if (profile != UpdateProfile.DfbhdServer)
            {
                string rendererPath = Path.Combine(gameFolder, "d3d8.dll");

                if (File.Exists(rendererPath))
                {
                    string currentHash =
                        Convert.ToHexString(
                            SHA256.HashData(
                                File.ReadAllBytes(rendererPath)));

                    if (string.Equals(
                            currentHash,
                            ExpectedRendererSha256,
                            StringComparison.OrdinalIgnoreCase))
                    {
                        File.Delete(rendererPath);
                        changed = true;
                        notes.Add("Removed Devil DFBHD d3d8 compatibility layer.");
                    }
                    else
                    {
                        notes.Add("Current d3d8.dll is not the Devil renderer; it was left untouched.");
                    }
                }

                string backupDir =
                    Path.Combine(
                        gameFolder,
                        BackupService.BackupDirectoryName);

                if (Directory.Exists(backupDir))
                {
                    FileInfo? previous =
                        new DirectoryInfo(backupDir)
                            .GetFiles("d3d8-existing-*.dll.bak")
                            .OrderByDescending(f => f.LastWriteTimeUtc)
                            .FirstOrDefault();

                    if (previous is not null)
                    {
                        File.Copy(
                            previous.FullName,
                            Path.Combine(gameFolder, "d3d8.dll"),
                            true);

                        changed = true;
                        notes.Add("Restored the previous d3d8.dll wrapper.");
                    }
                }
            }

            DeleteIfExists(Path.Combine(gameFolder, "DevilDFBHD.Engine.json"));
            DeleteIfExists(Path.Combine(gameFolder, "DevilDFBHD-ThirdParty-Notices.txt"));

            return new EngineModernizationResult(
                true,
                changed,
                notes.Count == 0
                    ? "No Devil graphics layer needed restoring."
                    : string.Join(Environment.NewLine, notes));
        }
        catch (Exception ex)
        {
            return new EngineModernizationResult(
                false,
                false,
                "Renderer restore failed: " + ex.Message);
        }
    }

    private static void BackupExistingRenderer(
        string folder,
        string rendererPath,
        string sha256)
    {
        string backupDir =
            Path.Combine(
                folder,
                BackupService.BackupDirectoryName);

        Directory.CreateDirectory(backupDir);

        string stamp = DateTime.UtcNow.ToString("yyyyMMdd-HHmmss-fff");
        string shortHash = sha256.Length >= 12 ? sha256[..12] : sha256;

        string backup =
            Path.Combine(
                backupDir,
                $"d3d8-existing-{stamp}-{shortHash}.dll.bak");

        File.Copy(rendererPath, backup, false);
    }

    private static void WriteThirdPartyNotice(string folder)
    {
        byte[] notice = ReadEmbeddedBytes(RendererLicenseResource);

        File.WriteAllBytes(
            Path.Combine(
                folder,
                "DevilDFBHD-ThirdParty-Notices.txt"),
            notice);
    }

    private static void WriteEngineConfig(
        string folder,
        UpdateProfile profile,
        bool rendererInstalled,
        string? rendererHash)
    {
        object patchSet =
            profile switch
            {
                UpdateProfile.DfbhdServer => new
                {
                    largeAddressAware = true,
                    missionMemory512 = true,
                    orderedHoleSkip = true,
                    server125Hz = true,
                    clientNpcReplication = false
                },
                UpdateProfile.Dfbhd => new
                {
                    largeAddressAware = true,
                    missionMemory512 = true,
                    orderedHoleSkip = true,
                    server125Hz = false,
                    clientNpcReplication = true
                },
                _ => new
                {
                    largeAddressAware = true,
                    missionMemory512 = false,
                    orderedHoleSkip = false,
                    server125Hz = false,
                    clientNpcReplication = false
                }
            };

        var config = new
        {
            product = "Devilish Services DFBHD Engine",
            engineVersion = EngineVersion,
            profile = profile.DisplayName(),
            installedUtc = DateTime.UtcNow.ToString("O"),

            renderer = new
            {
                installed = rendererInstalled,
                translation = rendererInstalled ? "Direct3D 8 to Direct3D 9" : "None",
                component = rendererInstalled ? "crosire/d3d8to9" : null,
                componentVersion = rendererInstalled ? RendererVersion : null,
                sha256 = rendererHash
            },

            enginePatches = patchSet,

            pendingDeepEngineWork = new
            {
                weaponWorldRaycast = false,
                firstPersonWeaponRetraction = false,
                fixedFrameTiming = false,
                fixedProjectileTiming = false,
                improvedNetworkInterpolation = false,
                native64BitEngine = false
            },

            compatibility = new
            {
                multiplayerProtocolModified = false
            }
        };

        File.WriteAllText(
            Path.Combine(
                folder,
                "DevilDFBHD.Engine.json"),
            JsonSerializer.Serialize(
                config,
                new JsonSerializerOptions
                {
                    WriteIndented = true
                }));
    }

    private static byte[] ReadEmbeddedBytes(string logicalName)
    {
        Assembly assembly = Assembly.GetExecutingAssembly();

        using Stream stream =
            assembly.GetManifestResourceStream(logicalName)
            ?? throw new InvalidOperationException(
                "Missing embedded resource: " + logicalName);

        using var ms = new MemoryStream();
        stream.CopyTo(ms);
        return ms.ToArray();
    }

    private static void DeleteIfExists(string path)
    {
        if (File.Exists(path))
            File.Delete(path);
    }
}
