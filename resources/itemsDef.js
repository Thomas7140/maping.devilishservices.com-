// Embedded ITEMS.DEF for BHD web map editor
// Auto-generated from ITEMS.DEF.txt
// This is a classic script (not an ES module) to work with file:// too.

window.BHD_ITEMS_DEF_TEXT = `\


begin "Null"
  id 100000
  type marker
end  



begin "Large Cargo Ship with interior in Shore Patrol"
  id 101152
  attrib: Landable 
  type vehicle
  graphic Ship01
  attrib: AIData neutral
  ai_function cbot
  render_function cbot
  move_function cjbt
  default_aip wu
  hp 1000
  kz 8
  armor 201 -1
  score 50
  unit_type 7
  husk ship01x
  sounddeath EXPLO_BOAT_LG
  particlefx effect_FxGsmokM Pfx00
  particledeath Effect_Boat02Trig
  
  particlefire Effect_UpsFireP
  
  husk_sub_part_types 01_HULL 02_CHUNK_M 03_CHUNK_M 04_CHUNK_L 05_CHUNK_M 06_CHUNK_M 07_ChunkSF_M 08_ChunkSF_M 09_CHUNK_M 10_CHUNK_M 11_CHUNK_M 12_CHUNK_M 13_CHUNK_M
end

begin "Iranian Oil Tanker"
  id 106251
  attrib: Landable Reflect
  type vehicle
  graphic OTNKR
  attrib: AIData neutral
  ai_function cbot
  render_function cbot
  move_function cjbt
  default_aip wu
  hp 10000
  kz 8
  armor -1
  score 50
  unit_type 7
  husk ship01x
  sounddeath EXPLO_BOAT_LG
  particlefx effect_FxGsmokM Pfx00
  particledeath Effect_Boat02Trig
  
  particlefire Effect_UpsFireP
  
  husk_sub_part_types 01_HULL 02_CHUNK_M 03_CHUNK_M 04_CHUNK_L 05_CHUNK_M 06_CHUNK_M 07_ChunkSF_M 08_ChunkSF_M 09_CHUNK_M 10_CHUNK_M 11_CHUNK_M 12_CHUNK_M 13_CHUNK_M
end

begin "UN Truck with smoking engine used in Marka Breakdown"
  id 101265
  type vehicle
  graphic UNtrck2
  attrib: AIData good
  shadow  shadow1.tga   3.5  9.8  0.0  0.15
  hp 700
  armor 50 50
  score 50
  ai_function cveh
  render_function cveh
  move_function cveh
  husk untrck2X
  default_aip gu_s
  soundloop LP_TRUCK_LG
  unit_type 1
  sounddeath EXPLO_VEH_TRKLG
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuftrk
  
  particleother effect_SteamExpNp
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_CHUNK_L 06_CHUNK_S 07_CHUNK_L 08_CHUNK_M 09_CHUNK_M
End

begin "Enemy Cargo Truck #1"
  id 101266
  type vehicle
  graphic Etrck1
  attrib: AIData Evil
  shadow  shadow1.tga   3.5  10.1  0.0  0.0
  hp 1000
  armor 50 50
  score 50
  ai_function cveh
  render_function cveh
  move_function cveh
  husk Etrck1X
  default_aip gu_s
  soundloop LP_TRUCK_LG
  unit_type 1
  sounddeath EXPLO_VEHCL_LG
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuftrk
  
  particleother Effect_SmkNStemNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_CHUNK_M 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M 10_CHUNK_M 11_CHUNK_M 12_CHUNK_M 13_CHUNK_M 14_CHUNK_M 15_ChunkSF_M
  
  rotor_parts 0 0 0 0
  
  
End

begin "VBL with 7.62mm turret"
  id 106207
  type vehicle
  graphic VBL01
  attrib: AIData Evil
  shadow shadow1.tga   3.3  6.6  0.0  0.0
  husk VBL01X
  hp 400
  armor 105 40
  score 20
  heatsig  1000
  radarsig 1300
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_Jeep
  unit_type 1
  soundloop LP_V_VBL
  sounddeath EXPLO_VEH_TECH
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuf 
  
  particleother Effect_EtekFireNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_CHUNK_M 05_CHUNK_L 06_CHUNK_L 07_CHUNK_S 08_CHUNK_S
  addeweap VBLtur 106213
end

begin "VBL 7.62mm turret"
  id 106213
  type object
  graphic VBLtur
  attrib: EWeap 
  husk nullx
  HP 10
  armor -1
  ai_function ewep		
  move_function ewep
  render_function ewep
  disk_function EMPLACE
  primary_weapon WPN_EMP50VBL
end

begin "Enemy Cargo Truck #2 w"
  id 101286
  type vehicle
  graphic Etrck2
  attrib: AIData Evil
  shadow  shadow1.tga   3.5  10.1  0.0  0.0
  hp 1000
  armor 50 50
  score 50
  ai_function cveh
  render_function cveh
  move_function cveh
  husk Etrck1X
  default_aip gu_s
  soundloop LP_TRUCK_LG
  unit_type 1
  sounddeath EXPLO_VEHCL_LG
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuftrk
  
  particleother Effect_SmkNStemNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_CHUNK_M 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M 10_CHUNK_M 11_CHUNK_M 12_CHUNK_M 13_CHUNK_M 14_CHUNK_M 15_ChunkSF_M
End





begin "U.N. Cargo Truck #1"
  id 101261
  type vehicle
  graphic UNtrck1
  attrib: AIData good
  shadow  shadow1.tga   3.5  9.6  0.0  0.0
  hp 700
  armor 50 50
  score 50
  ai_function cveh
  render_function cveh
  move_function cveh
  husk UNtrck1X
  default_aip gu_s
  soundloop LP_TRUCK_LG
  unit_type 1
  sounddeath EXPLO_VEH_TRKLG
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuftrk
  
  particleother Effect_SmkNStemNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_CHUNK_M 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M 10_CHUNK_M 11_CHUNK_M 12_CHUNK_M 13_CHUNK_M 14_CHUNK_M 15_ChunkSF_M
end

begin "U.N. Cargo Truck #3"
  id 101285
  type vehicle
  graphic UNtrck3
  attrib: AIData good
  shadow  shadow1.tga   3.5  9.6  0.0  0.0
  hp 700
  armor 50 50
  score 50
  ai_function cveh
  render_function cveh
  move_function cveh
  husk UNtrck3X
  default_aip gu_s
  soundloop LP_TRUCK_LG
  unit_type 1
  sounddeath EXPLO_VEH_TRKLG
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuftrk
  particleother Effect_SmkNStemNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_CHUNK_M 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M 10_CHUNK_M 11_CHUNK_M 12_CHUNK_M 13_CHUNK_M 14_CHUNK_M 15_ChunkSF_M 16_CHUNK_M
end

begin "Enemy Motorized River Boat"
  id 101256
  type vehicle
  graphic Eboat01
  husk Eboat01X
  ai_function cbot
  move_function cbbt
  render_function cveh
  attrib: AIData Reflect
  hp 500
  armor 4
  default_aip wu
  soundloop LP_EVILYACHT
  unit_type 6
  sounddeath EXPLO_BOAT_LG
  particledeath Effect_Boat01Trig
  particlefire Effect_UpsFireP
  husk_sub_part_types 01_HULL 02_CHUNK_M 03_CHUNK_S 04_CHUNK_S 05_CHUNK_S 06_CHUNK_S 07_CHUNK_S 08_CHUNK_M 09_CHUNK_L 10_CHUNK_M 11_CHUNK_L 12_CHUNK_L 13_CHUNK_L
end

begin "Enemy Motorized River Boat 2"
  id 106252
  type vehicle
  graphic EBOAT2
  husk Eboat01X
  ai_function cbot
  move_function cbbt
  render_function cveh
  attrib: AIData Reflect
  hp 500
  armor 4
  default_aip wu
  soundloop LP_EVILYACHT
  unit_type 6
  sounddeath EXPLO_BOAT_LG
  particledeath Effect_Boat01Trig
  particlefire Effect_UpsFireP
  husk_sub_part_types 01_HULL 02_CHUNK_M 03_CHUNK_S 04_CHUNK_S 05_CHUNK_S 06_CHUNK_S 07_CHUNK_S 08_CHUNK_M 09_CHUNK_L 10_CHUNK_M 11_CHUNK_L 12_CHUNK_L 13_CHUNK_L
end

begin "Drug Lord's Speed Boat"
  id 106257
  type vehicle
  graphic DDSB01
  husk DDSb01X
  ai_function cbot
  move_function cbbt
  render_function cveh
  attrib: AIData Reflect
  hp 500
  armor 4
  default_aip wu
  soundloop LP_EVILYACHT
  unit_type 6
  sounddeath EXPLO_BOAT_LG
  particledeath Effect_Boat01Trig
  particlefire Effect_UpsFireP
  husk_sub_part_types 01_HULL 02_CHUNK_M 03_CHUNK_S 04_CHUNK_S 05_CHUNK_S 06_CHUNK_S 07_CHUNK_S 08_CHUNK_M 09_CHUNK_L 10_CHUNK_M 11_CHUNK_L 12_CHUNK_L 13_CHUNK_L
end

begin "Drug Lord's Speed Boat with Hardened Armor"
  id 106283
  type vehicle
  graphic DDSB01
  husk DDSb01X
  ai_function cbot
  move_function cbbt
  render_function cveh
  attrib: AIData Reflect
  hp 105
  armor 105 -1
  default_aip wu
  soundloop LP_EVILYACHT
  unit_type 6
  sounddeath EXPLO_BOAT_LG
  particledeath Effect_Boat01Trig
  particlefire Effect_UpsFireP
  husk_sub_part_types 01_HULL 02_CHUNK_M 03_CHUNK_S 04_CHUNK_S 05_CHUNK_S 06_CHUNK_S 07_CHUNK_S 08_CHUNK_M 09_CHUNK_L 10_CHUNK_M 11_CHUNK_L 12_CHUNK_L 13_CHUNK_L
end

begin "Iranian Patrol Boat"
  id 106330
  type vehicle
  graphic PTRLB
  husk PTRLB_X
  ai_function cbot
  move_function cbbt
  render_function cveh
  attrib: AIData Reflect
  hp 500
  armor 4
  default_aip wu
  soundloop LP_EVILYACHT
  unit_type 6
  sounddeath EXPLO_BOAT_LG
  particledeath Effect_Boat01Trig
  particlefire Effect_UpsFireP
  husk_sub_part_types 01_HULL 02_CHUNK_M 03_CHUNK_S 04_CHUNK_S 05_CHUNK_S 06_CHUNK_S 07_CHUNK_S 08_CHUNK_M 09_CHUNK_L   10_CHUNK_M 11_CHUNK_L 12_CHUNK_L 13_CHUNK_L
 addeweap ewep01 101877
 addeweap ewep02 101877
end

begin "Drug Smuggler's Plane"
  id 106259
  type vehicle
  graphic SDC3
  husk SDC3X
  attrib: AIData Evil
  shadow  shadow1.tga   3.5  10.1  0.0  0.0
  HP 105		
  armor 105 -1	
  score 50
  ai_function cpln
  render_function cpln
  move_function cpln
  default_aip pu_s
  soundloop LP_DC3IDLE
  unit_type 4
  sounddeath EXPLO_VEHCL_LG
  particledeath Effect_Fuelxp4
  particlefinale Effect_VehDrtPuftrk
  
  particleother Effect_SmkNStemNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_CHUNK_M 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M 10_CHUNK_M   11_CHUNK_M 12_CHUNK_M 13_CHUNK_M 14_CHUNK_M 15_ChunkSF_M
  rotor_parts 3 1 0 0
  aux_parts 0 0 4 2
End

  
  
  
  

begin "Rigid Hull Inflatable Boat (collision bow)"
  id 106214
  type vehicle
  graphic RHIB
  husk RHIBX
  ai_function cbot
  move_function cbbt
  render_function cveh
  attrib: AIData Reflect
  hp 500
  armor 4
  default_aip wu
  soundloop LP_B_RHIB
  unit_type 6
  sounddeath EXPLO_BOAT_LG
  particledeath Effect_Boat01Trig
  particlefire Effect_UpsFireP
  husk_sub_part_types 01_HULL 02_CHUNK_M 03_CHUNK_S 04_CHUNK_S 05_CHUNK_S 06_CHUNK_S 07_CHUNK_S 08_CHUNK_M 09_CHUNK_L 10_CHUNK_M 11_CHUNK_L 12_CHUNK_L 13_CHUNK_L
  addeweap ewep01 101877
end

begin "Rigid Hull Inflatable Boat (collision perimeter)"
  id 106324
  type vehicle
  graphic RHIB02
  husk RHIBX
  ai_function cbot
  move_function cbbt
  render_function cveh
  attrib: AIData Reflect
  hp 500
  armor 4
  default_aip wu
  soundloop LP_B_RHIB
  unit_type 6
  sounddeath EXPLO_BOAT_LG
  particledeath Effect_Boat01Trig
  particlefire Effect_UpsFireP
  husk_sub_part_types 01_HULL 02_CHUNK_M 03_CHUNK_S 04_CHUNK_S 05_CHUNK_S 06_CHUNK_S 07_CHUNK_S 08_CHUNK_M 09_CHUNK_L 10_CHUNK_M 11_CHUNK_L 12_CHUNK_L 13_CHUNK_L
  addeweap ewep01 101877
end

begin "User Drivable Motorized River Boat"
  id 101260
  type vehicle
  graphic Eboat01
  ai_function cbot
  move_function cbbt
  render_function cveh
  attrib: AIData PlayerControl
  hp 500
  score 500
  armor 4
  husk Eboat01X
  default_aip wu
  soundloop LP_EVILYACHT
  unit_type 6
  sounddeath EXPLO_BOAT_LG
  particledeath Effect_Boat01Trig
  particlefire Effect_UpsFireP
  husk_sub_part_types 01_HULL 02_CHUNK_M 03_CHUNK_S 04_CHUNK_S 05_CHUNK_S 06_CHUNK_S 07_CHUNK_S 08_CHUNK_M 09_CHUNK_L 10_CHUNK_M 11_CHUNK_L 12_CHUNK_L 13_CHUNK_L
end

begin "Technical 5"
  id 101268
  type vehicle
  graphic ETek5
  attrib: AIData Evil
  shadow shadow1.tga   3.2  6.9  0.0  0.0
  husk Etek45X
  hp 400
  armor 105 40
  score 20
  heatsig  1000
  radarsig 1300
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_Jeep
  unit_type 1
  soundloop LP_TECH1
  sounddeath EXPLO_VEH_TECH
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuf 
  
  particleother Effect_EtekFireNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_WHEEL 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_L 10_CHUNK_L 11_CHUNK_L
end

begin "Technical with Emplaced Cannon #5"
  id 101274
  type vehicle
  graphic ETek5
  attrib: AIData Evil
  shadow shadow1.tga   3.2  6.9  0.0  0.0
  husk Etek45X
  hp 400
  armor 105 40
  score 20
  heatsig  1000
  radarsig 1300
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_Jeep
  unit_type 1
  soundloop LP_TECH1
  sounddeath EXPLO_VEH_TECH
  addeweap ewep01 101882
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuf 
  
  particleother Effect_EtekFireNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_WHEEL 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_L 10_CHUNK_L 11_CHUNK_L
end

begin "Technical 4"
  id 101267
  type vehicle
  graphic ETek4
  attrib: AIData Evil
  shadow shadow1.tga   3.2  6.9  0.0  0.0
  husk Etek45X
  hp 400
  armor 105 40
  score 20
  heatsig  1000
  radarsig 1300
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_Jeep
  unit_type 1
  soundloop LP_TECH1
  sounddeath EXPLO_VEH_TECH
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuf 
  
  particleother Effect_EtekFireNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_WHEEL 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_L 10_CHUNK_L 11_CHUNK_L
end

begin "Technical with Emplaced Cannon #4"
  id 101273
  type vehicle
  graphic ETek4
  attrib: AIData Evil
  shadow shadow1.tga   3.2  6.9  0.0  0.0
  husk Etek45X
  hp 400
  armor 105 40
  score 20
  heatsig  1000
  radarsig 1300
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_Jeep
  unit_type 1
  soundloop LP_TECH1
  sounddeath EXPLO_VEH_TECH
  addeweap ewep01 101882
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuf 
  
  particleother Effect_EtekFireNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_WHEEL 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_L 10_CHUNK_L 11_CHUNK_L
end

begin "Technical enemy vehicle #3"
  id 101245
  type vehicle
  graphic ETek3
  attrib: AIData Evil
  shadow shadow1.tga   3.2  6.9  0.0  -0.1
  husk Etek2X
  hp 600
  armor 105 40
  score 20
  heatsig  1000
  radarsig 1300
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_Jeep
  unit_type 1
  soundloop LP_TECH1
  sounddeath EXPLO_VEH_TECH
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuf 
  
  particleother Effect_EtekFireNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_CHUNK_M 05_CHUNK_L 06_CHUNK_L 07_CHUNK_S 08_CHUNK_S
end

begin "Technical enemy vehicle #6"
  id 101288
  type vehicle
  graphic ETek6
  attrib: AIData Neutral
  shadow shadow1.tga   3.2  6.9  0.0  -0.1
  husk Etek6X
  hp 600
  armor 105 40
  score 20
  heatsig  1000
  radarsig 1300
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_Jeep
  unit_type 1
  soundloop LP_TECH1
  sounddeath EXPLO_VEH_TECH
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuf 
  particleother Effect_EtekFireNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_CHUNK_M 05_CHUNK_L 06_CHUNK_L 07_CHUNK_S 08_CHUNK_S
end


begin "Technical enemy vehicle with mounted 50cal"
  id 101239
  type vehicle
  graphic ETek2
  attrib: AIData Evil
  shadow shadow1.tga   3.2  6.9  0.0  -0.1
  husk Etek2X
  hp 400
  armor 105 40
  score 20
  heatsig  1000
  radarsig 1300
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_Jeep
  unit_type 1
  soundloop LP_TECH1
  sounddeath EXPLO_VEH_TECH
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuf 
  
  particleother Effect_EtekFireNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_CHUNK_M 05_CHUNK_L 06_CHUNK_L 07_CHUNK_S 08_CHUNK_S
  addeweap ewep01 101885
end

begin "Technical enemy vehicle - mounted 50cal - B - variant color"
  id 106369
  type vehicle
  graphic ETek2B
  attrib: AIData Evil
  shadow shadow1.tga   3.2  6.9  0.0  -0.1
  husk Etek2BX
  hp 400
  armor 105 40
  score 20
  heatsig  1000
  radarsig 1300
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_Jeep
  unit_type 1
  soundloop LP_TECH1
  sounddeath EXPLO_VEH_TECH
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuf 
  
  particleother Effect_EtekFireNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_CHUNK_M 05_CHUNK_L 06_CHUNK_L 07_CHUNK_S 08_CHUNK_S
  addeweap ewep01 101885
end

begin "Technical enemy vehicle with mounted Cannon"
  id 101237
  type vehicle
  graphic ETek1
  attrib: AIData Evil 
  shadow   shadow1.tga   2.5  4.5  0.0  0.0
  husk Etek1X
  hp 400
  armor 105 40
  score 20
  heatsig  1000
  radarsig 1300
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_Jeep
  unit_type 1
  soundloop LP_JEEP
  sounddeath EXPLO_VEH_TECH
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuf
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_WHEEL 06_CHUNK_M 07_CHUNK_M 08_CHUNK_L
  addeweap ewep01 101877
end

begin "Hummer with Armored 50cal"
  id 101241
  type vehicle
  graphic Fhum50
  
  attrib: AIData good
  shadow shadow1.tga   3.2  5.8  0.0  0.0
  husk Fhum50X
  hp 900
  armor 105 100
  score 20
  heatsig  1000
  radarsig 1300
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_Jeep
  unit_type 1
  soundloop LP_HUMMER
  sounddeath EXPLO_VEHCL_SM
  particledeath Effect_Fuelxp3
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_WHEEL 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M
  addeweap ewep01 101876
end

begin "Hummer with Armored 50cal"
  id 101284
  type vehicle
  graphic Fhum50N
  attrib: AIData good
  shadow shadow1.tga   3.2  5.8  0.0  0.0
  husk Fhum50X
  hp 900
  armor 105 100
  score 20
  heatsig  1000
  radarsig 1300
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_Jeep
  unit_type 1
  soundloop LP_HUMMER
  sounddeath EXPLO_VEHCL_SM
  particledeath Effect_Fuelxp3
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_WHEEL 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M
  addeweap ewep01 101876
end

begin "Indestructible Hummer with 50cal"
  id 101270
  type vehicle
  graphic Fhum50
  
  attrib: AIData good
  shadow shadow1.tga   3.2  5.8  0.0  0.0
  husk Fhum50X
  hp 10
  armor -1
  heatsig  1000
  radarsig 1300
  ai_function cveh
  move_function cveh
  render_function cveh
  husk Fhum50x
  default_aip G_Jeep
  unit_type 1
  soundloop LP_HUMMER
  sounddeath EXPLO_VEHCL_SM
  particledeath Effect_Fuelxp3
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_WHEEL 06_CHUNK_M 07_CHUNK_M 08_CHUNK_L 09_CHUNK_L
  addeweap ewep01 101876
end

begin "Hummer with NON-Armored 50cal"
  id 101276
  type vehicle
  graphic Fhum50
  
  attrib: AIData good
  shadow shadow1.tga   3.2  5.8  0.0  0.0
  husk Fhum50X
  hp 10
  armor -1 
  score 20
  heatsig  1000
  radarsig 1300
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_Jeep
  unit_type 1
  soundloop LP_HUMMER
  sounddeath EXPLO_VEHCL_SM
  particledeath Effect_Fuelxp3
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_WHEEL 06_CHUNK_M 07_CHUNK_M 08_CHUNK_L 09_CHUNK_L
  addeweap ewep01 101892
end

begin "Hummer with Mounted MK19"
  id 101277
  type vehicle
  graphic Fhum50
  
  attrib: AIData good
  shadow shadow1.tga   3.2  5.8  0.0  0.0
  husk Fhum50X
  hp 900
  armor 105 100
  score 20
  heatsig  1000
  radarsig 1300
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_Jeep
  unit_type 1
  soundloop LP_HUMMER
  sounddeath EXPLO_VEHCL_SM
  particledeath Effect_Fuelxp3
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_WHEEL 06_CHUNK_M 07_CHUNK_M 08_CHUNK_L 09_CHUNK_L
  addeweap ewep01 101893
end

begin "Hummer with Armored MK19"
  id 101278
  type vehicle
  graphic Fhum50
  
  attrib: AIData good
  shadow shadow1.tga   3.2  5.8  0.0  0.0
  husk Fhum50X
  hp 900
  armor 105 100
  score 20
  heatsig  1000
  radarsig 1300
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_Jeep
  unit_type 1
  soundloop LP_HUMMER
  sounddeath EXPLO_VEHCL_SM
  particledeath Effect_Fuelxp3
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_WHEEL 06_CHUNK_M 07_CHUNK_M 08_CHUNK_L 09_CHUNK_L
  addeweap ewep01 101894
end

begin "Friendly Hummer standard Version"
  id 101226
  type vehicle
  graphic Fhum2
  attrib: AIData good
  shadow shadow1.tga   3.2  5.8  0.0  0.0
  husk Fhum2X
  hp 10
  armor -1 
  score 20
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_Jeep
  unit_type 1
  soundloop LP_HUMMER
  sounddeath EXPLO_VEHCL_SM
  particledeath Effect_Fuelxp3
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_WHEEL 06_CHUNK_M 07_CHUNK_M 08_CHUNK_L 09_CHUNK_L
end


begin "Friendly 5.5 ton with closed tarp"
  id 101253
  type vehicle
  graphic F5tonC
  attrib: AIData good NoScar
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_Jeep
  shadow shadow6.tga   4.0  11.0  0.0  -0.15
  husk F5tonCX
  unit_type 1
  hp 1200
  armor 105 110
  score 20
  heatsig  1000
  radarsig 1300
  soundloop LP_TRUCK_LG
  sounddeath EXPLO_VEHCL_SM
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuf
  husk_sub_part_types 01_HULL 02_WHEEL 03_CHUNK_L 04_WHEEL 05_WHEEL 06_CHUNK_M
end

begin "Friendly 5.5 ton with sit points"
  id 101290
  type vehicle
  graphic F5tonD
  attrib: AIData good NoScar
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_Jeep
  shadow shadow6.tga   4.0  11.0  0.0  -0.15
  husk F5tonDX
  unit_type 1
  hp 1200
  armor 105 110
  score 20
  heatsig  1000
  radarsig 1300
  soundloop LP_TRUCK_LG
  sounddeath EXPLO_VEHCL_SM
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuf
  husk_sub_part_types 01_HULL 02_WHEEL 03_CHUNK_L 04_WHEEL 05_WHEEL 06_CHUNK_M
end


begin "Neutral Refugee Bus"
  id 101222
  type vehicle
  graphic NBus1
  attrib: AIData good
  shadow   shadow1.tga   3.6  9.5  0.0  0.03
  husk  Nbus1x
  hp 800
  armor 105 100
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_Jeep
  unit_type 1
  soundloop LP_TRUCK_LG
  sounddeath EXPLO_VEHCL_LG
  particledeath Effect_Fuelxp5
  particlefinale Effect_VehDrtPuf
  
  particleother Effect_SmkNStemNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_CHUNK_L 05_CHUNK_M 06_CHUNK_L 07_CHUNK_M 08_CHUNK_L 09_CHUNK_M 10_CHUNK_L
end

begin "Bus with crop top"
  id 101258
  type vehicle
  graphic Nbus2
  attrib: AIData good
  shadow shadow1.tga   2.3  5.5  0.0  0.0
  husk Nbus2X
  hp 200
  armor 105 40
  heatsig  1000
  radarsig 1300
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_Jeep
  unit_type 1
  soundloop LP_HEMITT
  sounddeath EXPLO_VEH_TRKLG
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuftrk 
  
  
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_WHEEL 06_CHUNK_S 07_CHUNK_S
end

begin "Neutral Refugee Bus"
  id 101275
  type vehicle
  graphic NBus3
  attrib: AIData good
  shadow   shadow1.tga   3.6  9.5  0.0  0.03
  husk  Nbus1x
  hp 800
  armor 105 100
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_Jeep
  unit_type 1
  soundloop LP_TRUCK_LG
  sounddeath EXPLO_VEHCL_LG
  particledeath Effect_Fuelxp5
  particlefinale Effect_VehDrtPuf
  
  particleother Effect_SmkNStemNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_CHUNK_L 05_CHUNK_M 06_CHUNK_L 07_CHUNK_M 08_CHUNK_L 09_CHUNK_M 10_CHUNK_L
end

begin "Neutral Compact Pickup Truck"
  id 101220
  type vehicle
  graphic NTrk1
  attrib: AIData neutral
  shadow   shadow1.tga   2.6  6.6  0.0  -0.12
  husk NTrk1X
  hp 400
  armor 105 40
  score 50
  heatsig  1000
  radarsig 1300
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_buggy
  unit_type 1
  soundloop LP_TECH2_SM	
  sounddeath EXPLO_VEHCL_SM
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuf 
  
  particleother Effect_EtekFireNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_WHEEL 06_CHUNK_L 07_CHUNK_L
end

begin "Neutral European Car Small"
  id 101218
  type vehicle
  graphic NCar1
  attrib: AIData GOOD
  shadow   shadow1.tga   2.3  5.6  0.0  -0.05
  husk NCar1x
  hp 120
  armor 105 40
  score 50
  heatsig  1000
  radarsig 1300
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_jeep
  unit_type 1
  soundloop LP_JEEP
  sounddeath EXPLO_VEHCL_SM
  particledeath Effect_Fuelxp2
  particlefinale Effect_VehDrtPuf 
  
  
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_CHUNK_l 05_CHUNK_M
end



begin "Armored Personell Carrier"
  id 101216
  type vehicle
  graphic FLAV
  attrib: AIData Good easy
  shadow   shadow1.tga   2.7  8.5  0.0  0.0
  hp 10
  armor -1
  score 300
  heatsig  1000
  radarsig 1000
  husk FLAVx
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip gu
  unit_type 1
  soundloop LP_APC
  sounddeath EXPLO_TANK
  particledeath Effect_CarBoomT
end

begin "U.N Armored Personell Carrier"
  id 101280
  type vehicle
  graphic UNLAV
  attrib: AIData Good easy 
  shadow   shadow1.tga   2.7  8.5  0.0  0.0
  hp 10
  armor -1
  score 300
  heatsig  1000
  radarsig 1000
  husk FLAVx
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip gu
  unit_type 1
  soundloop LP_APC
  sounddeath EXPLO_TANK
  particledeath Effect_CarBoomT
end




  
  
  

begin "Blackhawk used for fast roping"
  id 101243
  textid  text_blackhawk
  type vehicle
  unit_type 3
  graphic Fblkhawf
  attrib: AIData Good easy FastRope
  ai_function chel
  disk_function HELO
  move_function chel
  render_function chel
  hp 1600
  shadow   shadow5.tga   8.0  17.8  0.0  -0.14
  score 100
  armor 110 110
  heatsig  600
  radarsig 600
  husk Fblkhawx
  default_aip H_BHawk
  soundloop LP_H_BLAKHK2
  sounddeath EXPLO_HELICOPTER
  particledeath Effect_UpsFireNP
  particlefinale Effect_Fuelxp2
  particlefire Effect_HeloHitHusk
  particleother Effect_BlkSmkMedNP
  husk_sub_part_types 01_HULL 02_CHUNK_M 03_CHUNK_M 04_WHEEL 05_CHUNK_M 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M 10_CHUNK_M 11_CHUNK_M 12_CHUNK_M 13_CHUNK_M 14_CHUNK_M 15_CHUNK_M 16_CHUNK_M
    
  
  rotor_parts 1 2 3 4
  
  
end

begin "Blackhawk fast roping NO Die"
  id 101289
  textid  text_blackhawk
  type vehicle
  unit_type 3
  graphic Fblkhawf
  attrib: AIData Good easy FastRope nodie
  ai_function chel
  disk_function HELO
  move_function chel
  render_function chel
  hp 600
  shadow   shadow5.tga   8.0  17.8  0.0  -0.14
  score 100
  armor 110 110
  heatsig  600
  radarsig 600
  husk Fblkhawx
  default_aip H_BHawk
  soundloop LP_H_BLAKHK2
  sounddeath EXPLO_HELICOPTER
  particledeath Effect_UpsFireNP
  particlefinale Effect_Fuelxp2
  particlefire Effect_HeloHitHusk
  particleother Effect_BlkSmkMedNP
  husk_sub_part_types 01_HULL 02_CHUNK_M 03_CHUNK_M 04_WHEEL 05_CHUNK_M 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M 10_CHUNK_M 11_CHUNK_M 12_CHUNK_M 13_CHUNK_M 14_CHUNK_M 15_CHUNK_M 16_CHUNK_M
    
  
  rotor_parts 1 2 3 4
  
  
end

begin "Blackhawk with two miniguns"
  id 104643
  textid  text_blackhawk
  type vehicle
  unit_type 3
  graphic Fblkhawk
  attrib: AIData Good easy
  disk_function HELO
  ai_function chel
  move_function chel
  render_function chel
  hp 1600
  score 100
  shadow   shadow5.tga   8.0  18.0  0.0  -0.14
  armor -1
  heatsig  600
  radarsig 600
  husk Fblkhawx
  default_aip H_BHawk
  soundloop LP_H_BLAKHK1
  sounddeath EXPLO_HELICOPTER
  particledeath Effect_UpsFireNP
  particlefinale Effect_Fuelxp2
  particlefire Effect_HeloHitHusk
  particleother Effect_BlkSmkMedNP
  husk_sub_part_types 01_HULL 02_CHUNK_M 03_CHUNK_M 04_WHEEL 05_CHUNK_M 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M 10_CHUNK_M 11_CHUNK_M 12_CHUNK_M 13_CHUNK_M 14_CHUNK_M 15_CHUNK_M 16_CHUNK_M
  addeweap ewep01 101871
  addeweap ewep02 101871
  rotor_parts 1 2 3 4
end

begin "Blackhawk, miniguns, both doors open"
  id 101272
  textid  text_blackhawk
  type vehicle
  unit_type 3
  graphic Fblkhawd
  attrib: AIData Good easy
  disk_function HELO
  ai_function chel
  move_function chel
  render_function chel
  hp 1600
  score 100
  shadow   shadow5.tga   8.0  18.0  0.0  -0.14
  armor -1
  heatsig  600
  radarsig 600
  husk Fblkhawx
  default_aip H_BHawk
  soundloop LP_H_BLAKHK2
  sounddeath EXPLO_HELICOPTER
  particledeath Effect_UpsFireNP
  particlefinale Effect_Fuelxp2
  particlefire Effect_HeloHitHusk
  particleother Effect_BlkSmkMedNP
  husk_sub_part_types 01_HULL 02_CHUNK_M 03_CHUNK_M 04_WHEEL 05_CHUNK_M 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M 10_CHUNK_M 11_CHUNK_M 12_CHUNK_M 13_CHUNK_M 14_CHUNK_M 15_CHUNK_M 16_CHUNK_M
  addeweap ewep01 101871
  addeweap ewep02 101871
  rotor_parts 1 2 3 4
end

begin "Blackhawk, further destroyed"
  id 106333
  type decoration
  graphic BHDF
  hp 1000
  armor 201 -1
  ai_function gnrc
  husk BHDFX
  
  sounddeath EXPLO_HELICOPTER
  particledeath Effect_UpsFireNP
  particlefinale Effect_Fuelxp2
  particleother Effect_BlkSmkMedNP
  husk_sub_part_types 01_HULL 02_CHUNK_M 03_CHUNK_M 04_WHEEL 05_CHUNK_M 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M
end

begin "MH53 Pavelow"
  id 106284
  textid  text_blackhawk
  type vehicle
  unit_type 3
  graphic MH53
  attrib: AIData Good easy
  disk_function HELO
  ai_function chel
  move_function chel
  render_function chel
   hp 1600
  score 100
  shadow   shadow5.tga   8.0  18.0  0.0  -0.14
  armor -1
  heatsig  600
  radarsig 600
  husk Fblkhawx
  default_aip H_BHawk
  soundloop LP_H_PVL
  sounddeath EXPLO_HELICOPTER
  particledeath Effect_UpsFireNP
  particlefinale Effect_Fuelxp2
  particlefire Effect_HeloHitHusk
  particleother Effect_BlkSmkMedNP
  husk_sub_part_types 01_HULL 02_CHUNK_M 03_CHUNK_M 04_WHEEL 05_CHUNK_M 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M 10_CHUNK_M 11_CHUNK_M 12_CHUNK_M 13_CHUNK_M 14_CHUNK_M 15_CHUNK_M 16_CHUNK_M
  addeweap ewep01 101871
rotor_parts 1 2 3 4
end

begin "Blackhawk, weak AI miniguns, both doors open"
  id 101287
  textid  text_blackhawk
  type vehicle
  unit_type 3
  graphic Fblkhawd
  attrib: AIData Good easy
  disk_function HELO
  ai_function chel
  move_function chel
  render_function chel
  hp 1600
  score 100
  shadow   shadow5.tga   8.0  18.0  0.0  -0.14
  armor -1
  heatsig  600
  radarsig 600
  husk Fblkhawx
  default_aip H_BHawk
  soundloop LP_H_BLAKHK2
  sounddeath EXPLO_HELICOPTER
  particledeath Effect_UpsFireNP
  particlefinale Effect_Fuelxp2
  particlefire Effect_HeloHitHusk
  particleother Effect_BlkSmkMedNP
  husk_sub_part_types 01_HULL 02_CHUNK_M 03_CHUNK_M 04_WHEEL 05_CHUNK_M 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M 10_CHUNK_M 11_CHUNK_M 12_CHUNK_M 13_CHUNK_M 14_CHUNK_M 15_CHUNK_M 16_CHUNK_M
  addeweap ewep01 101903
  addeweap ewep02 101903
  rotor_parts 1 2 3 4
end



begin "Blackhawk, MEDIVAC, both doors open"
  id 101281
  textid  text_blackhawk
  type vehicle
  unit_type 3
  graphic Fblkhawm
  attrib: AIData Good easy notool
  disk_function HELO
  ai_function chel
  move_function chel
  render_function chel
  hp 1600
  score 100
  shadow   shadow5.tga   8.0  18.0  0.0  -0.14
  armor -1
  heatsig  600
  radarsig 600
  husk Fblkhawx
  default_aip H_BHawk
  soundloop LP_H_BLAKHK2
  sounddeath EXPLO_HELICOPTER
  particledeath Effect_UpsFireNP
  particlefinale Effect_Fuelxp2
  particlefire Effect_HeloHitHusk
  particleother Effect_BlkSmkMedNP
  husk_sub_part_types 01_HULL 02_CHUNK_M 03_CHUNK_M 04_WHEEL 05_CHUNK_M 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M 10_CHUNK_M 11_CHUNK_M 12_CHUNK_M 13_CHUNK_M 14_CHUNK_M 15_CHUNK_M 16_CHUNK_M
  rotor_parts 1 2 3 4
end

begin "Indestructible Blackhawk with two miniguns"
  id 101269
  textid  text_blackhawk
  type vehicle
  unit_type 3
  graphic Fblkhawk
  attrib: AIData Good easy
  disk_function HELO
  ai_function chel
  move_function chel
  render_function chel
  hp 1600
  armor -1
  score 100
  shadow   shadow5.tga   8.0  18.0  0.0  -0.14
  heatsig  600
  radarsig 600
  husk Fblkhawx
  default_aip H_BHawk
  soundloop LP_H_BLAKHK1
  sounddeath EXPLO_HELICOPTER
  particledeath Effect_UpsFireNP
  particlefinale Effect_Fuelxp2
  particlefire Effect_HeloHitHusk
  particleother Effect_BlkSmkMedNP
  husk_sub_part_types 01_HULL 02_CHUNK_M 03_CHUNK_M 04_WHEEL 05_CHUNK_M 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M 10_CHUNK_M 11_CHUNK_M 12_CHUNK_M 13_CHUNK_M 14_CHUNK_M 15_CHUNK_M 16_CHUNK_M
  addeweap ewep01 101871
  addeweap ewep02 101871
  rotor_parts 1 2 3 4
end

begin "Use this for downed helicopter"
  id 104652
  type decoration
  graphic Fblkhwkx
  attrib: AIData good noscar
  hp 10
  armor -1
  ai_function GNRC
  particlefx effect_blacksmoke pfx0
end

begin "Placable Husk for Neutral Cargo truck"
  id 101234
  type decoration
  graphic Nctrk1hk
  attrib: AIData neutral noscar
  shadow   shadow1.tga   3.2  10.1  0.0  0.05
  hp 10
  armor -1
  ai_function GNRC
end

begin "Cargo truck"
  id 104622
  type vehicle
  graphic Nctruck1
  attrib: AIData neutral
  shadow  shadow1.tga   3.5  10.1  0.0  0.05
  hp 50
  score 50
  heatsig  1000
  radarsig 1000
  ai_function cveh
  render_function cveh
  move_function cveh
  husk Nctruc1x
  particledeath Effect_CarBoomS
  default_aip gu_s
  soundloop LP_TRUCK_LG
  unit_type 1
 sounddeath EXPLO_VEHCL_LG
end

begin "Chemical weapons cargo truck"
  id 106314
  type vehicle
  graphic Ctrk01
  attrib: AIData neutral
  shadow  shadow1.tga   3.5  10.1  0.0  0.05
 hp 600
  armor 105 40
  score 20
  heatsig  1000
  radarsig 1300
  ai_function cveh
  render_function cveh
  move_function cveh
  husk CtrkX
  particledeath Effect_CarBoomS
  default_aip gu_s
  soundloop LP_TRUCK_LG
  unit_type 1
 sounddeath EXPLO_VEHCL_LG
end

begin "Chemical Weapons Truck S & D"
  id 106264
  type object
  graphic CtrkSD
  attrib: S&D
  shadow  shadow1.tga   3.5  10.1  0.0  0.05
  hp 1000
  armor 201 -1
  heatsig  1000
  radarsig 1000
  ai_function cveh
  render_function cveh
  move_function cveh
  husk CtrkX
  default_aip gu_s
  soundloop LP_TRUCK_LG
  unit_type 1
  sounddeath EXPLO_VEHCL_LG
  particledeath Effect_Fuelxp5
  particlefinale Effect_VehDrtPuf 
  particleother Effect_SmkNStemNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_CHUNK_L 05_CHUNK_M 06_CHUNK_L 07_CHUNK_M 08_CHUNK_L 09_CHUNK_M 10_CHUNK_L
end

begin "Chemical Weapons Truck S & D (blue glow)"
  id 106263
  type object
  graphic CtrkSD
  attrib: S&D
  shadow  shadow1.tga   3.5  10.1  0.0  0.05
  hp 1000
  armor 201 -1
  heatsig  1000
  radarsig 1000
  ai_function cveh
  render_function cveh
  move_function cveh
  husk CtrkX
  default_aip gu_s
  soundloop LP_TRUCK_LG
  unit_type 1
  sounddeath EXPLO_VEHCL_LG
  particledeath Effect_Fuelxp5
  particlefinale Effect_VehDrtPuf 
  particleother Effect_SmkNStemNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_CHUNK_L 05_CHUNK_M 06_CHUNK_L 07_CHUNK_M 08_CHUNK_L 09_CHUNK_M 10_CHUNK_L
end

begin "Chemical Weapons Truck S & D (red glow)"
  id 106265
  type object
  graphic CtrkSD
  attrib: S&D
  shadow  shadow1.tga   3.5  10.1  0.0  0.05
  hp 1000
  armor 201 -1
  heatsig  1000
  radarsig 1000
  ai_function cveh
  render_function cveh
  move_function cveh
  husk CtrkX
  default_aip gu_s
  soundloop LP_TRUCK_LG
  unit_type 1
  sounddeath EXPLO_VEHCL_LG
  particledeath Effect_Fuelxp5
  particlefinale Effect_VehDrtPuf 
  particleother Effect_SmkNStemNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_CHUNK_L 05_CHUNK_M 06_CHUNK_L 07_CHUNK_M 08_CHUNK_L 09_CHUNK_M 10_CHUNK_L
end

begin "Friendly No Die Smoking LITTLE BIRD"
  id 101232
  type vehicle
  graphic FAH6a
  attrib: AIData Good missile NoDie
  disk_function HELO
  ai_function chel
  move_function chel
  render_function chel
  shadow   shadow7.tga   4.2  9.0  0.0  -0.14
  hp 100
  score 75
  heatsig  1200
  radarsig 1200
  husk FAH6x
  default_aip h_ah6
  soundloop LP_H_AH61
  soundloop LP_GS_AHMINIGUN
  unit_type 3
  sounddeath EXPLO_HELICOPTER
  particledeath Effect_UpsFireNP
  particlefinale Effect_Fuelxp2
  particlefire Effect_HeloHitHusk
  particleother Effect_BlkSmkMedNP
  husk_sub_part_types 01_HULL 02_CHUNK_L 03_CHUNK_M 
  
  
  rotor_parts 1 2 3 4
  
  aux_parts 0 0 0 0
end

begin "Friendly Light Helicopter LITTLE BIRD with benches"
  id 101236
  type vehicle
  graphic FAH6b
  attrib: AIData Good missile
  shadow   shadow8.tga   4.5  8.9  0.0  -0.14
  disk_function HELO
  ai_function chel
  move_function chel
  render_function chel
  hp 500
  score 75
  heatsig  1200
  radarsig 1200
  husk FAH6x
  default_aip h_ah6b_z
  soundloop LP_H_AH62
  unit_type 3
  sounddeath EXPLO_HELICOPTER
  particledeath Effect_UpsFireNP
  particlefinale Effect_Fuelxp2
  particlefire Effect_HeloHitHusk
  particleother Effect_BlkSmkMedNP
  husk_sub_part_types 01_HULL 02_CHUNK_L 03_CHUNK_M 
  
  
  rotor_parts 1 2 3 4
  
  aux_parts 0 0 0 0
end

begin "Enemy Littlebird"
  id 106206
  type vehicle
  graphic EAH6C
  attrib: AIData Good missile
  shadow   shadow8.tga   4.5  8.9  0.0  -0.14
  disk_function HELO
  ai_function chel
  move_function chel
  render_function chel
  hp 500
  score 75
  heatsig  1200
  radarsig 1200
  husk FAH6x
  default_aip h_ah6b_z
  soundloop LP_H_AH62
  unit_type 3
  sounddeath EXPLO_HELICOPTER
  particledeath Effect_UpsFireNP
  particlefinale Effect_Fuelxp2
  particlefire Effect_HeloHitHusk
  particleother Effect_BlkSmkMedNP
  husk_sub_part_types 01_HULL 02_CHUNK_L 03_CHUNK_M 
  
  
  rotor_parts 1 2 3 4
  
  aux_parts 0 0 0 0
end


begin "Friendly Jeep"
  id 104610
  type vehicle
  graphic Fjeep1
  attrib: AIData Good
  shadow   shadow1.tga   2.5  4.5  0.0  0.0
  hp 10
  armor -1
  score 20
  heatsig  1000
  radarsig 1300
  ai_function cveh
  move_function cveh
  render_function cveh
  husk Fjeep1x
  default_aip G_Jeep
  unit_type 1
  soundloop LP_JEEP
  sounddeath EXPLO_VEHCL_SM
  particledeath Effect_CarBoomT
end

begin "Placable Husk for Fjeep2"
  id 101235
  type decoration
  graphic Fjeep2hk
  attrib: AIData Good noscar
  shadow   shadow1.tga   2.5  4.5  0.0  0.0
  hp 10
  armor -1
  ai_function GNRC
  end

begin "Dune Buggy with mounted 50cal"
  id 101230
  type vehicle
  graphic Fbuggy
  particlefx effect_DirtWake
  attrib: AIData Good
  shadow   shadow1.tga   3  5.9  0.0  0.03
  hp 10
  armor -1
  score 50
  heatsig  1000
  radarsig 1300
  ai_function cveh
  move_function cveh
  render_function cveh
  default_aip G_buggy
  unit_type 1
  soundloop LP_BUGGY
  
  
end




begin "Exocet Missile launcher"
  id 106325
  type vehicle
  graphic ExMsl
  attrib: AIData Evil
  shadow  shadow1.tga   3.5  3.5  0.0  0.0
  hp 1000
  armor 50 50
  score 50
  ai_function cveh
  move_function cveh
  render_function cveh
  husk ExMslX
  default_aip gu_s
  soundloop LP_TRUCK_LG
  unit_type 1
  sounddeath EXPLO_VEHCL_LG
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuftrk
  
  particleother Effect_SmkNStemNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_CHUNK_M 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M 10_CHUNK_M 11_CHUNK_M 12_CHUNK_M 13_CHUNK_M 14_CHUNK_M 15_ChunkSF_M
end

begin "Anti Aircraft Gun in-tow (unmanned"
  id 106285
  type vehicle
  graphic AAGN01
  attrib: AIData Evil
  shadow  shadow1.tga   3.5  3.5  0.0  0.0
  hp 1000
  armor 105 -1
  score 50
  ai_function cveh
  render_function cveh
  move_function cveh
  husk AAGN03X
  default_aip gu_s
  soundloop LP_TRUCK_LG
  unit_type 1
  sounddeath EXPLO_VEHCL_LG
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuftrk
  
  particleother Effect_SmkNStemNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_CHUNK_M 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M 10_CHUNK_M 11_CHUNK_M 12_CHUNK_M 13_CHUNK_M 14_CHUNK_M 15_ChunkSF_M
end

begin "Anti Aircraft Gun (manned"
  id 106286
  type vehicle
  graphic AAGN02
  attrib: AIData Evil
  shadow  shadow1.tga   3.5  3.5  0.0  0.0
  hp 1000
  armor 105 -1
  score 50
  ai_function cveh
  render_function cveh
  move_function cveh
  husk AAGN03X
  default_aip gu_s
  soundloop LP_TRUCK_LG
  unit_type 1
  sounddeath EXPLO_VEHCL_LG
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuftrk
  
  particleother Effect_SmkNStemNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_CHUNK_M 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M 10_CHUNK_M 11_CHUNK_M 12_CHUNK_M 13_CHUNK_M 14_CHUNK_M 15_ChunkSF_M
end

begin "Anti Aircraft Gun in-tow (unmanned"
  id 106334
  type vehicle
  graphic AAGN03
  attrib: AIData Evil
  shadow  shadow1.tga   3.5  3.5  0.0  0.0
  hp 1000
  armor 105 -1
  score 50
  ai_function cveh
  render_function cveh
  move_function cveh
  husk AAGN03X
  default_aip gu_s
  soundloop LP_TRUCK_LG
  unit_type 1
  sounddeath EXPLO_VEHCL_LG
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuftrk
  
  particleother Effect_SmkNStemNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_CHUNK_M 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M 10_CHUNK_M 11_CHUNK_M 12_CHUNK_M 13_CHUNK_M 14_CHUNK_M 15_ChunkSF_M
end

begin "C4 bomb armed"
  id 106311
  type building
  graphic C4bm1
  hp 10
  armor -1
  ai_function bldg
end

begin "C4 bomb dis-armed"
  id 106312
  type building
  graphic C4bm0
  hp 10
  armor -1
  ai_function bldg
end

begin "Power Generator Housing"
  id 101132
  type building
  graphic PwrGenHS
  ai_function door
  move_function door
  attrib: Landable
  open_rate 1
  num_doors 1
  interrupt_sound_id DOOR_OPN_MTL		
  interrupt_sound_id2 DOOR_CLS_MTL	
  first_door 3
end


begin "US"
  id 101130
  type building
  graphic UNBld01
  attrib: Landable
  render_function bldg
end

begin "Stone Arched Bridge 32 meters across, indestructable"
  id 101174
  type decoration
  graphic Brdgston
  attrib: Landable Reflect
  render_function gnrc
  unit_type 11
end

begin "City Street Archway"
  id 101173
  type building
  graphic mogarch
  attrib: Landable
  render_function bldg
end

begin "Stadium Corner Piece, 1 Entrance, Field Access Stairs"
  id 101166
  type building
  graphic StadiumC
  attrib: Landable
  render_function bldg
end

begin "Stadium End Piece, 3 Entrances, Field Access Tunnel"
  id 101167
  type building
  graphic StadiumE
  attrib: Landable
  render_function bldg
end

begin "Stadium Side Piece, 1 Entrance, No Field Access"
  id 101168
  type building
  graphic StadiumS
  attrib: Landable
  render_function bldg
end

begin "Stadium Light Tower"
  id 101169
  type building
  graphic StadiumT
  render_function bldg
end

begin "Hut structure for Bleachers in Stadium"
  id 101170
  type building
  graphic StadHut1
  attrib: Landable
  render_function bldg
end

begin "Military Bunker Hut structure for Bleachers in Stadium"
  id 101171
  type building
  graphic StadHut2
  attrib: Landable
  render_function bldg
end



begin "One Story Bld with Roof Access...Shattered Palace"
  id 101129
  type building
  graphic SP_Bld1
  attrib: Landable
  render_function door
  ai_function door
  move_function door
  open_rate 2
  num_doors 1
  first_door 3
end

begin "Two Story Bld with Roof Access...Shattered Palace"
  id 101128
  type building
  graphic SP_Bld2
  attrib: Landable
  render_function door
  ai_function door
  move_function door
  open_rate 2
  num_doors 14
  first_door 5
  interrupt_sound_id DOOR_OPN_WOOD		
  interrupt_sound_id2 DOOR_CLS_WOOD		
end

begin "Main radio Building in Operation Highlight"
  id 101127
  type building
  attrib: Landable Concave
  graphic RdioBld2
end

begin "Basement for Aidid Takedown"
  id 101163
  type building
  attrib: Landable
  graphic Adbsmnt
end

begin "Training building Used in Advanced Training"
  id 101126
  type building
  graphic TrnBld1
  attrib: Landable
  render_function bldg
end

begin "Armory Version #1"
  id 101125
  type building
  graphic Armry01
  attrib: Landable Armory
  render_function bldg
end

begin "Armory Version #3"
  id 101186
  type decoration
  graphic Armry03
  attrib: Landable Armory
end

begin "Mobile Armory Version #2"
  id 101165
  type building
  graphic Armry02
  attrib: Landable Armory
  render_function bldg
end

begin "Warehouse building #14"
  id 101143
  type building
  attrib: Landable
  graphic WareHs14
end

begin "Warehouse building #13"
  id 101142
  type building
  attrib: Landable
  graphic WareHs13
end

begin "Warehouse building #12"
  id 101141
  type building
  attrib: Landable
  graphic WareHs12
end

begin "Warehouse building #11"
  id 101140
  type building
  attrib: Landable
  graphic WareHs11
end

begin "Warehouse building #10"
  id 101139
  type building
  attrib: Landable
  graphic WareHs10
end

begin "Warehouse building #9"
  id 101138
  type building
  attrib: Landable
  graphic WareHs09
end

begin "Warehouse building #8"
  id 101137
  type building
  attrib: Landable
  graphic WareHs08
end

begin "Warehouse building #7"
  id 101136
  type building
  attrib: Landable
  graphic WareHs07
end

begin "Warehouse building #6"
  id 101135
  type building
  attrib: Landable
  graphic WareHs06
end

begin "Warehouse building #5"
  id 101134
  type building
  attrib: Landable
  graphic WareHs05
end

begin "Warehouse building #4"
  id 101133
  type building
  attrib: Landable
  graphic WareHs04
end

begin "Large Warehouse only exterior3"
  id 101124
  type building
  attrib: Landable
  graphic WareHs03
end

begin "Large Warehouse only exterior2"
  id 101123
  type building
  attrib: Landable
  graphic WareHs02
end

begin "Large Garage"
  id 101122
  type building
  graphic Garg01
  attrib: Landable
  render_function bldg
end

begin "Long Corridor Block Piece Type #2"
  id 101121
  type building
  attrib: Landable
  graphic Crdrblk2
  render_function door
  ai_function door
  move_function door
  open_rate 2
  num_doors 1
  first_door 2
  interrupt_sound_id DOOR_OPN_WOOD		
  interrupt_sound_id2 DOOR_CLS_WOOD		
end

begin "Long Corridor Block Piece Type #1"
  id 101120
  type building
  attrib: Landable
  graphic Crdrblk1
end

begin "four Story Radio Bld in INTERCEPTION"
  id 101119
  type building
  graphic RdioBld1
  attrib: Landable
  render_function bldg
end

begin "Tunnle Entrance"
  id 101144
  type building
  attrib: Landable Reflect
  graphic R_Ent1
end

begin "Tunnle Entrance"
  id 101164
  type building
  attrib: Landable Reflect
  graphic R_Ent2
end

begin "Tunnle Piece Straight 30m"
  id 101145
  type building
  attrib: Landable Reflect
  graphic R_Tun1
end

begin "Tunnle Piece Collapsed"
  id 102149
  type decoration
  graphic R_TunCOL
end

begin "Tunnle Piece Straight 20m"
  id 101146
  type building
  attrib: Landable Reflect
  graphic R_Tun2
end

begin "Tunnle Piece Straight 20m w"
  id 101180
  type building
  attrib: Landable Reflect
  graphic R_Tun2B
end

begin "Tunnle Piece Straight 10m"
  id 101147
  type building
  attrib: Landable Reflect
  graphic R_Tun3
end

begin "Tunnle Piece Curve 20X20m"
  id 101148
  type building
  attrib: Landable Reflect
  graphic R_Tun4
end

begin "Tunnle Piece Curve 20X20m No Lights"
  id 101178
  type building
  attrib: Landable Reflect
  graphic R_Tun4D
end

begin "Tunnle Piece T intersection 10X10m"
  id 101149
  type building
  attrib: Landable Reflect
  graphic R_Tun5
end

begin "Tunnle Piece stairs 20m"
  id 101150
  attrib: Landable Reflect
  type building
  graphic R_Tun6
end

begin "Tunnle Piece stairs 20m No Lights"
  id 101179
  attrib: Landable Reflect
  type building
  graphic R_Tun6D
end

begin "Tunnle Piece End Cap"
  id 101151
  attrib: Landable Reflect
  type building
  graphic R_Tun7
end

begin "Tunnle Piece Diagonal"
  id 101182
  attrib: Landable Reflect
  type building
  graphic R_Tun8
end

begin "Tunnle Piece Elbow "
  id 101183
  attrib: Landable Reflect
  type building
  graphic R_Tun9
end

begin "Tunnle Piece Ramp "
  id 101184
  attrib: Landable Reflect
  type building
  graphic R_Tun10
end

begin "Tunnle Piece 6m drop w"
  id 101185
  attrib: Landable Reflect
  type building
  graphic R_Tun11
end


begin "Russian Style Embassy Basement Piece"
  id 101117
  type building
  graphic RE_Bsmt
  attrib: Landable
  render_function door
  ai_function door
  move_function door
  open_rate 2
  num_doors 2
  first_door 8
  
  sounddeath	EXPLO_DOOR_MTL
  interrupt_sound_id DOOR_OPN_WOOD		
  interrupt_sound_id2 DOOR_CLS_WOOD		
end

begin "Russian Style Embassy for Tranquilizer"
  id 101116
  type building
  attrib: Landable Concave
  graphic RE_Bld1
  render_function bldg
end

begin "Russian Embassy Bld #2"
  id 101118
  type building
  attrib: Landable
  graphic RE_Bld2
end

begin "two story Main building in Hornets Nest"
  id 101115
  type building
  graphic HN_Bld1
  attrib: Landable
  render_function bldg
end

begin "Night Mission Only Mogadishu City Block with Lights"
  id 101107
  attrib: Landable 
  type building
  attrib: Landable
  graphic MCMog3N
  heatsig  1000
  radarsig 1000
end

begin "Placable husk version of wooden river bridge"
  id 101103
  attrib: Landable reflect
  type building
  graphic Brdg01X
  heatsig  1000
  radarsig 1000
  unit_type 11
end

begin "Wooden River Bridge"
  id 101102
  attrib: Landable reflect
  hp 150
  type building
  graphic Brdg01
  Husk Brdg01X
 ai_function bld2   
 move_function upfx
 sounddeath EXPLO_WOODTOWER
  unit_type 11
end

begin "Large Building on Pier Piece no interior"
  id 101099
  attrib: Landable reflect
  type building
  graphic Pbld01
  heatsig  1000
  radarsig 1000
end

begin "Small Building on Pier Piece no interior"
  id 101100
  attrib: Landable reflect
  type building
  graphic Pbld02
  heatsig  1000
  radarsig 1000
end

begin "Open Building on Pier Piece"
  id 101101
  attrib: Landable reflect
  type building
  graphic Pbld03
  heatsig  1000
  radarsig 1000
end

begin "Warehouse used for weapons storage"
  id 101098
  attrib: Landable 
  type building
  graphic WareHse1
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu Airport Hanger"
  id 101097
  attrib: Landable 
  type building
  graphic MogHng01
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu Slum Hut Single Unit"
  id 101093
  attrib: Landable 
  type building
  graphic MogSlm01
  husk MogSlm1x
  hp 10
  armor -1
  move_function upfx
  heatsig  1000
  radarsig 1000
  ai_function bld2
  move_function upfx
  ParticleDeath Effect_PRGDirt
end

begin "Mogadishu Slum Hut Single Unit B - moss skin"
  id 106343
  attrib: Landable 
  type building
  graphic MSlm1B
  husk MogSlm1x
  hp 10
  armor -1
  move_function upfx
  heatsig  1000
  radarsig 1000
  ai_function bld2
  move_function upfx
  ParticleDeath Effect_PRGDirt
end

begin "Mogadishu Slum Hut double unit"
  id 101094
  attrib: Landable 
  type building
  graphic MogSlm02
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu Slum Hut double unit B - moss skin"
  id 106344
  attrib: Landable 
  type building
  graphic MSlm02B
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu Slum Hut Triple Unit"
  id 101095
  attrib: Landable 
  type building
  graphic MogSlm03
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu Slum Hut Triple Unit B - moss skin"
  id 106345
  attrib: Landable 
  type building
  graphic MSlm03B
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu Slum Hut 4 connected Units"
  id 101096
  attrib: Landable 
  type building
  graphic MogSlm04
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu Slum Hut 4 connected Units B - moss skin"
  id 106346
  attrib: Landable 
  type building
  graphic MSlm04B
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu Slum, Small Wooden structure"
  id 101111
  attrib: Landable 
  type building
  graphic MogSlm05
  husk Mgslm05X
  hp 500
  armor 100 -1
  score 2
  ai_function gnrl
  sounddeath	EXPLO_WOODSHAK
  move_function genx
end

begin "Mogadishu Slum, Small Wooden domed structure"
  id 101112
  attrib: Landable 
  type building
  graphic MogSlm06
  husk Mgslm06X
  hp 500
  armor 100 -1
  score 2
  ai_function gnrl
  sounddeath	EXPLO_WOODSHAK
  move_function genx
end

begin "Mogadishu building with top floor destruction"
  id 101113
  attrib: Landable 
  type building
  graphic MogBld1
end

begin "Mogadishu building with just the shell of the building"
  id 101114
  attrib: Landable 
  type building
  graphic MogBld2
end

begin "2 story bombed out building"
  id 101162
  attrib: Landable 
  type building
  graphic MogBld3
end

begin "2 story bombed out building for Lost Convoy"
  id 101181
  attrib: Landable 
  type building
  graphic MogBld4
end

begin "Mogadishu City Block1 Moderately Generic 64x64"
  id 101085
  attrib: Landable 
  type building
  graphic MogBlk01
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu City Block2 Moderately Generic 64x64"
  id 101086
  attrib: Landable 
  type building
  graphic MogBlk02
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu City Block3 Moderately Generic 64x64"
  id 101087
  attrib: Landable 
  type building
  graphic MogBlk03
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu City Block4 Moderately Generic 64x64"
  id 101088
  attrib: Landable 
  type building
  graphic MogBlk04
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu City Block5 Highly Generic 64x64"
  id 101089
  attrib: Landable 
  type building
  graphic MogBlk05
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu City Block6 Highly Generic 64x64"
  id 101090
  attrib: Landable 
  type building
  graphic MogBlk06
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu City Block7 Highly Generic 64x64"
  id 101091
  attrib: Landable 
  type building
  graphic MogBlk07
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu City Block8 Highly Generic 64x64"
  id 101092
  attrib: Landable 
  type building
  graphic MogBlk08
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu City Block9 Highly Generic 64x64"
  id 101131
  attrib: Landable 
  type building
  graphic MogBlk09
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu City Block9 B  - unlit"
  id 106367
  attrib: Landable 
  type building
  graphic MogBlk9b
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu Style river hut1"
  id 101104
  attrib: Landable 
  type building
  graphic Moghut1
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu hut1B - with moss skin"
  id 106340
  attrib: Landable 
  type building
  graphic Moghut1B
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu Style river hut2"
  id 101105
  attrib: Landable 
  type building
  graphic Moghut2
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu river hut2B - with moss skin"
  id 106341
  attrib: Landable 
  type building
  graphic Moghut2B
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu Style river hut3"
  id 101106
  attrib: Landable 
  type building
  graphic Moghut3
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu river hut3B - with moss skin"
  id 106342
  attrib: Landable 
  type building
  graphic Moghut3B
  heatsig  1000
  radarsig 1000
end

begin "Mogadishu Style shed "
  id 101108
  attrib: Landable 
  type building
  graphic MogShd1
end

begin "Mogadishu Style shed "
  id 101109
  attrib: Landable 
  type building
  graphic MogShd2
end

begin "Mogadishu Style shed "
  id 101110
  attrib: Landable 
  type building
  graphic MogShd3
end


begin "Sister Bld"
  id 101080
  attrib: Landable 
  type building
  graphic MCOlymps
  heatsig  1000
  radarsig 1000
end

begin "Version of Mctarget for Lost Convoy"
  id 101188
  attrib: Landable 
  type building
  graphic MCtargcd
  heatsig  1000
  radarsig 1000
end


begin "Low Poly closed Version of Olympic Hotel"
  id 101081
  attrib: Landable 
  type building
  graphic MCOlympi
  heatsig  1000
  radarsig 1000
end

begin "Sister Bld"
  id 101187
  attrib: Landable SpawnPoint ChangeTeam
  type building
  graphic MCOlymps
  heatsig  1000
  radarsig 1000
end

begin "Main Mogadishu Target Building"
  id 101083
  attrib: Landable concave
  type building
  graphic MCTarget
  ai_function door
  move_function door
  render_function door
  First_Door 7 
  open_rate 2
  num_doors 4
  interrupt_sound_id DOOR_OPN_WOOD		
  interrupt_sound_id2 DOOR_CLS_WOOD		
end

begin "Above ground bunker firing wall"
  id 101058
  type building
  graphic Bnkr07
  hp 10
  armor -1
  score 25
  ai_function gnrl
end

begin "Above ground bunker firing wall straight piece"
  id 101175
  type building
  graphic Bnkr08
  hp 10
  armor -1
  score 25
  ai_function gnrl
end

begin "Above ground bunker firing wall inward curve piece"
  id 101176
  type building
  graphic Bnkr09
  hp 10
  armor -1
  score 25
  ai_function gnrl
end

begin "Above ground bunker firing wall outward curve piece"
  id 101177
  type building
  graphic Bnkr10
  hp 10
  armor -1
  score 25
  ai_function gnrl
end


begin "Above ground corner piece"
  id 101056
  type building
  attrib: notarget
  graphic Bnkr05
end

begin "Bnkr04"
  id 101055
  type building
  attrib: notarget
  graphic Bnkr04
end




begin "Desert Power Generator"
  id 101048
  type object
  graphic PwrGen
  attrib: Landable
  husk PwrGenX
  hp 200
  armor 8
  score 100
  heatsig  1000
  radarsig 1000
  ai_function gnrl
  move_function upfx
  soundloop	LP_GENERATOR
  sounddeath EXPLO_GENRTOR
  particlefire Effect_UpsFireP
  particledeath Effect_Fuelxp1
end


begin "Desert Nomadic Tent 1"
  id 101034
  textid  text_building
  type building
  graphic Dtent1
  attrib: Landable
  hp 10
  armor -1
  score 100
  heatsig  1000
  radarsig 1000
  ai_function bld2
  deathfx Effect_CemExp_HR FX01  0
  deathfx effect_WhiteDust FX02  0
  deathfx Effect_GlassExp_HR FX03  0
  move_function upfx
  
end

begin "Desert Adobe hut 3"
  id 101038
  textid  text_building
  type building
  graphic DHut03
  attrib: Landable
  hp 10
  armor -1
  score 100
  heatsig  1000
  radarsig 1000
  ai_function bld2
  deathfx Effect_CemExp_HR FX01  0
  deathfx effect_WhiteDust FX02  0
  deathfx Effect_GlassExp_HR FX03  0
  move_function upfx
  
end

begin "Desert Adobe hut 2"
  id 101037
  textid  text_building
  type building
  graphic DHut02
  attrib: Landable
  hp 10
  armor -1
  score 100
  heatsig  1000
  radarsig 1000
  ai_function bld2
  deathfx Effect_CemExp_HR FX01  0
  deathfx effect_WhiteDust FX02  0
  deathfx Effect_GlassExp_HR FX03  0
  move_function upfx
  
end

begin "Desert Adobe hut 1"
  id 101032
  textid  text_building
  type building
  graphic DHut01
  attrib: Landable
  hp 10
  armor -1
  score 100
  heatsig  1000
  radarsig 1000
  ai_function bld2
  deathfx Effect_CemExp_HR FX01  0
  deathfx effect_WhiteDust FX02  0
  deathfx Effect_GlassExp_HR FX03  0
  move_function upfx
  
end






begin "Communications tower"
  id 104200
  type building
  graphic comtowr1
  husk comt1xa
  husk_sub_parts 6
  hp 60
  armor 8
  score 25
  heatsig  1000
  radarsig 1000
  ai_function towr
  basetime 21  
  addtime  21	
  interrupt_sound_id ENV_TOWER
  particledeath Effect_DemoDustM
  sounddeath EXPLO_COMTOWER
end

begin "Communications tower with dome"
  id 104220
  type building
  graphic comtowr3
  husk comto3xa
  husk_sub_parts 4
  hp 60
  armor 8
  score 25
  heatsig  1000
  radarsig 1000
  ai_function towr
  basetime 20  
  addtime  24	
  interrupt_sound_id ENV_TOWER
  particledeath Effect_DemoDustM
  sounddeath EXPLO_COMTOWER
end


begin "One-story wooden army barracks"
  id 104201
  textid  text_building
  type building
  graphic Wbarack1
  hp 10
  armor -1
  score 50
  heatsig  1000
  radarsig 1000
  ai_function bld2
  husk_swap_at 25
  deathfx Effect_CenterExpM FX00  0
  deathfx Effect_DemoDust FX01  0
  deathfx Effect_TileExp FX02   0
  deathfx Effect_GlassExp FX03  0
  move_function upfx
  particledeath Effect_DemoDustM
  sounddeath EXPLO_BLDGWOOD
end

begin "Airport hangar"
  id 104211
  textid  text_building
  type building
  graphic Airhang1
  hp 10
  armor -1
  score 25
  heatsig  1000
  radarsig 1000
  ai_function bld2
  husk_swap_at 25
  deathfx 0 Effect_CenterExp 0
  deathfx 1 Effect_MetalExpS 0
  deathfx 2 
  deathfx 3 Effect_GlassExp 0
  move_function upfx
  particledeath Effect_DemoDust
  sounddeath EXPLO_BLDGMTL
end




begin "One-story wooden L-shaped headquarters1"
  id 104202
  textid  text_building
  type building
  graphic Whqcntr1
  hp 10
  armor -1
  score 150
  heatsig  1000
  radarsig 1000
  ai_function bld2
  husk_swap_at 25
  deathfx Effect_CenterExpM FX00  0
  deathfx Effect_TileExp FX01  0
  deathfx Effect_DemoDustM FX02   0
  deathfx Effect_GlassExp FX03  0
  move_function upfx
  
end



begin "Small wooden communication center."
  id 104203
  textid  text_building
  type building
  graphic Wcmcntr1
  hp 10
  armor -1
  score 25
  heatsig  100
  radarsig 1000
  ai_function bld2
  move_function upfx
  particledeath Effect_DemoDustM
  
end


begin "Three layer wooden guard tower"
  id 104204
  type building
  graphic Wgrdtwr1
  hp 10
  armor -1
  score 50
  heatsig  1000
  radarsig 1000
  ai_function bld2
  move_function upfx
  particledeath Effect_DemoDustM
  sounddeath EXPLO_WOODTOWER
end

begin "Corregated steel garage. Two entrances on one side only"
  id 104206
  textid  text_building
  type building
  graphic Mgarage1
  score 25
  hp 10
  armor -1
  heatsig  1000
  radarsig 1000
  ai_function bld2
  move_function upfx
  particledeath Effect_DemoDustM
end

begin "Large warehouse end cap section"
  id 104207
  textid  text_building
  type building
  graphic Mwherhs1
  hp 10
  armor -1
  score 25
  heatsig  1000
  radarsig 1000
  ai_function bld2
  move_function upfx
  sounddeath EXPLO_BLDGMTL
end




begin "Small sized steel hangar. Two doors on one side"
  id 104208
  textid  text_building
  type building
  graphic Mhangar1
  hp 10
  armor -1
  score 25
  heatsig  1000
  radarsig 1000
  ai_function bld2
  move_function upfx
  particledeath Effect_DemoDustM
end

begin "Small steel hangar with rounded roof"
  id 104209
  textid  text_building
  type building
  graphic Mhangar2
  hp 10
  armor -1
  score 25
  heatsig  1000
  radarsig 1000
  ai_function bld2
  move_function upfx
  particledeath Effect_DemoDustM
end

begin "Airport control tower"
  id 104242
  textid  text_building
  type building
  graphic Airtowr1
  hp 10
  armor -1
  score 75
  heatsig  1000
  radarsig 1500
  ai_function bld2
  move_function upfx
  particledeath Effect_DemoDust
end

begin "Large oil Tank"
  id 104217
  type building
  graphic oiltank
  hp 10
  armor -1
  score 25
  heatsig  800
  radarsig 1000
  ai_function bld2
  move_function upfx
end

begin "Pup tent"
  id 104218
  type building
  graphic Tent1
  hp 10
  armor -1
  score 10
  heatsig  1000
  radarsig 1000
  ai_function bld2
  move_function upfx
end





begin "Oil platform light post with light"
  id 106323
  type decoration
  attrib: notarget
  graphic OPLIT01
  hp 10
  armor -1
  ai_function gnrl
end

begin "Destructable door for Basement"
  id 102118
  type decoration
  graphic RB_dor
  HP 400
  armor 0 -1
  Husk RB_dorX
  ai_function GNRC
  sounddeath	EXPLO_DOOR_MTL
  ParticleDeath Effect_WallExp01
  husk_sub_part_types 01_HULL 02_CHUNKNP_L 03_CHUNKNP_L 04_CHUNKNP_L 05_CHUNKNP_L 06_CHUNKNP_L 07_CHUNKNP_L 08_CHUNKNP_L
end

begin "Destructable door for MCtarget"
  id 102157
  type decoration
  graphic Mctardor
  HP 50
  armor 0 -1
  Husk MctardrX
  ai_function GNRC
  sounddeath	EXPLO_DOOR_TGT
  ParticleDeath Effect_WallExp01
  husk_sub_part_types 01_HULL 02_CHUNKNP_L 03_CHUNKNP_L 04_CHUNKNP_L 05_CHUNKNP_L 06_CHUNKNP_L 07_CHUNKNP_L 08_CHUNKNP_L
end

begin "Steam grate"
  id 102142
  type decoration
  graphic Steamgrt
end

begin "Wounded Soldier"
  id 102150
  type decoration
  attrib: noctool
  graphic RngrFall
end

begin "Training Target #1"
  id 102151
  type decoration
  graphic Target01
  husk targt01X
  hp 50
  armor 105 40
  ai_function gnrc
  move_function genx
  sounddeath	EXPLO_TARGET1
  particledeath Effect_EXPWoodNoFire
end

begin "Training Target #2"
  id 102152
  type decoration
  graphic Target02
  hp 50
  husk targt02X
  hp 50
  armor 105 40
  ai_function gnrc
  move_function genx
  sounddeath	EXPLO_TARGET1
  particledeath Effect_EXPWoodNoFire
end

begin "Icon for Room Take Down"
  id 102143
  type decoration
  attrib: notool
  graphic RTDicon
end

begin "Bed mattress, Only use this for sleeping AI"
  id 102144
  type decoration
  graphic Bed05
end



begin "Directional arrow for tunnels RED"
  id 102122
  type decoration
  graphic ArrowRed
end

begin "Directional arrow for tunnels BLUE"
  id 102123
  type decoration
  graphic ArrowBlu
end

begin "Directional arrow for tunnels GREEN"
  id 102124
  type decoration
  graphic ArrowGrn
end

begin "Sky light for Russian Embassy"
  id 102112
  type decoration
  graphic RE_Sky
end

begin "Special Sky light for Russian Embassy"
  id 102125
  type decoration
  graphic RE_Sky2
end

begin "Bowl for eating anim"
  id 102126
  type decoration
  graphic Bowl01
  attrib: notarget
end

begin "Telephone pole,single pole w"
  id 102130
  type decoration
  graphic Telepol1
  attrib: notarget
end

begin "Telephone pole,double pole w"
  id 102131
  type decoration
  graphic Telepol2
  attrib: notarget
end

begin "Telephone pole,wrecked w"
  id 102132
  type decoration
  graphic Telepol3
  attrib: notarget
end

begin "Wood Ladder 24m tall"
  id 102111
  type decoration
  graphic WLad04
  attrib: notarget
end

begin "Cinematic Backpack with gun"
  id 102106
  type decoration
  graphic CinBPakG
  attrib: notarget
end

begin "Cinematic Wall Map"
  id 102107
  type decoration
  graphic CinMap
  attrib: notarget
end

begin "Cinematic Duffle Bag"
  id 102108
  type decoration
  graphic CinDufl1
  attrib: notarget
end

begin "Cinematic Group of Duffle Bags"
  id 102109
  type decoration
  graphic CinDufl2
  attrib: notarget
end

begin "Cinematic Helmet"
  id 102110
  type decoration
  graphic CinHelm
  attrib: notarget
end

begin "Hanging Map board for wall"
  id 102105
  type decoration
  graphic MapBrd
  attrib: notarget
end

begin "Hanging Wall Painting3"
  id 101646
  type decoration
  graphic Pnting03
  attrib: notarget
end

begin "Hanging Wall Painting2"
  id 101645
  type decoration
  graphic Pnting02
  attrib: notarget
end

begin "Hanging Wall Painting1"
  id 101644
  type decoration
  graphic Pnting01
  attrib: notarget
end

begin "area rug for interior only"
  id 101641
  type decoration
  graphic Rug01
  attrib: notarget
end

begin "Armoire, interior decoration only"
  id 101505
  type decoration
  graphic Armoire
end

begin "Short book Case, interior decortation only"
  id 101506
  type decoration
  graphic Bcase01
end

begin "Long book Case, interior decortation only"
  id 101507
  type decoration
  graphic Bcase02
end

begin "Corner book Case, interior decortation only"
  id 101584
  type decoration
  graphic Bcase03
end

begin "Garage tools with blue car door"
  id 101636
  type decoration
  graphic Gtools01
end

begin "Garage auto parts with Wall Board"
  id 101637
  type decoration
  graphic Gtools02
end

begin "Auto tools with engine block hoist"
  id 101638
  type decoration
  graphic Gtools03
end

begin "Auto tool boxes"
  id 101639
  type decoration
  graphic Gtools04
end

begin "Parked Version of Dune Buggy with mounted 50cal"
  id 101252
  type decoration
  attrib: NoScar
  graphic FbuggyP
  hp 10
  armor -1
  ai_function GNRC
  
  
end

begin "Parked Version of M3 Bradley Infantry Vehicle"
  id 101247
  type decoration
  attrib: NoScar
  graphic Fm3brd
  hp 10
  armor -1
  ai_function GNRC
  sounddeath EXPLO_APC
end

begin "Parked Version of Enemy Cargo Truck"
  id 101283
  type decoration
  graphic Etrck1p
  attrib: AIData Evil
  hp 1000
  armor 50 50
  ai_function gnrc
  husk Etrck1X
  sounddeath EXPLO_VEHCL_LG
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuftrk
  particleother Effect_SmkNStemNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_CHUNK_M 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M 10_CHUNK_M 11_CHUNK_M 12_CHUNK_L 13_CHUNK_L 14_CHUNK_L 15_ChunkSF_M
End

begin "Parked Version of Etek2 with mounted 50cal"
  id 102135
  type decoration
  graphic ETek2p
  attrib: AIData Evil
  husk Etek2X
  hp 400
  armor 105 40
  ai_function gnrc
  unit_type 1
  sounddeath EXPLO_VEH_TECH
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuf 
  particleother Effect_EtekFireNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_CHUNK_M 05_CHUNK_L 06_CHUNK_L 07_CHUNK_S 08_CHUNK_S
  addeweap ewep01 101885
end


begin "FAH6g Grounded version, no moving parts"
  id 101244
  type decoration
  attrib: NoScar
  graphic FAH6g
  husk FAH6x
  hp 100
  armor 2
  ai_function GNRC
  sounddeath EXPLO_HELICOPTER
  unit_type 3
  sounddeath EXPLO_HELICOPTER
  particledeath Effect_UpsFireNP
  particlefinale Effect_Fuelxp2
  particlefire Effect_HeloHitHusk
  particleother Effect_BlkSmkMedNP
  husk_sub_part_types 01_HULL 02_CHUNK_L 03_CHUNK_M 
end

begin "Parked version of Cargo truck"
  id 101251
  type decoration
  attrib: NoScar
  graphic Nctrck1p
  hp 300
  husk Nctrk1x
  ai_function GNRC
  sounddeath EXPLO_VEHCL_LG
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuftrk
  particleother Effect_SmkNStemNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_CHUNK_M 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M 10_CHUNK_M 11_CHUNK_M 12_CHUNK_L 13_CHUNK_L 14_CHUNK_L 15_ChunkSF_M
end

begin "Parked version of U.N. Cargo Truck"
  id 102134
  type decoration
  graphic UNtrck1p
  attrib: AIData good noscar
  hp 700
  armor 50 50
  ai_function GNRC
  husk UNtrck1X
  sounddeath EXPLO_VEH_TRKLG
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuftrk
  
  particleother Effect_SmkNStemNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_CHUNK_M 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M 10_CHUNK_M 11_CHUNK_M 12_CHUNK_M 13_CHUNK_M 14_CHUNK_M 15_ChunkSF_M
end




begin "Grounded blackhawk, doesnt have moving parts"
  id 101242
  type decoration
  attrib: NoScar
  unit_type 3
  graphic Fblkhawg
  husk Fblkhwkx
  hp 800
  armor 110 110
  ai_function GNRC
  sounddeath EXPLO_HELICOPTER
  particledeath Effect_UpsFireNP
  particlefinale Effect_Fuelxp2
  particlefire Effect_HeloHitHusk
  particleother Effect_BlkSmkMedNP
  husk_sub_part_types 01_HULL 02_CHUNK_M 03_CHUNK_M 04_WHEEL 05_CHUNK_M 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M 10_CHUNK_M 11_CHUNK_M 12_CHUNK_M 13_CHUNK_M 14_CHUNK_M 15_CHUNK_M 16_CHUNK_M
end

begin "Parked Version of C130"
  id 101250
  type decoration
  attrib: NoScar
  graphic Fc130p
  ai_function GNRC
  hp 10
  armor -1
  husk Fc130x
  sounddeath EXPLO_SHIP
  particledeath Effect_JetMetalExp
end

begin "Technical, parked4"
  id 102119
  type decoration
  attrib: NoScar
  graphic Etek4p
  ai_function GNRC
  hp 400
  armor 105 40
  husk Etek45x
  sounddeath EXPLO_VEH_TECH
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuf 
  particleother Effect_EtekFireNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_WHEEL 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_L 10_CHUNK_L 11_CHUNK_L
end

begin "Technical, parked5"
  id 102120
  type decoration
  attrib: NoScar
  graphic Etek5p
  ai_function GNRC
  hp 400
  armor 105 40
  husk Etek45x
  sounddeath EXPLO_VEH_TECH
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuf 
  particleother Effect_EtekFireNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_WHEEL 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_L 10_CHUNK_L 11_CHUNK_L
end

begin "Truck, parked"
  id 102121
  type decoration
  attrib: NoScar
  graphic Gtruck01
  ai_function GNRC
end

begin "Bombed-Out Neutral European Car Small"
  id 101219
  type decoration
  attrib: NoScar
  graphic NCar1hsk
  HP 120
  husk Ncar1x
  ai_function GNRC
  armor 105 40
  sounddeath EXPLO_VEHCL_SM
  particledeath Effect_Fuelxp2
  particlefinale Effect_VehDrtPuf 
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_CHUNK_l 05_CHUNK_M
end

begin "Bombed-Out Neutral Compact Pickup Truck"
  id 101221
  type decoration
  attrib: NoScar
  graphic NTrk1hsk
  ai_function GNRC
  move_function genx
  hp 200
  husk NTrk1X
  armor 105 40
  sounddeath EXPLO_VEHCL_SM
  particledeath Effect_Fuelxp3
end

begin "Parked version of Bus with Crop top"
  id 101259
  type decoration
  attrib: NoScar
  graphic Nbus2P
  ai_function GNRC
  husk Nbus2X
  hp 200
  armor 105 40
  sounddeath EXPLO_VEH_TRKLG
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuftrk 
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_WHEEL 06_CHUNK_S 07_CHUNK_S
end

begin "Parked Version of Refugee Bus"
  id 101257
  type decoration
  attrib: NoScar
  graphic Nbus1P
  ai_function GNRC
  husk Nbus1X
  unit_type 1
  hp 500
  armor 105 100
  sounddeath EXPLO_VEH_TRKLG
  particledeath Effect_Fuelxp5
  particlefinale Effect_VehDrtPuf
  particleother Effect_SmkNStemNP
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_CHUNK_L 05_CHUNK_M 06_CHUNK_L 07_CHUNK_M 08_CHUNK_L 09_CHUNK_M 10_CHUNK_L
end

begin "Parked version of F5ton"
  id 101254
  type decoration
  attrib: NoScar
  graphic F5tonP
  husk F5tonCX
  hp 1200
  armor 105 110
  score 20
  ai_function GNRC
  sounddeath EXPLO_VEH_TRKLG
  particledeath Effect_Fuelxp3
  particlefinale Effect_VehDrtPuf
  husk_sub_part_types 01_HULL 02_WHEEL 03_CHUNK_L 04_WHEEL 05_WHEEL 06_CHUNK_M
end

begin "Parked Version of Friendly Hummer with mounted 50cal"
  id 101248
  type decoration
  attrib: NoScar
  graphic Fhum50p
  husk Fhum50X
  unit_type 1
  addeweap ewep01 101876
  hp 300
  armor 105 40
  score 20
  ai_function GNRC
  sounddeath EXPLO_VEHCL_SM
  particledeath Effect_Fuelxp3
  husk_sub_part_types 01_HULL 02_WHEEL 03_WHEEL 04_WHEEL 05_WHEEL 06_CHUNK_M 07_CHUNK_M 08_CHUNK_M 09_CHUNK_M
end

begin "Technical Husk with working 50 Cal"
  id 101255
  type decoration
  graphic ETek1P
  HP 10
  armor -1
  attrib: eweap noscar
  addeweap ewep01 101877
end

begin "Technical Enemy Vehicle placable husk"
  id 101240
  type decoration
  graphic ETek2x
  attrib: noscar 
  end

begin "Large Cargo Ship with interior, parked"
  id 102146
  type decoration
  graphic Ship01P
  HP 10
  armor -1
  attrib: noscar landable 
  end

begin "Open Wooden Trunk"
  id 101629
  type decoration
  graphic Trunk01
end

begin "Closed Wooden Trunk"
  id 101630
  type decoration
  graphic Trunk02
end

begin "Concrete dock center piece"
  id 101624
  type decoration
  graphic DockSlb1
  attrib: Landable Reflect
end

begin "Concrete dock straight piece"
  id 101625
  type decoration
  graphic DockSlb2
  attrib: Reflect Landable
end

begin "Concrete dock outer corner piece "
  id 101626
  type decoration
  graphic DockSlb3
  attrib: Reflect Landable
end

begin "Concrete dock inner corner piece"
  id 101634
  type decoration
  graphic DockSlb4
  attrib: Reflect Landable
end

begin "Concrete dock end of pier piece"
  id 101635
  type decoration
  graphic DockSlb5
  attrib: Reflect
end

begin "Uncovered Concrete Pier piece"
  id 101627
  type decoration
  graphic DockArm1
  attrib: Landable Reflect
end

begin "Covered Concrete Pier piece"
  id 101628
  type decoration
  graphic DockArm2
  attrib: Landable Reflect
end

begin "Laundry line that hangs between buildings"
  id 101621
  type decoration
  graphic Lndry01
end



begin "Large Broken fountain"
  id 101620
  type decoration
  graphic Fountn01
end

begin "Large Fountain"
  id 101623
  type decoration
  graphic Fountn02
end

begin "Tall stack of radio equipment"
  id 101616
  type decoration
  graphic Radio01
  hp 20
  kz 0.2
  armor 105 20
  husk Radio01X
  ai_function gnrc
  sounddeath EXPLO_RADIO_LG
  particledeath Effect_RadioExp
  particleother Effect_RadioSparks
end

begin "Single placeable radio"
  id 101631
  type decoration
  graphic Radio02
  attrib: notarget
  hp 20
  kz 0.2
  armor 105 20
  husk Radio02X
  ai_function gnrc
  
  sounddeath EXPLO_RADIO_SM
  particledeath Effect_RadioExpSml
  particleother Effect_RadioSparks
end

begin "Single placeable radio alternative"
  id 101632
  type decoration
  graphic Radio03
  attrib: notarget
  hp 20
  kz 0.2
  armor 105 20
  husk Radio03X
  ai_function gnrc
  
  sounddeath EXPLO_RADIO_SM
  particledeath Effect_RadioExpSml
  particleother Effect_RadioSparks
end

begin "Placeable Microphone"
  id 101633
  type decoration
  graphic Radio04
  attrib: notarget
  kz 0.2
  hp 20
  armor 105 20
  husk Radio04X
  ai_function gnrl
  
  
  particledeath Effect_Microphone
end

begin "Radio Tower used on top of RdioBld1.3di"
  id 101615
  type decoration
  graphic RdioTwr
  attrib: notarget
  Husk RdioTwrX
  HP 200
  ai_function GNRC
  armor 105 -1
  move_function upfx
  sounddeath EXPLO_COMTOWER
  ParticleDeath Effect_Fuelxp1
  husk_sub_part_types 01_HULL 02_CHUNKNP_M 03_CHUNK_S 04_CHUNK_S 05_CHUNKNP_M 06_CHUNK_S 07_CHUNKNP_M 08_CHUNK_S 09_CHUNKNP_M 10_CHUNKNP_M 11_CHUNKNP_M 12_CHUNK_S

end

begin "Large Destroyable Bridge used in Operation Guardian"
  id 101614
  type decoration
  graphic Brdg02
  attrib: reflect landable
  Husk Brdg02Xa
  husk_swap_at_sec	2.5
  ai_function GNRC
  heatsig  400
  radarsig 800
  HP 1500
  armor 1000 -1
  move_function upfx
  sounddeath EXPLO_BRIDGE_LG
  ParticleDeath Effect_Fuelxp4
  husk_sub_part_types 01_HULL 02_CHUNKNP_L 03_CHUNKNP_L 04_CHUNKNP_L 05_CHUNKNP_L 06_CHUNKNP_M 07_CHUNKNP_M 08_CHUNKNP_M 09_CHUNKNP_L 10_CHUNKNP_M 11_CHUNKNP_L 12_CHUNKNP_L 13_CHUNKNP_L 14_CHUNKNP_L 15_CHUNKNP_S 16_CHUNKNP_S
  unit_type 11
end

begin "Large Destroyable Garage door used with Garg01.3di"
  id 101613
  type decoration
  graphic GargDR
  Husk GargDRX
  HP 200
  ai_function GNRC
  armor 90 -1
  move_function upfx
  sounddeath EXPLO_GRG_DOOR
  ParticleDeath Effect_PRGDirt
  husk_sub_part_types 01_HULL 02_CHUNKNP_L 03_CHUNKNP_L 0CHUNKNP_L 05_CHUNKNP_L 06_CHUNKNP_L 07_CHUNKNP_L 08_CHUNKNP_L 09_CHUNKNP_L 10_CHUNKNP_L 11_CHUNKNP_L 12_CHUNKNP_L 13_CHUNKNP_L 14_CHUNKNP_L
end

begin "Road Block Made of various Debris Version #2"
  id 101612
  type decoration
  graphic RdBlk2
  attrib: landable 
  Husk RdBlk2X
  ai_function GNRC
  HP 1500
  armor 500 -1
  sounddeath EXPLO_RDBLK2
  ParticleDeath effect_fuelxp4  
end

begin "Road Block Made of various Debris Version #1"
  id 101611
  type decoration
  graphic RdBlk1
 
  Husk RdBlk1X
  ai_function GNRC
  ParticleDeath Effect_WallExp01
  husk_sub_part_types 01_HULL 02_ROCK_L 03_ROCK_M 04_ROCK_L 05_ROCK_L 06_ROCK_M 07_ROCK_S 08_ROCK_S 09_ROCK_S 10_ROCK_M 11_ROCK_M 12_ROCK_S 13_ROCK_M
  HP 1500
  armor 500 -1
  sounddeath EXPLO_RDBLK
end

begin "Modular wooden Ladder 4m tall"
  id 101502
  type decoration
  graphic WLad02
  attrib: notarget
end

begin "Modular wooden Ladder 8m tall"
  id 101622
  type decoration
  graphic WLad03
  attrib: notarget
end

begin "Box and Couple of Baskets for use in MogShd pieces"
  id 101608
  type decoration
  graphic MogFill1
  attrib: notarget
end

begin "Couple of Hanging shirts for use in MogShd pieces"
  id 101609
  type decoration
  graphic MogFill2
  attrib: notarget
end

begin "Building Rubble Corner Piece Short"
  id 101597
  type decoration
  graphic RBL_C1
end

begin "Building Rubble Corner Piece Long"
  id 101598
  type decoration
  graphic RBL_C2
end

begin "Building Rubble Straight Piece Short"
  id 101599
  type decoration
  graphic RBL_S1
end

begin "Building Rubble Straight Piece Long"
  id 101600
  type decoration
  graphic RBL_S2
end

begin "Building Rubble T intersection Piece Short"
  id 101601
  type decoration
  graphic RBL_T1
end

begin "Building Rubble T intersection Piece Long"
  id 101602
  type decoration
  graphic RBL_T2
end

begin "Building Rubble Pile Piece type 1"
  id 101603
  type decoration
  graphic RBL_P1
end

begin "Building Rubble Pile Piece type 2"
  id 101604
  type decoration
  graphic RBL_P2
end

begin "Building Rubble Pile Piece type 3"
  id 101605
  type decoration
  graphic RBL_P3
end



begin "U.N. Single Supply Canister"
  id 101591
  type decoration
  graphic UNsup01
  attrib: notarget
  hp 10
  armor -1
  ai_function GNRC
  move_function genx
end

begin "U.N. Group of Supply Canisters"
  id 101592
  type decoration
  graphic UNsup02
  hp 10
  armor -1
  ai_function GNRC
  move_function genx
end

begin "U.N. Single of Supply Bundle"
  id 101593
  type decoration
  graphic UNsup03
  attrib: notarget
  hp 10
  armor -1
  ai_function GNRC
  move_function genx
end

begin "U.N. Group of Supply Bundles"
  id 101594
  type decoration
  graphic UNsup04
  attrib: notarget
  hp 10
  armor -1
  ai_function GNRC
  move_function genx
end

begin "Modular Wall Debris, straight Piece"
  id 101588
  type decoration
  graphic Wdebris1
end

begin "Modular Wall Debris, Right End Cap"
  id 101589
  type decoration
  graphic Wdebris2
end

begin "Modular Wall Debris, Left End Cap"
  id 101590
  type decoration
  graphic Wdebris3
end

begin "Long Straight Wall Piece, Type A"
  id 101573
  type decoration
  graphic MwalA1
end

begin "Medium Straight Wall Piece, Destructable"
  id 101574
  type decoration
  graphic MwalA2
  Husk MwalA2X
  
  ai_function GNRC
  SOUNDDEATH EXPLO_STONEWALL
  ParticleDeath Effect_WallExp01
  husk_sub_part_types 01_HULL 02_ROCK_L 03_ROCK_L 04_ROCK_L 05_ROCK_L 06_ROCK_L 07_ROCK_L 08_ROCK_L 09_ROCK_L
  debris_scale 0.35
  HP 105
  armor 105 -1
end

begin "Medium Straight Wall Piece, Triggerable only"
  id 101777
  type decoration
  graphic MwalA2
  Husk MwalA2X
  
  ai_function GNRC
  SOUNDDEATH EXPLO_STONEWALL
  ParticleDeath Effect_WallExp01
  husk_sub_part_types 01_HULL 02_ROCK_L 03_ROCK_L 04_ROCK_L 05_ROCK_L 06_ROCK_L 07_ROCK_L 08_ROCK_L 09_ROCK_L
  HP 10
  armor -1
end

begin "Short Straight Wall Piece, Type A"
  id 101575
  type decoration
  graphic MwalA3
 end

begin "Corner Wall Piece, Type A"
  id 101576
  type decoration
  graphic MwalA4
end

begin "3-Way Wall Piece, Type A"
  id 101577
  type decoration
  graphic MwalA5
end

begin "Long Straight Wall Piece, Type B"
  id 101578
  type decoration
  graphic MwalB1
end

begin "Med Straight Wall Piece, Type B"
  id 101579
  type decoration
  graphic MwalB2
  ai_function GNRC
  Husk MwalB2X
  HP 50
  SOUNDDEATH EXPLO_STONEWALL
  ParticleDeath Effect_WallExp01
  husk_sub_part_types 01_HULL 02_ROCK_L 03_ROCK_L 04_ROCK_L 05_ROCK_L 06_ROCK_L 07_ROCK_L 08_ROCK_L 09_ROCK_L 10_ROCK_L
  armor 105 -1
  debris_scale 0.35
end

begin "Short Straight Wall Piece, Type B"
  id 101580
  type decoration
  graphic MwalB3
end

begin "Corner Wall Piece, Type B"
  id 101581
  type decoration
  graphic MwalB4
end

begin "3-Way Wall Piece, Type B"
  id 101582
  type decoration
  graphic MwalB5
end

begin "Crumbled End Piece, Type B"
  id 102138
  type decoration
  graphic MwalB6
end

begin "8m stone wall piece"
  id 102113
  type decoration
  graphic MwalC1
end

begin "16m stone wall piece"
  id 102114
  type decoration
  graphic MwalC2
end

begin "32m stone wall piece"
  id 102115
  type decoration
  graphic MwalC3
end

begin "stone wall end cap piece"
  id 102117
  type decoration
  graphic MwalC4
end

begin "Iron Gate Piece for walls"
  id 101583
  type decoration
  graphic MwalG
  attrib: notarget
  render_function door
  ai_function door
  move_function door
  open_rate 2
  num_doors 1
  first_door 2
  interrupt_sound_id DOOR_OPN_LGGATE		
  interrupt_sound_id2 DOOR_CLS_LGGATE		
end


begin "Iron Gate Piece for walls GATE DOES NOT OPEN"
  id 102145
  type decoration
  graphic MwalGb
  attrib: notarget
end


begin "Single wooden Weapons Crate with closed lid"
  id 101565
  type decoration
  graphic WpnCt1
  attrib: notarget
  husk WpnCtX1
  HP 104
  armor 50 40
  ai_function gnrl
  move_function genx
  particledeath Effect_AmmoCrate
  sounddeath EXPLO_WPNCRATE1
 end

begin "Single wooden Weapons Crate, AK47, open lid"
  id 101566
  type decoration
  graphic WpnCt2
  attrib: notarget
  husk WpnCtX1
  HP 104
  armor 50 40
  ai_function gnrl
  move_function genx
  particledeath Effect_AmmoCrate
  sounddeath EXPLO_WPNCRATE1
 end



begin "Single wooden Weapons Crate, RPG, open lid"
  id 101569
  type decoration
  graphic WpnCt3
  attrib: notarget
  husk WpnCtX1
  HP 104
  armor 50 40
  ai_function gnrl
  move_function genx
  particledeath Effect_AmmoCrate
  sounddeath EXPLO_WPNCRATE1
 end



begin "Stack of multiple wooden Weapons Crates 6x3, closed lids"
  id 101572
  type decoration
  graphic WpnCt4
  husk WpnCtX4
  HP 225
  armor 50 40
  ai_function gnrl
  move_function genx
  particledeath Effect_AmmoCrate
  sounddeath EXPLO_WPNCRATE2
end

begin "Stack of multiple wooden Weapons Crates 3x6, closed lids"
  id 101595
  type decoration
  graphic WpnCt5
  husk WpnCtX5
  HP 275
  armor 50 40
  ai_function gnrl
  move_function genx
  particledeath Effect_AmmoCrate
  sounddeath EXPLO_WPNCRATE2
end

begin "Stack of Weapons Crates, Red glow, S & D"
  id 102153
  type vehicle
  attrib: S&D
  graphic WpnCt5R
  husk WpnCtX5
  hp 999
  armor 999 -1
  ai_function gnrl
  move_function genx
  particledeath Effect_AmmoCrate
  sounddeath EXPLO_WPNCRATE2
end

begin "Stack of Weapons Crates, Blue glow S & D"
  id 102154
  type vehicle
  attrib: S&D
  graphic WpnCt5B
  husk WpnCtX5
  hp 999
  armor 999 -1
  ai_function gnrl
  move_function genx
  particledeath Effect_AmmoCrate
  sounddeath EXPLO_WPNCRATE2
end


begin "Scattered Pile of weapons crates, with 2 open crates"
  id 101596
  type decoration
  graphic WpnCt6
  attrib: notarget
  husk WpnCtX6
  HP 275
  armor 50 40
  ai_function gnrl
  move_function genx
  particledeath Effect_AmmoCrate
  sounddeath EXPLO_WPNCRATE1
end

begin "Mission Critical documents manual"
  id 102181
  type decoration
  graphic Mmanual
  attrib: notarget takeable Movecb
 end

begin "Wall Trash, Large Pile" 
  id 101556
  type decoration
  graphic WTrsh1
  attrib: notool 
 end

begin "Wall Trash, Small Pile" 
  id 101557
  type decoration
  graphic WTrsh2
  attrib: notarget notool
 end

begin "Wall Trash, used for outer convex corner of building" 
  id 101558
  type decoration
  graphic WTrsh3
  attrib: notarget notool
 end

begin "Wall Trash, Used for inner Concave corner of building"
  id 101561
  type decoration
  graphic WTrsh4
  attrib: notarget
 end

begin "Barrel with large contained bonfire, used in night mission only"
  id 101555
  type decoration
  graphic FireBrl1
  attrib: notarget
  move_function envs
  soundloop LP_FIRE_BRL1
  particlefx Effect_FireBarrel Pfx00
 end

begin "Barrel with small contained bonfire, used in night mission only"
  id 101559
  type decoration
  graphic FireBrl2
  attrib: notarget
  move_function envs
  soundloop LP_FIRE_BRL2
  particlefx Effect_FireBarrelS Pfx00
 end

begin "Barrel with holes, small bonfier, used in night mission only"
  id 101560
  type decoration
  graphic FireBrl3
  attrib: notarget
  move_function envs
  soundloop LP_FIRE_BRL1
  particlefx Effect_FireBarrelS Pfx00
 end

begin "Barrel with holes, Large bonfier, used in night mission only"
  id 101562
  type decoration
  graphic FireBrl4
  attrib: notarget
  move_function envs
  soundloop LP_FIRE_BRL2
  particlefx Effect_FireBarrel Pfx00
 end

begin "Camp fire with buring wood"
  id 101563
  type decoration
  graphic CmpFire1
  attrib: notarget
  move_function envs
  soundloop LP_FIRE_BRL1
  particlefx Effect_LowFire Pfx00
  end

begin "Camp fire with smoldering embers"
  id 101564
  type decoration
  graphic CmpFire2
  attrib: notarget
  move_function envs
  soundloop LP_FIRE_BRL2
  particlefx Effect_LowSmoke Pfx00
  end

begin "Land Mine Marker Tall"
  id 101551
  type decoration
  graphic MStck01
  Husk MStck03
  hp 10
  attrib: notarget notool
 end

begin "Land Mine Marker Short"
  id 101552
  type decoration
  graphic MStck02
  Husk MStck04
  hp 10
  attrib: notarget notool
 end

begin "Broken Land Mine Marker Tall"
  id 101553
  type decoration
  graphic MStck03
  attrib: notarget notool
 end

begin "Broken Land Mine Marker Small"
  id 101554
  type decoration
  graphic MStck04
  attrib: notarget notool
 end

begin "Corner Trash pile to be placed at the corner of buildings"
  id 101497
  type decoration
  graphic WTrsh3
  attrib: notarget
 end

begin "Small Trash pile to be placed along walls"
  id 101496
  type decoration
  graphic WTrsh2
  attrib: notarget
 end

begin "Large Trash pile to be placed along walls"
  id 101495
  type decoration
  graphic WTrsh1
  attrib: notarget
 end

begin "Small fishing boat type #3"
  id 101494
  type vehicle
  graphic Skiff03
  husk Skiff03x
  attrib: Reflect
  HP 200
  default_aip wu
  ai_function cbot
  move_function cbbt
  render_function cveh
  unit_type 6
  sounddeath EXPLO_SKIFF
  particledeath Effect_Type5BoatExp
  husk_sub_part_types 01_HULL 02_CHUNKnp_m 03_CHUNKnp_m
end

begin "Small fishing boat type #2"
  id 101493
  type vehicle
  graphic Skiff02
  husk Skiff03x
  attrib: Reflect
  HP 200
  default_aip wu
  ai_function cbot
  move_function cbbt
  render_function cveh
  unit_type 6
  sounddeath EXPLO_SKIFF
  particledeath Effect_Type5BoatExp
  husk_sub_part_types 01_HULL 02_CHUNKnp_m 03_CHUNKnp_m
end

begin "Small fishing boat type #1"
  id 101492
  type vehicle
  graphic Skiff01
  husk Skiff03x
  attrib: Reflect
  HP 200
  default_aip wu
  ai_function cbot
  move_function cbbt
  render_function cveh
  unit_type 6
  sounddeath EXPLO_SKIFF
  particledeath Effect_Type5BoatExp
  husk_sub_part_types 01_HULL 02_CHUNKnp_m 03_CHUNKnp_m
end

begin "Large Metal Cargo Container both doors closed"
  id 101489
  type building
  graphic Cargo01
end


begin "Large Metal Cargo Container one door open"
  id 101490
  type decoration
  graphic Cargo02
end

begin "Large Metal Cargo Container both doors open"
  id 101491
  type decoration
  graphic Cargo03
end

begin "Large Metal Cargo Container, with ladder, both doors closed"
  id 101498
  type decoration
  graphic Cargo04
end

begin "Large Metal Cargo Container, with ladder, one door open"
  id 101499
  type decoration
  graphic Cargo05
end

begin "Large Metal Cargo Container, with ladder, both doors open"
  id 101500
  type decoration
  graphic Cargo06
end


begin "Blocking Furniture"
  id 101501
  type decoration
  graphic rmcabnts
end


begin "Large Pier Platform Piece"
  id 101488
  type decoration
  graphic PBlok01
end

begin "Large Pier Platform Piece B - longer supports"
  id 106365
  type decoration
  graphic PBlok01B
end

begin "Straight narrow Pier walkway piece 15m"
  id 101486
  type decoration
  graphic Pwalk01
  attrib: reflect
end

begin "Straight narrow Pier walkway piece 15m B - longer supports"
  id 106366
  type decoration
  graphic Pwalk01B
  attrib: reflect
end

begin "Narrow boat Tie-off pier piece"
  id 101487
  type decoration
  graphic Pwalk02
  attrib: reflect 
end





begin "Desk, turned over file cabinet, and a chair"
  id 101545
  type decoration
  graphic rmofficA
  attrib: notarget
end

begin "2 couches with broken end table and lamp"
  id 101544
  type decoration
  graphic rmlivinB
  attrib: notarget
end

begin "2 couch with broken coffee table"
  id 101543
  type decoration
  graphic rmlivinA
  attrib: notarget
 end

begin "Bed with Dresser"
  id 101542
  type decoration
  graphic rmbedA
  attrib: notarget
 end

begin "Old wall Radiator"
  id 101541
  type decoration
  graphic Heatr01
  attrib: notarget
 end

begin "Damaged File Cabinets with scattered papers"
  id 101540
  type decoration
  graphic File01
end

begin "Broken Office Chair"
  id 101539
  type decoration
  graphic Chair02
  attrib: notarget
end

begin "Large Chair for head of the table3"
  id 101647
  type decoration
  graphic Chair03
  attrib: notarget
end

begin "Large Chair for head of the table4"
  id 102104
  type decoration
  graphic Chair04
  attrib: notarget
end

begin "Long Half Table, interior decoration only"
  id 101640
  type decoration
  graphic Table08
  attrib: notarget
end

begin "Half Table, interior decoration only"
  id 101619
  type decoration
  graphic Table07
  attrib: notarget
end

begin "Long End Table, interior decoration only"
  id 101610
  type decoration
  graphic Table06
  attrib: notarget
end

begin "End Table, interior decoration only"
  id 101587
  type decoration
  graphic Table05
  attrib: notarget
end

begin "Table, interior decoration only"
  id 101585
  type decoration
  graphic Table04
  attrib: notarget
end

begin "Broken end table with lamp on top"
  id 101538
  type decoration
  graphic Table03
  attrib: notarget
 end

begin "Broken Coffee Table"
  id 101537
  type decoration
  graphic Table02
  attrib: notarget
 end

begin "Old Damaged Sofa"
  id 101536
  type decoration
  graphic Sofa01
  attrib: notarget
 end

begin "Dresser with pulled out drawrs"
  id 101535
  type decoration
  graphic Dresser
  attrib: notarget
end

begin "Dresser, interior decoration only"
  id 101586
  type decoration
  graphic Dressr02
  attrib: notarget
end

begin "Domestic Radio on top of Crate"
  id 101534
  type decoration
  graphic Radio
  attrib: notarget
 end

begin "Messy Mattress on the floor"
  id 101533
  type decoration
  graphic Bed01
  attrib: notarget
 end

begin "Bed mattress on top of wooden palettes"
  id 101617
  type decoration
  graphic Bed02
  attrib: notarget
end

begin "Bed mattress on top of wooden palettes and cinder blocks"
  id 101618
  type decoration
  graphic Bed03
  attrib: notarget
end

begin "Master Bed with a Canopy"
  id 101642
  type decoration
  graphic Bed04
  attrib: notarget
end


begin "Desktop Fan with moving blades"
  id 101532
  type decoration
  graphic Fan02
  attrib: notarget
  move_function ENVS
  soundloop	LP_OSC_FAN
end

begin "ceiling Fan with moveing blades"
  id 101531
  type decoration
  graphic Fan01
  attrib: notarget
end





begin "Middle East Mine Field Warning Sign"
  id 101484
  type decoration
  graphic Mine_me
  attrib: notarget
end













begin "Propaganda Somalian Grafitti 03"
  id 102129
  type decoration
  graphic Pos_Sm03
  attrib: notarget
 end

begin "Propaganda Somalian Grafitti 04"
  id 102155
  type decoration
  graphic Pos_Sm04
  attrib: notarget
 end

begin "Propaganda Somalian Grafitti 05"
  id 102156
  type decoration
  graphic Pos_Sm05
  attrib: notarget
 end

begin "Propaganda Somalian Grafitti 02"
  id 102128
  type decoration
  graphic Pos_Sm02
  attrib: notarget
 end

begin "Propaganda Somalian Grafitti 01"
  id 102127
  type decoration
  graphic Pos_Sm01
  attrib: notarget
 end

begin "Propaganda Poster Middle East 06"
  id 101513
  type decoration
  graphic Pos_ME06
  attrib: notarget
 end

begin "Propaganda Poster Middle East 05"
  id 101512
  type decoration
  graphic Pos_ME05
  attrib: notarget
  end

begin "Propaganda Poster Middle East 04"
  id 101511
  type decoration
  graphic Pos_ME04
  attrib: notarget
  end

begin "Propaganda Poster Middle East 03"
  id 101510
  type decoration
  graphic Pos_ME03
  attrib: notarget
  end

begin "Propaganda Poster Middle East 02"
  id 101509
  type decoration
  graphic Pos_ME02
  attrib: notarget
 end

begin "Propaganda Poster Middle East 01"
  id 101508
  type decoration
  graphic Pos_ME01
  attrib: notarget
 end

begin "Ladder 7m "
  id 101479
  type decoration
  graphic Wlad01
  attrib: notarget
  hp 10
  armor -1
  ai_function gnr1
end

begin "Baricade 5m made of barbed wire, debris, carhusk"
  id 101477
  type decoration
  graphic Baricd01
  hp 10
  armor -1
  ai_function gnrl
end

begin "Baricade 1m tile-able"
  id 101478
  type decoration
  graphic Baricd02
  hp 10
  armor -1
  ai_function gnrl
end

begin "Baricade 5m made of debris and barbed wire"
  id 101480
  type decoration
  graphic Baricd03
  hp 10
  armor -1
end

begin "Scattered papers and waste"
  id 101476
  type decoration
  attrib: notarget
  graphic Trash01
  hp 10
  armor -1
  ai_function gnrl
end

begin "Scattered papers and waste #2"
  id 102139
  type decoration
  attrib: notarget
  graphic Trash02
  hp 10
  armor -1
  ai_function gnrl
end


begin "Vending Cart"
  id 101472
  type decoration
  attrib: notarget
  graphic VndCrt
  hp 50
  kz 1
  armor 105 40
  husk VndCrtx
  ai_function gnrc
  move_function genx
  sounddeath	EXPLO_CART
  particledeath Effect_EXPWoodNoFire
end

begin "Singe rock formation6"
  id 101474
  type decoration
  graphic RckS06
  hp 10
  armor -1
  ai_function gnrl
end

begin "Singe rock formation5"
  id 101471
  type decoration
  graphic RckS05
  hp 10
  armor -1
  ai_function gnrl
end

begin "Singe rock formation4"
  id 101470
  type decoration
  graphic RckS04
  hp 10
  armor -1
  ai_function gnrl
end

begin "Singe rock formation3"
  id 101469
  type decoration
  graphic RckS03
  hp 10
  armor -1
  ai_function gnrl
end

begin "Singe rock formation2"
  id 101467
  type decoration
  graphic RckS02
  hp 10
  armor -1
  ai_function gnrl
end

begin "Singe rock formation1"
  id 101466
  type decoration
  graphic RckS01
  hp 10
  armor -1
  ai_function gnrl
end

begin "Group of large Rocks6"
  id 101473
  type decoration
  graphic RckM06
  hp 10
  armor -1
  ai_function gnrl
 end

begin "Group of large Rocks6B - moss skin"
  id 106352
  type decoration
  graphic R_grp6B
  hp 10
  armor -1
  ai_function gnrl
 end

begin "Group of large Rocks5"
  id 101465
  type decoration
  graphic RckM05
  hp 10
  armor -1
  ai_function gnrl
end

begin "Group of large Rocks5B - moss skin"
  id 106351
  type decoration
  graphic R_grp5B
  hp 10
  armor -1
  ai_function gnrl
end

begin "Group of large Rocks4"
  id 101464
  type decoration
  graphic RckM04
  hp 10
  armor -1
  ai_function gnrl
end

begin "Group of large Rocks4B - moss skin"
  id 106350
  type decoration
  graphic R_grp4B
  hp 10
  armor -1
  ai_function gnrl
end

begin "Group of large Rocks3"
  id 101463
  type decoration
  graphic RckM03
  hp 10
  armor -1
  ai_function gnrl
end

begin "Group of large Rocks3B - moss skin"
  id 106349
  type decoration
  graphic R_grp3B
  hp 10
  armor -1
  ai_function gnrl
end

begin "Group of large Rocks2"
  id 101462
  type decoration
  graphic RckM02
  hp 10
  armor -1
  ai_function gnrl
end

begin "Group of large Rocks2B - moss skin"
  id 106348
  type decoration
  graphic R_grp2B
  hp 10
  armor -1
  ai_function gnrl
end

begin "Group of large Rocks1"
  id 101461
  type decoration
  graphic RckM01
  hp 10
  armor -1
  ai_function gnrl
end

begin "Group of large Rocks1B - moss skin"
  id 106347
  type decoration
  graphic R_grp1B
  hp 10
  armor -1
  ai_function gnrl
end

begin "Straight wooden plank "
  id 101459
  type decoration
  attrib: notarget
  graphic WdPlank
  hp 10
  armor -1
  ai_function gnrc
end

begin "Stack of used Tires"
  id 101458
  type decoration
  graphic Tire01
  hp 10
  armor -1
  ai_function gnrc
end

begin "TireB01 Stack of burning tires #1"
  id 101514
  type decoration
  graphic TireB01
  hp 10
  armor -1
  ai_function gnrc
end

begin "Tire02 Stack of used tire"
  id 101460
  type decoration
  graphic Tire02
  hp 10
  armor -1
  ai_function gnrc
end




begin "Straight stone wall piece"
  id 101440
  type decoration
  graphic StnWal04
  hp 10
  armor -1
  ai_function gnrl
end

begin "Intersection"
  id 101455
  type decoration
  graphic StnWal03
  hp 10
  armor -1
  ai_function gnrl
end

begin "Corner Piece"
  id 101454
  type decoration
  graphic StnWal02
  hp 10
  armor -1
  ai_function gnrl
end

begin "Stone Wall Straight Segment"
  id 101453
  type decoration
  graphic StnWal01
  hp 10
  armor -1
  ai_function gnrl
end



begin "Semi-Circle"
  id 101450
  type decoration
  graphic SndBag02
  hp 10
  armor -1
  ai_function gnrl
end

begin "Staight segment with shooting notch"
  id 101449
  type decoration
  attrib: notarget
  graphic SndBag01
  hp 10
  armor -1
  ai_function gnrl
end


begin "TV antenna 3"
  id 101447
  type decoration
  attrib: notarget
  graphic Antnna03
  hp 10
  armor -1
  ai_function gnrc
end

begin "TV antenna 2"
  id 101446
  type decoration
  attrib: notarget
  graphic Antnna02
  hp 10
  armor -1
  ai_function gnrc
end


begin "Multiple Sacks of Rice"
  id 101444
  type decoration
  graphic Sack03
  hp 10
  armor -1
  ai_function gnrl
  move_function genx
end

begin "Multiple Sack of Cement"
  id 101443
  type decoration
  graphic Sack02
  hp 10
  armor -1
  ai_function gnrl
  move_function genx
end

begin "Single Sack of Rice"
  id 101442
  type decoration
  graphic Sack01
  hp 10
  armor -1
  ai_function gnrl
  move_function genx
end

begin "Hand Cart"
  id 101441
  type decoration
  attrib: notarget
  graphic HndCrt
  hp 10
  armor -1
  heatsig  1000
  radarsig 1000
  ai_function bld2
end

begin "Communications Radio"
  id 101439
  type decoration
  attrib: notarget
  graphic Cradio
  hp 10
  kz 1
  armor -1
  ai_function gnrc
end

begin "old wooden 4 legged chair"
  id 101438
  type decoration
  attrib: notarget
  graphic Chair01
  hp 10
  armor -1
  ai_function gnrl
end

begin "Old wooden four legged table"
  id 101437
  type decoration
  attrib: notarget
  graphic Table01
  hp 10
  armor -1
end

begin "Weathered light post no light"
  id 101436
  type decoration
  attrib: notarget
  graphic Lpost01
  hp 10
  armor -1
  ai_function gnrl
end

begin "Weathered light post with light"
  id 102116
  type decoration
  attrib: notarget
  graphic Lpost02
  hp 10
  armor -1
  ai_function gnrl
end


begin "Metal 50gal Drum"
  id 101435
  type decoration
  attrib: notarget
  graphic Drum
  hp 10
  armor 4
  husk mbarel1x
  sounddeath EXPLO_FUELTNKSM
  ai_function gnrc
  particledeath Effect_Fuelxp1
end

begin "Light post"
  id 104306
  type decoration
  graphic Lpole1
  attrib: notarget
  hp 10
  armor -1
  ai_function gnrl
end




begin "Portablte fire extinguisher"
  id 104309
  type decoration
  attrib: notarget
  graphic Fireext1
  hp 15
  husk Firext1x
  ai_function gnrc
  particledeath Effect_Ammocrate
end




begin "Single wooden Barrel1"
  id 101482
  type decoration
  graphic Barl01
  hp 10
  armor -1
  ai_function gnrc
end

begin "Single wooden Barrel2"
  id 101483
  type decoration
  graphic Barl02
  hp 10
  armor -1
  ai_function gnrc
end

begin "Single metal barrel"
  id 104300
  type decoration
  graphic Mbarrel1
  heatsig  400
  radarsig 800
  hp 20
  armor 105 20
  husk mbarel1x
  ai_function gnrc
  move_function upfx
  sounddeath EXPLO_FUELTNKSM
  particledeath Effect_Fuelxp1
end

begin "Group of metal barrels"
  id 104301
  type decoration
  graphic Mbarrel2
  heatsig  800
  radarsig 1200
  hp 40
  armor 105 20
  husk mbarel2x
  ai_function gnrc
  move_function upfx
  sounddeath EXPLO_FUELTNKSM
  particledeath Effect_Fuelxp2
end

begin "Single wooden crate"
  id 104302       
  type decoration
  graphic wcrate1     
  husk wcrate1x
  hp 104
  armor 50 40
  ai_function gnrl
  move_function genx
  sounddeath EXPLO_CRATES_S
  particledeath Effect_CrateEXPS
end

begin "Group of wooden crates2"
  id 104303       
  type decoration
  graphic wcrate2     
  husk wcrate2x
  hp 125
  armor 50 40
  ai_function gnrl
  move_function genx
  sounddeath EXPLO_CRATES_M
  particledeath Effect_CrateEXPM
end

begin "Group of wooden crates3"
  id 104304       
  type decoration
  graphic wcrate3     
  husk wcrate3x
  hp 175 
  armor 50 40
  ai_function gnrl
  move_function genx
  sounddeath EXPLO_CRATES_L
  particledeath Effect_CrateEXPL
end

begin "Wooden Crate with Tarp"
  id 101481       
  type decoration
  graphic wcrate4     
  hp 10
  armor -1
  ai_function gnrl
end

begin "Wooden Crate with Khat destroyable w"
  id 102147       
  type decoration
  graphic wcrate5
  husk wcrate1x     
  hp 1000
  armor 201 -1
  ai_function gnrl
  move_function genx
  sounddeath EXPLO_CRATES_S
  particledeath Effect_CrateEXPS
end


begin "Cocaine Crate - Single"
  id 106184
  type decoration
  graphic COCR01
  husk COCR01X
  hp 125
  armor 50 40
  ai_function gnrc
  sounddeath EXPLO_CRATES_S
  particledeath Effect_cokeCrateExp
end

begin "Drug Table Small"
  id 106260
  type decoration
  graphic DTBLS01
  hp 10
  armor -1
  ai_function gnrc
end

begin "Mission Critical Documents Manual #2"
  id 106321
  type decoration
  graphic MANU02
  attrib: notarget takeable Movecb
 end

begin "Oil Platform Winch"
  id 106316
  type decoration
  graphic OWINC01
  hp 10
  armor -1
  ai_function gnrc
end

begin "Oil Platform Vent"
  id 106317
  type decoration
  graphic OVENT01
  hp 10
  armor -1
  ai_function gnrc
end

begin "Oil Platform Propane Tank"
  id 106318
  type decoration
  graphic OTANK01
  husk OTANK01X
  hp 200
  ai_function gnrc
  sounddeath EXPLO_COMTOWER
  ParticleDeath Effect_Fuelxp1
  husk_sub_part_types 01_HULL 02_CHUNKNP_M 03_CHUNK_S 04_CHUNK_S 05_CHUNKNP_M 06_CHUNK_S 07_CHUNKNP_M 08_CHUNK_S 09_CHUNKNP_M 10_CHUNKNP_M
end

begin "Oil Field Well Head Units"
  id 106319
  type decoration
  attrib: notarget
  graphic OWLHD01
  husk OWLHD01X
  HP 200
  ai_function GNRC
  armor 105 -1
  move_function upfx
  sounddeath EXPLO_COMTOWER
  ParticleDeath Effect_Fuelxp1
  husk_sub_part_types 01_HULL 02_CHUNKNP_M 03_CHUNK_S 04_CHUNK_S 05_CHUNKNP_M 06_CHUNK_S 07_CHUNKNP_M 08_CHUNK_S 09_CHUNKNP_M 10_CHUNKNP_M 11_CHUNKNP_M 12_CHUNK_S
end

begin "Oil Field Pipe Junction"
  id 106193
  type building
  graphic OJNC01
  hp 10
  armor -1
  ai_function gnrc
end

begin "Oil Field Pumping Unit"
  id 106233
  type building
  graphic OPMP01
  hp 10
  armor -1
  ai_function gnrc
end

begin "Offshore Oil Platform Main"
  id 106287
  type building
  attrib: Landable
  attrib: reflect
  graphic OPLT01
  hp 10
  armor -1
  ai_function gnrc
end

begin "Offshore Oil Platform Main B"
  id 106297
  type building
  attrib: Landable
  attrib: reflect
  graphic OPLT01B
  hp 10
  armor -1
  ai_function gnrc
end

begin "Offshore Oil Platform Main C"
  id 106298
  type building
  attrib: Landable
  attrib: reflect 
  graphic OPLT01C
  hp 10
  armor -1
  ai_function gnrc
end

begin "Offshore Oil Platform Derrick"
  id 106288
  type building
  attrib: Landable
  attrib: reflect
  graphic OPLT02
  hp 10
  armor -1
  ai_function gnrc
end

begin "Offshore Oil Platform Flare"
  id 106289
  type building
  attrib: Landable
  attrib: reflect
  graphic OPLT03
  hp 10
  armor -1
  ai_function gnrc
  soundloop LP_FIRE_BRL1
  particlefx Effect_FireBarrel Pfx00
end

begin "Offshore Oil Platform Helopad"
  id 106290
  type building
  attrib: reflect
  graphic OPLT04
  hp 10
  armor -1
  ai_function gnrc
end

begin "Oil Platform Helopad NULL Mesh"
  id 106331
  type building
  graphic OPLT04A
  hp 10
  armor -1
  ai_function gnrc
  attrib: Landable Reflect
end

begin "Offshore Oil Platform Strut"
  id 106291
  type building
  graphic OPLT05
  hp 10
  armor -1
  ai_function gnrc
end

begin "Offshore Oil Platform Pontoon"
  id 106322
  type building
  attrib: Landable
  attrib: reflect
  graphic OPONT01
  hp 10
  armor -1
  ai_function gnrc
end

begin "Offshore Oil Platform Pipes"
  id 106293
  type building
  graphic OPLT06
  hp 10
  armor -1
  ai_function gnrc
end

begin "Offshore Oil Platform Watchtower"
  id 106294
  type building
  attrib: reflect
  graphic OPLT07
  hp 10
  armor -1
  ai_function gnrc
end

begin "Offshore Oil Shut Off Valve"
  id 106315
  type building
  graphic OSHUT01
  hp 10
  armor -1
  ai_function gnrc
end

begin "Offshore Oil Platform Fence 1"
  id 106300
  type building
  graphic OPFC01
  hp 10
  armor -1
  ai_function gnrc
end

begin "Offshore Oil Platform Fence 2"
  id 106301
  type building
  graphic OPFC02
  hp 10
  armor -1
  ai_function gnrc
end

begin "Offshore Oil Platform Fence 3"
  id 106302
  type building
  graphic OPFC03
  hp 10
  armor -1
  ai_function gnrc
end

begin "Offshore Oil Platform Fence 4 (4.2M long)"
  id 106309
  type building
  graphic OPFC04
  hp 10
  armor -1
  ai_function gnrc
end

begin "Offshore Oil Platform Fence 5"
  id 106332
  type building
  graphic OPFC05
  hp 10
  armor -1
  ai_function gnrc
end

begin "Offshore Oil Platform Building 1"
  id 106306
  type building
  attrib: reflect
  graphic OBLD01
  hp 10
  armor -1
  ai_function gnrc
end

begin "Offshore Oil Platform Building 2"
  id 106307
  type building
  attrib: reflect
  graphic OBLD02
  hp 10
  armor -1
  ai_function gnrc
end

begin "Offshore Oil Platform Building 3 (office)"
  id 106308
  type building
  attrib: reflect
  graphic OBLD03
  hp 10
  armor -1
  ai_function gnrc
end

begin "Offshore Oil Platform gangway connector"
  id 106327
  type building
  attrib: reflect
  graphic OCONN01
  hp 10
  armor -1
  ai_function gnrc
end

begin "Offshore Oil Platform crane"
  id 106328
  type building
  attrib: reflect
  graphic OPCRN01
  hp 10
  armor -1
  ai_function gnrc
end

begin "Warning Light 1"
  id 106303
  type building
  graphic WLITE01
  hp 10
  armor -1
  ai_function gnrc
end

begin "Colombian Arch"
  id 106185
  type building
  graphic CARC01
  hp 10
  armor -1
  ai_function gnrc
end

begin "Felled Columbian Ruins"
  id 106254
  type building
  graphic CARC02
  hp 10
  armor -1
  ai_function gnrc
end

begin "Columbian Wall Section"
  id 106255
  type building
  graphic CARC03
  hp 10
  armor -1
  ai_function gnrc
end

begin "Columbian Wall End Piece"
  id 106256
  type building
  graphic CARC04
  hp 10
  armor -1
  ai_function gnrc
end

begin "United Nations Flag"
  id 106282
  type building
  graphic UNFLG01
  hp 10
  armor -1
  ai_function gnrc
end

begin "Drug Lord's Villa"
  id 106205
  type building
  graphic DRGVLA
  hp 10
  armor -1
  ai_function gnrc
end

begin "Drug Lord's Boat House"
  id 106253
  type building
  attrib: reflect
  graphic DDBH01
  hp 10
  armor -1
  ai_function gnrc
end


begin "Large Tropical Canopy"
  id 106187
  type foliage
  graphic CANL01
  hp 10
  armor -1
  ai_function tree
end

begin "Medium Tropical Canopy"
  id 106188
  type foliage
  graphic CANM01
  hp 10
  armor -1
  ai_function tree
end

begin "Small Tropical Canopy"
  id 106189
  type foliage
  graphic CANS01
  hp 10
  armor -1
  ai_function tree
end

begin "Small Tropical Fern"
  id 106190
  type foliage
  graphic FERN01A
  hp 10
  armor -1
  ai_function tree
end

begin "Larger Tropical Fern"
  id 106299
  type foliage
  graphic FERN01B
  hp 10
  armor -1
  ai_function tree
end

begin "Tropical Tree Grouping 1A"
  id 106191
  type foliage
  graphic TT04A
  hp 10
  armor -1
  ai_function tree
end

begin "Tropical Tree Grouping 2A"
  id 106227
  type foliage
  graphic TG02A
  hp 10
  armor -1
  ai_function tree
end

begin "Tropical Tree Grouping 2B"
  id 106228
  type foliage
  graphic TG02B
  hp 10
  armor -1
  ai_function tree
end

begin "Tropical Tree Grouping 2C"
  id 106229
  type foliage
  graphic TG02C
  hp 10
  armor -1
  ai_function tree
end

begin "Tall Tropical Tree"
  id 106194
  type foliage
  graphic TT03A
  hp 10
  armor -1
  ai_function tree
end

begin "Felled Tropical Tree a"
  id 106295
  type foliage
  graphic FT01
  hp 10
  armor -1
  ai_function tree
end

begin "Felled Tropical Tree b"
  id 106296
  type foliage
  graphic FT02
  hp 10
  armor -1
  ai_function tree
end

begin "Desert Palm Grouping"
  id 106272
  type foliage
  graphic TDP03B
  hp 10
  armor -1
  ai_function tree
end

begin "Large Antennae (no supports)"
  id 106273
  type decoration
  graphic ANTN04
  hp 10
  armor -1
  ai_function gnrc
end


begin "Colombian Rope Bridge (tile)"
  id 106250
  attrib: Landable reflect
  type building
  graphic RBRG01
  hp 150
  ai_function gnrc
end

begin "Colombian Rope Bridge (tile"
  id 106274
  attrib: Landable reflect 
  hp 105
  armor 105 -1
  type building
  graphic RBRG02
  Husk RBRG02X
  ai_function bld2   
  move_function upfx
  sounddeath EXPLO_WOODTOWER
  
  particleDeath Effect_Fuelxp4
  husk_sub_part_types 01_HULL 02_CHUNKNP_L 03_CHUNKNP_L 04_CHUNKNP_L 05_CHUNKNP_L 06_CHUNKNP_L 07_CHUNKNP_L
  unit_type 11
end

begin "Colombian Rope Bridge (end piece)"
  id 106275
  attrib: Landable reflect 
  hp 105
  armor 105 -1
  type building
  graphic RBRG03
  Husk RBRG03X
  ai_function bld2   
  move_function upfx
  sounddeath EXPLO_WOODTOWER
  particledeath Effect_EXPWoodNoFire
  husk_sub_part_types 01_HULL 02_CHUNKNP_L 03_CHUNKNP_L 04_CHUNKNP_L
  unit_type 11
end


begin "Medium Tropical Tree"
  id 106195
  type foliage
  graphic TT05A
  hp 10
  armor -1
  ai_function tree
end

begin "Tropical Banana Tree"
  id 106196
  type foliage
  graphic TT06A
  hp 10
  armor -1
  ai_function tree
end

begin "Tropical Tree Grouping 01"
  id 106215
  type foliage
  graphic TG01A
  hp 10
  armor -1
  ai_function tree
end

begin "Tropical Tree Grouping 02"
  id 106234
  type foliage
  graphic TG01B
  hp 10
  armor -1
  ai_function tree
end

begin "Tropical Tree Grouping 03 No ferns"
  id 106197
  type foliage
  graphic TG01C
  hp 10
  armor -1
  ai_function tree
end

begin "Tropical Tree Grouping 04 No ferns"
  id 106198
  type foliage
  graphic TG01D
  hp 10
  armor -1
  ai_function tree
end


begin "Aztec Statue"
  id 106192
  type decoration
  graphic ASTAT
  hp 10
  armor -1
  ai_function gnrc
end

begin "Player Step"
  id 106216
  type building
  graphic STEP01
  hp 10
  armor -1
  ai_function gnrc
end

begin "Medieval Fortress Ruins A"
  id 106208
  type Building
  graphic IFRTA
  hp 10
  armor -1
  ai_function gnrc
end

begin "Medieval Fortress Ruins B"
  id 106209
  type Building
  graphic IFRTB
  hp 10
  armor -1
  ai_function gnrc
end

begin "Medieval Fortress Ruins C"
  id 106210
  type Building
  graphic IFRTC
  hp 10
  armor -1
  ai_function gnrc
end

begin "Medieval Fortress Ruins D"
  id 106211
  type Building
  graphic IFRTD
  hp 10
  armor -1
  ai_function gnrc
end

begin "Medieval Fortress Ruins E"
  id 106244
  type Building
  graphic IFRTE
  hp 10
  armor -1
  ai_function gnrc
end

begin "Oil Pipe Section 1"
  id 106219
  type Building
  graphic O_PIPE1
  hp 10
  armor -1
  ai_function gnrc
end

begin "Oil Pipe Section 2"
  id 106220
  type Building
  graphic O_PIPE2
  hp 10
  armor -1
  ai_function gnrc
end

begin "Oil Pipe Section 3"
  id 106221
  type Building
  graphic O_PIPE3
  hp 10
  armor -1
  ai_function gnrc
end

begin "Oil Pipe Section 4"
  id 106222
  type Building
  graphic O_PIPE4
  hp 10
  armor -1
  ai_function gnrc
end

begin "Oil Tank A"
  id 106223
  type Building
  graphic O_TANKA
  hp 10
  armor -1
  ai_function gnrc
end

begin "Oil Tank B"
  id 106224
  type Building
  graphic O_TANKB
  hp 10
  armor -1
  ai_function gnrc
end

begin "Oil Tank C"
  id 106225
  type Building
  graphic O_TANKC
  hp 10
  armor -1
  ai_function gnrc
end

begin "Oil VALVE 1"
  id 106226
  type Building
  graphic O_VALV1H
  hp 10
  armor -1
  ai_function gnrc
end

begin "Oil Flare 1"
  id 106236
  type building
  graphic O_FLARE
  attrib: notarget
  move_function envs
  soundloop LP_FIRE_BRL1
  particlefx Effect_FireBarrel Pfx00
 end

begin "Oil Flare 2"
  id 106235
  type building
  graphic O_FLARE2
  attrib: notarget
  move_function envs
  soundloop LP_FIRE_BRL1
  particlefx Effect_FireBarrel Pfx00
 end

begin "Use this for test objects1"
  id 101649       
  type decoration
  graphic test01     
  ai_function gnrl
  move_function genx
end

begin "Use this for test objects2"
  id 101650       
  type decoration
  graphic test02     
  ai_function gnrl
  move_function genx
end

begin "Use this for test objects3"
  id 101651      
  type decoration
  graphic test03     
  ai_function gnrl
  move_function genx
end

begin "Forward Area Rearming Point"
  id 104356     
  type decoration
  graphic Farp1
  attrib: landable     
end

 

 

 

 

begin "Small Desert Bush"
  id 102088
  type foliage
  attrib: notarget
  graphic DB01a
  
  hp 10
  armor -1
end

begin "Med Desert Bush"
  id 102089
  type foliage
  attrib: notarget
  graphic DB01b
  
  hp 10
  armor -1
end

begin "Large Desert Bush"
  id 102090
  type foliage
  attrib: notarget 
  graphic DB01c
  
  hp 10
  armor -1
end

begin "Medium Green Bush used in desert Climate"
  id 102091
  type foliage
  attrib: notarget 
  graphic GB01a
  
  hp 10
  armor -1
end

begin "Double Palm tree Group"
  id 102093
  type foliage
  attrib: notarget noscar
  graphic GP01a
  
  hp 10
  armor -1
  end

begin "Water Weed used for river banks"
  id 102094
  type foliage
  attrib: notarget 
  graphic Weed01
  
  hp 10
  armor -1
end

begin "Large Green Bush used in desert Climate"
  id 102092
  type foliage
  attrib: notarget 
  graphic GB01b
  
  hp 10
  armor -1
end

begin "Green Tree type one version A"
  id 102095
  type foliage
  attrib: notarget noscar
  graphic Gt01a
  
  hp 10
  armor -1
end

begin "Green Tree type Two version A"
  id 102096
  type foliage
  attrib: notarget noscar
  graphic Gt02a
  
  hp 10
  armor -1
end

 
 


begin "Large Group of tall grass like bushes used on flat ground only"
  id 102100
  type foliage
  attrib: notarget 
  graphic Gbush01
  
  hp 10
  armor -1
end

begin "Large Group of tall grass - colorized more green"
  id 102304
  type foliage
  attrib: notarget 
  graphic Gbush01A
  
  hp 10
  armor -1
end




begin "Large Wall Foliage, for placement right next to walls"
  id 102097
  type foliage
  graphic Wbush01
  
  hp 10
  armor -1
end

begin "Med Wall Foliage, for placement right next to walls"
  id 102098
  type foliage
  graphic Wbush02
  
  hp 10
  armor -1
end

begin "Small Wall Foliage, for placement right next to walls"
  id 102099
  type foliage
  graphic Wbush03
  
  hp 10
  armor -1
end

begin "Single desert palm"
  id 104372
  type foliage
  graphic Dp03
  ai_function tree
  hp 10
  armor -1
end

begin "Small Desert Tree"
  id 102085
  type foliage
  attrib: noscar
  graphic Dt01a
  
  hp 10
  armor -1
end

begin "Med Desert Tree"
  id 102086
  type foliage
  attrib: noscar  
  graphic Dt01b
  
  hp 10
  armor -1
end

begin "Large Desert Tree"
  id 102087
  type foliage
  attrib: noscar
  graphic Dt01c
  
  hp 10
  armor -1
end



begin  "Mfence1   8 ft. Section of chain link fence w"
  id 104313
  type decoration
  attrib: notarget
  graphic Mfence1
  hp 10
  armor -1
  ai_function gnrl
end

begin  "Bfence1   8 ft. Section of barbed wire fence w"
  id 102136
  type decoration
  attrib: notarget
  graphic Bfence1
  hp 10
  armor -1
  ai_function gnrl
end

begin  "Bfence2   8 ft. Section of barbed wire fence angled #1"
  id 102140
  type decoration
  attrib: notarget
  graphic Bfence2
  hp 10
  armor -1
  ai_function gnrl
end

begin  "Bfence3   8 ft. Section of barbed wire fence angled #2"
  id 102141
  type decoration
  attrib: notarget
  graphic Bfence3
  hp 10
  armor -1
  ai_function gnrl
end

begin  "Bfence1P   End pole for chain link fence"
  id 102137
  type decoration
  attrib: notarget
  graphic Bfence1P
  hp 10
  armor -1
  ai_function gnrl
end

begin "16 ft. Section of chain link fence w"
  id 104331
  type decoration
  attrib: notarget
  graphic Mfence2
  hp 10
  armor -1
  ai_function gnrl
end

begin "End pole for chain link fence"
  id 104314
  type decoration
  attrib: notarget
  graphic Mfencep1
  hp 10
  armor -1
  ai_function gnrl
end

begin "Gated entry section of chain link fence"
  id 104315
  type decoration
  attrib: notarget
  graphic Mfenceg1
  hp 10
  armor -1
  ai_function gnrl
end









begin "emplaced cannon for technicals"
  id 101882
  type object
  graphic EMcannon
  attrib: EWeap
  husk nullx
  HP 10
  armor -1
  ai_function ewep		
  move_function ewep
  render_function ewep
  disk_function EMPLACE
 primary_weapon WPN_EMcannon
end

begin "MK19 with bunker"
   id 101879
   type object
   attrib: notarget
   graphic EWepBnkr
   addeweap ewep01 101869
   hp 10
   armor -1
end

begin "Night Vision Goggles"
   id 101904
   type object
   attrib: notool
   graphic nvg
end

begin "Bunker with destroyable MK19"
   id 101890
   type object
   attrib: notarget
   graphic EWepBnkr
   addeweap ewep01 101886
   hp 10
   armor -1
end

begin "50cal on Tripod with bunker"
   id 101880
   type object
   attrib: notarget
   graphic EWepBnkr
   addeweap ewep01 101881
   hp 10
   armor -1
end

begin "Bunker with destroyable 50cal"
   id 101889
   type object
   attrib: notarget
   graphic EWepBnkr
   addeweap ewep01 101887
   hp 10
   armor -1
end

begin "3rd person flash bang"
   id 101875
   type object
   attrib: NoTool
   graphic Flsh_3rd
   move_function nade
   ai_function nade
end

begin "3rd person High explosive grenade"
   id 101883
   type object
   attrib: NoTool
   graphic Frag_3rd
   move_function nade
   ai_function nade
end


begin "Satchel Charge"
   id 101891
   type object
   attrib: NoTool
   hp 20
   graphic stch_3ad
   move_function schl
   ai_function schl
  disk_function EXPLOSV
end


begin "Claymore"
   id 101895
   type object
   attrib: NoTool
   hp 20
   graphic clym_3ad
   move_function clym
   ai_function clym
  disk_function EXPLOSV
end

begin "Claymore Friendly"
   id 102046
   type object
   attrib: NoTool
   hp 20
   graphic cly2_3ad
   move_function clym
   ai_function clym
  disk_function EXPLOSV
end


begin "All Un-marked Land Mine Section"
	id 101896
	type decoration
	attrib: notarget noshadow
	hp 20
	armor  -1 -1	
	graphic lndmine1
	huskfinal MStck01		
	husk MStck02			
    render_function lndm
    ai_function lndm
    ammo_closeattack    SMALLLANDMINE
    ammo_marker3        LARGELANDMINE
end

begin "All Marked Land Mine Section"
	id 101897
	type decoration
	attrib: notarget noshadow
	hp 20
	armor  -1 -1	
	graphic lndmine2
	huskfinal MStck01		
	husk MStck02			
    render_function lndm
    ai_function lndm
    ammo_closeattack    SMALLLANDMINE
    ammo_marker3        LARGELANDMINE
end

begin "Marked & Unmarked Land Mine Section3"
	id 101898
	type decoration
	attrib: notarget noshadow
	hp 20
	armor  -1 -1	
	graphic lndmine3
	huskfinal MStck01		
	husk MStck02			
    render_function lndm
    ai_function lndm
    ammo_closeattack    SMALLLANDMINE
    ammo_marker3        LARGELANDMINE
end

begin "Marked & Unmarked Land Mine Section4"
	id 101899
	type decoration
	attrib: notarget noshadow
	hp 20
	armor  -1 -1	
	graphic lndmine4
	huskfinal MStck01		
	husk MStck02			
    render_function lndm
    ai_function lndm
    ammo_closeattack    SMALLLANDMINE
    ammo_marker3        LARGELANDMINE
end


begin "Minigun for the Blackhawk"
  id 101871
  type object
  graphic Minigun
  attrib: EWeap
  husk nullx
  HP 10
  armor -1
  phrase_set	1		
  ai_function ewep		
  move_function ewep
  render_function ewep
  disk_function EMPLACE
 primary_weapon WPN_EMPLCDMINI
end


begin "Weak minigun"
  id 101903
  type object
  graphic Minigun
  attrib: EWeap notool
  husk nullx
  HP 10
  armor -1
  phrase_set	1		
  ai_function ewep		
  move_function ewep
  render_function ewep
  disk_function EMPLACE
 primary_weapon WPN_WEAKAIMINI
end



begin "S&D Destroyable Minigun"
  id 101888
  type object
  graphic MinigunD
  attrib: EWeap S&D
  husk MinigunX
  hp 999
  armor 999 -1
  phrase_set	1		
  ai_function ewep		
  move_function ewep
  render_function ewep
  disk_function EMPLACE
  primary_weapon WPN_EMPLCDMINI
end

begin "Armored Emplaced 50cal for Humvee "
  id 101876
  type object
  graphic EM50cal
  attrib: EWeap 
  husk nullx
  HP 10
  armor -1
  ai_function ewep		
  move_function ewep
  render_function ewep
  disk_function EMPLACE
  primary_weapon WPN_EMPLCD50
end

begin "NON-Armored Emplaced 50cal for Humvee "
  id 101892
  type object
  graphic H50cal
  attrib: EWeap 
  husk nullx
  HP 10
  armor -1
  ai_function ewep		
  move_function ewep
  render_function ewep
  disk_function EMPLACE
  primary_weapon WPN_EMPLCD50NA
end

begin "50 Cal Emplaced weapon on ETEK 1"
  id 101877
  type object
  graphic E50ETEK
  attrib: EWeap 
  husk nullx
  HP 10
  armor -1
  ai_function ewep		
  move_function ewep
  render_function ewep
  disk_function EMPLACE
  primary_weapon WPN_EMP50ETEK
end

begin "50 Cal Emplaced weapon on ETEK 2"
  id 101885
  type object
  graphic UG50cal
  attrib: EWeap 
  husk nullx
  HP 10
  armor -1
  ai_function ewep		
  move_function ewep
  render_function ewep
  disk_function EMPLACE
  primary_weapon WPN_UG50cal
end


begin "50cal on 360 tripod"
  id 101881
  type object
  graphic E50tripd
  attrib: EWeap 
  husk nullx
  HP 10
  armor -1
  ai_function ewep		
  move_function ewep
  render_function ewep
  disk_function EMPLACE
  primary_weapon WPN_EMP50TRI
end

begin "50cal on 180 tripod"
  id 101902
  type object
  graphic E50tripd
  attrib: EWeap 
  husk nullx
  HP 10
  armor -1
  ai_function ewep		
  move_function ewep
  render_function ewep
  disk_function EMPLACE
  primary_weapon WPN_EMP50TRI180
end


begin "S&D Destroyable 50cal on tripod"
  id 101887
  type object
  graphic E50triD
  attrib: EWeap S&D 
  husk E50triX
  hp 999
  armor 999 -1
  ai_function ewep		
  move_function ewep
  render_function ewep
  disk_function EMPLACE
  primary_weapon WPN_EMP50TRI
end

begin "Emplaced weapon on tripod DESTROYABLE"
  id 101901
  type object
  graphic E50triB
  attrib: EWeap S&D 
  husk E50triX
  hp 999
  armor 999 -1
  ai_function ewep		
  move_function ewep
  render_function ewep
  disk_function EMPLACE
  primary_weapon WPN_EMP50TRI
end


begin "grenade round for OICW"
   id 101874
   type object
   attrib: AIData NoTool
   graphic OICWnade
end

begin "RPG"
   id 101873
   type object
   attrib: AIData NoTool
   graphic RPG
   ai_function rokt
   move_function rokt
end


begin "Guided RPG"
   id 101906
   type object
   attrib: AIData NoTool
   graphic RPG
   ai_function stng
   move_function stng
end

begin "Mounted Grenade Launcher on Tripod"
  id 101869
  type object
  graphic MK19
   attrib: EWeap
  husk nullx
  HP 10
  armor -1
  ai_function ewep		
  move_function ewep
  render_function ewep
  disk_function EMPLACE
  primary_weapon WPN_EMPLCDGRND
end



Begin "S&D Destroyable Grenade Launcher"
  id 101886
  type object
  graphic MK19D
  attrib: EWeap S&D
  husk Mk19X
  hp 999
  armor 999 -1
  ai_function ewep		
  move_function ewep
  render_function ewep
  disk_function EMPLACE
  primary_weapon WPN_EMPLCDGRND
end

begin "Mortar"
  id 101868
  graphic Mortar
  type object
  Husk Mortarx
  hp 999
  armor 999 -1
  ai_function gnrc		
  move_function upfx
  
  
  
  husk_sub_part_types 01_HULL 02_CHUNKNP_L 03_CHUNKNP_m 04_CHUNKNP_m 05_CHUNKNP_m 06_CHUNKNP_m 07_CHUNKNP_m 08_CHUNKNP_m
end 







begin "Mk19amo"
   id 101870
   type object
   attrib: AIData NoTool
   graphic Mk19amo
end

begin "Rocket"
   id 104502
   type object
   attrib: AIData NoTool
   graphic rocket
   ai_function rokt
   move_function rokt
end


 


begin "MuzzleFlash"
   id 104402
   type object
   attrib: NoTool
   graphic m_flsh01
end

begin "MuzzleFlashSmall"
   id 104403
   type object
   attrib: NoTool
   graphic m_flsh02
end

begin "Rock for throwing"
   id 101905
   type object
   graphic bstone
   attrib: NoTool
   move_function rock
   ai_function nade
end

begin "Red colored tracer"
   id 104405
   type object
   attrib: NoTool
   graphic tracer1r
   render_function trcr
end

begin "Green colored tracer"
   id 104406
   type object
   attrib: NoTool
   graphic tracer1g
   render_function trcr
end

begin "Flare gflr"
   id 104409
   type object
   attrib: NoTool
   heatsig  2000
   radarsig 0
   ai_function gflr
   move_function gflr
end

begin "Flare Aflr"
   id 104408
   type object
   attrib: NoTool
   heatsig  2000
   radarsig 0
   ai_function aflr
   move_function aflr
end


begin "Stinger"
  id 104504
   type object
   attrib: AIData NoTool
   graphic stinger
  ai_function stng
   move_function stng
end




 

 begin "Flag, blue"
  id 104091
  type object
  attrib: aidata movecb good
  graphic flagblu
  ai_function flag
end  

begin "Flag, red"
  id 104093
  type object
  attrib: aidata movecb evil
  graphic flagred
  ai_function flag
end  

begin "Flag, green"
  id 104095
  type object
  attrib: aidata movecb
  graphic flaggrn
  ai_function flag
end  



begin "Flag bay, blue"
  id 104098
  type object
  attrib: movecb good
  graphic bsflgblu
end  

begin "Flag bay, red"
  id 104100
  type object
  attrib: movecb evil
  graphic bsflgred
end  


begin "Flag bay, violet"
  id 104102
  type object
  attrib: movecb good 4Team notool
  graphic bsflgvlt
end  

begin "Flag bay, yellow"
  id 104103
  type object
  attrib: movecb evil 4Team notool
  graphic bsflgyel
end  

begin "CTflag Change Team Flag (PSP)"
  id 101884
  type object
  attrib: SpawnPoint ChangeTeam
  graphic CTflag
end  

begin "Target Object"		
	id 101900
	type object
	heatsig  1000
	radarsig 1300
	hp 6000
	armor 3000 3000
end




begin "Ranger, Main Player character"
  id 105302
  type person
  unit_type 9
  graphic PRanger 
  anim_def Delta01
  attrib: aidata fo notool pfoil
  hp 100
  radarsig 300
  mana 0
  ai_function plyr
  disk_function PLAYER
  phrase_set 0
  move_function org2
  input_function troop
  sounddeath	DEATH_DELTA1
  SSNightDead 	DEATH_K_PLAYER	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R	
  SSAudio2		FS_DIRT_R	
  SSAudio3		FSP_LADDER
  SSAudio4		FS_SWIM		
  SSAudio5		FSP_PRONE	
  SSAudio6		FSP_PRONE_ROLL
end

begin "10th Mountain, Main Player character"
  id 105303
  type person 
  unit_type 9
  graphic P10thMTN 
  anim_def Delta01
  attrib: aidata fo notool pfoil
  hp 100
  radarsig 300
  mana 0
  ai_function plyr
  disk_function PLAYER
  phrase_set 0
  move_function org2
  input_function troop
  sounddeath	DEATH_DELTA1
  SSNightDead	DEATH_K_PLAYER	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R	
  SSAudio2		FS_DIRT_R	
  SSAudio3		FSP_LADDER	
  SSAudio4		FS_SWIM		
  SSAudio5		FSP_PRONE	
  SSAudio6		FSP_PRONE_ROLL
end

begin "Ranger Cinematic"
  id 105307
  type person
  unit_type 9
  graphic Ranger01
  anim_def RngrCin
  attrib: good aidata nodismember
  deathtime	30
  hp 450
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 42
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_DELTA1
  SSNightDead 	DEATH_K_PLAYER	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM 
  SSAudio5		GF_M16_RL	
  SSAudio6		FS_OBJ_R
  ammo_closeattack    AI_M16
  ammo_easyrocket     AI_M16		
  ammo_advancedrocket AI_CLOSEKZ	
  ammo_marker3        AI_M16
  launchups_closeattack		mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Delta Force Cinematic"
  id 105306
  type person 
  unit_type 9
  graphic Delta01
  anim_def DeltaCin
  attrib: good aidata nodismember
  deathtime	30
  hp 450
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 42
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_DELTA1
  SSNightDead 	DEATH_K_PLAYER	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM 
  SSAudio5		GF_CAR15_RL		
  SSAudio6		FS_OBJ_R
  ammo_closeattack    AI_CAR15
  ammo_easyrocket     AI_CAR15 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3        AI_CAR15
  launchups_closeattack		mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Large African Crocodile"
  id 101550
  type person 
  graphic croc
  anim_def croc
  attrib: evil aidata nodismember landable NoWeapon		
  deathtime	30
  hp 30
  ai_function org1
  disk_function ORGANIC
  phrase_set 2
  move_function org1
  score 10
  heatsig  300
  radarsig 300
  sounddeath	DEATH_CROCO
  SSNightDead 	DEATH_CROCO		
  SSLFootGND	FS_CROCD_L		
  SSRFootGND	FS_CROCD_R		
  SSLFootOBJ	FS_CROCD_L
  SSRFootOBJ	FS_CROCD_R
  SSFootWater	FS_WATER
  ammo_closeattack    Croc
  ammo_easyrocket     Croc

  
  fire_timer	5
  max_attack_dist	4
  min_engagement_dist 3
  max_engagement_dist 30
end


begin "Enemy Somalian Prisoner1"
  id 101705
  type person 
  graphic ESomalP1
  anim_def ESomalP1
  attrib: evil aidata nodismember NoWeapon
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 500
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 30
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_SOM_CIVB  
  SSNightDead 	DEATH_K_SOM_C	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Enemy Somalian Prisoner2"
  id 101706
  type person 
  graphic ESomalP2
  anim_def ESomalP2
  attrib: evil aidata nodismember NoWeapon
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 500
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 30
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_SOMALI2
  SSNightDead 	DEATH_K_SOM_A	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end


begin "Enemy Somalian Prisoner3"
  id 101707
  type person 
  graphic ESomalP3
  anim_def ESomalP3
  attrib: evil aidata nodismember NoWeapon
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 200
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 30
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_SOM_CIVC
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Enemy Somalian Prisoner4"
  id 101708
  type person 
  graphic ESomalP4 
  anim_def ESomalP4
  attrib: evil aidata nodismember NoWeapon
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 200
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 30
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9 
  sounddeath	DEATH_SOMALI1
  SSNightDead 	DEATH_K_SOM_A	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Somalian Informant"
  id 101709
  type person
  graphic Informnt
  anim_def Informnt
  attrib: good aidata nodismember NoWeapon
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 300
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 29
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_SOM_B 
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Enemy Somalian Soldier with AK47"
  id 101696
  type person 
  graphic ESomal01 
  anim_def ESomal01
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_SOMALI1
  SSNightDead 	DEATH_K_SOM_A	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_ESOMALI_A	
  clipsize 15
  ammo_closeattack    AI_AK47b
  ammo_easyrocket     AI_AK47b 
  ammo_marker3    AI_AK47b
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Enemy Somalian Soldier with AK47"
  id 101697
  type person 
  graphic ESomal02 
  anim_def ESomal02
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_SOMALI2
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_ESOMALI_B	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Columbian Smuggler 1"
  id 106237
  type person 
  graphic SMGL1 
  anim_def ESomal01
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_COLOM1
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_COLA_MAD1	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Columbian Smuggler 2"
  id 106238
  type person 
  graphic SMGL2 
  anim_def ESomal02
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_COLOM2
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_COLA_MAD2	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Columbian Smuggler 3"
  id 106239
  type person 
  graphic SMGL3
  anim_def ESomal01
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_COLOM3
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_COLG_MAD1	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Columbian Smuggler 4"
  id 106240
  type person 
  graphic SMGL4 
  anim_def ESomal02
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_COLOM1
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_COLG_MAD2	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Iranian Armed Civilian"
  id 106279
  type person 
  graphic IRAC 
  anim_def ESomal02
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_IRAN1
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_IOLA_MAD1	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Iranian Armed Civilian 2"
  id 106353
  type person 
  graphic IRAC02 
  anim_def ESomal02
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_IRANM1
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_IOLA_MAD1	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Iranian Armed Civilian 3"
  id 106354
  type person 
  graphic IRAC03 
  anim_def ESomal02
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_IRANM2
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_IOLA_MAD2	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Columbian Guerilla 1"
  id 106241
  type person 
  graphic GUER1
  anim_def ESomal01
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_COLOM1
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_COLA_MAD1	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Columbian Guerilla 2 w"
  id 106242
  type person 
  graphic GUER2
  anim_def ESomal03
  attrib: evil aidata nodismember missile NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_COLOM2
  SSNightDead 	DEATH_K_SOM_A		
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
   SSAudio6		VX_COLA_MAD2	
  clipsize 1
  ammo_closeattack    AI_AK47b
  ammo_easyrocket     AI_RPG
  ammo_marker3    AI_RPG
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Columbian Guerilla 3"
  id 106243
  type person 
  graphic GUER3 
  anim_def ESomal02
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_COLOM3
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_COLG_MAD1	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Columbian Guerilla 4"
  id 106246
  type person 
  graphic GUER4 
  anim_def ESomal02
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_COLOM1
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_COLG_MAD2	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Columbian Guerilla 5"
  id 106356
  type person 
  graphic GUER5 
  anim_def ESomal02
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_COLOM3
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_COLG_MAD2	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Columbian BodyGuard 1"
  id 106247
  type person 
  graphic BGRD1
  anim_def ESomal01
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_COLOM1
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_COLA_MAD1	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Columbian BodyGuard 2 w"
  id 106248
  type person 
  graphic BGRD2
  anim_def ESomal03
  attrib: evil aidata nodismember missile NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_COLOM2
  SSNightDead 	DEATH_K_SOM_A		
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_COLA_MAD2	
  clipsize 1
  ammo_closeattack    AI_AK47b
  ammo_easyrocket     AI_RPG
  ammo_marker3    AI_RPG
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Columbian BodyGuard 3"
  id 106249
  type person 
  graphic BGRD3
  anim_def ESomal01
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_COLOM3
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_COLG_MAD1	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Iranian Rebel Suicide Troop 1"
  id 106261
  type person 
  graphic IRST1
  anim_def ESomal01
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_IRANM1
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_IOLA_MAD1	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Iranian Rebel Suicide Troop 2"
  id 106262
  type person 
  graphic IRST2
  anim_def ESomal02
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_IRANM2
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_IOLA_MAD2	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Iranian Rebel Suicide Troop 3 w"
  id 106270
  type person 
  graphic IRST3
  anim_def ESomal03
  attrib: evil aidata nodismember missile NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_IRANM3
  SSNightDead 	DEATH_K_SOM_A		
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_IOLG_MAD1	
  clipsize 1
  ammo_closeattack    AI_AK47b
  ammo_easyrocket     AI_RPG
  ammo_marker3    AI_RPG
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Iranian Rebel Regular 1"
  id 106267
  type person 
  graphic IRRR1
  anim_def ESomal01
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_IRANM1
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_IOLA_MAD1	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Iranian Rebel Regular 2"
  id 106268
  type person 
  graphic IRRR2
  anim_def ESomal02
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_IRANM2
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_IOLA_MAD2	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Iranian Rebel Regular 3"
  id 106269
  type person 
  graphic IRRR3
  anim_def ESomal01
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_IRANM3
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_IOLG_MAD1	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Iranian Rebel Regular 4 w"
  id 106271
  type person 
  graphic IRRR4
  anim_def ESomal03
  attrib: evil aidata nodismember missile NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_IRANM!
  SSNightDead 	DEATH_K_SOM_A		
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_IOLG_MAD2	
  clipsize 1
  ammo_closeattack    AI_AK47b
  ammo_easyrocket     AI_RPG
  ammo_marker3    AI_RPG
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Iranian Rebel Leader"
  id 106266
  type person
  unit_type 9
  graphic IRLDR
  anim_def Aidid
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 36
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_IRANM1
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1	
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      	FS_SWIM		
  SSAudio5		GF_AK_RL	
  SSAudio6		FS_OBJ_R
  ammo_closeattack    AI_AK47b
  ammo_easyrocket     AI_AK47b 		
  ammo_marker3    AI_AK47b
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Enemy Somalian Soldier with RPG"
  id 101698
  type person 
  graphic ESomal03
  anim_def ESomal03
  attrib: evil aidata nodismember missile NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_SOM_A
  SSNightDead 	DEATH_K_SOM_A		
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_ESOMALI_A	
  clipsize 1
  ammo_closeattack    AI_AK47b
  ammo_easyrocket     AI_RPG
  ammo_marker3    AI_RPG
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Enemy Somalian Soldier with Guided RPG"
  id 101778
  type person 
  graphic ESomal03
  anim_def ESomal03
  attrib: evil aidata nodismember missile NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_SOM_A
  SSNightDead 	DEATH_K_SOM_A		
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_ESOMALI_A	
  clipsize 1
  ammo_closeattack    AI_AK47b
  ammo_easyrocket     AI_GRPG
  ammo_marker3    AI_GRPG
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Iranian Suicide Trooper with Guided RPG"
  id 106305
  type person 
  graphic IRST3
  anim_def ESomal03
  attrib: evil aidata nodismember missile NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_SOM_A
  SSNightDead 	DEATH_K_SOM_A		
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_ESOMALI_A	
  clipsize 1
  ammo_closeattack    AI_AK47b
  ammo_easyrocket     AI_GRPG
  ammo_marker3    AI_GRPG
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end


begin "Enemy Somalian Malitia Member4"
  id 101699
  type person 
  graphic ESomal04 
  anim_def ESomal04
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_SOM_B
  SSNightDead 	DEATH_K_SOM_B		
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_ESOMALI_B	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "USE FOR ROOFTOPS ONLY"
  id 101755
  type person 
  graphic ESomal04 
  anim_def Erooftop
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_SOM_B
  SSNightDead 	DEATH_K_SOM_B		
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_ESOMALI_A	
  clipsize 15
  ammo_closeattack    AI_AK47b
  ammo_easyrocket     AI_AK47b 
  ammo_marker3    AI_AK47b
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "USE FOR ROOFTOPS ONLY"
  id 101756
  type person 
  graphic ESomal05 
  anim_def Erooftop
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_SOM_B
  SSNightDead 	DEATH_K_SOM_B		
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_ESOMALI_B	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "USE FOR ROOFTOPS ONLY"
  id 101757
  type person 
  graphic ESomal06 
  anim_def Erooftop
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  unit_type 9
  sounddeath	DEATH_SOM_B
  SSNightDead 	DEATH_K_SOM_B		
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_ESOMALI_A	
  clipsize 15
  ammo_closeattack    AI_AK47b
  ammo_easyrocket     AI_AK47b 
  ammo_marker3    AI_AK47b
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Enemy Somalian Malitia Member5"
  id 101700
  type person 
  unit_type 9
  graphic ESomal05 
  anim_def ESomal05
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOM_C
  SSNightDead 	DEATH_K_SOM_C		
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_ESOMALI_B	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Enemy Somalian Malitia Member6"
  id 101701
  type person 
  unit_type 9
  graphic ESomal06 
  anim_def ESomal06
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI3
  SSNightDead 	DEATH_K_SOM_A	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_ESOMALI_A	
  clipsize 15
  ammo_closeattack    AI_AK47b
  ammo_easyrocket     AI_AK47b 
  ammo_marker3    AI_AK47b
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Enemy Somalian Malitia Member7"
  id 101702
  type person
  unit_type 9
  graphic ESomal07 
  anim_def ESomal07
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI1
  SSNightDead 	DEATH_K_SOM_A	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_ESOMALI_B	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Enemy Somalian Malitia Member8"
  id 101703
  type person
  unit_type 9
  graphic ESomal08
  anim_def ESomal08
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOM_B
  SSNightDead 	DEATH_K_SOM_B		
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_ESOMALI_A	
  clipsize 15
  ammo_closeattack    AI_AK47b
  ammo_easyrocket     AI_AK47b 
  ammo_marker3    AI_AK47b
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Enemy Somalian Malitia Member9"
  id 101704
  type person
  unit_type 9
  graphic ESomal09
  anim_def ESomal09
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      	FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_ESOMALI_B	
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "USE ONLY ON ROOFTOPS"
  id 101716
  type person
  unit_type 9
  graphic ESomal09
  anim_def Erooftop
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOM_C
  SSNightDead 	DEATH_K_SOM_C		
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      	FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		FS_OBJ_R
  clipsize 15
  ammo_closeattack    AI_AK47b
  ammo_easyrocket     AI_AK47b 
  ammo_marker3    AI_AK47b
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Pakistani soldier #1"
  id 101710
  type person
  unit_type 9
  graphic PakSldr1 
  anim_def PakSldr1
  attrib: good aidata nodismember NoWeapon
  deathtime	120
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 200
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 31
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	AI_DEATH_1
  SSNightDead 	DEATH_K_TEAM_A		
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4		FS_SWIM
  SSAudio5		GF_AK_RL	
  SSAudio6		FS_OBJ_R
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Civilian Woman Somalian #4"
  id 101762
  type person
  unit_type 9
  graphic CSomalF4
  anim_def CSomalF1
  attrib: good aidata nodismember NoWeapon NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 15
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOM_F_A
  SSNightDead 	DEATH_K_SOM_F	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_SOFC_MAD1	
end

begin "Civilian Woman Colombian #1"
  id 106186
  type person
  unit_type 9
  graphic chosf1
  anim_def ESOMALP2
  attrib: good aidata nodismember NoWeapon NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 15
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_COLOF1
  SSNightDead 	DEATH_K_SOM_F	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_COFC_MAD1	
end

begin "Civilian Woman Colombian #2 - not hostage stance"
  id 106358
  type person
  unit_type 9
  graphic chosf1
  anim_def CSomalF1
  attrib: good aidata nodismember NoWeapon NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 15
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_COLOF2
  SSNightDead 	DEATH_K_SOM_F	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_COFC_MAD2	
end

begin "Iranian Civilian Woman"
  id 106258
  type person
  unit_type 9
  graphic ICIVW
  anim_def CSomalF1
  attrib: good aidata nodismember NoWeapon NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 15
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_IRANF1
  SSNightDead 	DEATH_K_SOM_F	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_IOFC_MAD1	
end

begin "Civilian Woman Somalian #3"
  id 101761
  type person
  unit_type 9
  graphic CSomalF3 
  anim_def CSomalF2
  attrib: good aidata nodismember NoWeapon NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 15
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOM_F_A
  SSNightDead 	DEATH_K_SOM_F	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_SOFC_MAD2	
end

begin "Civilian Woman Somalian #2"
  id 101661
  type person
  unit_type 9
  graphic CSomalF2 
  anim_def CSomalF2
  attrib: good aidata nodismember NoWeapon NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 15
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOM_F_A
  SSNightDead 	DEATH_K_SOM_F	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_SOFC_MAD1	
  ammo_closeattack    AI_Rock
  ammo_easyrocket     AI_Rock
  ammo_marker3        AI_Rock
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Civilian Woman Somalian #1"
  id 101660
  type person
  unit_type 9
  graphic CSomalF1 
  anim_def CSomalF1
  attrib: good aidata nodismember NoWeapon NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 15
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOM_F_B
  SSNightDead 	DEATH_K_SOM_F	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_SOFC_MAD2	
  ammo_closeattack    AI_Rock
  ammo_easyrocket     AI_Rock
  ammo_marker3        AI_Rock
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Civilian Man Somalian #2"
  id 101659
  type person
  unit_type 9
  graphic Csomal02 
  anim_def Csomal02
  attrib: good aidata nodismember NoWeapon NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 16
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOM_CIVC	
  SSNightDead 	DEATH_K_SOM_C	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_SOLG_MAD1	
  ammo_closeattack    AI_Rock
  ammo_easyrocket     AI_Rock
  ammo_marker3        AI_Rock
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Civilian Man Somalian #1"
  id 101658
  type person
  unit_type 9
  graphic Csomal01 
  anim_def Csomal01
  attrib: good aidata nodismember NoWeapon NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 16
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOM_CIVA  
  SSNightDead 	DEATH_K_SOM_A	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_SOLG_MAD2	
  ammo_closeattack    AI_Rock
  ammo_easyrocket     AI_Rock
  ammo_marker3        AI_Rock
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Civilian Man Colombian #1"
  id 106199
  type person
  unit_type 9
  graphic CHOSM1 
  anim_def ESOMALP2
  attrib: good aidata nodismember NoWeapon NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 16
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_COLOM1  
  SSNightDead 	DEATH_K_SOM_A	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_COLA_MAD1	
  ammo_closeattack    AI_Rock
  ammo_easyrocket     AI_Rock
  ammo_marker3        AI_Rock
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Civilian Man Colombian #2 - not hostage stance"
  id 106357
  type person
  unit_type 9
  graphic CHOSM1 
  anim_def Csomal01
  attrib: good aidata nodismember NoWeapon NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 16
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_COLOM2  
  SSNightDead 	DEATH_K_SOM_A	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_COLA_MAD2	
  ammo_closeattack    AI_Rock
  ammo_easyrocket     AI_Rock
  ammo_marker3        AI_Rock
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Iranian Oilworker #1"
  id 106203
  type person
  unit_type 9
  graphic IRWRK1 
  anim_def ESomalP2
  attrib: good aidata nodismember NoWeapon NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 16
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_IRANM2
  SSNightDead 	DEATH_K_SOM_A	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_COLA2	
  ammo_closeattack    AI_Rock
  ammo_easyrocket     AI_Rock
  ammo_marker3        AI_Rock
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Iranian Oilworker #2"
  id 106204
  type person
  unit_type 9
  graphic IRWRK2 
  anim_def ESomalP3
  attrib: good aidata nodismember NoWeapon NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 16
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_IRANM1
  SSNightDead 	DEATH_K_SOM_A	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_IOLA_MAD1	
  ammo_closeattack    AI_Rock
  ammo_easyrocket     AI_Rock
  ammo_marker3        AI_Rock
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Civilian Dummy"
  id 101776
  type person
  unit_type 9
  graphic Csomtest 
  anim_def Csomal01
  attrib: good aidata nodismember NoWeapon NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 16
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOM_CIVA  
  SSNightDead 	DEATH_K_SOM_A	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_SOLG_MAD2	
end


begin "Civilian Man Somalian w"
  id 101767
  type person
  unit_type 9
  graphic CsomalT1 
  anim_def CsomalT1
  attrib: good aidata nodismember NoWeapon NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 16
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOM_CIVA 
  SSNightDead 	DEATH_K_SOM_A	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_SOLA_MAD1	
end

begin "Civilian Man Somalian w"
  id 101768
  type person
  unit_type 9
  graphic CsomalT2
  anim_def CsomalT2
  attrib: good aidata nodismember NoWeapon NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 16
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOM_CIVB  
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_SOLA_MAD2	
end


begin "Enemy Somalian that sleeps #1"
  id 101769
  type person
  unit_type 9
  graphic Esomal05
  anim_def CsomSL01
   attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOM_C
  SSNightDead 	DEATH_K_SOM_C		
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		FS_OBJ_R
  clipsize 15
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Enemy Somalian that sleeps #2"
  id 101770
  type person
  unit_type 9
  graphic Esomal06
  anim_def CsomSL02
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 33
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI3
  SSNightDead 	DEATH_K_SOM_C	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		FS_OBJ_R
  clipsize 15
  ammo_closeattack    AI_AK47b
  ammo_easyrocket     AI_AK47b 
  ammo_marker3    AI_AK47b
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Osman Atto"
  id 101657
  type person
  unit_type 9
  graphic Atto
  anim_def Atto
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 37
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Colombian Drug Lord"
  id 106212
  type person
  unit_type 9
  graphic CDRUG
  anim_def Aidid
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 36
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1	
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      	FS_SWIM		
  SSAudio5		GF_AK_RL	
  SSAudio6		FS_OBJ_R
  ammo_closeattack    AI_AK47b
  ammo_easyrocket     AI_AK47b 		
  ammo_marker3    AI_AK47b
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Colombian Drug Lord 2"
  id 106230
  type person
  unit_type 9
  graphic CDRNG
  anim_def Aidid
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 36
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1	
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      	FS_SWIM		
  SSAudio5		GF_AK_RL	
  SSAudio6		FS_OBJ_R
  ammo_closeattack    AI_AK47b
  ammo_easyrocket     AI_AK47b 		
  ammo_marker3    AI_AK47b
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Somalian Warlord"
  id 101656
  type person
  unit_type 9
  graphic Aidid
  anim_def Aidid
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 36
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		FS_OBJ_R
  ammo_closeattack    AI_AK47b
  ammo_easyrocket     AI_AK47b 
  ammo_marker3    AI_AK47b
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Government officialA"
  id 101655
  type person
  unit_type 9
  graphic ETier1A
  anim_def ETier1A
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 35
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Government officialA Normal walk"
  id 101758
  type person
  unit_type 9
  graphic ETier1A
  anim_def ETier1AX
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 35
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead 	DEATH_K_SOM_A	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end


begin "Government officialA Surrender"
  id 101773
  type person
  unit_type 9
  graphic ETier1A
  anim_def ETier1AS
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 35
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Government officialA Flashbang"
  id 101782
  type person
  unit_type 9
  graphic ETier1A
  anim_def ETier1AF
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 35
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end


begin "Pakistani soldier #2"
  id 101654
  type person
  unit_type 9
  graphic PakSldr2 
  anim_def PakSldr2
  attrib: good aidata nodismember NoWeapon
  deathtime	120
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 200
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 31
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	AI_DEATH_1
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4		FS_SWIM
  SSAudio5		GF_AK_RL	
  SSAudio6		FS_OBJ_R
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_AK47a 
  ammo_marker3    AI_AK47a
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Pakistani soldier #3"
  id 103800
  type person
  unit_type 9
  graphic PakSldr3 
  anim_def PakSldr3
  attrib: good aidata nodismember NoWeapon
  deathtime	120
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 200
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 32
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	AI_DEATH_1
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4		FS_SWIM
  SSAudio5		GF_AK_RL	
  SSAudio6		FS_OBJ_R
  ammo_closeattack    AI_AK47b
  ammo_easyrocket     AI_AK47b 
  ammo_marker3    AI_AK47b
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Civilian Merchant #2"
  id 101653
  type person
  unit_type 9
  graphic Cmrch02 
  anim_def Cmrch02
  attrib: good aidata nodismember NoWeapon
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 10
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOM_CIVC 
  SSNightDead 	DEATH_K_SOM_C	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_SOLG_MAD1	
end


begin "Civilian Merchant #1"
  id 101652
  type person
  unit_type 9
  graphic Cmrch01 
  anim_def Cmrch01
  attrib: good aidata nodismember NoWeapon
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 9
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOM_CIVB  
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_SOLA_MAD2	
end

begin "Male Somalian Civilian"
  id 101711
  type person
  unit_type 9
  graphic Csomal01 
  anim_def Csomal01
  attrib: good aidata leavecorpse nodismember NoWeapon NoMoveShoot
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 17
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOM_CIVB 
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_SOLA_MAD1	
  ammo_closeattack    AI_AK47a
  ammo_easyrocket     AI_LAW
  ammo_marker3    AI_AK47a
end

begin "Male Somalian Civilian"
  id 101712
  type person
  unit_type 9
  graphic Csomal02 
  anim_def Csomal02
  attrib: good aidata leavecorpse nodismember NoWeapon NoMoveShoot
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 17
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOM_CIVA 
  SSNightDead 	DEATH_K_SOM_A	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM
  SSAudio5		GF_AK_RL	
  SSAudio6		VX_SOLA_MAD2	
  ammo_closeattack    AI_Rock
  ammo_easyrocket     AI_Rock
  ammo_marker3        AI_Rock
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Delta Force, Main Player character"
  id 105300
  type person
  unit_type 9
  graphic Delta01 
  anim_def Delta01
  attrib: aidata fo notool pfoil
  hp 100
  radarsig 300
  mana 0
  ai_function plyr
  disk_function PLAYER
  phrase_set 0
  move_function org2
  input_function troop
  sounddeath	DEATH_DELTA2
  SSNightDead 	DEATH_K_PLAYER	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R	
  SSAudio2		FS_DIRT_R	
  SSAudio3		FSP_LADDER
  SSAudio4		FS_SWIM		
  SSAudio5		FSP_PRONE		
  SSAudio6		FSP_PRONE_ROLL	
end

begin "Delta Force TS SP, Main Player character"
  id 106361
  type person
  unit_type 9
  graphic CDLT06
  anim_def Delta01
  attrib: aidata fo notool pfoil
  hp 100
  radarsig 300
  mana 0
  ai_function plyr
  disk_function PLAYER
  phrase_set 0
  move_function org2
  input_function troop
  sounddeath	DEATH_DELTA2
  SSNightDead 	DEATH_K_PLAYER	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R	
  SSAudio2		FS_DIRT_R	
  SSAudio3		FSP_LADDER
  SSAudio4		FS_SWIM		
  SSAudio5		FSP_PRONE		
  SSAudio6		FSP_PRONE_ROLL	
end

begin "Team Sabre SAS SP, Main Player character"
  id 106364
  type person
  unit_type 9
  graphic SAS3
  anim_def Delta01
  attrib: aidata fo notool pfoil
  hp 100
  radarsig 300
  mana 0
  ai_function plyr
  disk_function PLAYER
  phrase_set 0
  move_function org2
  input_function troop
  sounddeath	DEATH_DELTA2
  SSNightDead 	DEATH_K_PLAYER	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R	
  SSAudio2		FS_DIRT_R	
  SSAudio3		FSP_LADDER
  SSAudio4		FS_SWIM		
  SSAudio5		FSP_PRONE		
  SSAudio6		FSP_PRONE_ROLL	
end

begin "Delta Force Teammate 2"
  id 101744
  type person
  unit_type 9
  graphic Delta02
  anim_def Delta_TM
  attrib: good aidata nodismember
  deathtime	30
  clipsize 30
  hp 450
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 42
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_DELTA1
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM
  SSAudio5		GF_CAR15_RL		
  SSAudio6		GF_NADE_THRWAI	
  ammo_closeattack    grenadefb			
  ammo_easyrocket     AI_CAR15 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3    GRENADEHE				
  launchups_closeattack	gflash01		
  launchups_rocket		mflash01
  launchups_marker3		gflash01		

   
  fire_timer	10
  max_attack_dist	200
  min_engagement_dist 200
  max_engagement_dist 200
end

begin "Special Operations Pilot"
  id 106310
  type person
  unit_type 9
  graphic OPSPLT
  anim_def Delta_TM
  attrib: good aidata nodismember
  deathtime	30
  clipsize 30
  hp 450
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 42
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_DELTA1
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM
  SSAudio5		GF_CAR15_RL		
  SSAudio6		GF_NADE_THRWAI	
  ammo_closeattack    grenadefb			
  ammo_easyrocket     AI_CAR15 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3    GRENADEHE				
  launchups_closeattack	gflash01		
  launchups_rocket		mflash01
  launchups_marker3		gflash01		

   
  fire_timer	10
  max_attack_dist	200
  min_engagement_dist 200
  max_engagement_dist 200
end

begin "Team Sabre Teammate 1"
  id 106200
  type person
  unit_type 9
  graphic CDLT01
  anim_def Delta_TM
  attrib: good aidata nodismember
  deathtime	30
  clipsize 30
  hp 450
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 42
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_DELTA1
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM
  SSAudio5		GF_CAR15_RL		
  SSAudio6		GF_NADE_THRWAI	
  ammo_closeattack    grenadefb			
  ammo_easyrocket     AI_CAR15 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3    GRENADEHE				
  launchups_closeattack	gflash01		
  launchups_rocket		mflash01
  launchups_marker3		gflash01		

   
  fire_timer	10
  max_attack_dist	200
  min_engagement_dist 200
  max_engagement_dist 200
end

begin "Team Sabre Teammate 2"
  id 106201
  type person
  unit_type 9
  graphic CDLT02
  anim_def Delta_TM
  attrib: good aidata nodismember
  deathtime	30
  clipsize 30
  hp 450
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 42
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_DELTA1
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM
  SSAudio5		GF_CAR15_RL		
  SSAudio6		GF_NADE_THRWAI	
  ammo_closeattack    grenadefb			
  ammo_easyrocket     AI_CAR15 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3    GRENADEHE				
  launchups_closeattack	gflash01		
  launchups_rocket		mflash01
  launchups_marker3		gflash01		

   
  fire_timer	10
  max_attack_dist	200
  min_engagement_dist 200
  max_engagement_dist 200
end

begin "Team Sabre Teammate 3"
  id 106202
  type person
  unit_type 9
  graphic CDLT03
  anim_def Delta_TM
  attrib: good aidata nodismember
  deathtime	30
  clipsize 30
  hp 450
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 42
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_DELTA1
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM
  SSAudio5		GF_CAR15_RL		
  SSAudio6		GF_NADE_THRWAI	
  ammo_closeattack    grenadefb			
  ammo_easyrocket     AI_CAR15 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3    GRENADEHE				
  launchups_closeattack	gflash01		
  launchups_rocket		mflash01
  launchups_marker3		gflash01		

   
  fire_timer	10
  max_attack_dist	200
  min_engagement_dist 200
  max_engagement_dist 200
end

begin "Team Sabre Teammate 4 Boonie Hat"
  id 106217
  type person
  unit_type 9
  graphic CDLT04
  anim_def Delta_TM
  attrib: good aidata nodismember
  deathtime	30
  clipsize 30
  hp 450
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 42
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_DELTA1
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM
  SSAudio5		GF_CAR15_RL		
  SSAudio6		GF_NADE_THRWAI	
  ammo_closeattack    grenadefb			
  ammo_easyrocket     AI_CAR15 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3    GRENADEHE				
  launchups_closeattack	gflash01		
  launchups_rocket		mflash01
  launchups_marker3		gflash01		

   
  fire_timer	10
  max_attack_dist	200
  min_engagement_dist 200
  max_engagement_dist 200
end

begin "Team Sabre Teammate 5 Do Rag"
  id 106218
  type person
  unit_type 9
  graphic CDLT05
  anim_def Delta_TM
  attrib: good aidata nodismember
  deathtime	30
  clipsize 30
  hp 450
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 42
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_DELTA1
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM
  SSAudio5		GF_CAR15_RL		
  SSAudio6		GF_NADE_THRWAI	
  ammo_closeattack    grenadefb			
  ammo_easyrocket     AI_CAR15 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3    GRENADEHE				
  launchups_closeattack	gflash01		
  launchups_rocket		mflash01
  launchups_marker3		gflash01		

   
  fire_timer	10
  max_attack_dist	200
  min_engagement_dist 200
  max_engagement_dist 200
end

begin "Iranian Teammate SAS 1"
  id 106277
  type person
  unit_type 9
  graphic SAS1
  anim_def Delta_TM
  attrib: good aidata nodismember
  deathtime	30
  clipsize 30
  hp 450
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 42
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_DELTA1
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM
  SSAudio5		GF_CAR15_RL		
  SSAudio6		GF_NADE_THRWAI	
  ammo_closeattack    grenadefb			
  ammo_easyrocket     AI_CAR15 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3    GRENADEHE				
  launchups_closeattack	gflash01		
  launchups_rocket		mflash01
  launchups_marker3		gflash01		

   
  fire_timer	10
  max_attack_dist	200
  min_engagement_dist 200
  max_engagement_dist 200
end

begin "Iranian Teammate SAS 2"
  id 106278
  type person
  unit_type 9
  graphic SAS2
  anim_def Delta_TM
  attrib: good aidata nodismember
  deathtime	30
  clipsize 30
  hp 450
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 42
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_DELTA1
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM
  SSAudio5		GF_CAR15_RL		
  SSAudio6		GF_NADE_THRWAI	
  ammo_closeattack    grenadefb			
  ammo_easyrocket     AI_CAR15 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3    GRENADEHE				
  launchups_closeattack	gflash01		
  launchups_rocket		mflash01
  launchups_marker3		gflash01		

   
  fire_timer	10
  max_attack_dist	200
  min_engagement_dist 200
  max_engagement_dist 200
end

begin "Fire Fighter"
  id 106281
  type person
  unit_type 9
  graphic IRFF
  anim_def Informnt
  attrib: good aidata nodismember
  deathtime	30
  clipsize 30
  hp 450
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 42
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_DELTA1
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM
  SSAudio5		GF_CAR15_RL		
  SSAudio6		GF_NADE_THRWAI	
  ammo_closeattack    grenadefb			
  ammo_easyrocket     AI_CAR15 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3    GRENADEHE				
  launchups_closeattack	gflash01		
  launchups_rocket		mflash01
  launchups_marker3		gflash01		

   
  fire_timer	10
  max_attack_dist	200
  min_engagement_dist 200
  max_engagement_dist 200
end

begin "Delta Force Teammate 2 w"
  id 101763
  type person
  unit_type 9
  graphic Delta2A
  anim_def Delta_TM
  attrib: good aidata nodismember
  deathtime	30
  clipsize 30
  hp 450
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 42
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_DELTA1
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM
  SSAudio5		GF_MP5_RL_AI		
  SSAudio6		GF_NADE_THRWAI	
  ammo_closeattack    grenadefb			
  ammo_easyrocket     AMMO_MP5_9MM 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3    GRENADEHE				
  launchups_closeattack	gflash01		
  launchups_rocket		mflash01
  launchups_marker3		gflash01		

   
  fire_timer	10
  max_attack_dist	200
  min_engagement_dist 200
  max_engagement_dist 200
end

begin "Delta Force Teammate 3 w"
  id 101764
  type person
  unit_type 9
  graphic Delta3A
  anim_def Delta_TM
  attrib: good aidata nodismember
  deathtime	30
  clipsize 30
  hp 450
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 42
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_DELTA1
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM
  SSAudio5		GF_MP5_RL_AI		
  SSAudio6		GF_NADE_THRWAI	
  ammo_closeattack    grenadefb			
  ammo_easyrocket     AMMO_MP5_9MM 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3    GRENADEHE				
  launchups_closeattack	gflash01		
  launchups_rocket		mflash01
  launchups_marker3		gflash01		

   
  fire_timer	10
  max_attack_dist	200
  min_engagement_dist 200
  max_engagement_dist 200
end


begin "Delta Force Teammate 4 w"
  id 101771
  type person
  unit_type 9
  graphic Delta4A
  anim_def Delta_TM
  attrib: good aidata nodismember
  deathtime	30
  clipsize 30
  hp 450
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 42
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_DELTA1
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM
  SSAudio5		GF_MP5_RL_AI		
  SSAudio6		GF_NADE_THRWAI	
  ammo_closeattack    grenadefb			
  ammo_easyrocket     AMMO_MP5_9MM 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3    GRENADEHE				
  launchups_closeattack	gflash01		
  launchups_rocket		mflash01
  launchups_marker3		gflash01		

   
  fire_timer	10
  max_attack_dist	200
  min_engagement_dist 200
  max_engagement_dist 200
end



begin "Delta Force TeamLeader Invulnerable "
  id 101753
  type person
  unit_type 9
  graphic Delta02
  anim_def Delta_TM
  attrib: good aidata nodismember
  deathtime	30
  clipsize 30
  hp 10
  armor -1 -1
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 42
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_DELTA1
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM
  SSAudio5		GF_CAR15_RL		
  SSAudio6		GF_NADE_THRWAI	
  ammo_closeattack    grenadefb			
  ammo_easyrocket     AI_CAR15 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3    GRENADEHE				
  launchups_closeattack	gflash01		
  launchups_rocket		mflash01
  launchups_marker3		gflash01		
end


begin "Delta Force Teammate 3"
  id 101745
  type person
  unit_type 9
  graphic Delta03
  anim_def Delta_TM
  attrib: good aidata nodismember
  deathtime	30
  clipsize 30
  hp 450
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 42
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_DELTA1
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM 
  SSAudio5		GF_CAR15_RL		
  SSAudio6		GF_NADE_THRWAI	
  ammo_closeattack    grenadefb			
  ammo_easyrocket     AI_CAR15 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3    GRENADEHE				
  launchups_closeattack	gflash01		
  launchups_rocket		mflash01
  launchups_marker3		gflash01		

   
  fire_timer	10
  max_attack_dist	200
  min_engagement_dist 200
  max_engagement_dist 200
end

begin "Delta Force Teammate 4"
  id 101747
  type person
  unit_type 9
  graphic Delta04
  anim_def Delta_TM
  attrib: good aidata nodismember
  deathtime	30
  clipsize 30
  hp 450
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 42
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_DELTA1
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM 
  SSAudio5		GF_CAR15_RL		
  SSAudio6		GF_NADE_THRWAI	
  ammo_closeattack    grenadefb			
  ammo_easyrocket     AI_CAR15 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3    GRENADEHE				
  launchups_closeattack	gflash01		
  launchups_rocket		mflash01
  launchups_marker3		gflash01		

   
  fire_timer	10
  max_attack_dist	200
  min_engagement_dist 200
  max_engagement_dist 200
end


begin "Government OfficialB"
  id 105304
  type person
  unit_type 9
  graphic ETier1B
  anim_def ETier1B
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 38
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Government OfficialB Normalwalk"
  id 101759
  type person
  unit_type 9
  graphic ETier1B
  anim_def ETier1BX
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 38
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Government OfficialB Surrender"
  id 101774
  type person
  unit_type 9
  graphic ETier1B
  anim_def ETier1BS
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 38
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Government officialB Flashbang"
  id 101783
  type person
  unit_type 9
  graphic ETier1B
  anim_def ETier1BF
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 35
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end


begin "Multiplayer Delta"	
  id 105301
  type person
  unit_type 9
  graphic DeltaMP 
  graphicenemy DeltaMRC
  anim_def Delta01
  attrib: aidata fo notool pfoil
  ai_function plyr
  disk_function PLAYER
  phrase_set 0
  move_function org2
  input_function troop
  hp 100
  armor 20 0
  radarsig 300
  mana 0
  sounddeath	DEATH_DELTA2
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM		
  SSAudio5		FSP_PRONE		
  SSAudio6		FSP_PRONE_ROLL	
end


begin "Multiplayer SAS Sniper"	
  id 106363
  type person
  unit_type 9
  graphic SAS4
  graphicenemy DeltaMRC
  anim_def Delta01
  attrib: aidata fo notool pfoil
  ai_function plyr
  disk_function PLAYER
  phrase_set 0
  move_function org2
  input_function troop
  hp 100
  armor 20 0
  radarsig 300
  mana 0
  sounddeath	DEATH_DELTA2
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM		
  SSAudio5		FSP_PRONE		
  SSAudio6		FSP_PRONE_ROLL	
end

begin "Multiplayer SAS CQB"	
  id 106359
  type person
  unit_type 9
  graphic SAS3
  graphicenemy DeltaMRC
  anim_def Delta01
  attrib: aidata fo notool pfoil
  ai_function plyr
  disk_function PLAYER
  phrase_set 0
  move_function org2
  input_function troop
  hp 100
  armor 20 0
  radarsig 300
  mana 0
  sounddeath	DEATH_DELTA2
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM		
  SSAudio5		FSP_PRONE		
  SSAudio6		FSP_PRONE_ROLL	
end

begin "Multiplayer SAS Gunner"	
  id 106360
  type person
  unit_type 9
  graphic SAS3
  graphicenemy DeltaMRC
  anim_def Delta01
  attrib: aidata fo notool pfoil
  ai_function plyr
  disk_function PLAYER
  phrase_set 0
  move_function org2
  input_function troop
  hp 100
  armor 20 0
  radarsig 300
  mana 0
  sounddeath	DEATH_DELTA2
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM		
  SSAudio5		FSP_PRONE		
  SSAudio6		FSP_PRONE_ROLL	
end

begin "Multiplayer Mercenary Enemy"	
  id 105308
  type person
  unit_type 9
  graphic DeltaMRC
  anim_def Delta01
  attrib: aidata fo notool pfoil
  ai_function plyr
  disk_function PLAYER
  phrase_set 0
  move_function org2
  input_function troop
  hp 100
  armor 20 0
  radarsig 300
  mana 0
  sounddeath	DEATH_DELTA1
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM		
  SSAudio5		FSP_PRONE		
  SSAudio6		FSP_PRONE_ROLL	
end

begin "Multiplayer Mercenary Enemy Medic"	
  id 105309
  type person
  unit_type 9
  graphic DeltaMMD
  anim_def Delta01
  attrib: aidata fo notool pfoil
  ai_function plyr
  disk_function PLAYER
  phrase_set 0
  move_function org2
  input_function troop
  hp 100
  armor 20 0
  radarsig 300
  mana 0
  sounddeath	DEATH_DELTA1
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM		
  SSAudio5		FSP_PRONE		
  SSAudio6		FSP_PRONE_ROLL	
end

begin "Multiplayer Delta Medic"	
  id 105305
  type person
  unit_type 9
  graphic DeltaMED
  graphicenemy DeltaMMD
  anim_def Delta01
  attrib: aidata fo notool pfoil
  ai_function plyr
  disk_function PLAYER
  phrase_set 0
  move_function org2
  input_function troop
  hp 100
  armor 20 0
  radarsig 300
  mana 0
  sounddeath	DEATH_DELTA2
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM		
  SSAudio5		FSP_PRONE		
  SSAudio6		FSP_PRONE_ROLL	
end

begin "Multiplayer SAS Medic"	
  id 106362
  type person
  unit_type 9
  graphic SAS3
  graphicenemy DeltaMMD
  anim_def Delta01
  attrib: aidata fo notool pfoil
  ai_function plyr
  disk_function PLAYER
  phrase_set 0
  move_function org2
  input_function troop
  hp 100
  armor 20 0
  radarsig 300
  mana 0
  sounddeath	DEATH_DELTA2
  SSNightDead 	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM		
  SSAudio5		FSP_PRONE		
  SSAudio6		FSP_PRONE_ROLL	
end

begin "Combat Friendly Soldier Ranger01"
  id 101667
  type person
  unit_type 9
  graphic Ranger01
  anim_def Ranger01
  attrib: good aidata nodismember
  deathtime	30
  hp 500
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 42
  move_function org1
  heatsig  300
  radarsig 300
  clipsize 30
  sounddeath	AI_DEATH_1
  SSNightDead 	DEATH_K_TEAM_A		
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM 
  SSAudio5		GF_M16_RL_AI	
  SSAudio6		GF_NADE_THRWAI	
  ammo_closeattack    grenadefb			
  ammo_easyrocket     AI_M16 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3    GRENADEHE				
  launchups_closeattack	gflash01		
  launchups_rocket		mflash01
  launchups_marker3		gflash01		
end

begin "Combat Friendly Soldier Ranger02"
  id 101754
  type person
  unit_type 9
  graphic Ranger02
  anim_def Ranger02
  attrib: good aidata nodismember
  deathtime	30
  hp 500
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 42
  move_function org1
  heatsig  300
  radarsig 300
  clipsize 30
  sounddeath	AI_DEATH_1
  SSNightDead 	DEATH_K_TEAM_A		
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM 
  SSAudio5		GF_M16_RL_AI	
  SSAudio6		GF_NADE_THRWAI	
  ammo_closeattack    grenadefb			
  ammo_easyrocket     AI_M16 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3    GRENADEHE				
  launchups_closeattack	gflash01		
  launchups_rocket		mflash01
  launchups_marker3		gflash01		
end



begin "Government OfficialC"
  id 104511 
  type person
  unit_type 9
  graphic ETier1C
  anim_def ETier1C
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 39
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead 	DEATH_K_SOM_C	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Government OfficialC Normalwalk"
  id 101760 
  type person
  unit_type 9
  graphic ETier1C
  anim_def ETier1CX
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 39
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead	DEATH_K_SOM_B
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Government OfficialC Surrender"
  id 101775 
  type person
  unit_type 9
  graphic ETier1C
  anim_def ETier1CS
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 39
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Government officialC Flashbang"
  id 101784
  type person
  unit_type 9
  graphic ETier1C
  anim_def ETier1CF
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 35
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end





begin "Government OfficialD"
  id 101779 
  type person
  unit_type 9
  graphic ETier1D
  anim_def ETier1D
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 39
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead 	DEATH_K_SOM_C	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Government OfficialD Normalwalk"
  id 101780 
  type person
  unit_type 9
  graphic ETier1D
  anim_def ETier1DX
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 39
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead	DEATH_K_SOM_B
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Government OfficialD Surrender"
  id 101781 
  type person
  unit_type 9
  graphic ETier1D
  anim_def ETier1DS
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 39
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Government officialD Flashbang"
  id 101785
  type person
  unit_type 9
  graphic ETier1D
  anim_def ETier1DF
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 35
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end


begin "Government OfficialE"
  id 101786 
  type person
  unit_type 9
  graphic ETier1E
  anim_def ETier1E
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 39
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead 	DEATH_K_SOM_C	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Government OfficialE Normalwalk"
  id 101787 
  type person
  unit_type 9
  graphic ETier1E
  anim_def ETier1EX
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 39
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead	DEATH_K_SOM_B
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Government OfficialE Surrender"
  id 101788 
  type person
  unit_type 9
  graphic ETier1E
  anim_def ETier1ES
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 39
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Government officialE Flashbang"
  id 101789
  type person
  unit_type 9
  graphic ETier1E
  anim_def ETier1EF
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 35
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end


begin "Government OfficialF"
  id 101790 
  type person
  unit_type 9
  graphic ETier1F
  anim_def ETier1F
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 39
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead 	DEATH_K_SOM_C	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Government OfficialF Normalwalk"
  id 101791 
  type person
  unit_type 9
  graphic ETier1F
  anim_def ETier1FX
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 39
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead	DEATH_K_SOM_B
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Government OfficialF Surrender"
  id 101792 
  type person
  unit_type 9
  graphic ETier1F
  anim_def ETier1FS
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 39
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Government officialF Flashbang"
  id 101793
  type person
  unit_type 9
  graphic ETier1F
  anim_def ETier1FF
  attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 150
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 35
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead 	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end







begin "10th Mountain Teammate 1" 
  id 104514
  type person
  unit_type 9
  graphic TenthMTN
  anim_def TenthMTN
  attrib: good aidata nodismember
  deathtime	30
  hp 500
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 42
  move_function org1
  heatsig  300
  radarsig 300
  clipsize 30
  sounddeath	AI_DEATH_1
  SSNightDead	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM 
  SSAudio5		GF_M16_RL_AI	
  SSAudio6		GF_NADE_THRWAI	
  ammo_closeattack    grenadefb			
  ammo_easyrocket     AI_M16 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3    GRENADEHE				
  launchups_closeattack	gflash01		
  launchups_rocket		mflash01
  launchups_marker3		gflash01		
end

begin "10th Mountain Teammate 2"
  id 101752
  type person
  unit_type 9
  graphic TenthMT2
  anim_def TenthMTN
  attrib: good aidata nodismember
  deathtime	30
  hp 500
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 42
  move_function org1
  heatsig  300
  radarsig 300
  clipsize 30
  sounddeath	AI_DEATH_1
  SSNightDead	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM 
  SSAudio5		GF_M16_RL_AI	
  SSAudio6		GF_NADE_THRWAI	
  ammo_closeattack    grenadefb			
  ammo_easyrocket     AI_M16 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3    GRENADEHE				
  launchups_closeattack	gflash01		
  launchups_rocket		mflash01
  launchups_marker3		gflash01		
end


begin "10th Mountain Teammate 3"
  id 101772
  type person
  unit_type 9
  graphic TenthMT3
  anim_def TenthMTN
  attrib: good aidata nodismember
  deathtime	30
  hp 500
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 42
  move_function org1
  heatsig  300
  radarsig 300
  clipsize 30
  sounddeath	AI_DEATH_1
  SSNightDead	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L		
  SSRFootGND	FSP_DIRT_R		
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM 
  SSAudio5		GF_M16_RL_AI	
  SSAudio6		GF_NADE_THRWAI	
  ammo_closeattack    grenadefb			
  ammo_easyrocket     AI_M16 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3    GRENADEHE				
  launchups_closeattack	gflash01		
  launchups_rocket		mflash01
  launchups_marker3		gflash01		
end


begin "Seargent"
  id 104516
  type person
  unit_type 9
  graphic C4srgt
  anim_def C4srgt
  attrib: good aidata nodismember NoWeapon
  deathtime	30
  hp 2
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 41
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	AI_DEATH_1
  SSNightDead	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM 
  SSAudio5		GF_CAR15_RL		
  SSAudio6		FS_OBJ_R
  ammo_closeattack    AI_CAR15
  ammo_easyrocket     AI_LAW
  ammo_advancedrocket AI_CLOSEKZ
  ammo_marker3        AI_CAR15
end



begin "Recruit"
  id 104517
  type person 
  unit_type 9
  graphic C4recrut
  anim_def C4recrut
  attrib: good aidata nodismember
  deathtime	30
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 50
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	AI_DEATH_1
  SSNightDead	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      	FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end


begin "Mechanic"
  id 104518
  type person
  unit_type 9
  graphic C4mechnc
  anim_def C4mechnc
  attrib: good aidata leavecorpse nodismember
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 51
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	AI_DEATH_1
  SSNightDead	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      	FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Ground Helicopter Coordinator"
  id 104519
  type person 
  unit_type 9
  graphic C4ground
  anim_def C4ground
  attrib: good aidata leavecorpse nodismember
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 52
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	AI_DEATH_1
  SSNightDead	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Combat Medic01 Soldier w"
  id 104520
  type person 
  unit_type 9
  graphic Medic01
  anim_def Medic01
  attrib: good aidata easy leavecorpse nodismember
  shadow   shadow4.tga   1.0  1.0  0.0  0.0
  hp 500
  score 25
  armor -1
  ai_function org1
  disk_function ORGANIC
  phrase_set 53
  move_function org1
  heatsig  300
  radarsig 300
  clipsize 30
  sounddeath	AI_DEATH_1
  SSNightDead	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L			
  SSRFootGND	FSP_DIRT_R			
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM
  SSAudio5		GF_CAR15_RL		
  SSAudio6		FS_OBJ_R
  ammo_closeattack    AI_CAR15
  ammo_easyrocket     AI_CAR15 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3        AI_CAR15
  launchups_closeattack		mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Combat Medic02 Soldier no gun"
  id 104529
  type person 
  unit_type 9
  graphic DeltaMED
  anim_def Medic02
  attrib: good aidata easy leavecorpse nodismember
  shadow   shadow4.tga   1.0  1.0  0.0  0.0
  hp 500
  score 25
  ai_function org1
  disk_function ORGANIC
  phrase_set 53
  move_function org1
  armor -1
  heatsig  300
  radarsig 300
  clipsize 30
  sounddeath	AI_DEATH_1
  SSNightDead	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD2		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FSP_DIRT_L			
  SSRFootGND	FSP_DIRT_R			
  SSLFootOBJ	FSP_OBJ_L
  SSRFootOBJ	FSP_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FSP_LADDER
  SSAudio4      FS_SWIM
  SSAudio5		GF_CAR15_RL		
  SSAudio6		FS_OBJ_R
  ammo_closeattack    AI_CAR15
  ammo_easyrocket     AI_CAR15 
  ammo_advancedrocket AI_CLOSEKZ 
  ammo_marker3        AI_CAR15
  launchups_closeattack		mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Mechanic"
  id 104521
  type person
  unit_type 9
  graphic C4mechnB
  anim_def C4mechnB
  attrib: good aidata leavecorpse nodismember
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 54
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	AI_DEATH_1
  SSNightDead	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Iranian Delta Hostage"
  id 106232
  type person
  unit_type 9
  graphic IDLTH
  anim_def ESomalP2
  attrib: good aidata leavecorpse nodismember
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 54
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	AI_DEATH_1
  SSNightDead	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Colombian Pilot - Delta Defs"
  id 106320
  type person
  unit_type 9
  graphic CPLT02
  anim_def Delta01
  attrib: good aidata leavecorpse nodismember
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 54
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	AI_DEATH_1
  SSNightDead	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Colombian Pilot - IRWRK1 defs"
  id 106368
  type person
  unit_type 9
  graphic CPLT 
  anim_def ESomalP2
  attrib: good aidata nodismember NoWeapon NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 16
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	AI_DEATH_1
  SSNightDead 	DEATH_K_SOM_A	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  
  ammo_closeattack    AI_Rock
  ammo_easyrocket     AI_Rock
  ammo_marker3        AI_Rock
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Colombian Pilot Hostage"
  id 106231
  type person
  unit_type 9
  graphic CPLT
  anim_def Csomal02
  attrib: good aidata leavecorpse nodismember
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 54
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	AI_DEATH_1
  SSNightDead	DEATH_K_TEAM_A	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		FS_OBJ_R
end

begin "Colombian Pilot (Static Death Mesh)"
  id 106329
  type people
  graphic CPLTD01
  hp 10
  armor -1
  ai_function gnrc
end

begin "Somalian Warlord"
  id 104522
  type person
  unit_type 9
  graphic Warlord
  anim_def Warlord
    attrib: evil aidata nodismember
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 40
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOMALI2
  SSNightDead	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      	FS_SWIM 
  SSAudio5		GF_AK_RL	
  SSAudio6		FS_OBJ_R
  ammo_closeattack    AI_AK47b
  ammo_easyrocket     AI_AK47b 
  ammo_marker3        AI_AK47b
  launchups_closeattack		mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Civilian Man Somalian #3"
  id 104523
  type person
  unit_type 9
  graphic Csomal03 
  anim_def Csomal03
  attrib: good aidata nodismember NoWeapon NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 16
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOM_CIVB	
  SSNightDead	DEATH_K_SOM_B	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_SOLA_MAD1	
  ammo_closeattack    AI_Rock
  ammo_easyrocket     AI_Rock
  ammo_marker3        AI_Rock
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Civilian Man Somalian #4"
  id 104524
  type person 
  unit_type 9
  graphic Csomal04 
  anim_def Csomal04
  attrib: good aidata nodismember NoWeapon NoMoveShoot
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 16
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOM_CIVC	
  SSNightDead	DEATH_K_SOM_C	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_SOLG_MAD1	
  ammo_closeattack    AI_Rock
  ammo_easyrocket     AI_Rock
  ammo_marker3        AI_Rock
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end

begin "Civilian Man Somalian #5"
  id 101765
  type person 
  unit_type 9
  graphic Csomal05 
  anim_def Csomal02
  attrib: good aidata nodismember NoWeapon
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 16
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOM_CIVC	
  SSNightDead	DEATH_K_SOM_C	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_SOLG_MAD2	
  ammo_closeattack    AI_Rock
  ammo_easyrocket     AI_Rock
  ammo_marker3        AI_Rock
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end


begin "Civilian Man Somalian #6"
  id 101766
  type person 
  unit_type 9
  graphic Csomal06 
  anim_def Csomal02
  attrib: good aidata nodismember NoWeapon
  deathtime	30
  shadow   shadow4.tga   1.0  1.0  0.0  0.0 
  hp 2
  score 10
  ai_function org1
  disk_function ORGANIC
  phrase_set 16
  move_function org1
  heatsig  300
  radarsig 300
  sounddeath	DEATH_SOM_CIVC	
  SSNightDead	DEATH_K_SOM_C	
  SSFallDead	FALLDEAD1		
  SSFallAlive	BODYFALL_DIRT		
  SSLFootGND	FS_DIRT_L		
  SSRFootGND	FS_DIRT_R		
  SSLFootOBJ	FS_OBJ_L
  SSRFootOBJ	FS_OBJ_R
  SSFootWater	FS_WATER
  SSAudio1		FS_DIRT_R
  SSAudio2		FS_DIRT_R
  SSAudio3		FS_OBJ_L
  SSAudio4      FS_SWIM 
  SSAudio5		FS_OBJ_L
  SSAudio6		VX_SOLG_MAD1	
  ammo_closeattack    AI_Rock
  ammo_easyrocket     AI_Rock
  ammo_marker3        AI_Rock
  launchups_closeattack	mflash01
  launchups_rocket		mflash01
  launchups_marker3		mflash01
end





begin "Area Trigger"
  id 106013
  type marker
end  

begin "Briefing Map Center"
  id 106038
  type marker
  attrib: NoCTool
end  

begin "start, player"
  id 106001
  type marker
end  

begin "start, dmatch"
  id 106002
  type marker
end  

begin "start, Blue Team"
  id 106003
  type marker
end  

begin "start, Red Team"
  id 106004
  type marker
end  

begin "start, Yellow Team"
  id 106090
  type marker
  attrib: 4Team NoCTool
end  

begin "start, Violet Team"
  id 106091
  type marker
  attrib: 4Team NoCTool
end  

begin "start, primary, player"
  id 106094
  type marker
  attrib: NoTool
end  

begin "start, primary, dmatch"
  id 106095
  type marker
  attrib: NoTool
end  

begin "start, primary, Blue Team"
  id 106096
  type marker
  attrib: NoTool
end  

begin "start, primary, Red Team"
  id 106097
  type marker
  attrib: NoTool
end  

begin "start, primary, Yellow Team"
  id 106098
  type marker
  attrib: 4Team NoTool
end  

begin "start, primary, Violet Team"
  id 106099
  type marker
  attrib: 4Team NoTool
end  

begin "teleport target"
  id 106088
  type marker
  disk_function MARKER
end  

begin "user waypoint"
  id 106089
  type marker
  attrib: NoTool
end  

begin "waypoint"
  id 106005
  type marker
end  

begin "waypoint, mp, alpha"
  id 106026
  type marker
end  

begin "waypoint, mp, red base"
  id 106027
  type marker
end  

begin "waypoint, mp, blue base"
  id 106028
  type marker
end  

begin "waypoint, mp, yellow base"
  id 106092
  type marker
  attrib: 4Team NoCTool
end  

begin "waypoint, mp, violet base"
  id 106093
  type marker
  attrib: 4Team NoCTool
end  

begin "KOTH center"
  id 106006
  type marker
end  

begin "Map Centerpoint, helps align commander map grid"
  id 102043
  type marker
end 

begin "Squib Start AK47"
  id 106031
  type marker
  ammo_marker3 AI_AK47a
  sqb_distance  1			
  sqb_rate		6			
  sqb_error		20			
  ai_function squib
  move_function squib
end 

begin "Squib Start 50cal"
  id 106032
  type marker
  ammo_marker3 50CAL
  primary_weapon WPN_UG50cal
  sqb_distance  1.25			
  sqb_rate		7			
  sqb_error		20			
  ai_function squib
  move_function squib
end 

begin "Squib Start minigun"
  id 106033
  type marker
  primary_weapon WPN_EMPLCDMINI
  ammo_marker3 minirnds
  sqb_distance  .75			
  sqb_rate		30			
  sqb_error		20			
  ai_function squib
  move_function squib
end 

begin "Squib End"
  id 106030
  type marker
end 





begin "snd: War Fog 1-shots A"
  id 106164
  type marker
  
  
  ai_function envs
  basetime 5  
  addtime  20	
  interrupt_sound_id ENV_DISTWAR1 
end

begin "snd: War Fog 1-shots B"
  id 106165
  type marker
  
  
  ai_function envs
  basetime 6  
  addtime  21	
  interrupt_sound_id ENV_DISTWAR2 
end





begin "snd: desert wind-crits 1 (Flys,Prairie dog squeeks)with lp3"
  id 106101
  type marker
  move_function envs
  soundloop lpnv_desert_lp3
  ai_function envs
  basetime 20  
  addtime  20	
  interrupt_sound_id ENV_DESERT 
end

begin "snd: desert wind-crits 2 (Flys only)with lp4"
  id 106155
  type marker
  move_function envs
  soundloop lpnv_desert_lp4
  ai_function envs
  basetime 21  
  addtime  22	
  interrupt_sound_id ENV_DESERT2 
end

begin "snd: desert wind-gusts, with lp3"
  id 106102
  type marker
  move_function envs
  soundloop lpnv_desert_lp3
  ai_function envs
  basetime 17  
  addtime  20	
  interrupt_sound_id ENV_DESERt3 
end	

begin "snd: desert wind-gusts2, with lp4"
  id 106131
  type marker
  move_function envs
  soundloop lpnv_desert_lp4
  ai_function envs
  basetime 16  
  addtime  24	
  interrupt_sound_id ENV_DESERt3 
end	

begin "snd: desert lp3"
  id 106119
  type marker
  move_function envs
  soundloop lpnv_desert_lp3
  ai_function envs
end	

begin "snd: desert lp4 (NEW 2.19.03)"
  id 106174
  type marker
  move_function envs
  soundloop lpnv_desert_lp4
  ai_function envs
end	

begin "snd: desert lp1-lighter, wistle-y wind (NEW 2.19.03)"
  id 106175
  type marker
  move_function envs
  soundloop lpnv_desert_lp1
  ai_function envs
end	

begin "snd: desert lp2-lighter, wistle-y wind (NEW 2.19.03)"
  id 106176
  type marker
  move_function envs
  soundloop lpnv_desert_lp2
  ai_function envs
end	

begin "snd: Bird A (1-shots)"
  id 106103
  type marker
  ai_function envs
  basetime 14  
  addtime  6	
  interrupt_sound_id ENV_BIRDA
end

begin "snd: TBird A (1-shots)"
  id 106401
  type marker
  ai_function envs
  basetime 14  
  addtime  6	
  interrupt_sound_id TENV_BIRDA
end

begin "snd: Bird B (1-shots)"
  id 106104
  type marker
  ai_function envs
  basetime 14  
  addtime  7	
  interrupt_sound_id ENV_BIRDB
end

begin "snd: TBird B (1-shots)"
  id 106402
  type marker
  ai_function envs
  basetime 14  
  addtime  7	
  interrupt_sound_id TENV_BIRDB
end

begin "snd: Cicaida Lp"
  id 106120
  type marker
  move_function envs
  soundloop LPNV_CICAIDA
  ai_function envs
end

begin "snd: Dock Creak1 (1-shots)"
  id 106105
  type marker
  ai_function envs
  basetime  11  
  addtime   5	
  interrupt_sound_id ENV_DOCKS2 
end

begin "snd: Dock Creak2 (1-shots)"
  id 106106
  type marker
  ai_function envs
  basetime 13  
  addtime  5	
  interrupt_sound_id ENV_DOCKS2
end

begin "snd: Mtl Roof-Gusts1 (use on Shanty objects)"
  id 106107
  type marker
  ai_function envs
  basetime 15  
  addtime  5	
  interrupt_sound_id ENV_ROOF1
end

begin "snd: Mtl Roof-Gusts2 (use on Shanty objects)"
  id 106108
  type marker
  ai_function envs
  basetime 15  
  addtime  5	
  interrupt_sound_id ENV_ROOF2
end

begin "snd: Katydidish (1-shots)"
  id 106109
  type marker
  ai_function envs
  basetime 12  
  addtime  5	
  interrupt_sound_id ENV_KATYDID
end

begin "snd: Ocean lp1, and one shots1"
  id 106110
  type marker
  move_function envs
  soundloop lpnv_ocean_lp1
  ai_function envs
  basetime 5  
  addtime  5	
  interrupt_sound_id ENV_OCEAN1
end	

begin "snd: Ocean lp2, and one shots2"
  id 106111
  type marker
  move_function envs
  soundloop lpnv_ocean_lp2
  ai_function envs
  basetime 5  
  addtime  3	
  interrupt_sound_id ENV_OCEAN2
end

begin "snd: Ocean lp1"
  id 106177
  type marker
  move_function envs
  soundloop lpnv_ocean_lp1
  ai_function envs
end

begin "snd: Ocean lp2"
  id 106121
  type marker
  move_function envs
  soundloop lpnv_ocean_lp2
  ai_function envs
end

begin "snd: Beach lp1, and one shots (ENV_TIDE1)"
  id 106112
  type marker
  move_function envs
  soundloop lpnv_beach_lp1
  ai_function envs
  basetime 5  
  addtime  3	
  interrupt_sound_id ENV_TIDE1
end

begin "snd: Beach lp2, and one shots (ENV_TIDE2)"
  id 106113
  type marker
  move_function envs
  soundloop lpnv_beach_lp2
  ai_function envs
  basetime 5  
  addtime  3	
  interrupt_sound_id ENV_TIDE2
end

begin "snd: Eagle (1-shots. Use sparingly!)"
  id 106114
  type marker
  ai_function envs
  basetime 16  
  addtime  6	
  interrupt_sound_id ENV_EAGLE
end

begin "snd: Elephant (Distant, 1-shots)"
  id 106115
  type marker
  ai_function envs
  basetime 22  
  addtime  7	
  interrupt_sound_id ENV_ELEPHANT
end

begin "snd: Lion (Night, 1-shots)"
  id 106124
  type marker
  ai_function envs
  basetime 23
  addtime	8
  interrupt_sound_id ENV_LION_NIGHT
end

begin "snd: Howl1 (1-shots)"
  id 106125
  type marker
  ai_function envs
  basetime 21
  addtime  15
  interrupt_sound_id ENV_HOWL1
end

begin "snd: CityNight Lp1"
  id 106143
  type marker
  move_function envs
  soundloop LPNV_CITY_NIGHT1
end

begin "snd: TCityNight Lp1"
  id 106391
  type marker
  move_function envs
  soundloop TLPNV_CITY_NIGHT1
end

  
 
 
 

begin "snd: TCityNight Lp2"
  id 106392
  type marker
  move_function envs
  soundloop TLPNV_CITY_NIGHT2
end

begin "snd: CityNight Lp2"
  id 106144
  type marker
  move_function envs
  soundloop LPNV_CITY_NIGHT2
end

begin "snd: TCityNight Lp2"
  id 106144
  type marker
  move_function envs
  soundloop TLPNV_CITY_NIGHT2
end

begin "snd: CityNight Lp3"
  id 106145
  type marker
  move_function envs
  soundloop LPNV_CITY_NIGHT3
end

begin "snd: CityNight Lp3"
  id 106393
  attrib: notool
  type marker
  move_function envs
  soundloop LPNV_CITY_NIGHT3
end

begin "snd: CityNight Lp4"
  id 106146
  type marker
  move_function envs
  soundloop LPNV_CITY_NIGHT4
end

begin "snd: TCityNight Lp4"
  id 106394
  type marker
  move_function envs
  soundloop TPNV_CITY_NIGHT4
end

begin "snd: NghtBug1 (1-shots)"
  id 106147
  type marker
  ai_function envs
  basetime 25
  addtime  13
  interrupt_sound_id ENV_NIGHTBUG1
end

begin "snd: Nght1 Lp (outside town. Use CityNight for in town)"
  id 106148
  type marker
  move_function envs
  soundloop LPNV_NIGHT1
end

begin "snd: TNght1 Lp (outside town. Use CityNight for in town)"
  id 106395
  type marker
  move_function envs
  soundloop TLPNV_NIGHT1
end

begin "snd: Nght2 Lp (outside town. Use CityNight for in town)"
  id 106149
  type marker
  move_function envs
  soundloop LPNV_NIGHT2
end

begin "snd: TNght2 Lp (outside town. Use CityNight for in town)"
  id 106396
  type marker
  move_function envs
  soundloop TLPNV_NIGHT2
end

begin "snd: Nght3 Lp (outside town. Use CityNight for in town)"
  id 106150
  type marker
  move_function envs
  soundloop LPNV_NIGHT3
end

begin "snd: TNght3 Lp (outside town. Use CityNight for in town)"
  id 106397
  type marker
  move_function envs
  soundloop TLPNV_NIGHT3
end

begin "snd: Nght4 Lp (outside town. Use CityNight for in town)"
  id 106151
  type marker
  move_function envs
  soundloop LPNV_NIGHT4
end

begin "snd: TNght4 Lp (outside town. Use CityNight for in town)"
  id 106398
  type marker
  move_function envs
  soundloop TLPNV_NIGHT4
end

begin "snd: Frog1 (1-shots)"
  id 106152
  type marker
  ai_function envs
  basetime 25  
  addtime  5	
  interrupt_sound_id ENV_FROG1
end

begin "snd: Hull Slaps1 (water lapping against docks-ship)"
  id 106153
  type marker
  ai_function envs
  basetime 11  
  addtime  20	
  interrupt_sound_id ENV_HULSLAP1
end

begin "snd: Hull Slaps2 (water lapping against docks-ship)"
  id 106154
  type marker
  ai_function envs
  basetime 10  
  addtime  22	
  interrupt_sound_id ENV_HULSLAP2
end


begin "snd: River1 lp, and one shots (ENV_RIVER1)"
  id 106116
  type marker
  move_function envs
  soundloop LPNV_RIVER_LP1
  ai_function envs
  basetime 5  
  addtime  5	
  interrupt_sound_id ENV_RIVER1
end

begin "snd: River2 lp, and one shots (ENV_RIVER2)"
  id 106117
  type marker
  move_function envs
  soundloop LPNV_RIVER_LP2
  ai_function envs
  basetime 7  
  addtime  5	
  interrupt_sound_id ENV_RIVER2
end

begin "snd: River1 lp"
  id 106126
  type marker
  move_function envs
  soundloop LPNV_RIVER_LP1
  ai_function envs
end

begin "snd: River2 lp"
  id 106127
  type marker
  move_function envs
  soundloop LPNV_RIVER_LP2
  ai_function envs
end

begin "snd: Base 1 lp, and 1Shots-air wrachet" 
  id 106118
  type marker
  move_function envs
  soundloop LP_ENGINE_ROOM
  ai_function envs
  basetime 14  
  addtime  10	
  interrupt_sound_id ENV_BASE1
end

begin "snd: ENV_BASE1 (air wrachet 1Shots only)" 
  id 106159
  type marker
  ai_function envs
  basetime 16  
  addtime  11	
  interrupt_sound_id ENV_BASE1
end

begin "snd: Base 2 lp, and 1Shots-air wrachet, pneumatics, etc."
  id 106132
  type marker
  move_function envs
  soundloop LPNV_HANGAR_LG
  ai_function envs
  basetime 15  
  addtime  8	
  interrupt_sound_id ENV_BASE2
end

begin "snd: ENV_BASE2 (1Shots only-air wrachet, pneumatics, etc.)"
  id 106160
  type marker
  ai_function envs
  basetime 16  
  addtime  8	
  interrupt_sound_id ENV_BASE2
end

begin "snd: Base 3 lp, and 1Shots-ALT air wrachet, pneumatics, etc."
  id 106133
  type marker
  move_function envs
  soundloop LPNV_HANGAR_SM
  ai_function envs
  basetime 10  
  addtime  12	
  interrupt_sound_id ENV_BASE3
end

begin "snd: ENV_BASE3 (1Shots only-ALT air wrachet, pneumatics, etc.)"
  id 106161
  type marker
  ai_function envs
  basetime 11	
  addtime  11	
  interrupt_sound_id ENV_BASE3
end

begin "snd: LpHangarSm 1 (Base 3 lp only)"
  id 106134
  type marker
  move_function envs
  soundloop LPNV_HANGAR_SM
end

begin "snd: LpHangarLg 1 (Base 2 lp only)"
  id 106135
  type marker
  move_function envs
  soundloop LPNV_HANGAR_LG
end

begin "snd: LpEngineRoom (Base 1 lp only) NEW 2.19.03"
  id 106178
  type marker
  move_function envs
  soundloop LP_ENGINE_ROOM
end

begin "snd: City Wind lp1, and One-shots (ENV_GUSTS1)"
  id 106136
  type marker
  move_function envs
  soundloop LPNV_CITY_WIND1
  ai_function envs
  basetime 30  
  addtime  15	
  interrupt_sound_id ENV_GUSTS1 
end

begin "snd: City Wind lp2, and One-shots (ENV_GUSTS2)"
  id 106137
  type marker
  move_function envs
  soundloop LPNV_CITY_WIND2
  ai_function envs
  basetime 35  
  addtime  11	
  interrupt_sound_id ENV_GUSTS2 
end

begin "snd: City Crowd1"
  id 106138
  type marker
  move_function envs
  soundloop LPNV_CITY_CROWD1
end


begin "snd: HVAC1 Lp"
  id 106122
  type marker
  move_function envs
  soundloop LP_HVAC1
  ai_function envs
end

begin "snd: HVAC2 Lp"
  id 106123
  type marker
  move_function envs
  soundloop LP_HVAC2
  ai_function envs
end

begin "snd: AC1 Lp"
  id 106139
  type marker
  move_function envs
  soundloop LP_AC1
  ai_function envs
end

begin "snd: AC2 Lp"
  id 106140
  type marker
  move_function envs
  soundloop LP_AC2
  ai_function envs
end

begin "snd: Somali Radio1 Lp (pop muzik)"
  id 106141
  type marker
  move_function envs
  soundloop LP_RADIO_SOMAL1
end

begin "snd: TSomali Radio1 Lp (pop muzik)"
  id 106399
  type marker
  move_function envs
  soundloop TLP_RADIO_SOMAL1
end

begin "snd: TSomali Radio2 Lp (Chanting-Arabic)"
  id 106400
  type marker
  move_function envs
  soundloop TLP_RADIO_SOMAL2
end

begin "snd: Somali Radio2 Lp (Chanting-Arabic)"
  id 106142
  type marker
  move_function envs
  soundloop LP_RADIO_SOMAL2
end

begin "snd: Somali Radio3 Lp (propaganda-English)"
  id 106158
  type marker
  move_function envs
  soundloop LP_RADIO_PGNDA
end

begin "snd: Somali Radio4 Lp (propaganda-Somali)"
  id 106162
  type marker
  move_function envs
  soundloop LP_RADIO_PGNDB
end

begin "snd: Somali Radio5 Lp (Static, off the air)"
  id 106163
  type marker
  move_function envs
  soundloop LP_RADIO_STATIC
end

begin "snd: Large Steam lp"
  id 106128
  type marker
  move_function envs
  soundloop LP_SILO
  ai_function envs
end

begin "snd: Walla: Food! SP01"
  id 106129
  type marker
  move_function envs
  soundloop LPNV_CRWD_FOOD1
  ai_function envs
end

begin "snd: Walla: Food! SP02"
  id 106130
  type marker
  move_function envs
  soundloop LPNV_CRWD_FOOD2
  ai_function envs
end

begin "snd: Loudspeaker Propaganda"
  id 106156
  type marker
  move_function envs
  soundloop	LP_LOUDSPKR_1
  ai_function envs
end

begin "snd: Lp Loudspeaker Chant from Somali Radio2"
  id 106157
  type marker
  move_function envs
  soundloop	LP_LOUDSPKR_2
  ai_function envs
end

begin "snd: LpENV Tunnel Entrance1"
  id 106172
  type marker
  move_function envs
  soundloop LPNV_TUNNEL1
  ai_function envs
end

begin "snd: LpENV Tunnel Entrance2"
  id 106166
  type marker
  move_function envs
  soundloop LPNV_TUNNEL2
  ai_function envs
end

begin "snd: LpENV Tunnel Entrance3"
  id 106167
  type marker
  move_function envs
  soundloop LPNV_TUNNEL3
  ai_function envs
end

begin "snd: LpENV DeepTunnel1"
  id 106168
  type marker
  move_function envs
  soundloop LPNV_TNNLDEEP1
  ai_function envs
end

begin "snd: LpENV DeepTunnel2"
  id 106169
  type marker
  move_function envs
  soundloop LPNV_TNNLDEEP2
  ai_function envs
end

begin "snd: LpENV DeepTunnel3"
  id 106170
  type marker
  move_function envs
  soundloop LPNV_TNNLDEEP3
  ai_function envs
end

begin "snd: Drips-Underground "
  id 106171
  type marker
  ai_function envs
  basetime 16	
  addtime  15	
  interrupt_sound_id ENV_DRIP1
end

begin "snd: Fly buzzes, BZZZZZZZZZ! (place no less than 200m apart)"
  id 106173
  type marker
  ai_function envs
  basetime 12	
  addtime  14	
  interrupt_sound_id ENV_DESERT2
end

begin "snd: LpBAD SOMALIS-SP10 (bad guys in war room. Interrupt w"
  id 106179
  type marker
  move_function envs
  soundloop LPNV_VX_WAROOM
  ai_function envs
end


begin "snd: LpAirBase Activity1, and One-shots (ENV_BASE3)"
  id 106180
  type marker
  move_function envs
  soundloop LPNV_AIRBASE_1
  ai_function envs
  basetime 14  
  addtime  11	
  interrupt_sound_id ENV_BASE3
end


begin "snd: LpAirBase Activity2, and One-shots (ENV_BASE2)"
  id 106181
  type marker
  move_function envs
  soundloop LPNV_AIRBASE_2
  ai_function envs
  basetime 16  
  addtime  12	
  interrupt_sound_id ENV_BASE3
end

begin "snd: LpAirBase Activity1"
  id 106182
  type marker
  move_function envs
  soundloop LPNV_AIRBASE_1
end

begin "snd: LpAirBase Activity2"
  id 106183
  type marker
  move_function envs
  soundloop LPNV_AIRBASE_2
end

begin "snd: LP_DC3IDLE"
  id 106378
  type marker
  move_function envs
  soundloop LP_DC3IDLE
end

begin "snd: LPNV_JUNGLZ1A"
  id 106379
  type marker
  move_function envs
  soundloop LPNV_JUNGLZ1A
end

begin "snd: LPNV_JUNGLZ1B"
  id 106380
  type marker
  move_function envs
  soundloop LPNV_JUNGLZ1B
end

begin "snd: LPNV_JUNGLZ1C"
  id 106381
  type marker
  move_function envs
  soundloop LPNV_JUNGLZ1C
end

begin "snd: LPNV_JUNGLZ2A"
  id 106382
  type marker
  move_function envs
  soundloop LPNV_JUNGLZ2A
end

begin "snd: LPNV_JUNGLZ2B"
  id 106383
  type marker
  move_function envs
  soundloop LPNV_JUNGLZ2B
end

begin "snd: LPNV_JUNGLZ2C"
  id 106384
  type marker
  move_function envs
  soundloop LPNV_JUNGLZ2C
end

begin "snd: LPNV_JUNGLZ2D"
  id 106385
  type marker
  move_function envs
  soundloop LPNV_JUNGLZ2D
end

begin "snd: LPNV_JUNGLZ3A"
  id 106386
  type marker
  move_function envs
  soundloop LPNV_JUNGLZ3A
end

begin "snd: LPNV_JUNGLZ3B"
  id 106387
  type marker
  move_function envs
  soundloop LPNV_JUNGLZ3B
end

begin "snd: LPNV_OILRIG1"
  id 106388
  type marker
  move_function envs
  soundloop LPNV_OILRIG1
end

begin "snd: LPNV_OILRIG2"
  id 106389
  type marker
  move_function envs
  soundloop LPNV_OILRIG2
end

begin "snd: LPNV_OILRIG3"
  id 106390
  type marker
  move_function envs
  soundloop LPNV_OILRIG3
end





begin "Small amount of steam"
	id 101968
	type object
	attrib: notarget
	type decoration
    graphic FxSteamS
	move_function upfx
	soundloop	LP_STEAM_S
    particlefx effect_FxSteamS Pfx00
end

begin "Medium amount of steam"
	id 101969
	type object
	attrib: notarget
	type decoration
    graphic FxSteamM
	move_function upfx     
	soundloop	LP_STEAM_M
	particlefx effect_FxSteamM Pfx00
end

begin "Large amount of steam"
	id 101970
	type object
	attrib: notarget
	type decoration
    graphic FxSteamL
	move_function upfx
	soundloop	LP_SILO
    particlefx effect_FxSteamL Pfx00
end

begin "Small amount of Gray smoke"
	id 101971
	type object
	attrib: notarget
	type decoration
    graphic FxGsmokS
	move_function upfx     
    particlefx effect_FxGsmokS Pfx00
end

begin "Medium amount of Gray smoke"
	id 101972
	type object
	attrib: notarget
	type decoration
    graphic FxGsmokM
	move_function upfx     
    particlefx effect_FxGsmokM Pfx00
end

begin "Large amount of Gray smoke"
	id 101973
	type object
	attrib: notarget
	type decoration
    graphic FxGsmokL
	move_function upfx     
    particlefx effect_FxGsmokL Pfx00
end

begin "Small amount of Black smoke"
	id 101974
	type object
	attrib: notarget
	type decoration
    graphic FxBsmokS
	move_function upfx     
    particlefx effect_FxBsmokS Pfx00
end

begin "Medium amount of Black smoke"
	id 101975
	type object
	attrib: notarget
	type decoration
    graphic FxBsmokM
	move_function upfx     
    particlefx effect_FxBsmokM Pfx00
end

begin "Large amount of Black smoke"
	id 101976
	type object
	attrib: notarget
	type decoration
    graphic FxBsmokL
	move_function upfx     
    particlefx effect_FxBsmokL Pfx00
end


begin "Extra Large amount of Black smoke"
	id 101985
	type object
	attrib: notarget
	type decoration
    graphic FxBsmokX
	move_function upfx     
    particlefx effect_FxBsmokX Pfx00
end

begin "Fire .5m tall"
	id 101977
	type object
	attrib: notarget
	type decoration
    graphic FxFireHm
	move_function upfx  
	soundloop LP_FIRE_SM
    particlefx effect_FxFireHm Pfx00
end

begin "Fire 1m tall"
	id 101978
	type object
	attrib: notarget
	type decoration
    graphic FxFire1m
	move_function upfx 
	soundloop LP_FIRE_SM2
    particlefx effect_FxFire1m Pfx00
end

begin "Fire 2m tall"
	id 101979
	type object
	attrib: notarget
	type decoration
    graphic FxFire2m
	move_function upfx 
	soundloop LP_FIRE_SM
    particlefx effect_FxFire2m Pfx00
end

begin "Fire 4m tall"
	id 101980
	type object
	attrib: notarget
	type decoration
    graphic FxFire4m
	move_function upfx 
	soundloop LP_FIRE_LG
    particlefx effect_FxFire4m Pfx00
end

begin "Fire 6m tall"
	id 101981
	type object
	attrib: notarget
	type decoration
    graphic FxFire6m
	move_function upfx
	soundloop LP_FIRE_LG2
    particlefx effect_FxFire6m Pfx00
end

begin "Dripping Water that will splash upon contact with the ground"
	id 101982
	type object
	attrib: notarget
	type decoration
    graphic FxWtrDp
	move_function upfx     
    particlefx effect_FxWtrDp Pfx00
end

begin "Electrical Sparks  (Random)"
	id 101983
	type object
	attrib: notarget
	type decoration
    graphic FxEspark	
	move_function upfx     
    particlefx effect_FxEspark Pfx00
end

begin "Fire from a window"
	id 101984
	type object
	attrib: notarget
	type decoration
    graphic FxFireWD	
	move_function upfx 
	soundloop LP_FIRE_LG
    particlefx effect_FxFireWD Pfx00
end


begin "Power Up Med Pack"
	id 102041
	type powerup
    disk_function POWERUP
	attrib: notarget
	graphic PwrMed
	powerupdef fullhp
end

begin "Power Up Ammo Pack"
	id 102042
	type powerup
    disk_function POWERUP
	attrib: notarget
	graphic PwrAmmo
	powerupdef AmmoFull
end

begin "Power Up Med Pack Infinite"
	id 102044
	type powerup
    disk_function POWERUP
	attrib: notarget
	graphic PwrMed
	powerupdef fullhp_Inf
end

begin "Power Up Ammo Pack Infinite"
	id 102045
	type powerup
    disk_function POWERUP
	attrib: notarget
	graphic PwrAmmo
	powerupdef AmmoFull_Inf
end

 
`;
