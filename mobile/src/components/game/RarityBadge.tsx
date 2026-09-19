import { Text, View } from 'react-native';
import { borders, glowStyle, radii, rarity, spacing, typography, type Rarity } from '@/src/theme';

/** Loot/trial rarity pill with diamond dot. Colors from the rarity scale. */
export function RarityBadge({ rarity: level, label }: { rarity: Rarity; label?: string }) {
  const color = rarity[level];
  return (
    <View
      style={[
        {
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.xs,
          borderWidth: borders.hairline,
          borderColor: color,
          borderRadius: radii.full,
          paddingVertical: spacing.xs,
          paddingHorizontal: spacing.sm,
          backgroundColor: 'rgba(11, 11, 22, 0.6)',
        },
        glowStyle(color, 'soft'),
      ]}
    >
      <View
        style={{ width: 8, height: 8, transform: [{ rotate: '45deg' }], backgroundColor: color }}
      />
      <Text style={[typography.micro, { color }]}>{(label ?? level).toUpperCase()}</Text>
    </View>
  );
}
