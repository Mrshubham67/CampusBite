import { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser, loginUser, registerUser } from '../services/authApi.js'

const TOKEN_KEY = 'campusbite_token'
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    function handleSessionExpired() {
      if (isMounted) setUser(null)
    }

    window.addEventListener('campusbite:session-expired', handleSessionExpired)

    if (!window.sessionStorage.getItem(TOKEN_KEY)) {
      setIsLoading(false)
      return () => {
        isMounted = false
        window.removeEventListener('campusbite:session-expired', handleSessionExpired)
      }
    }

    getCurrentUser()
      .then((currentUser) => {
        if (isMounted) setUser(currentUser)
      })
      .catch(() => {
        window.sessionStorage.removeItem(TOKEN_KEY)
        if (isMounted) setUser(null)
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
      window.removeEventListener('campusbite:session-expired', handleSessionExpired)
    }
  }, [])

  async function login(credentials) {
    const result = await loginUser(credentials)
    window.sessionStorage.setItem(TOKEN_KEY, result.token)
    setUser(result.user)
    return result.user
  }

  async function register(details) {
    const result = await registerUser(details)
    window.sessionStorage.setItem(TOKEN_KEY, result.token)
    setUser(result.user)
    return result.user
  }

  function logout() {
    window.sessionStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider.')
  return context
}
