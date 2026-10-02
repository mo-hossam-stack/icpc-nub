import { lazy, Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import { levels, topicById } from '../data/roadmap'
import NotFound from './NotFound'

const DeckPlayer = lazy(() => import('../components/DeckPlayer'))

export default function Topic() {
  const { levelId = '', topicId = '' } = useParams()
  const level = levels.find((l) => l.id === levelId)
  const topic = topicById(levelId, topicId)

  if (!level || !topic) return <NotFound />

  return (
    <main className="wrap topicpage" style={{ '--accent': level.accent } as React.CSSProperties}>
      <nav className="crumbs">
        <Link to="/">Home</Link>
        <i>/</i>
        <b>{topic.title}</b>
      </nav>

      <Suspense fallback={<p className="mono-tag">Loading deck…</p>}>
        <DeckPlayer key={`${level.id}/${topic.id}`} levelId={level.id} topicId={topic.id} />
      </Suspense>
    </main>
  )
}
