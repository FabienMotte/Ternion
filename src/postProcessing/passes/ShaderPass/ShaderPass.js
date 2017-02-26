import Pass from '../Pass'
import vertexShader from '../../shaders/basic.vert'
import fragmentShader from '../../shaders/copy.frag'

/**
 * ShaderPass class
 */
class ShaderPass extends Pass {

  /**
   * constructor function
   */
  constructor(shader) {
    super()

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        tInput: { value: null },
        uOpacity: { value: 1.0 }
      },
      vertexShader,
      fragmentShader
    });

    this.camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0, 1)
    this.scene = new THREE.Scene()

    this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), this.material)
    this.scene.add(this.quad)
  }

  /**
   * render method
   * @param {Object}  renderer    Renderer
   * @param {Object}  writeBuffer Write buffer
   * @param {Object}  readBuffer  Read buffer
   * @param {number}  delta       Delta
   * @param {number}  time        Time
   * @param {boolean} maskActive  Mask active
   */
  render(renderer, writeBuffer, readBuffer, delta, time, maskActive) {
    this.material.uniforms['tInput'].value = readBuffer.texture

    if (this.renderToScreen) {
      renderer.render(this.scene, this.camera)
    } else {
      renderer.render(this.scene, this.camera, writeBuffer, this.clear)
    }
  }
}

export default ShaderPass;
