import Renderer from './Core/Renderer';
import Camera from './Core/Camera';
import Scene from './Core/Scene';

/**
 * App class
 */
class App {

  /**
   * Begin function
   */
  static begin() {

    // Renderer
    const renderer = new Renderer();
    const container = document.getElementById( 'container' );
    container.appendChild( renderer.domElement );

    // Camera
    const camera = new Camera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
    camera.position.z = 5;

    // Scene
    const scene = new Scene( renderer, camera );
  }
}

export default App;