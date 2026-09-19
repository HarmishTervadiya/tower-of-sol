import { colors, rarity, state } from '@/src/theme/colors';
import { motion } from '@/src/theme/motion';
import { radii } from '@/src/theme/radii';
import { shadows } from '@/src/theme/shadows';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { zIndex } from '@/src/theme/zIndex';

/**
 * Single source of truth for the visual system.
 * Import from `@/src/theme` — never from individual screens, never raw values.
 */
export const theme = {
  colors,
  rarity,
  state,
  typography,
  spacing,
  radii,
  shadows,
  motion,
  zIndex,
} as const;

export type Theme = typeof theme;

export { colors, rarity, state } from '@/src/theme/colors';
export type { ColorToken, Rarity, RealmState } from '@/src/theme/colors';
export { motion } from '@/src/theme/motion';
export type { HapticEvent } from '@/src/theme/motion';
export { radii } from '@/src/theme/radii';
export type { RadiiToken } from '@/src/theme/radii';
export { shadows } from '@/src/theme/shadows';
export type { ShadowToken } from '@/src/theme/shadows';
export { spacing } from '@/src/theme/spacing';
export type { SpacingToken } from '@/src/theme/spacing';
export { typography } from '@/src/theme/typography';
export type { TypographyToken } from '@/src/theme/typography';
export { zIndex } from '@/src/theme/zIndex';
export type { ZIndexToken } from '@/src/theme/zIndex';
