import type { LinearGradientProps } from 'expo-linear-gradient';

type GradientDef = Pick<LinearGradientProps, 'colors' | 'start' | 'end'>;

/**
 * Raw gradient definitions. Realm-tinted atmospheres are selected in
 * `realms.ts` — screens never pick gradient stops directly.
 */
export const gradients = {
  /** App base: abyss top → void bottom. */
  abyss: {
    colors: ['#141428', '#0B0B16'],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  /** Violet arcane atmosphere (Shadows, level-up bursts). */
  arcane: {
    colors: ['#2A2150', '#0B0B16'],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  /** Ice-blue market atmosphere (Order). */
  frostMarket: {
    colors: ['#14273B', '#0B0B16'],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  /** Royal gold atmosphere (Wealth, rewards, transcend). */
  royalGold: {
    colors: ['#2E2410', '#0B0B16'],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  /** Emerald flow atmosphere (Flow). */
  emeraldFlow: {
    colors: ['#0F2B22', '#0B0B16'],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  /** Legibility scrim over full-bleed art: transparent → void. */
  scrimBottom: {
    colors: ['transparent', 'rgba(11, 11, 22, 0.55)', '#0B0B16'],
    start: { x: 0.5, y: 0.35 },
    end: { x: 0.5, y: 1 },
  },
  scrimTop: {
    colors: ['#0B0B16', 'rgba(11, 11, 22, 0.55)', 'transparent'],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 0.4 },
  },
  /** Radial-burst fake: bright core → transparent (behind emblems/rings). */
  burst: {
    colors: ['rgba(124, 92, 255, 0.35)', 'rgba(124, 92, 255, 0.08)', 'transparent'],
    start: { x: 0.5, y: 0.35 },
    end: { x: 0.5, y: 0.75 },
  },
  /** Gold hairline used for top accent ticks on panels/buttons. */
  goldTick: {
    colors: ['#E8B44A', 'transparent'],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  },
} satisfies Record<string, GradientDef>;

export type GradientToken = keyof typeof gradients;
