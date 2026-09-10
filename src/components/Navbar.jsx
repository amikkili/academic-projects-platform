import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BookOpen, Menu, X, Code2, Layers } from 'lucide-react'

export default function Navbar() {
  const [open,      setOpen]      = useState(false)
  const [scrolled,  setScrolled]  = useState(false)
  const { pathname }              = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const navLinks = [
    { to: '/',               label: 'Home' },
    { to: '/projects',       label: 'Projects' },
    { to: '/project-fit',    label: 'Project Fit' },
    { to: '/internal-marks', label: 'Mark Estimator' },
    { to: '/about',          label: 'About' },
  ]

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0B1D3A]/95 backdrop-blur-md shadow-xl shadow-black/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-orange to-amber-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Code2 size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-white font-extrabold text-lg leading-none tracking-tight">Academi</span>
              <span className="text-brand-orange font-extrabold text-lg leading-none tracking-tight">Code</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-brand-orange bg-white/10'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/projects"
              className="ml-3 px-4 py-2 bg-brand-orange text-white text-sm font-semibold rounded-xl hover:bg-amber-500 active:scale-95 transition-all shadow-lg shadow-amber-900/30"
            >
              Browse Projects
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0B1D3A]/98 backdrop-blur-md border-t border-white/10 px-4 py-4 space-y-1">
          {navLinks.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive ? 'text-brand-orange bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/projects"
            className="block text-center mt-2 px-4 py-3 bg-brand-orange text-white text-sm font-semibold rounded-xl hover:bg-amber-500"
          >
            Browse Projects
          </Link>
        </div>
      )}
    </nav>
  )
}
