import THREE from 'three';
import Pass from '@superguigui/wagner/src/Pass';

const glslify = require('glslify');
const vertex = glslify( '@superguigui/wagner/src/shaders/vertex/basic.glsl' );
const fragment = glslify( './frag.glsl' );

/**
 * HorizontalTiltShift class
 */
class HorizontalTiltShift extends Pass {

  /**
   * Constructor function
   * @param  {object} options Options
   */
  constructor( options = {} ) {
    super();

    this.setShader( vertex, fragment );
    this.params.h = options.h || 1.0 / window.innerHeight;
    this.params.r = options.r || 0.35;
  }

  /**
   * Run function
   * @param  {object} composer Composer
   */
  run( composer ) {
    this.shader.uniforms.h.value = this.params.h;
    this.shader.uniforms.r.value = this.params.r;

    composer.pass( this.shader, true );
  }
}

export default HorizontalTiltShift;