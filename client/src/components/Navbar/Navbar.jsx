import { useState } from 'react'
import { ArrowUpRight, LogOut, Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import Brand from '../Brand/Brand.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, isLoading, logout } = useAuth()

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <nav className="navbar page-wrap" aria-label="Main navigation">
        <Brand onClick={closeMenu} />
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className={`nav-content${menuOpen ? ' nav-content-open' : ''}`}>
          <div className="nav-links">
            <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
            <NavLink to="/menu" onClick={closeMenu}>Explore menu</NavLink>
            <a href="/#how-it-works" onClick={closeMenu}>How it works</a>
          </div>
          <div className="nav-actions">
            {!isLoading && user && (
              <>
                {user.role === 'admin' && <Link className="nav-login" to="/admin" onClick={closeMenu}>Admin</Link>}
                <span className="nav-user" title={user.name}>{user.name}</span>
                <button className="nav-login nav-logout" type="button" onClick={() => { closeMenu(); logout() }}>
                  Log out <LogOut size={15} />
                </button>
              </>
            )}
            {!isLoading && !user && (
              <>
                <Link className="nav-login" to="/login" onClick={closeMenu}>Log in</Link>
                <Link className="button button-dark button-small" to="/register" onClick={closeMenu}>
                  Get started <ArrowUpRight size={16} />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
