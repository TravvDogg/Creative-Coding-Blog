---
title: "Week 5b: JS-Libraries - three.js"
published_at: 2025-04-08
snippet: Importing three js and playing with it in a blog
disable_html_sanitization: true
allow_math: true
---
<div id="threejs_container"></div>

<script type="module"> 
	// import * as THREE from "/three.js/build/three.module.js"
	// import { GUI } from "/three.js/examples/jsm/libs/lil-gui.module.min.js"
	// import { OrbitControls } from '/three.js/examples/jsm/controls/OrbitControls.js'
	// import { TeapotGeometry } from '/three.js/examples/jsm/geometries/TeapotGeometry.js'
	import * as THREE from "/_scripts/three.js/three.module.js"
	import { GUI } from "/_scripts/three.js/lil-gui.module.min.js"
	import { OrbitControls } from '/_scripts/three.js/OrbitControls.js'
	import { TeapotGeometry } from '/_scripts/three.js/TeapotGeometry.js'

	let camera, scene, renderer
	let cameraControls
	let effectController
	const teapotSize = 300
	let ambientLight, light

	let canvas = document.getElementById("threejs_container")
	let width = canvas.parentNode.scrollWidth
	let height = width * 9 / 16

	let tess = - 1;	// force initialization
	let bBottom;
	let bLid;
	let bBody;
	let bFitLid;
	let bNonBlinn;
	let shading;

	let teapot, textureCube;
	const materials = {};

	init();
	render();

	function init() {

		const canvasWidth = width;
		const canvasHeight = height;

		// CAMERA
		camera = new THREE.PerspectiveCamera( 45, width / height, 1, 80000 );
		camera.position.set( - 600, 550, 1300 );

		// LIGHTS
		ambientLight = new THREE.AmbientLight( 0x7c7c7c, 2.0 );

		light = new THREE.DirectionalLight( 0xFFFFFF, 2.0 );
		light.position.set( 0.32, 0.39, 0.7 );

		// RENDERER
		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( canvasWidth, canvasHeight );
		canvas.appendChild( renderer.domElement );

		// EVENTS
		window.addEventListener( 'resize', onWindowResize );

		// CONTROLS
		cameraControls = new OrbitControls( camera, renderer.domElement );
		cameraControls.addEventListener( 'change', render );

		// TEXTURE MAP
		// const textureMap = new THREE.TextureLoader().load( '/three.js/examples/textures/uv_grid_opengl.jpg' );
		const textureMap = new THREE.TextureLoader().load( '/_scripts/three.js/uv_grid_opengl.jpg' );
		textureMap.wrapS = textureMap.wrapT = THREE.RepeatWrapping;
		textureMap.anisotropy = 16;
		textureMap.colorSpace = THREE.SRGBColorSpace;

		// REFLECTION MAP
		// const path = '/three.js/examples/textures/cube/pisa/';
		const path = '/_scripts/three.js/';
		const urls = [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ];

		textureCube = new THREE.CubeTextureLoader().setPath( path ).load( urls );

		materials[ 'wireframe' ] = new THREE.MeshBasicMaterial( { wireframe: true } );
		materials[ 'flat' ] = new THREE.MeshPhongMaterial( { specular: 0x000000, flatShading: true, side: THREE.DoubleSide } );
		materials[ 'smooth' ] = new THREE.MeshLambertMaterial( { side: THREE.DoubleSide } );
		materials[ 'glossy' ] = new THREE.MeshPhongMaterial( { color: 0xc0c0c0, specular: 0x404040, shininess: 300, side: THREE.DoubleSide } );
		materials[ 'textured' ] = new THREE.MeshPhongMaterial( { map: textureMap, side: THREE.DoubleSide } );
		materials[ 'reflective' ] = new THREE.MeshPhongMaterial( { envMap: textureCube, side: THREE.DoubleSide } );

		// scene itself
		scene = new THREE.Scene();
		scene.background = new THREE.Color( 0xAAAAAA );

		scene.add( ambientLight );
		scene.add( light );

		// GUI
		setupGui();

	}

	// EVENT HANDLERS

	function onWindowResize() {

		const canvasWidth = window.innerWidth;
		const canvasHeight = window.innerHeight;

		renderer.setSize( canvasWidth, canvasHeight );

		camera.aspect = canvasWidth / canvasHeight;
		camera.updateProjectionMatrix();

		render();

	}

	function setupGui() {

		effectController = {
			newTess: 15,
			bottom: true,
			lid: true,
			body: true,
			fitLid: false,
			nonblinn: false,
			newShading: 'glossy'
		};

		const gui = new GUI();
		gui.add( effectController, 'newTess', [ 2, 3, 4, 5, 6, 8, 10, 15, 20, 30, 40, 50 ] ).name( 'Tessellation Level' ).onChange( render );
		gui.add( effectController, 'lid' ).name( 'display lid' ).onChange( render );
		gui.add( effectController, 'body' ).name( 'display body' ).onChange( render );
		gui.add( effectController, 'bottom' ).name( 'display bottom' ).onChange( render );
		gui.add( effectController, 'fitLid' ).name( 'snug lid' ).onChange( render );
		gui.add( effectController, 'nonblinn' ).name( 'original scale' ).onChange( render );
		gui.add( effectController, 'newShading', [ 'wireframe', 'flat', 'smooth', 'glossy', 'textured', 'reflective' ] ).name( 'Shading' ).onChange( render );

	}


	//

	function render() {

		if ( effectController.newTess !== tess ||
			effectController.bottom !== bBottom ||
			effectController.lid !== bLid ||
			effectController.body !== bBody ||
			effectController.fitLid !== bFitLid ||
			effectController.nonblinn !== bNonBlinn ||
			effectController.newShading !== shading ) {

			tess = effectController.newTess;
			bBottom = effectController.bottom;
			bLid = effectController.lid;
			bBody = effectController.body;
			bFitLid = effectController.fitLid;
			bNonBlinn = effectController.nonblinn;
			shading = effectController.newShading;

			createNewTeapot();

		}

		// skybox is rendered separately, so that it is always behind the teapot.
		if ( shading === 'reflective' ) {

			scene.background = textureCube;

		} else {

			scene.background = null;

		}

		renderer.render( scene, camera );

	}

	// Whenever the teapot changes, the scene is rebuilt from scratch (not much to it).
	function createNewTeapot() {

		if ( teapot !== undefined ) {

			teapot.geometry.dispose();
			scene.remove( teapot );

		}

		const geometry = new TeapotGeometry( teapotSize,
			tess,
			effectController.bottom,
			effectController.lid,
			effectController.body,
			effectController.fitLid,
			! effectController.nonblinn );

		teapot = new THREE.Mesh( geometry, materials[ shading ] );

		scene.add( teapot );

	}

</script>

# Glitch Art by Sabato Visconti
![Sabato_Visconti-_glitchy-Flower.gif](/Wk-5B/Sabato_Visconti-_glitchy-Flower.gif)

The shape, speed and percieved randomness of the flower's devolution into nothing more than some abstract polygons turn an otherwise uninteresting 3d model into a chaotic artwork, and it compresses down in a way that reduces its complexity, while arguably maintaining its compressiblity, therefore maintaining it's effective complexity.

Sabato Visconti likely uses three.js to render the rose, and has a function that deletes points on the flower until it gets to a certain number of points, or a percentage of the amount of points it starts with, gradually reducing and holding for a moment, before reversing back and re-adding the points.