import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius, spacing } from '@/src/theme/tokens';

export function Card({
  children,
  accent,
  style,
}: {
  children: ReactNode;
  accent?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: radius.lg,
          borderWidth: 1,
          borderColor: colors.line,
          padding: spacing.lg,
          gap: spacing.sm,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {accent ? (
        <LinearGradient
          colors={[accent, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, opacity: 0.9 }}
        />
      ) : null}
      {children}
    </View>
  );
}
