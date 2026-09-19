---
name: motion-performance
description: Keep Tower of Sol at 60fps on physical Android/Seeker hardware. Use when profiling motion, fixing jank, reviewing animation PRs, adding many simultaneous animated elements, or deciding whether a heavy effect (particles, blur, Skia) is affordable.
---

# motion-performance

Target: 60fps on a **release build on the slowest supported Android**. Feel judged in
Expo Go, dev mode, or a simulator does not count — dev JS thread is slow enough to hide
exactly the problems you're looking for (120Hz Seeker panels make frame drops obvious).

## Hard rules

1. Animate `transform`/`opacity` only. Layout props, `BlurView` intensity, Android
   `elevation` → crossfade a static layer.
2. Zero RN-runtime work per frame: no `setState` in gestures/scroll, no `scheduleOnRN`
   in `onUpdate` (60–120 calls/sec) — `onEnd` or threshold reactions only.
3. No `entering` on virtualized list rows; no JS-rebuilt screen transitions; tabs use
   `animation: 'none'`.
4. One haptic per commit, always paired with a visual. Never per frame, never alone.
5. Cap simultaneous animated components. Extract animated leaves; memoize the rest
   (`React.memo`, stable props) so parents don't re-render.

## Memoization & stability

- Create `Gesture` objects once (module scope or `useMemo`) — never inline in render.
- `useAnimatedStyle` dependencies must be shared values, not re-created closures.
- Animated list content: windowed lists (`FlatList` with `windowSize`, `removeClippedSubviews`
  where safe) for the floor stack and trial feeds as they grow.

## Lower-end device strategy

- Prefer static gradients (`expo-linear-gradient`) over animated blur layers.
- Particle/effect bursts (XP showers, transcend cinematics) are **pooled and capped**:
  fixed pool size, `opacity`+`transform` only, killed on unmount, disabled entirely under
  reduced-motion or a low-end flag.
- If a screen drops frames: remove layers first (blur → gradient, shadow → none), then
  shorten durations, then cut elements. Never "optimize" by moving work to the JS thread.

## Skia adoption gate

`@shopify/react-native-skia` is **deliberately not installed**. Adopt it only when a
concrete requirement needs GPU canvas — particle fields, custom shaders, fluid XP rings —
that Reanimated + SVG + gradients provably cannot do. Adoption checklist: Expo SDK
compat, New Architecture compat, Android compat, bundle impact measured, no overlap with
existing deps. Same gate applies to `@gorhom/bottom-sheet` (prefer `@expo/ui` sheets)
and `react-native-keyboard-controller` (only if keyboard-tracking UI appears).

## Device verification checklist (per animation PR)

- [ ] Flick it, interrupt it mid-flight, reverse it — velocity handoff holds.
- [ ] Release build, slowest Android available — no visible stutter.
- [ ] Reduced motion on — content fully usable, `FadeIn`-class fallback.
- [ ] Gesture cancelled mid-drag — state snaps back, nothing half-committed.
- [ ] Haptic fires once per commit, aligned with the visual.
