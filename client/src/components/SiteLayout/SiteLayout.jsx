import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer.jsx'
import Navbar from '../Navbar/Navbar.jsx'
import './SiteLayout.css'

function SiteLayout() {
  return (
    <div className="site-layout">
      <Navbar />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default SiteLayout
