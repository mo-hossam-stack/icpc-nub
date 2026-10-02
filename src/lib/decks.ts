import { useMemo } from 'react'
import { parseOne, type Deck } from './deckSource'

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

export function useDeck(levelId: string, topicId: string): Deck {
  return useMemo(() => loadDeck(levelId, topicId), [levelId, topicId])
}
