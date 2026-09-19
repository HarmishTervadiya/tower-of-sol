# Tower of Sol — Frontend Architecture

Greenfield Expo SDK 57 app. Phases 3 (Express) and 4 (Anchor) are NOT built — this doc reserves seams for them.

## Route map (Expo Router)

```
app/_layout.tsx            → providers: Query, Theme, ErrorBoundary, splash, onboarding gate
app/(tabs)/_layout.tsx     → Tower | Realms | Journey tabs
app/(tabs)/index.tsx       → Tower overview (current Realm, Guardian, transcend progress)
app/(tabs)/realms.tsx      → Realm list (Shadows live, Flow/Artifacts preview)
app/(tabs)/journey.tsx     → XP, Shards/Crystals, level, Guardian rewards
app/realm/[id].tsx         → Realm detail: Guardian, trials, bypass, contribute CTA
app/trial/[trialId].tsx    → Round loop: Glance → Probe → Commit → Resolve
app/onboarding.tsx         → zero-stakes practice round → first real round
app/+not-found.tsx         → deep-link safety
```

## Domain model

```ts
type RealmId = 'shadows' | 'flow' | 'artifacts';
type RoundPhase = 'glance' | 'probe' | 'commit' | 'resolve';
type Confidence = 'low' | 'med' | 'high';
interface Realm { id; name; tagline; accent; guardian; xp; xpThreshold; bypass; trials: Trial[] }
interface Trial { id; realmId; title; kind; prompt; options; answerIndex; signal; probeSignal }
interface RoundState { phase; trial; focus: 100; confidence; probeUsed; correct?; payout? }
```

Payout curve (open item in outline — v1 locked here, tunable):
low = 1.0x correct / −0.25 ceiling on wrong; med = 1.75x / −0.5; high = 2.75x / −1.0.
Focus resets to 100 every round (per-round resource, not currency).

## State

- `useTowerStore` (zustand): currentRealmId, xpByRealm, shards, crystals, level, onboardingDone
- `useTrialStore` (zustand, transient): phase machine + focus/confidence per active round
- TanStack Query: wrapped and ready; current data comes from `mockGameService` via
  synchronous seed + async interface so swapping to Express later = one file change

## Service seam (Phases 3/4)

`src/services/gameService.ts` exports `GameService` interface:
`listRealms(), getRealm(id), listTrials(realmId), submitRound(...), contributeXp(...),
triggerEvent(), claimGuardian(), setTrial(), transcend()`.
Current impl = `mockGameService` (local, deterministic, no network).
Future: `httpGameService` (Express) and `anchorGameService` (MWA/Seed Vault) implement the
same interface. UI never changes.

## Theming / motion

Tokens in `src/theme/tokens.ts`. Dark-first. Reanimated `FadeIn/SlideIn` on phase transitions,
`expo-haptics` on commit/resolve/transcend. `expo-linear-gradient` hero headers.

## Decisions log

- Tabs template kept (not blank) for fastest Seeker iteration
- MMKV installed now, wired lazily in `src/lib/storage.ts`; stores hydrate explicitly
- `react-test-renderer` pinned to 19.2.3 to match React (19.3.0 breaks peers)
- No Solana/MWA deps yet by design — MWA needs dev-client native modules; keep Expo Go
  runnable until Tier 1 wallet milestone, then add `@wallet-ui/react-native-web3js` + dev client
