/**
 * Deck guard. Runs before the build so a broken deck can never reach students.
 * Zero dependencies; Node strips the types off the two TS imports.
 *
 *   npm run check:decks
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { levels } from '../src/data/roadmap.ts'
import { parseDeck } from '../src/lib/deckSource.ts'

const ROOT = new URL('../content/slides', import.meta.url).pathname
const problems = []
const warn = (m) => problems.push(m)

const walk = (dir, acc = []) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) walk(p, acc)
    else if (e.name.endsWith('.md')) acc.push(p)
  }
  return acc
}

const levelOf = (topic) => levels.find((l) => l.topics.includes(topic)).id
const decks = new Map()

for (const file of walk(ROOT)) {
  const rel = file.slice(ROOT.length + 1)
  if (rel.split('/').pop().startsWith('_')) continue // _TEMPLATE.md is not a deck

  const raw = readFileSync(file, 'utf8')
  const id = rel.replace(/\.md$/, '')

  // an unbalanced fence is the one markdown error that silently eats a slide
  const fences = raw
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .filter((l) => /^(`{3,}|~{3,})/.exec(l.trim()))
  if (fences.length % 2 !== 0) warn(`${rel}: unbalanced code fence`)

  const slides = parseDeck(raw)
  if (!slides.length) warn(`${rel}: parses to zero slides`)
  for (const [i, s] of slides.entries())
    if (!s.heading) warn(`${rel}: slide ${i + 1} has no heading (the outline will show "Untitled")`)

  decks.set(id, slides.length)
}

// a topic with no deck file is a legitimate state — the topic page renders a
// student-facing "still being written" notice — so only decks that exist get
// linted, plus any file the roadmap does not know about.
for (const id of decks.keys())
  if (!levels.some((l) => l.topics.some((t) => `${l.id}/${t.id}` === id)))
    warn(`${id}: deck file is not in src/data/roadmap.ts`)

const open = levels.flatMap((l) => l.topics.filter((t) => t.status === 'open'))
let covered = 0
const rows = open.map((t) => {
  const n = decks.get(`${levelOf(t)}/${t.id}`)
  if (n != null) covered++
  return `  ${n == null ? '  -' : `${String(n).padStart(3)} `} ${levelOf(t)}/${t.id}`
})

console.log(
  `decks: ${decks.size} file(s), ${covered}/${open.length} open topics covered\n${rows.join('\n')}`,
)

if (problems.length) {
  console.error(`\n${problems.length} problem(s):`)
  for (const p of problems) console.error(`  ${p}`)
  process.exit(1)
}
