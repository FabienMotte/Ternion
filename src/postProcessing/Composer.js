import { ShaderPass, MaskPass, ClearMaskPass } from './passes'

/**
 * Composer class
 */
class Composer {

  /**
   * Constructor method
   * @param  {Object} renderer     Renderer
   * @param  {Object} renderTarget Render target
   */
  constructor (renderer, renderTarget) {
    this.renderer = renderer

    console.log(renderer)

    if (renderTarget === undefined) {
      const parameters = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: false
      }

      const size = this.renderer.getSize()
      renderTarget = new THREE.WebGLRenderTarget(size.width, size.height, parameters)
    }

    this.renderTarget1 = renderTarget
    this.renderTarget2 = renderTarget.clone()

    this.writeBuffer = this.renderTarget1
    this.readBuffer = this.renderTarget2

    this.passes = []

    this.copyPass = new ShaderPass()
  }

  swapBuffers () {
    const tmp = this.readBuffer
    this.readBuffer = this.writeBuffer
    this.writeBuffer = tmp
  }

  addPass (pass) {
    this.passes.push(pass)

    const size = this.renderer.getSize()
    const pixelRatio = this.renderer.getPixelRatio()
    pass.setSize(size.width * pixelRatio, size.height * pixelRatio)
  }

  insertPass (pass, index) {
    this.passes.splice(index, 0, pass)
  }

  render (delta, time) {
    let maskActive = false

    const passesLength = this.passes.length

    for (let i = 0; i < passesLength; i++) {
      const pass = this.passes[i]

      pass.render(this.renderer, this.writeBuffer, this.readBuffer, delta, time, maskActive)

      if (pass.needsSwap) {
        if (maskActive) {
          const context = this.renderer.context

          context.stencilFunc(context.NOTEQUAL, 1, 0xffffffff)
          this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, delta, time)
          context.stencilFunc(context.EQUAL, 1, 0xffffffff)
        }

        this.swapBuffers()
      }

      if (MaskPass !== undefined) {
        if (pass instanceof MaskPass) {
          maskActive = true
        } else if (pass instanceof ClearMaskPass) {
          maskActive = false
        }
      }
    }
  }

  reset (renderTarget) {
    if (renderTarget === undefined) {
      const size = this.renderer.getSize()

      renderTarget = this.renderTarget1.clone()
      renderTarget.setSize(size.width, size.height)
    }

    this.renderTarget1.dispose()
    this.renderTarget2.dispose()
    this.renderTarget1 = renderTarget
    this.renderTarget2 = renderTarget.clone()

    this.writeBuffer = this.renderTarget1
    this.readBuffer = this.renderTarget2
  }

  setSize (width, height) {
    this.renderTarget1.setSize(width, height)
    this.renderTarget2.setSize(width, height)

    for (let i = 0; i < this.passes.length; i++) {
      this.passes[i].setSize(width, height)
    }
  }
}

export default Composer
