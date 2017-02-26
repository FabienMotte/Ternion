const float steps   = 3.0;

const float minOffs = (float(steps - 1.0)) / -2.0;
const float maxOffs = (float(steps - 1.0)) / +2.0;

vec4 tiltShift(sampler2D tInput, vec2 uv, float blurAmount, float center, float stepSize) {
  float amount;
  vec4 blurred;

  amount = pow((uv.y * center) * 2.0 - 1.0, 2.0) * blurAmount;

  blurred = vec4(0.0, 0.0, 0.0, 1.0);
      
  for (float offsX = minOffs; offsX <= maxOffs; ++offsX) {
    for (float offsY = minOffs; offsY <= maxOffs; ++offsY) {
      vec2 temp_vUv = uv.xy;

      temp_vUv.x += offsX * amount * stepSize;
      temp_vUv.y += offsY * amount * stepSize;

      blurred += texture2D(tInput, temp_vUv);
    }
  }

  blurred /= float(steps * steps);

  return blurred;
}

#pragma glslify: export(tiltShift)
