# Tower of Sol

**A persistent multiplayer ascension game for the Solana Seeker — Tower of God meets Solo Leveling, on mobile.**

> CLOCK IN: The Solana Mobile Hackathon · SKR track · submissions due Oct 8

[![Hackathon](https://img.shields.io/badge/CLOCK_IN-Solana_Mobile_Hackathon-9945FF?style=for-the-badge&labelColor=0d1117)](https://github.com/HarmishTervadiya/tower-of-sol)
[![Expo](https://img.shields.io/badge/Expo_SDK-57-000020?logo=expo&logoColor=white)](mobile/)
[![React Native](https://img.shields.io/badge/React_Native-0.86-61DAFB?logo=react&logoColor=black)](mobile/)
[![Android](https://img.shields.io/badge/Android-Seeker-3DDC84?logo=android&logoColor=white)](mobile/)
[![Solana](https://img.shields.io/badge/Solana-devnet-9945FF?logo=solana&logoColor=white)](mobile/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

---

## What is Tower of Sol?

The world is a **Tower**. Each shared **Realm (floor)** is governed by a **Guardian (Floor Master)** — earned by triggering a random event first — who sets the trial for that Realm. Clearing enough trials, or a bypass condition the Guardian defines, **transcends** the Tower to the next Realm: the old Realm resets, and the outgoing Guardian is paid a time-weighted reward.

It plays like a **premium multiplayer RPG**, not a Web3 dashboard. Wallet, treasury, and on-chain settlement exist to serve the fantasy — never the other way around.

### Key Features

- **Round loop with real skill expression** — Glance → Probe → Commit → Resolve. Probe trades clock time for signal; Commit stakes per-round Focus (Low/Med/High) for proportional payouts.
- **Guardian meta loop** — contested event → first clearer becomes Guardian → sets the active trial (rotation-constrained) → transcend pays time-weighted bonus.
- **No hard gating** — anyone can play any live Realm immediately. Level affects reward effectiveness, never access.
- **Two-lane economy** — free Trials (skill-earned, real SKR from a funded treasury) vs. premium Expeditions (cosmetics/titles only). Items, currency, and skills never cross.
- **Seeker-native roadmap** — MWA connect, Seed Vault signing, dApp Store APK; MagicBlock session batching as a stretch goal.

---

## How It Works

```
ROUND (repeatable unit of play)
┌─────────┐    ┌─────────┐    ┌───────────────┐    ┌─────────┐
│ Glance  │───▶│ Probe?  │───▶│ Commit        │───▶│ Resolve │
│ free    │    │ spend   │    │ Low/Med/High  │    │ prop.   │
│ signal  │    │ seconds │    │ Focus stake   │    │ payout  │
└─────────┘    └─────────┘    └───────────────┘    └─────────┘

META LOOP (wrapping rounds)
┌──────────────┐    ┌───────────────┐    ┌──────────────┐    ┌────────────┐
│ Random event │───▶│ First clearer │───▶│ Guardian     │───▶│ Threshold/ │
│ contested    │    │ = Guardian    │    │ sets trial   │    │ bypass met │
└──────────────┘    └───────────────┘    └──────────────┘    └─────┬──────┘
                                                                  ▼
                                              Transcend: next Realm, reset,
                                              Guardian paid time-weighted bonus
```

---

## Running Tower of Sol

Pick the row that matches your situation.

| Situation | You need | You run |
|-----------|----------|---------|
| **Judge / reviewer** | Android phone + Expo Go | Open the published link, Tower → Shadows → first round in < 60s |
| **Frontend dev** | Node 22+, npm | `cd mobile && npm install && npm run android` |
| **Future backend / on-chain** | — | Not started. Seams reserved in `src/services/` — see Roadmap |

### Quick Start (frontend dev)

**Prerequisites:** Node.js 22.13+, npm, Android Studio or Expo Go on a physical device.

```bash
git clone https://github.com/HarmishTervadiya/tower-of-sol.git
cd tower-of-sol/mobile

npm install
cp .env.example .env   # defaults target devnet

# quality gates (must all pass)
npm run type-check
npm run lint
npm test

# run it (Android-first; Seeker is the target device)
npm run android
```

Always install Expo-compatible packages with `npx expo install <pkg>` — never raw version pins.

---

## Monorepo Layout

```
tower-of-sol/
├── mobile/            # Expo SDK 57 app — the game (this is where all current work lives)
│   ├── app/           # Expo Router routes: (tabs), realm/[id], trial/[trialId], onboarding
│   ├── src/
│   │   ├── features/game/   # types, mock realm/trial data, payout curve, Zustand store
│   │   ├── components/ui/   # themed primitives (Screen, Button, Card, Badge, ProgressBar)
│   │   ├── services/        # GameService interface + mock impl (Express/Anchor slot in later)
│   │   ├── lib/             # query client, MMKV storage, haptics, Result type
│   │   └── theme/           # dark-RPG design tokens (single source of truth)
│   └── docs/ARCHITECTURE.md # full frontend architecture + decision log
├── server/            # RESERVED — Express backend (Phase 3, after frontend completion)
└── program/           # RESERVED — Anchor on-chain program (Phase 4, after backend)
```

---

## Roadmap

**Tier 1 — must ship (this is "done" even if nothing else lands):**

- [x] Expo SDK 57 foundation, design system, navigation
- [x] Tower / Realm / Guardian / trial-progression screens (mock data)
- [x] Full round loop: Glance → Probe → Commit → Resolve
- [x] Onboarding: practice round → first real round → XP/Shard feedback
- [ ] Native Android APK, MWA connect, Seed Vault signing
- [ ] RewardVault funded, `claim_quest_reward` with per-wallet daily cap (devnet)

**Tier 2 — should ship:** Flow + Artifacts Realms, Guardian/transcend cycle (`trigger_event`, `claim_guardian`, `set_trial`), Detector Duel head-to-head.

**Tier 3 — stretch:** premium lane (1 Skill + 1 Trigger on Shadows), MagicBlock session batching, location-gated variants, party invites.

---

## Money Flow & Compliance

Premium buyers → ops wallet → `fund_reward_pool` → RewardVault → free skill-earned claims. Solvent by construction (draw-down, not minted). Free entry + no cash-out on Premium keeps this outside PROGA 2025's "online money game" definition. **Not legal advice — real-money launch needs a paid consult.**

---

## Contributing

PRs welcome. House rules: `npx expo install` for packages, strict TypeScript stays strict (`AGENTS.md` is the source of truth), screens never touch HTTP/storage directly, every feature ships behind the `GameService` seam. Run `type-check`, `lint`, and `test` before pushing.

## License

MIT — see [LICENSE](LICENSE).
