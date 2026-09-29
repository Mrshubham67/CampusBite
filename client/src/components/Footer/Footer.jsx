import { ArrowUpRight, Instagram } from 'lucide-react'
import { Link } from 'react-router-dom'
import Brand from '../Brand/Brand.jsx'
import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-wrap footer-main">
        <div className="footer-brand-block">
          <Brand />
          <p>Good food, good people, right around the corner.</p>
        </div>
        <div className="footer-links">
          <div>
            <span className="footer-label">Explore</span>
            <Link to="/menu">The menu</Link>
            <a href="/#how-it-works">How it works</a>
          </div>
          <div>
            <span className="footer-label">Your account</span>
            <Link to="/login">Log in</Link>
            <Link to="/register">Create an account</Link>
          </div>
        </div>
        <a className="social-link" href="https://www.instagram.com/" aria-label="Instagram">
          <Instagram size={19} />
        </a>
      </div>
      <div className="page-wrap footer-bottom">
        <span>© {new Date().getFullYear()} CampusBite</span>
        <span>Made for campus life <ArrowUpRight size={14} /></span>
      </div>
    </footer>
  )
}

export default Footer
