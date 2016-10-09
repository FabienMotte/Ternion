import { BoxGeometry } from 'three';

/**
 * CubeGeometry class
 */
class CubeGeometry extends BoxGeometry {

  /**
   * constructor method
   */
  constructor() {
    super(1, 1, 1);
  }
}

export default CubeGeometry;