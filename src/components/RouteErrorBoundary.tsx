import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  retried: boolean
}

export default class RouteErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, retried: false }

  static getDerivedStateFromError(): State {
    return { hasError: true, retried: false }
  }

  componentDidCatch(_error: Error, errorInfo: any) {
    if (import.meta.env.DEV) {
      console.error('RouteErrorBoundary caught:', _error, errorInfo)
    }
    if (!this.state.retried && typeof window !== 'undefined') {
      this.setState({ retried: true })
      window.location.reload()
    }
  }

  render() {
    if (this.state.hasError && !this.state.retried) {
      return null
    }
    return this.props.children
  }
}
