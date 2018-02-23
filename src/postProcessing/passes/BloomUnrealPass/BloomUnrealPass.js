import Pass from '../Pass'
import basicVertexShader from '../../shaders/basic.vert'
import copyFragmentShader from '../../shaders/copy.frag'
import highFragmentShader from '../../shaders/luminosity-high.frag'
import blurFragmentShader from './blur.frag'
import compositeFragmentShader from './composite.frag'

const blurDirection = {
  x: new THREE.Vector2(1.0, 0.0),
  y: new THREE.Vector2(0.0, 1.0)
}

class UnrealBloomPass extends Pass {
  constructor ({ resolution = new THREE.Vector2(256, 256), strength = 1, radius = 1, threshold = 0.8 }) {
    super()

    this.resolution = resolution
    this.strength = strength
    this.radius = radius
    this.threshold = threshold

    // Render targets
    const options = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat }
    this.renderTargetsHorizontal = []
    this.renderTargetsVertical = []
    this.nMips = 5
    let resx = Math.round(this.resolution.x / 2)
    let resy = Math.round(this.resolution.y / 2)

    this.renderTargetBright = new THREE.WebGLRenderTarget(resx, resy, options)
    this.renderTargetBright.texture.generateMipmaps = false

    for (let i = 0; i < this.nMips; i++) {
      let renderTarget = new THREE.WebGLRenderTarget(resx, resy, options)
      renderTarget.texture.generateMipmaps = false

      this.renderTargetsHorizontal.push(renderTarget)

      renderTarget = new THREE.WebGLRenderTarget(resx, resy, options)

      renderTarget.texture.generateMipmaps = false
      this.renderTargetsVertical.push(renderTarget)

      resx = Math.round(resx / 2)
      resy = Math.round(resy / 2)
    }

    // Luminosity high pass material
    this.materialHighPassFilter = new THREE.ShaderMaterial({
      uniforms: {
        tInput: { value: null },
        luminosityThreshold: { value: 1.0 },
        smoothWidth: { value: 1.0 },
        defaultColor: { value: new THREE.Color(0x000000) },
        defaultOpacity: { value: 0.0 }
      },
      vertexShader: basicVertexShader,
      fragmentShader: highFragmentShader
    })

    this.materialHighPassFilter.uniforms['luminosityThreshold'].value = threshold
    this.materialHighPassFilter.uniforms['smoothWidth'].value = 0.01

    // Gaussian Blur Materials
    this.separableBlurMaterials = []
    const kernelSizeArray = [3, 5, 7, 9, 11]

    for (let i = 0; i < this.nMips; i++) {
      const kernelRadius = kernelSizeArray[i]
      const seperableBlurMaterial = new THREE.ShaderMaterial({
        defines: {
          KERNEL_RADIUS: kernelRadius,
          SIGMA: kernelRadius
        },
        uniforms: {
          colorTexture: { value: null },
          texSize: { value: new THREE.Vector2(0.5, 0.5) },
          direction: { value: new THREE.Vector2(0.5, 0.5) }
        },
        vertexShader: basicVertexShader,
        fragmentShader: blurFragmentShader
      })
      this.separableBlurMaterials.push(seperableBlurMaterial)
      this.separableBlurMaterials[i].uniforms['texSize'].value = new THREE.Vector2(resx, resy)

      resx = Math.round(resx / 2)
      resy = Math.round(resy / 2)
    }

    // Composite material
    this.compositeMaterial = new THREE.ShaderMaterial({
      defines: {
        NUM_MIPS: this.nMips
      },
      uniforms: {
        blurTexture1: { value: null },
        blurTexture2: { value: null },
        blurTexture3: { value: null },
        blurTexture4: { value: null },
        blurTexture5: { value: null },
        dirtTexture: { value: null },
        bloomStrength: { value: 1.0 },
        bloomFactors: { value: null },
        bloomTintColors: { value: null },
        bloomRadius: { value: 0.0 }
      },
      vertexShader: basicVertexShader,
      fragmentShader: compositeFragmentShader
    })
    this.compositeMaterial.uniforms['blurTexture1'].value = this.renderTargetsVertical[0].texture
    this.compositeMaterial.uniforms['blurTexture2'].value = this.renderTargetsVertical[1].texture
    this.compositeMaterial.uniforms['blurTexture3'].value = this.renderTargetsVertical[2].texture
    this.compositeMaterial.uniforms['blurTexture4'].value = this.renderTargetsVertical[3].texture
    this.compositeMaterial.uniforms['blurTexture5'].value = this.renderTargetsVertical[4].texture
    this.compositeMaterial.uniforms['bloomStrength'].value = strength
    this.compositeMaterial.uniforms['bloomRadius'].value = 0.1
    this.compositeMaterial.needsUpdate = true

    const bloomFactors = [1.0, 0.8, 0.6, 0.4, 0.2]
    this.compositeMaterial.uniforms['bloomFactors'].value = bloomFactors
    this.bloomTintColors = [
      new THREE.Vector3(1, 1, 1),
      new THREE.Vector3(1, 1, 1),
      new THREE.Vector3(1, 1, 1),
      new THREE.Vector3(1, 1, 1),
      new THREE.Vector3(1, 1, 1)
    ]
    this.compositeMaterial.uniforms['bloomTintColors'].value = this.bloomTintColors

    // Copy material
    this.materialCopy = new THREE.ShaderMaterial({
      uniforms: {
        tInput: { value: null },
        uOpacity: { value: 1.0 }
      },
      vertexShader: basicVertexShader,
      fragmentShader: copyFragmentShader,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
      transparent: true
    })

    this.enabled = true
    this.needsSwap = false

    this.oldClearColor = new THREE.Color()
    this.oldClearAlpha = 1

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    this.scene = new THREE.Scene()

    this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null)
    this.scene.add(this.quad)
  }

  dispose () {
    for (let i = 0; i < this.renderTargetsHorizontal.length(); i++) {
      this.renderTargetsHorizontal[i].dispose()
    }

    for (let i = 0; i < this.renderTargetsVertical.length(); i++) {
      this.renderTargetsVertical[i].dispose()
    }

    this.renderTargetBright.dispose()
  }

  setSize (width, height) {
    let resx = Math.round(width / 2)
    let resy = Math.round(height / 2)

    this.renderTargetBright.setSize(resx, resy)

    for (let i = 0; i < this.nMips; i++) {
      this.renderTargetsHorizontal[i].setSize(resx, resy)
      this.renderTargetsVertical[i].setSize(resx, resy)

      this.separableBlurMaterials[i].uniforms['texSize'].value = new THREE.Vector2(resx, resy)

      resx = Math.round(resx / 2)
      resy = Math.round(resy / 2)
    }
  }

  render (renderer, writeBuffer, readBuffer, delta, time, maskActive) {
    this.oldClearColor.copy(renderer.getClearColor())
    this.oldClearAlpha = renderer.getClearAlpha()
    const oldAutoClear = renderer.autoClear
    renderer.autoClear = false

    renderer.setClearColor(new THREE.Color(0, 0, 0), 0)

    if (maskActive) {
      renderer.context.disable(renderer.context.STENCIL_TEST)
    }

    // 1. Extract Bright Areas
    this.materialHighPassFilter.uniforms['tInput'].value = readBuffer.texture
    this.materialHighPassFilter.uniforms['luminosityThreshold'].value = this.threshold
    this.quad.material = this.materialHighPassFilter
    renderer.render(this.scene, this.camera, this.renderTargetBright, true)

    // 2. Blur All the mips progressively
    let inputRenderTarget = this.renderTargetBright

    for (let i = 0; i < this.nMips; i++) {
      this.quad.material = this.separableBlurMaterials[i]

      this.separableBlurMaterials[i].uniforms['colorTexture'].value = inputRenderTarget.texture
      this.separableBlurMaterials[i].uniforms['direction'].value = blurDirection.x

      renderer.render(this.scene, this.camera, this.renderTargetsHorizontal[i], true)

      this.separableBlurMaterials[i].uniforms['colorTexture'].value = this.renderTargetsHorizontal[i].texture
      this.separableBlurMaterials[i].uniforms['direction'].value = blurDirection.y

      renderer.render(this.scene, this.camera, this.renderTargetsVertical[i], true)

      inputRenderTarget = this.renderTargetsVertical[i]
    }

    // Composite All the mips
    this.quad.material = this.compositeMaterial
    this.compositeMaterial.uniforms['bloomStrength'].value = this.strength
    this.compositeMaterial.uniforms['bloomRadius'].value = this.radius
    this.compositeMaterial.uniforms['bloomTintColors'].value = this.bloomTintColors
    renderer.render(this.scene, this.camera, this.renderTargetsHorizontal[0], true)

    // Blend it additively over the input texture
    this.quad.material = this.materialCopy
    this.materialCopy.uniforms['tInput'].value = this.renderTargetsHorizontal[0].texture

    if (maskActive) {
      renderer.context.enable(renderer.context.STENCIL_TEST)
    }

    renderer.render(this.scene, this.camera, readBuffer, this.clear)

    renderer.setClearColor(this.oldClearColor, this.oldClearAlpha)
    renderer.autoClear = oldAutoClear
  }
}

export default UnrealBloomPass
