/** Layer order. Screens must use these, never raw zIndex numbers. */
export const zIndex = {
  base: 0,
  content: 1,
  sticky: 10,
  overlay: 50,
  sheet: 100,
  toast: 200,
} as const;

export type ZIndexToken = keyof typeof zIndex;
