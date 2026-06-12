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