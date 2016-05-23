import THREE from 'three';

/**
 * Clock class
 */
class Clock extends THREE.Clock {

  /**
   * Constructor function
   * @return {void}
   */
  constructor() {
    super( true ); // Autostart
  }

  /**
   * Delta getter
   * @return {integer} Delta
   */
  get delta() {
    return this.getDelta();
  }

  /**
   * Time getter
   * @return {integer} Elapsed time
   */
  get time() {
    return this.getElapsedTime();
  }
}

export default Clock;