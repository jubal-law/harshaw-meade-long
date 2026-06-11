# Harshaw, Meade & Long LLP

> *Counsel for the long view.*

The website of **Harshaw, Meade & Long LLP** — an elite, deliberately small American law firm, founded 1939 in a single room above a Kansas City bank.

There is one complication: the firm does not exist.

## What this is

Harshaw, Meade & Long is the **fictional demonstration practice of [Jubal.law](https://jubal.law)**, the AI legal partner for solo and midsize firms. When Jubal's research, marketing, or presentations need to show the product working — a matter analyzed in an hour, discovery prepped in an afternoon, a brief drafted in the firm's own voice — it happens here, at HML.

The partners are borrowed, with affection and respect, from the works of Robert A. Heinlein. The site is salted with quiet easter eggs for readers who know the books; none are labeled, and we are not going to label them here either. The full disclosure lives on the [About page](https://harshawmeadelong.com/about), in the section titled *"An homage, freely admitted."*

**No legal services are offered.** All matters described are fictional. No affiliation with the Heinlein estate is claimed or implied.

## The site

Five pages of hand-built static HTML and CSS. No framework, no build step, no dependencies.

```
public/
  index.html       Home — hero, stat band, the firm, our people, practices
  attorneys.html   Attorneys — name partners, counsel & associates, the Fair Witness Standard
  practice.html    Practice Areas — six practices, one standard (and a note on fees)
  about.html       The Firm — history, values, timeline, and the homage
  contact.html     Contact — working consultation form, Kansas City & Luna City offices
  styles.css       Single shared stylesheet — all design tokens live here
  favicon.svg      Gold HML monogram on navy
```

JavaScript appears in exactly two places: the mobile navigation toggle and the contact form. That's it.

### Contact form

The form on `/contact` actually sends. `api/contact.ts` is a single Vercel serverless function that relays submissions through [send.dev](https://send.dev) from `hello@jubal.law` — an internal notification to the firm inbox, and a confirmation to the sender in the firm's voice (complete with the no-attorney-client-relationship fine print; we are fictional, not careless). Honeypot and timing checks keep the bots out.

Required environment variables (set in Vercel project settings):

| Variable | Purpose |
|---|---|
| `SEND_DEV_API_KEY` | send.dev API key (required) |
| `CONTACT_RECIPIENT` | Where notifications go (default `hello@jubal.law`) |

### Design

The design system is documented in [`design/DESIGN-SPEC.md`](design/DESIGN-SPEC.md), with SVG mockups in [`design/mockups/`](design/mockups/) as the visual source of truth.

- **Palette:** ink navy `#0F1B2B`, ivory `#F6F2EA`, gold `#B99457` — never more than one gold element per visual cluster
- **Type:** Cormorant Garamond (display) + Source Sans 3 (text), via Google Fonts
- **Signature:** a 4px gold bar at the top of every page, and `border-radius: 0` everywhere — sharp corners are part of the look

A *Representative Matters* page ships later; the nav and stylesheet are already structured for it.

## Local development

```bash
pnpm dev        # http://localhost:3065 — pages, clean URLs, and the contact form
```

No build step, no dependencies. `pnpm dev` runs `scripts/dev.mjs`, a ~100-line zero-dependency Node server that serves `public/` with Vercel-style clean URLs **and** mounts `api/contact.ts` at `/api/contact` — so the contact form works locally exactly as it does in production (it reads `SEND_DEV_API_KEY` from `.env.local`; without it the form returns a polite 503). Requires Node 22.18+ for native TypeScript imports.

Just want the pages? Any static server works: `npx serve public` or `python3 -m http.server 8000 --directory public`.

## Deployment

Deployed to [Vercel](https://vercel.com) with zero configuration: static pages are served from `public/`, `api/contact.ts` becomes a serverless function, and `vercel.json` enables clean URLs (`/attorneys` rather than `/attorneys.html`). There is no build command — push to `main` and it ships.

## License & legal

Site code is © Jubal.law. Harshaw, Meade & Long LLP is a fictional firm; its attorneys, offices, and matters are fictional. Character names referenced in homage are from the works of Robert A. Heinlein; no affiliation with the Heinlein estate is claimed or implied. Attorney advertising it is not, but we keep the disclaimer anyway — every document drafted as if it will be read aloud in court.

---

<p align="center"><sub>DRAFTED, DESIGNED &amp; DEPLOYED BY <a href="https://jubal.law">JUBAL.LAW</a></sub></p>
