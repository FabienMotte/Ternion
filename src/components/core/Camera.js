import THREE from 'three';
import OrbitControls from '../helpers/OrbitControls';
import Window from '../events/Window';

/**
 * Camera class
 */
class Camera extends THREE.PerspectiveCamera {

  /**
   * constructor method
   */
  constructor(fov, aspect, near, far) {
    super(fov, aspect, near, far);

    this.controls = new OrbitControls(this, document.getElementById('webgl-container'));

    Window.add(::this.resize);
  }

  /**
   * update method
   * @param {number} delta Delta
   */
  update(delta) {
    this.controls.update(delta);
  }

  /**
   * resize method
   * @param {number} width  Width
   * @param {number} height Height
   */
  resize(width, height) {
    this.aspect = width / height;
    this.updateProjectionMatrix();
  }
}

export default Camera;