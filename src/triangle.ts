import * as THREE from "three";

class TriangleGeometry {
  private ribsLength: [number, number, number];
  private angles: [number, number, number];
  private thickness: number;
  private position: THREE.Vector3;
  private rotation: THREE.Euler;
  private scale: THREE.Vector3;
  private material?: THREE.Material;

  constructor(
    ribsLength: [number, number, number],
    angles: [number, number, number],
    thickness: number,
    position: THREE.Vector3,
    rotation: THREE.Euler,
    scale: THREE.Vector3,
    material?: THREE.Material
  ) {
    this.ribsLength = ribsLength;
    this.angles = angles;
    this.thickness = thickness;
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
    this.material = material;
  }

  getMesh(): THREE.Mesh {
    const [a, b, c] = this.ribsLength;
    const [alpha, beta, gamma] = this.angles;
    const depth = this.thickness;

    // Create the triangle geometry
    const geometry = new THREE.ExtrudeGeometry(
      new THREE.Shape([
        new THREE.Vector2(0, 0),
        new THREE.Vector2(a, 0),
        new THREE.Vector2(c * Math.cos(beta), c * Math.sin(beta)),
      ]),
      { depth: depth, bevelEnabled: false }
    );

    // Create the mesh
    const mesh = new THREE.Mesh(geometry, this.material);

    // Set position, rotation, and scale
    mesh.position.copy(this.position);
    mesh.rotation.copy(this.rotation);
    mesh.scale.copy(this.scale);

    return mesh;
  }
}

export default TriangleGeometry;
