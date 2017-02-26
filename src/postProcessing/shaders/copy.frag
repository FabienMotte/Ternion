uniform sampler2D tInput;
uniform float uOpacity;

varying vec2 vUv;

void main() {
  vec4 color = texture2D(tInput, vUv);
  gl_FragColor = color * uOpacity;
}
