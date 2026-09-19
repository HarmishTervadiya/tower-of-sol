import { colors } from '@/src/theme/colors';
import type { GradientToken } from '@/src/theme/gradients';

/** Realms with live data plus ref-defined future floors (Order, Wealth). */
export type RealmThemeKey = 'shadows' | 'flow' | 'artifacts' | 'order' | 'wealth';

export interface RealmTheme {
  key: RealmThemeKey;
  /** Primary accent: sigils, selections, progress fill, button glow. */
  accent: string;
  /** Soft tint for secondary text/icons on this Realm. */
  accentSoft: string;
  /** Deep wash for selected/pill backgrounds. */
  accentDeep: string;
  /** Atmosphere gradient behind Realm content. */
  atmosphere: GradientToken;
  /** Glow color for selections, badges, CTA outlines. */
  glow: string;
}

/** Partial override — Guardian identity or trial state without a rewrite. */
export type ThemeOverlay = Partial<Pick<RealmTheme, 'accent' | 'accentSoft' | 'glow'>>;

export function composeRealmTheme(base: RealmTheme, overlay: ThemeOverlay): RealmTheme {
  return { ...base, ...overlay };
}

function goldRealm(key: RealmThemeKey): RealmTheme {
  return {
    key,
    accent: colors.gold,
    accentSoft: colors.goldSoft,
    accentDeep: colors.goldDeep,
    atmosphere: 'arcane',
    glow: colors.gold,
  };
}

const REALM_THEMES: Record<RealmThemeKey, RealmTheme> = {
  shadows: {
    key: 'shadows',
    accent: colors.violet,
    accentSoft: colors.violetSoft,
    accentDeep: colors.violetDeep,
    atmosphere: 'arcane',
    glow: colors.violet,
  },
  flow: {
    key: 'flow',
    accent: colors.jade,
    accentSoft: colors.jade,
    accentDeep: '#0F2B22',
    atmosphere: 'emeraldFlow',
    glow: colors.jade,
  },
  artifacts: goldRealm('artifacts'),
  order: {
    key: 'order',
    accent: colors.frost,
    accentSoft: colors.frost,
    accentDeep: '#14273B',
    atmosphere: 'frostMarket',
    glow: colors.frost,
  },
  wealth: goldRealm('wealth'),
};

/** Fallback identity for unknown keys — Tower gold. */
const fallback = goldRealm('shadows');

/** Resolve a Realm's visual identity. Unknown keys fall back to Tower gold. */
export function resolveRealmTheme(key: string): RealmTheme {
  return (REALM_THEMES as Record<string, RealmTheme>)[key] ?? fallback;
}
