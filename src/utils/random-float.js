/**
 * Generate a random float
 *
 * @param  {number} minValue  Minimum boundary
 * @param  {number} maxValue  Maximum boundary
 * @param  {number} precision Precision
 * @return {number}           Generated float
 */
export default function randomFloat( minValue, maxValue, precision = 2 ) {
  return parseFloat( Math.min( minValue + ( Math.random() * ( maxValue - minValue ) ), maxValue ).toFixed( precision ) );
}