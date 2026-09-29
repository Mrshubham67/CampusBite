import { ArrowRight, UtensilsCrossed } from 'lucide-react'
import { Link } from 'react-router-dom'
import './MenuPage.css'

function MenuPage() {
  return (
    <section className="placeholder-page page-wrap">
      <div className="placeholder-copy">
        <span className="eyebrow"><span className="eyebrow-dot" /> COMING TO YOUR CAMPUS</span>
        <h1>The menu is<br />getting <span className="headline-highlight">ready.</span></h1>
        <p>We’re setting the table. The campus menu and food details will show up here in a later build phase.</p>
        <Link className="button button-primary" to="/">Back to home <ArrowRight size={17} /></Link>
      </div>
      <div className="placeholder-art"><img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1100&q=85" alt="Fresh ingredients being prepared for a meal" /><span className="placeholder-stamp"><UtensilsCrossed size={20} /><span>FRESH<br />THINGS<br />AHEAD</span></span></div>
    </section>
  )
}

export default MenuPage
