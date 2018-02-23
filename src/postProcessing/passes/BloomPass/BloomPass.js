import Pass from '../Pass'
import copyVertexShader from '../../shaders/basic.vert'
import copyFragmentShader from '../../shaders/copy.frag'
import convolVertexShader from './convolution.vert'
import convolFragmentShader from './convolution.frag'

const blur = {
  x: new THREE.Vector2(0.001953125, 0.0),
  y: new THREE.Vector2(0.0, 0.001953125)
}

class BloomPass extends Pass {
  constructor ({ strength = 1, kernelSize = 16, sigma = 5.0, resolution = 256 }) {
    super()

    const options = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat }

    // Render targets
    this.renderTargetX = new THREE.WebGLRenderTarget(resolution, resolution, options)
    this.renderTargetY = new THREE.WebGLRenderTarget(resolution, resolution, options)

    // Copy material
    this.materialCopy = new THREE.ShaderMaterial({
      uniforms: {
        tInput: { value: null },
        uOpacity: { value: strength }
      },
      vertexShader: copyVertexShader,
      fragmentShader: copyFragmentShader,
      blending: THREE.AdditiveBlending,
      transparent: true
    })

    // Convolution material
    this.materialConvolution = new THREE.ShaderMaterial({
      defines: {
        KERNEL_SIZE_FLOAT: kernelSize.toFixed(1),
        KERNEL_SIZE_INT: kernelSize.toFixed(0)
      },
      uniforms: {
        tInput: { value: null },
        uImageIncrement: { value: new THREE.Vector2() },
        cKernel: { value: [] }
      },
      vertexShader: convolVertexShader,
      fragmentShader: convolFragmentShader
    })

    this.materialConvolution.uniforms['uImageIncrement'].value = blur.x
    this.materialConvolution.uniforms['cKernel'].value = this.buildKernel(sigma, kernelSize)

    this.needsSwap = false

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    this.scene = new THREE.Scene()

    this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null)
    this.scene.add(this.quad)
  }

  buildKernel (sigma, kernelSize) {
    const values = new Array(kernelSize)

    const halfWidth = (kernelSize - 1) * 0.5

    let sum = 0.0

    for (let i = 0; i < kernelSize; ++i) {
      values[i] = this.gauss(i - halfWidth, sigma)
      sum += values[i]
    }

    // Normalize the kernel
    for (let i = 0; i < kernelSize; ++i) {
      values[i] /= sum
    }

    return values
  }

  gauss (x, sigma) {
    return Math.exp(-(x * x) / (2.0 * sigma * sigma))
  }

  render (renderer, writeBuffer, readBuffer, delta, time, maskActive) {
    const oldAutoClear = renderer.autoClear
    renderer.autoClear = false

    if (maskActive) {
      renderer.context.disable(renderer.context.STENCIL_TEST)
    }

    // Render quad with blured scene into texture (convolution pass 1)
    this.quad.material = this.materialConvolution

    this.materialConvolution.uniforms['tInput'].value = readBuffer.texture
    this.materialConvolution.uniforms['uImageIncrement'].value = blur.x

    renderer.render(this.scene, this.camera, this.renderTargetX, true)

    // Render quad with blured scene into texture (convolution pass 2)
    this.materialConvolution.uniforms['tInput'].value = this.renderTargetX.texture
    this.materialConvolution.uniforms['uImageIncrement'].value = blur.y

    renderer.render(this.scene, this.camera, this.renderTargetY, true)

    // Render original scene with superimposed blur to texture
    this.quad.material = this.materialCopy

    this.materialCopy.uniforms['tInput'].value = this.renderTargetY.texture

    if (maskActive) {
      renderer.context.enable(renderer.context.STENCIL_TEST)
    }

    renderer.render(this.scene, this.camera, readBuffer, this.clear)
    renderer.autoClear = oldAutoClear
  }
}

export default BloomPass
