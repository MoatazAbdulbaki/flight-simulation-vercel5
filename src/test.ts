import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const canvas: HTMLElement = document.querySelector("#webgl")!;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

const texture = new THREE.TextureLoader().load(
  "assets/textures/AirplaneMaterial-texture.jpeg"
);

const geometry = new THREE.BoxGeometry(100, 90, 1900);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6666,
  map: texture,
  side: THREE.BackSide,
});
const material2 = new THREE.MeshStandardMaterial({
  color: THREE.Color.NAMES.white,
  map: texture,
  side: THREE.FrontSide,
});

// const ft = new THREE.TextureLoader().load("purplenebula_ft.jpg");
// const bk = new THREE.TextureLoader().load("purplenebula_bk.jpg");
// const up = new THREE.TextureLoader().load("purplenebula_up.jpg");
// const dn = new THREE.TextureLoader().load("purplenebula_dn.jpg");
// const rt = new THREE.TextureLoader().load("purplenebula_rt.jpg");
// const lf = new THREE.TextureLoader().load("purplenebula_lf.jpg");

// const faceMat = new THREE.MeshMaterial([material2, material]);

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(8, 10, 10);

// const ambientLight = new THREE.AmbientLight(0xffffff);
// ambientLight.position.set(10, 10, 10);

scene.add(pointLight);

scene.background = texture;

function animate() {
  requestAnimationFrame(animate);

  //   cube.rotation.z += 0.01;
  //   cube.rotation.y += 0.01;
  // cube.position.y += 0.1;

  controls.update();
  renderer.render(scene, camera);
}
animate();
