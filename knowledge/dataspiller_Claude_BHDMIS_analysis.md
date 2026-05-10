# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Goal

Reverse-engineer the **Delta Force: Black Hawk Down (DFBHD)** and **Team Sabre** mission editor to fully understand:
1. All settings exposed in the BHD Mission Editor UI
2. The binary mission file (.bms) format
3. The text mission metafile (.mis) format
4. Everything needed to build a custom 3D map editor

## Repository Structure

```
ReferenceFiles/        - Primary analysis targets
  DFBHD.EXE            - Game executable (v1.0.0.5)
  dfbhdmedv205c.exe    - Mission Editor executable (v2.05c)
  DFBHD.EXE.c          - Ghidra decompilation of the game (406,939 lines)
  dfbhdmedv205c.exe.c  - Ghidra decompilation of the mission editor (101,604 lines)
  Glotest.mis          - Test mission (text metafile, created 3/6/2026)
  Glotest.bms          - Corresponding binary mission file (rosetta stone pair)
  GeneralMissionSettings.png  - Screenshot of the editor's General Information dialog

BHDTS/                 - Working copy of Black Hawk Down: Team Sabre
  dfbhdmed.exe         - BHDTS Mission Editor
  DFBHD.EXE            - BHDTS game executable
  gamemus.sbf          - Music bank (407 tracks, SBF0 format)
  sample.mis           - Full-featured Novalogic sample mission (best reference)
  *.mis / *.bms        - Mission file pairs
```

## Recommended Reverse Engineering Tools

- **Ghidra** (free, NSA) - Best starting point; decompiles x86 Win32 PE to C pseudocode
- **IDA Pro / IDA Free** - Industry-standard disassembler; IDA Free handles 32-bit
- **x64dbg / OllyDbg** - Dynamic analysis and debugging of the editor at runtime
- **010 Editor** - Hex editor with binary templates; ideal for documenting .bms structure
- **HxD** - Free hex editor for quick binary inspection
- **Resource Hacker** - Extract string tables, dialogs, and menus embedded in the EXE
- **Detect-It-Easy (DIE)** - Identify packers/protections before decompiling
- **strings** / **BinText** - Dump readable strings to find field names in the binary

Start with Resource Hacker on `dfbhdmedv205c.exe` to extract the dialog resource for "General Information" — this will reveal control IDs mapped to fields.

## Analysis Workflow

1. Run **Resource Hacker** on `dfbhdmedv205c.exe` → extract string table and dialog resources to map all UI control labels to internal IDs.
2. Load `dfbhdmedv205c.exe` in **Ghidra** → analyze functions that read/write `general_information` block.
3. Diff `Glotest.mis` vs `Glotest.bms` in **010 Editor** → build binary template for .bms.
4. Use `sample.mis` (full-featured mission) as reference for all possible field values.
5. Document findings in this repo under `ReferenceFiles/`.

---

## Mission File Formats

### .mis (Text Metafile)

Human-readable, saved alongside .bms. Uses `begin <block_name>` / `end <block_name>` syntax.

Key blocks: `general_information`, `weapon_availability`, `briefing`, `waypoint`, `group`, `areatrig`, `layers`, and item/event blocks.

#### `file_version 2`

Always written as a hardcoded `2` by mission editor v2.05c. The editor write function literally calls `FUN_00491cf6(iVar3, s_file_version__i_004afa6c, 2)` — the `2` is a compile-time constant. Neither the game engine nor the editor reads or branches on this value; it is informational only, likely distinguishing Team Sabre's extended format from the original DFBHD "version 1" format (which lacked gen_def_val fields, newer trigger syntax, etc.). **Always write `file_version 2`; ignore it when reading.**

### general_information Block — Field Mapping

The following table maps .mis fields to the Mission Editor UI (see `GeneralMissionSettings.png`):

| .mis field         | UI label / section            | Notes |
|--------------------|-------------------------------|-------|
| `file_version`     | (internal)                    | Always 2; hardcoded in editor |
| `name`             | Mission Name                  | |
| `designer`         | Mission Designer               | |
| `terrain`          | Mission Terrain (dropdown)    | e.g., `flat`, `dvd1`, `mogadishu` |
| `cnv_file`         | Mission Tiles                 | .cnv canvas filename |
| `terrain_tile_tga` | Mission Tiles (alt)           | TGA texture atlas |
| `tt_file`          | Mission Tiles (secondary)     | .tt tile config |
| `terrain_color`    | (terrain color/palette index) | |
| `player_type`      | Player Type                   | 1 = Delta Force |
| `attrib`           | Map Types (bitmask)           | Multiplayer game mode flags |
| `max_saves`        | Max Saved Games               | |
| `map_zoom`         | Starting Spin-map Zoom        | 0.50 = default |
| `bonus_expiration` | Bonus Expiration              | |
| `hardwin`          | Win Conditions — Critical     | bitmask of 8 conditions |
| `hardlose`         | Lose Conditions — Critical    | bitmask of 8 conditions |
| `subgoals_win`     | Win Conditions — Type (x8)    | 8 space-separated values |
| `subgoals_lose`    | Lose Conditions — Type (x8)   | 8 space-separated values |
| `win_scores`       | Win Conditions — Score (x8)   | |
| `lose_scores`      | Lose Conditions — Score (x8)  | |
| `water_level`      | Mission Overrides: Water Level | integer; ×0.5 m per unit |
| `fog_level`        | Mission Overrides: Fog Distance (m) | |
| `fog_color`        | Mission Overrides: Fog Color  | packed RGB int |
| `wind`             | Wind Speed + Direction        | `<kph> <degrees>` |
| `sunset`           | Environment File (dropdown)   | e.g., `dawn1`, `dusk2` |
| `weather_type`     | Weather                       | 0 = Nice Day |
| `gen_def_val1`     | Global Effects: Music         | 0-based SBF track index |
| `gen_def_val2`     | Global Effects: Reverb        | reverb level |
| `gen_def_val3`     | Global Effects: Health        | starting health override |
| `gen_def_val4`     | Global Effects: Mana          | character mana pool |
| `visible_if`       | (visibility condition bitmask)| |
| `notvisible_if`    | (not-visible condition bitmask)| |
| `arty`             | (artillery flag)              | |
| `lowest_elev`      | (lowest terrain elevation)    | used for culling |
| `num_items`        | (item count)                  | redundant; counted from blocks |
| `num_events`       | (event count)                 | redundant |
| `viewx/y/z`        | (editor camera position)      | NOT saved to .bms |
| `viewzoom`         | (editor camera zoom)          | NOT saved to .bms |

### Global Effects — Confirmed Meanings

#### Music (`gen_def_val1`) — zero-based index into `gamemus.sbf`

**Valid range: 0–406** (407 total tracks). Out-of-range values silently clamp to 0 (confirmed from `FUN_00560e10` in `DFBHD.EXE.c`). `Glotest.mis` uses value 5 = track MARKA008.

Track index ranges by name prefix:

| Index range | Prefix  | Count | Likely context |
|-------------|---------|-------|----------------|
| 0–17        | MARKA   | 18    | Mogadishu market ambient |
| 18–35       | BANDIT  | 18    | Enemy/combat |
| 36–87       | RIVER   | 52    | River/waterway area |
| 88–99       | GASA    | 12    | Desert/Gasa area |
| 100–115     | BE      | 16    | Battle events |
| 116–167     | RADIO   | 52    | Radio/comms style |
| 168–210     | RUSS    | 43    | Russian/militia area |
| 211–237     | SHAT    | 27    | Shatville area |
| 238–268     | DIPIM   | 31    | — |
| 269–270     | SHORE   | 2     | Shore/coast |
| 271–307     | IRENE   | 37    | Operation Irene |
| 308–340     | STAND   | 33    | Standoff/defensive |
| 341         | LOST    | 1     | — |
| 342         | VALIANT | 1     | — |
| 343–374     | MOG     | 32    | Mogadishu city |
| 375–392     | ENDWN   | 18    | End/win stingers |
| 393         | FAIL    | 1     | Mission failed |
| 394–405     | WIN     | 12    | Mission win |
| 406         | DRMEND  | 1     | Drum end stinger |

Music volume function `FUN_00561110` accepts 0–255, stored as `param_1 << 0x10` in `DAT_00f64424`.

#### Reverb (`gen_def_val2`)

Global reverb level for the map. Also exists as a per-item zone property at item struct offset `+0x108` (16-bit). `Glotest.mis` uses value 32.

#### Health (`gen_def_val3`)

Starting health override for the mission. `Glotest.mis` uses value 4. Related to `HPBONUS` per-character values in `charattr.def`.

#### Mana (`gen_def_val4`)

Character class resource pool. `HUD_MANA` and `MANABONUS` identifiers exist in `DFBHD.EXE.c`; `charattr.def` contains per-character MANABONUS values read at mission start. Value is a non-negative integer; 0 = no mana.

### .sbf Sound Bank Format

Magic `SBF0` (4 bytes) + reserved (16 bytes) + **track count at offset 20** (4-byte LE int) + directory entries starting at **offset 24**. Each entry is **32 bytes**: 16-byte null-padded name, 4-byte file offset (LE), 4-byte size (LE), 8 bytes other fields.

`gamemus.sbf`: 407 tracks, audio data starts at `0x32F8` = 13048 = 24 + (407 × 32).

### attrib Bitmask (Map Types / Game Modes)

`attrib` on general_information encodes which multiplayer game modes are enabled:
- `attrib 1048608` = `0x100020` (bits 5 and 20 set)
- `attrib 16777216` = `0x1000000` (bit 24 set)

Game modes to map to bits (needs confirmation): Cooperative, Deathmatch, Team Deathmatch, King of the Hill, Team King of the Hill, Capture the Flag, Flagball, Search & Destroy, Attack & Defend.

Items, areatrigs, waypoints, and groups each also have their own `attrib` field — these control item-level behaviors (team restrictions, visibility conditions, etc.).

### Player Waypoint Names — `wpnumber` and `.bin` String Tables

The editor dialog "Waypoint Name ID's (WPN00n)" assigns a numeric ID to each player waypoint slot (up to 8 for Team Blue, 8 for Team Red). That ID is stored in the item's `.mis` field as **`wpnumber <n>`**.

At runtime the game builds key `STRWPNAME%03i` (e.g., `STRWPNAME005`) and looks it up in the `WPNames` section of a binary RTXT string table file.

**File loading order** (from `dfbhdmedv205c.exe.c` lines 24638–24651):
1. Strip path from mission filename, change extension from `.mis` → `.bin` (e.g., `Glotest.bin`)
2. Try to load that **mission-specific** `.bin` file
3. If not found: fall back to `medmssn.bin` (global default from PFF) + show a warning

Map makers can define **custom waypoint names** by placing a `<missionname>.bin` file (RTXT format) alongside their `.mis`/`.bms` files. The custom `.bin` must contain a `WPNames` section with `STRWPNAME000`–`STRWPNAME026` keys mapping to custom display name strings.

**Default names in `medmssn.bin` IDs 0–26 (NATO phonetic alphabet):**

| ID | Name | ID | Name | ID | Name |
|---|---|---|---|---|---|
| 0 | Null | 9 | India | 18 | Romeo |
| 1 | Alpha | 10 | Joker | 19 | Sierra |
| 2 | Bravo | 11 | Kilo | 20 | Tango |
| 3 | Charlie | 12 | Lima | 21 | Uniform |
| 4 | Delta | 13 | Mike | 22 | Victor |
| 5 | Echo | 14 | November | 23 | Whiskey |
| 6 | Foxtrot | 15 | Oscar | 24 | X-Ray |
| 7 | Golf | 16 | Papa | 25 | Yankee |
| 8 | Hotel | 17 | Quebec | 26 | Zulu |

**Hardcoded name keys** (override numeric lookup based on item type flags — not settable via the dialog):

| Key | Used for |
|---|---|
| `STRWPNAMEFLAG` | CTF flag objects (type IDs `0xffb`, `0xffd`, `0xfff`, `0x1000`, `0x1001`) |
| `STRWPNAMEFLAGBAY` | Flag bay objects (type IDs `0x1002`, `0x1004`–`0x1007`) |
| `STRWPNAMETARGET` | Items with bit `0x8000` in attrib |
| `STRWPNAMEARMORY` | Items with bit `0x80000` in attrib |

**RTXT binary format**: magic `RTXT` (4 bytes) + key table offset at byte 4 (LE int32) + section/key/value table. Use extracted `medmssn.bin` (`PffExtracted/resource/medmssn.bin`) as a template.

`medmssn.bin` also contains other string table sections used by the mission system:
- `WinConditions` / `LoseConditions` — `STRWINCOND000`–`STRWINCOND###` (objective condition strings)
- `WinMsg` / `LoseMsg` — `STRWINMSG###` / `STRLOSEMSG###` (mission outcome messages)
- `PeopleNames` — `STRNAME000`–`STRNAME###` (character display names)

### .bms (Binary Mission File)

Binary counterpart to .mis. Structure not yet fully documented. Use 010 Editor with a custom binary template. Compare `Glotest.mis` against `Glotest.bms` as a known pair to reverse the format.

---

## 3D Map Editor — Key Technical Findings

### Coordinate System

| Property | Value |
|---|---|
| World units per meter | 65,536 (`0x10000`) |
| World half-extent | 65,536,000 units (= 1000 m) |
| Total world size | 2000 m × 2000 m (2 km × 2 km) |
| Coordinate conversion | meters = world_units / 65536 |

Confirmed from `DFBHD.EXE.c`: `0x3e80000` = 65,536,000 is the world half-size boundary constant; `>> 0x10` shift converts world units to grid cells. Item positions in .mis are raw world-unit integers.

### Item Struct Layout

Editor stride = `0x17c` (380 bytes). Game runtime stride = `0x7b8` (1976 bytes, inflated with cached/computed data).

From the save function in `dfbhdmedv205c.exe.c` lines 25437–25619:

| Field | Struct offset | .mis token |
|---|---|---|
| type_id | +0x00 | `type_id` |
| id | +0x04 | `id` |
| x position | +0x0C | `position` (1st value) |
| y position | +0x10 | `position` (2nd value) |
| z position | +0x14 | `position` (3rd value) |
| yaw (facing) | +0x18 | `facing` (1st value) |
| pitch | +0x1C | `facing` (2nd value) |
| team | +0x24 | `team` |
| layer | +0xE0 | `layer` |
| reverb zone | +0x108 | `reverb` (per-item zone, 16-bit) |
| health | +0x10C | `health` |
| mana | +0x110 | `mana` |
| mlink name | +0x11C | `mlink` (16-char string) |
| ai_textfile | +0x12C | `ai_textfile` (8-char string) |
| gen_string | +0x140 | `gen_string` |
| height_lock | +0x168 | `height_lock` |
| active_area | +0x174 | `active_area` |

Item attribute flags (per-item `attrib` bitmask at `+0x34` in runtime struct):
- Bit 25 (`0x2000000`) = NoShadow
- Bit 26 (`0x4000000`) = Reflect (water reflection)

### Facing Convention

- Integer degrees **0–359**, compass-style
- **0 = North, 90 = East, 180 = South, 270 = West**
- Format in .mis: `facing <yaw> <pitch>` — pitch is typically 0 for ground items

### Item Type Classes

| type_id class | Class name |
|---|---|
| 1 | vehicle |
| 3 | person |
| 4 | marker |
| 5 | building |
| — | decoration, foliage, powerup, effect, object |

`type_id` within each class refers to the specific model/unit (e.g., type_id 1175 = bunker wall, 1186 = armory).

### 3DI / IAI Model Pipeline

- Items reference models via **`iai_name`** — an 8-character identifier
- `iai_name` → `.3di` 3D model file → loaded from `.pff` packed resource archive
- `.pff` is Novalogic's proprietary archive format — needs a PFF extractor to access raw `.3di` geometry
- Hardcoded special engine models: `upl.3di`, `star_3di`, `glare_3di`, `sun_3di`, `3DIPower1`–`3DIPower8`, `3DIHud`
- Missing `.3di` triggers engine error: `Missing_3di(s)_from_%s`

### Terrain System

- **Voxel-based renderer** — terrain is heightmap/voxel data, not polygon mesh
- `.cnv` = canvas file (raw height + color voxel data)
- `.tt` = tile configuration file
- `terrain_tile_tga` = TGA texture atlas for surface textures
- `terrain` field names a terrain config (`flat`, `dvd1`, `mogadishu`, etc.)
- `terrain_color` = palette/color index
- "No Voxels" engine override flag exists for flat/debug rendering
- `lowest_elev` = lowest terrain elevation (used for rendering culling)
- `water_level` = water plane height; integer units, ×0.5 m per unit

### Layer System

Named layers group editor items:
- Declared in `begin layers` / `end layers` block
- Each layer has a **name** and a **color** (packed RGBA int)
- Items reference their layer by index: `layer <n>`
- Common Novalogic layer names: `Blue Waypoints`, `Enemy Waypoints`, `Decorations`, `People`, `Vehicles`, `Buildings`, `Triggers`

### areatrig / waypoint / group Blocks

| Block | Purpose | Key fields |
|---|---|---|
| `begin areatrig <id>` | Trigger zone | `name`, `position`, `radius`, `color`, `attrib`, `layer` |
| `begin waypoint <id>` | Navigation point | `name`, `position`, `color`, `attrib`, `layer` |
| `begin group <id>` | Logical item group | `name`, `attrib`, `layer` |

All three share the same `color` and `attrib` field pattern as items.

### Event / Trigger / Action System

```
begin event <id>
  name "..."
  attrib <bitmask>
  delay_value <n>
  reset_value <n>
  begin triggers_<n>
    ... trigger conditions ...
  end triggers_<n>
  begin actions_<n>
    ... actions to execute ...
  end actions_<n>
end event
```

- `attrib` controls whether event fires once or repeats, team restrictions, etc.
- Events reference items by `id`
- `delay_value` = time delay before firing; `reset_value` = reset/cooldown timer

### Editor-Only Fields (NOT in .bms)

- `viewx`, `viewy`, `viewz` — editor camera position
- `viewzoom` — editor camera zoom
- `num_items`, `num_events` — redundant counts

### Summary: What a Custom 3D Map Editor Needs

1. **Parse and write .mis** — authoring format; all fields are documented above
2. **Compile .mis → .bms** — invoke the game/editor, or reverse-engineer .bms directly using `Glotest.mis` + `Glotest.bms` as a pair
3. **Scale display**: divide world units by 65,536 to convert to meters
4. **Load .3di models from .pff archives** — need PFF extractor + .3di geometry parser
5. **Render terrain** from `.cnv` + `.tt` files (flat plane proxy is viable initially)
6. **Implement layer system** for scene organization and visibility toggling
7. **Always write `file_version 2`**; the value is a hardcoded constant, not dynamic

Biggest unknowns requiring further RE: `.bms` binary layout, `.3di` geometry format, `.pff` archive structure.
