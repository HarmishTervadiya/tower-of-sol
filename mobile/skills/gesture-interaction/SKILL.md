---
name: gesture-interaction
description: Build tap, swipe, pan, and drag interactions in the Tower of Sol Expo app. Use when adding gestures, sheets, swipe-to-climb tower navigation, trial picking, press feedback, or debugging gestures that don't fire. react-native-gesture-handler v2 + Reanimated 4.
---

# gesture-interaction

Stack: `react-native-gesture-handler` ~2.32.0 (SDK 57 / Expo Go line), Reanimated 4,
`GestureHandlerRootView` at `app/_layout.tsx` root. v3 hook gestures are deferred
until the dev-client milestone (MWA needs one anyway) — see Compatibility below.

## Setup invariants

- Every gesture must mount under the root `GestureHandlerRootView`. If a gesture doesn't
  fire, check ancestry first.
- Content inside a native `Modal` needs its own `GestureHandlerRootView` (the onboarding
  route uses `presentation: 'modal'` — wrap before adding gestures there).
- Touch targets ≥ `theme.motion.thresholds.touchTarget` (44px) for all game controls.

## Gesture patterns (v2 builder API)

```tsx
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

const translateY = useSharedValue(0);
const pan = Gesture.Pan()
  .onUpdate((e) => {
    translateY.set(e.translationY);
  }) // UI thread, no setState
  .onEnd((e) => {
    const commit =
      Math.abs(e.velocityY) > motion.thresholds.flickVelocity ||
      Math.abs(e.translationY) > motion.thresholds.commitDistance;
    if (commit) scheduleOnRN(onCommit)(); // RN once, at the end
    translateY.set(withSpring(0, motion.springs.finger)); // velocity-preserving snap-back
  });
```

- Relations: `Gesture.Simultaneous(a, b)`, `Gesture.Exclusive(a, b)`,
  `Gesture.Race(...)`, or `.requireExternalToFail(other)` — only between gestures under
  the same root view.
- Always handle cancellation: treat `event.canceled` / failed end-state as abort, snap back,
  never half-commit game state (XP, Focus, Guardian actions commit in `onEnd` only).
- Dismissal = velocity **or** distance (a flick is enough). Boundaries get rubber-band
  resistance, never a hard stop.

## Gesture + animation coordination

- Gesture writes shared values on the UI thread; `useAnimatedStyle` renders. React never
  re-renders per frame — no `setState` in `onUpdate`/scroll handlers.
- Game-state writes (XP, shards, phase changes) happen once via `scheduleOnRN` in `onEnd`
  or a threshold-crossing `useAnimatedReaction`. Never per frame.
- Every committed interaction pairs a visual with one haptic via `gameHaptic(event)`
  (`select` / `probe` / `commit` / `win` / `lose` / `transcend`) — never haptics alone,
  never per frame.

## Tower target interactions

- **Swipe-to-climb** (ui-ref `screen3`): vertical pan over the floor stack, snap to nearest
  floor with `springs.finger`, parallax floor cards by drag offset, haptic on floor change.
- **Trial picking**: tap options with press feedback (`motion.press`) + `select` haptic.
- **ENTER / CTA**: press feedback + `commit` haptic, then native stack transition.
- **Probe**: explicit button (current); a drag-to-reveal variant must keep the same
  onEnd-commit semantics.

## Compatibility

- v2.32 is the Expo-pinned line: works in Expo Go, Android + New Architecture safe,
  maintained by Software Mansion. Do not opt into v3 (`^3.0.0` + `usePanGesture` hooks)
  until the dev-client milestone — v3 breaks Expo Go and buys nothing we need yet.
- Future MWA/Solana integration is unaffected: gestures never touch wallet code paths.
