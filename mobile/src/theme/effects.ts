import type { ViewStyle } from 'react-native';

/**
 * Raw effect parameters. Static only — glow is never animated (see
 * motion-performance skill); pulse = opacity/transform on a static glow layer.
 */
export function glowStyle(accent: string, strength: 'soft' | 'strong' = 'soft'): ViewStyle {
  return {
    shadowColor: accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: strength === 'strong' ? 0.9 : 0.55,
    shadowRadius: strength === 'strong' ? 16 : 8,
    elevation: 0,
  };
}

export const overlays = {
  /** Dim factor behind sheets / modal routes. */
  dim: 0.6,
  /** Artwork visibility under scrims (full-bleed realm art). */
  artwork: 1,
  /** Disabled / sealed content. */
  sealed: 0.45,
} as const;

export const blur = {
  /** Static panel blur radius (expo-blur). Never animate `intensity`. */
  panel: 24,
} as const;
