import * as THREE from './three/three.module.js';
import Screen from './CaveJS/Screen.js';
import ScreenHelper from './CaveJS/ScreenHelper.js';


const scene = new THREE.Scene();
scene.background = new THREE.Color(0x889999);
const gridHelper = new THREE.GridHelper(10, 10, 0xAAAA00, 0xAAAA00);
scene.add(gridHelper);
const axisHelper = new THREE.AxesHelper( 1 );
scene.add(axisHelper)

const light = new THREE.PointLight(0xFFFFFF, 100)
light.position.set( -5, 5, 5 )
scene.add(light)

const testCube = new THREE.Mesh( 
    new THREE.BoxGeometry( 1, 1, 1),
    new THREE.MeshStandardMaterial({color: 0xFFFFFF}),
)
testCube.position.set( 1.5, 0, -1.5)
scene.add( testCube )

export { scene };