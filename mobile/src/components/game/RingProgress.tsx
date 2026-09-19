import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { semantic } from '@/src/theme';
import { GameText } from '@/src/components/game/GameText';

/**
 * Level ring (ref-5): SVG circle progress with a centered label.
 * Pure SVG — no Skia needed for this class of indicator.
 */
export function RingProgress({
  value,
  size = 120,
  accent,
  label,
}: {
  value: number;
  size?: number;
  accent: string;
  label: string;
}) {
  const pct = Math.min(1, Math.max(0, value));
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={semantic.progressTrack}
          strokeWidth={stroke}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={accent}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${c}`}
          strokeDashoffset={c * (1 - pct)}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <GameText variant="title" tone="primary">
        {label}
      </GameText>
    </View>
  );
}
