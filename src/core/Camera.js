import OrbitControls from 'helpers/OrbitControls'
import { Window } from 'signals'
import GUI from 'helpers/GUI'

/**
 * Camera class
 */
class Camera extends THREE.PerspectiveCamera {

  /**
   * constructor method
   */
  constructor (fov, aspect, near, far) {
    super(fov, aspect, near, far)

    this.controls = new OrbitControls(this, document.getElementById('webgl-container'))
    this.controls.enabled = true

    this.bind()
    this.addGUI()
  }

  /**
   * bind method
   */
  bind () {
    this.onWindowResize = this.onWindowResize.bind(this)
    Window.onResize.add(this.onWindowResize)
  }

  /**
   * addGUI method
   */
  addGUI () {
    GUI.add(this.controls, 'enabled', { label: 'OrbitControls' })
  }

  /**
   * update method
   * @param {number} delta Delta
   */
  update (delta) {
    this.controls.update(delta)
  }

  /**
   * onWindowResize method
   * @param {number} width  Width
   * @param {number} height Height
   */
  onWindowResize (width, height) {
    this.aspect = width / height
    this.updateProjectionMatrix()
  }
}

export default Camera
