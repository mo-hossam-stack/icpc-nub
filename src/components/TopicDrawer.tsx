import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import type { Level, Topic } from '../data/roadmap'
import './drawer.css'

const RES = [
  { kind: 'session', label: 'Session video', note: 'Watch the live recording' },
  { kind: 'sheet', label: 'Problem sheet', note: 'Problems to practise' },
  { kind: 'upsolve', label: 'Upsolve session', note: 'Walkthrough of the solutions' },
] as const

export default function TopicDrawer({
  level,
  topic,
  onClose,
}: {
  level: Level | null
  topic: Topic | null
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)

  // <dialog> gives us the focus trap, Escape key and ::backdrop for free
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (topic && !d.open) d.showModal()
    else if (!topic && d.open) d.close()
  }, [topic])

  return (
    <dialog
      ref={ref}
      className="drawer"
      aria-labelledby="drawer-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
    >
      {topic && level && (
        <div className="drawer__panel">
          <header className="drawer__head">
            <p className="mono-tag">
              {level.name} · {level.kicker}
            </p>
            <h2 className="display" id="drawer-title">
              {topic.title}
            </h2>
            <p className="drawer__blurb">{topic.blurb}</p>
            <button className="drawer__x" onClick={onClose} aria-label="Close panel">
              ✕
            </button>
          </header>

          <div className="drawer__list">
            {RES.map(({ kind, label, note }) => {
              const href = topic.links[kind]
              const live = href && href !== '#'
              const row = (
                <>
                  <span className={`res-grid__dot res-grid__dot--${kind}`} />
                  <b>{label}</b>
                  <i>{live ? note : 'Link coming soon'}</i>
                  <s>{live ? '↗' : '—'}</s>
                </>
              )
              return live ? (
                <a
                  key={kind}
                  className="drawer__row"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {row}
                </a>
              ) : (
                <div key={kind} className="drawer__row is-empty">
                  {row}
                </div>
              )
            })}

            {/* the deck ships with the site, so this one is a real internal route */}
            <Link to={`/${level.id}/${topic.id}`} className="drawer__row" onClick={onClose}>
              <span className="res-grid__dot res-grid__dot--slides" />
              <b>Slides</b>
              <i>Built into this site — no leaving</i>
              <s>→</s>
            </Link>
          </div>

          <p className="drawer__foot">Every link is a placeholder until the community fills it in.</p>
        </div>
      )}
    </dialog>
  )
}
