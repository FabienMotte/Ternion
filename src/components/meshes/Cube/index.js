import THREE from 'three';
import CubeGeometry from './CubeGeometry';
import CubeMaterial from './CubeMaterial';

/**
 * Cube class
 */
class Cube extends THREE.Mesh {

  /**
   * constructor method
   */
  constructor() {
    super( new CubeGeometry(), new CubeMaterial({ wireframe: true }) );
  }

  /**
   * update method
   * @param {number} time Time
   */
  update( time ) {
    this.material.update( time );
  }
}

export default Cube;