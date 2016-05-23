import THREE from 'three';

/**
 * CubeGeometry class
 */
class CubeGeometry extends THREE.BoxGeometry {

  /**
   * Constructor function
   */
  constructor() {
    super( 1, 1, 1 );
  }
}

export default CubeGeometry;