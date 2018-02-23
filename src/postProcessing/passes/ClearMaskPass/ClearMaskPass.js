import Pass from '../Pass'

class ClearMaskPass extends Pass {
  constructor () {
    super()

    this.needsSwap = false
  }

  render (renderer, writeBuffer, readBuffer, delta, time, maskActive) {
    renderer.state.buffers.stencil.setTest(false)
  }
}

export default ClearMaskPass
