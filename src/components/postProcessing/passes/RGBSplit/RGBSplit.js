import THREE from 'three';
import Pass from '@superguigui/wagner/src/Pass';

const glslify = require('glslify');
const vertex = glslify( '@superguigui/wagner/src/shaders/vertex/basic.glsl' );
const fragment = glslify( './frag.glsl' );

/**
 * RGBSplit class
 */
class RGBSplit extends Pass {

  /**
   * Constructor function
   * @param  {object} options Options
   */
  constructor( options = {} ) {
    super();

    this.setShader( vertex, fragment );
    this.params.delta = new THREE.Vector2( options.xDelta, options.yDelta );
  }

  /**
   * Run function
   * @param  {object} composer Composer
   */
  run( composer ) {
    this.shader.uniforms.delta.value.copy( this.params.delta );

    composer.pass( this.shader );
  }
}

export default RGBSplit;