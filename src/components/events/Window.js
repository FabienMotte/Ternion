import Signal from 'min-signal';
import { on } from 'dom-events';
import debounce from 'lodash.debounce';

/**
 * Window class
 */
class Window extends Signal {

  /**
   * Constructor function
   */
  constructor() {
    super();

    on( window, 'resize', debounce( ::this.onResize, 100 ) );
  }

  /**
   * OnResize function
   */
  onResize() {
    this.dispatch( window.innerWidth, window.innerHeight );
  }
}

export default new Window();