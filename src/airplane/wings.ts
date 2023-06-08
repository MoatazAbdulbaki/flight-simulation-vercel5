import * as THREE from "three";
import { BoxGeometry, Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import { COLORIZE_COLOR } from "../constants";
import { Control } from "../main";
import TrapezoidGeometry from "../trapezoid";
import TriangleGeometry from "../triangle";
import { degreesToRadians } from "../utils";
import { mainTexture, MAIN_SIDE_WINGS_MAX_ROTATION_ANGLE } from "./constants";
import Engine from "./engine";

const flowerMaterial = new MeshBasicMaterial({
  color: "gray",
  side: THREE.DoubleSide,
});
function getSubFlower() {
  const rightFlower = new PlaneGeometry(3.75, 0.5);
  const flowerMesh = new THREE.Mesh(rightFlower, flowerMaterial);
  flowerMesh.rotateY(Math.PI / 2);
  return flowerMesh;
}

function getFlower(position: THREE.Vector3) {
  const flowerMesh1 = getSubFlower();
  const flowerMesh2 = getSubFlower();
  const flowerMesh3 = getSubFlower();
  const flowerMesh4 = getSubFlower();
  const flowerMesh5 = getSubFlower();
  const flowerMesh6 = getSubFlower();
  flowerMesh2.rotateZ(Math.PI / 3);
  flowerMesh3.rotateZ(Math.PI / 6);
  flowerMesh4.rotateZ(-Math.PI / 3);
  flowerMesh5.rotateZ(-Math.PI / 6);
  flowerMesh6.rotateZ(Math.PI / 2);
  const flowerGroup = new THREE.Group();
  flowerGroup.add(
    flowerMesh1,
    flowerMesh2,
    flowerMesh3,
    flowerMesh4,
    flowerMesh5,
    flowerMesh6
  );
  flowerGroup.position.copy(position);
  return flowerGroup;
}

const leftWingPart1 = new TrapezoidGeometry(
  9,
  5.5,
  10,
  0.5,
  new THREE.MeshStandardMaterial({
    color: "#fff",
    roughness: 0.5,
    metalness: 0.5,
  }),
  new THREE.Vector3(10, 0, 5.29),
  new THREE.Euler(-190.05, 0, 0)
);

const leftWingPart2 = new TriangleGeometry(
  [18, 10, 6.5],
  [Math.PI / 2, 1.7, Math.PI / 3],
  0.5,
  new THREE.Vector3(7.2, -0.25, 10.3),
  new THREE.Euler(degreesToRadians(-90), 0, degreesToRadians(-70)),
  new THREE.Vector3(1, 1, 1),
  new THREE.MeshBasicMaterial({ map: mainTexture })
);

const leftFlower = getFlower(new THREE.Vector3(6.5, -2, -8));

const leftEngine = new Engine(
  2,
  1,
  new THREE.Vector3(12, -2, -8),
  new THREE.Euler(0, 0, Math.PI / 2),
  new THREE.Vector3(0.7, 0.7, 0.7)
);
const leftJonaihGeometry1 = new BoxGeometry(6, 0.1, 0.3);
export const jonaihMaterial = new THREE.MeshBasicMaterial({
  color: "#fff",
});

const leftJonaih1 = new Mesh(leftJonaihGeometry1, jonaihMaterial);
leftJonaih1.position.x = 13.9;
leftJonaih1.position.z = 5;
leftJonaih1.rotateY(Math.PI / 2 - 0.17);

const leftJonaihGeometry2 = new BoxGeometry(15, 0.1, 0.3);
const leftJonaih2 = new Mesh(leftJonaihGeometry2, jonaihMaterial);
leftJonaih2.position.x = 13.3;
leftJonaih2.position.z = 17;
leftJonaih2.rotateY(-Math.PI / 2);
const leftJonaih = new THREE.Group();

leftJonaih.add(leftJonaih1, leftJonaih2);

export const AirplaneLeftWing = new THREE.Group();
AirplaneLeftWing.add(
  leftWingPart1.getMesh(),
  leftWingPart2.getMesh(),
  leftEngine.getMesh(),
  leftFlower,
  leftJonaih
);

const rightWingPart1 = new TrapezoidGeometry(
  5.5,
  9,
  10,
  0.5,
  new THREE.MeshStandardMaterial({
    color: "#fff",
    roughness: 0.5,
    metalness: 0.5,
  }),
  new THREE.Vector3(10, 0.15, -5.29),
  new THREE.Euler(-190.05, 0, 0)
);

const rightWingPart2 = new TriangleGeometry(
  [18, 10, 6.5],
  [Math.PI / 2, -1.7, Math.PI / 3],
  0.5,
  new THREE.Vector3(7.2, 0, -10.3),
  new THREE.Euler(degreesToRadians(-90), 0, degreesToRadians(70)),
  new THREE.Vector3(1, 1, 1),
  new THREE.MeshBasicMaterial({ map: mainTexture })
);

const rightEngine = new Engine(
  2,
  1,
  new THREE.Vector3(14, -2, 14),
  new THREE.Euler(0, 0.1, Math.PI / 2),
  new THREE.Vector3(0.7, 0.7, 0.7)
);

const rightFlower = getFlower(new THREE.Vector3(8.5, -2, 14.6));


window.addEventListener("keypress", (e) => {
  if (e.code === "KeyF") {
    Control.isEngineOn = !Control.isEngineOn;
  }
  if (e.code === "KeyC") {
    Control.displayMovingParts = !Control.displayMovingParts;
  }
});
export const EngineOnOff = () => {
  if (Control.isEngineOn) {
    leftFlower.rotateX(5);
    rightFlower.rotateX(5);
  } else {
    leftFlower.rotation.x = 0;
    rightFlower.rotation.x = 0;
  }
};

const rightJonaihGeometry1 = new BoxGeometry(6, 0.1, 0.3);
const rightJonaih1 = new Mesh(rightJonaihGeometry1, jonaihMaterial);
rightJonaih1.position.x = 13.9;
rightJonaih1.position.z = -5;
rightJonaih1.rotateY(Math.PI / 2 + 0.17);

const rightJonaihGeometry2 = new BoxGeometry(15, 0.1, 0.3);
const rightJonaih2 = new Mesh(rightJonaihGeometry2, jonaihMaterial);
rightJonaih2.position.x = 13.3;
rightJonaih2.position.z = -17;
rightJonaih2.rotateY(-Math.PI / 2);
const rightJonaih = new THREE.Group();

rightJonaih.add(rightJonaih1, rightJonaih2);

export const AirplaneRightWing = new THREE.Group();
AirplaneRightWing.add(
  rightWingPart1.getMesh(),
  rightWingPart2.getMesh(),
  rightEngine.getMesh(),
  rightFlower,
  rightJonaih
);

export function moveMainSideWings(value: number) {
  if (
    value > 0 &&
    leftJonaih1.rotation.x <
      degreesToRadians(MAIN_SIDE_WINGS_MAX_ROTATION_ANGLE)
  ) {
    leftJonaih1.rotateX(value);
    leftJonaih2.rotateX(value);
    rightJonaih1.rotateX(value);
    rightJonaih2.rotateX(value);
  }
  if (
    value < 0 &&
    leftJonaih1.rotation.x >
      degreesToRadians(-MAIN_SIDE_WINGS_MAX_ROTATION_ANGLE)
  ) {
    leftJonaih1.rotateX(value);
    leftJonaih2.rotateX(value);
    rightJonaih1.rotateX(value);
    rightJonaih2.rotateX(value);
  }
}

export function colorizeJonaih(value: boolean) {
  jonaihMaterial.color = value
    ? new THREE.Color(COLORIZE_COLOR)
    : new THREE.Color("white");

  flowerMaterial.color = value
    ? new THREE.Color(COLORIZE_COLOR)
    : new THREE.Color("gray");
}
