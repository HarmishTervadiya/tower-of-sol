import { Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '@/src/theme';

export function Badge({
  label,
  tone = 'gold',
}: {
  label: string;
  tone?: 'gold' | 'violet' | 'dim';
}) {
  const bg =
    tone === 'gold' ? colors.goldDeep : tone === 'violet' ? colors.violetDeep : colors.surface2;
  const fg = tone === 'gold' ? colors.goldSoft : tone === 'violet' ? colors.violetSoft : colors.dim;
  return (
    <View
      style={{
        alignSelf: 'flex-start',
        backgroundColor: bg,
        borderRadius: radii.full,
        paddingVertical: 4,
        paddingHorizontal: spacing.sm,
        borderWidth: 1,
        borderColor: colors.line,
      }}
    >
      <Text style={[typography.label, { color: fg, fontSize: 11 }]}>{label.toUpperCase()}</Text>
    </View>
  );
}
