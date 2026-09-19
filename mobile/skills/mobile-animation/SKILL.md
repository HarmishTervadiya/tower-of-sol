---
name: mobile-animation
description: Build animations in the Tower of Sol Expo app. Use when animating anything — entering/exiting, press feedback, progress, game-state transitions, screen transitions, or fixing motion that stutters on device. Follows expo-animation decision order and Reanimated 4 UI-thread rules.
---

# mobile-animation

Stack: Reanimated 4.5.1 + `react-native-worklets` 0.10.1, Expo SDK 57, New Architecture.
Decisions here follow the `expo-animation` skill (expo/skills, MIT) and
Software Mansion Reanimated docs. That skill is the deep reference; this file is
the Tower-specific binding.

## Decision order (gate everything through this)

1. **Should it animate?** Static rows, settings toggles, platform defaults → no animation.
2. **Which thread?** UI runtime always. Anything touching the RN runtime per frame stutters.
3. **Which properties?** `transform` + `opacity` only. Never layout (`height`/`width`/`margin`/`flex`/`top`), never `BlurView` intensity, never Android `elevation` — crossfade a static layer instead.
4. **Spring or timing?** Finger involved → spring (carries velocity through interruption). Everything else → timing, UI under 300ms (`theme.motion.durations`; cinematic sequences exempt).
5. **How does the gesture hand off?** Interruptible, velocity-preserving (see gesture-interaction skill).
6. **How does it degrade?** Reduced motion ships with the animation, low-end fallback named.

## Reanimated 4 patterns (this project)

- State-driven change, no gesture (press, toggle, color flip) → **CSS transition** in style (`transitionProperty`).
- Loop / multi-stage / plays-on-mount → **CSS keyframes** or `useSharedValue` + `withRepeat`.
- Mount/unmount or list reflow → **layout animations**: compose from `theme.motion.entering/exiting`
  (`motion.entering.rise()`, `.fade()`, `.pop()`, `.slideFromRight()`). Never `entering` on a
  virtualized list row — animate the container or use `itemLayoutAnimation`.
- Anything a finger touches or derived from scroll → `useSharedValue` + `Gesture` + `useAnimatedStyle`.
- Screen-to-screen → **native stack config** in `app/_layout.tsx` (`animation`, `animationMatchesGesture`),
  never a JS-rebuilt transition. Tabs: `animation: 'none'`.
- Core `Animated` is banned for anything a finger touches (`PanResponder` likewise banned).

## Reanimated 4 specifics (SDK 57)

- Worklets live in `react-native-worklets`; import worklet helpers from there, not
  `react-native-reanimated` (re-exports are deprecated).
- `runOnJS` is removed → use `scheduleOnRN` from `react-native-worklets`, and only in
  `onEnd` or a threshold-crossing `useAnimatedReaction` — never per frame in `onUpdate`.
- `useAnimatedGestureHandler` is removed → use the `Gesture` API (see gesture-interaction).
- `withSpring` v4: `duration` is now *perceptual* (actual ≈ 1.5×); thresholds replaced by
  single `energyThreshold`. Prefer `theme.motion.springs` presets over inline configs.
- No `babel.config.js` in this repo by design: `babel-preset-expo` already includes the
  Worklets plugin on SDK 57. Add one only when customizing the pipeline.
- Never read/write a shared value during render — `.get()`/`.set()` in worklets, handlers, effects.

## Curves

Never `Easing.in(...)` on UI, never `scale(0)` entrances. Defaults live in `theme.motion`:
`easings.outExpo` (`bezier(0.23, 1, 0.32, 1)`), `press` (`scale 0.96`, `opacity 0.85`).

## Reduced motion

```tsx
import { useReducedMotion, FadeIn } from 'react-native-reanimated';
const reduced = useReducedMotion();
<Animated.View entering={reduced ? FadeIn.duration(80) : motion.entering.rise()} />
```

## Lifecycle / cleanup

- Cancel in-flight animations on unmount (`cancelAnimation(shared)` in effect cleanup).
- `useAnimatedReaction` side-effects that call into RN must go through `scheduleOnRN` once per threshold cross.
- Keep animated component count small; extract animated leaves so parents don't re-render.
