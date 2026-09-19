# Tower of Sol — Agent Rules (mandatory control layer)

> Premium multiplayer RPG first. Not a Web3 dashboard. Read exact versioned docs at
> https://docs.expo.dev/versions/v57.0.0/ before writing native-adjacent code.
>
> This file is the authoritative orchestration layer. It routes work to skills and
> governs sub-agent delegation. It states **when to invoke each skill**, never the
> skill's full contents. Skills live in `mobile/skills/<name>/SKILL.md` and own all
> detailed execution rules.

## Stack (locked)

- Expo SDK 57 / React Native 0.86.3 / React 19.2.3 / Node >= 22.13 / TypeScript ~6.0 strict
- Expo Router v6 file-based routing with typed routes (`app/` only = routes)
- Zustand v5 (client) + TanStack Query v5 (server/future-backend)
- Reanimated 4.5.1 + `react-native-worklets` 0.10.1 + Gesture Handler ~2.32 (Expo-pinned line)
- MMKV (cache) + SecureStore (secrets) / Zod (validation) / `expo-linear-gradient` / SVG
- Always install with `npx expo install <pkg>` — never raw `npm i <pkg>@x` for Expo-compatible packages

## Skill routing

| Task | Skill | When |
| ---- | ----- | ---- |
| General RN implementation (state, services, boundaries, testing) | *(this file)* | Default. No specialty skill needed |
| UI/component implementation | *(this file) + `src/theme`* | Compose theme tokens; visual contract in `docs/UI-REFERENCES.md` |
| Animation | `mobile-animation` | Anything animated; motion stutter; entering/exiting; press/progress/state transitions |
| Gesture/touch interaction | `gesture-interaction` | Taps, swipes, pans, drags, sheets, swipe-to-climb, gestures not firing |
| Performance optimization | `motion-performance` | Jank, profiling, animation PR review, particles/effects affordability, Skia question |
| Promotional/demo/launch video | `brag` | `/brag`, demo/promo/trailer asks, Tier-1 teaser, submission cut. Dev-time only — never APK code |
| Backend (Express) | *reserved* | Phase 3 only. Do not build |
| Anchor/Solana programs | *reserved* | Phase 4 only. Do not build |

Invoke a skill only when it materially applies. `brag` never overlaps runtime skills:
video work produces `brag-output/` (gitignored), never app code.

## Mandatory skill-use protocol

Every action is evaluated against the routing table before anything else:

1. **No silent skips.** Before any meaningful action, determine whether a skill applies.
   If one exists, load/invoke it first — never bypass it because the task looks small.
2. **Multiple skills → combine in order.** Apply each skill's rules without violating any
   other. Order: domain skill (animation/gesture) → performance → this file's boundaries.
3. **Missing skill → name the gap.** If work needs guidance no skill covers, create or
   update the skill first when practical, then proceed under it.
4. **Validate against the skill before finishing.** Re-check the skill's rules and gates
   after implementing, not just before.

## TypeScript (Total TypeScript / Pocock)

- `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`,
  `verbatimModuleSyntax`, `isolatedModules` are ON — do not weaken them
- No `any`. Use `unknown` + narrowing. Prefer discriminated unions for game state
- Use `type` imports (`import type { X }`) for types. No enums — string-literal unions + `as const`
- Validate all external/future-API data with Zod at the service boundary

## Architecture boundaries (non-negotiable)

```
app/              → Expo Router routes only. Thin: load state, handle nav. No fetch, no MMKV.
src/features/<f>/ → types.ts, data.ts (mock), store.ts (zustand), hooks/, components/
src/components/ui/→ dumb themed primitives (Button, Card, Screen, Badge, ProgressBar…)
src/services/     → GameService interface + mockGameService. Screens NEVER import fetch.
src/lib/          → query-client, storage, haptics, result type. No UI.
src/theme/        → THE visual source of truth (colors, typography, spacing, radii,
                    shadows, motion, zIndex). Import from `@/src/theme` only.
mobile/skills/    → agent skills (dev-time guidance). Never imported by app code.
```

- Screens never touch HTTP, MMKV, or SecureStore directly
- Client state (round, focus, onboarding) → Zustand. Server/shared state → Query-ready service + types
- Every future backend/Anchor call slots behind `GameService` — no Solana imports in UI yet
- No colors, spacing, radii, shadows, durations, springs, z-index, or font sizes in
  screens — compose `theme.*` and `motion.*` primitives (`docs/UI-REFERENCES.md` is the visual contract)

## Motion rules (summaries — skills own the details)

- UI thread only; `transform`/`opacity` only; finger → spring, else timing < 300ms
- No `setState` per frame; `scheduleOnRN` in `onEnd`/thresholds only; `runOnJS` and
  `useAnimatedGestureHandler` are removed APIs — never use
- Reduced motion ships with the animation; verify on release build, slowest Android
- Skia, bottom-sheet libs, keyboard-controller: deferred by decision (see motion-performance).
  Re-propose only with a concrete requirement + compat proof

## UI / Motion identity

- Dark-first premium RPG: obsidian `#0B0B16`, gold `#E8B44A`, arcane violet `#7C5CFF`
- Haptics via `gameHaptic(event)` — one per commit, always paired with a visual
- Loading → Skeleton. Empty → EmptyState. Error → ErrorState with retry. No blank screens

## Quality gates

- `npm run type-check` must pass. `npx expo-doctor@latest` must pass
- New feature logic gets a pure-function unit test (payout curve, XP math, state machine)
- Animation PRs carry the motion-performance device checklist results
- Update project docs (`docs/`, skill files) when behavior, tokens, or workflows change
- Keep files < 250 lines. Extract when bigger

## Mandatory execution flow

Understand → Identify applicable skills → Load/invoke skills → Decompose →
Delegate when useful → Implement → Validate against skill rules → Integrate →
Review → Update docs if required.

No implementation begins before applicable skill requirements are evaluated.

## Sub-agent orchestration

For larger tasks the primary agent decomposes and delegates; every sub-agent works
under this file and the same skills:

1. Decompose into logical subtasks; name the required skill(s) per subtask.
2. Delegate independent or specialized subtasks (e.g. one screen per agent, motion pass
   vs. data pass) when it improves speed or quality — never for trivial splits.
3. Brief each sub-agent with: the subtask, its skills, and the single sources of truth
   (`src/theme`, `GameService`, this file, `docs/ARCHITECTURE.md`). Link, don't paste.
4. Sub-agents must not redefine architecture, theme, dependencies, or standards. Open
   questions come back to the primary agent instead of local invention.
5. Prevent overlap: assign disjoint file/feature ownership per sub-agent, no two agents
   editing the same file concurrently.
6. Integrate serially: merge one subtask, verify gates, then the next. Review the combined
   result against every invoked skill before declaring done.
7. Phase boundaries bind sub-agents equally — no Express/Anchor work spawns from a
   mobile subtask (see Phase gates).

## Phase gates (Mobile UI/UX → Backend → Solana/Anchor)

- Current phase: **Mobile UI/UX**. Backend and on-chain work is reserved, not merely unstarted.
- No skill, agent, or subtask may bypass the phase order. Backend-shaped needs
  (persistence, sync, auth) are solved with the `GameService` mock seam until Phase 3.
- Advancing a phase requires an explicit user decision, documented in `docs/ARCHITECTURE.md`.
