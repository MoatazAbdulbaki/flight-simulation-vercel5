import * as THREE from "three";

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 20, 0);
directionalLight2.position.set(0, -20, 0);

export const mainDirectionalLights = new THREE.Group();
mainDirectionalLights.add(directionalLight, directionalLight2);
