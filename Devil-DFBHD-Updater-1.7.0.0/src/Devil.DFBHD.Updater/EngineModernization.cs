using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace DevilishServices.DfbhdUpdater;

internal sealed record EngineModernizationResult(
    bool Success,
    bool Changed,
    string Summary);

internal static class EngineModernization
{
    public const string EngineVersion = "1.8.0.2";

    private const string D3d8Resource =
        "DevilDFBHD.Renderer.d3d8.dll";

    private const string DxWrapperResource =
        "DevilDFBHD.Renderer.dxwrapper.dll";

    private const string D3d8LicenseResource =
        "DevilDFBHD.Renderer.d3d8to9.LICENSE.md";

    private const string DxWrapperLicenseResource =
        "DevilDFBHD.Renderer.dxwrapper.LICENSE.txt";

    private const string IniMarker =
        "; Devil DFBHD Engine 1.8.0.2 - generated file";

    public static EngineModernizationResult Install(
        UpdateProfile profile,
        string targetPath,
        GraphicsOptions? requestedOptions = null)
    {
        try
        {
            string folder = Path.GetDirectoryName(targetPath)
                ?? throw new InvalidOperationException("Unable to determine game folder.");

            GraphicsOptions options =
                (requestedOptions ?? new GraphicsOptions()).Clone();

            if (profile == UpdateProfile.DfbhdServer)
            {
                WriteEngineConfig(
                    folder,
                    profile,
                    false,
                    null,
                    null,
                    options);

                return new EngineModernizationResult(
                    true,
                    false,
                    "Dedicated-server profile: graphics wrapper files were not installed.");
            }

            if (string.Equals(
                    options.RendererMode,
                    "Original Direct3D 8",
                    StringComparison.OrdinalIgnoreCase))
            {
                var notes = new List<string>();
                bool recoveryChanged = DisableDevilRenderer(
                    folder,
                    notes,
                    restorePrevious: false);

                WriteEngineConfig(
                    folder,
                    profile,
                    false,
                    null,
                    null,
                    options);

                return new EngineModernizationResult(
                    true,
                    recoveryChanged,
                    notes.Count == 0
                        ? "Original Direct3D 8 renderer selected; no Devil graphics wrapper is active."
                        : string.Join(Environment.NewLine, notes));
            }

            byte[] d3d8 = ReadEmbeddedBytes(D3d8Resource);
            byte[] dxwrapper = ReadEmbeddedBytes(DxWrapperResource);

            VerifyPayload(
                d3d8,
                GeneratedRendererHashes.D3d8StubSha256,
                "d3d8.dll");

            VerifyPayload(
                dxwrapper,
                GeneratedRendererHashes.DxWrapperSha256,
                "dxwrapper.dll");

            bool changed = false;

            changed |= InstallBinary(
                folder,
                "d3d8.dll",
                d3d8,
                GeneratedRendererHashes.D3d8StubSha256);

            changed |= InstallBinary(
                folder,
                "dxwrapper.dll",
                dxwrapper,
                GeneratedRendererHashes.DxWrapperSha256);

            changed |= WriteDxWrapperIni(
                folder,
                options);

            WriteThirdPartyNotice(folder);

            WriteEngineConfig(
                folder,
                profile,
                true,
                GeneratedRendererHashes.D3d8StubSha256,
                GeneratedRendererHashes.DxWrapperSha256,
                options);

            string mode =
                IsD3d12(options)
                    ? "Direct3D 8 -> Direct3D 9 -> Direct3D 12"
                    : "Direct3D 8 -> Direct3D 9";

            return new EngineModernizationResult(
                true,
                changed,
                changed
                    ? $"{mode} compatibility layer installed with conservative fullscreen settings."
                    : $"{mode} compatibility layer already installed; safe graphics settings were verified.");
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
                changed |= DisableDevilRenderer(
                    gameFolder,
                    notes,
                    restorePrevious: true);
            }

            DeleteIfExists(
                Path.Combine(
                    gameFolder,
                    "DevilDFBHD.Engine.json"));

            DeleteIfExists(
                Path.Combine(
                    gameFolder,
                    "DevilDFBHD-ThirdParty-Notices.txt"));

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

    private static bool DisableDevilRenderer(
        string folder,
        List<string> notes,
        bool restorePrevious)
    {
        bool changed = false;

        changed |= RemoveOwnedBinary(
            folder,
            "d3d8.dll",
            GeneratedRendererHashes.D3d8StubSha256,
            notes);

        changed |= RemoveOwnedBinary(
            folder,
            "dxwrapper.dll",
            GeneratedRendererHashes.DxWrapperSha256,
            notes);

        string ini =
            Path.Combine(
                folder,
                "dxwrapper.ini");

        if (File.Exists(ini))
        {
            string text =
                File.ReadAllText(ini);

            if (text.StartsWith(
                    "; Devil DFBHD Engine ",
                    StringComparison.Ordinal))
            {
                File.Delete(ini);
                changed = true;
                notes.Add("Removed Devil DFBHD dxwrapper.ini.");
            }
            else
            {
                notes.Add(
                    "Existing dxwrapper.ini is not owned by Devil DFBHD; it was left untouched.");
            }
        }

        if (restorePrevious)
        {
            changed |= RestoreNewestBackup(
                folder,
                "d3d8.dll",
                "d3d8-existing-*.bak",
                notes);

            changed |= RestoreNewestBackup(
                folder,
                "dxwrapper.dll",
                "dxwrapper-existing-*.bak",
                notes);

            changed |= RestoreNewestBackup(
                folder,
                "dxwrapper.ini",
                "dxwrapper-ini-existing-*.bak",
                notes);
        }
        else
        {
            notes.Add(
                "Graphics recovery left previous third-party wrapper backups in .devil-dfbhd-backups instead of reactivating them.");
        }

        return changed;
    }

    private static bool InstallBinary(
        string folder,
        string fileName,
        byte[] payload,
        string expectedHash)
    {
        string destination =
            Path.Combine(
                folder,
                fileName);

        if (File.Exists(destination))
        {
            string currentHash =
                Sha256File(destination);

            if (string.Equals(
                    currentHash,
                    expectedHash,
                    StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }

            BackupExistingFile(
                folder,
                destination,
                Path.GetFileNameWithoutExtension(fileName) + "-existing",
                currentHash);
        }

        string temp =
            destination +
            ".devil-" +
            Guid.NewGuid().ToString("N") +
            ".tmp";

        File.WriteAllBytes(
            temp,
            payload);

        string tempHash =
            Sha256File(temp);

        if (!string.Equals(
                tempHash,
                expectedHash,
                StringComparison.OrdinalIgnoreCase))
        {
            File.Delete(temp);

            throw new InvalidDataException(
                $"Temporary {fileName} SHA256 verification failed.");
        }

        File.Move(
            temp,
            destination,
            true);

        string installedHash =
            Sha256File(destination);

        if (!string.Equals(
                installedHash,
                expectedHash,
                StringComparison.OrdinalIgnoreCase))
        {
            throw new InvalidDataException(
                $"Installed {fileName} SHA256 verification failed.");
        }

        return true;
    }

    private static bool WriteDxWrapperIni(
        string folder,
        GraphicsOptions options)
    {
        string path =
            Path.Combine(
                folder,
                "dxwrapper.ini");

        if (File.Exists(path))
        {
            string existing =
                File.ReadAllText(path);

            if (!existing.StartsWith(
                    "; Devil DFBHD Engine ",
                    StringComparison.Ordinal))
            {
                string hash =
                    Convert.ToHexString(
                        SHA256.HashData(
                            Encoding.UTF8.GetBytes(existing)));

                BackupExistingFile(
                    folder,
                    path,
                    "dxwrapper-ini-existing",
                    hash);
            }
        }

        int aa =
            options.AntiAliasingSamples
                is 2 or 4 or 8 or 16
                    ? options.AntiAliasingSamples
                    : 0;

        int refresh =
            options.RefreshRate >= 30 &&
            options.RefreshRate <= 1000
                ? options.RefreshRate
                : 0;

        int d3d9On12 =
            IsD3d12(options)
                ? 1
                : 0;

        int windowMode =
            options.BorderlessFullscreen
                ? 1
                : 0;

        string text =
$@"{IniMarker}
; DFBHD remains a Direct3D 8 game.
; Resolution is patched in dfbhd.exe. dxwrapper does NOT override display size.
; 1.8.0.2 intentionally disables the forced borderless/custom-display defaults
; from 1.8.0.0 because they can produce a black screen on some systems.

[General]
RealDllPath                = AUTO
WrapperMode                = AUTO
DisableLogging             = 1

[Compatibility]
Dd7to9                     = 0
D3d8to9                    = 1
D3d9to9Ex                  = 0
D3d9on12                   = {d3d9On12}
DDrawCompat                = 0
EnableDdrawWrapper         = 0
EnableD3d9Wrapper          = 1

[d3d9]
AnisotropicFiltering       = {(options.AnisotropicFiltering ? 1 : 0)}
AntiAliasing               = {aa}
ForceMipMapUsage           = 0
EnableVSync                = {(options.VSync ? 1 : 0)}
OverrideRefreshRate        = {refresh}
LimitDisplayModeCount      = 0
CustomDisplayWidth         = 0
CustomDisplayHeight        = 0
EnableWindowMode           = {windowMode}
WindowModeBorder           = 0
FullscreenWindowMode       = {windowMode}
ForceExclusiveFullscreen   = 0
ShowFPSCounter             = 0

[FullScreen]
FullScreen                 = 0
ForceWindowResize          = 0
WaitForWindowChanges       = 0
";

        bool changed =
            !File.Exists(path) ||
            !string.Equals(
                File.ReadAllText(path),
                text,
                StringComparison.Ordinal);

        File.WriteAllText(
            path,
            text,
            new UTF8Encoding(false));

        return changed;
    }

    private static bool IsD3d12(
        GraphicsOptions options) =>
        options.RendererMode.StartsWith(
            "Direct3D 12",
            StringComparison.OrdinalIgnoreCase);

    private static bool RemoveOwnedBinary(
        string folder,
        string fileName,
        string expectedHash,
        List<string> notes)
    {
        string path =
            Path.Combine(
                folder,
                fileName);

        if (!File.Exists(path))
            return false;

        string currentHash =
            Sha256File(path);

        if (!string.Equals(
                currentHash,
                expectedHash,
                StringComparison.OrdinalIgnoreCase))
        {
            notes.Add(
                $"{fileName} is not the Devil DFBHD payload; it was left untouched.");

            return false;
        }

        File.Delete(path);

        notes.Add(
            $"Removed Devil DFBHD {fileName}.");

        return true;
    }

    private static bool RestoreNewestBackup(
        string folder,
        string destinationName,
        string pattern,
        List<string> notes)
    {
        string backupDir =
            Path.Combine(
                folder,
                BackupService.BackupDirectoryName);

        if (!Directory.Exists(backupDir))
            return false;

        FileInfo? previous =
            new DirectoryInfo(backupDir)
                .GetFiles(pattern)
                .OrderByDescending(
                    f => f.LastWriteTimeUtc)
                .FirstOrDefault();

        if (previous is null)
            return false;

        File.Copy(
            previous.FullName,
            Path.Combine(
                folder,
                destinationName),
            true);

        notes.Add(
            $"Restored previous {destinationName}.");

        return true;
    }

    private static void BackupExistingFile(
        string folder,
        string sourcePath,
        string token,
        string sha256)
    {
        string backupDir =
            Path.Combine(
                folder,
                BackupService.BackupDirectoryName);

        Directory.CreateDirectory(
            backupDir);

        string stamp =
            DateTime.UtcNow.ToString(
                "yyyyMMdd-HHmmss-fff");

        string shortHash =
            sha256.Length >= 12
                ? sha256[..12]
                : sha256;

        string backup =
            Path.Combine(
                backupDir,
                $"{token}-{stamp}-{shortHash}.bak");

        File.Copy(
            sourcePath,
            backup,
            false);
    }

    private static void VerifyPayload(
        byte[] data,
        string expectedHash,
        string name)
    {
        string hash =
            Convert.ToHexString(
                SHA256.HashData(data));

        if (!string.Equals(
                hash,
                expectedHash,
                StringComparison.OrdinalIgnoreCase))
        {
            throw new InvalidDataException(
                $"Embedded {name} failed SHA256 verification.");
        }
    }

    private static string Sha256File(
        string path) =>
        Convert.ToHexString(
            SHA256.HashData(
                File.ReadAllBytes(path)));

    private static void WriteThirdPartyNotice(
        string folder)
    {
        byte[] d3d8License =
            ReadEmbeddedBytes(
                D3d8LicenseResource);

        byte[] wrapperLicense =
            ReadEmbeddedBytes(
                DxWrapperLicenseResource);

        string text =
            "Devil DFBHD Engine - Third Party Notices" +
            Environment.NewLine +
            Environment.NewLine +
            "===== d3d8to9 =====" +
            Environment.NewLine +
            Encoding.UTF8.GetString(d3d8License) +
            Environment.NewLine +
            Environment.NewLine +
            "===== dxwrapper =====" +
            Environment.NewLine +
            Encoding.UTF8.GetString(wrapperLicense);

        File.WriteAllText(
            Path.Combine(
                folder,
                "DevilDFBHD-ThirdParty-Notices.txt"),
            text);
    }

    private static void WriteEngineConfig(
        string folder,
        UpdateProfile profile,
        bool rendererInstalled,
        string? d3d8Hash,
        string? dxwrapperHash,
        GraphicsOptions graphics)
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
            product =
                "Devilish Services DFBHD Engine",

            engineVersion =
                EngineVersion,

            profile =
                profile.DisplayName(),

            installedUtc =
                DateTime.UtcNow.ToString("O"),

            renderer = new
            {
                installed =
                    rendererInstalled,

                mode =
                    graphics.RendererMode,

                translation =
                    !rendererInstalled
                        ? "Original Direct3D 8"
                        : IsD3d12(graphics)
                            ? "Direct3D 8 -> Direct3D 9 -> Direct3D 12 (D3D9On12)"
                            : "Direct3D 8 -> Direct3D 9",

                component =
                    rendererInstalled
                        ? "elishacloud/dxwrapper"
                        : null,

                componentVersion =
                    rendererInstalled
                        ? GeneratedRendererHashes.DxWrapperVersion
                        : null,

                d3d8Sha256 =
                    d3d8Hash,

                dxwrapperSha256 =
                    dxwrapperHash,

                resolutionPreset =
                    graphics.ResolutionPreset,

                width =
                    graphics.Width,

                height =
                    graphics.Height,

                refreshRate =
                    graphics.RefreshRate,

                borderlessFullscreen =
                    graphics.BorderlessFullscreen,

                vSync =
                    graphics.VSync,

                anisotropicFiltering =
                    graphics.AnisotropicFiltering,

                antiAliasingSamples =
                    graphics.AntiAliasingSamples,

                dxwrapperOverridesResolution =
                    false
            },

            enginePatches =
                patchSet,

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
                multiplayerProtocolModified = false,
                rendererIsTranslationLayer =
                    rendererInstalled
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

    private static byte[] ReadEmbeddedBytes(
        string logicalName)
    {
        Assembly assembly =
            Assembly.GetExecutingAssembly();

        using Stream stream =
            assembly.GetManifestResourceStream(
                logicalName)
            ?? throw new InvalidOperationException(
                "Missing embedded resource: " +
                logicalName);

        using var ms =
            new MemoryStream();

        stream.CopyTo(ms);

        return ms.ToArray();
    }

    private static void DeleteIfExists(
        string path)
    {
        if (File.Exists(path))
            File.Delete(path);
    }
}
