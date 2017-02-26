import Pass from '../Pass'

/**
 * ClearMaskPass class
 */
class ClearMaskPass extends Pass {

  /**
   * constructor method
   */
  constructor () {
    super()

    this.needsSwap = false
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
    renderer.state.buffers.stencil.setTest(false)
  }
}

export default ClearMaskPass
