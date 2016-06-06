/**
 * Clamp a value between two bounds
 *
 * @param  {number} min Minimum boundary
 * @param  {number} max Maximum boundary
 * @param  {number} v   Value to clamp
 * @return {number}     Clamped value
 */
export default function clamp(min, max, v) {
  if (v < min) return min;
  if (v > max) return max;
  return v;
}