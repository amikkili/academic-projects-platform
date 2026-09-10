import { createContext, useContext, useState, useCallback } from 'react'

const API = 'http://localhost:8000/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('ac_token') || null)
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ac_user') || 'null') } catch { return null }
  })

  const login = useCallback(async (email, password) => {
    const form = new URLSearchParams({ username: email, password })
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form,
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.detail || 'Login failed')
    }
    const data = await res.json()
    _persist(data)
    return data
  }, [])

  const register = useCallback(async (name, email, password) => {
    const res = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.detail || 'Registration failed')
    }
    const data = await res.json()
    _persist(data)
    return data
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('ac_token')
    localStorage.removeItem('ac_user')
    setToken(null)
    setUser(null)
  }, [])

  function _persist(data) {
    const u = { id: data.user_id, name: data.name, email: data.email }
    localStorage.setItem('ac_token', data.access_token)
    localStorage.setItem('ac_user', JSON.stringify(u))
    setToken(data.access_token)
    setUser(u)
  }

  const authFetch = useCallback(async (url, options = {}) => {
    return fetch(`${API}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    })
  }, [token])

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, authFetch, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
