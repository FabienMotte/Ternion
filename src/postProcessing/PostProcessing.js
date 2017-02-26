import EffectComposer from './EffectComposer'
import postProcessingConfig from 'config/postProcessing'

/**
 * PostProcessing
 */
class PostProcessing {

  /**
   * constructor method
   * @param {Scene}    scene    Scene instance
   * @param {Renderer} renderer Renderer instance
   * @param {Camera}   camera   Camera instance
   */
  constructor (scene, renderer, camera) {
    this.scene = scene
    this.renderer = renderer
    this.camera = camera
    this.config = postProcessingConfig

    this.active = this.config.active
    this.composer = new EffectComposer(this.renderer, this.config.effectComposer)
    this.passes = this.config.passes
  }

  /**
   * update method
   */
  update () {
    if (this.active) {
      this.composer.reset()
      this.composer.render(this.scene, this.camera)
      this.passes
        .filter(pass => pass.active)
        .forEach(pass => this.composer.pass(pass.constructor))
      this.composer.toScreen()
    } else {
      this.renderer.render(this.scene, this.camera)
    }
  }
}

export default PostProcessing
