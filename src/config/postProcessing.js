import { BlendMode }      from '@superguigui/wagner';
import MultiPassBloomPass from '@superguigui/wagner/src/passes/bloom/MultiPassBloomPass';
import GodrayPass         from '../postProcessing/passes/GodrayPass/GodrayPass';
import TiltShiftPass      from '@superguigui/wagner/src/passes/tiltshift/tiltshiftPass';
import NoisePass          from '@superguigui/wagner/src/passes/noise/noise';
import FXAAPass           from '@superguigui/wagner/src/passes/fxaa/FXAAPass';

export default {
  active: true,
  effectComposer: {
    useRGBA: true
  },
  passes: [
    {
      name: 'multiPassBloomPass',
      active: true,
      constructor: new MultiPassBloomPass({
        blurAmount: 0.5,
        applyZoomBlur: true,
        zoomBlurStrength: 0.8,
        blendMode: BlendMode.Lighten
      })
    },
    {
      name: 'godrayPass',
      active: true,
      constructor: new GodrayPass({
        fX: 0.5,
        fY: 0.5,
        fExposure: 0.8,
        fDecay: 0.90,
        fDensity: 0.7,
        fWeight: 0.6
      })
    },
    {
      name: 'tiltShiftPass',
      active: true,
      constructor: new TiltShiftPass({
        bluramount: 1.2,
        center: 1,
        stepSize: 0.005
      })
    },
    {
      name: 'noisePass',
      active: true,
      constructor: new NoisePass({
        amount: 0.02,
        speed: 0.1
      })
    },
    {
      name: 'fxaaPass',
      active: true,
      constructor: new FXAAPass()
    }
  ]
};