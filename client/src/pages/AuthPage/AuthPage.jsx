import { useState } from 'react'
import { ArrowLeft, ArrowRight, LockKeyhole } from 'lucide-react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import './AuthPage.css'

function AuthPage({ mode }) {
  const isLogin = mode === 'login'
  const { user, isLoading, login, register } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isLoading) {
    return <div className="route-loading page-wrap" role="status">Checking your session...</div>
  }

  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/menu'} replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const details = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    try {
      const signedInUser = isLogin
        ? await login(details)
        : await register({ ...details, name: formData.get('name'), phone: formData.get('phone') })
      const destination = location.state?.from?.pathname
      navigate(destination || (signedInUser.role === 'admin' ? '/admin' : '/menu'), { replace: true })
    } catch (requestError) {
      setErrorMessage(requestError.response?.data?.message || 'We could not complete that request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-placeholder page-wrap">
      <div className="auth-art">
        <img src="https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=85" alt="A freshly prepared meal on a table" />
        <span className="auth-art-note">A GOOD BREAK<br />STARTS HERE</span>
      </div>
      <div className="auth-message">
        <span className="auth-icon"><LockKeyhole size={19} /></span>
        <span className="eyebrow eyebrow-muted">YOUR CAMPUSBITE ACCOUNT</span>
        <h1>{isLogin ? 'Good to see you.' : 'Pull up a chair.'}</h1>
        <p>{isLogin ? 'Sign in and get back to your campus favourites.' : 'Create your student account to get started.'}</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <label className="auth-field">
              <span>Name</span>
              <input name="name" type="text" autoComplete="name" maxLength={80} required />
            </label>
          )}
          <label className="auth-field">
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" maxLength={254} required />
          </label>
          {!isLogin && (
            <label className="auth-field">
              <span>Phone <span className="auth-optional">Optional</span></span>
              <input name="phone" type="tel" autoComplete="tel" maxLength={24} />
            </label>
          )}
          <label className="auth-field">
            <span>Password</span>
            <input name="password" type="password" autoComplete={isLogin ? 'current-password' : 'new-password'} minLength={8} maxLength={72} required />
          </label>
          {errorMessage && <p className="auth-error" role="alert">{errorMessage}</p>}
          <button className="button button-dark auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Please wait...' : isLogin ? 'Log in' : 'Create account'}
            {!isSubmitting && <ArrowRight size={17} />}
          </button>
        </form>
        <p className="auth-switch">
          {isLogin ? 'New to CampusBite?' : 'Already have an account?'}{' '}
          <Link to={isLogin ? '/register' : '/login'}>{isLogin ? 'Create an account' : 'Log in'}</Link>
        </p>
        <Link className="auth-back" to="/"><ArrowLeft size={15} /> Back to CampusBite</Link>
      </div>
    </section>
  )
}

export default AuthPage
