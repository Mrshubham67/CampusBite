import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute.jsx'
import SiteLayout from '../components/SiteLayout/SiteLayout.jsx'
import AdminPage from '../pages/AdminPage/AdminPage.jsx'
import AuthPage from '../pages/AuthPage/AuthPage.jsx'
import HomePage from '../pages/HomePage/HomePage.jsx'
import MenuPage from '../pages/MenuPage/MenuPage.jsx'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes