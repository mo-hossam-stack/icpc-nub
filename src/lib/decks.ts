import { useMemo } from 'react'
import { parseDeck, parseOne, type Deck } from './deckSource'

export * from './deckSource'

// `_`-prefixed files are authoring aids, not decks, and must not ship to clients
const RAW = import.meta.glob(['/content/slides/**/*.md', '!/content/slides/**/_*.md'], {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export function loadDeck(levelId: string, topicId: string): Deck {
  return parseOne(RAW[`/content/slides/${levelId}/${topicId}.md`])
}

/** "<levelId>/<topicId>" -> slide count, for the coverage chip on the level page. */
export const deckCounts: Record<string, number> = Object.fromEntries(
  Object.entries(RAW).map(([p, raw]) => [
    p.replace(/^\/content\/slides\//, '').replace(/\.md$/, ''),
    parseDeck(raw).length,
  ]),
)

export function useDeck(levelId: string, topicId: string): Deck {
  return useMemo(() => loadDeck(levelId, topicId), [levelId, topicId])
}
