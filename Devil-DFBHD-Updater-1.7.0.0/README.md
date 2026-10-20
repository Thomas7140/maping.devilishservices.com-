# Devilish Services DFBHD Updater 1.8.0.1

This package is the complete local build source for the Devilish Services update tool for:

- Delta Force: Black Hawk Down client
- Delta Force: Black Hawk Down dedicated server
- Delta Force: Black Hawk Down: Team Sabre client

The updater modifies an existing owned installation. It does not include or redistribute NovaLogic's game executable.

## What 1.8.0.1 does

### DFBHD Server

- 512 MB mission-memory pool
- Large Address Aware
- reliable ordered stale-hole skip
- one-tick server scheduler (~125 Hz)
- configurable multiplayer packet ceiling in dfv.cfg
- Windows FileVersion/ProductVersion stamped to 1.8.0.1
- executable/config backups and restore
- no client graphics wrapper

### DFBHD Client

- 512 MB mission-memory pool
- Large Address Aware
- reliable ordered stale-hole skip
- client co-op NPC navigation/replication correction
- validated high-resolution executable patch
- Direct3D 8 -> Direct3D 9 -> Direct3D 12 translation
- desktop-native, 1080p, 1440p, ultrawide, 4K, 5K/8K and custom render sizes
- refresh-rate selection
- optional borderless fullscreen
- VSync control
- anisotropic filtering
- optional MSAA, defaulting to Off for the sharpest image
- configurable multiplayer packet ceiling in dfv.cfg
- Windows FileVersion/ProductVersion stamped to 1.8.0.1
- executable/config/renderer backups and restore

### DFBHD Team Sabre

Team Sabre is treated as a separate executable build.

1.8.0.1 applies only changes that can be independently validated for Team Sabre:

- generic Large Address Aware
- validated BHD/Team Sabre widescreen-resolution signature
- Direct3D 12 compatibility layer
- dfv.cfg resolution/network tuning
- Windows FileVersion/ProductVersion stamp

The updater does not apply BHD fixed gameplay/network offsets to Team Sabre.

## Resolution implementation

The game remains a Direct3D 8 application internally.

For client profiles the updater uses the validated BHD/Team Sabre 1.5.0.5 widescreen instruction signature:

    EB 42 BF [width dword] BE [height dword] EB 36 BF

Only the two 32-bit width/height immediates are changed. The updater requires exactly one matching instruction signature before writing.

For custom/high resolutions the updater also sets the existing 1024x768 selection slot in dfv.cfg:

    hw3d_res1024x768 = 1
    game_res = 6

This is deliberate: the executable patch replaces that resolution slot with the selected modern resolution.

## Direct3D 12

The bundled client renderer uses pinned 32-bit dxwrapper components and Windows D3D9On12:

    DFBHD Direct3D 8
        -> Direct3D 9 translation
        -> D3D9On12
        -> Direct3D 12

This is a compatibility/translation layer. The proprietary NovaLogic renderer is not being falsely described as a native D3D12 rewrite.

The packaged source already includes the renderer DLLs. Building the updater does not require GitHub or a renderer download.

Pinned payload hashes:

    d3d8.dll
    B8B878E29C2931D6A8D064665C4C93EDB28A0105152E7247F8F543C1603985C3

    dxwrapper.dll
    23A2889E0785A02F17F1EE764254BF22B937FC5BDC6ED6374201A9F50CC7B43D

## UDP packet tuning

The updater exposes a packet ceiling from 576 to 1472 bytes and defaults to 1400 bytes.

It writes:

    mpmaxpacketsize = "1400"

to dfv.cfg for the selected game/server installation. The setting is applied to the local instance's outgoing multiplayer packet ceiling where supported by the NovaLogic networking configuration.

The updater deliberately caps the value at 1472 bytes rather than allowing oversized UDP datagrams that are likely to fragment on a normal 1500-byte IPv4 path.

This setting does not alter the NovaLogic multiplayer packet format and does not claim to enlarge internal receive structures that have not been independently mapped.

## Game executable version

After executable patches are written to a temporary file, the updater changes the Windows VERSIONINFO resource and verifies:

    FileVersion:    1.8.0.1
    ProductVersion: 1.8.0.1

This changes Windows Explorer file metadata only.

The NovaLogic multiplayer protocol/version handshake is intentionally left unchanged.

## Backups

Before changing dfbhd.exe:

    <game folder>\.devil-dfbhd-backups\

receives a timestamped executable backup.

If dfv.cfg changes, it is also backed up there.

If an existing d3d8.dll, dxwrapper.dll or dxwrapper.ini would be replaced, the existing file is backed up before replacement.

Restore Last Backup restores the newest matching executable/configuration/renderer state.

## Safety

The BHD binary patcher is expected-byte checked and idempotent.

- known fixed BHD patch sites must contain either the known original bytes or exact already-patched bytes;
- code caves must be empty or contain the expected cave;
- the widescreen patch requires exactly one validated instruction signature;
- Team Sabre does not receive BHD-only fixed gameplay offsets;
- all writes are made through temporary files;
- failures trigger best-effort rollback;
- existing files are backed up first.

Known stock BHD 1.5.0.5 SHA-256:

    693676B5FB96012D32EE395AC23B4A8BF4D7DD9A9F25AE8E500749A2F0DF34EA

Signature-compatible derivatives can also be accepted when all expected patch bytes validate.

## Still not claimed complete

The following deeper engine work is not marked complete until verified engine hooks are available:

- server-authoritative world raycast from body-safe origin to weapon muzzle
- first-person weapon retraction when approaching solid geometry
- frame-independent projectile/physics conversion
- new interpolation algorithm
- native 64-bit conversion of the proprietary engine

The updater does not install guessed addresses for those features.

## Build locally

Build computer requirements:

- Windows 10 or Windows 11
- .NET 10 SDK

No GitHub build service is required.

PowerShell:

    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
    Set-Location "D:\Devil-DFBHD-Updater-1.8.0.1"
    .\Build.ps1

Output:

    artifacts\Devil_dfbhd_update_012105_xx.exe

The updater is published as a self-contained single-file Windows application. The destination game computer does not need the .NET runtime.

## Files installed on a client

Depending on the selected options:

    dfbhd.exe
    d3d8.dll
    dxwrapper.dll
    dxwrapper.ini
    Devil_DFBHD_Version.json
    DevilDFBHD.Engine.json
    DevilDFBHD-ThirdParty-Notices.txt
    .devil-dfbhd-backups\

dfv.cfg is edited in place only after a backup is created.

## Credits / third-party software

The documented BHD memory, LAA, server scheduler, ordered-hole-skip and client NPC patches are based on the MIT-licensed community patch work in BadgerLove/bhd-patches.

The client Direct3D compatibility layer uses elishacloud/dxwrapper and its bundled third-party components. Applicable notices are included under src\Devil.DFBHD.Updater\ThirdParty.


## 1.8.0.1 black-screen correction

1.8.0.0 forced two renderer settings at the same time:

- dxwrapper custom display width/height
- borderless/window mode

The upstream dxwrapper configuration documents CustomDisplayWidth/CustomDisplayHeight as display-mode limiting settings, while DFBHD 1.8 already patches the game's own resolution slot. Applying both layers was unnecessary and could leave some systems at a black screen.

1.8.0.1 changes the client defaults:

- Direct3D 12 remains available and is the default renderer mode.
- dxwrapper no longer overrides the display width/height; the validated dfbhd.exe resolution patch controls the game resolution.
- borderless/window mode defaults to Off.
- anti-aliasing defaults to Off for the sharpest output.
- Direct3D 9 compatibility mode is available as a fallback.
- Original Direct3D 8 is available as a recovery mode.
- a Fix Black Screen button removes only the Devil renderer layer and restores any pre-existing wrapper backup, without removing the engine/network patches from dfbhd.exe.

Recommended first test after installing 1.8.0.1:

    Renderer:   Direct3D 12 (safe)
    Resolution: Desktop native
    Borderless: Off
    AA:         Off (sharpest)

If the display is still black, run the updater again and choose:

    Original Direct3D 8

or press:

    Fix Black Screen

Then test the game before changing any other option.
