import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { API_BASE as API } from '../lib/api'

const AuthContext = createContext(null)

function formatUser(u) {
  if (!u) return null
  const meta = u.user_metadata || {}
  return {
    id:    u.id,
    email: u.email,
    name:  meta.name || meta.full_name || u.email?.split('@')[0] || 'User',
  }
}

export function AuthProvider({ children }) {
  const [session,  setSession]  = useState(null)
  const [user,     setUser]     = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(formatUser(session?.user ?? null))
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(formatUser(session?.user ?? null))
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(error.message)
    return data
  }, [])

  const register = useCallback(async (name, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })
    if (error) throw new Error(error.message)
    if (!data.session) {
      throw new Error('Check your email to confirm your account, then sign in.')
    }
    return data
  }, [])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  const token = session?.access_token ?? null

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
    <AuthContext.Provider value={{ user, token, session, login, register, logout, authFetch, isLoggedIn: !!session }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
