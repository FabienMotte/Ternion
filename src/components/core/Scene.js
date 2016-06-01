import THREE from 'three';
import raf from 'raf-loop';
import Clock from '../helpers/Clock';
import Cube from '../meshes/Cube';
import PostProcessing from '../postProcessing/PostProcessing';

/**
 * Scene class
 */
class Scene extends THREE.Scene {

  /**
   * Constructor function
   * @param {Renderer} Renderer Renderer instance
   * @param {Camera}   Camera   Camera instance
   */
  constructor( Renderer, Camera ) {
    super();

    this.renderer = Renderer;
    this.camera = Camera;
    this.postProcessing = new PostProcessing( this, this.renderer, this.camera );

    this.clock = new Clock();

    this.createScene();
  }

  /**
   * CreateScene function
   */
  createScene() {

    this.cube = new Cube();
    this.add( this.cube );

    this.raf = raf( ::this.render ).start();
  }

  /**
   * Render function
   */
  render() {

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.02;

    this.cube.update( this.clock.time );

    this.postProcessing.update();
    this.camera.update( this.clock.delta );
  };
}

export default Scene;