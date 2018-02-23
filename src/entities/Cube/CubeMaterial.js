import vertexShader from 'shaders/cube.vert'
import fragmentShader from 'shaders/cube.frag'

class CubeMaterial extends THREE.ShaderMaterial {
  constructor (options) {
    super(options)

    this.vertexShader = vertexShader
    this.fragmentShader = fragmentShader

    this.uniforms = {
      time: { type: 'f', value: 0.0 },
      color: { type: 'c', value: new THREE.Color(0xffffff) }
    }
  }

  update (time) {
    this.uniforms.time.value = time * 0.3
  }
}

export default CubeMaterial
