import * as THREE from "three";

export const AIRPLANE_MIDDLE_RADIUS = 3;
export const AIRPLANE_HEIGHT = 30;

const image = new Image();
export const mainTexture = new THREE.Texture(image);
image.src = "/textures/AirplaneMaterial-texture.jpeg";
image.onload = () => {
  mainTexture.needsUpdate = true;
};

//in degrees
export const TAIL_CENTER_WING_MAX_ROTATION_ANGLE = 3;
export const TAIL_SIDE_WINGS_MAX_ROTATION_ANGLE = 50;
export const MAIN_SIDE_WINGS_MAX_ROTATION_ANGLE = 50;
