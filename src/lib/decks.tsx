/**
 * Slide decks live in /content/slides/<levelId>/<topicId>.md
 * Slides are separated by a line containing only `---`.
 * Rendered with react-markdown + remark-gfm — no HTML injection.
 */
import { useMemo } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const RAW = import.meta.glob('/content/slides/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export interface Deck {
  title: string
  slides: string[]
  exists: boolean
}

export function loadDeck(levelId: string, topicId: string): Deck {
  const raw = RAW[`/content/slides/${levelId}/${topicId}.md`]
  if (raw == null) return { title: topicId, slides: [], exists: false }

  const slides = raw
    .split(/^---[ \t]*$/m)
    .map((s) => s.trim())
    .filter(Boolean)

  return { title: topicId, slides, exists: slides.length > 0 }
}

export function MarkdownSlide({ text }: { text: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href }) => <a href={href} target="_blank" rel="noreferrer" />,
      }}
    >
      {text}
    </Markdown>
  )
}

/** Re-export so the player never needs useMemo itself. */
export function useDeck(levelId: string, topicId: string) {
  return useMemo(() => loadDeck(levelId, topicId), [levelId, topicId])
}