import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Code2, Menu, X, LogIn, LogOut, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname }            = useLocation()
  const { user, isLoggedIn, logout } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const navLinks = [
    { to: '/',                label: 'Home' },
    { to: '/projects',        label: 'Projects' },
    { to: '/project-fit',     label: 'Project Fit' },
    { to: '/internal-marks',  label: 'Marks' },
    { to: '/hr-prep',         label: 'HR Prep' },
    { to: '/resume-builder',  label: 'Resume' },
    { to: '/coding-practice', label: 'Coding' },
    { to: '/about',           label: 'About' },
    { to: '/pricing',         label: 'Pricing' },
    { to: '/contact',         label: 'Contact Us' },
  ]

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : ''

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-[#0B1D3A] shadow-2xl shadow-black/40 border-b border-white/10'
        : 'bg-[#0B1D3A]/95 backdrop-blur-lg border-b border-white/5'
    }`}>
      <div className="w-full px-5 lg:px-10">
        <div className="flex items-center h-[60px] relative">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-orange via-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-900/40 group-hover:shadow-orange-500/40 group-hover:scale-105 transition-all duration-200">
              <Code2 size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-[17px] tracking-tight leading-none">
              <span className="text-white">Academi</span>
              <span className="text-brand-orange">Code</span>
            </span>
          </Link>

          {/* ── Nav links — centered absolutely ── */}
          <div className="hidden xl:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
            {navLinks.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `relative flex-shrink-0 px-3 py-1.5 rounded-lg text-[15px] font-semibold transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'text-white bg-white/10'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-orange rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* ── Right section — pushed to far right ── */}
          <div className="hidden xl:flex items-center gap-2 flex-shrink-0 ml-auto">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                {/* Avatar + name */}
                <div className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-teal to-cyan-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                    {initials}
                  </div>
                  <span className="text-white/80 text-xs font-medium max-w-[96px] truncate">
                    {user?.name}
                  </span>
                </div>
                {/* Logout */}
                <button
                  onClick={logout}
                  title="Sign out"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-xl text-xs font-medium transition-all border border-transparent hover:border-white/10"
                >
                  <LogOut size={13} />
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-5 py-2 text-white hover:bg-white/10 border border-white/30 hover:border-white/60 rounded-xl text-[15px] font-semibold transition-all"
              >
                <LogIn size={15} />
                Sign In
              </Link>
            )}
          </div>

          {/* ── Mobile/tablet: auth pill + hamburger ── */}
          <div className="xl:hidden flex items-center gap-2 ml-auto">
            {isLoggedIn ? (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-teal to-cyan-600 flex items-center justify-center text-white text-[10px] font-bold">
                {initials}
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-1 px-3 py-1.5 border border-white/20 rounded-lg text-white/70 text-xs font-medium hover:bg-white/10 transition">
                <LogIn size={12} /> Sign In
              </Link>
            )}
            <button
              className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {open && (
        <div className="xl:hidden bg-[#0B1D3A] border-t border-white/8 px-4 py-3 space-y-0.5 shadow-2xl">
          {navLinks.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'text-white bg-white/10 border-l-2 border-brand-orange pl-[10px]'
                    : 'text-white/60 hover:text-white hover:bg-white/7'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}

          <div className="pt-3 border-t border-white/8 mt-2 space-y-1">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-teal to-cyan-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {initials}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-none">{user?.name}</p>
                    <p className="text-white/40 text-xs mt-0.5">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-white/60 hover:text-white hover:bg-white/10 rounded-xl text-sm transition"
                >
                  <LogOut size={15} /> Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 w-full py-3 border border-white/30 text-white hover:bg-white/10 font-semibold rounded-xl transition text-base"
              >
                <LogIn size={15} /> Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
