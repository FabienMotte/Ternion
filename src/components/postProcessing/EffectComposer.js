import { Composer } from '@superguigui/wagner';
import Window from '../Events/Window';

/**
 * EffectComposer class
 */
class EffectComposer extends Composer {

  /**
   * Constructor function
   * @param  {object} renderer Renderer
   * @param  {object} options  Options
   * @return {void}
   */
  constructor( renderer, options ) {
    super( renderer, options );
    
    this.setSize( window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio );

    Window.add( ::this.resize );
  }

  /**
   * Resize function
   * @param  {integer} width  Width
   * @param  {integer} height Height
   * @return {void}
   */
  resize( width, height ) {
    this.setSize( width * window.devicePixelRatio, height * window.devicePixelRatio );
  }
}

export default EffectComposer;