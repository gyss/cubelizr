/*
	Cubelizr JS v0.1.0 (2015-06-26)
	(c) 2015 Jose Lladro
	License: MIT
*/
'use strict';
/**
* 3D Object definition displayed in the scene
*
* @class Cubelizr
*/
var Cubelizr = (function (init_config) {

	// Canvas properties
	var mouseX = 0, mouseY = 0;

	// ThreeJS 
	var container, stats = null;
	var camera, scene, renderer;

	// Global configuration
	var config = {};
	var textures = [];
	var objects_defaults = {};
	var world_objects = [];
	var canvasWidth = 0, 
		canvasHeight = 0,
		windowHalfX = 0,
		windowHalfY = 0;

	/**
	* Prepare DOM element for the canvas
	* Read user data and begin drawing the scene
	* This function is executed automatically once the object is created
	*
	* @method init
	*/
	this.init = function() {

		// Get DOM element for work in
		container = document.getElementById(init_config.zone);
		if (!container) {
			console.log( "Cubelizr: please configure a zone (selector) for place the canvas." );
			return;
		}

		// Set tile size
		if(typeof init_config.tilesize == 'undefined' || isNaN(init_config.tilesize))
			init_config.tilesize = 50;
		if(typeof init_config.gridsize == 'undefined' || isNaN(init_config.gridsize))
			init_config.gridsize = 10;

		// Set the size of the canvas
		if(typeof init_config.height != 'undefined')
			canvasHeight = init_config.height;
		else canvasHeight = container.clientHeight;

		if(typeof init_config.width != 'undefined') 
			canvasWidth = init_config.width;
		else canvasWidth = container.clientWidth;

		windowHalfX = canvasWidth / 2;
		windowHalfY = canvasHeight / 2;
	
		// Set valid color for canvas
		if(typeof init_config.backgroundColor == 'undefined' || !isValidHexColor(init_config.backgroundColor))
			init_config.backgroundColor = container.style.backgroundColor;

		if(typeof init_config.backgroundColor != 'undefined')
			loadConfiguration(init_config.backgroundColor);

		// Process the scene
		loadUserInput(init_config.scene);

		initCanvas();

	}();
	

	//
	// THREE.JS configuration
	//
		
	function initCanvas() {

		// 1. Create canvas and scene
		configureScene();

		// 2. Draw world objects
		configureWorldObjects();

		// Lights
		configureLights();

		// Stats
		if(config.display_stats)
			drawFeatureStats();
		
		// Grid
		if(config.display_grid)
			drawFeatureGrid();

		// 3. Init draw loop func
		drawLoop();

		// Events 
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		//window.addEventListener( 'resize', onWindowResize, false );	

	};

	function drawLoop() {

		requestAnimationFrame( drawLoop );

		TWEEN.update();

		if(config.mouse_control) {
			camera.position.x += ( mouseX - camera.position.x + 200) * 0.05;
			camera.position.y += ( - mouseY - camera.position.y + 200) * 0.05;
			camera.lookAt( scene.position );
		}

		renderer.render( scene, camera );

		if (stats !== null)
			stats.update();

	};

	function configureScene() {

		camera = new THREE.OrthographicCamera( canvasWidth / - 2, canvasWidth / 2, canvasHeight / 2, canvasHeight / - 2, - 500, 5000 );
		scene = new THREE.Scene();

		camera.position.x = 200;
		camera.position.y = 200;
		camera.position.z = 200;

		camera.lookAt( scene.position );

		renderer = new THREE.WebGLRenderer();
		renderer.setClearColor( init_config.backgroundColor );
		renderer.setSize( canvasWidth, canvasHeight );

		container.appendChild( renderer.domElement );
	};

	function configureWorldObjects() {

		world_objects.forEach(function (element) {
			element.tween.start();
			scene.add(element.getMesh());
		});

	};

	function configureLights() {

		var ambientLight = new THREE.AmbientLight( 0.5 * 0x10 );
		scene.add( ambientLight );

		var directionalLight = new THREE.DirectionalLight( 0xffffff );
		directionalLight.position.x = 1.5;
		directionalLight.position.y = 1.5;
		directionalLight.position.z = 1.5;
		directionalLight.position.normalize();
		scene.add( directionalLight );

		var directionalLight = new THREE.DirectionalLight( 0xaaaaaa );
		directionalLight.position.x = -5;
		directionalLight.position.y = -5;
		directionalLight.position.z = -5;
		directionalLight.position.normalize();
		scene.add( directionalLight );

	};




	//
	// Features
	//

	function drawFeatureStats() {
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';

		container.appendChild( stats.domElement );
	};

	function drawFeatureGrid() {

		var size = (init_config.gridsize * init_config.tilesize)/2;
		var step = init_config.tilesize;

		var geometry = new THREE.Geometry();

		for ( var i = - size; i <= size; i += step ) {

			geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
			geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );

			geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
			geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );

		}

		var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } );
		var line = new THREE.Line( geometry, material );
		line.type = THREE.LinePieces;

		if(init_config.gridsize % 2 == 0)
		{
			line.position.x -= init_config.tilesize/2;
			line.position.z -= init_config.tilesize/2;
		}
		
		scene.add( line );
	};


	//
	// Process input JSON data
	//

	function loadUserInput(input) {
		if(typeof input.config != 'undefined')
			loadConfiguration(input.config);

		if(typeof input.defaults != 'undefined')
			loadDefaults(input.defaults);

		if(typeof input.textures != 'undefined')
			loadTextures(input.textures);

		if(typeof input.objects != 'undefined')
			loadScene(input.objects);
	}

	function loadConfiguration(user_conf) {
		config.mouse_control = user_conf.mouse_control === 1 ? true : false;
		config.display_grid = user_conf.display_grid === 1 ? true : false;
		config.display_stats = user_conf.display_stats === 1 ? true : false;
	};

	function loadDefaults(user_defaults) {
		objects_defaults.type = user_defaults.type ? user_defaults.type : "cube";
		objects_defaults.color = user_defaults.color ? user_defaults.color : "0xff22ff";
		objects_defaults.texture = user_defaults.texture ? user_defaults.texture : "";
		objects_defaults.opacity = user_defaults.opacity ? user_defaults.opacity : "0xff22ff";
		objects_defaults.start = user_defaults.start ? user_defaults.start : 0.1;
		objects_defaults.duration = user_defaults.duration ? user_defaults.duration : 2.0;
		objects_defaults.animation = user_defaults.animation ? user_defaults.animation : "Elastic.InOut";
		objects_defaults.height = user_defaults.height ? user_defaults.height : 100;
	};

	// Prepare textures for render
	function loadTextures(user_textures) {

		textures = user_textures;

		if(textures)
			textures.forEach(function (element) {
				if(element.url.length == 6)
				{
					element.material = [
						new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture(element.url[0]) }),
						new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture(element.url[1]) }),
						new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture(element.url[2]) }),
						new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture(element.url[3]) }),
						new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture(element.url[4]) }),
						new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture(element.url[5]) })
					];
				} else {
					// element.texture = THREE.ImageUtils.loadTexture(element.url[0]);
					element.material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture(element.url[0]) });
				}
			});

	};

	function loadScene(user_data) {

		// - Process objects -
		user_data.forEach(function (val) {
			
			// Load definition of the object
			var obj_type = val.type ? val.type : objects_defaults.type;
			var obj_color = val.color ? val.color : objects_defaults.color;
			var obj_opacity = val.opacity ? val.opacity : objects_defaults.opacity;
			var obj_start = val.start ? val.start : objects_defaults.start;
			var obj_duration = val.duration ? val.duration : objects_defaults.duration;
			var obj_animation = val.animation ? val.animation : objects_defaults.animation;
			var obj_x = val.x ? val.x : 0;
			var obj_y = val.y ? val.y : 0;
			var obj_z = val.z ? val.z : 0;
			var obj_height = val.height ? val.height : objects_defaults.height;
			var obj_texture = val.texture ? val.texture : objects_defaults.texture;
			
			// If it's defined a texture, and exist in the array, store it
			var texture_mat = null;
			if(obj_texture !== "")
				for (var i=0, len=textures.length; i<len; i++) 
				    if (textures[i].id === obj_texture)
				    {
				    	texture_mat = textures[i];
				    	break;
				    }
			
			// 1. Create object
			var obj = new SceneObject(obj_type, init_config.tilesize, obj_color, texture_mat, obj_opacity);

			// 2. Set initial position
			obj.translate(obj_x, obj_y, obj_height);

			// 3. Configure animation
			obj.animate(obj_height, obj_start, obj_z, obj_duration, obj_animation);

			// 4. Store object
			world_objects.push(obj);

		});

	};


	//
	// Events
	//

	function onWindowResize() {
	
		windowHalfX = canvasWidth / 2;
		windowHalfY = canvasHeight / 2;

		camera.aspect = canvasWidth / canvasHeight;
		
		camera.left = canvasWidth / - 2;
		camera.right = canvasWidth / 2;
		camera.top = canvasHeight / 2;
		camera.bottom = canvasHeight / - 2;
		
		camera.updateProjectionMatrix();

		renderer.setSize( canvasWidth, canvasHeight );

	};

	function onDocumentMouseMove(event) {

		mouseX = ( event.clientX - windowHalfX );
		mouseY = ( event.clientY - windowHalfY );

	};

	function isValidHexColor(color) {
		return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
	};

});