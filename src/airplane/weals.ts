import * as THREE from "three";

function getWealGroup() {
  const wealGeometry = new THREE.CylinderGeometry(1, 1, 0.6);
  const wealMaterial = new THREE.MeshBasicMaterial({ color: "black" });
  const weal1 = new THREE.Mesh(wealGeometry, wealMaterial);
  const weal2 = new THREE.Mesh(wealGeometry, wealMaterial);

  const wealConcatGeometry = new THREE.CylinderGeometry(0.2, 0.2, 4);
  const wealConcatMaterial = new THREE.MeshBasicMaterial({ color: "gray" });
  const wealConcat = new THREE.Mesh(wealConcatGeometry, wealConcatMaterial);

  const wealConcat1Geometry = new THREE.CylinderGeometry(0.2, 0.2, 2);
  const wealConcat1 = new THREE.Mesh(wealConcat1Geometry, wealConcatMaterial);
  const wealConcat2 = new THREE.Mesh(wealConcat1Geometry, wealConcatMaterial);

  weal1.position.set(10, -6, 2);
  weal1.rotation.set(Math.PI / 2, Math.PI / 2, 0);
  weal2.position.set(10, -6, -2);
  weal2.rotation.set(Math.PI / 2, Math.PI / 2, 0);
  wealConcat.position.set(10, -6, 0);
  wealConcat.rotation.set(Math.PI / 2, 0, 0);

  wealConcat1.position.set(10, -5, -0.5);
  wealConcat2.position.set(10, -5, 0.5);
  wealConcat1.rotation.set(0, Math.PI / 2, 0);
  wealConcat2.rotation.set(0, Math.PI / 2, 0);
  const AirplaneWeals = new THREE.Group();
  AirplaneWeals.add(weal1, weal2, wealConcat, wealConcat1, wealConcat2);

  return AirplaneWeals;
}

export const AirplaneWealsFront = getWealGroup()
AirplaneWealsFront.position.x = -10;
AirplaneWealsFront.position.y = 1;

export const AirplaneWealsBack = getWealGroup()
AirplaneWealsBack.position.x = 10
AirplaneWealsBack.position.y = -1
