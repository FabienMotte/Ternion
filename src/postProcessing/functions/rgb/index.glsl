vec4 rgb(sampler2D tInput, vec2 pos, vec2 resolution, vec2 delta) {
  vec2 dir = pos - vec2(0.5);
  float d = .7 * length(dir);
  normalize(dir);
  vec2 value = d * dir * delta;

  vec4 c1 = texture2D(tInput, pos - value / resolution.x);
  vec4 c2 = texture2D(tInput, pos);
  vec4 c3 = texture2D(tInput, pos + value / resolution.y);

  return vec4(c1.r, c2.g, c3.b, c1.a + c2.a + c3.b);
}

#pragma glslify: export(rgb)
