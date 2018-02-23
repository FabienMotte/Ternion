class Pass {
  constructor () {
    // If set to true, the pass indicates to swap read and write buffer after rendering
    this.needsSwap = true

    // If set to true, the pass clears its buffer before rendering
    this.clear = false

    // If set to true, the result of the pass is rendered to screen
    this.renderToScreen = false
  }

  setSize (width, height) {}

  render (renderer, writeBuffer, readBuffer, delta, time, maskActive) {
    console.error('THREE.Pass: .render() must be implemented in derived pass.')
  }
}

export default Pass
