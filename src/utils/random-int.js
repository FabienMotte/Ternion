/**
 * Generate a random integer
 *
 * @param  {number} min Minimum boundary
 * @param  {number} max Maximum boundary
 * @return {number}     Generated integer
 */
export default function randomInt( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) + min );
}