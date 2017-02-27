import { BloomUnrealPass, PostPass } from 'postProcessing/passes'

export default {
  active: true,
  passes: [
    {
      active: true,
      name: 'bloomPass',
      constructor: new BloomUnrealPass({
        resolution: new THREE.Vector2(256, 256),
        strength: 2,
        radius: 1,
        threshold: 0.04
      })
    },
    {
      active: true,
      name: 'postPass',
      constructor: new PostPass()
    }
  ]
}
