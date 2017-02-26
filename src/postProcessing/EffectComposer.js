import { Composer } from '@superguigui/wagner'
import { Window } from 'signals'

/**
 * EffectComposer class
 */
class EffectComposer extends Composer {

  /**
   * constructor method
   * @param {object} renderer Renderer
   * @param {object} options  Options
   */
  constructor (renderer, options) {
    super(renderer, options)

    this.setSize(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio)

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
    this.setSize(width * window.devicePixelRatio, height * window.devicePixelRatio)
  }
}

export default EffectComposer
