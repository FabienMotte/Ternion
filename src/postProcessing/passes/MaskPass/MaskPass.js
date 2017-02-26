import Pass from '../Pass'

/**
 * MaskPass class
 * @author alteredq / http://alteredqualia.com/
 */
class MaskPass extends Pass {

  /**
   * Constructor function
   * @param {Scene} scene   Scene
   * @param {Camera} camera Camera
   */
  constructor (scene, camera) {
    super()

    this.scene = scene
    this.camera = camera

    this.clear = true
    this.needsSwap = false

    this.inverse = false
  }

  /**
   * Render function
   * @param {Renderer} renderer  Renderer
   * @param {Object} writeBuffer Write buffer
   * @param {Object} readBuffer  Read buffer
   */
  render (renderer, writeBuffer, readBuffer, delta, maskActive) {
    const context = renderer.context
    const state = renderer.state

		// don't update color or depth

    state.buffers.color.setMask(false)
    state.buffers.depth.setMask(false)

		// lock buffers

    state.buffers.color.setLocked(true)
    state.buffers.depth.setLocked(true)

		// set up stencil

    var writeValue, clearValue

    if (this.inverse) {
      writeValue = 0
      clearValue = 1
    } else {
      writeValue = 1
      clearValue = 0
    }

    state.buffers.stencil.setTest(true)
    state.buffers.stencil.setOp(context.REPLACE, context.REPLACE, context.REPLACE)
    state.buffers.stencil.setFunc(context.ALWAYS, writeValue, 0xffffffff)
    state.buffers.stencil.setClear(clearValue)

		// draw into the stencil buffer

    renderer.render(this.scene, this.camera, readBuffer, this.clear)
    renderer.render(this.scene, this.camera, writeBuffer, this.clear)

		// unlock color and depth buffer for subsequent rendering

    state.buffers.color.setLocked(false)
    state.buffers.depth.setLocked(false)

		// only render where stencil is set to 1

    state.buffers.stencil.setFunc(context.EQUAL, 1, 0xffffffff)  // draw if == 1
    state.buffers.stencil.setOp(context.KEEP, context.KEEP, context.KEEP)
  }
}

export default MaskPass
