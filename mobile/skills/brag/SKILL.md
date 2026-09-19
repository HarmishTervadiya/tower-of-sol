---
name: brag
description: Create a promotional, demo, or launch video for Tower of Sol. Use when the user says "/brag", "launch video", "demo video", "promo video", "trailer", or wants shareable footage of the game for the hackathon submission or launch. Dev-time workflow only — never runtime code.
---

# brag (Tower of Sol)

Thin project wrapper over the upstream skill
[`latent-spaces/brag`](https://github.com/latent-spaces/brag) (MIT, 5k★).
The upstream `skills/brag/SKILL.md` owns the full workflow (inspect → plan/storyboard →
Hyperframes compose → validate/render); this file owns **when to run it and what Tower
feeds it**. Do not duplicate the upstream workflow here. Do not vendor its assets
(music/SFX) into this repo. Never add runtime dependencies for video work.

## Trigger — invoke when

- User asks for a launch / demo / promo / trailer video (`/brag`, "let's brag", tone flags).
- Milestone beats, in this order:
  1. **Tier 1 playable teaser** — Tower → Shadows round loop, hook-first 15s.
  2. **Submission demo (required)** — the full meta loop, not one round:
     trigger → Guardian → trial → transcend. Judges must see the loop.
  3. **Launch cut** — onboarding → first reward in under 60 seconds, SKR-track story explicit.
- Never for in-app animation, onboarding illustration, or anything shipped in the APK.
  That's `mobile-animation`, not this skill.

## Tower inputs (feed these to the upstream run)

- Story spine: contested event → first clearer becomes Guardian → Guardian sets trial →
  players contribute XP → transcend → Guardian paid time-weighted bonus.
- Must-show: actual game UI (hook in first 2s), one full Glance → Probe → Commit → Resolve
  round, Guardian card, transcend progress bar.
- Copy: project's real words ("The Tower is awake", realm names, trial titles). No generic
  SaaS language. SKR-track story explicit in submission cuts.
- Format: `vertical` default (mobile game promo, dApp Store, X/TG); tone default
  `cinematic` or `app-store` (see upstream tones). Voiceover off unless `--voice`.

## Requirements checklist (verify at run time)

- [ ] Node 22+ ✓ (repo standard)
- [ ] FFmpeg on PATH ✗ (NOT installed on this machine — install before running)
- [ ] `npx hyperframes doctor` passes (Hyperframes CLI renders the video)
- [ ] Upstream skill available: `npx skills add https://github.com/latent-spaces/brag --skill brag`
      (project scope; `-g` for global). No installer → copy `skills/brag/` manually
      (Windows: needs Developer Mode for symlinks — copy, don't symlink).

## Output & repo hygiene

- Output goes to `brag-output/` (or timestamped variant) — **gitignored, never committed**.
  Commit the plan/brief only if the user explicitly asks.
- Creative laws (authoritative definitions upstream): 15–25s; readable pacing;
  hook → reveal → 2–3 highlights → punchline; show the thing; specific, never generic.
