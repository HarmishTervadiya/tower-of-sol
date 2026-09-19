import { Easing, FadeIn, FadeInDown, FadeOut, SlideInRight, ZoomIn } from 'react-native-reanimated';

/**
 * Central motion system. Screens compose these primitives — never invent
 * ad-hoc durations, curves, or spring configs (see mobile-animation skill).
 *
 * Rules baked in from expo-animation guidance:
 * - finger involved → spring (carries velocity through interruption)
 * - everything else → timing, UI stays under 300ms (cinematic sequences exempt)
 * - never `ease-in` on UI; `outExpo` is the default curve
 * - animate transform/opacity only — never layout props, blur, or elevation
 */
export const durations = {
  instant: 80,
  fast: 150,
  normal: 250,
  slow: 400,
  cinematic: 900,
} as const;

export const easings = {
  /** Default UI curve. */
  outExpo: Easing.bezier(0.23, 1, 0.32, 1),
  standard: Easing.bezier(0.4, 0, 0.2, 1),
  linear: Easing.linear,
} as const;

export const springs = {
  /** Default for gesture-driven motion. */
  finger: { damping: 22, stiffness: 260 },
  gentle: { damping: 20, stiffness: 120 },
  bouncy: { damping: 12, stiffness: 220 },
} as const;

/** Mount/unmount presets. Pair with `useReducedMotion` → `FadeIn` fallback. */
export const entering = {
  rise: (delayMs = 0) => FadeInDown.duration(durations.normal).delay(delayMs),
  fade: (delayMs = 0) => FadeIn.duration(durations.normal).delay(delayMs),
  pop: (delayMs = 0) => ZoomIn.springify().damping(16).delay(delayMs),
  slideFromRight: (delayMs = 0) => SlideInRight.duration(durations.fast).delay(delayMs),
} as const;

export const exiting = {
  fade: () => FadeOut.duration(durations.fast),
} as const;

/** Press feedback — scale + opacity, never layout. */
export const press = {
  scale: 0.96,
  opacity: 0.85,
} as const;

/** Generic gesture thresholds. Game-specific ones (climb snap, duel timing)
 *  belong in the feature module, derived from these. */
export const thresholds = {
  /** Flick velocity (px/s) that counts as intent regardless of distance. */
  flickVelocity: 500,
  /** Drag distance (px) that counts as intent regardless of velocity. */
  commitDistance: 120,
  /** Min touch target (px) for all game controls. */
  touchTarget: 44,
} as const;

/**
 * Semantic haptic events → tap kinds. `src/lib/haptics:gameHaptic` interprets
 * this map. One haptic per commit, always paired with a visual — never per frame.
 */
export const hapticMap = {
  select: 'light',
  probe: 'medium',
  commit: 'medium',
  win: 'success',
  lose: 'error',
  transcend: 'success',
} as const;

export type HapticEvent = keyof typeof hapticMap;

export const motion = {
  durations,
  easings,
  springs,
  entering,
  exiting,
  press,
  thresholds,
  hapticMap,
} as const;
