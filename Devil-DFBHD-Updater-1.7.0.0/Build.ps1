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
$RendererDir = Join-Path $Root "src\Devil.DFBHD.Updater\Payloads\Renderer"
$Renderer = Join-Path $RendererDir "d3d8.dll"
$Artifacts = Join-Path $Root "artifacts"
$PublishDir = Join-Path $Root "portable-publish"
$Output = Join-Path $Artifacts "Devil_dfbhd_update_012105_xx.exe"

$RendererUrl = "https://github.com/crosire/d3d8to9/releases/download/v1.16.0/d3d8.dll"
$RendererSha256 = "122928CFE225C25D30DECF7184A5D37E490CECF3B58256BA3206C7E1853F8AB8"

Write-Host ""
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host " Devilish Services DFBHD Updater 1.7.0.0" -ForegroundColor Cyan
Write-Host " Complete Portable Build" -ForegroundColor Cyan
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

$NeedRenderer = $true
if (Test-Path $Renderer -PathType Leaf) {
    $Existing = (Get-FileHash $Renderer -Algorithm SHA256).Hash.ToUpperInvariant()
    if ($Existing -eq $RendererSha256) {
        $NeedRenderer = $false
        Write-Host "Pinned renderer already present and verified." -ForegroundColor Green
    }
}

if ($NeedRenderer) {
    Write-Host "Downloading pinned d3d8to9 v1.16.0 renderer..." -ForegroundColor Cyan
    Invoke-WebRequest -Uri $RendererUrl -OutFile $Renderer -UseBasicParsing
    $Actual = (Get-FileHash $Renderer -Algorithm SHA256).Hash.ToUpperInvariant()
    if ($Actual -ne $RendererSha256) {
        Remove-Item $Renderer -Force -ErrorAction SilentlyContinue
        throw "Renderer SHA256 mismatch. Expected $RendererSha256, found $Actual"
    }
    Write-Host "Renderer verified." -ForegroundColor Green
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
    $Candidate = Get-ChildItem $PublishDir -Filter "*.exe" -File | Where-Object { $_.Name -like "*dfbhd*" } | Select-Object -First 1
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
