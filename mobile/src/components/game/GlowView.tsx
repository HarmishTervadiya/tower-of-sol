import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { glowStyle, motion } from '@/src/theme';

/**
 * Static glow wrapper. `pulse` breathes opacity on the UI thread only
 * (transform/opacity — never the shadow itself, per motion-performance).
 */
export function GlowView({
  accent,
  strength = 'soft',
  pulse = false,
  children,
  style,
}: {
  accent: string;
  strength?: 'soft' | 'strong';
  pulse?: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (pulse) {
      opacity.set(withRepeat(withTiming(0.55, { duration: motion.durations.slow }), -1, true));
    }
    return () => cancelAnimation(opacity);
  }, [pulse, opacity]);

  const animated = useAnimatedStyle(() => ({ opacity: opacity.get() }));

  return (
    <Animated.View style={[glowStyle(accent, strength), animated, style]}>
      <View>{children}</View>
    </Animated.View>
  );
}
