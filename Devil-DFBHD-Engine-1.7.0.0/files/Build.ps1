[CmdletBinding()]
param(
    [ValidateSet('Release','Debug')]
    [string]$Configuration = 'Release',

    [ValidateSet('win-x64','win-x86')]
    [string]$Runtime = 'win-x64'
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$EngineVersion = '1.7.0.0'
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Project = Join-Path $Root 'src\Devil.DFBHD.Updater\Devil.DFBHD.Updater.csproj'
$PayloadRoot = Join-Path $Root 'src\Devil.DFBHD.Updater\Payloads'
$ServerPayload = Join-Path $PayloadRoot 'DFBHD_125hz_mem512_LAA_holeskip_TEST.exe'
$RendererDir = Join-Path $PayloadRoot 'Renderer'
$RendererPayload = Join-Path $RendererDir 'd3d8.dll'
$RendererLicense = Join-Path $RendererDir 'LICENSE.md'
$Artifacts = Join-Path $Root 'artifacts'
$PublishDir = Join-Path $Root 'portable-publish'
$OutputName = 'Devil_dfbhd_update_012105_xx.exe'
$OutputExe = Join-Path $Artifacts $OutputName

$ExpectedServerSha256 =
    '105FC81B2C0F8A1B0C5F72AB6B74A255CF83F07AB9C2C210D1CAF625A97FF6A3'

$ExpectedRendererSha256 =
    '122928CFE225C25D30DECF7184A5D37E490CECF3B58256BA3206C7E1853F8AB8'

$RendererUrl =
    'https://github.com/crosire/d3d8to9/releases/download/v1.16.0/d3d8.dll'

Write-Host ''
Write-Host '====================================================' -ForegroundColor Cyan
Write-Host " Devilish Services DFBHD Engine $EngineVersion" -ForegroundColor Cyan
Write-Host ' Portable Update Builder' -ForegroundColor Cyan
Write-Host '====================================================' -ForegroundColor Cyan
Write-Host ''

function Get-Sha256Upper {
    param(
        [Parameter(Mandatory)]
        [string]$Path
    )

    return (Get-FileHash -Path $Path -Algorithm SHA256).Hash.ToUpperInvariant()
}

function Assert-Hash {
    param(
        [Parameter(Mandatory)]
        [string]$Path,

        [Parameter(Mandatory)]
        [string]$Expected,

        [Parameter(Mandatory)]
        [string]$Name
    )

    if (-not (Test-Path $Path -PathType Leaf)) {
        throw "$Name is missing: $Path"
    }

    $actual = Get-Sha256Upper -Path $Path

    if ($actual -ne $Expected.ToUpperInvariant()) {
        throw @"
$Name SHA256 mismatch.

Expected:
$Expected

Found:
$actual

Path:
$Path
"@
    }

    Write-Host "$Name verified: $actual" -ForegroundColor Green
}

$DotNet = Get-Command dotnet -ErrorAction SilentlyContinue

if (-not $DotNet) {
    throw @"
.NET SDK was not found.

Install the .NET 10 SDK on the BUILD computer.
The finished updater is self-contained and does not require
.NET on the destination game/server computer.
"@
}

$SdkVersion = (& dotnet --version).Trim()
[int]$Major = 0
$MajorText = ($SdkVersion -split '\.')[0]

if (-not [int]::TryParse($MajorText, [ref]$Major) -or $Major -lt 10) {
    throw "This project requires .NET 10 SDK or newer. Detected: $SdkVersion"
}

Write-Host "SDK: $SdkVersion" -ForegroundColor Green

if (-not (Test-Path $Project -PathType Leaf)) {
    throw "Project file not found: $Project"
}

Assert-Hash -Path $ServerPayload -Expected $ExpectedServerSha256 -Name '125 Hz server payload'

New-Item -ItemType Directory -Path $RendererDir -Force | Out-Null

$rendererGood = $false

if (Test-Path $RendererPayload -PathType Leaf) {
    $existingRendererHash = Get-Sha256Upper -Path $RendererPayload
    $rendererGood = $existingRendererHash -eq $ExpectedRendererSha256
}

if (-not $rendererGood) {
    Write-Host ''
    Write-Host 'Downloading pinned d3d8to9 v1.16.0 payload...' -ForegroundColor Cyan

    $downloadTemp = "$RendererPayload.download"
    Remove-Item $downloadTemp -Force -ErrorAction SilentlyContinue

    Invoke-WebRequest -Uri $RendererUrl -OutFile $downloadTemp

    $downloadHash = Get-Sha256Upper -Path $downloadTemp

    if ($downloadHash -ne $ExpectedRendererSha256) {
        Remove-Item $downloadTemp -Force -ErrorAction SilentlyContinue

        throw @"
Downloaded renderer SHA256 mismatch.

Expected:
$ExpectedRendererSha256

Found:
$downloadHash
"@
    }

    Move-Item -Path $downloadTemp -Destination $RendererPayload -Force
}

Assert-Hash -Path $RendererPayload -Expected $ExpectedRendererSha256 -Name 'D3D8 -> D3D9 renderer'

if (-not (Test-Path $RendererLicense -PathType Leaf)) {
    throw @"
Renderer license file is missing:

$RendererLicense

Run Upgrade-To-1.7.0.0.ps1 again so the third-party notice
is copied into the project before building.
"@
}

Write-Host ''
Write-Host 'Cleaning bin/obj and previous portable output...' -ForegroundColor Cyan

Get-ChildItem -Path $Root -Directory -Recurse -Force -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -in @('bin','obj') } |
    ForEach-Object {
        Remove-Item -LiteralPath $_.FullName -Recurse -Force -ErrorAction SilentlyContinue
    }

Remove-Item $PublishDir -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $PublishDir -Force | Out-Null
New-Item -ItemType Directory -Path $Artifacts -Force | Out-Null
Remove-Item $OutputExe -Force -ErrorAction SilentlyContinue

Write-Host ''
Write-Host 'Restoring packages...' -ForegroundColor Cyan

& dotnet restore $Project

if ($LASTEXITCODE -ne 0) {
    throw "dotnet restore failed with exit code $LASTEXITCODE"
}

Write-Host ''
Write-Host "Publishing portable $Runtime updater..." -ForegroundColor Cyan

$PublishArgs = @(
    'publish',
    $Project,
    '--configuration', $Configuration,
    '--runtime', $Runtime,
    '--self-contained', 'true',
    '--output', $PublishDir,
    '-p:PublishSingleFile=true',
    '-p:SelfContained=true',
    '-p:UseAppHost=true',
    '-p:PublishTrimmed=false',
    '-p:PublishReadyToRun=false',
    '-p:EnableCompressionInSingleFile=false',
    '-p:IncludeNativeLibrariesForSelfExtract=true',
    '-p:DebugType=None',
    '-p:DebugSymbols=false',
    '-p:GenerateDocumentationFile=false'
)

& dotnet @PublishArgs

if ($LASTEXITCODE -ne 0) {
    throw "dotnet publish failed with exit code $LASTEXITCODE"
}

$PublishedExe = Join-Path $PublishDir $OutputName

if (-not (Test-Path $PublishedExe -PathType Leaf)) {
    $Candidate =
        Get-ChildItem $PublishDir -Filter '*.exe' -File |
        Where-Object { $_.Name -like '*dfbhd*' } |
        Select-Object -First 1

    if (-not $Candidate) {
        throw "Published updater EXE was not found in: $PublishDir"
    }

    $PublishedExe = $Candidate.FullName
}

Copy-Item $PublishedExe $OutputExe -Force

if (-not (Test-Path $OutputExe -PathType Leaf)) {
    throw "Final portable updater was not created: $OutputExe"
}

$Final = Get-Item $OutputExe
$FinalHash = Get-Sha256Upper -Path $OutputExe
$Info = $Final.VersionInfo

Write-Host ''
Write-Host '====================================================' -ForegroundColor Green
Write-Host ' PORTABLE ENGINE UPDATER BUILD COMPLETE' -ForegroundColor Green
Write-Host '====================================================' -ForegroundColor Green
Write-Host ''
Write-Host 'Output:' -ForegroundColor Cyan
Write-Host $OutputExe -ForegroundColor Yellow
Write-Host ''
Write-Host ("Size:           {0:N2} MB" -f ($Final.Length / 1MB))
Write-Host "FileVersion:    $($Info.FileVersion)"
Write-Host "ProductVersion: $($Info.ProductVersion)"
Write-Host "ProductName:    $($Info.ProductName)"
Write-Host "Runtime:        $Runtime"
Write-Host 'Self-contained: YES'
Write-Host 'Single-file:    YES'
Write-Host 'ReadyToRun:     DISABLED'
Write-Host 'Compression:    DISABLED'
Write-Host "SHA256:         $FinalHash"
Write-Host ''
