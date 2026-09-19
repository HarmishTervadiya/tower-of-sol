import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { borders, gradients, radii, semantic, shadows, spacing } from '@/src/theme';

/**
 * Game panel: surface + hairline border + top accent tick.
 * `ornate` adds gold corner ornaments (reward frames, ref-7).
 */
export function GamePanel({
  variant = 'default',
  accentTick = true,
  children,
  style,
}: {
  variant?: 'default' | 'ornate' | 'translucent';
  accentTick?: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        {
          backgroundColor:
            variant === 'translucent' ? semantic.surfaceTranslucent : semantic.surface,
          borderRadius: radii.lg,
          borderWidth: borders.hairline,
          borderColor: semantic.line,
          padding: spacing.lg,
          gap: spacing.sm,
          overflow: 'hidden',
        },
        variant === 'ornate' ? shadows.md : null,
        style,
      ]}
    >
      {accentTick ? (
        <LinearGradient
          colors={gradients.goldTick.colors}
          start={gradients.goldTick.start}
          end={gradients.goldTick.end}
          style={{ position: 'absolute', top: 0, left: spacing.lg, right: spacing.lg, height: 2 }}
        />
      ) : null}
      {variant === 'ornate' ? <CornerOrnaments /> : null}
      {children}
    </View>
  );
}

function CornerOrnaments() {
  const arm = borders.ornamentArm;
  const c: ViewStyle = {
    position: 'absolute',
    width: arm,
    height: arm,
    borderColor: semantic.rewardHighlight,
  };
  return (
    <>
      <View
        style={[
          c,
          { top: 6, left: 6, borderTopWidth: borders.thin, borderLeftWidth: borders.thin },
        ]}
      />
      <View
        style={[
          c,
          { top: 6, right: 6, borderTopWidth: borders.thin, borderRightWidth: borders.thin },
        ]}
      />
      <View
        style={[
          c,
          { bottom: 6, left: 6, borderBottomWidth: borders.thin, borderLeftWidth: borders.thin },
        ]}
      />
      <View
        style={[
          c,
          { bottom: 6, right: 6, borderBottomWidth: borders.thin, borderRightWidth: borders.thin },
        ]}
      />
    </>
  );
}
