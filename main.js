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

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.autoClear = false;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.01, 50 );
camera.position.set( 1, 4, 5 );
const orbitControls = new OrbitControls( camera, renderer.domElement );

renderer.setAnimationLoop( animate );

function animate ( ) {
	renderer.render( scene, camera );
}




// const screen0 = new Screen( )
// const screenHelper0 = new ScreenHelper( screen0 );
// scene.add(screenHelper0)

let { screens } = caveConfig;
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
cave.position = new THREE.Vector3( -0.85, -1, 0.85 );
cave.scale = new THREE.Vector3( 2, 2, 2);
const rotation = new Quaternion( ).setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), -Math.PI/2)
rotation.multiply( new Quaternion( ).setFromAxisAngle( new THREE.Vector3( 0, 0, 1), -Math.PI/4) )
cave.rotation = rotation

const headMatrix = new THREE.Matrix4( );
headMatrix.compose( 
	new THREE.Vector3( 0, 0, 1 ),
	new Quaternion( ),
	new THREE.Vector3( 1, 1, 1 ) 
)

cave.updateScreenCameras( headMatrix );
caveHelper.updateScreenCameraHelpers()

const { stereoMode } = caveConfig;


const { windows } = caveConfig;
const caveWindows = new Map( );
const caveRenderers = new Map( );
for ( const windowData of windows ) {
	console.log(windowData)
	const caveWindow = new CaveWindow(
		windowData.id,
		windowData.name,
		windowData.width,
		windowData.height,
		{ 
			onLoad: ( canvas ) => {
				const windowRenderer = new THREE.WebGLRenderer( { canvas: canvas } );
				windowRenderer.setScissorTest(true);
				caveRenderers.set( windowData.id, windowRenderer );
			}
		}
	);
	caveWindow.open( windowData.display );
	caveWindows.set( windowData.id, caveWindow );
}

console.log( caveRenderers )
const caveViewports = new Map( );
const windowViewports = new Map( );
const { viewports } = caveConfig;
for ( const viewportData of viewports ) {
	caveViewports.set( viewportData.id, { ...viewportData } );
	if( windowViewports.get( viewportData.window ) === undefined ) 
		windowViewports.set( viewportData.window, [ ] );

	windowViewports.get( viewportData.window ).push( viewportData.id );
}
console.log(caveViewports)


function caveRenderLoop ( time ) {
	// console.log(time)
	for ( const [ windowId, caveWindow ] of caveWindows ) {
		console.log( )
		const windowRenderer = caveRenderers.get( windowId );
		if ( windowRenderer === undefined )
			continue;

		const viewports = windowViewports.get( windowId );
		for ( const viewportId of viewports ) {
			const viewport = caveViewports.get( viewportId );
			windowRenderer.render( scene, camera )
		}
	}
	requestAnimationFrame( caveRenderLoop );
}
requestAnimationFrame( caveRenderLoop );

// renderer.setAnimationLoop( animate );

// function animate ( ) {
// 	renderer.render( scene, camera );
// }

// const caveScreensReims = [ ];
// for ( const screenData of caveConfigReims.screens ) {
// 	const corners = screenData.corners.map( corner => new THREE.Vector3( ...corner ) )
// 	console.log( corners )
// 	const screen = new Screen( corners );
// 	caveScreensReims.push( screen );
// }
// const caveReims = new Cave( caveScreensReims );
// const caveHelperReims = new CaveHelper( caveReims );
// scene.add( caveHelperReims )

// caveReims.position = new THREE.Vector3( -3, -1, 3 );
// caveReims.rotation = new Quaternion( ).setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), -Math.PI/2)

// const caveWindow0 = new CaveWindow( "test0" );
// const caveWindow1 = new CaveWindow( "test1" );

// caveWindow0.open( 0 )
// caveWindow1.open( 1 )

window.addEventListener( "beforeunload", ( ) => {
	caveWindows.forEach( caveWindow => caveWindow.close( ) );
} );



