import Window from 'signals/Window'

class Renderer extends THREE.WebGLRenderer {
  constructor (options = { antialias: true, alpha: false }) {
    super(options)

    this.setSize(window.innerWidth, window.innerHeight)
    this.setPixelRatio(window.devicePixelRatio)
    this.setClearColor(0x0a0a0a, 1.0)

    this.bind()
  }

  bind () {
    this.onWindowResize = this.onWindowResize.bind(this)
    Window.onResize.add(this.onWindowResize)
  }

  onWindowResize (width, height) {
    this.setSize(width, height)
  }
}

export default Renderer
