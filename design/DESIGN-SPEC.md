# Harshaw, Meade & Long LLP — Website Design Specification
**Domain:** HarshawMeadeLong.com · **Purpose:** The fictional demonstration practice of Jubal.law (the AI legal partner for solo and midsize firms) — used in Jubal's research, coding, marketing, presentations, and eventually as the home of fictional demonstration matters
**Version 1.0 — for build by Claude Code. Mockups in `/mockups/*.svg` are the visual source of truth.**

---

## 1. Brand Concept

An elite, old-money American law firm — but sized like Jubal's actual market: deliberately small, deliberately senior, the idealized solo/midsize practice. The site must read as completely real to a casual visitor. Heinlein references are woven in as quiet easter eggs for those who know. The Jubal.law message is positioning, not a sales pitch: HML is *the firm that runs on Jubal* — when Jubal's marketing shows a matter analyzed in an hour or a brief drafted in a firm's own voice, it happens here. **Disclosure policy: the "this firm is fictional" disclosure lives on the About page only** (the homage section). Everywhere else the firm simply is a firm; Jubal appears only as a quiet footer badge and, later, the "Where Jubal earned its keep" lines on matters. One fine-print line in the footer legal text covers the rest.

- **Firm name:** Harshaw, Meade & Long LLP (wordmark: HARSHAW MEADE LONG)
- **Tagline:** *Counsel for the long view.*
- **Founded:** 1939 (Heinlein's first published story)
- **Voice:** Assured, spare, courtly. Short declarative sentences. No exclamation points. Never salesy.

## 2. Color Palette

| Token | Hex | Use |
|---|---|---|
| `--ink-navy` | `#0F1B2B` | Hero bg, footer bg, primary headlines on light |
| `--charcoal` | `#1F2937` | Body text |
| `--ivory` | `#F6F2EA` | Page background |
| `--paper` | `#FFFFFF` | Cards, content panels |
| `--gold` | `#B99457` | Accents, rules, links, buttons (outline) |
| `--gold-dark` | `#96763E` | Hover states, small caps labels |
| `--mist` | `#8A93A1` | Captions, metadata, muted text on navy: `#A7B0BD` |
| `--line` | `#E3DCCD` | Hairline borders on light |

Rules: never more than one gold element per visual cluster. No gradients except a barely-there navy vignette in heroes. No pure black.

## 3. Typography

- **Display serif:** Cormorant Garamond (Google Fonts), weights 500/600. Fallback: Georgia.
- **Text sans:** Source Sans 3, weights 400/600. Fallback: Helvetica Neue.
- **Scale (desktop):** Hero 64/72 display; H2 40/48; H3 26/34; body 17/28; small-caps label 13px, letter-spacing 0.18em, uppercase, gold-dark.
- Small-caps gold labels ("kickers") precede every H2, e.g. `THE FIRM`, `OUR PEOPLE`.
- Body copy max-width: 68ch. Generous leading. No bold runs inside paragraphs.

## 4. Layout System

- 1200px max content width, 12-col grid, 32px gutters, centered.
- Section vertical rhythm: 112px top/bottom (desktop), 64px (mobile).
- Header: 88px tall, ivory, hairline bottom border; wordmark left, nav right.
  Nav: THE FIRM · ATTORNEYS · PRACTICE AREAS · CONTACT, 13px small caps; active = gold underline 2px offset 8px.
- Top of page: 4px solid gold bar above header (full-bleed) — the firm's signature.
- Footer (navy): 3 columns — wordmark + address; nav links; small-caps badge "DRAFTED, DESIGNED & DEPLOYED BY JUBAL.LAW" linking to jubal.law. Hairline gold rule on top. Legal line: "Attorney Advertising. Prior results do not guarantee a similar outcome. © 1939–2026 Harshaw, Meade & Long LLP. This is a demonstration website."
- Buttons: rectangular, 1px gold border, transparent fill, small-caps label; hover = gold fill, navy text. No rounded corners anywhere (border-radius: 0). Sharp corners are part of the look.
- Imagery: duotone (navy + ivory) treatment on all photography; abstract architectural shots (columns, marble, law-library shelves). Never stock-photo handshakes.

## 5. Components

1. **Hero (navy):** kicker, display headline, one-line subhead, single outline button. Right third: tall duotone image, bleeding to edge.
2. **Stat band:** 4 stats on ivory, hairline dividers. (87 yrs / 6 practices / 3 continents / 1 standard)
3. **Practice card:** paper panel, gold top hairline, H3, two-line excerpt, "Read more →" gold link.
4. **Attorney card:** 3:4 duotone portrait, name (serif), title (small caps), one-line credential.
5. **Pull-quote slab:** navy panel, large serif quote, attribution in small caps.
6. **Matter card (future, §6.6):** serif-italic caption title, small-caps practice tag, 2–3 sentence narrative, hairline box closing with a "Where Jubal earned its keep:" line.
7. **Contact form:** name / email / matter type (select) / message; outline gold submit "REQUEST A CONSULTATION".

## 6. Pages & Copy Deck (verbatim copy — build exactly)

### 6.1 Home (`index.html`)
- **Hero kicker:** ESTABLISHED 1939
- **Hero H1:** Counsel for the long view.
- **Hero sub:** For nearly a century, Harshaw, Meade & Long has advised the people and enterprises who plan in decades, not quarters.
- **Hero CTA:** OUR PRACTICE
- **Stat band:** `87` Years of practice · `6` Practice groups · `3` Continents · `1` Standard of care
- **Section — THE FIRM (H2: "Judgment, above all."):**
  "Clients do not retain us for boilerplate. They retain us for judgment — the kind that is earned slowly and applied precisely. We are deliberately small, deliberately senior, and deliberate in everything else."
  Button: ABOUT THE FIRM
- **Section — OUR PEOPLE:** 3 attorney cards (the name partners), button: ALL ATTORNEYS
- **Section — PRACTICE AREAS:** 6 practice cards (titles in §6.3), button: ALL PRACTICES
- **Pull-quote slab:** "Specialization is for insects. A counselor must see the whole board." — L. LONG, SENIOR COUNSEL
  *(No Jubal band on Home — the page closes with the pull-quote and footer. Disclosure lives on About only.)*

### 6.2 Attorneys (`attorneys.html`)
- Kicker: OUR PEOPLE · H2: "Deliberately senior."
- Intro: "No leverage pyramid. No hand-offs. The lawyer you meet is the lawyer who does the work."
- **Partner grid (cards link to nothing / # for demo):**
  1. **Jubal E. Harshaw** — Senior Partner. LL.B., M.D., Sc.D. "Counsel, physician, and author; argues only when necessary and never loses on paper."
  2. **Hazel M. Meade** — Managing Partner. "Frontier-tested negotiator; built the firm's appellate practice from the ground up — twice."
  3. **Lazarus Long** — Senior Counsel. "The firm's longest-serving lawyer by a margin no one can quite calculate."
- **Counsel & associates row:** Anne Cavendish (Counsel — *Certified Fair Witness*), Gillian Boardman (Counsel), Manuel G. Davis (Of Counsel), Maureen Johnson (Associate), Friday Jones (Associate), Dorcas Miriam (Director of Administration).
- **Closing band — THE FAIR WITNESS STANDARD:** "Every material representation we make is reviewed by counsel trained to attest only to what is actually known. We tell you what the house looks like on this side."

### 6.3 Practice Areas (`practice.html`)
- Kicker: WHAT WE DO · H2: "Six practices. One standard."
- Six cards, each with 2-sentence blurb:
  1. **Corporate & Private Enterprise** — Formation to succession, for founders who intend to keep what they build. We paper the deal you actually made.
  2. **Complex Litigation & Appeals** — We try cases rarely and win them regularly. Most disputes end the day the other side reads our first brief.
  3. **Trusts, Estates & Generational Planning** — Structures designed to outlive their drafters. Some of our client families have been with us since the founding — every generation of them.
  4. **Intellectual Property & Media** — Authors, inventors, and the occasional polymath. We protect work product in every medium yet invented.
  5. **Water & Natural Resource Rights** — Few assets are more contested or less understood. We grok water law as deeply as any firm in the country.
  6. **Aerospace & Frontier Commerce** — Launch services, lunar mineral claims, long-haul ventures. The frontier has contracts too; ours hold.
- **Billing note (bottom hairline box):** "Our engagement letters contain no surprises. TANSTAAFL — you will always know exactly what the lunch costs."

### 6.4 About (`about.html`)
- Kicker: THE FIRM · H2: "Founded 1939. Still arguing."
- **History (3 paragraphs):**
  "Harshaw, Meade & Long was founded in 1939, in a single room above a Kansas City bank, on a proposition that has not changed: a client is owed the whole of a lawyer's judgment, not a committee's average."
  "The firm grew the slow way — by outcome. Harshaw built the counseling practice on the principle that the best dispute is the one structured out of existence. Meade built the litigation practice for the disputes that insisted. Long, who claims to have seen every market cycle that matters, built everything designed to last longer than its founders."
  "We remain deliberately small. We decline more matters than we accept. We plan in decades because our clients do."
- **Values (3 columns):** *Candor* — "We tell clients what is, not what sells." · *Continuity* — "Relationships measured in generations." · *Craft* — "Every document drafted as if it will be read aloud in court. Eventually, some are."
- **Timeline rail (subtle):** 1939 Founded · 1948 First appellate victory · 1961 Harshaw's *Stranger* doctrine adopted · 2026 Becomes the demonstration practice of Jubal.law.
- Pull-quote slab: "Front!" — *traditional summons to the duty secretary, still shouted fondly* — J. E. HARSHAW
- **Homage section (after pull-quote — same refined register as the rest of the site, not fine print):**
  Kicker: A WORD ABOUT OUR NAMES
  H3: "An homage, freely admitted."
  Copy: "Harshaw, Meade & Long is a fictional firm. Our partners are borrowed, with affection and respect, from the works of Robert A. Heinlein — who gave American letters its finest lawyer, its longest-lived counselor, and more good sense per page than most law libraries. The firm exists as the demonstration practice of Jubal.law: the stage on which we show, in research, writing, and presentations, what an AI legal partner does for a working firm. Its matters are as fictional as its partners. No legal services are offered, and no affiliation with the Heinlein estate is claimed or implied. We are, simply, readers who never quite got over the books."

### 6.5 Contact (`contact.html`)
- Kicker: CONTACT · H2: "Begin the conversation."
- Two columns: form (left, §5.7) + office card (right):
  **Kansas City (Founding Office)** — 1907 Butler Place, Suite 100, Kansas City, Missouri 64108 · (816) 555-1939 · counsel@harshawmeadelong.com
  **Luna City (By Appointment)** — Tycho Under Concourse, Level 3 *(listed without further comment)*
- Form select options: Corporate · Litigation · Estates · IP & Media · Water Rights · Frontier Commerce · Other
- Confirmation microcopy under button: "A member of the firm responds within one business day."

### 6.6 Representative Matters (future page — `matters.html`; design now, build when first matters publish)
This is where Jubal.law's research, marketing, and presentations will discuss fictional cases. The page must scale from 3 to 30 matters without redesign.

- **Nav:** add MATTERS between PRACTICE AREAS and CONTACT when the page ships.
- **Page head:** Kicker: SELECTED WORK · H2: "Representative matters." · Intro: "A firm is its matters. A selection of ours follows, described plainly." — with the standing disclaimer as one fine-print italic line beneath (the only fiction reference on the page besides the keep-lines).
- **Matter card (component §5.8):** serif-italic caption title → small-caps practice tag → 2–3 sentence narrative in firm voice → hairline box: "**Where Jubal earned its keep:** [one sentence tied to a real product job: matter analysis, discovery prep, drafting in the firm's voice, or firm knowledge base]."
- **Standing disclaimer (top of page + footer of each matter when cited elsewhere):** "All matters described are fictional, composed to demonstrate Jubal.law. Any resemblance to real parties or proceedings is coincidental."
- **Naming convention:** parties from Heinlein's wider cast or invented; venues: ordinary Missouri courts for realistic matters; obviously fanciful venues (District Court of Luna) reserved for matters meant to be read as jokes. Don't mix registers within one matter.
- **Three seed matters:**
  1. ***In re Estate of V. M. Smith*** — TRUSTS & ESTATES. "A young decedent of unusual estate: assets in four jurisdictions, heirs in none of them, and a will whose witnesses could attest only to what they actually saw. Ninety years of family files bore on the question." *Where Jubal earned its keep:* the firm's complete history with the family — every instrument since 1948 — indexed and answerable in an afternoon.
  2. ***Stone v. Tycho Under Development Corp.*** — COMPLEX LITIGATION. "Forty thousand pages of discovery, one timeline, and three inconsistencies the other side hoped no one would line up. We lined them up." *Where Jubal earned its keep:* discovery prep — the week of associate work that took an hour, with every fact cited to its page.
  3. ***Davis Water Cooperative — intake-rights restructuring*** — WATER RIGHTS. "Eleven stakeholders, sixty years of overlapping agreements, and a cooperative that needed one document everyone could sign." *Where Jubal earned its keep:* drafting in the firm's own voice, from the firm's own precedent — not generic AI prose.

## 7. Easter Egg Index (do not label these on-site)
Heinlein born 1907, Butler MO → street address. First story 1939 → founding year & phone. Jubal's LL.B./M.D./Sc.D. → his bio. Anne the Fair Witness → "Fair Witness Standard" + "this side of the house" line. TANSTAAFL → billing note. "Specialization is for insects" → Lazarus quote. Water-sharing/grok → Water Rights blurb. "Front!" → About pull-quote. Luna City/Tycho Under → second office. Secretaries Anne, Miriam, Dorcas → staff names. Howard Families longevity → Estates blurb.

## 8. Build Notes
- Static site, five HTML files, one shared `styles.css`; no framework, no JS beyond mobile nav toggle and form stub (`mailto:` or no-op with success message).
- Fonts via Google Fonts (`Cormorant+Garamond:500;600` + `Source+Sans+3:400;600`), `font-display: swap`.
- Images: use https://picsum.photos placeholders or solid navy panels with duotone CSS (`filter: grayscale(1) sepia(.2)` + navy multiply overlay) until real assets exist. Portraits: solid navy panel with gold monogram initials is acceptable and on-brand.
- Responsive: single breakpoint at 900px; nav collapses to wordmark + menu button; grids stack.
- Footer Jubal badge: small-caps "DRAFTED, DESIGNED & DEPLOYED BY JUBAL.LAW" linking to jubal.law.
- Every page `<title>`: "Page — Harshaw, Meade & Long LLP". Meta description per page. Favicon: gold "HML" monogram on navy.
- Accessibility: contrast AA minimum (gold on navy passes at ≥18px; don't use gold body text on ivory), focus states = gold outline.
