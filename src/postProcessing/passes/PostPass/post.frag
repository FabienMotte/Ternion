#pragma glslify: fxaa = require('../../functions/fxaa');
#pragma glslify: vignette = require('color-shader-functions/vignette');

uniform sampler2D tInput;
uniform float uTime;
uniform float uVignette;
uniform vec2 uResolution;
uniform vec2 uRgbSplit;

varying vec2 vUv;

void main() {
  vec4 color = texture2D(tInput, vUv);

  color = fxaa(tInput, vUv, uResolution);
  color = vignette(color, 1.1, uVignette, uResolution);

  gl_FragColor = color;
}
