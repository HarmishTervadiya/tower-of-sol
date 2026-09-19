import type { ReactNode } from 'react';
import { Text, type StyleProp, type TextStyle } from 'react-native';
import { semantic, typography, type TypographyToken } from '@/src/theme';

type Variant = 'display' | 'title' | 'body' | 'caption' | 'label' | 'timer';
type Tone = 'primary' | 'secondary' | 'faint' | 'reward' | 'danger' | 'success' | 'info';

const variantMap: Record<Variant, TypographyToken> = {
  display: 'display',
  title: 'h1',
  body: 'body',
  caption: 'caption',
  label: 'label',
  timer: 'timer',
};

const toneMap: Record<Tone, string> = {
  primary: semantic.textPrimary,
  secondary: semantic.textSecondary,
  faint: semantic.textFaint,
  reward: semantic.rewardHighlight,
  danger: semantic.danger,
  success: semantic.success,
  info: semantic.info,
};

/**
 * Typographic roles. `display` = letterspaced serif for realm/guardian/trial
 * titles; `timer` = tabular numerals for holding clocks and round timers.
 */
export function GameText({
  variant = 'body',
  tone = 'primary',
  children,
  style,
}: {
  variant?: Variant;
  tone?: Tone;
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <Text style={[typography[variantMap[variant]], { color: toneMap[tone] }, style]}>
      {children}
    </Text>
  );
}
