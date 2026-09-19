import { colors } from '@/src/theme/colors';

/**
 * Semantic UI roles — the only colors screens/components may use.
 * Realm- or Guardian-specific values resolve via `realms.ts`, never here.
 */
export const semantic = {
  screenBackground: colors.void,
  surface: colors.surface,
  surfaceTranslucent: 'rgba(26, 26, 46, 0.82)',
  surfaceRaised: colors.surface2,
  line: colors.line,
  divider: colors.line,

  textPrimary: colors.ink,
  textSecondary: colors.dim,
  textFaint: colors.faint,
  textOnAccent: colors.inkOnGold,

  actionPrimaryBorder: colors.gold,
  actionPrimaryText: colors.goldSoft,
  actionGhostBorder: colors.line,
  actionGhostText: colors.ink,
  actionDangerBorder: colors.ember,
  actionDangerText: colors.ember,

  progressTrack: colors.surface2,
  progressComplete: colors.jade,

  rewardHighlight: colors.gold,
  rewardSub: colors.goldSoft,

  lockedBg: colors.surface,
  lockedText: colors.faint,
  lockedBorder: colors.line,

  danger: colors.ember,
  success: colors.jade,
  info: colors.frost,
} as const;

export type SemanticToken = keyof typeof semantic;
