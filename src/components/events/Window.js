import Signal from 'min-signal';
import { on } from 'dom-events';
import debounce from 'lodash.debounce';

/**
 * Window class
 */
class Window extends Signal {

  /**
   * constructor method
   */
  constructor() {
    super();

    on(window, 'resize', debounce(::this.onResize, 100));
  }

  /**
   * onResize method
   */
  onResize() {
    this.dispatch(window.innerWidth, window.innerHeight);
  }
}

export default new Window();