import type { ViewStyle } from 'react-native';

/**
 * iOS shadow + Android elevation pairs. Never animate `elevation` or shadow
 * props (see motion-performance skill) — crossfade a static layer instead.
 */
function shadow(elevation: number, opacity: number, radius: number): ViewStyle {
  return {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: elevation / 2 },
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation,
  };
}

export const shadows = {
  none: {} as ViewStyle,
  sm: shadow(2, 0.25, 4),
  md: shadow(6, 0.35, 10),
  lg: shadow(12, 0.45, 18),
  glowGold: {
    ...shadow(8, 0.5, 14),
    shadowColor: '#E8B44A',
  } as ViewStyle,
  glowViolet: {
    ...shadow(8, 0.5, 14),
    shadowColor: '#7C5CFF',
  } as ViewStyle,
};

export type ShadowToken = keyof typeof shadows;
