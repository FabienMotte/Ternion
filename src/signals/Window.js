import Signal from 'quark-signal'
import { on } from 'dom-events'
import debounce from 'lodash.debounce'

/**
 * Window class
 */
class Window {

  /**
   * constructor method
   */
  constructor () {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.createSignals()
    this.bind()
  }

  /**
   * createSignals method
   */
  createSignals () {
    this.onResize = new Signal()
  }

  /**
   * bind method
   */
  bind () {
    this.handleResize = this.handleResize.bind(this)
    window.addEventListener('resize', debounce(this.handleResize, 100))
  }

  /**
   * handleResize method
   */
  handleResize () {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.onResize.dispatch(this.width, this.height)
  }
}

export default new Window()
