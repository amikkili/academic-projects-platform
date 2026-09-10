import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { API_BASE } from '../lib/api'
import { useAuth } from './AuthContext'

const AccessContext = createContext({ has_all: false, project_ids: [], refresh: () => {} })

export function AccessProvider({ children }) {
  const { token, isLoggedIn } = useAuth()
  const [access, setAccess] = useState({ has_all: false, project_ids: [] })

  const refresh = useCallback(async () => {
    if (!isLoggedIn || !token) { setAccess({ has_all: false, project_ids: [] }); return }
    try {
      const res = await fetch(`${API_BASE}/payments/my-access`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) setAccess(await res.json())
    } catch { /* network error — keep stale access */ }
  }, [token, isLoggedIn])

  useEffect(() => { refresh() }, [refresh])

  const hasAccess = useCallback((projectId) => {
    return access.has_all || access.project_ids.includes(projectId)
  }, [access])

  return (
    <AccessContext.Provider value={{ ...access, hasAccess, refresh }}>
      {children}
    </AccessContext.Provider>
  )
}

export function useAccess() {
  return useContext(AccessContext)
}
