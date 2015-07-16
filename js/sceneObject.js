/*
	Cubelizr JS v0.1.0 (2015-06-26)
	(c) 2015 Jose Lladro
	License: MIT

	Types of animation: http://sole.github.io/tween.js/examples/03_graphs.html 
*/
'use strict';

/**
* 3D Object definition displayed in the scene
*
* @class SceneObject
*/
var SceneObject = (function (obj_type, obj_size, obj_color, obj_texture, obj_opacity) {

	var geometry;
	var mesh;
	var material = null;
	var size = obj_size;

	/**
	* Prepare DOM element for the canvas
	* Read user data and begin drawing the scene
	* This function is executed automatically once the object is created
	*
	* @method init
	*/
	this.init = function() {

		// - 3dObject -
		switch(obj_type) {
			case "cube":
			default:
				geometry = new THREE.BoxGeometry( size, size, size ); 
		}

		// - Texture -
		// If it's defined a texture, and exist in the array, draw it,
		if(obj_texture !== null) {
			if(obj_texture.url.length == 6)
				material = new THREE.MeshFaceMaterial( obj_texture.material );
			else material = obj_texture.material;
			//	material = new THREE.MeshLambertMaterial({ map: result[0].texture, opacity: obj_opacity });
		}
			
		// Else draw plain colour
		if(material === null) {
			// RGB color
			material = new THREE.MeshBasicMaterial({ 
				color: obj_color, 
				opacity: obj_opacity, 
				side: THREE.DoubleSide,
				wireframe: false
			});
		}

		// - Mesh -
		mesh = new THREE.Mesh( geometry, material );

	}();

	
	/**
	* Returns the mesh of the object
	*
	* @method getMesh
	* @return {Object} Returns the ThreeJS mesh object
	*/
	this.getMesh = function() {
		return mesh;
	}

	/**
	* Move the 3D object throught the scene
	*
	* @method translate
	* @param {Double} x. Tile Column
	* @param {Double} y. Tile Row
	* @param {Double} height
	*/
	this.translate = function(x, y, height) {
		mesh.position.x = size * x -size*4;
		mesh.position.y = height;
		mesh.position.z = size * y -size*4;
	}

	/**
	* Animates the object from the current position to the desired destination
	*
	* @method animate
	* @param {Double} height. Target height
	* @param {Double} start. Start delay in seconds
	* @param {Double} z. Target position
	* @param {Double} duration. Number of seconds the animation will last
	* @param {String} animation. Type of the Tween animation
	*/
	this.animate = function(height, start, z, duration, animation) {
		// - Tween -
		var position = { y: height };
		var target = { y: z * size + size/2 };

		var tween = new TWEEN.Tween(position).to(target, duration*1000);

		tween.delay(start * 100);

		tween.easing(tween_animation(animation));

		tween.onUpdate(function() {
			mesh.position.y = position.y;
		});

		this.tween = tween;
	}


	// Types of animation
	function tween_animation(animation_str) {
		switch(animation_str) {
			case "Linear.None": return TWEEN.Easing.Linear.None;
			case "Quadratic.In": return TWEEN.Easing.Quadratic.In; 
			case "Quadratic.Out": return TWEEN.Easing.Quadratic.Out;
			case "Quadratic.InOut": return TWEEN.Easing.Quadratic.InOut;
			case "Cubic.In": return TWEEN.Easing.Cubic.In;
			case "Cubic.Out": return TWEEN.Easing.Cubic.Out;
			case "Cubic.InOut": return TWEEN.Easing.Cubic.InOut;
			case "Quartic.In": return TWEEN.Easing.Quartic.In;
			case "Quartic.Out": return TWEEN.Easing.Quartic.Out;
			case "Quartic.InOut": return TWEEN.Easing.Quartic.InOut;
			case "Quintic.In": return TWEEN.Easing.Quintic.In;
			case "Quintic.Out": return TWEEN.Easing.Quintic.Out;
			case "Quintic.InOut": return TWEEN.Easing.Quintic.InOut;
			case "Sinusoidal.In": return TWEEN.Easing.Sinusoidal.In;
			case "Sinusoidal.Out": return TWEEN.Easing.Sinusoidal.Out;
			case "Sinusoidal.InOut": return TWEEN.Easing.Sinusoidal.InOut;
			case "Exponential.In": return TWEEN.Easing.Exponential.In;
			case "Exponential.Out": return TWEEN.Easing.Exponential.Out;
			case "Exponential.InOut": return TWEEN.Easing.Exponential.InOut;
			case "Circular.In": return TWEEN.Easing.Circular.In;
			case "Circular.Out": return TWEEN.Easing.Circular.Out;
			case "Circular.InOut": return TWEEN.Easing.Circular.InOut;
			case "Elastic.In": return TWEEN.Easing.Elastic.In;
			case "Elastic.Out": return TWEEN.Easing.Elastic.Out;
			case "Elastic.InOut": return TWEEN.Easing.Elastic.InOut;
			case "Back.In": return TWEEN.Easing.Back.In;
			case "Back.Out": return TWEEN.Easing.Back.Out;
			case "Back.InOut": return TWEEN.Easing.Back.InOut;
			case "Bounce.In": return TWEEN.Easing.Bounce.In;
			case "Bounce.Out": return TWEEN.Easing.Bounce.Out;
			case "Bounce.InOut": return TWEEN.Easing.Bounce.InOut;
			default: return TWEEN.Easing.Linear.None; 
		}
	};

});