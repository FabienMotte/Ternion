import THREE from 'three';
import Window from '../events/Window';

/**
 * Renderer class
 */
class Renderer extends THREE.WebGLRenderer {

  /**
   * Constructor function
   * @param  {object} options Options
   */
  constructor( options = { antialias: true, alpha: true } ) {
    super( options );

    this.setSize( window.innerWidth, window.innerHeight );
    this.setPixelRatio( window.devicePixelRatio );
    this.setClearColor( 0x0a0a0a, 1.0 );

    Window.add( ::this.resize );
  }

  /**
   * Resize function
   * @param  {integer} width  Width
   * @param  {integer} height Height
   * @return {void}
   */
  resize( width, height ) {
    this.setSize( width, height );
  }
}

export default Renderer;