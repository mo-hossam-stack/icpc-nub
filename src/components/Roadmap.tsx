import { levels } from '../data/roadmap'
import type { Level, Topic } from '../data/roadmap'
import './roadmap.css'

/** Ring of n nodes, closed by straight segments between neighbours. */
const ring = (n: number, cx: number, cy: number, r: number) =>
  Array.from({ length: n }, (_, i) => {
    const a = (-90 + (360 / n) * i) * (Math.PI / 180)
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
  })

/** Serpentine: one row left-to-right, then back. Reads as "the path continues". */
const snake = (n: number) => {
  const per = Math.ceil(n / 2)
  const xs = Array.from({ length: per }, (_, i) => 12 + (76 / (per - 1)) * i)
  return [
    ...xs.map((x) => ({ x, y: 24 })),
    ...[...xs].reverse().map((x) => ({ x, y: 76 })),
  ].slice(0, n)
}

const poly = (pts: { x: number; y: number }[]) => pts.map((p) => `${p.x},${p.y}`).join(' ')

export default function Roadmap({ onOpen }: { onOpen: (level: Level, topic: Topic) => void }) {
  const [l0, l1] = levels

  return (
    <div className="map">
      {/* ---- Level 0: the ring ------------------------------------------ */}
      <div className="map__level">
        <div className="map__stage map__stage--ring">
          <svg className="map__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polygon className="map__ring" points={poly(ring(l0.topics.length, 50, 50, 33))} />
          </svg>

          <div className="map__core">
            <b>{l0.name}</b>
            <i>{l0.kicker}</i>
          </div>

          {l0.topics.map((t, i) => {
            const p = ring(l0.topics.length, 50, 50, 33)[i]
            return (
              <button
                key={t.id}
                className="map__node"
                style={{ '--x': `${p.x}%`, '--y': `${p.y}%` } as React.CSSProperties}
                onClick={() => onOpen(l0, t)}
              >
                <span className="map__dot">{String(i + 1).padStart(2, '0')}</span>
                <span className="map__label">{t.title}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ---- the chain down ---------------------------------------------- */}
      <div className="map__link" aria-hidden="true">
        <span />
      </div>

      {/* ---- Level 1: blurred, coming soon ------------------------------- */}
      <div className="map__level">
        <div className="map__stage map__stage--snake">
          <svg className="map__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polyline className="map__chain" points={poly(snake(l1.topics.length))} />
          </svg>

          <div className="map__soon" aria-hidden="true">
            <b>{l1.name}</b>
            <i>Coming soon</i>
          </div>

          <div className="map__locked">
            {l1.topics.map((t, i) => {
              const p = snake(l1.topics.length)[i]
              return (
                <div
                  key={t.id}
                  className="map__node map__node--locked"
                  style={{ '--x': `${p.x}%`, '--y': `${p.y}%` } as React.CSSProperties}
                >
                  <span className="map__dot">{String(i + 1).padStart(2, '0')}</span>
                  <span className="map__label">{t.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}