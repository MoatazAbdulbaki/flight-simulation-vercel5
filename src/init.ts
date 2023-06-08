import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import {
  CAMERA_STARTING_POSITION,
  MAX_DISTANCE,
  MIN_DISTANCE,
} from "./constants";
import { Airplane } from "./airplane";
import { Control } from "./main";

// Debug, this is the control panel we will need it to change the physics later
export const gui = new dat.GUI({ closed: true });

// Canvas three.js stuff
export const canvas: HTMLElement = document.querySelector("#webgl")!;

// Scene three.js stuff
export const scene = new THREE.Scene();

const stats = new Stats();
document.body.appendChild(stats.dom);

// Sizes, to determine the screen edges, we will need this to keep the scene good looking when the user resize the browser window
export const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
let aspect = sizes.width / sizes.height;
export const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1200);
// next three lines will set the camera starting position
camera.position.setX(CAMERA_STARTING_POSITION.x);
camera.position.setY(CAMERA_STARTING_POSITION.y);
camera.position.setZ(CAMERA_STARTING_POSITION.z);
scene.add(camera);

// Renderer, three.js stuff
export const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

// Utilities
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  aspect = sizes.width / sizes.height;
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);
});
window.addEventListener("dblclick", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    canvas.requestFullscreen();
  }
});

let toggleCamera = false;
const movingCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1200);
scene.add(movingCamera)

// Controls this is to control the objects by mouse, rotate and drag&drop, i think we don't need it but I'll keep it for the meantime
export const controls = new OrbitControls(camera, canvas);
export const controls2 = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = MAX_DISTANCE;
controls.minDistance = MIN_DISTANCE;
controls.maxPolarAngle = Math.PI / 2.2; // radians
controls.mouseButtons = {
  LEFT: THREE.MOUSE.ROTATE,
  MIDDLE: THREE.MOUSE.DOLLY,
  RIGHT: THREE.MOUSE.PAN,
};
controls.touches = {
  ONE: THREE.TOUCH.ROTATE,
  TWO: THREE.TOUCH.ROTATE,
};
controls.update();

// three.js stuff
export function render() {
  if(!toggleCamera) {
    renderer.render(scene, camera);
  } else {
    renderer.render(scene, movingCamera);
    
  }
}
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);
movingCamera.rotateX(-2.5)
movingCamera.rotateZ(Math.PI)
// this is infinite loop, we will use it as a starting point
export function MainAnimationLoop(...arg: Function[]) {
  arg.forEach((func) => {
    func();
  });
  stats.update();
  controls.update();
  render();
  window.requestAnimationFrame(() => {
    MainAnimationLoop(...arg);
  });
}


export function setMovingCameraPosition() {
  if (Control.isMovingCamera && !toggleCamera) {
    toggleCamera = true;
  } else if (toggleCamera && !Control.isMovingCamera) {
    toggleCamera = false;
  }
  movingCamera.position.x = Airplane.position.x;
  movingCamera.position.z = Airplane.position.z -1;
  movingCamera.position.y = Airplane.position.y + 0.5;
}
