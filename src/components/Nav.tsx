import { Link } from 'react-router-dom'
import './nav.css'

export default function Nav() {
  return (
    <header className="nav">
      <Link to="/" className="nav__brand">
        <img src="/logo.jpg" alt="" className="nav__logo" />
        <span className="nav__name">
          ICPC <b>NUB</b>
        </span>
      </Link>
    </header>
  )
}
