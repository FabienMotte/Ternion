import { PerspectiveCamera } from 'three';
import OrbitControls from '../helpers/OrbitControls';
import Window from '../events/Window';
import GUI from 'helpers/GUI';

/**
 * Camera class
 */
class Camera extends PerspectiveCamera {

  /**
   * constructor method
   */
  constructor(fov, aspect, near, far) {
    super(fov, aspect, near, far);

    this.controls = new OrbitControls(this, document.getElementById('webgl-container'));
    this.controls.enabled = true;

    Window.add(::this.resize);

    this.addGUI();
  }

  /**
   * addGUI method
   */
  addGUI() {
    GUI.add(this.controls, 'enabled', { label: 'OrbitControls' });
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