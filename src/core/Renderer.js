import { WebGLRenderer } from 'three'
import Window from '../events/Window'

/**
 * Renderer class
 */
class Renderer extends WebGLRenderer {

  /**
   * constructor method
   * @param {object} options Options
   */
  constructor (options = { antialias: true, alpha: true }) {
    super(options)

    this.setSize(window.innerWidth, window.innerHeight)
    this.setPixelRatio(window.devicePixelRatio)
    this.setClearColor(0x0a0a0a, 1.0)

    Window.add(this.resize.bind(this))
  }

  /**
   * resize method
   * @param {number} width  Width
   * @param {number} height Height
   */
  resize (width, height) {
    this.setSize(width, height)
  }
}

export default Renderer
