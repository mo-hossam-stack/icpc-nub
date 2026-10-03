import { useMemo } from 'react'
import { parseOne, type Deck } from './deckSource'

export * from './deckSource'

// Load raw markdown synchronously from Vite's eager glob.
// This avoids async loading races on first mobile navigation.
const RAW = import.meta.glob('/content/slides/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

// Filter out underscore-prefixed authoring files (if any)
const DECKS: Record<string, string> = {}
for (const [k, v] of Object.entries(RAW)) {
  if (!k.includes('/_')) DECKS[k] = v
}

export function loadDeck(levelId: string, topicId: string): Deck {
  const key = `/content/slides/${levelId}/${topicId}.md`
  return parseOne(DECKS[key])
}

export function useDeck(levelId: string, topicId: string): Deck {
  return useMemo(() => loadDeck(levelId, topicId), [levelId, topicId])
}
