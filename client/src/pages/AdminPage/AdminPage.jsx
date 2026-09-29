import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import './AdminPage.css'

function AdminPage() {
  const { user } = useAuth()

  return (
    <section className="admin-page page-wrap">
      <span className="admin-icon"><ShieldCheck size={22} /></span>
      <span className="eyebrow eyebrow-muted">CAMPUSBITE ADMIN</span>
      <h1>Welcome, {user.name}.</h1>
      <p>Your administrator account is active. Category and food changes are restricted to admin accounts.</p>
      <Link className="button button-dark" to="/menu">View the student menu <ArrowUpRight size={17} /></Link>
    </section>
  )
}

export default AdminPage
