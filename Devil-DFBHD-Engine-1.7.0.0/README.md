# Devil DFBHD Engine 1.7.0.0 — upgrade kit

This folder is a **drop-in upgrade kit** for the existing project:

`D:\Devil-DFBHD-Update-1.6.0.6-game-version`

It preserves the existing `UpdateEngine`, `PatchEngine`, backup logic, server-only 125 Hz payload, and existing validated game patches. It adds the first engine-modernization layer without replacing the existing updater implementation.

## Included files

- `Upgrade-To-1.7.0.0.ps1` — one-step project upgrader.
- `files/EngineModernization.cs` — installs/restores the graphics compatibility layer and writes the engine manifest.
- `files/Build.ps1` — self-contained portable single-EXE build.
- `files/LICENSE-d3d8to9.md` — required third-party license notice.

## What Engine 1.7.0.0 adds now

### DFBHD client

- Preserves the existing client patches already implemented by the 1.6.0.6 updater.
- Installs a verified **Direct3D 8 -> Direct3D 9** compatibility layer beside `dfbhd.exe`.
- Backs up an existing third-party `d3d8.dll` before replacing it.
- Writes `DevilDFBHD.Engine.json`.
- Writes `DevilDFBHD-ThirdParty-Notices.txt`.
- Restore removes the Devil renderer and restores the previous wrapper when one was backed up.

### DFBHDTS client

- Uses the existing Team Sabre binary validation and patches from the current updater.
- Installs the same D3D8 compatibility layer.
- Does **not** install the 125 Hz dedicated-server scheduler.

### DFBHD Server

- Keeps the existing verified server payload:
  `DFBHD_125hz_mem512_LAA_holeskip_TEST.exe`
- Does not install a graphics wrapper on the dedicated-server profile.
- Keeps 125 Hz server-only.

## Renderer pin

The build downloads exactly:

- Component: `crosire/d3d8to9`
- Version: `v1.16.0`
- File: `d3d8.dll`
- SHA-256:
  `122928CFE225C25D30DECF7184A5D37E490CECF3B58256BA3206C7E1853F8AB8`

The build fails if that hash does not match.

## Existing server payload pin

The existing server payload must still have SHA-256:

`105FC81B2C0F8A1B0C5F72AB6B74A255CF83F07AB9C2C210D1CAF625A97FF6A3`

The build fails if it does not match.

## Upgrade the existing project

Open PowerShell 7 and change to the folder containing this kit.

Then run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force

.\Upgrade-To-1.7.0.0.ps1 `
    -ProjectRoot "D:\Devil-DFBHD-Update-1.6.0.6-game-version"
```

The script:

1. Backs up the current updater source.
2. Adds `EngineModernization.cs`.
3. Adds the d3d8to9 license notice.
4. Updates the updater version to `1.7.0.0`.
5. Adds the renderer payloads as embedded resources.
6. Connects modernization to **Install Update**.
7. Connects renderer rollback to **Restore Last Backup**.
8. Replaces `Build.ps1` with the portable builder.
9. Downloads and verifies the pinned renderer.
10. Builds the final portable updater.

## Output

```text
D:\Devil-DFBHD-Update-1.6.0.6-game-version\
    artifacts\
        Devil_dfbhd_update_012105_xx.exe
```

The updater is published:

- self-contained
- single-file
- untrimmed
- ReadyToRun disabled
- single-file compression disabled

Those settings retain the workaround for the previous `GenerateSingleFileBundle / 0xC000001D` failure.

## Files installed into a DFBHD/Team Sabre client

After a successful client install:

```text
<game folder>\
    dfbhd.exe
    d3d8.dll
    DevilDFBHD.Engine.json
    DevilDFBHD-ThirdParty-Notices.txt
    .devil-dfbhd-backups\
```

An existing non-Devil `d3d8.dll` is backed up before replacement.

## Files installed into a dedicated server

No renderer DLL is installed for the server profile.

The existing updater continues to deploy its verified server-only `dfbhd.exe` payload, and the modernization module writes the engine manifest.

## Multiplayer compatibility

Engine 1.7.0.0 does **not** intentionally alter the NovaLogic multiplayer protocol/handshake version.

The displayed Devil engine version is kept separately from the multiplayer protocol.

## Important: what is not being falsely marked complete

This phase does **not** claim the following deep binary hooks are complete:

- true static-world muzzle raycast before accepting a shot
- first-person weapon retraction near a wall
- frame-independent projectile simulation
- frame-independent fall damage
- replacement network interpolation
- full 64-bit conversion of the proprietary Black Hawk engine

Those require independently validated `dfbhd.exe` hook signatures and collision/render call sites.

The engine manifest therefore leaves those fields false until the real hooks have been implemented and tested.

## Next engine phase

The next binary-engine phase should target:

1. DFBHD client fire path.
2. DFBHD server fire validation path.
3. Existing world collision ray/segment function.
4. First-person viewmodel transform path.
5. Frame/tick dependent projectile and movement routines.
6. Independent Team Sabre signature mapping.

That phase should continue to use expected-byte validation and atomic rollback rather than hard-coding unverified addresses.
