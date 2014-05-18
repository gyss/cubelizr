logocube
========

#### JavaScript Cube Animator ####

If you like bricks you can animate easily your own logo in your website.

LoGoCuBe uses Three.js and it only works in browsers compatible with WebGL.


## Prerequisites
* Three.js - http://threejs.org/
* TweenJS - https://github.com/sole/tween.js/
* JQuery - http://jquery.com/
* [Optional] Stats - https://github.com/mrdoob/stats.js/


## Installation

Download all files required:
* js/lib/jquery.min.js
* js/lib/stats.min.js
* js/lib/three.min.js
* js/lib/tween.js
* js/logocube.js

* logocube.json

And reference all js files in your html.

## Configuration

All configuration is defined in logocube.js file.

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
