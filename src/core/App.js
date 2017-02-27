import Renderer from 'core/Renderer'
import Camera from 'core/Camera'
import Scene from 'core/Scene'

/**
 * App class
 */
class App {

  /**
   * begin method
   */
  static begin () {
    // Renderer
    const renderer = new Renderer()
    const container = document.getElementById('webgl-container')
    container.appendChild(renderer.domElement)

    // Camera
    const camera = new Camera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
    camera.position.z = 5

    // Scene
    const scene = new Scene(renderer, camera)
  }
}

export default App
