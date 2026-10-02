import { useState } from 'react'
import { Link } from 'react-router-dom'
import { openTopics, totalTopics } from '../data/roadmap'
import type { Level, Topic } from '../data/roadmap'
import Roadmap from '../components/Roadmap'
import TopicDrawer from '../components/TopicDrawer'

export default function Home() {
  const [pick, setPick] = useState<{ level: Level; topic: Topic } | null>(null)

  return (
    <main>
      <section className="hero">
        <div className="hero__grid" />
        <div className="wrap hero__inner">
          <div className="hero__copy">
            <p className="mono-tag reveal" style={{ animationDelay: '0.05s' }}>
              ICPC NUB Community
            </p>
            <h1 className="display reveal" style={{ animationDelay: '0.12s' }}>
              Learn.
              <br />
              Solve.
              <br />
              <em>Compete.</em>
            </h1>
            <p className="hero__lede reveal" style={{ animationDelay: '0.24s' }}>
              One path from your first <code>for</code> loop to your first ICPC medal. Every
              session, every problem sheet, every upsolve — connected in a single roadmap.
            </p>
            <div className="hero__cta reveal" style={{ animationDelay: '0.34s' }}>
              <Link to="/level0" className="btn">
                <span>Start Level 0</span>
              </Link>
              <a href="#roadmap" className="btn btn--ghost">
                <span>See the map</span>
              </a>
            </div>
            <dl className="stats reveal" style={{ animationDelay: '0.44s' }}>
              <div>
                <dt>Topics</dt>
                <dd>{totalTopics}</dd>
              </div>
              <div>
                <dt>Live now</dt>
                <dd className="is-green">{openTopics}</dd>
              </div>
              <div>
                <dt>Per topic</dt>
                <dd>3</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="hero__scroll">
          <span>Scroll</span>
          <i />
        </div>
      </section>

      <section id="roadmap" className="section roadmap">
        <div className="wrap roadmap__head">
          <p className="mono-tag">Interactive map</p>
          <h2 className="display">The Roadmap</h2>
          <p className="roadmap__lede">
            Level 0 is live — click any node to open its panel. Level 1 is chained and waiting.
          </p>
        </div>
        <div className="wrap map__scroll">
          <Roadmap onOpen={(level, topic) => setPick({ level, topic })} />
        </div>
        <div className="roadmap__legend wrap">
          <span><i style={{ background: '#349cd4' }} />Open</span>
          <span><i style={{ background: '#f44c4c' }} />Locked</span>
          <span><i style={{ background: '#fc940c' }} />Coming soon</span>
        </div>
      </section>

      {/* a top-layer modal must not sit inside a .section, or the section's
          h2.display sizing leaks into the drawer's own heading */}
      <TopicDrawer
        level={pick?.level ?? null}
        topic={pick?.topic ?? null}
        onClose={() => setPick(null)}
      />
    </main>
  )
}
