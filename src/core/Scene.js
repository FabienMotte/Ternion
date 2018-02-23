import Raf from 'quark-raf'
import Cube from 'entities/Cube'
import PostProcessing from 'postProcessing/PostProcessing'

class Scene extends THREE.Scene {
  constructor (renderer, camera) {
    super()

    this.renderer = renderer
    this.camera = camera
    this.postProcessing = new PostProcessing(this, this.renderer, this.camera)

    this.bind()
    this.createScene()
  }

  bind () {
    this.render = this.render.bind(this)
    Raf.add(this.render)
  }

  createScene () {
    this.cube = new Cube()
    this.add(this.cube)
  }

  render (delta, time) {
    const cube = this.cube

    cube.rotation.x += 0.01
    cube.rotation.y += 0.02

    cube.update(time)

    this.postProcessing.update(delta, time)
    this.camera.update()
  }
}

export default Scene
