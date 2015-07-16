cubelizr
========

#### JavaScript Cube Animator ####

Build easily a cube-craft animated logo and put it in your web.
Cubelizr uses Three.js and it only works in browsers compatible with WebGL.

Setup a JSON file to configure the desired design and animations.
We provide you some JSON examples.

## Prerequisites
* Three.js - http://threejs.org/
* TweenJS - https://github.com/sole/tween.js/
* [Optional] Stats - https://github.com/mrdoob/stats.js/


## Demo

Visit http://gyss.github.io/cubelizr

## Configuration


There are two sections to be aware when configure your Cubelizr

### Setup
	* zone: selector that points to the div that will contain the Cubelizr.
	* tilesize: tile size of a single cube (default 50).
	* gridsize: number of tiles for the floor grid's side.
	* url: URL for the cubelizr json (see Scene).
	* height: height of the canvas (if not defined, the height of the div will be used).
	* width: width of the canvas (if not defined, the width of the div will be used).
	* backgroundColor: color for the background of the canvas (if not defined, the background color of the div will be used).

### Scene
	This is a separated JSON file that defines the parameters of each cube animation. This file is separated in theses sections: config, textures, defaults and objects.
#### Config. It defines global behaviour.
	* mouse_control: if set to 1, the camera will move accordingly to the mouse move.
	* display_grid: if set to 1, the floor's grid will be displayed.
	* display_stats: if set to 1, ThreeJS FPS stats will be displayed.

```json
	"config" : {
		"mouse_control" : 1,
		"display_grid" : 1,
		"display_stats" : 0
	},
```

#### Textures: here you can define textures for use them later in your cubes (referenced by unique ids). You have two choices, one texture for all sides of the cube or define all six textures.

```json
	"textures": [
		{ "id": 1, "url": ["./img/textures/threejs.jpg"]},
		{ "id": 2, "url": ["./img/textures/1.png", "./img/textures/2.png", "./img/textures/3.png", "./img/textures/4.png", "./img/textures/5.png", "./img/textures/6.png"]}
	],
```

#### Objects: this is an array of objects that will appear in the scene depending on its parameters. Those are:
		
	* type: shape of the object. For now only "cube" is available.
	* opacity: from 0.0 (transparent) to 1.0 (totally visible).

	* height: height from the animation will start.
	* x: tile measured x position.
	* y: tile measured y position.
		
	* texture: id of the selected texture from the array of textures defined previously.
	* color: if you want just a plain color, you can set this to an hex RGB color (e.g. "#ff3300").
		
	* animation: type of the animation (e.g. "Quadratic.In"). You can check every animation available in [this website](http://sole.github.io/tween.js/examples/03_graphs.html).
	* start: second indicating the beginning of the animation.
	* duration: duration of the animation. 

```json
	"objects": [
		{ "x": 0, "y": 0, "color": "#ff3300", "start": 0.1},
		{ "x": 7, "y": 0, "color": "#ff3300", "start": 0.1}
	],
```

#### Defaults: many of the previous params are probably common for all the objects of your animation. you can use this section for define the parameters that will be used by all the objects.

```json
	"defaults": {
		"type": "cube",
		"opacity": 1.0,
		"start": 0.1,
		"duration": 1.7,
		"animation": "Quadratic.Out",
		"height": 1000
	},
```

	You can check some examples in cubelizr_*.json files.


## Troubleshooting

If you notice that the animation is not working correctly make sure javascript is not crashing.
Open the console of your browser and refresh the page.

If nothing else works, just open a ticket and we will solve it as soon as possible.
