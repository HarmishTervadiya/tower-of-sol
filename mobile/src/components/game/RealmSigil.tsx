import { View } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import { borders, glowStyle, radii, resolveRealmTheme, semantic } from '@/src/theme';
import { GameText } from '@/src/components/game/GameText';

/**
 * Realm sigil: diamond frame in the Realm accent with a centered mark
 * (floor icons on the climb, guardian badges, trial headers).
 */
export function RealmSigil({
  realm,
  mark,
  size = 56,
}: {
  realm: string;
  mark: string;
  size?: number;
}) {
  const rt = resolveRealmTheme(realm);
  const half = size / 2;
  return (
    <View
      style={[
        { width: size, height: size, alignItems: 'center', justifyContent: 'center' },
        glowStyle(rt.glow, 'soft'),
      ]}
    >
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Polygon
          points={`${half},2 ${size - 2},${half} ${half},${size - 2} 2,${half}`}
          fill={rt.accentDeep}
          stroke={rt.accent}
          strokeWidth={borders.thin}
        />
      </Svg>
      <View
        style={{
          width: size * 0.52,
          height: size * 0.52,
          borderRadius: radii.full,
          backgroundColor: semantic.surface,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <GameText variant="body" tone="primary">
          {mark}
        </GameText>
      </View>
    </View>
  );
}
