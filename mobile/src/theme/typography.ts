import type { TextStyle } from 'react-native';

/**
 * Display serif (Cinzel, loaded in `app/_layout.tsx`) for realm/guardian/trial
 * titles — the refs set every major title in letterspaced serif. Body stays on
 * the system sans; timers use tabular numerals so holding clocks don't jitter.
 */
export const fonts = {
  display: 'Cinzel_700Bold',
} as const;

export const typography = {
  display: {
    fontFamily: fonts.display,
    fontSize: 30,
    letterSpacing: 3,
  },
  h1: { fontSize: 24, fontWeight: '800' },
  h2: { fontSize: 18, fontWeight: '700' },
  body: { fontSize: 15, fontWeight: '400', lineHeight: 22 },
  caption: { fontSize: 13, fontWeight: '400', lineHeight: 18 },
  label: { fontSize: 12, fontWeight: '700', letterSpacing: 1.2 },
  micro: { fontSize: 11, fontWeight: '700', letterSpacing: 0.8 },
  timer: { fontSize: 20, fontWeight: '700', fontVariant: ['tabular-nums'], letterSpacing: 1 },
} satisfies Record<string, TextStyle>;

export type TypographyToken = keyof typeof typography;
