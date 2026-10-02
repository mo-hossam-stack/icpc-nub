import { useEffect, useState } from 'react'
import { MarkdownSlide, useDeck } from '../lib/decks'
import './deck.css'

export default function DeckPlayer({ levelId, topicId }: { levelId: string; topicId: string }) {
  const deck = useDeck(levelId, topicId)
  const [i, setI] = useState(0)
  const n = deck.slides.length

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        setI((c) => Math.min(n - 1, c + 1))
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setI((c) => Math.max(0, c - 1))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [n])

  if (!deck.exists) {
    return (
      <div className="deck deck--empty">
        <p className="mono-tag">No deck yet</p>
        <p className="deck__hint">
          Create <code>content/slides/{levelId}/{topicId}.md</code> — one slide per{' '}
          <code>---</code>.
        </p>
      </div>
    )
  }

  return (
    <div className="deck">
      <article className="deck__slide" key={i}>
        <MarkdownSlide text={deck.slides[i]} />
      </article>

      <div className="deck__bar">
        <button onClick={() => setI((c) => Math.max(0, c - 1))} disabled={i === 0}>
          ← Prev
        </button>
        <span>
          {i + 1} / {n}
        </span>
        <button onClick={() => setI((c) => Math.min(n - 1, c + 1))} disabled={i === n - 1}>
          Next →
        </button>
      </div>
    </div>
  )
}