uniform float cKernel[KERNEL_SIZE_INT];

uniform sampler2D tInput;
uniform vec2 uImageIncrement;

varying vec2 vUv;

void main() {
  vec2 imageCoord = vUv;
  vec4 sum = vec4(0.0, 0.0, 0.0, 0.0);

  for (int i = 0; i < KERNEL_SIZE_INT; i ++) {
    sum += texture2D(tInput, imageCoord) * cKernel[ i ];
    imageCoord += uImageIncrement;
  }

  gl_FragColor = sum;
}
