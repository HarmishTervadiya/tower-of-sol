import { borders } from '@/src/theme/borders';
import { colors, rarity, state } from '@/src/theme/colors';
import { glowStyle, overlays, blur } from '@/src/theme/effects';
import { gradients } from '@/src/theme/gradients';
import { motion } from '@/src/theme/motion';
import { opacity } from '@/src/theme/opacity';
import { radii } from '@/src/theme/radii';
import { composeRealmTheme, resolveRealmTheme } from '@/src/theme/realms';
import { semantic } from '@/src/theme/semantic';
import { shadows } from '@/src/theme/shadows';
import { spacing } from '@/src/theme/spacing';
import { fonts, typography } from '@/src/theme/typography';
import { zIndex } from '@/src/theme/zIndex';

/**
 * Single source of truth for the visual system.
 * Import from `@/src/theme` — never from individual screens, never raw values.
 *
 * Layers: raw tokens (colors, gradients, effects, spacing…) vs semantic roles
 * (`semantic.*`) vs Realm composition (`resolveRealmTheme`). Screens use semantic
 * roles + a resolved Realm theme; raw values are theme-authoring material only.
 */
export const theme = {
  colors,
  rarity,
  state,
  gradients,
  effects: { glowStyle, overlays, blur },
  borders,
  opacity,
  semantic,
  typography,
  fonts,
  spacing,
  radii,
  shadows,
  motion,
  zIndex,
  realms: { resolve: resolveRealmTheme, compose: composeRealmTheme },
} as const;

export type Theme = typeof theme;

export { borders } from '@/src/theme/borders';
export type { BorderToken } from '@/src/theme/borders';
export { colors, rarity, state } from '@/src/theme/colors';
export type { ColorToken, Rarity, RealmState } from '@/src/theme/colors';
export { glowStyle, overlays, blur } from '@/src/theme/effects';
export { gradients } from '@/src/theme/gradients';
export type { GradientToken } from '@/src/theme/gradients';
export { motion } from '@/src/theme/motion';
export type { HapticEvent } from '@/src/theme/motion';
export { opacity } from '@/src/theme/opacity';
export type { OpacityToken } from '@/src/theme/opacity';
export { radii } from '@/src/theme/radii';
export type { RadiiToken } from '@/src/theme/radii';
export { composeRealmTheme, resolveRealmTheme } from '@/src/theme/realms';
export type { RealmTheme, RealmThemeKey, ThemeOverlay } from '@/src/theme/realms';
export { semantic } from '@/src/theme/semantic';
export type { SemanticToken } from '@/src/theme/semantic';
export { shadows } from '@/src/theme/shadows';
export type { ShadowToken } from '@/src/theme/shadows';
export { spacing } from '@/src/theme/spacing';
export type { SpacingToken } from '@/src/theme/spacing';
export { fonts, typography } from '@/src/theme/typography';
export type { TypographyToken } from '@/src/theme/typography';
export { zIndex } from '@/src/theme/zIndex';
export type { ZIndexToken } from '@/src/theme/zIndex';
