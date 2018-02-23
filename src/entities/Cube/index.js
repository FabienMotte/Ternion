import CubeMaterial from './CubeMaterial'
import GUI from 'helpers/GUI'

class Cube extends THREE.Object3D {
  constructor () {
    super()

    this.geometry = new THREE.BoxGeometry(1, 1, 1)
    this.material = new CubeMaterial({ wireframe: true })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.add(this.mesh)

    this.addGUI()
  }

  addGUI () {
    const positionFolder = GUI.addFolder('Cube Position')
    const scaleFolder = GUI.addFolder('Cube Scale')

    positionFolder.add(this.position, 'x').name('position x').min(-10).max(10).step(0.5)
    positionFolder.add(this.position, 'y').name('position y').min(-10).max(10).step(0.5)
    positionFolder.add(this.position, 'z').name('position z').min(-10).max(10).step(0.5)

    scaleFolder.add(this.scale, 'x').name('scale x').min(0).max(10).step(0.1)
    scaleFolder.add(this.scale, 'y').name('scale y').min(0).max(10).step(0.1)
    scaleFolder.add(this.scale, 'z').name('scale z').min(0).max(10).step(0.1)
  }

  update (time) {
    this.material.update(time / 1000)
  }
}

export default Cube
