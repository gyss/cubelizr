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
* JQuery - http://jquery.com/
* [Optional] Stats - https://github.com/mrdoob/stats.js/


## Demo

Clone this repository and open index.html file in a browser

## Requirements

Libraries:
* js/lib/jquery.min.js
* js/lib/stats.min.js
* js/lib/three.min.js
* js/lib/tween.js
* js/cubelizr.js

Cubelizr:
* cubelizr.json

## Configuration


There are two sections to be aware when configure your Cubelizr

* Setup
	* zone: selector that points to the div that will be contains the Cubelizr.
	* tilesize: tile size of a single cube (default 50).
	* gridsize: number of tiles for the floor grid's side.
	* url: URL for the cubelizr json.
	* height: height of the canvas (if not defined, the height of the div will be used).
	* width: width of the canvas (if not defined, the width of the div will be used).
	* backgroundColor: color for the background of the canvas (if not defined, the background color of the div will be used).

* Timeline
	This is a separated JSON file that defines the parameters of each cube animation.


All configuration is defined in cubelizr.json file.

* config
	* mouse_control: Enables the camera movement by the mouse 
	* display_grid: Displays the vertex grid
	* display_stats: Displays the stats box with the FPS info

* textures
	Here you have to declare all textures you are going to use and its ids. Those ids will be referenced by your objects. Obviously, they must be unique.

```json
	"textures": [
		{ "id": 1, "url": "./img/textures/threejs.jpg"},
		{ "id": 2, "url": "./img/textures/other.jpg"}
	],
```

* defaults
	This section allows you to define the default values for the objects parameters.
	* type: Shape of the object. For now, you can only put "cube" here
	* opacity: Transparency
	* color: Default color for your objects. For example: #ff3300
	* texture: Default texture for your objects. For example: 1. Notice that is the texture is defined it will overwrite the color value.
	* start: Second when the object begins its animation
	* duration: Duration of the animation
	* animation: Type of animation. You can use all these: http://sole.github.io/tween.js/examples/03_graphs.html
	* height: Initial height of the cubes (z axis)

* objects
	Here you have to define all cubes that will be falling down. The most important thing in this section is to define where them fall. You can do it with the "x" and "y" parameters.
	This system is tile based, so you can just define them with single digits.

```json
	"objects": [
		{ "x": 0, "y": 0, "color": "#ff3300", "start": 0.1},
		{ "x": 7, "y": 0, "color": "#ff3300", "start": 0.1}
	],
```

	For each object you can define all the parameters commented before: opacity, duration, texture, etc.	


## Troubleshooting

If you notice that the animation is not working correctly make sure javascript is not crashing.
Open the console of your browser and refresh the page.

If nothing else works, just open a ticket and we will solve it as soon as possible.
