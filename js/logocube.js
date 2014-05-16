	
	var TILE_SIZE = 50;

	var container, stats;
	var camera, scene, renderer;


	var direction = 1;

	var world_objects = [];

	/* Types of animation: http://sole.github.io/tween.js/examples/03_graphs.html */


	init();
	animate();


	// Retrieve json configuration file
	jQuery.getJSON("logocube.json", function( data ) {

		// First, load default values
		var type = data.defaults.type ? data.defaults.type : "cube";
		var color = data.defaults.color ? data.defaults.color : "0xff22ff";
		var opacity = data.defaults.opacity ? data.defaults.opacity : "0xff22ff";
		var start = data.defaults.start ? data.defaults.start : 0.1;
		var duration = data.defaults.duration ? data.defaults.duration : 2.0;
		var animation = data.defaults.animation ? data.defaults.animation : "TWEEN.Easing.Elastic.InOut";
		var height = data.defaults.height ? data.defaults.height : 100;
		
		$.each( data.objects , function( key, val ) {

			// Second, create elements into the world
			var obj_type = val.type ? val.type : type;
			var obj_color = val.color ? val.color : color;
			var obj_opacity = val.opacity ? val.opacity : opacity;
			var obj_start = val.start ? val.start : start;
			var obj_duration = val.duration ? val.duration : duration;
			var obj_animation = val.animation ? dval.animation : animation;
			var obj_x = val.x ? val.x : 0;
			var obj_y = val.y ? val.y : 0;
			var obj_height = val.height ? val.height : height;

			// 1. Create object
			var object = object_factory(obj_type, obj_color, obj_opacity);

			// 2. Set initial position
			translate_object(object, obj_x, obj_y, obj_height);

			// 3. Configure animation
			animate_object(object, obj_height, obj_start, obj_duration, obj_animation);

			// 4. Store object
			world_objects.push(object);

		});
		
	});















	function animate_object(obj, height, start, duration, animation) {

		// - Tween -
		var position = { y: height };
		var target = { y: 0 };
		var tween = new TWEEN.Tween(position).to(target, duration*1000);

		tween.delay(start * 100);

		tween.easing(tween_animation(animation));

		tween.onUpdate(function() {
			obj.mesh.position.y = position.y;
		});

		tween.start();
		
		obj.tween = tween;

	}

	function object_factory(type, color, opacity) {

		var new_obj = {};

		var geometry;
		var mesh;

		// - 3dObject -
		switch(type)
		{
			case "cube":
				geometry = new THREE.BoxGeometry( TILE_SIZE, TILE_SIZE, TILE_SIZE ); break;
		}
		
		var material = new THREE.MeshBasicMaterial({ 
			color: color, 
			opacity: opacity, 
			side: THREE.DoubleSide
		});

		mesh = new THREE.Mesh( geometry, material );

		scene.add( mesh );
		new_obj.mesh = mesh;

		return new_obj;
	}

	function translate_object(obj, x, y, height) {

		obj.mesh.position.x = TILE_SIZE * x ;
		obj.mesh.position.y = height;
		obj.mesh.position.z = TILE_SIZE * y ;

	}

	

















	function init() {

		container = document.createElement( 'div' );
		document.body.appendChild( container );

		var info = document.createElement( 'div' );
		info.style.position = 'absolute';
		info.style.top = '10px';
		info.style.width = '100%';
		info.style.textAlign = 'center';
		info.innerHTML = '<a href="http://threejs.org" target="_blank">three.js</a> - orthographic view';
		container.appendChild( info );


		configure_scene(container);

		configure_world(scene);

		// Events 
		window.addEventListener( 'resize', onWindowResize, false );

	}


	//
	// Scene Configuration
	//
	function configure_scene(container)
	{
		// Camera
		camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 500, 1000 );
		camera.position.x = 200;
		camera.position.y = 200;
		camera.position.z = 200;

		// Scene
		scene = new THREE.Scene();

		camera.position.x = 1* 200;
		camera.position.z = 1 * 200;
		camera.lookAt( scene.position );

		// Renderer
		renderer = new THREE.CanvasRenderer();
		renderer.setClearColor( 0xf0f0f0 );
		renderer.setSize( window.innerWidth, window.innerHeight );

		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';


		container.appendChild( renderer.domElement );
		container.appendChild( stats.domElement );
	}

	//
	// World Objects Configuration
	//
	function configure_world(scene)
	{
		// Grid
		init_grid(scene);

		// Lights
		init_light(scene);
	}



	//
	// Grid Initialization
	//
	function init_grid(scene) {

		var size = 250, step = TILE_SIZE;

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

		line.position.x = 200;
		line.position.y = 0;
		line.position.z = 200;
		
		scene.add( line );
	}

	//
	// Light Initialization
	//
	function init_light(scene) {

		var ambientLight = new THREE.AmbientLight( Math.random() * 0x10 );
		scene.add( ambientLight );

		var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
		directionalLight.position.x = Math.random() - 0.5;
		directionalLight.position.y = Math.random() - 0.5;
		directionalLight.position.z = Math.random() - 0.5;
		directionalLight.position.normalize();
		scene.add( directionalLight );

		var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
		directionalLight.position.x = Math.random() - 0.5;
		directionalLight.position.y = Math.random() - 0.5;
		directionalLight.position.z = Math.random() - 0.5;
		directionalLight.position.normalize();
		scene.add( directionalLight );

	}











	

	

	function onWindowResize() {

		camera.left = window.innerWidth / - 2;
		camera.right = window.innerWidth / 2;
		camera.top = window.innerHeight / 2;
		camera.bottom = window.innerHeight / - 2;

		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}

	function animate() {

		requestAnimationFrame( animate );

		render();
		stats.update();

	}

	

	function render() {


		/*
		if(cube.position.y > -200) {
			direction = -1;
		} else if(cube.position.y < -350) {
			direction = 1;
		}
		*/

		//cube.position.y += (1 * direction);
		//cube.position.y++;




		TWEEN.update();

		var timer = Date.now() * 0.0001;				
		renderer.render( scene, camera );

	}

	function tween_animation(animation_str)
	{
		switch(animation_str)
		{
			case "Linear.None": return TWEEN.Easing.Linear.None; break;
			case "Quadratic.In": return TWEEN.Easing.Quadratic.In; break;
			case "Quadratic.Out": return TWEEN.Easing.Quadratic.Out; break;
			case "Quadratic.InOut": return TWEEN.Easing.Quadratic.InOut; break;
			case "Cubic.In": return TWEEN.Easing.Cubic.In; break;
			case "Cubic.Out": return TWEEN.Easing.Cubic.Out; break;
			case "Cubic.InOut": return TWEEN.Easing.Cubic.InOut; break;
			case "Quartic.In": return TWEEN.Easing.Quartic.In; break;
			case "Quartic.Out": return TWEEN.Easing.Quartic.Out; break;
			case "Quartic.InOut": return TWEEN.Easing.Quartic.InOut; break;
			case "Quintic.In": return TWEEN.Easing.Quintic.In; break;
			case "Quintic.Out": return TWEEN.Easing.Quintic.Out; break;
			case "Quintic.InOut": return TWEEN.Easing.Quintic.InOut; break;
			case "Sinusoidal.In": return TWEEN.Easing.Sinusoidal.In; break;
			case "Sinusoidal.Out": return TWEEN.Easing.Sinusoidal.Out; break;
			case "Sinusoidal.InOut": return TWEEN.Easing.Sinusoidal.InOut; break;
			case "Exponential.In": return TWEEN.Easing.Exponential.In; break;
			case "Exponential.Out": return TWEEN.Easing.Exponential.Out; break;
			case "Exponential.InOut": return TWEEN.Easing.Exponential.InOut; break;
			case "Circular.In": return TWEEN.Easing.Circular.In; break;
			case "Circular.Out": return TWEEN.Easing.Circular.Out; break;
			case "Circular.InOut": return TWEEN.Easing.Circular.InOut; break;
			case "Elastic.In": return TWEEN.Easing.Elastic.In; break;
			case "Elastic.Out": return TWEEN.Easing.Elastic.Out; break;
			case "Elastic.InOut": return TWEEN.Easing.Elastic.InOut; break;
			case "Back.In": return TWEEN.Easing.Back.In; break;
			case "Back.Out": return TWEEN.Easing.Back.Out; break;
			case "Back.InOut": return TWEEN.Easing.Back.InOut; break;
			case "Bounce.In": return TWEEN.Easing.Bounce.In; break;
			case "Bounce.Out": return TWEEN.Easing.Bounce.Out; break;
			case "Bounce.InOut": return TWEEN.Easing.Bounce.InOut; break;
			default: return TWEEN.Easing.Linear.None; 
		}
	}
	