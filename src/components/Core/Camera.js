import THREE from 'three';
import OrbitControls from '../helpers/OrbitControls';
import Window from '../events/Window';

/**
 * Camera class
 */
class Camera extends THREE.PerspectiveCamera {

  /**
   * Constructor function
   */
  constructor( fov, aspect, near, far ) {
    super( fov, aspect, near, far );

    this.controls = new OrbitControls( this );

    Window.add( ::this.resize );
  }

  /**
   * Update function
   * @param  {number} delta Delta
   */
  update( delta ) {
    this.controls.update( delta );
  }

  /**
   * Resize function
   * @param  {integer} width  Width
   * @param  {integer} height Height
   * @return {void}
   */
  resize( width, height ) {
    this.aspect = width / height;
    this.updateProjectionMatrix();
  }
}

export default Camera;