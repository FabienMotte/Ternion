import { Mesh } from 'three';
import CubeGeometry from './CubeGeometry';
import CubeMaterial from './CubeMaterial';
import GUI from 'components/helpers/GUI';

/**
 * Cube class
 */
class Cube extends Mesh {

  /**
   * constructor method
   */
  constructor() {
    super(new CubeGeometry(), new CubeMaterial({ wireframe: true }));

    this.addGUI();
  }

  /**
   * addGUI method
   */
  addGUI() {
    const positionFolder = GUI.addFolder( { label: 'Cube Position' } );
    const scaleFolder = GUI.addFolder( { label: 'Cube Scale' } );

    positionFolder.add( this.position, 'x', { label: 'position x', min: -20, max: 20, step: 1 });
    positionFolder.add( this.position, 'y', { label: 'position y', min: -20, max: 20, step: 1 });
    positionFolder.add( this.position, 'z', { label: 'position z', min: -20, max: 20, step: 1 });

    scaleFolder.add( this.scale, 'x', { label: 'scale x', min: 0, max: 10, step: 0.1 });
    scaleFolder.add( this.scale, 'y', { label: 'scale y', min: 0, max: 10, step: 0.1 });
    scaleFolder.add( this.scale, 'z', { label: 'scale z', min: 0, max: 10, step: 0.1 });
  }

  /**
   * update method
   * @param {number} time Time
   */
  update(time) {
    this.material.update(time);
  }
}

export default Cube;
