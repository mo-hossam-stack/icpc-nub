import { Link } from 'react-router-dom'
import './nav.css'

// icons are Lucide (ISC), inlined: two static glyphs are not worth a dependency
const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

export default function Nav() {
  return (
    <header className="nav">
      <Link to="/" className="nav__brand">
        <img src="/logo.jpg" alt="" className="nav__logo" />
        <span className="nav__name">
          ICPC <b>NUB</b>
        </span>
      </Link>

      <nav className="nav__social" aria-label="Community pages">
        <a href="https://www.facebook.com/icpcnahda" target="_blank" rel="noreferrer" aria-label="ICPC NUB on Facebook">
          <svg viewBox="0 0 24 24" {...S} aria-hidden="true">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
        <a href="https://www.linkedin.com/company/icpc-nub/" target="_blank" rel="noreferrer" aria-label="ICPC NUB on LinkedIn">
          <svg viewBox="0 0 24 24" {...S} aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
      </nav>
    </header>
  )
}