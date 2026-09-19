import { Pressable, Text, type StyleProp, type ViewStyle } from 'react-native';
import { colors, radius, spacing, typeScale } from '@/src/theme/tokens';
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
          borderRadius: radius.md,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          alignItems: 'center',
          borderWidth: variant === 'ghost' ? 1 : 0,
          borderColor: colors.line,
          opacity: disabled ? 0.45 : pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      <Text
        style={[
          typeScale.label,
          { color: variant === 'primary' ? '#1A1206' : variant === 'danger' ? '#fff' : colors.ink },
        ]}
      >
        {title.toUpperCase()}
      </Text>
    </Pressable>
  );
}
