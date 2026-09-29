import { UtensilsCrossed } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Brand.css'

function Brand({ onClick }) {
  return (
    <Link className="brand" to="/" aria-label="CampusBite home" onClick={onClick}>
      <span className="brand-mark"><UtensilsCrossed size={19} strokeWidth={2.4} /></span>
      <span>campus<span className="brand-accent">bite</span></span>
    </Link>
  )
}

export default Brand
