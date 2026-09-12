import { Link, useNavigate } from 'react-router-dom'
import { Home, ArrowLeft, Search, Code2 } from 'lucide-react'

const quickLinks = [
  { to: '/projects',        label: 'Browse Projects' },
  { to: '/project-fit',     label: 'Project Fit Quiz' },
  { to: '/coding-practice', label: 'Coding Practice' },
  { to: '/hr-prep',         label: 'HR Prep' },
  { to: '/resume-builder',  label: 'Resume Builder' },
  { to: '/about',           label: 'About Us' },
]

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-24 text-center">

        {/* 404 graphic */}
        <div className="relative mb-10 select-none">
          <p className="text-[140px] sm:text-[180px] font-extrabold leading-none text-slate-100 tracking-tight">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-orange via-amber-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-300/40">
              <Code2 size={36} className="text-white" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-500 text-base max-w-md mx-auto mb-8 leading-relaxed">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to something useful.
        </p>

        {/* Primary actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy text-white font-semibold text-sm hover:bg-[#1a3a6b] transition-all shadow-lg shadow-navy-900/20"
          >
            <Home size={15} />
            Go to Home
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-white hover:border-brand-orange hover:text-brand-orange transition-all"
          >
            <ArrowLeft size={15} />
            Go Back
          </button>
        </div>

        {/* Quick links */}
        <div className="w-full max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
            Or explore a section
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {quickLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white border border-slate-100 shadow-sm text-sm font-medium text-slate-600 hover:text-brand-orange hover:border-brand-orange hover:shadow-md transition-all"
              >
                <Search size={12} className="text-slate-300 group-hover:text-brand-orange" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Footer strip */}
      <div className="border-t border-slate-100 py-4 text-center">
        <p className="text-slate-400 text-xs">
          Still lost?{' '}
          <Link to="/contact" className="text-brand-orange font-semibold hover:underline">
            Contact us
          </Link>{' '}
          and we'll help you find what you need.
        </p>
      </div>

    </div>
  )
}
