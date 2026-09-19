import { Pressable, Text, type StyleProp, type ViewStyle } from 'react-native';
import { colors, motion, radii, spacing, typography } from '@/src/theme';
import { tap } from '@/src/lib/haptics';

type Variant = 'primary' | 'ghost' | 'danger';

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}: {
  title: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const bg =
    variant === 'primary' ? colors.gold : variant === 'danger' ? colors.ember : 'transparent';
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={() => {
        void tap('light');
        onPress();
      }}
      style={({ pressed }) => [
        {
          backgroundColor: bg,
          borderRadius: radii.md,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          alignItems: 'center',
          borderWidth: variant === 'ghost' ? 1 : 0,
          borderColor: colors.line,
          opacity: disabled ? 0.45 : pressed ? motion.press.opacity : 1,
        },
        style,
      ]}
    >
      <Text
        style={[
          typography.label,
          { color: variant === 'primary' ? colors.inkOnGold : variant === 'danger' ? colors.white : colors.ink },
        ]}
      >
        {title.toUpperCase()}
      </Text>
    </Pressable>
  );
}
