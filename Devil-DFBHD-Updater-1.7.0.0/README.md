# Devilish Services DFBHD Updater 1.7.0.0

This is the complete source tree needed to build the portable Windows updater for:

- Delta Force: Black Hawk Down client
- Delta Force: Black Hawk Down dedicated server
- Delta Force: Black Hawk Down: Team Sabre client

The updater patches the user's existing dfbhd.exe; no NovaLogic game executable is distributed in this source package.

## Implemented patch profiles

### DFBHD Server

- 512 MB mission memory pool
- Large Address Aware
- reliable-ordered hole-skip patch
- 125 Hz one-tick server scheduler
- no graphics wrapper

### DFBHD Client

- 512 MB mission memory pool
- Large Address Aware
- reliable-ordered hole-skip patch
- client-side co-op NPC navigation/replication fix
- Direct3D 8 to Direct3D 9 compatibility wrapper

### Team Sabre Client

Team Sabre is treated as a separate executable build. Until Team Sabre-specific engine offsets are independently mapped, the updater applies only:

- generic PE Large Address Aware
- Direct3D 8 to Direct3D 9 compatibility wrapper

It deliberately does not apply Black Hawk Down offsets to Team Sabre.

## Modern graphics layer

At build time, Build.ps1 downloads the pinned d3d8to9 v1.16.0 d3d8.dll and verifies:

122928CFE225C25D30DECF7184A5D37E490CECF3B58256BA3206C7E1853F8AB8

The verified DLL is embedded in the portable updater and installed only for client profiles.

## Safety

The binary patcher is idempotent and expected-byte checked:

- each patch accepts only its known original bytes or its already-patched bytes;
- code caves must be all-zero or already contain the exact expected cave;
- unknown bytes abort before the target executable is written;
- the current executable is backed up first;
- replacement is performed through a temporary file;
- restore returns the newest saved executable and restores a pre-existing d3d8 wrapper if one was replaced.

Known stock BHD v1.5.0.5 SHA-256:

693676B5FB96012D32EE395AC23B4A8BF4D7DD9A9F25AE8E500749A2F0DF34EA

The updater also accepts signature-compatible derivatives, including already-patched files, rather than relying only on the stock hash.

## Deep engine work not yet claimed complete

The following still require independently validated engine hooks and therefore remain disabled in the engine manifest:

- true static-world muzzle raycast before accepting a shot
- first-person weapon retraction at walls
- frame-independent projectile/physics conversion
- new network interpolation
- native 64-bit conversion of the proprietary engine

No unverified addresses are written for these features.

## Build

Requirements on the build computer:

- Windows 10 or Windows 11
- .NET 10 SDK
- Internet access the first time so the pinned renderer can be downloaded

Run:

    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
    Set-Location "D:\Devil-DFBHD-Updater-1.7.0.0"
    .\Build.ps1

Output:

    artifacts\Devil_dfbhd_update_012105_xx.exe

The produced updater is self-contained, single-file, untrimmed, ReadyToRun-disabled, and uses an uncompressed single-file bundle. The destination PC does not need the .NET runtime.

## Credits

The documented BHD patch algorithms and byte sites for mission memory, LAA, server scheduler, ordered hole skip, and NPC replication are based on the MIT-licensed community work in BadgerLove/bhd-patches. The applicable license is included under ThirdParty.

The Direct3D wrapper is crosire/d3d8to9, BSD-2-Clause. Its license is also included under ThirdParty.
