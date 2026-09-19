# Tower of Sol — project control layer

Monorepo: `mobile/` (active) · `server/` (Phase 3, reserved) · `program/` (Phase 4, reserved).

## Authority

- `mobile/AGENTS.md` is the authoritative orchestration layer: mandatory execution flow,
  skill-use protocol, sub-agent rules, architecture boundaries, quality gates. It applies
  to all work in this repo, including work delegated to sub-agents.
- `mobile/skills/<name>/SKILL.md` own detailed execution rules per specialty. This file
  never duplicates them — it routes.
- Future `server/` and `program/` phases get their own skill routers under this file's
  authority; they must not weaken mobile rules or bypass phase order.

## Phase order (binding)

**Mobile UI/UX → Backend → Solana/Anchor.** Current phase: Mobile UI/UX.
No agent or sub-agent starts a later phase without an explicit user decision.

## Universal rules (all phases, all agents)

1. Evaluate applicable skills before acting; never silently skip a relevant skill.
2. Single sources of truth only: `mobile/src/theme`, `GameService` seam,
   `mobile/docs/ARCHITECTURE.md`. No parallel redefinition.
3. `npx expo install` for Expo-compatible packages. No backend/blockchain in mobile work.
