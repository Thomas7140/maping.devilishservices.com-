[CmdletBinding()]
param(
    [ValidateSet("Release","Debug")]
    [string]$Configuration = "Release",

    [ValidateSet("win-x64","win-x86")]
    [string]$Runtime = "win-x64"
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Project = Join-Path $Root "src\Devil.DFBHD.Updater\Devil.DFBHD.Updater.csproj"
$ProjectDir = Split-Path -Parent $Project
$RendererDir = Join-Path $ProjectDir "Payloads\Renderer"
$RendererStub = Join-Path $RendererDir "d3d8.dll"
$RendererCore = Join-Path $RendererDir "dxwrapper.dll"
$GeneratedHashes = Join-Path $ProjectDir "GeneratedRendererHashes.cs"
$DxWrapperLicense = Join-Path $ProjectDir "ThirdParty\dxwrapper-License.txt"

$Artifacts = Join-Path $Root "artifacts"
$PublishDir = Join-Path $Root "portable-publish"
$Output = Join-Path $Artifacts "Devil_dfbhd_update_012105_xx.exe"

$DxWrapperUrl = "https://github.com/elishacloud/dxwrapper/releases/download/v1.9.8700.25/dxwrapper.zip"
$DxWrapperArchiveSha256 = "E6AA4FC685115C8F73DEE4EA2D446B6A1F8B57DD04DB9889D2C6D1B6D7B8C825"

Write-Host ""
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host " Devilish Services DFBHD Updater 1.8.0.0" -ForegroundColor Cyan
Write-Host " Direct3D 12 + Resolution Controls" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host ""

if (-not (Get-Command dotnet -ErrorAction SilentlyContinue)) {
    throw ".NET SDK was not found. Install the .NET 10 SDK on the build computer."
}

$Sdk = (& dotnet --version).Trim()
[int]$Major = 0
if (-not [int]::TryParse(($Sdk -split '\.')[0], [ref]$Major) -or $Major -lt 10) {
    throw "Requires .NET 10 SDK or newer. Found: $Sdk"
}

if (-not (Test-Path $Project -PathType Leaf)) {
    throw "Project not found: $Project"
}

New-Item -ItemType Directory -Path $RendererDir -Force | Out-Null

$TempRoot = Join-Path $env:TEMP ("DevilDFBHD-dxwrapper-" + [Guid]::NewGuid().ToString("N"))
$Archive = Join-Path $TempRoot "dxwrapper.zip"
$Extract = Join-Path $TempRoot "extract"

try {
    New-Item -ItemType Directory -Path $Extract -Force | Out-Null

    Write-Host "Downloading pinned dxwrapper v1.9.8700.25..." -ForegroundColor Cyan
    Invoke-WebRequest -Uri $DxWrapperUrl -OutFile $Archive -UseBasicParsing

    $ArchiveHash = (Get-FileHash $Archive -Algorithm SHA256).Hash.ToUpperInvariant()
    if ($ArchiveHash -ne $DxWrapperArchiveSha256) {
        throw "dxwrapper.zip SHA256 mismatch. Expected $DxWrapperArchiveSha256, found $ArchiveHash"
    }

    Expand-Archive -Path $Archive -DestinationPath $Extract -Force

    $StubSource = Get-ChildItem -Path $Extract -Recurse -File -Filter "d3d8.dll" |
        Where-Object { $_.FullName -match "[\\/]Stub[\\/]" } |
        Select-Object -First 1

    if (-not $StubSource) {
        throw "Could not locate Stub\d3d8.dll inside dxwrapper.zip."
    }

    $CoreSource = Get-ChildItem -Path $Extract -Recurse -File -Filter "dxwrapper.dll" |
        Where-Object { $_.FullName -notmatch "[\\/](Debug|symbols)[\\/]" } |
        Select-Object -First 1

    if (-not $CoreSource) {
        throw "Could not locate dxwrapper.dll inside dxwrapper.zip."
    }

    Copy-Item $StubSource.FullName $RendererStub -Force
    Copy-Item $CoreSource.FullName $RendererCore -Force

    $LicenseSource = Get-ChildItem -Path $Extract -Recurse -File -Filter "License.txt" | Select-Object -First 1
    if ($LicenseSource) {
        Copy-Item $LicenseSource.FullName $DxWrapperLicense -Force
    }

    $StubHash = (Get-FileHash $RendererStub -Algorithm SHA256).Hash.ToUpperInvariant()
    $CoreHash = (Get-FileHash $RendererCore -Algorithm SHA256).Hash.ToUpperInvariant()

    @"
namespace DevilishServices.DfbhdUpdater;

internal static class GeneratedRendererHashes
{
    public const string D3d8StubSha256 = "$StubHash";
    public const string DxWrapperSha256 = "$CoreHash";
    public const string DxWrapperVersion = "1.9.8700.25";
}
"@ | Set-Content -Path $GeneratedHashes -Encoding UTF8

    Write-Host "Renderer archive verified." -ForegroundColor Green
    Write-Host "d3d8.dll SHA256:     $StubHash"
    Write-Host "dxwrapper.dll SHA256: $CoreHash"
}
finally {
    Remove-Item $TempRoot -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host "Cleaning bin/obj and old publish output..." -ForegroundColor Cyan
Get-ChildItem -Path $Root -Directory -Recurse -Force -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -in @("bin","obj") } |
    ForEach-Object { Remove-Item -LiteralPath $_.FullName -Recurse -Force -ErrorAction SilentlyContinue }

Remove-Item $PublishDir -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $PublishDir -Force | Out-Null
New-Item -ItemType Directory -Path $Artifacts -Force | Out-Null
Remove-Item $Output -Force -ErrorAction SilentlyContinue

Write-Host "Restoring..." -ForegroundColor Cyan
& dotnet restore $Project
if ($LASTEXITCODE -ne 0) { throw "dotnet restore failed with exit code $LASTEXITCODE" }

Write-Host "Publishing self-contained portable EXE..." -ForegroundColor Cyan
$PublishArgs = @(
    "publish", $Project,
    "--configuration", $Configuration,
    "--runtime", $Runtime,
    "--self-contained", "true",
    "--output", $PublishDir,
    "-p:PublishSingleFile=true",
    "-p:SelfContained=true",
    "-p:UseAppHost=true",
    "-p:PublishTrimmed=false",
    "-p:PublishReadyToRun=false",
    "-p:EnableCompressionInSingleFile=false",
    "-p:IncludeNativeLibrariesForSelfExtract=true",
    "-p:DebugType=None",
    "-p:DebugSymbols=false"
)
& dotnet @PublishArgs
if ($LASTEXITCODE -ne 0) { throw "dotnet publish failed with exit code $LASTEXITCODE" }

$Published = Join-Path $PublishDir "Devil_dfbhd_update_012105_xx.exe"
if (-not (Test-Path $Published -PathType Leaf)) {
    $Candidate = Get-ChildItem $PublishDir -Filter "*.exe" -File |
        Where-Object { $_.Name -like "*dfbhd*" } |
        Select-Object -First 1

    if (-not $Candidate) { throw "Published updater executable was not found." }
    $Published = $Candidate.FullName
}

Copy-Item $Published $Output -Force

$Item = Get-Item $Output
$Hash = (Get-FileHash $Output -Algorithm SHA256).Hash

Write-Host ""
Write-Host "====================================================" -ForegroundColor Green
Write-Host " BUILD COMPLETE" -ForegroundColor Green
Write-Host "====================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Output: $Output" -ForegroundColor Yellow
Write-Host ("Size: {0:N2} MB" -f ($Item.Length / 1MB))
Write-Host "FileVersion: $($Item.VersionInfo.FileVersion)"
Write-Host "ProductVersion: $($Item.VersionInfo.ProductVersion)"
Write-Host "SHA256: $Hash"
Write-Host ""
Write-Host "The destination PC does not require the .NET runtime."
