import type { TextStyle } from 'react-native';

export const colors = {
  void: '#0B0B16',
  abyss: '#121222',
  surface: '#1A1A2E',
  surface2: '#23233B',
  line: '#2E2E4D',
  gold: '#E8B44A',
  goldSoft: '#F5D48A',
  violet: '#7C5CFF',
  violetSoft: '#A68CFF',
  ember: '#FF6B4A',
  jade: '#3DDC97',
  frost: '#7BDFF2',
  ink: '#F4F1EA',
  dim: '#A7A7C4',
  faint: '#6B6B8A',
} as const;

export type ColorToken = keyof typeof colors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  full: 999,
} as const;

export const typeScale: Record<'display' | 'h1' | 'h2' | 'body' | 'caption' | 'label', TextStyle> = {
  display: { fontSize: 34, fontWeight: '800', letterSpacing: -0.5 },
  h1: { fontSize: 24, fontWeight: '800' },
  h2: { fontSize: 18, fontWeight: '700' },
  body: { fontSize: 15, fontWeight: '400', lineHeight: 22 },
  caption: { fontSize: 13, fontWeight: '400', lineHeight: 18 },
  label: { fontSize: 12, fontWeight: '700', letterSpacing: 1.2 },
};

export const theme = { colors, spacing, radius, typeScale } as const;
export type Theme = typeof theme;
