import { View } from 'react-native';
import { colors, radius } from '@/src/theme/tokens';

export function ProgressBar({ value, max, accent }: { value: number; max: number; accent: string }) {
  const pct = Math.min(1, Math.max(0, max === 0 ? 0 : value / max));
  return (
    <View style={{ height: 8, backgroundColor: colors.surface2, borderRadius: radius.full }}>
      <View
        style={{
          width: `${pct * 100}%`,
          height: '100%',
          backgroundColor: accent,
          borderRadius: radius.full,
        }}
      />
    </View>
  );
}
