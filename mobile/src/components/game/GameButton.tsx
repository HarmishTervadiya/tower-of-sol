import { useState } from 'react';
import {
  Pressable,
  Text,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import {
  borders,
  glowStyle,
  motion,
  radii,
  semantic,
  spacing,
  typography,
  type HapticEvent,
} from '@/src/theme';
import { gameHaptic } from '@/src/lib/haptics';

type Variant = 'primary' | 'ghost' | 'danger';

/**
 * Signature game CTA: bevelled (chamfered) outline button with glow, or a soft
 * rounded fallback. Press = opacity + scale snap (motion.press) + one haptic.
 */
export function GameButton({
  title,
  onPress,
  variant = 'primary',
  shape = 'bevel',
  haptic = 'commit',
  disabled = false,
  style,
}: {
  title: string;
  onPress: () => void;
  variant?: Variant;
  shape?: 'bevel' | 'soft';
  haptic?: HapticEvent;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize((s) => (s.w === width && s.h === height ? s : { w: width, h: height }));
  };

  const border =
    variant === 'primary'
      ? semantic.actionPrimaryBorder
      : variant === 'danger'
        ? semantic.actionDangerBorder
        : semantic.actionGhostBorder;
  const text =
    variant === 'primary'
      ? semantic.actionPrimaryText
      : variant === 'danger'
        ? semantic.actionDangerText
        : semantic.actionGhostText;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onLayout={onLayout}
      onPress={() => {
        void gameHaptic(haptic);
        onPress();
      }}
      style={({ pressed }) => [
        {
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.xl,
          opacity: disabled ? 0.45 : pressed ? motion.press.opacity : 1,
          transform: [{ scale: pressed ? motion.press.scale : 1 }],
          ...(shape === 'bevel'
            ? glowStyle(border, 'soft')
            : {
                borderWidth: borders.hairline,
                borderColor: border,
                borderRadius: radii.md,
                backgroundColor: 'rgba(11, 11, 22, 0.55)',
              }),
        },
        style,
      ]}
    >
      {shape === 'bevel' && size.w > 0 ? (
        <ChamferBorder w={size.w} h={size.h} color={border} />
      ) : null}
      <Text style={[typography.label, { color: text, letterSpacing: 2 }]}>
        {title.toUpperCase()}
      </Text>
    </Pressable>
  );
}

function chamferPoints(w: number, h: number): string {
  const c = borders.chamfer;
  return `${c},0 ${w - c},0 ${w},${c} ${w},${h - c} ${w - c},${h} ${c},${h} 0,${h - c} 0,${c}`;
}

function ChamferBorder({ w, h, color }: { w: number; h: number; color: string }) {
  return (
    <Svg
      width={w}
      height={h}
      style={{ position: 'absolute', top: 0, left: 0 }}
      pointerEvents="none"
    >
      <Polygon
        points={chamferPoints(w, h)}
        fill="rgba(11, 11, 22, 0.55)"
        stroke={color}
        strokeWidth={borders.hairline}
      />
    </Svg>
  );
}
