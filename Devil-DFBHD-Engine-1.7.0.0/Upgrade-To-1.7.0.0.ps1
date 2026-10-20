[CmdletBinding()]
param(
    [string]$ProjectRoot = 'D:\Devil-DFBHD-Update-1.6.0.6-game-version',
    [switch]$NoBuild
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$EngineVersion = '1.7.0.0'
$KitRoot = $PSScriptRoot
$KitFiles = Join-Path $KitRoot 'files'

$ProjectDir = Join-Path $ProjectRoot 'src\Devil.DFBHD.Updater'
$Csproj = Join-Path $ProjectDir 'Devil.DFBHD.Updater.csproj'
$MainForm = Join-Path $ProjectDir 'MainForm.cs'
$PatchEngine = Join-Path $ProjectDir 'PatchEngine.cs'
$EngineModernization = Join-Path $ProjectDir 'EngineModernization.cs'
$BuildFile = Join-Path $ProjectRoot 'Build.ps1'

$RendererDir = Join-Path $ProjectDir 'Payloads\Renderer'
$RendererLicense = Join-Path $RendererDir 'LICENSE.md'

$SourceEngineModernization = Join-Path $KitFiles 'EngineModernization.cs'
$SourceBuild = Join-Path $KitFiles 'Build.ps1'
$SourceLicense = Join-Path $KitFiles 'LICENSE-d3d8to9.md'

Write-Host ''
Write-Host '====================================================' -ForegroundColor Cyan
Write-Host " Devil DFBHD Engine $EngineVersion Upgrade" -ForegroundColor Cyan
Write-Host '====================================================' -ForegroundColor Cyan
Write-Host ''
Write-Host "Project: $ProjectRoot"

foreach ($required in @($Csproj, $MainForm, $SourceEngineModernization, $SourceBuild, $SourceLicense)) {
    if (-not (Test-Path $required -PathType Leaf)) {
        throw "Required file not found: $required"
    }
}

$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$BackupRoot = Join-Path $ProjectRoot "_pre-$EngineVersion-$stamp"
New-Item -ItemType Directory -Path $BackupRoot -Force | Out-Null

Write-Host ''
Write-Host 'Backing up source files to:' -ForegroundColor Cyan
Write-Host $BackupRoot

$BackupFiles = @($Csproj, $MainForm, $BuildFile, $PatchEngine, $EngineModernization)

foreach ($file in $BackupFiles) {
    if (Test-Path $file -PathType Leaf) {
        $relative = $file.Substring($ProjectRoot.Length).TrimStart('\')
        $destination = Join-Path $BackupRoot $relative
        $destinationDir = Split-Path -Parent $destination
        New-Item -ItemType Directory -Path $destinationDir -Force | Out-Null
        Copy-Item $file $destination -Force
    }
}

Write-Host 'Installing EngineModernization.cs...' -ForegroundColor Cyan
Copy-Item $SourceEngineModernization $EngineModernization -Force

New-Item -ItemType Directory -Path $RendererDir -Force | Out-Null
Copy-Item $SourceLicense $RendererLicense -Force

Write-Host 'Updating project version and embedded resources...' -ForegroundColor Cyan
$ProjectText = Get-Content $Csproj -Raw

function Set-ProjectProperty {
    param(
        [Parameter(Mandatory)]
        [string]$Name,

        [Parameter(Mandatory)]
        [string]$Value
    )

    $pattern = "<$Name>.*?</$Name>"

    if ([regex]::IsMatch($script:ProjectText, $pattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)) {
        $script:ProjectText = [regex]::Replace(
            $script:ProjectText,
            $pattern,
            "<$Name>$Value</$Name>",
            [System.Text.RegularExpressions.RegexOptions]::Singleline)
    }
    else {
        $property = "    <$Name>$Value</$Name>" + [Environment]::NewLine
        $index = $script:ProjectText.IndexOf('</PropertyGroup>', [StringComparison]::OrdinalIgnoreCase)

        if ($index -lt 0) {
            throw "No PropertyGroup was found in $Csproj"
        }

        $script:ProjectText = $script:ProjectText.Insert($index, $property)
    }
}

Set-ProjectProperty -Name 'Version' -Value $EngineVersion
Set-ProjectProperty -Name 'FileVersion' -Value $EngineVersion
Set-ProjectProperty -Name 'AssemblyVersion' -Value $EngineVersion

if ($ProjectText -notmatch 'DevilDFBHD\.Renderer\.d3d8\.dll') {
    $ResourceGroup = @'

  <ItemGroup>
    <EmbeddedResource Include="Payloads\Renderer\d3d8.dll"
                      LogicalName="DevilDFBHD.Renderer.d3d8.dll" />
    <EmbeddedResource Include="Payloads\Renderer\LICENSE.md"
                      LogicalName="DevilDFBHD.Renderer.LICENSE.md" />
  </ItemGroup>
'@

    $projectClose = $ProjectText.LastIndexOf('</Project>', [StringComparison]::OrdinalIgnoreCase)

    if ($projectClose -lt 0) {
        throw "Closing </Project> element not found in $Csproj"
    }

    $ProjectText = $ProjectText.Insert($projectClose, $ResourceGroup + [Environment]::NewLine)
}

Set-Content -Path $Csproj -Value $ProjectText -Encoding UTF8

if (Test-Path $PatchEngine -PathType Leaf) {
    Write-Host 'Updating PatchEngine.Version...' -ForegroundColor Cyan

    $PatchText = Get-Content $PatchEngine -Raw
    $VersionPattern = '(\bconst\s+string\s+Version\s*=\s*")[^"]+(")'
    $VersionMatches = [regex]::Matches($PatchText, $VersionPattern)

    if ($VersionMatches.Count -eq 1) {
        $PatchText = [regex]::Replace(
            $PatchText,
            $VersionPattern,
            {
                param($m)
                $m.Groups[1].Value + $EngineVersion + $m.Groups[2].Value
            })

        Set-Content -Path $PatchEngine -Value $PatchText -Encoding UTF8
    }
    else {
        Write-Warning @"
PatchEngine.Version was not changed automatically because
the updater source did not contain exactly one matching
const string Version declaration.

The EXE resource version is still changed by the project file.
"@
    }
}
else {
    Write-Warning "PatchEngine.cs not found at expected path: $PatchEngine"
}

Write-Host 'Connecting modernization to Install Update...' -ForegroundColor Cyan
$MainText = Get-Content $MainForm -Raw

if ($MainText -notmatch 'EngineModernization\.Install') {
    $InstallPattern = @'
InstallResult\s+result\s*=\s*UpdateEngine\.Install\(profile,\s*selection\);\s*
if\s*\(!result\.Success\)\s*
throw\s+new\s+InvalidOperationException\(result\.Summary\);\s*
return\s+result\.Summary;
'@

    $InstallMatches = [regex]::Matches(
        $MainText,
        $InstallPattern,
        [System.Text.RegularExpressions.RegexOptions]::Singleline)

    if ($InstallMatches.Count -ne 1) {
        throw @"
Could not safely locate the Install Update block in MainForm.cs.

Expected exactly one UpdateEngine.Install(profile, selection) block,
but found $($InstallMatches.Count).

The pre-upgrade source backup is at:
$BackupRoot
"@
    }

    $InstallReplacement = @'
InstallResult result = UpdateEngine.Install(profile, selection);

            if (!result.Success)
                throw new InvalidOperationException(result.Summary);

            EngineModernizationResult modernization =
                EngineModernization.Install(
                    profile,
                    scan.TargetPath);

            if (!modernization.Success)
            {
                string gameFolder =
                    Path.GetDirectoryName(scan.TargetPath)
                    ?? SelectedFolder();

                InstallResult rollback =
                    BackupService.RestoreLast(gameFolder);

                string rollbackSummary =
                    rollback.Success
                        ? "The executable backup was restored."
                        : "Automatic executable restore failed: " + rollback.Summary;

                throw new InvalidOperationException(
                    modernization.Summary +
                    Environment.NewLine +
                    Environment.NewLine +
                    rollbackSummary);
            }

            return
                result.Summary +
                Environment.NewLine +
                Environment.NewLine +
                modernization.Summary;
'@

    $MainText = [regex]::Replace(
        $MainText,
        $InstallPattern,
        $InstallReplacement,
        [System.Text.RegularExpressions.RegexOptions]::Singleline)
}

Write-Host 'Connecting modernization to Restore Last Backup...' -ForegroundColor Cyan

if ($MainText -notmatch 'EngineModernization\.Restore') {
    $RestorePattern = @'
InstallResult\s+result\s*=\s*BackupService\.RestoreLast\(folder\);\s*
if\s*\(!result\.Success\)\s*
throw\s+new\s+InvalidOperationException\(result\.Summary\);\s*
return\s+result\.Summary;
'@

    $RestoreMatches = [regex]::Matches(
        $MainText,
        $RestorePattern,
        [System.Text.RegularExpressions.RegexOptions]::Singleline)

    if ($RestoreMatches.Count -ne 1) {
        throw @"
Could not safely locate the Restore Last Backup block in MainForm.cs.

Expected exactly one BackupService.RestoreLast(folder) block,
but found $($RestoreMatches.Count).

The pre-upgrade source backup is at:
$BackupRoot
"@
    }

    $RestoreReplacement = @'
InstallResult result = BackupService.RestoreLast(folder);

            if (!result.Success)
                throw new InvalidOperationException(result.Summary);

            EngineModernizationResult engineRestore =
                EngineModernization.Restore(folder);

            if (!engineRestore.Success)
                throw new InvalidOperationException(
                    result.Summary +
                    Environment.NewLine +
                    Environment.NewLine +
                    engineRestore.Summary);

            return
                result.Summary +
                Environment.NewLine +
                Environment.NewLine +
                engineRestore.Summary;
'@

    $MainText = [regex]::Replace(
        $MainText,
        $RestorePattern,
        $RestoreReplacement,
        [System.Text.RegularExpressions.RegexOptions]::Singleline)
}

Set-Content -Path $MainForm -Value $MainText -Encoding UTF8

Write-Host 'Installing Engine 1.7.0.0 Build.ps1...' -ForegroundColor Cyan
Copy-Item $SourceBuild $BuildFile -Force

Write-Host ''
Write-Host 'Upgrade source files installed.' -ForegroundColor Green
Write-Host "Backup: $BackupRoot"
Write-Host ''

if ($NoBuild) {
    Write-Host 'Build skipped because -NoBuild was supplied.' -ForegroundColor Yellow
    exit 0
}

Write-Host 'Starting portable build...' -ForegroundColor Cyan
Write-Host ''

Push-Location $ProjectRoot

try {
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
    & $BuildFile

    if ($LASTEXITCODE -ne 0) {
        throw "Build.ps1 failed with exit code $LASTEXITCODE"
    }
}
finally {
    Pop-Location
}

$FinalExe = Join-Path $ProjectRoot 'artifacts\Devil_dfbhd_update_012105_xx.exe'

if (-not (Test-Path $FinalExe -PathType Leaf)) {
    throw "Expected final EXE was not found: $FinalExe"
}

Write-Host ''
Write-Host '====================================================' -ForegroundColor Green
Write-Host ' DEVIL DFBHD ENGINE 1.7.0.0 READY' -ForegroundColor Green
Write-Host '====================================================' -ForegroundColor Green
Write-Host ''

Get-Item $FinalExe |
    Select-Object FullName, Length,
        @{N='FileVersion';E={$_.VersionInfo.FileVersion}},
        @{N='ProductVersion';E={$_.VersionInfo.ProductVersion}},
        @{N='ProductName';E={$_.VersionInfo.ProductName}}

Write-Host ''
Get-FileHash $FinalExe -Algorithm SHA256
