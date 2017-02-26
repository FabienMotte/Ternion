import Composer from './Composer'
import { Window } from 'signals'

/**
 * EffectComposer class
 */
class EffectComposer extends Composer {

  /**
   * constructor method
   * @param {Object} renderer Renderer
   */
  constructor (renderer) {
    super(renderer)

    this.renderer = renderer

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
   * @param {number} width  Window width
   * @param {number} height Window height
   */
  onWindowResize (width, height) {
    this.setSize(width * this.renderer.getPixelRatio(), height * this.renderer.getPixelRatio())
  }
}

export default EffectComposer
