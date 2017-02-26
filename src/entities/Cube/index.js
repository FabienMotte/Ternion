import CubeMaterial from './CubeMaterial'
import GUI from 'helpers/GUI'

/**
 * Cube class
 */
class Cube extends THREE.Object3D {

  /**
   * constructor method
   */
  constructor () {
    super()

    this.geometry = new THREE.BoxGeometry(1, 1, 1)
    this.material = new CubeMaterial({ wireframe: true })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.add(this.mesh)

    this.addGUI()
  }

  /**
   * addGUI method
   */
  addGUI () {
    const positionFolder = GUI.addFolder({ label: 'Cube Position' })
    const scaleFolder = GUI.addFolder({ label: 'Cube Scale' })

    positionFolder.add(this.position, 'x', { label: 'position x', min: -20, max: 20, step: 1 })
    positionFolder.add(this.position, 'y', { label: 'position y', min: -20, max: 20, step: 1 })
    positionFolder.add(this.position, 'z', { label: 'position z', min: -20, max: 20, step: 1 })

    scaleFolder.add(this.scale, 'x', { label: 'scale x', min: 0, max: 10, step: 0.1 })
    scaleFolder.add(this.scale, 'y', { label: 'scale y', min: 0, max: 10, step: 0.1 })
    scaleFolder.add(this.scale, 'z', { label: 'scale z', min: 0, max: 10, step: 0.1 })
  }

  /**
   * update method
   * @param {number} time Time
   */
  update (time) {
    this.material.update(time)
  }
}

export default Cube
