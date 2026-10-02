# AGENTS.md — ICPC NUB Community

Read this before touching anything. It is the whole product in one file.

## 1. What this is

A single-page site for the **ICPC NUB Community** whose centre of gravity is **one interactive
roadmap** of the community's learning path. Every topic on that roadmap is a node, and every
node is a complete learning unit in one place:

- the **session video** recording,
- the **problem sheet** to practise,
- the **upsolve session** walkthrough,
- and a **native in-browser slide deck** for the topic itself.

The goal is that a member never has to leave the site to learn a topic.

### The roadmap structure

**Level 0 — "The Foundation"** (released). Syntax and raw material. In order:

| # | Topic | id |
|---|-------|----|
| 01 | Conditions & Loops | `conditions-and-loops` |
| 02 | Arrays | `arrays` |
| 03 | Strings | `strings` |
| 04 | Ad-Hoc | `adhoc` |
| 05 | STL 1 | `stl1` |
| 06 | STL 2 | `stl2` |

**Level 1 — "The Construction"** (locked / coming soon). The algorithms built on top of Level 0.
The nodes exist and are visible so the path ahead is clear; the decks land topic by topic.
Current map: `binary-search`, `prefix-sum`, `two-pointers`, `sorting-advanced`, `greedy`,
`basic-dp`. **Treat this list as a guess — the coordinator rewrites it freely.**

## 2. Stack

- **React 19 + TypeScript + Vite 7.** SPA only. `react-router-dom` v7.
- **react-markdown + remark-gfm** for slide markdown. Nothing else — no UI kit, no state
  library, no CSS framework. Do not hand-roll a markdown parser or a markdown component.
- **No backend.** The site is fully static. Django is a *possible* future step for accounts,
  progress sync or an editor — nothing in the current architecture assumes it, and nothing
  requires it.
- Deployed at the **domain root** on **Vercel**. `vercel.json` ships the SPA rewrite and the
  immutable cache header for hashed assets; `base` in `vite.config.ts` is `/`. Moving to a
  subfolder means changing `base` too. Node is pinned via `engines.node` in `package.json`.

```bash
npm run dev        # dev server
npm run build      # tsc -b && vite build  -> dist/
npm run preview    # serve dist/
npm run typecheck
```

`npm run build` is the gate. `tsc` runs with `noUnusedLocals` and `strict`.

## 3. Routes

| Route | Page | What it is |
|-------|------|-----------|
| `/` | `Home` | Hero, the roadmap, the two level cards |
| `/:levelId` | `Level` | The topic list for a level, each row showing its 3 resources |
| `/:levelId/:topicId` | `Topic` | Resource cards + the native slide deck |
| anything else | `NotFound` | "Wrong turn" |

`levelId` is `level0` / `level1`. **The URL and the data are coupled**: the `id` of a level and
the `id` of a topic *are* the route and the slide filename. Rename an id and you break the URL
and the deck lookup in one move.

## 4. The data model — the only file that defines the roadmap

Everything renders from `src/data/roadmap.ts`. There is no CMS, no JSON fetch, no hardcoded
topic list anywhere else in the app.

```ts
levels: Level[]  ->  topics: Topic[]  ->  links: { session?, sheet?, upsolve? }
```

- `status: 'open'` → clickable, `/level0/arrays` opens the deck.
- `status: 'locked'` → rendered as a dead row / a wireframe red node. Not a link.
- `released: false` on a **level** → adds the "under construction" banner and the `SOON` badge
  in the nav.

**To add a topic:** append it to the right `level.topics` with the next `index`. That is it.
The map, the level list, the nav, the stats and the crumbs all derive from this array.

**To add a resource link:** put a URL in `topic.links.session` / `.sheet` / `.upsolve`. An
absent or empty value renders as a "Link coming soon" card. The dot colours are fixed:
session = red, sheet = blue, upsolve = green.

**To unlock a Level 1 topic:** flip `status` to `'open'`, and (optionally) set the level's
`released` to `true` when the whole level is done.

## 5. Writing a slide deck

One markdown file per topic at `content/slides/<levelId>/<topicId>.md`. No build step, no
front-matter, no front-end editor — drop in text, save, reload.
`content/slides/_TEMPLATE.md` is the starting point; copy it and follow it.

```markdown
# Arrays

> One line on what the topic is and why it matters.

---

## Declaration

- `int a[100];` — fixed at compile time.
- Use this for contrast...

---

## Reference implementation

```cpp
int g[3][3];
```

---

## Your notes

Anything the coach said.
```

Rules:

- `---` on its own line separates slides. Everything else is markdown, rendered by
  **react-markdown + remark-gfm** (tables, fenced code, blockquotes, task lists all work).
  Raw HTML is **not** enabled, so nothing is ever injected into the DOM — and `<kbd>` or any
  other tag in a deck silently disappears. Use inline code for key names.
- **The deck is built to be projected, not read.** One idea per slide, roughly a dozen lines,
  and every slide starts with a heading — that heading is the label in the outline. If a slide
  needs two ideas it needs two slides.
- **A code line ending in `// [!]` is hidden until you press next.** Pressing next reveals that
  line plus every line up to the next mark, so ask the room first and then walk the code
  forward. Marks are stripped before rendering and before Copy. Several code blocks on one
  slide share a single sequence.
- No file → the topic page shows a student-facing "still being written" state. It must **never**
  expose repo internals: no file paths, no `---`, no authoring instructions. That copy is for
  members, not for whoever writes the deck — the deck recipe lives here instead. **Most topics do
  not have a deck yet**, they get written one at a time.
- `parseDeck` / `visibleUpTo` live in `src/lib/deckSource.ts` and are deliberately free of react
  and of `import.meta.glob`, so `scripts/check-decks.mjs` can import the very same file. The
  Vite-only layer (`import.meta.glob`, `loadDeck`, `useDeck`, `deckCounts`) is `src/lib/decks.ts`,
  and the renderer is `src/lib/MarkdownSlide.tsx`. The player is `src/components/DeckPlayer.tsx`
  + `deck.css`, and is `React.lazy`-loaded so the markdown libraries never reach the home or
  level pages — keep it that way, or `Level.tsx`'s coverage chip will drag react-markdown in.
- `npm run check:decks` runs first in `npm run build`. It lints every deck that exists (balanced
  fences, non-zero slides, a heading on every slide, no file the roadmap doesn't know about) and
  prints deck coverage. **A topic with no deck is not an error** — that is a normal state — so
  only malformed decks fail the build.

### Driving it live

The player shows **one slide at a time**, and the mentor is the one holding the clicker:

- `←` `→` or `space` — next. On a slide with code it spends presses on reveals first.
- `F` — full screen. Press it before the room settles; the deck, not the page, goes
  full screen, so the CRT overlays are deliberately absent on a projector.
- `O` — outline overlay (`<dialog>`, so it gets the focus trap and Escape for free). Jump
  anywhere without stepping through. Global arrows are suppressed while it is open.
- `P` — spotlight: a mask follows the mouse so the mentor can point at a line without walking
  to the laptop. Off by default, so a student on their own laptop never sees it. The mask is on
  `.deck__stage`, not the slide, so it does not drift when a long slide scrolls.
- `[` `]` — text size, for the back row.
- `Home` / `End` — first / last slide.
- The tick strip is `n` segments; taller segments are slides that spend presses on reveals.

Everything on the keyboard is also a real `<button>` with a label. There is still no grid view,
swipe or per-slide URL — cut on purpose in §9. Revisit only if someone actually asks.

**Markdown in slides is styled by descendant selectors under `.deck__slide`** — a new markdown
element needs a rule there or it will render unstyled. `table`/`th`/`td`, `img`, `del` and GFM
task lists are already covered.

## 6. The roadmap

`src/components/Roadmap.tsx` + `roadmap.css`. Plain SVG lines and positioned DOM nodes — no
canvas, no WebGL. The 3D version was deleted on purpose: it cost a 1 MB lazy chunk, needed local
font files for its labels, and was the weakest surface on a phone.

- **Positions are computed, not hand-placed.** `ring(n, cx, cy, r)` puts the nodes on a circle and
  closes them with a `<polygon>`; `snake(n)` lays the next level out as a serpentine. Both return
  `{x, y}` in percent of the stage box, which is fed to CSS as `--x` / `--y`. Reuse those helpers
  instead of adding literals.
- **One stage per level.** Level 0 is the ring; a gradient connector hangs below it; level 1 is
  the serpentine.
- **Lines are SVG, text is DOM.** `.map__lines` is `position: absolute; inset: 0` with
  `preserveAspectRatio="none"` and `vector-effect: non-scaling-stroke`, so one viewBox in 0-100
  units draws every connector. Nodes are real `<a>`/`<div>`s on top. This is deliberate: SVG text
  would scale with the viewBox and be unreadable on a phone.
- **Open nodes are `<Link>`s. Locked nodes are `<div>`s** with no `href` and no `tabIndex` — they
  must stay out of the tab order, which is why the blurred layer is also `pointer-events: none`.
- `.map__stage--*` carries `min-width: 560px` and `.map__scroll` is `overflow-x: auto`, so a phone
  scrolls the map sideways instead of shrinking the labels below 11px.
- Add a level by appending it to `levels` and adding one `.map__level` block. The node count,
  geometry, locked state and "coming soon" chip all follow from the data.

## 7. Design language

**"Oscilloscope / terminal blueprint."** Near-black canvas, phosphor glow, hairline grid,
grain, scanlines, oversized condensed display type against small letter-spaced mono labels.
The whole page is a CRT: `.grain`, `.scanlines` and `.vignette` are fixed overlays in `App.tsx`
and must not be removed.

Palette is sampled from `logo.jpg` and must not drift:

| token | value | use |
|-------|-------|-----|
| `--ink` | `#05070a` | page background |
| `--ink-2` `#0a0e14` `--ink-3` `#10151d` | | raised surfaces |
| `--line` `--line-hot` | `#1c2530` `#2a3746` | hairlines, borders |
| `--paper` | `#e8edf2` | primary text |
| `--muted` `--dim` | `#7c8b9c` `#748396` | secondary / tertiary text |
| `--green` | `#84bc3c` | upsolve, done, primary accent |
| `--blue` | `#349cd4` | open nodes, sheet, structural lines |
| `--red` | `#f44c4c` | locked, session video |
| `--orange` | `#fc940c` | coming soon, inline code |

Fonts: **Bricolage Grotesque** (display, 800, uppercase) + **JetBrains Mono** (everything
else). Loaded from Google Fonts in `index.html`. Never substitute Inter/Roboto/system fonts.

**Contrast bar:** every text colour must clear 4.5:1 on `--ink`, `--ink-2` *and* `--ink-3`.
`--dim` was raised from `#4a5765` to `#748396` for this reason (2.7:1 → 4.7:1). Do not dim text
with `opacity` on a parent — that silently breaks the ratio. Run Lighthouse before you ship.

Levels also carry their own `accent` (level0 = blue, level1 = green) exposed as the `--accent`
CSS variable, so a new level can theme itself by adding one field.

## 8. Conventions

- CSS is plain, one file per area: `src/styles/base.css` (tokens + atmosphere),
  `src/styles/pages.css`, `src/components/nav.css`, `src/components/deck.css`,
  `src/components/roadmap.css`.
  No Tailwind, no CSS-in-JS, no component libraries.
- No comments in code unless they explain a non-obvious constraint.
- Animation is CSS-first. There is no render loop to hook into any more.
- `prefers-reduced-motion` is already handled globally — keep new motion inside that guard.
- Accessibility bar: real `<button>`/`<a>`, visible focus, labels on icon-only controls, and
  the slide deck must stay keyboard-drivable.

## 9. Deliberate shortcuts

Known ceilings. Do not "fix" them without being asked, and do not build around them either.

- **No progress tracking.** Nodes are not "yours", they are "the path". If a member marks a
  topic done it will be per-browser `localStorage` first, and a real answer needs accounts —
  i.e. the backend step.
- **No search.** 6 + 6 topics do not need it. Revisit past ~30.
- **Slides are markdown, not a WYSIWYG editor.** Authoring in-repo is the whole point: a text
  file survives everything. An in-browser editor is a separate decision, not a missing feature.
- **No presenter notes channel.** The mentor drives a whiteboard site for live scribbling and
  talking points, so `???`-style per-slide notes were cut. The deck shows only what the room sees.
- **No syntax highlighting.** That would mean a new dependency (shiki/highlight.js) for colour
  alone; code blocks are mono on near-black and stay that way until someone asks.
- **One slide at a time, no chrome.** No grid, no per-slide routing. Keyboard arrows plus
  Prev/Next plus the outline overlay is the whole player. Full screen was cut here too and then
  asked for back — `F` is the native Fullscreen API on `.deck`, no dependency, no layout fork.
- **`react-markdown` runs with raw HTML disabled**, so a malicious deck cannot inject
  markup. If decks ever become user-submitted, that is already handled — but there is still no
  per-user storage, so that would be the backend step.
- **The map is a second way in, not the only one.** Every node on it also appears in the level
  page list, which is what a phone or a screen reader actually uses.

## 10. Likely next steps, in the order they would hurt least

1. Fill the real session / sheet / upsolve URLs in `src/data/roadmap.ts`.
2. Write the remaining Level 0 decks in `content/slides/level0/` — one topic at a time,
   starting from the `conditions-and-loops.md` example already there.
3. Rewrite the Level 1 topic list to whatever the community actually teaches next.
4. Progress tracking in `localStorage`; move to Django only when cross-device sync is wanted.
5. Mobile nav polish — the map scrolls sideways rather than reflowing.
