import { useState } from 'react'
import type { Level, Topic } from '../data/roadmap'
import Roadmap from '../components/Roadmap'
import TopicDrawer from '../components/TopicDrawer'

export default function Home() {
  const [pick, setPick] = useState<{ level: Level; topic: Topic } | null>(null)

  return (
    <main>
      <section id="roadmap" className="section roadmap">
        <div className="wrap roadmap__head">
          <h2 className="display">The Roadmap</h2>
        </div>
        <div className="wrap">
          <Roadmap onOpen={(level, topic) => setPick({ level, topic })} />
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
