import * as THREE from "three";

class Engine {
  private mesh: THREE.Mesh;

  constructor(
    private radiusBottom: number = 2,
    private radiusTop: number = 2,
    private position: THREE.Vector3 = new THREE.Vector3(0, 0, 0),
    private rotation: THREE.Euler = new THREE.Euler(0, 0, 0),
    private scale: THREE.Vector3 = new THREE.Vector3(1, 1, 1),
    private material: THREE.Material = new THREE.MeshBasicMaterial({
      color: "#fff",
    })
  ) {
    const points = [];
    for (let i = 0; i < 10; i++) {
      points.push(
        // @ts-ignore
        new THREE.Vector2(
          Math.sin(i * 0.2) * radiusBottom + radiusTop,
          (i - radiusTop) * radiusTop
        )
      );
    }
    const geometry = new THREE.LatheGeometry(points);
    this.mesh = new THREE.Mesh(geometry, material);

    this.mesh.position.copy(position);
    this.mesh.rotation.copy(rotation);
    this.mesh.scale.copy(scale);
  }

  getMesh() {
    return this.mesh;
  }
}

export default Engine;
