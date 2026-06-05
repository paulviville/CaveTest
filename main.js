import * as THREE from './three/three.module.js';
import { OrbitControls } from './three/OrbitControls.js';
import Screen from './CaveJS/Screen.js';
import ScreenHelper from './CaveJS/ScreenHelper.js';
import CaveManager from './CaveJS/CaveManager.js';

import caveConfig from './caveConfig.js';
import caveConfigReims from './caveConfigReims.js';
import Cave from './CaveJS/Cave.js';
import CaveHelper from './CaveJS/CaveHelper.js';
import { Quaternion } from './three/three.module.js';
import CaveWindow from './CaveJS/CaveWindow.js';

import { scene } from "./TestScene.js";
import CaveRenderer from './CaveJS/CaveRenderer.js';
import WindowsManager from './WindowsManager.js';

// const renderer = new THREE.WebGLRenderer({antialias: true});
// renderer.autoClear = false;
// renderer.setPixelRatio( window.devicePixelRatio );
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );


// const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.01, 500 );
// camera.position.set( 1, 4, 5 );
// const orbitControls = new OrbitControls( camera, renderer.domElement );

// renderer.setAnimationLoop( animate );

// function animate ( ) {
// 	renderer.render( scene, camera );
// }

// const caveManager = new CaveManager( caveConfig )



// const cave = caveManager.cave
// // const caveHelper = new CaveHelper( cave );
// const caveHelper = caveManager.caveHelper ;
// scene.add( caveHelper )
// // cave.position = new THREE.Vector3( -1, -1, 1 );
// // cave.scale = new THREE.Vector3( 1, 1, 1 );
// const rotation = new Quaternion( ).setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), -Math.PI/2)
// rotation.multiply( new Quaternion( ).setFromAxisAngle( new THREE.Vector3( 0, 0, 1), -Math.PI/4) )
// cave.rotation = rotation

// const headMatrix = new THREE.Matrix4( );
// headMatrix.compose( 
// 	new THREE.Vector3( 0., 0., 2 ),
// 	new Quaternion( ),
// 	new THREE.Vector3( 1, 1, 1 ) 
// )

// const caveRenderer = caveManager.caveRenderer;
// caveRenderer.preRender = ( ) => {
// 	caveHelper.visible = false;
// }
// caveRenderer.postRender = ( ) => {
// 	caveHelper.visible = true;
// }

// caveRenderer.setScene( scene );

// window.caveRenderer = caveRenderer;


// cave.updateScreenCameras( headMatrix );
// caveHelper.updateScreenCameraHelpers()





// window.moveHead = function ( x, y, z ) {
// 	headMatrix.compose( 
// 		new THREE.Vector3( x, y, z ),
// 		new Quaternion( ),
// 		new THREE.Vector3( 1, 1, 1 ) 
// 	)

// 	cave.updateScreenCameras( headMatrix );
// 	caveHelper.updateScreenCameraHelpers( );
// }

// window.transformCave = function ( x, y, z, s ) {
// 	cave.position = new THREE.Vector3( x, y, z );
// 	cave.scale = new THREE.Vector3( s, s, s );
	
// 	cave.updateScreenCameras( headMatrix );
// 	caveHelper.updateScreenCameraHelpers( );
// }

const windowsManager = new WindowsManager( );

const renderWorker = new Worker( "./renderWorker.js", { type: "module" } );
renderWorker.addEventListener( "message", ( { data } ) => {
    console.log( data );
    renderWorker.postMessage(`received ${ data.type }`)
    handleMessages( data );
} );
renderWorker.addEventListener( "error", e => console.error(e)) 

function handleMessages ( data ) {
    switch ( data.type ) {
        case "addWindow": 
            windowsManager.addWindow( data.windowData, {
                onLoad: ( id, canvas ) => {
                    const offScreenCanvas = canvas.transferControlToOffscreen( );

                    renderWorker.postMessage( {
                        type: "canvas",
                        id: id,
                        canvas: offScreenCanvas
                    }, [ offScreenCanvas ] );
                },
                onResize: ( id, width, height ) => {
                    renderWorker.postMessage({ type: "resizeCanvas", id, width, height } );
                }
            } );
            break;
        default:
            break;
    }
}

const canvas = document.createElement( "canvas" );
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild( canvas );
const offScreenCanvas = canvas.transferControlToOffscreen( );
renderWorker.postMessage( {
    type: "debugCanvas",
    canvas: offScreenCanvas
}, [ offScreenCanvas ] );

// const worldUp = new THREE.Vector3(0, 0, 1);
const camera = new THREE.PerspectiveCamera( 70, 4/3, 0.1, 1 );
// camera.up.copy(worldUp);
camera.position.set( -2, 2, 3 );
camera.lookAt(new THREE.Vector3(0, 0, 0));
camera.updateMatrixWorld()

const controls = new OrbitControls(camera, canvas);
controls.addEventListener("change", () => {
    renderWorker.postMessage({ type: "debugCamera", position: camera.position.toArray(), quaternion: camera.quaternion.toArray()});

})