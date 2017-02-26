import Pass from '../Pass'

/**
 * RenderPass class
 */
class RenderPass extends Pass {

  constructor (scene, camera, overrideMaterial, clearColor, clearAlpha = 0) {
    super()

    this.scene = scene
    this.camera = camera

    this.overrideMaterial = overrideMaterial

    this.clearColor = clearColor
    this.clearAlpha = clearAlpha

    this.clear = true
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
    const oldAutoClear = renderer.autoClear
    renderer.autoClear = false

    this.scene.overrideMaterial = this.overrideMaterial

    let oldClearColor, oldClearAlpha

    if (this.clearColor) {
      oldClearColor = renderer.getClearColor().getHex()
      oldClearAlpha = renderer.getClearAlpha()

      renderer.setClearColor(this.clearColor, this.clearAlpha)
    }

    renderer.render(this.scene, this.camera, this.renderToScreen ? null : readBuffer, this.clear)

    if (this.clearColor) {
      renderer.setClearColor(oldClearColor, oldClearAlpha)
    }

    this.scene.overrideMaterial = null
    renderer.autoClear = oldAutoClear
  }
}

export default RenderPass
