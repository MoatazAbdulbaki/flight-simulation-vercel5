import * as THREE from "three";

type AnimationCallback = () => void;

class TrapezoidGeometry {
  private geometry: THREE.BufferGeometry;
  private mesh: THREE.Mesh;
  private animationCallbacks: AnimationCallback[];

  constructor(
    private topWidth: number,
    private bottomWidth: number,
    private height: number,
    private depth: number,
    private material: THREE.Material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    }),
    private position: THREE.Vector3 = new THREE.Vector3(0, 0, 0),
    private rotation: THREE.Euler = new THREE.Euler(0, 0, 0),
    private scale: THREE.Vector3 = new THREE.Vector3(1, 1, 1)
  ) {
    this.geometry = new THREE.BufferGeometry();

    const vertices: number[] = [
      -bottomWidth / 2,
      -height / 2,
      -depth / 2,
      bottomWidth / 2,
      -height / 2,
      -depth / 2,
      topWidth / 2,
      height / 2,
      -depth / 2,
      -topWidth / 2,
      height / 2,
      -depth / 2,

      -bottomWidth / 2,
      -height / 2,
      depth / 2,
      bottomWidth / 2,
      -height / 2,
      depth / 2,
      topWidth / 2,
      height / 2,
      depth / 2,
      -topWidth / 2,
      height / 2,
      depth / 2,
    ];

    const indices: number[] = [
      0, 1, 2, 0, 2, 3, 4, 6, 5, 4, 7, 6, 0, 4, 1, 1, 4, 5, 1, 5, 2, 2, 5, 6, 2,
      6, 3, 3, 6, 7, 3, 7, 0, 0, 7, 4,
    ];

    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(vertices), 3)
    );
    this.geometry.setIndex(indices);

    this.geometry.computeVertexNormals();

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.copy(this.position);
    this.mesh.scale.copy(this.scale);
    this.mesh.rotation.copy(this.rotation);
  }

  public getMesh(): THREE.Mesh {
    return this.mesh;
  }
}

export default TrapezoidGeometry;
