import { Component, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class RouteErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    if (import.meta.env.DEV) {
      console.error('RouteErrorBoundary caught:', error, errorInfo)
    }
  }

  handleRetry = () => {
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <main className="wrap" style={{ padding: '60px 16px', textAlign: 'center' }}>
            <p className="mono-tag">Something went wrong</p>
            <p className="deck__hint" style={{ margin: '12px auto 20px' }}>
              The page failed to load. Try refreshing or go back home.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                className="mono-tag"
                onClick={this.handleRetry}
                style={{
                  padding: '8px 14px',
                  border: '1px solid var(--line)',
                  background: 'var(--bg-2)',
                  cursor: 'pointer',
                }}
              >
                Retry
              </button>
              <Link
                className="mono-tag"
                to="/"
                style={{
                  padding: '8px 14px',
                  border: '1px solid var(--line)',
                  background: 'var(--bg-2)',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                Go home
              </Link>
            </div>
          </main>
        )
      )
    }
    return this.props.children
  }
}
