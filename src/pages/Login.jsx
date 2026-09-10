import { useState } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { BookOpen, Mail, Lock, User, AlertCircle } from 'lucide-react'

export default function Login() {
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [mode, setMode] = useState(searchParams.get('mode') === 'register' ? 'register' : 'login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(form.email, form.password)
      } else {
        if (!form.name.trim()) { setError('Name is required'); setLoading(false); return }
        await register(form.name, form.email, form.password)
      }
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-dark via-brand-navy to-slate-900 p-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 shadow-2xl">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="p-2 bg-brand-teal/20 rounded-xl">
            <BookOpen className="w-7 h-7 text-brand-teal" />
          </div>
          <span className="text-xl font-bold text-white">AcademiCode</span>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-white/5 rounded-xl p-1 mb-6">
          {['login', 'register'].map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError('') }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === m ? 'bg-brand-teal text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {m === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <Field icon={<User className="w-4 h-4" />} placeholder="Full name" value={form.name} onChange={set('name')} />
          )}
          <Field icon={<Mail className="w-4 h-4" />} type="email" placeholder="Email address" value={form.email} onChange={set('email')} />
          <Field icon={<Lock className="w-4 h-4" />} type="password" placeholder="Password" value={form.password} onChange={set('password')} />

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 text-red-300 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-teal hover:bg-cyan-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all"
          >
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-6">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}
            className="text-brand-teal hover:underline font-medium">
            {mode === 'login' ? 'Create one' : 'Sign in'}
          </button>
        </p>

        <p className="text-center mt-4">
          <Link to="/" className="text-slate-500 text-xs hover:text-slate-300">← Back to home</Link>
        </p>
      </div>
    </div>
  )
}

function Field({ icon, ...props }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
      <input
        {...props}
        required
        className="w-full pl-9 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-teal/60 text-sm transition-all"
      />
    </div>
  )
}
