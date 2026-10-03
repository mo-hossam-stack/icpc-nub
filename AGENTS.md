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
| 04 | Functions & Complexity | `functions-and-complexity` |
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
| `/` | `Home` | The roadmap. No hero yet — the landing section is being rewritten |
| `/:levelId/:topicId` | `Topic` | The native slide deck, and nothing else |
| anything else | `NotFound` | "Wrong turn" |

There is **no level list page** — `/level0` alone is a 404. The map node is the entry point: it
opens `TopicDrawer` (session / sheet / upsolve), and the drawer's **Slides** row is the only
internal link, to `/:levelId/:topicId`. So the links live on `/` and the deck has an endpoint to
itself. Do not re-add a `/:levelId` page without being asked.

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
- `status: 'locked'` → rendered as a dead row / a dashed, blurred node. Not a link.
- `released: false` on a **level** → adds the "under construction" banner and the `SOON` badge
  in the nav.

**To add a topic:** append it to the right `level.topics` with the next `index`. That is it.
The map, the level list, the nav, the stats and the crumbs all derive from this array.

**To add a resource link:** put a URL in `topic.links.session` / `.sheet` / `.upsolve`. An
absent or empty value renders as a "Link coming soon" card. The dot says whether the link
exists, not which kind it is — **filled = live, hollow = still a promise**. The label beside
it already names the kind, so there is no second colour to keep in sync.

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
  Vite-only layer (`import.meta.glob`, `loadDeck`, `useDeck`) is `src/lib/decks.ts`,
  and the renderer is `src/lib/MarkdownSlide.tsx`. The player is `src/components/DeckPlayer.tsx`
  + `deck.css`, and is `React.lazy`-loaded so the markdown libraries never reach the home page —
  keep it that way, or dragging react-markdown back into `/` costs every first paint.
- `npm run check:decks` runs first in `npm run build`. It lints every deck that exists (balanced
  fences, non-zero slides, a heading on every slide, no file the roadmap doesn't know about) and
  prints deck coverage. **A topic with no deck is not an error** — that is a normal state — so
  only malformed decks fail the build.

### Driving it live

The player shows **one slide at a time**, and the mentor is the one holding the clicker:

- `←` `→` or `space` — next. On a slide with code it spends presses on reveals first.
- `F` — full screen. Press it before the room settles; the deck, not the page, goes
  full screen, so the chrome is deliberately absent on a projector.
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

`src/components/Roadmap.tsx` + `roadmap.css`. **One shape: a spine.** A single hairline rail down
the middle of the page (`.spine::before`), one rung per topic alternating left and right, each
rung a short arm from the rail out to a card. No canvas, no SVG, no WebGL, no positioned
percentages. The 3D version was deleted on purpose (1 MB lazy chunk, local font files, weakest
surface on a phone) and so was the ring + serpentine, after three shapes were auditioned at
`/1` `/2` `/3` — the spine won and the audition routes are gone.

- **The layout is CSS grid, not computed coordinates.** A row is
  `grid-template-columns: 1fr 64px 1fr`; `--left` puts the card in column 1, `--right` in column 3
  with `row-reverse`, and `.spine__row::after` draws the 32px arm on that side. No `ring()`, no
  `snake()`, no `--x` / `--y`.
- **The rail is one element for the whole path.** `.spine::before` spans `.spine` top to bottom, so
  adding a level never breaks the line. `.spine__band::before` masks the rail behind each pill.
- **Levels are `<section class="spine__level">`** — a centred band (the level `name`, plus the
  "coming soon" pill when `released` is false; the `kicker` lives in the drawer, not the map) and
  one `<ol class="spine__rows">`. Node count, alternation and the pill all follow from the data;
  adding a level needs no new markup.
- **Open topics are `<button>`s, locked topics are `<div>`s** — no `tabIndex`, and no hover fill, so
  a locked topic is never a door. Levels are **not** styled differently from each other: a level
  that is not released says so with the `coming soon` pill under its name, and its rows still read
  as ordinary cards. Blur/dash the locked rows and the map looks half-broken.
- **Under 700px it drops the alternation**: the rail moves to the left edge, every rung points
  right, cards go full width. That is why the map needs no horizontal scroll — do not add one back.
- Add a level by appending it to `levels` in `src/data/roadmap.ts`. Nothing else.

## 7. Design language

**"Paper and ink."** White page, one accent, oversized condensed display type against small
letter-spaced mono labels, and hairlines doing the structural work that glow used to do.
`.grain` is the one piece of atmosphere left — a fixed overlay in `App.tsx`, barely there, so
white does not read as flat. Scanlines and the vignette were cut: on a light page both just
muddy the type, and the site is read as much as projected.

The palette is **one accent on neutrals**. There are no second, third or fourth hues, so a new
surface never needs a new colour — pick a grey. State (open / locked / soon, link live /
promised) is carried by **fill and border style**, never by hue.

| token | value | use |
|-------|-------|-----|
| `--bg` | `#ffffff` | page |
| `--bg-2` `--bg-3` | `#f7f7f5` `#efefec` | raised surfaces, hover, code wells |
| `--line` `--line-hot` | `#e4e4e0` `#cdcdc7` | hairlines, borders |
| `--fg` | `#16181c` | primary text |
| `--muted` `--dim` | `#565f6b` `#656e7a` | secondary / tertiary text |
| `--accent` | `#4f7a1e` | the logo green, darkened to clear 4.5:1 on white |

Fonts: **Bricolage Grotesque** (display, 800, uppercase) + **JetBrains Mono** (everything
else). Loaded from Google Fonts in `index.html`. Never substitute Inter/Roboto/system fonts.

**Contrast bar:** every text colour must clear 4.5:1 on `--bg`, `--bg-2` *and* `--bg-3`, and
white on `--accent` clears it too. Do not dim text with `opacity` on a parent — that silently
breaks the ratio. Body copy is `font-weight: 400`; 300 was the old dark-canvas setting and
is too thin to read on white. Check before you ship: Lighthouse, or the computed-contrast
sweep over `/`, `/level0`, `/level0/conditions-and-loops`, `/level1` and a 404.

Levels carry their own `accent` exposed as the `--accent` CSS variable, so a new level can
theme itself by adding one field. Both levels currently point at the same accent — that is the
point, not an oversight; give one level its own hue only when there is a reason to.

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
- **The map is the only way in.** Every node is a real `<button>` that opens the drawer, so it is
  keyboard- and screen-reader-drivable, but there is no plain text list of the path any more — the
  `/:levelId` page was cut on purpose. Re-add it if the map stops being usable on a phone.

## 10. Likely next steps, in the order they would hurt least

1. Fill the real session / sheet / upsolve URLs in `src/data/roadmap.ts`.
2. Write the remaining Level 0 decks in `content/slides/level0/` — one topic at a time,
   starting from the `conditions-and-loops.md` example already there.
3. Rewrite the Level 1 topic list to whatever the community actually teaches next.
4. Progress tracking in `localStorage`; move to Django only when cross-device sync is wanted.
5. Mobile nav polish — the map scrolls sideways rather than reflowing.
