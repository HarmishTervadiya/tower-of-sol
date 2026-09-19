import type { TextStyle } from 'react-native';

export const typography = {
  display: { fontSize: 34, fontWeight: '800', letterSpacing: -0.5 },
  h1: { fontSize: 24, fontWeight: '800' },
  h2: { fontSize: 18, fontWeight: '700' },
  body: { fontSize: 15, fontWeight: '400', lineHeight: 22 },
  caption: { fontSize: 13, fontWeight: '400', lineHeight: 18 },
  label: { fontSize: 12, fontWeight: '700', letterSpacing: 1.2 },
} satisfies Record<string, TextStyle>;

export type TypographyToken = keyof typeof typography;
