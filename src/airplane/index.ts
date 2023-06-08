import * as THREE from "three";
import { AirplaneTail, moveCenterTailWing, moveSideTailWings } from "./tail";
import {
  AirplaneLeftWing,
  AirplaneRightWing,
  moveMainSideWings,
} from "./wings";
import { AirplaneBody } from "./body";
import { AirplaneWealsBack, AirplaneWealsFront } from "./weals";
import { Control } from "../main";
import { camera } from "../init";

export const Airplane = new THREE.Group();

// control plane
window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowRight":
    case "KeyD":
      moveCenterTailWing(0.1);
      break;
    case "ArrowLeft":
    case "KeyA":
      moveCenterTailWing(-0.1);
      break;
    case "ArrowUp":
    case "KeyW":
      moveSideTailWings(0.01);
      moveMainSideWings(0.05);
      break;
    case "ArrowDown":
    case "KeyS":
      moveSideTailWings(-0.01);
      moveMainSideWings(-0.05);
      break;
    case "KeyI":
      if (document.querySelector(".information")?.classList.contains("show")) {
        document.querySelector(".information")?.classList.remove("show");
      } else {
        document.querySelector(".information")?.classList.add("show");
      }
      break;
    case "KeyR":
      resetCameraPosition();
      break;
    case "KeyP":
      Control.isMovingCamera = !Control.isMovingCamera;
      break;
  }
});

function resetCameraPosition() {
  camera.position.x = Airplane.position.x + 2;
  camera.position.z = Airplane.position.z + 3;
  camera.position.y = Airplane.position.y + 1;
}

Airplane.add(
  AirplaneBody,
  AirplaneLeftWing,
  AirplaneRightWing,
  AirplaneTail,
  AirplaneWealsFront,
  AirplaneWealsBack
);

export function moveAirplane() {
  if (Control.isEngineOn) {
    Airplane.position.z += 0.01;
  }
}
