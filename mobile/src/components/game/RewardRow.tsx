import type { ReactNode } from 'react';
import { View } from 'react-native';
import { borders, semantic, spacing } from '@/src/theme';
import { GameText } from '@/src/components/game/GameText';

/** Reward ledger row: icon + amount + caption (+240 XP / +1.8 SKR, ref-7). */
export function RewardRow({
  icon,
  amount,
  caption,
}: {
  icon: ReactNode;
  amount: string;
  caption: string;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        borderBottomWidth: borders.hairline,
        borderBottomColor: semantic.divider,
        paddingVertical: spacing.sm,
      }}
    >
      {icon}
      <GameText variant="body" tone="primary">
        {amount}
      </GameText>
      <GameText variant="caption" tone="faint">
        {caption}
      </GameText>
    </View>
  );
}
