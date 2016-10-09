import { Clock as ThreeClock } from 'three';

/**
 * Clock class
 */
class Clock extends ThreeClock {

  /**
   * constructor method
   */
  constructor() {
    super(true); // Autostart
  }

  /**
   * delta getter
   * @return {number} Delta
   */
  get delta() {
    return this.getDelta();
  }

  /**
   * time getter
   * @return {number} Elapsed time
   */
  get time() {
    return this.getElapsedTime();
  }
}

export default Clock;