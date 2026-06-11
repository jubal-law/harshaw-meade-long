# Build Instructions — HarshawMeadeLong.com
**For:** Claude Code (terminal) · **Inputs:** `DESIGN-SPEC.md` (copy + tokens, verbatim source of truth) and `mockups/*.svg` (visual source of truth)

## Goal
Build the five-page static site for Harshaw, Meade & Long LLP — the *fictional demonstration practice* of Jubal.law (the AI legal partner for solo and midsize firms). Jubal did not build this site and does not build websites; HML is the firm Jubal's research, marketing, and presentations use to show the product working (matter analysis, discovery prep, drafting in the firm's voice, firm knowledge base). It must look like a real elite small firm; Heinlein references stay subtle and unlabeled. **The fiction is disclosed in exactly two places: the About-page homage section, and one fine-print line in the footer legal text.** Nowhere else — no demo language on Home, Attorneys, Practice, or Contact.

## Deliverables
```
/site
  index.html        ← mockups/01-home.svg
  attorneys.html    ← mockups/02-attorneys.svg
  practice.html     ← mockups/03-practice-areas.svg
  about.html        ← mockups/04-about.svg
  contact.html      ← mockups/05-contact.svg
  styles.css        ← single shared stylesheet, design tokens from spec §2–§5
  favicon.svg       ← gold "HML" monogram on navy #0F1B2B
```

## Hard requirements
1. Use the copy in DESIGN-SPEC.md §6 **verbatim** — it is written carefully; do not paraphrase.
2. Design tokens exactly per spec §2 (CSS custom properties) and type per §3 (Google Fonts: Cormorant Garamond 500/600 + Source Sans 3 400/600).
3. `border-radius: 0` everywhere. One gold accent per visual cluster. 4px gold bar at top of every page.
4. No JS frameworks. Vanilla HTML/CSS; JS only for the mobile nav toggle and the contact-form success state (no real submission — show "Received. A member of the firm will respond within one business day.").
5. Portraits = navy panel with gold ring + serif monogram initials (as in mockups). Other imagery: navy duotone placeholders or CSS-duotoned picsum images, per spec §8.
6. Responsive: single 900px breakpoint; grids stack; nav collapses to wordmark + menu button.
7. Footer on every page, identical: badge reads "DRAFTED, DESIGNED & DEPLOYED BY JUBAL.LAW" (links to https://jubal.law) plus the "demonstration website" fine-print legal line.
   Note: a `matters.html` page (Representative Matters, spec §6.6) ships later — structure nav/CSS so adding a MATTERS item and matter-card component requires no rework.
8. Per-page `<title>` + meta description; semantic HTML (header/nav/main/section/footer); AA contrast; gold focus outlines.

## Fidelity notes (mockup → CSS)
- Mockups are 1440px frames; content column is 1200px max-width, centered (120px margins at 1440).
- Section rhythm: 112px vertical padding desktop / 64px mobile.
- Small-caps "kicker" labels: 13px, 0.18em tracking, uppercase, `--gold-dark`.
- Header 88px with hairline bottom border; active nav item gets 2px gold underline offset 8px.
- Buttons: 1px gold border, transparent, small-caps; hover = gold fill + navy text. The contact submit is the inverse (navy fill, gold text).

## QA checklist before calling it done
- [ ] All five pages cross-link correctly; active nav state correct on each.
- [ ] Copy diff against DESIGN-SPEC.md §6 — zero deviations.
- [ ] Easter eggs present but never labeled or linked to explanations (spec §7).
- [ ] Lighthouse: 95+ performance/accessibility/SEO on each page.
- [ ] Looks correct at 1440, 1024, 390 widths.
