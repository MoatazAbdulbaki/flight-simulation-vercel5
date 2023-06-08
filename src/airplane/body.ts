import * as THREE from "three";
import {
  AIRPLANE_HEIGHT,
  AIRPLANE_MIDDLE_RADIUS,
  mainTexture,
} from "./constants";

const AirplaneBodyGeometry = new THREE.CapsuleGeometry(
  AIRPLANE_MIDDLE_RADIUS,
  AIRPLANE_HEIGHT / 2,
  50,
  50
);
const AirplaneBody2Geometry = new THREE.CapsuleGeometry(
  AIRPLANE_MIDDLE_RADIUS,
  AIRPLANE_HEIGHT / 1.75,
  50,
  50
);
const AirplaneBodyMaterial = new THREE.MeshBasicMaterial({
  map: mainTexture,
  color: "#fff",
});
const AirplaneBodyMesh = new THREE.Mesh(
  AirplaneBodyGeometry,
  AirplaneBodyMaterial
);
const AirplaneBody2Mesh = new THREE.Mesh(
  AirplaneBody2Geometry,
  AirplaneBodyMaterial
);

AirplaneBodyGeometry.rotateZ(80);
AirplaneBody2Geometry.rotateZ(80);
AirplaneBody2Mesh.position.x = AIRPLANE_HEIGHT / 2;
AirplaneBody2Mesh.position.y = -0.054 * AIRPLANE_HEIGHT;

const AirplaneHeadGeometry = new THREE.CylinderGeometry(
  AIRPLANE_MIDDLE_RADIUS,
  AIRPLANE_MIDDLE_RADIUS / 5,
  AIRPLANE_HEIGHT / 6
);
const AirplaneHeadMesh = new THREE.Mesh(
  AirplaneHeadGeometry,
  AirplaneBodyMaterial
);
AirplaneHeadMesh.position.x = 0.58 * AIRPLANE_HEIGHT;
AirplaneHeadMesh.position.y = -0.058 * AIRPLANE_HEIGHT;
AirplaneHeadMesh.rotateZ(-80.2);

export const AirplaneBody = new THREE.Group();
AirplaneBody.add(AirplaneBodyMesh, AirplaneBody2Mesh);
