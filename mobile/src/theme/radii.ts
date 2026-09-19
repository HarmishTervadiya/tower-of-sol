export const radii = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  full: 999,
} as const;

export type RadiiToken = keyof typeof radii;
