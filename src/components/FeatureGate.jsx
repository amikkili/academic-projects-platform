import { Link } from 'react-router-dom'
import { Lock, LogIn, Zap, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useAccess } from '../context/AccessContext'

const WHAT_YOU_GET = ['Setup Guide & IDE Steps', 'Full Source Code', 'Deploy Guide', 'PPT Download (14 slides)']

export default function FeatureGate({ projectId, children, feature = 'this content' }) {
  const { isLoggedIn } = useAuth()
  const { hasAccess }  = useAccess()

  if (isLoggedIn && hasAccess(projectId)) return children

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-6 py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
          <Lock size={26} className="text-slate-400" />
        </div>
        <h2 className="text-xl font-extrabold text-brand-navy mb-2">Sign in to access {feature}</h2>
        <p className="text-slate-500 text-sm max-w-sm mb-7 leading-relaxed">
          Create a free account to get started. After signing in, unlock this project to access everything.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <Link
            to="/login"
            className="flex items-center gap-2 px-6 py-3 bg-brand-navy text-white font-bold rounded-xl hover:bg-slate-700 transition text-sm"
          >
            <LogIn size={15} /> Sign In / Register
          </Link>
          <Link
            to="/pricing"
            className="flex items-center gap-2 px-6 py-3 border border-brand-orange text-brand-orange font-bold rounded-xl hover:bg-brand-orange hover:text-white transition text-sm"
          >
            <Zap size={15} /> View Plans
          </Link>
        </div>
      </div>
    )
  }

  // Logged in but no access to this project
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
      <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center mb-5">
        <Lock size={26} className="text-brand-orange" />
      </div>
      <h2 className="text-xl font-extrabold text-brand-navy mb-2">Unlock this project</h2>
      <p className="text-slate-500 text-sm max-w-sm mb-5 leading-relaxed">
        Purchase this project once to get lifetime access to all premium content.
      </p>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-7">
        {WHAT_YOU_GET.map(f => (
          <span key={f} className="flex items-center gap-1.5 text-emerald-700 text-sm font-medium">
            <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" /> {f}
          </span>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        <Link
          to="/pricing"
          state={{ highlight: 'single' }}
          className="flex items-center gap-2 px-7 py-3 bg-brand-orange text-white font-bold rounded-xl hover:bg-amber-500 transition text-sm shadow-lg shadow-orange-200"
        >
          <Zap size={15} /> Unlock for ₹499
        </Link>
        <Link
          to="/pricing"
          state={{ highlight: 'all' }}
          className="flex items-center gap-2 px-7 py-3 border-2 border-brand-navy text-brand-navy font-bold rounded-xl hover:bg-brand-navy hover:text-white transition text-sm"
        >
          All Projects — ₹1,999
        </Link>
      </div>
    </div>
  )
}
