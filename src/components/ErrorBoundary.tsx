import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log for debugging in dev; keep minimal in production context
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught:', error, errorInfo)
    }
  }

  handleRetry = () => {
    // Reload the current route to retry loading dynamic chunks
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="deck deck--empty" style={{ textAlign: 'center', padding: '48px 16px' }}>
            <p className="mono-tag">Slides failed to load</p>
            <p className="deck__hint" style={{ margin: '0 auto 20px' }}>
              Check your connection and try again.
            </p>
            <button
              className="mono-tag"
              onClick={this.handleRetry}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                border: '1px solid var(--line)',
                background: 'var(--bg-2)',
                cursor: 'pointer',
              }}
            >
              Retry
            </button>
          </div>
        )
      )
    }
    return this.props.children
  }
}
