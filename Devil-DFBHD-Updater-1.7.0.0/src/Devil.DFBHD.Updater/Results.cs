namespace DevilishServices.DfbhdUpdater;

internal sealed record ScanResult(
    bool Success,
    bool Compatible,
    string TargetPath,
    string Sha256,
    string Summary);

internal sealed record InstallResult(
    bool Success,
    string Summary);

internal sealed record BackupResult(
    bool Success,
    string Summary,
    string? BackupPath = null);
