import * as THREE from 'three';
import { OrbitControls } from './three/OrbitControls.js';
import Screen from './CaveJS/Screen.js';
import ScreenHelper from './CaveJS/ScreenHelper.js';


const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaabbbb);
const gridHelper = new THREE.GridHelper(10, 10, 0xAAAA00, 0xAAAA00);
scene.add(gridHelper);
const axisHelper = new THREE.AxesHelper( 1 );
scene.add(axisHelper)


export { scene };