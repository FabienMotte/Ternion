import THREE from 'three';
import Pass from '@superguigui/wagner/src/Pass';

const glslify = require('glslify');
const vertex = glslify( '@superguigui/wagner/src/shaders/vertex/basic.glsl' );
const fragment = glslify( './frag.glsl' );

/**
 * GodrayPass class
 */
class GodrayPass extends Pass {

  /**
   * Constructor function
   * @param  {object} options Options
   */
  constructor( options = {} ) {
    super();

    this.setShader( vertex, fragment );

    this.width = options.width || 512;
    this.height = options.height || 512;

    this.params.fX = options.fX || 0.5;
    this.params.fY = options.fY || 0.5;
    this.params.fExposure = options.fExposure || 0.6;
    this.params.fDecay = options.fDecay || 0.93;
    this.params.fDensity = options.fDensity || 0.88;
    this.params.fWeight = options.fWeight || 0.4;
    this.params.fClamp = options.fClamp || 1.0;
  }

  /**
   * Run function
   * @param  {object} composer Composer
   */
  run( composer ) {
    this.shader.uniforms.fX.value = this.params.fX;
    this.shader.uniforms.fY.value = this.params.fY;
    this.shader.uniforms.fExposure.value = this.params.fExposure;
    this.shader.uniforms.fDecay.value = this.params.fDecay;
    this.shader.uniforms.fDensity.value = this.params.fDensity;
    this.shader.uniforms.fWeight.value = this.params.fWeight;
    this.shader.uniforms.fClamp.value = this.params.fClamp;

    composer.pass( this.shader, true );
  }
}

export default GodrayPass;