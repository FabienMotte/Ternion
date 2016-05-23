uniform float time;
uniform vec3 color;

void main() {
  vec3 newColor = vec3( color.r * sin( time ), color.g * sin( time + 10.0 ), color.b * sin( time + 20.0 ) );
  gl_FragColor = vec4( newColor, 1.0 );
}