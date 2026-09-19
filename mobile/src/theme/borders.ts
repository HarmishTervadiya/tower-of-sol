/** Raw border widths. Colors come from semantic roles, never raw hex. */
export const borders = {
  hairline: 1,
  thin: 1.5,
  thick: 2,
  /** Chamfer cut size (px) for bevelled game buttons/panels. */
  chamfer: 10,
  /** Corner-ornament arm length (px) on ornate panels (ref-7 reward frame). */
  ornamentArm: 18,
} as const;

export type BorderToken = keyof typeof borders;
