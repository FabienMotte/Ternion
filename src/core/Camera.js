import OrbitControls from 'helpers/OrbitControls'
import Window from 'signals/Window'
import GUI from 'helpers/GUI'

class Camera extends THREE.PerspectiveCamera {
  constructor (fov, aspect, near, far) {
    super(fov, aspect, near, far)

    this.controls = new OrbitControls(this, document.getElementById('webgl-container'))
    this.controls.enabled = true

    this.bind()
    this.addGUI()
  }

  bind () {
    this.onWindowResize = this.onWindowResize.bind(this)
    Window.onResize.add(this.onWindowResize)
  }

  addGUI () {
    GUI.add(this.controls, 'enabled').name('OrbitControls')
  }

  update (delta) {
    this.controls.update(delta)
  }

  onWindowResize (width, height) {
    this.aspect = width / height
    this.updateProjectionMatrix()
  }
}

export default Camera
