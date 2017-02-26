import EffectComposer from './EffectComposer'
import { RenderPass } from './passes'
import { postProcessing } from 'config'
import { Window } from 'signals'
import GUI from 'helpers/GUI'

/**
* PostProcessing
*/
class PostProcessing {

  constructor (scene, renderer, camera) {
    this.scene = scene

    this.camera = camera

    this.renderer = renderer
    this.configuration = postProcessing

    this.passes = this.configuration.passes.filter(pass => pass.active)
    this.active = this.configuration.active

    this.composer = new EffectComposer(this.renderer)

    this.composer.addPass(new RenderPass(this.scene, this.camera))

    for (let i = 0; i < this.passes.length; i++) {
      this.composer.addPass(this.passes[i].constructor)
      if (i == this.passes.length - 1) {
        this.passes[i].constructor.renderToScreen = true
      }
    }

    // this.addGUI()
  }

  /**
  * addGUI method
  */
  addGUI () {
    GUI.add(this, 'active').name('PostProcessing').onChange()
  }

  /**
  * getPass method
  */
  getPass (name) {
    return this.passes.find(pass => pass.name === name).constructor
  }

  /**
  * update method
  */
  update () {
    if (this.active && this.passes.length) {
      this.composer.render(this.scene.clock.delta, this.scene.clock.time)
    } else {
      this.renderer.render(this.scene, this.camera)
    }
  }
}

export default PostProcessing
