import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import './NotFoundPage.css'

function NotFoundPage() {
  return (
    <section className="not-found page-wrap">
      <span className="not-found-number">404</span>
      <h1>This page missed lunch.</h1>
      <p>That address doesn’t lead anywhere on campus.</p>
      <Link className="button button-dark" to="/"><ArrowLeft size={16} /> Back to home</Link>
    </section>
  )
}

export default NotFoundPage
