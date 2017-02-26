import { Window } from 'signals'

/**
 * Renderer class
 */
class Renderer extends THREE.WebGLRenderer {

  /**
   * constructor method
   * @param {object} options Options
   */
  constructor (options = { antialias: true, alpha: true }) {
    super(options)

    this.setSize(window.innerWidth, window.innerHeight)
    this.setPixelRatio(window.devicePixelRatio)
    this.setClearColor(0x0a0a0a, 1.0)

    this.bind()
  }

  /**
   * bind method
   */
  bind () {
    this.onWindowResize = this.onWindowResize.bind(this)
    Window.onResize.add(this.onWindowResize)
  }

  /**
   * onWindowResize method
   * @param {number} width  Width
   * @param {number} height Height
   */
  onWindowResize (width, height) {
    this.setSize(width, height)
  }
}

export default Renderer
