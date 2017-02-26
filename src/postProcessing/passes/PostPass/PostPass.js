import ShaderPass from '../ShaderPass/ShaderPass'
import fragmentShader from './post.frag'

/**
 * PostPass class
 */
class PostPass extends ShaderPass {

  /**
   * constructor method
   */
  constructor () {
    super()

    this.material.uniforms = {
      ...this.material.uniforms,
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uTime: { value: 0 },
      uVignette: { value: 1.9 },
      uRgbSplit: { value: new THREE.Vector2() }
    }

    this.material.fragmentShader = fragmentShader
  }

  /**
   * setSize method
   *
   * @param {number} width  Width
   * @param {number} height Height
   */
  setSize (width, height) {
    this.material.uniforms.uResolution.value = new THREE.Vector2(width, height)
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
  render (renderer, writeBuffer, readBuffer, delta, time, maskActive) {
    super.render(renderer, writeBuffer, readBuffer, delta, time, maskActive)

    this.material.uniforms.uTime.value = time
    renderer.autoClear = false
  }
}

export default PostPass
