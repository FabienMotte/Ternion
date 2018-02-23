import Renderer from 'core/Renderer'
import Camera from 'core/Camera'
import Scene from 'core/Scene'

class App {
  static begin () {
    const renderer = new Renderer()
    const container = document.getElementById('webgl-container')
    container.appendChild(renderer.domElement)

    const camera = new Camera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
    camera.position.z = 5

    const scene = new Scene(renderer, camera) // eslint-disable-line
  }
}

export default App
