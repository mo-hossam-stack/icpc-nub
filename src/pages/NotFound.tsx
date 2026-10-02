import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="wrap nf">
      <p className="mono-tag">Error 404</p>
      <h1 className="display">Wrong turn</h1>
      <p>That node is not on the roadmap.</p>
      <Link to="/" className="btn">
        <span>Back to the map</span>
      </Link>
    </main>
  )
}
