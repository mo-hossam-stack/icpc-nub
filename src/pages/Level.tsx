import { Link, useParams } from 'react-router-dom'
import { levels, levelById } from '../data/roadmap'
import { deckCounts } from '../lib/decks'
import NotFound from './NotFound'

const ACCENT_VAR = (c: string) => ({ '--accent': c }) as React.CSSProperties

export default function Level() {
  const { levelId = '' } = useParams()
  const level = levelById(levelId)
  if (!level) return <NotFound />
  const idx = levels.indexOf(level)

  return (
    <main className="wrap level" style={ACCENT_VAR(level.accent)}>
      <nav className="crumbs">
        <Link to="/">Home</Link>
        {idx > 0 && <><i>/</i><span>{levels[idx - 1].name}</span></>}
        <i>/</i>
        <b>{level.name}</b>
      </nav>

      <header className="level__head">
        <span className="level__num">0{level.index}</span>
        <div>
          <p className="mono-tag">{level.kicker}</p>
          <h1 className="display">{level.name}</h1>
          <p className="level__sum">{level.summary}</p>
        </div>
        <div className="level__badge">
          {level.released ? `${level.topics.length} topics · live` : `${level.topics.length} topics · locked`}
        </div>
      </header>

      {!level.released && (
        <div className="soon">
          <span className="soon__dot" />
          <p>
            <b>Level 1 is under construction.</b> The nodes are already mapped so you can see what
            comes next — the decks land topic by topic.
          </p>
        </div>
      )}

      <ol className="topics">
        {level.topics.map((t, i) => {
          const locked = t.status === 'locked'
          const body = (
            <>
              <div className="topics__no">
                <span>{String(t.index + 1).padStart(2, '0')}</span>
                <i />
              </div>
              <div className="topics__main">
                <h3>{t.title}</h3>
                <p>{t.blurb}</p>
                <div className="topics__tags">
                  {t.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="topics__res">
                {(['session', 'sheet', 'upsolve'] as const).map((kind) => (
                  <span key={kind} className={`res res--${kind}${t.links[kind] ? ' is-set' : ''}`}>
                    {kind === 'upsolve' ? 'Upsolve' : kind}
                  </span>
                ))}
                {deckCounts[`${level.id}/${t.id}`] != null && (
                  <span className="res res--slides is-set">Slides</span>
                )}
              </div>
              <div className="topics__go">{locked ? 'Soon' : 'Open →'}</div>
            </>
          )
          return (
            <li
              key={t.id}
              className={`topic${locked ? ' is-locked' : ''}`}
              style={{ animationDelay: `${0.06 * i}s` }}
            >
              {locked ? body : <Link to={`/${level.id}/${t.id}`}>{body}</Link>}
            </li>
          )
        })}
      </ol>
    </main>
  )
}
