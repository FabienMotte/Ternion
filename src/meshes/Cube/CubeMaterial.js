import { ShaderMaterial, Color } from 'three';

import vertexShader from './shader/cube.vert';
import fragmentShader from './shader/cube.frag';

/**
 * CubeMaterial class
 */
class CubeMaterial extends ShaderMaterial {

  /**
   * constructor method
   * @param {Object} options Options
   */
  constructor(options) {
    super(options);

    this.vertexShader   = vertexShader;
    this.fragmentShader = fragmentShader;

    this.uniforms = {
      time: { type: 'f', value: 0.0 },
      color: { type: 'c', value: new Color(0xffffff) }
    }
  }

  /**
   * update method
   * @param {number} time Time
   */
  update(time) {
    this.uniforms.time.value = time * 0.3;
  }
}

export default CubeMaterial;