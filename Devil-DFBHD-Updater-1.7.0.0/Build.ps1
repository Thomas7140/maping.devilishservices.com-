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

$Artifacts = Join-Path $Root "artifacts"
$PublishDir = Join-Path $Root "portable-publish"
$Output = Join-Path $Artifacts "Devil_dfbhd_update_012105_xx.exe"

$ExpectedD3d8Sha256 = "B8B878E29C2931D6A8D064665C4C93EDB28A0105152E7247F8F543C1603985C3"
$ExpectedDxWrapperSha256 = "23A2889E0785A02F17F1EE764254BF22B937FC5BDC6ED6374201A9F50CC7B43D"

Write-Host ""
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host " Devilish Services DFBHD Updater 1.8.0.2" -ForegroundColor Cyan
Write-Host " Local / Offline Portable Build" -ForegroundColor Cyan
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

foreach ($Required in @($Project, $RendererStub, $RendererCore, $GeneratedHashes)) {
    if (-not (Test-Path $Required -PathType Leaf)) {
        throw "Required local build file is missing: $Required"
    }
}

$D3d8Hash = (Get-FileHash $RendererStub -Algorithm SHA256).Hash.ToUpperInvariant()
$DxWrapperHash = (Get-FileHash $RendererCore -Algorithm SHA256).Hash.ToUpperInvariant()

if ($D3d8Hash -ne $ExpectedD3d8Sha256) {
    throw "d3d8.dll SHA256 mismatch. Expected $ExpectedD3d8Sha256, found $D3d8Hash"
}

if ($DxWrapperHash -ne $ExpectedDxWrapperSha256) {
    throw "dxwrapper.dll SHA256 mismatch. Expected $ExpectedDxWrapperSha256, found $DxWrapperHash"
}

Write-Host "Local Direct3D payloads verified." -ForegroundColor Green
Write-Host "d3d8.dll:     $D3d8Hash"
Write-Host "dxwrapper.dll: $DxWrapperHash"
Write-Host ""

Write-Host "Cleaning bin/obj and old publish output..." -ForegroundColor Cyan
Get-ChildItem -Path $Root -Directory -Recurse -Force -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -in @("bin","obj") } |
    ForEach-Object {
        Remove-Item -LiteralPath $_.FullName -Recurse -Force -ErrorAction SilentlyContinue
    }

Remove-Item $PublishDir -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $PublishDir -Force | Out-Null
New-Item -ItemType Directory -Path $Artifacts -Force | Out-Null
Remove-Item $Output -Force -ErrorAction SilentlyContinue

Write-Host "Restoring..." -ForegroundColor Cyan
& dotnet restore $Project
if ($LASTEXITCODE -ne 0) {
    throw "dotnet restore failed with exit code $LASTEXITCODE"
}

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

if ($LASTEXITCODE -ne 0) {
    throw "dotnet publish failed with exit code $LASTEXITCODE"
}

$Published = Join-Path $PublishDir "Devil_dfbhd_update_012105_xx.exe"

if (-not (Test-Path $Published -PathType Leaf)) {
    $Candidate =
        Get-ChildItem $PublishDir -Filter "*.exe" -File |
        Where-Object { $_.Name -like "*dfbhd*" } |
        Select-Object -First 1

    if (-not $Candidate) {
        throw "Published updater executable was not found."
    }

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
Write-Host "No GitHub or other build service is required."
Write-Host "The destination PC does not require the .NET runtime."
