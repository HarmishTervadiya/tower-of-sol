/** Raw opacity scale for scrims, disabled states, press feedback baselines. */
export const opacity = {
  transparent: 0,
  faint: 0.08,
  soft: 0.16,
  medium: 0.45,
  strong: 0.75,
  solid: 1,
} as const;

export type OpacityToken = keyof typeof opacity;
