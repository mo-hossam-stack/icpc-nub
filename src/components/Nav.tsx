import { Link, NavLink } from 'react-router-dom'
import { levels } from '../data/roadmap'
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

      <nav className="nav__links">
        {levels.map((l) => (
          <NavLink
            key={l.id}
            to={`/${l.id}`}
            className={({ isActive }) => `nav__link${isActive ? ' is-on' : ''}`}
            style={{ '--accent': l.accent } as React.CSSProperties}
          >
            {l.name}
            {!l.released && <i className="nav__lock">soon</i>}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
