import { Suspense, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DeckPlayer from '../components/DeckPlayer'
import ErrorBoundary from '../components/ErrorBoundary'
import LazyFallback from '../components/LazyFallback'
import { levels, topicById } from '../data/roadmap'
import NotFound from './NotFound'

export default function Topic() {
  const { levelId = '', topicId = '' } = useParams()
  const level = levels.find((l) => l.id === levelId)
  const topic = topicById(levelId, topicId)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  if (!level || !topic) return <NotFound />

  return (
    <main className="wrap topicpage" style={{ '--accent': level.accent } as React.CSSProperties}>
      <nav className="crumbs">
        <Link to="/">Home</Link>
        <i>/</i>
        <b>{topic.title}</b>
      </nav>

      {!isReady ? (
        <LazyFallback />
      ) : (
        <ErrorBoundary>
          <Suspense fallback={<LazyFallback />}>
            <DeckPlayer key={`${level.id}/${topic.id}`} levelId={level.id} topicId={topic.id} />
          </Suspense>
        </ErrorBoundary>
      )}
    </main>
  )
}
