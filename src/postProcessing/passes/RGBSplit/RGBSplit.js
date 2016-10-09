import Pass from '@superguigui/wagner/src/Pass';

import vertexShader from 'postProcessing/shaders/basic.vert';
import fragmentShader from './frag.glsl';

/**
 * RGBSplit class
 */
class RGBSplit extends Pass {

  /**
   * constructor method
   * @param {object} options Options
   */
  constructor(options = {}) {
    super();

    this.setShader(vertexShader, fragmentShader);
    this.params.delta = new THREE.Vector2(options.xDelta, options.yDelta);
  }

  /**
   * run method
   * @param {object} composer Composer
   */
  run(composer) {
    this.shader.uniforms.delta.value.copy(this.params.delta);

    composer.pass(this.shader);
  }
}

export default RGBSplit;