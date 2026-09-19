# UI References — visual / interaction contract

Source art: `mobile/assets/images/ui-ref/` (11 frames: `screen1–3`, `ref-1–8`).
They define the game's visual identity and signature interactions as one language.
Future UI work must honor them; deviations need an explicit decision note.

## screen1 — Cinematic splash (0:00–0:04)

Dark obsidian tower rising through storm clouds, glowing blue halo ring, floating
monoliths. Title card: **WORLD TOWER / THE TOWER IS AWAKE.** Timestamp implies a
4-second cinematic beat.

- Mandates: cold blue + gold palette on near-black; halo-ring motif (reuse for
  transcend/Guardian moments); splash must feel like a trailer frame, not a loader.
- Motion: slow push-in (cinematic duration tier), halo fade-in, title rise.
  Reduced-motion: static frame, no push-in.
- Asset requirement (open): full-bleed illustrated tower key art. Interim:
  `assets/images/key-art/splash-still.jpg` (frame @5s of the gemini clip,
  404x720 — soft stretched fullscreen, used dimmed under scrims). A clean
  timestamp-free screen1 export (or higher-res still) swaps in with zero code
  churn. The `0:00–0:04` timestamp is storyboard chrome and is never rendered.
- Motion reference: `gemini_generated_video_cf3630c1.mp4` (10s awakening) defines
  the splash beats — continuous push-in → wisps gather ~2s → lightning converges
  ~3s → halo ignites ~4s → ring stabilizes/pulses → hold. Implemented in
  `app/index.tsx` on a compressed 8s timeline via `theme.motion.sequence.splash`;
  timing windows are tokens, not inline constants.

## screen2 — Entry / onboarding

Same tower art, climber silhouette on rubble foreground. Copy:
**THE TOWER IS AWAKE. YOUR ASCENSION BEGINS.** Gold-outlined **ENTER** button.

- Mandates: onboarding opens on this beat (Session 1: Tower → Shadows); ENTER is the
  single CTA — press feedback (`motion.press`) + `commit` haptic + native transition.
- This is the practice-round gateway: ENTER → zero-stakes round → first real round.

## screen3 — Tower climb (signature interaction)

Vertical floor stack: avatar + **Lv. 07** + XP bar top-left, crystal count top-right,
circular floor platforms (**FLOOR 01 ORDER**, **FLOOR 02 FLOW**, **FLOOR 03 WEALTH**
highlighted gold with Guardian avatar badge, **FLOOR 04 ???** locked). Bottom:
**SWIPE TO CLIMB** with chevrons.

- Mandates: the Tower screen is a **vertical swipe-to-climb** interaction, not a
  scroll list — pan gesture, snap to nearest floor (`springs.finger`), parallax floor
  cards, haptic on floor change, gold highlight + Guardian badge on the live floor,
  locked floors dimmed (`state.locked`), live floor pulsing (`state.live`).
- HUD: level + XP progress animate on change (transform/opacity); crystal count ticks.
- Guardian badge and floor icons are shared-element candidates when pushing
  `realm/[id]` (only if measurable — native transition first).

## ref-1 — Realm entry (ORDER Floor 01)

Neon market street canyon, tower sigil mark, serif **ORDER / FLOOR 01**, tagline
_The market never sleeps. Only the sharpest survive._, chamfered **ENTER REALM**
gold-outline button.

- Mandates: every Realm entry pairs full-bleed Realm art + sigil + serif title +
  tagline + one chamfered CTA. Realm atmosphere differs (Order = ice-blue market),
  layout grammar is shared → `GameBackground[realm]` + `GameButton`.
- Realm identities so far: ORDER ice-blue, SHADOWS violet, WEALTH gold, FLOW emerald.

## ref-2 — Guardian card (KAZE, carousel "04 Guardian")

Full-bleed anime portrait, **THE GUARDIAN / KAZE** serif, gold diamond + **Lv. 12**,
**HOLDING FOR 18:42:16** tabular timer, **CURRENT TRIAL / WALL WATCH** row, blue-glow
chamfered **ENTER TRIAL** button.

- Mandates: Guardian screen = portrait + serif name + holding timer (`GameText/timer`)
  - current-trial row + one CTA. Timer text must never jitter (tabular numerals).
- Guardian accent = Guardian overlay on the Realm theme (`composeRealmTheme`), not a
  new palette — Kaze's blue glow is an overlay, Order's ice-blue is the base.

## ref-3 — Trial interface (ORDER Direction Call)

Candlestick chart with grid + glowing projection arrow, **WHERE DOES IT GO?**
serif prompt, two glowing chamfered direction pads (green up / red down), timer bar
**00:28** with green progress.

- Mandates: trial header (realm sigil + trial name + kind, ref-4 pattern) → signal
  visualization zone → prompt → commit controls → timer bar (`GameProgress` +
  `timerLabel`). Direction pads are `GameButton` variants with success/danger glow.
- Chart itself is future per-trial content; the frame (header/prompt/controls/timer)
  is shared architecture.

## ref-4 — Trial grid (SHADOWS Match the Actor)

Violet sigil header, suspect portrait card grid, selected card = violet glow border

- brightening + **?** mark, **WATCH THEM. One doesn't belong.**, progress bar +
  step dots + **00:32**.

* Mandates: trial selection state = accent glow border + glow (`GlowView`), never
  color-fill inversion. Progress = bar + discrete step dots + timer in one row.
* Realm accent re-tints the whole pattern (violet here, ice-blue in ref-3) with no
  structural change → proof of the realm-override model.

## ref-5 — Level up (08 ring)

Violet radial burst, diamond emblem, serif **LEVEL UP**, circular progress ring
**08**, silhouette, **ASCENSION CONTINUES** divider, **+1 NEW SKILL** reward row.

- Mandates: level-up = burst atmosphere + emblem + `RingProgress` + reward row.
  Ring is SVG (`RingProgress`) — Skia gate stays closed for this class of indicator.

## ref-6 — Transcend (Floor 03 Wealth cleared)

Light beam + ascending figure, **FLOOR 03 WEALTH HAS BEEN CLEARED** serif, diamond
sigil, glowing chamfered **TRANSCEND** button.

- Mandates: transcend = cinematic-tier sequence (exempt from <300ms), beam/burst
  atmosphere, one CTA. Haptic `transcend` fires once with the reveal.

## ref-7 — Trial complete (rewards)

Dark panel with **gold corner ornaments**, **+240 XP / +1.8 SKR** ledger rows,
**REWARD AVAILABLE** + chest in violet glow frame, gold **CLAIM** button.

- Mandates: rewards = `GamePanel[variant=ornate]` + `RewardRow` ledger + glowing
  reward frame + one `GameButton`. Corner ornaments are panel config, not art.

## ref-8 — End card storyboard (0:36–0:40, video)

WORLD TOWER + **ASCEND. EXPLORE. TRANSCEND.** + BEGIN YOUR ASCENSION + store badges.
This frame is a video storyboard, not app UI.

- Mandates: feeds the `brag` skill's submission cut (hook → meta loop → punchline),
  never implemented as a screen.
