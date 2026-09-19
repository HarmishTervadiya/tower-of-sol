# Tower of Sol — Agent Rules

> Premium multiplayer RPG first. Not a Web3 dashboard. Read exact versioned docs at
> https://docs.expo.dev/versions/v57.0.0/ before writing native-adjacent code.

## Stack (locked)

- Expo SDK 57 / React Native 0.86.3 / React 19.2.3 / Node >= 22.13 / TypeScript ~6.0 strict
- Expo Router v6 file-based routing with typed routes (`app/` only = routes)
- Zustand v5 (client state) + TanStack Query v5 (server/future-backend state)
- MMKV (cache) + SecureStore (secrets) / Zod (validation) / Reanimated 4 (motion)
- Always install with `npx expo install <pkg>` — never raw `npm i <pkg>@x` for Expo-compatible packages

## TypeScript (Total TypeScript / Pocock)

- `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`,
  `verbatimModuleSyntax`, `isolatedModules` are ON — do not weaken them
- No `any`. Use `unknown` + narrowing. Prefer discriminated unions for game state
- Use `type` imports (`import type { X }`) for types. No enums — use string-literal unions + `as const` maps
- Validate all external/future-API data with Zod at the service boundary

## Architecture boundaries (non-negotiable)

```
app/              → Expo Router routes only. Thin: load state, handle nav. No fetch, no MMKV.
src/features/<f>/ → types.ts, data.ts (mock), store.ts (zustand), hooks/, components/
src/components/ui/→ dumb themed primitives (Button, Card, Screen, Badge, ProgressBar…)
src/services/     → GameService interface + mockGameService. Screens NEVER import fetch.
src/lib/          → query-client, storage, haptics, result type. No UI.
src/theme/        → tokens.ts only source of color/spacing/type/radius.
```

- Screens never touch HTTP, MMKV, or SecureStore directly
- Client state (round, focus, onboarding) → Zustand. Server/shared state (tower, realm) → Query-ready service + types
- Every future backend/Anchor call must slot behind `GameService` interface — no direct Solana imports in UI yet

## UI / Motion

- Dark-first premium RPG: deep obsidian `#0B0B16`, gold `#E8B44A`, arcane violet `#7C5CFF`
- Use theme tokens only — no hardcoded colors/spacing in screens
- Haptics on Commit/Resolve/Transcend. Reanimated entering/exiting on phase changes
- Loading → Skeleton. Empty → EmptyState. Error → ErrorState with retry. No blank screens

## Quality gates

- `npm run type-check` must pass. `npx expo-doctor@latest` must pass
- New feature logic gets a pure-function unit test (payout curve, XP math, state machine)
- Keep files < 250 lines. Extract when bigger
