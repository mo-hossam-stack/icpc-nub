import { useEffect, useRef, useState } from 'react'
import { useDeck } from '../lib/decks'
import { MarkdownSlide } from '../lib/MarkdownSlide'
import './deck.css'

const SCALES = [0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.6]
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

export default function DeckPlayer({ levelId, topicId }: { levelId: string; topicId: string }) {
  const deck = useDeck(levelId, topicId)
  const [{ i, step }, setPos] = useState({ i: 0, step: 0 })
  const [outline, setOutline] = useState(false)
  const [spot, setSpot] = useState(false)
  const [full, setFull] = useState(false)
  const [scaleIdx, setScaleIdx] = useState(2)
  const outlineRef = useRef<HTMLDialogElement>(null)
  const deckRef = useRef<HTMLDivElement>(null)

  const toggleFull = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else deckRef.current?.requestFullscreen()
  }

  const n = deck.slides.length
  const slide = deck.slides[i]
  const steps = slide?.steps ?? 0
  const scale = SCALES[scaleIdx]

  // one state object, updated functionally: a burst of key presses in a single
  // React batch must not read a stale slide index
  const goto = (j: number) => setPos({ i: clamp(j, 0, n - 1), step: 0 })
  const next = () =>
    setPos(({ i, step }) => {
      const max = deck.slides[i]?.steps ?? 0
      if (step < max) return { i, step: step + 1 }
      return i < n - 1 ? { i: i + 1, step: 0 } : { i, step }
    })
  const prev = () =>
    setPos(({ i, step }) => {
      if (step > 0) return { i, step: step - 1 }
      return i > 0 ? { i: i - 1, step: deck.slides[i - 1].steps } : { i, step }
    })

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const t = e.target as HTMLElement | null
      if (t?.isContentEditable || t?.tagName === 'INPUT' || t?.tagName === 'TEXTAREA') return
      // the outline dialog owns the keyboard while it is open
      if (outlineRef.current?.open) return

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault()
          next()
          break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          prev()
          break
        case 'Home':
          e.preventDefault()
          goto(0)
          break
        case 'End':
          e.preventDefault()
          goto(n - 1)
          break
        case 'o':
        case 'O':
          e.preventDefault()
          setOutline((v) => !v)
          break
        case 'p':
        case 'P':
          e.preventDefault()
          setSpot((v) => !v)
          break
        case 'f':
        case 'F':
          e.preventDefault()
          toggleFull()
          break
        case '[':
          setScaleIdx((v) => clamp(v - 1, 0, SCALES.length - 1))
          break
        case ']':
          setScaleIdx((v) => clamp(v + 1, 0, SCALES.length - 1))
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [deck, n])

  // <dialog> gives the outline its focus trap, Escape key and ::backdrop for free
  useEffect(() => {
    const d = outlineRef.current
    if (!d) return
    if (outline && !d.open) d.showModal()
    else if (!outline && d.open) d.close()
  }, [outline])

  // Escape leaves fullscreen natively, so the button state has to follow the browser
  useEffect(() => {
    const on = () => setFull(document.fullscreenElement != null)
    document.addEventListener('fullscreenchange', on)
    return () => document.removeEventListener('fullscreenchange', on)
  }, [])

  if (!deck.exists) {
    return (
      <div className="deck deck--empty">
        <p className="mono-tag">Slides</p>
        <p className="deck__hint">
          This deck is still being written. It lands after the next session.
        </p>
      </div>
    )
  }

  return (
    <div
      ref={deckRef}
      className={`deck${spot ? ' deck--spot' : ''}`}
      style={{ '--deck-scale': scale } as React.CSSProperties}
    >
      <div
        className="deck__stage"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
          e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
        }}
      >
        <article className="deck__slide" key={i}>
          <MarkdownSlide slide={slide} step={step} />
        </article>
        <div className="deck__spot" aria-hidden="true" />
      </div>

      <div className="deck__ticks" aria-hidden="true">
        {deck.slides.map((s, j) => (
          <span
            key={j}
            title={s.heading}
            className={`deck__tick${j < i ? ' is-past' : ''}${j === i ? ' is-now' : ''}${
              s.steps ? ' has-steps' : ''
            }`}
          />
        ))}
      </div>

      <div className="deck__bar">
        <button onClick={prev} disabled={i === 0 && step === 0}>
          ← Prev
        </button>
        <span>
          {i + 1} / {n}
          {steps > 0 && (
            <i className="deck__reveal">
              reveal {step}/{steps}
            </i>
          )}
        </span>
        <button onClick={next} disabled={i === n - 1 && step >= steps}>
          Next →
        </button>
      </div>

      <div className="deck__tools">
        <button aria-pressed={outline} onClick={() => setOutline(true)}>
          Outline
        </button>
        <button aria-pressed={spot} onClick={() => setSpot((v) => !v)}>
          Pointer
        </button>
        <button aria-pressed={full} onClick={toggleFull}>
          {full ? 'Exit full' : 'Full screen'}
        </button>
        <span className="deck__size">
          <button aria-label="Smaller text" onClick={() => setScaleIdx((v) => clamp(v - 1, 0, SCALES.length - 1))}>
            A−
          </button>
          <i>{Math.round(scale * 100)}%</i>
          <button aria-label="Larger text" onClick={() => setScaleIdx((v) => clamp(v + 1, 0, SCALES.length - 1))}>
            A+
          </button>
        </span>
      </div>

      <p className="deck__keys">
        ← → space next · O outline · P pointer · F full screen · [ ] size · Home / End jump
      </p>

      <dialog
        ref={outlineRef}
        className="deck__outline"
        aria-label="Slide outline"
        onClose={() => setOutline(false)}
      >
        <header className="deck__outline__head">
          <p className="mono-tag">Outline</p>
          <button onClick={() => setOutline(false)} aria-label="Close outline">
            ✕
          </button>
        </header>
        <ol>
          {deck.slides.map((s, j) => (
            <li key={j}>
              <button
                className={j === i ? 'is-now' : ''}
                onClick={() => {
                  goto(j)
                  setOutline(false)
                }}
              >
                <i>{String(j + 1).padStart(2, '0')}</i>
                <b>{s.heading || 'Untitled'}</b>
                {s.steps > 0 && <em>{s.steps}</em>}
              </button>
            </li>
          ))}
        </ol>
      </dialog>
    </div>
  )
}
