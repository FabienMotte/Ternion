/**
 * Pass class
 */
class Pass {

  constructor() {
    // If set to true, the pass indicates to swap read and write buffer after rendering
    this.needsSwap = true

    // If set to true, the pass clears its buffer before rendering
    this.clear = false

    // If set to true, the result of the pass is rendered to screen
    this.renderToScreen = false
  }

  /**
   * setSize method
   * 
   * @param {number} width  Width
   * @param {number} height Height
   */
  setSize(width, height) {}

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
	  console.error('THREE.Pass: .render() must be implemented in derived pass.')
	}
}

export default Pass
