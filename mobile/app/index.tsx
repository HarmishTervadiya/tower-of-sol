import { useEffect } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  FadeIn,
  FadeInDown,
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameBackground } from '@/src/components/game/GameBackground';
import { GameText } from '@/src/components/game/GameText';
import { borders, glowStyle, motion, opacity, radii, semantic, spacing } from '@/src/theme';

const SPLASH_STILL = require('../assets/images/key-art/splash-still.jpg');
const SPLASH_PLACEHOLDER = 'LEHV6nWB2yk8pyoJadR*.7kCMdnj';

/**
 * SCREEN 1 — cinematic title card (ui-ref/screen1.png).
 * Photographic key art full-bleed with a slow push-in, theme legibility
 * scrims, a faint halo pulse echoing the lit ring baked into the photo, and
 * titles rising in. The `0:00–0:04` stamp in the ref is storyboard chrome,
 * not app UI — deliberately omitted. The SVG lightning/wisp/monolith layers
 * from the placeholder scene are dropped: the photo already carries the halo,
 * monoliths, and storm banks, so extra bolts would compete with it.
 */
export default function Screen1() {
  const { width, height } = useWindowDimensions();
  const reduced = useReducedMotion() ?? false;
  const seq = motion.sequence.splash;

  const push = useSharedValue(0);
  const haloPulse = useSharedValue(0);

  useEffect(() => {
    if (reduced) {
      return () => {
        cancelAnimation(push);
        cancelAnimation(haloPulse);
      };
    }
    push.set(withTiming(1, { duration: seq.pushMs, easing: motion.easings.linear }));
    haloPulse.set(
      withDelay(
        seq.ringPulseDelayMs,
        withRepeat(withTiming(1, { duration: seq.ringPulseMs }), -1, true),
      ),
    );
    return () => {
      cancelAnimation(push);
      cancelAnimation(haloPulse);
    };
  }, [reduced, push, haloPulse, seq.pushMs, seq.ringPulseDelayMs, seq.ringPulseMs]);

  const photoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(push.get(), [0, 1], [1, seq.pushScale]) }],
  }));
  const haloStyle = useAnimatedStyle(() => ({
    opacity: interpolate(haloPulse.get(), [0, 1], [opacity.soft, opacity.medium]),
  }));

  const haloWidth = Math.round(width * 0.86);
  const haloHeight = Math.round(height * 0.055);

  return (
    <GameBackground
      realm="order"
      veil
      artwork={
        <Animated.View
          style={[{ position: 'absolute', top: 0, left: 0, width, height }, photoStyle]}
        >
          <Image
            source={SPLASH_STILL}
            placeholder={SPLASH_PLACEHOLDER}
            placeholderContentFit="cover"
            contentFit="cover"
            transition={motion.durations.fast}
            style={{ width, height }}
          />
        </Animated.View>
      }
    >
      {/* faint echo of the lit ring baked into the photo */}
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: 'absolute',
            top: Math.round(height * 0.17),
            left: Math.round((width - haloWidth) / 2),
            width: haloWidth,
            height: haloHeight,
            borderWidth: borders.thin,
            borderColor: semantic.info,
            borderRadius: radii.full,
            ...glowStyle(semantic.info),
          },
          haloStyle,
        ]}
      />

      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <View style={{ flex: 1.08 }} />
        <Animated.View
          entering={
            reduced
              ? FadeIn.duration(motion.durations.instant)
              : FadeInDown.duration(motion.durations.cinematic)
                  .easing(motion.easings.outExpo)
                  .delay(seq.titlesDelayMs)
          }
          style={{ alignItems: 'center', gap: spacing.sm }}
        >
          <GameText variant="display">WORLD TOWER</GameText>
          <GameText variant="label" tone="secondary">
            THE TOWER IS AWAKE.
          </GameText>
        </Animated.View>
        <View style={{ flex: 1 }} />
      </SafeAreaView>
    </GameBackground>
  );
}
