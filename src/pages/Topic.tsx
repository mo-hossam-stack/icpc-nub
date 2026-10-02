import { lazy, Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import { levels, topicById } from '../data/roadmap'
import NotFound from './NotFound'

const DeckPlayer = lazy(() => import('../components/DeckPlayer'))

const RES: { kind: 'session' | 'sheet' | 'upsolve'; label: string; note: string }[] = [
  { kind: 'session', label: 'Session video', note: 'Watch the live session recording' },
  { kind: 'sheet', label: 'Problem sheet', note: 'Practice problems for this topic' },
  { kind: 'upsolve', label: 'Upsolve session', note: 'Walkthrough of the sheet solutions' },
]

export default function Topic() {
  const { levelId = '', topicId = '' } = useParams()
  const level = levels.find((l) => l.id === levelId)
  const topic = topicById(levelId, topicId)

  if (!level || !topic) return <NotFound />

  if (topic.status === 'locked') {
    return (
      <main className="wrap topicpage topicpage--locked" style={{ '--accent': level.accent } as React.CSSProperties}>
        <nav className="crumbs">
          <Link to="/">Home</Link>
          <i>/</i>
          <Link to={`/${level.id}`}>{level.name}</Link>
          <i>/</i>
          <b>{topic.title}</b>
        </nav>
        <h1 className="display">{topic.title}</h1>
        <p className="topic__blurb">{topic.blurb}</p>
        <p className="mono-tag">Deck not written yet</p>
        <Link to={`/${level.id}`} className="btn">
          <span>Back to {level.name}</span>
        </Link>
      </main>
    )
  }

  return (
    <main className="wrap topicpage" style={{ '--accent': level.accent } as React.CSSProperties}>
      <nav className="crumbs">
        <Link to="/">Home</Link>
        <i>/</i>
        <Link to={`/${level.id}`}>{level.name}</Link>
        <i>/</i>
        <b>{topic.title}</b>
      </nav>

      <header className="topic__head">
        <div>
          <p className="mono-tag">
            {level.name} · {level.kicker}
          </p>
          <h1 className="display">{topic.title}</h1>
          <p className="topic__blurb">{topic.blurb}</p>
        </div>
        <div className="topicpage__no">
          {String(topic.index + 1).padStart(2, '0')}
          <i>/{String(level.topics.length).padStart(2, '0')}</i>
        </div>
      </header>

      <section className="res-grid">
        {RES.map(({ kind, label, note }) => {
          const href = topic.links[kind]
          const inner = (
            <>
              <span className={`res-grid__dot res-grid__dot--${kind}`} />
              <span className="res-grid__label">{label}</span>
              <span className="res-grid__note">{href ? note : 'Link coming soon'}</span>
              <span className="res-grid__arrow">{href && href !== '#' ? '↗' : '—'}</span>
            </>
          )
          return href && href !== '#' ? (
            <a key={kind} className="res-card" href={href} target="_blank" rel="noreferrer">
              {inner}
            </a>
          ) : (
            <div key={kind} className="res-card is-empty">
              {inner}
            </div>
          )
        })}
      </section>

      <section className="deck-wrap">
        <div className="deck-wrap__head">
          <p className="mono-tag">Native deck</p>
          <h2>Slides</h2>
        </div>
        <Suspense fallback={<p className="mono-tag">Loading deck…</p>}>
          <DeckPlayer levelId={level.id} topicId={topic.id} />
        </Suspense>
      </section>
    </main>
  )
}
