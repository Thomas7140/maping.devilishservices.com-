This project ports the map editor from Delta Force: Black Hawk Down, released in 2003 by NovaLogic, into a simple HTML file using Three.js. We can keep it as a web app or later migrate it to something simple like Electron, or another platform that makes it easy to reuse and build on the existing work.

Todo:
- [x] 3D terrain rendering
- [x] Items conversion from .3DI to .GLB
- [x] General Information
- [X] Waypoints
- [X] Layer Names
- [X] Groups
- [ ] 90% - Item Attributes
- [ ] 90% - Area Triggers
- [ ] 60% - Item context menu
- [ ] Canvas context menu
- [ ] Briefing
- [ ] Events
- [ ] Global Replace
- [ ] Weapon Loadouts

* itemsDef.js works similarly to the original items.def.  
* otheritems.js lists all the items that aren’t in items.def by default and also uses new variables to indicate which 3D .glb file will be used for the item.
* Today, when loading a map, the editor moves the camera to a spot near the center of the inserted items. This could be optimized to keep the camera from being positioned so high up in the sky.

All 3D .glb items should be in the resources/3d_items folder, and you should download the items here: https://drive.google.com/file/d/1Ra4pI8aTDwG5vO3h0fLZYzqPM6YveKQH/view?usp=sharing  
How to load a map: https://youtu.be/opW0PqfdUr4

## Shortcuts and menu options
WASD = Camera movement  
Q/E = Move the camera up and down  
Mouse scroll = Increases camera speed, like in a traditional map editor such as Unreal Engine  
Speed Scalar = Changes the speed scale controlled by the mouse scroll  
Ground Clamp = Prevents the camera from going below the terrain  
Clearance = Adjusts the camera’s minimum height  
Draw Radius = Maximum terrain render distance (helps improve FPS)  
Main Area = Shows the main map area before it starts repeating infinitely  
Show Sectors = Shows each terrain subdivision  
Go To = Lets you jump directly to a coordinate  
R = Switches the view mode between colormap, heightmap, and depth map  
T = Switches to top view (like the original MED view)  
E = Changes the item gizmo to rotation mode (yaw and pitch)  
W = Changes the item gizmo to standard XYZ movement mode  
F = Toggles item wireframe view  
G = Toggles grid lines  
H = Toggles item anchor points  
I = Toggles the map info box on the canvas  

## Keep working on it.
Feel free to continue what’s already been done.  
Use AI to better understand the index.html file since it’s a simple file, to see what is and isn’t implemented.  
If you have any questions, feel free to contact me on Discord at @duz1ht.  

## Contributors so far
biggy, Demonic, dataspiller, Scott (NovaHQ), AngelExalted
