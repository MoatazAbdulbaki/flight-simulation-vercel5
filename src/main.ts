import * as THREE from "three";
import { Airplane, moveAirplane } from "./airplane";
import {
  camera,
  controls,
  gui,
  renderer,
  scene,
  sizes,
  MainAnimationLoop,
  setMovingCameraPosition,
} from "./init";
import { mainAmbientLights } from "./lights/mainAmbient";
import { mainDirectionalLights } from "./lights/mainDirectional";
import { floorGroup } from "./environment";
import { colorizeJonaih, EngineOnOff } from "./airplane/wings";

let PreControlValue = {
  displayMovingParts: false,
  isEngineOn: false,
  isMovingCamera: false,
};
export let Control = {
  displayMovingParts: false,
  isEngineOn: false,
  isMovingCamera: false,
};
gui.add(Control, "displayMovingParts");

function colorizeMovingParts() {
  if (Control.displayMovingParts !== PreControlValue.displayMovingParts) {
    PreControlValue.displayMovingParts = Control.displayMovingParts;
    colorizeJonaih(Control.displayMovingParts);
  }
}

scene.add(mainAmbientLights, mainDirectionalLights);

Airplane.scale.set(0.02, 0.02, 0.02);
Airplane.position.set(0, 0.13, 0);
Airplane.rotateY(1.5);
Airplane.rotateZ(0.1);

scene.add(Airplane);
scene.add(floorGroup);
MainAnimationLoop(EngineOnOff, colorizeMovingParts,moveAirplane,setMovingCameraPosition);
