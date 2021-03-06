import Signal from 'quark-signal'
import debounce from 'lodash.debounce'

class Window {
  constructor () {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.createSignals()
    this.bind()
  }

  createSignals () {
    this.onResize = new Signal()
  }

  bind () {
    this.handleResize = this.handleResize.bind(this)
    window.addEventListener('resize', debounce(this.handleResize, 100))
  }

  handleResize () {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.onResize.dispatch(this.width, this.height)
  }
}

export default new Window()
