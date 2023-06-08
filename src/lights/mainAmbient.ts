import * as THREE from "three";

const ambientLight1 = new THREE.AmbientLight("#fff", 2);
export const mainAmbientLights = new THREE.Group();
mainAmbientLights.add(ambientLight1);
