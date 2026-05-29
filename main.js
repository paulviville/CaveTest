import * as THREE from 'three';
import { OrbitControls } from './three/OrbitControls.js';
import Screen from './CaveJS/Screen.js';
import ScreenHelper from './CaveJS/ScreenHelper.js';

import caveConfig from './caveConfig.js';
import caveConfigReims from './caveConfigReims.js';
import Cave from './CaveJS/Cave.js';
import CaveHelper from './CaveJS/CaveHelper.js';
import { Quaternion } from './three/three.module.js';
import CaveWindow from './CaveJS/CaveWindow.js';

import { scene } from "./TestScene.js";
import CaveRenderer from './CaveJS/CaveRenderer.js';

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.autoClear = false;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.01, 500 );
camera.position.set( 1, 4, 5 );
const orbitControls = new OrbitControls( camera, renderer.domElement );

renderer.setAnimationLoop( animate );

function animate ( ) {
	renderer.render( scene, camera );
}""


// const screen0 = new Screen( )
// const screenHelper0 = new ScreenHelper( screen0 );
// scene.add(screenHelper0)

const { screens, stereoMode, viewports, windows } = caveConfig;
const caveScreens = [ ];
for ( const screenData of screens ) {
	const corners = screenData.corners.map( corner => new THREE.Vector3( ...corner ) )
	console.log( corners )
	const screen = new Screen( corners );
	caveScreens.push( screen );
}
const cave = new Cave( caveScreens );
const caveHelper = new CaveHelper( cave );
scene.add( caveHelper )
cave.position = new THREE.Vector3( -1, -1, 1 );
cave.scale = new THREE.Vector3( 1, 1, 1 );
const rotation = new Quaternion( ).setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), -Math.PI/2)
rotation.multiply( new Quaternion( ).setFromAxisAngle( new THREE.Vector3( 0, 0, 1), -Math.PI/4) )
cave.rotation = rotation

const headMatrix = new THREE.Matrix4( );
headMatrix.compose( 
	new THREE.Vector3( 0, 0, 1 ),
	new Quaternion( ),
	new THREE.Vector3( 1, 1, 1 ) 
)

const caveRenderer = new CaveRenderer( cave );
caveRenderer.setScene( scene );
caveRenderer.setStereoMode( stereoMode );

window.caveRenderer = caveRenderer;


cave.updateScreenCameras( headMatrix );
caveHelper.updateScreenCameraHelpers()

const caveWindows = new Map( );
for ( const windowData of windows ) {
	console.log(windowData)
	const caveWindow = new CaveWindow(
		windowData.id,
		windowData.name,
		windowData.width,
		windowData.height,
		{ 
			onLoad: ( canvas ) => {
				// const windowRenderer = new THREE.WebGLRenderer( { canvas: canvas } );
				const windowRenderer = caveRenderer.addCanvas( windowData.id, canvas );
			}
		}
	);
	caveWindow.open( windowData.display );
	caveWindows.set( windowData.id, caveWindow );
}

for ( const viewportData of viewports ) {
	caveRenderer.addViewport( viewportData.id, viewportData );
}

// function animate ( ) {
// 	renderer.render( scene, camera );
// }

const caveScreensReims = [ ];
for ( const screenData of caveConfigReims.screens ) {
	const corners = screenData.corners.map( corner => new THREE.Vector3( ...corner ) )
	console.log( corners )
	const screen = new Screen( corners );
	caveScreensReims.push( screen );
}
const caveReims = new Cave( caveScreensReims );
const caveHelperReims = new CaveHelper( caveReims );
// scene.add( caveHelperReims )

caveReims.position = new THREE.Vector3( -3, -1, 3 );
caveReims.rotation = new Quaternion( ).setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), -Math.PI/2)

window.addEventListener( "beforeunload", ( ) => {
	caveWindows.forEach( caveWindow => caveWindow.close( ) );
} );




