	var container, stats;
	var camera, scene, renderer;


	var cube;
	var direction = 1;


//http://www.phpied.com/3-ways-to-define-a-javascript-class/

	init();
	animate();



	var position = { y: 100 };
	var target = { y: 0 };
	var tween = new TWEEN.Tween(position).to(target, 2000);

	tween.delay(500);

	tween.easing(TWEEN.Easing.Elastic.InOut);

	tween.onUpdate(function() {
		cube.position.y = position.y;
	});

	tween.start();







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
		
		// Cubes
		init_cubes(scene);
		
		// Lights
		init_light(scene);
	}



	//
	// Grid Initialization
	//
	function init_grid(scene) {

		var size = 250, step = 50;

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
	// Cubes Initialization
	//
	function init_cubes(scene) {
		
		var geometry = new THREE.BoxGeometry( 50, 50, 50 );
		var material = new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading, overdraw: 0.5 } );

		/*
		for ( var i = 0; i < 5; i ++ ) {

			var cube = new THREE.Mesh( geometry, material );

			cube.scale.y = Math.floor( Math.random() * 2 + 1 );

			cube.position.x = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
			cube.position.y = ( cube.scale.y * 50 ) / 2;
			cube.position.z = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;

			scene.add( cube );

		}
		*/

		cube = new THREE.Mesh( geometry, material );
		//cube.scale.y = Math.floor( Math.random() * 2 + 1 );

		cube.position.x =  0;
		cube.position.y = 100;
		cube.position.z =  0;

		scene.add( cube );

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


	

	//


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

		//console.log(cube.position.x + " = " + cube.position.y + " = " + cube.position.z);
		//cube.position.y += (1 * direction);

		
		//cube.position.y++;

		TWEEN.update();

		var timer = Date.now() * 0.0001;				
		renderer.render( scene, camera );

	}
	