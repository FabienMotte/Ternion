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
   * constructor method
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
   * createScene method
   */
  createScene() {

    this.cube = new Cube();
    this.add( this.cube );

    this.raf = raf( ::this.render ).start();
  }

  /**
   * render method
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