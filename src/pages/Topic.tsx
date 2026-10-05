import { Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorBoundary from '../components/ErrorBoundary'
import LazyFallback from '../components/LazyFallback'
import { levels, topicById } from '../data/roadmap'
import { lazyWithRetry } from '../lib/lazyWithRetry'
import NotFound from './NotFound'
import '../components/deck.css'

// react-markdown is ~60% of the bundle and only a deep link needs it. Keeping it
// out of the entry chunk is what makes a cold /level0/topic paint immediately.
const DeckPlayer = lazyWithRetry(() => import('../components/DeckPlayer'))

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

      <ErrorBoundary>
        <Suspense fallback={<LazyFallback />}>
          <DeckPlayer key={`${level.id}/${topic.id}`} levelId={level.id} topicId={topic.id} />
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}
