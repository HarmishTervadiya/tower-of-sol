import { View, type StyleProp, type ViewStyle } from 'react-native';
import { glowStyle, radii, resolveRealmTheme, semantic, spacing } from '@/src/theme';
import { GameText } from '@/src/components/game/GameText';

/**
 * Thin glowing progress bar (XP, transcend, round timer). Fill color follows the
 * Realm accent; `tone="complete"` pins jade for finished states.
 */
export function GameProgress({
  value,
  max,
  realm,
  tone = 'realm',
  timerLabel,
  style,
}: {
  value: number;
  max: number;
  realm?: string;
  tone?: 'realm' | 'complete';
  timerLabel?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const pct = Math.min(1, Math.max(0, max === 0 ? 0 : value / max));
  const fill =
    tone === 'complete' ? semantic.progressComplete : resolveRealmTheme(realm ?? 'tower').accent;
  return (
    <View style={[{ gap: spacing.xs }, style]}>
      <View
        style={{ height: 6, backgroundColor: semantic.progressTrack, borderRadius: radii.full }}
      >
        <View
          style={[
            {
              width: `${pct * 100}%`,
              height: '100%',
              backgroundColor: fill,
              borderRadius: radii.full,
            },
            glowStyle(fill, 'soft'),
          ]}
        />
      </View>
      {timerLabel ? (
        <GameText variant="timer" tone="secondary">
          {timerLabel}
        </GameText>
      ) : null}
    </View>
  );
}
