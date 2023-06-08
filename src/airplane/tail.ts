import * as THREE from "three";
import { BoxGeometry, Mesh } from "three";
import TrapezoidGeometry from "../trapezoid";
import { degreesToRadians } from "../utils";
import {
  AIRPLANE_HEIGHT,
  AIRPLANE_MIDDLE_RADIUS,
  mainTexture,
  TAIL_CENTER_WING_MAX_ROTATION_ANGLE,
  TAIL_SIDE_WINGS_MAX_ROTATION_ANGLE,
} from "./constants";
import { jonaihMaterial } from "./wings";

const TAIL_TOP_WIDTH = 1;
const TAIL_BOTTOM_WIDTH = 3;
const TAIL_DEPTH = 7;

const TailBodyGeometry = new THREE.ConeGeometry(
  AIRPLANE_MIDDLE_RADIUS - AIRPLANE_MIDDLE_RADIUS / 10,
  AIRPLANE_HEIGHT / 5,
  32,
  32,
  true,
  0
);
const TailBodyMaterial = new THREE.MeshBasicMaterial({
  map: mainTexture,
  color: "#fff",

  side: THREE.DoubleSide,
});
const TailBodyMesh = new THREE.Mesh(TailBodyGeometry, TailBodyMaterial);
TailBodyMesh.position.x = AIRPLANE_HEIGHT - AIRPLANE_HEIGHT / 14 + 0.1;
TailBodyMesh.position.y = -AIRPLANE_HEIGHT / 16;
TailBodyMesh.rotateZ(degreesToRadians(-81));
TailBodyMesh.rotateY(degreesToRadians(-30));

const TailLeftWing = new TrapezoidGeometry(
  TAIL_TOP_WIDTH,
  TAIL_BOTTOM_WIDTH,
  TAIL_DEPTH,
  0.5,
  new THREE.MeshStandardMaterial({
    map: mainTexture,
    color: "#fff",
    roughness: 0.5,
    metalness: 0.5,
  }),
  new THREE.Vector3(AIRPLANE_HEIGHT - AIRPLANE_HEIGHT / 12, -1.3, -5),
  new THREE.Euler(-190.05, 0.05, -0.36)
);

const TailRightWing = new TrapezoidGeometry(
  TAIL_BOTTOM_WIDTH,
  TAIL_TOP_WIDTH,
  TAIL_DEPTH,
  0.5,
  new THREE.MeshStandardMaterial({
    map: mainTexture,
    color: "#fff",
    roughness: 0.5,
    metalness: 0.5,
  }),
  new THREE.Vector3(AIRPLANE_HEIGHT - AIRPLANE_HEIGHT / 12, -1.5, 5),
  new THREE.Euler(-190.05, 0.05, 0.36)
);

const TailCenterWing = new TrapezoidGeometry(
  TAIL_TOP_WIDTH,
  TAIL_BOTTOM_WIDTH,
  TAIL_DEPTH,
  0.5,
  new THREE.MeshStandardMaterial({
    map: mainTexture,
    color: "#fff",
    roughness: 0.5,
    metalness: 0.5,
  }),
  new THREE.Vector3(AIRPLANE_HEIGHT - AIRPLANE_HEIGHT / 12, 2.5, 0),
  // move y
  new THREE.Euler(0, 0, degreesToRadians(-20))
);

const tailJonaihGeometry = new BoxGeometry(6, 0.1, 0.3);
const leftTailJonaih = new Mesh(tailJonaihGeometry, jonaihMaterial);
leftTailJonaih.position.x = 28.7;
leftTailJonaih.position.z = -5;
leftTailJonaih.position.y = -1.5;
leftTailJonaih.rotateY(Math.PI / 2 - 0.22);

const rightTailJonaih = new Mesh(tailJonaihGeometry, jonaihMaterial);
rightTailJonaih.position.x = 28.7;
rightTailJonaih.position.z = 5;
rightTailJonaih.position.y = -1.7;
rightTailJonaih.rotateY(Math.PI / 2 + 0.22);
rightTailJonaih.rotateZ(0.03);

const centerTailJonaihGeometry = new BoxGeometry(6, 0.3, 0.1);
const centerTailJonaih = new Mesh(centerTailJonaihGeometry, jonaihMaterial);
centerTailJonaih.position.x = 28.6;
centerTailJonaih.position.y = 2.6;


centerTailJonaih.rotateZ(1.35);


export const AirplaneTail = new THREE.Group();
AirplaneTail.add(
  TailBodyMesh,
  TailLeftWing.getMesh(),
  TailRightWing.getMesh(),
  TailCenterWing.getMesh(),
  leftTailJonaih,
  rightTailJonaih,
  centerTailJonaih
);

export function moveCenterTailWing(value: number) {
  if (
    value > 0 &&
    centerTailJonaih.rotation.x<
      degreesToRadians(TAIL_CENTER_WING_MAX_ROTATION_ANGLE)
  ) {
    centerTailJonaih.rotateX(value);
  }
  if (
    value < 0 &&
    centerTailJonaih.rotation.x>
      degreesToRadians(-TAIL_CENTER_WING_MAX_ROTATION_ANGLE)
  ) {
    centerTailJonaih.rotateX(value);
  }
}

export function moveSideTailWings(value: number) {
  if (
    value > 0 &&
    leftTailJonaih.rotation.x <
      degreesToRadians(TAIL_SIDE_WINGS_MAX_ROTATION_ANGLE)
  ) {
    leftTailJonaih.rotateX(value);
    rightTailJonaih.rotateX(value);
  }
  if (
    value < 0 &&
    leftTailJonaih.rotation.x >
      degreesToRadians(-TAIL_SIDE_WINGS_MAX_ROTATION_ANGLE)
  ) {
    leftTailJonaih.rotateX(value);
    rightTailJonaih.rotateX(value);
  }
}
