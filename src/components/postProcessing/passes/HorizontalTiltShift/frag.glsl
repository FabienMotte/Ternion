uniform sampler2D tInput;
uniform float h;
uniform float r;

varying vec2 vUv;

void main() {

  vec4 sum = vec4( 0.0 );

  float hh = h * abs( r - vUv.y );

  sum += texture2D( tInput, vec2( vUv.x - 4.0 * hh, vUv.y ) ) * 0.051;
  sum += texture2D( tInput, vec2( vUv.x - 3.0 * hh, vUv.y ) ) * 0.0918;
  sum += texture2D( tInput, vec2( vUv.x - 2.0 * hh, vUv.y ) ) * 0.12245;
  sum += texture2D( tInput, vec2( vUv.x - 1.0 * hh, vUv.y ) ) * 0.1531;
  sum += texture2D( tInput, vec2( vUv.x, vUv.y ) ) * 0.1633;
  sum += texture2D( tInput, vec2( vUv.x + 1.0 * hh, vUv.y ) ) * 0.1531;
  sum += texture2D( tInput, vec2( vUv.x + 2.0 * hh, vUv.y ) ) * 0.12245;
  sum += texture2D( tInput, vec2( vUv.x + 3.0 * hh, vUv.y ) ) * 0.0918;
  sum += texture2D( tInput, vec2( vUv.x + 4.0 * hh, vUv.y ) ) * 0.051;

  gl_FragColor = sum;

}