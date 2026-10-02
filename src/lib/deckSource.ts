/**
 * Deck parsing. Deliberately free of react and of `import.meta.glob` so the
 * build-time checker (scripts/check-decks.mjs) can import this exact file.
 *
 * A deck is one markdown file at content/slides/<levelId>/<topicId>.md.
 * A line containing only `---` starts a new slide, except inside a fenced block.
 * A code line ending in `// [!]` (or `# [!]`) is hidden until that reveal step.
 */

const MARK = /\s*(?:\/\/|#)\s*\[!\]\s*$/

export interface CodeBlock {
  lang: string
  /** Source lines with the [!] marker stripped. */
  lines: string[]
  /** 1-based line numbers carrying [!]. */
  marks: number[]
  /** Slide step at which this block's first reveal lands. */
  step0: number
}

export interface Slide {
  /** First heading on the slide, '' if there is none. Used by the outline. */
  heading: string
  /** Markdown with [!] markers stripped and fences rebuilt. */
  body: string
  codes: CodeBlock[]
  /** Number of arrow-key presses this slide spends on reveals. */
  steps: number
}

export interface Deck {
  slides: Slide[]
  exists: boolean
}

interface Draft {
  heading: string
  body: string[]
  codes: CodeBlock[]
  steps: number
  fence: string
  lang: string
  buf: string[]
}

const newDraft = (): Draft => ({
  heading: '',
  body: [],
  codes: [],
  steps: 0,
  fence: '',
  lang: '',
  buf: [],
})

/** Emit the buffered fence back into the markdown body, harvesting its marks. */
function flushBuf(d: Draft) {
  // must be idempotent: this runs on every fence close *and* once after the loop
  if (!d.codes.length || !d.buf.length) {
    d.buf = []
    return
  }
  const b = d.codes[d.codes.length - 1]
  b.step0 = d.steps
  for (const line of d.buf) {
    const m = MARK.exec(line)
    if (m) {
      b.marks.push(b.lines.length + 1)
      b.lines.push(line.slice(0, m.index).trimEnd())
    } else {
      b.lines.push(line)
    }
  }
  d.steps += b.marks.length
  d.body.push('```' + b.lang, ...b.lines, '```')
  d.buf = []
}

export function parseDeck(raw: string): Slide[] {
  const slides: Slide[] = []
  let d = newDraft()

  for (const line of raw.replace(/\r\n?/g, '\n').split('\n')) {
    const trimmed = line.trim()
    const fence = /^(`{3,}|~{3,})(.*)$/.exec(trimmed)

    if (d.fence) {
      const closes =
        fence && fence[1][0] === d.fence[0] && fence[1].length >= d.fence.length && !fence[2].trim()
      if (closes) {
        flushBuf(d)
        d.fence = ''
      } else {
        d.buf.push(line)
      }
      continue
    }

    if (fence) {
      d.fence = fence[1]
      d.lang = fence[2].trim()
      d.codes.push({ lang: d.lang, lines: [], marks: [], step0: 0 })
      continue
    }

    if (trimmed === '---') {
      flushBuf(d)
      slides.push({ heading: d.heading, body: d.body.join('\n'), codes: d.codes, steps: d.steps })
      d = newDraft()
      continue
    }

    if (!d.heading) {
      const h = /^#{1,6}\s+(.*)$/.exec(trimmed)
      // the outline lists this, so it has to read as prose and not as markdown
      if (h) d.heading = h[1].replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[`*_]/g, '').trim()
    }
    d.body.push(line)
  }

  flushBuf(d)
  slides.push({ heading: d.heading, body: d.body.join('\n'), codes: d.codes, steps: d.steps })
  return slides.filter((s) => s.heading || s.body.trim())
}

/** Highest line index visible at `step`. Infinity once every mark is passed. */
export function visibleUpTo(b: CodeBlock, step: number): number {
  if (!b.marks.length) return Infinity
  const done = Math.min(b.marks.length, Math.max(0, step - b.step0))
  if (done === 0) return Math.max(b.marks[0] - 1, 1)
  return done < b.marks.length ? b.marks[done] - 1 : Infinity
}

export function parseOne(raw: string | undefined): Deck {
  if (raw == null) return { slides: [], exists: false }
  const slides = parseDeck(raw)
  return { slides, exists: slides.length > 0 }
}
