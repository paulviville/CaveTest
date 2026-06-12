
import CaveManager from './CaveJS/CaveManager.js';
import caveConfig from './caveConfig.js';
import { scene } from "./TestScene.js";
import * as THREE from './three/three.module.js';
import ClientManager from "./ClientManager.js";

console.log( "worker" );
self.addEventListener( "message", ( { data } ) => {
    handleMessage( data );
} );

self.addEventListener( "error", e => console.error(e)) 

// self.postMessage( "started ");
console.log(caveConfig)

const caveManager = new CaveManager( caveConfig, self );
caveManager.caveRenderer.setScene( scene );
scene.add( caveManager.caveHelper )
const cave = caveManager.cave
// cave.position = new THREE.Vector3( -1, -1, 1 );
cave.scale = new THREE.Vector3( 1, 1, 1 );
const rotation = new THREE.Quaternion( ).setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), -Math.PI/2)
rotation.multiply( new THREE.Quaternion( ).setFromAxisAngle( new THREE.Vector3( 0, 0, 1), -Math.PI/4) )
cave.rotation = rotation

function handleMessage ( data ) {
    switch ( data.type ) {
        case "canvas":
            caveManager.caveRenderer.addCanvas( data.id, data.canvas );
            caveManager.caveRenderer.start()
            break;
        case "debugCanvas":
            startDebugRender( data.canvas );
            break;
        case "debugCamera":
            updateDebugCamera( data.position, data.quaternion )
            break;
        case "resizeCanvas":
            caveManager.caveRenderer.resizeCanvas( data.id, data.width, data.height );
            break;
        default:
            console.log( data );
            break;
    }
}

const camera = new THREE.PerspectiveCamera( 50, 4/3, 0.01, 500 );
function startDebugRender ( canvas ) {
    // console.log("debug")
    const renderer = new THREE.WebGLRenderer( { canvas: canvas } );
    
camera.position.set( -2, 2, 3 );
camera.lookAt(new THREE.Vector3(0, 0, 0));

    // camera.position.set( -1, 2, -1 );camera.lookAt(new THREE.Vector3(0, 0, 0));
    

renderer.setAnimationLoop( ( ) => {
    caveManager.caveHelper.visible = true;
    renderer.render( scene, camera );
    caveManager.caveHelper.visible = false;
} );
}

function updateDebugCamera ( position, quaternion ) {
    camera.position.fromArray(position);
	camera.quaternion.fromArray(quaternion);
	camera.updateMatrixWorld();
    caveManager.caveHelper.updateScreenCameraHelpers()
}




const clientManager = new ClientManager( );
clientManager.connect( "ws://130.79.90.188", "3000" );
scene.add( clientManager.viewsRegistry )