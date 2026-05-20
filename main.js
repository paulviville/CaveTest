import * as THREE from 'three';
import { OrbitControls } from './three/OrbitControls.js';
import Screen from './CaveJS/Screen.js';
import ScreenHelper from './CaveJS/ScreenHelper.js';

import caveConfig from './caveConfig.js';
import caveConfigReims from './caveConfigReims.js';
import Cave from './CaveJS/Cave.js';
import CaveHelper from './CaveJS/CaveHelper.js';
import { Quaternion } from './three/three.module.js';


const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.autoClear = false;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaabbbb);
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.01, 50 );
camera.position.set( 1, 4, 5 );
const gridHelper = new THREE.GridHelper(10, 10, 0xAAAA00, 0xAAAA00);
scene.add(gridHelper);
const axisHelper = new THREE.AxesHelper( 1 );
scene.add(axisHelper)
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
