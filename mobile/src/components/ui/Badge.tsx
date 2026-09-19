import { Text, View } from 'react-native';
import { colors, radius, spacing, typeScale } from '@/src/theme/tokens';

export function Badge({ label, tone = 'gold' }: { label: string; tone?: 'gold' | 'violet' | 'dim' }) {
  const bg = tone === 'gold' ? '#2A2111' : tone === 'violet' ? '#221D3D' : colors.surface2;
  const fg = tone === 'gold' ? colors.goldSoft : tone === 'violet' ? colors.violetSoft : colors.dim;
  return (
    <View
      style={{
        alignSelf: 'flex-start',
        backgroundColor: bg,
        borderRadius: radius.full,
        paddingVertical: 4,
        paddingHorizontal: spacing.sm,
        borderWidth: 1,
        borderColor: colors.line,
      }}
    >
      <Text style={[typeScale.label, { color: fg, fontSize: 11 }]}>{label.toUpperCase()}</Text>
    </View>
  );
}
