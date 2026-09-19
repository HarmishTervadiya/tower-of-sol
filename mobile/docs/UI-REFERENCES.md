# UI References — visual / interaction contract

Source art: `mobile/assets/images/ui-ref/`. These three frames define the game's
visual identity and its signature interactions. Future UI work must honor them;
deviations need an explicit decision note.

## screen1 — Cinematic splash (0:00–0:04)

Dark obsidian tower rising through storm clouds, glowing blue halo ring, floating
monoliths. Title card: **WORLD TOWER / THE TOWER IS AWAKE.** Timestamp implies a
4-second cinematic beat.

- Mandates: cold blue + gold palette on near-black; halo-ring motif (reuse for
  transcend/Guardian moments); splash must feel like a trailer frame, not a loader.
- Motion: slow push-in (cinematic duration tier), halo fade-in, title rise.
  Reduced-motion: static frame, no push-in.

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
