import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Code2, Menu, X, LogIn, LogOut, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { levels, categories, projects } from '../data/projects'

export default function Navbar() {
  const [open,          setOpen]          = useState(false)
  const [scrolled,      setScrolled]      = useState(false)
  const [projDropOpen,  setProjDropOpen]  = useState(false)
  const [hoveredLevel,  setHoveredLevel]  = useState('school')
  const { pathname }                      = useLocation()
  const navigate                          = useNavigate()
  const { user, isLoggedIn, logout }      = useAuth()
  const projDropRef                       = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false); setProjDropOpen(false) }, [pathname])

  // Close projects dropdown on outside click
  useEffect(() => {
    const handler = e => {
      if (projDropRef.current && !projDropRef.current.contains(e.target))
        setProjDropOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const navLinks = [
    { to: '/',                label: 'Home' },
    { to: '/project-fit',     label: 'Project Fit' },
    { to: '/internal-marks',  label: 'Marks' },
    { to: '/hr-prep',         label: 'HR Prep' },
    { to: '/resume-builder',  label: 'Resume' },
    { to: '/coding-practice', label: 'Coding' },
    { to: '/about',           label: 'About' },
    { to: '/pricing',         label: 'Pricing' },
    { to: '/contact',         label: 'Contact Us' },
  ]

  // Level tabs excluding 'all'
  const levelTabs = levels.filter(l => l.id !== 'all')

  // Topics for a level that have at least one project
  const topicsForLevel = (levelId) =>
    categories.filter(c => projects.some(p => p.level === levelId && p.category === c.id))

  const goToTopic = (levelId, catId) => {
    setProjDropOpen(false)
    setOpen(false)
    navigate(`/projects?level=${levelId}&cat=${catId}`)
  }

  const isProjectsActive = pathname === '/projects' || pathname.startsWith('/projects/')

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

            {/* Home */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `relative flex-shrink-0 px-3 py-1.5 rounded-lg text-[15px] font-semibold transition-all duration-150 whitespace-nowrap ${
                  isActive ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {({ isActive }) => (
                <>Home{isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-orange rounded-full" />}</>
              )}
            </NavLink>

            {/* Projects dropdown */}
            <div className="relative" ref={projDropRef}>
              <button
                onClick={() => setProjDropOpen(o => !o)}
                className={`relative flex items-center gap-1 flex-shrink-0 px-3 py-1.5 rounded-lg text-[15px] font-semibold transition-all duration-150 whitespace-nowrap ${
                  isProjectsActive || projDropOpen
                    ? 'text-white bg-white/10'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Projects
                <ChevronDown size={13} className={`transition-transform duration-200 ${projDropOpen ? 'rotate-180' : ''}`} />
                {isProjectsActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-orange rounded-full" />}
              </button>

              {/* Cascading two-tier dropdown */}
              {projDropOpen && (
                <div className="absolute top-full left-0 mt-2 flex shadow-2xl z-50 rounded-xl overflow-visible"
                     style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}>

                  {/* Tier 1 — Level list */}
                  <div className="bg-[#0d2240] border border-white/10 rounded-l-xl w-48 py-1.5 flex-shrink-0">
                    <p className="px-4 pt-1.5 pb-2 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                      Select Level
                    </p>
                    {levelTabs.map(lv => {
                      const isHov = hoveredLevel === lv.id
                      return (
                        <button
                          key={lv.id}
                          onMouseEnter={() => setHoveredLevel(lv.id)}
                          className={`w-full flex items-center gap-2 px-4 py-2.5 text-left transition-all ${
                            isHov
                              ? 'bg-brand-orange/15 text-white border-l-2 border-brand-orange'
                              : 'text-white/65 hover:text-white border-l-2 border-transparent'
                          }`}
                        >
                          <span className="flex-1 text-sm font-semibold">{lv.label}</span>
                          <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${
                            isHov ? 'bg-brand-orange text-white' : 'bg-white/10 text-white/40'
                          }`}>
                            {projects.filter(p => p.level === lv.id).length}
                          </span>
                          <span className={`text-xs ${isHov ? 'text-brand-orange' : 'text-white/20'}`}>▶</span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Tier 2 — Topics for hovered level */}
                  <div className="bg-[#112d52] border border-l-0 border-white/10 rounded-r-xl w-52 py-1.5 flex-shrink-0">
                    {(() => {
                      const lv     = levelTabs.find(l => l.id === hoveredLevel)
                      const topics = topicsForLevel(hoveredLevel)
                      return (
                        <>
                          <p className="px-4 pt-1.5 pb-2 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                            {lv?.label} Topics
                          </p>
                          {topics.map(cat => {
                            const count = projects.filter(p => p.level === hoveredLevel && p.category === cat.id).length
                            return (
                              <button
                                key={cat.id}
                                onClick={() => goToTopic(hoveredLevel, cat.id)}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-white/65 hover:bg-white/8 hover:text-white transition-all group"
                              >
                                <span className="flex-1 text-sm font-medium group-hover:text-white">{cat.label}</span>
                                <span className="text-[11px] text-white/25 group-hover:text-white/60 font-semibold">{count}</span>
                              </button>
                            )
                          })}
                        </>
                      )
                    })()}
                  </div>
                </div>
              )}
            </div>

            {/* Rest of nav links */}
            {navLinks.filter(l => l.to !== '/').map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `relative flex-shrink-0 px-3 py-1.5 rounded-lg text-[15px] font-semibold transition-all duration-150 whitespace-nowrap ${
                    isActive ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-orange rounded-full" />}
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
          {/* Home */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive ? 'text-white bg-white/10 border-l-2 border-brand-orange pl-[10px]' : 'text-white/60 hover:text-white hover:bg-white/7'
              }`
            }
          >Home</NavLink>

          {/* Projects — expandable in mobile */}
          <div>
            <button
              onClick={() => setProjDropOpen(o => !o)}
              className="w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/7 transition"
            >
              Projects
              <ChevronDown size={13} className={`ml-auto transition-transform ${projDropOpen ? 'rotate-180 text-brand-orange' : ''}`} />
            </button>
            {projDropOpen && (
              <div className="ml-3 mt-0.5 space-y-3 pb-2">
                {levelTabs.map(lv => (
                  <div key={lv.id}>
                    <p className="px-3 py-1 text-white/40 text-[11px] font-bold uppercase tracking-wider">{lv.label}</p>
                    {topicsForLevel(lv.id).map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => goToTopic(lv.id, cat.id)}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/7 text-sm transition"
                      >
                        <span>{cat.label}</span>
                        <span className="ml-auto text-white/30 text-xs">{projects.filter(p => p.level === lv.id && p.category === cat.id).length}</span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {navLinks.filter(l => l.to !== '/').map(l => (
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
