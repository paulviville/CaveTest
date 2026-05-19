import * as THREE from 'three';
import { OrbitControls } from './three/OrbitControls.js';
import Screen from './CaveJS/Screen.js';
import ScreenHelper from './CaveJS/ScreenHelper.js';

import caveConfig from './caveConfig.js';
import caveConfigReims from './caveConfigReims.js';
import Cave from './CaveJS/Cave.js';
import CaveHelper from './CaveJS/CaveHelper.js';


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