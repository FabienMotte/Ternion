import Composer from './Composer'
import Window from 'signals/Window'

class EffectComposer extends Composer {
  constructor (renderer) {
    super(renderer)

    this.renderer = renderer

    this.bind()
  }

  bind () {
    this.onWindowResize = this.onWindowResize.bind(this)
    Window.onResize.add(this.onWindowResize)
  }

  onWindowResize (width, height) {
    this.setSize(width * this.renderer.getPixelRatio(), height * this.renderer.getPixelRatio())
  }
}

export default EffectComposer
