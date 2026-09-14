import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Code2, Menu, X, LogIn, LogOut, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

// ── Project mega-dropdown data — level-specific ──────────────────────────────

const CATEGORY_BASE = [
  { id: 'ml',       icon: '🤖', label: 'Machine Learning' },
  { id: 'web',      icon: '🌐', label: 'Web Development'  },
  { id: 'data',     icon: '📊', label: 'Data Science'     },
  { id: 'iot',      icon: '📡', label: 'IoT & Embedded'   },
  { id: 'security', icon: '🔐', label: 'Cybersecurity'    },
  { id: 'mobile',   icon: '📱', label: 'Mobile Apps'      },
]

// Topics are curated to match the complexity and context of each level
const LEVEL_TOPICS = {
  school: {
    ml:       ['Teachable Machine (No-Code)', 'Rule-Based Chatbot', 'Spam SMS Detector', 'Grade Predictor'],
    web:      ['HTML/CSS Portfolio', 'To-Do App', 'Interactive Quiz', 'Weather App', 'QR Code Generator'],
    data:     ['Class Marks Chart', 'Survey Analysis', 'Bar & Pie Charts with Matplotlib'],
    iot:      ['LED & Traffic Light (Arduino)', 'Temp & Humidity Sensor', 'Soil Moisture Meter', 'Obstacle Detector'],
    security: ['Caesar Cipher Encoder', 'Password Strength Checker', 'Login Attempt Monitor'],
    mobile:   ['Unit Converter App', 'School Noticeboard (Firebase)', 'Flashcard Study App'],
  },
  ug: {
    ml:       ['Deep Learning / CNN', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics', 'Neural Networks', 'Data Mining'],
    web:      ['React / Frontend', 'Node.js / Backend', 'Full-Stack MERN', 'REST APIs', 'PHP & MySQL', 'Django / Flask'],
    data:     ['Data Analytics', 'Data Visualization', 'EDA & Feature Engineering', 'Statistical Modelling', 'Business Intelligence'],
    iot:      ['Arduino Projects', 'Raspberry Pi', 'Home Automation', 'Smart Agriculture', 'Wearables', 'MQTT & Cloud IoT'],
    security: ['Network Security', 'Intrusion Detection System', 'Cryptography', 'Ethical Hacking', 'Malware Analysis'],
    mobile:   ['Flutter / Dart', 'Android (Java/Kotlin)', 'React Native', 'Firebase Backend', 'Offline-First Apps'],
  },
  pg: {
    ml:       ['Federated Learning', 'Transformer & BERT Models', 'Graph Neural Networks', 'Reinforcement Learning', 'Advanced Computer Vision (YOLO)', 'Advanced NLP Pipelines'],
    web:      ['Microservices & Kubernetes', 'ML Model Serving (FastAPI)', 'GraphQL / Multi-Tenant SaaS', 'Django REST (Advanced)'],
    data:     ['Big Data with Apache Spark', 'Bayesian Statistical Inference', 'ETL & Data Pipelines (Airflow)', 'Real-Time Streaming (Kafka)'],
    iot:      ['Edge AI on Raspberry Pi', 'Precision Agriculture (Drone+Sensors)', 'ECG Signal Processing'],
    security: ['Zero-Trust Architecture', 'Homomorphic Encryption', 'Penetration Testing Automation', 'Malware Sandbox'],
    mobile:   ['EHR App with Flutter', 'AR Campus Navigation (Android)', 'Telemedicine with WebRTC'],
  },
}

const PROJECT_LEVELS = [
  { id: 'ug',     label: 'UG Projects',     icon: '🎓', color: 'text-violet-300' },
  { id: 'pg',     label: 'PG Projects',     icon: '📘', color: 'text-cyan-300'   },
  { id: 'school', label: 'School Projects', icon: '🏫', color: 'text-emerald-300' },
]

// ── Mega dropdown component ──────────────────────────────────────────────────

function ProjectMegaMenu({ level, onClose }) {
  const navigate = useNavigate()
  const topics   = LEVEL_TOPICS[level.id] || {}

  function go(catId, topic) {
    const params = new URLSearchParams({ level: level.id, cat: catId })
    if (topic) params.set('topic', topic)
    navigate(`/projects?${params.toString()}`)
    onClose()
  }

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[700px] bg-[#0B1D3A] border border-white/12 rounded-2xl shadow-2xl shadow-black/60 z-50 overflow-hidden">
      {/* Header */}
      <div className={`px-6 pt-4 pb-3 border-b border-white/8 flex items-center gap-2`}>
        <span className="text-xl">{level.icon}</span>
        <div>
          <p className={`font-extrabold text-sm ${level.color}`}>{level.label}</p>
          <p className="text-white/35 text-[10px]">
            {level.id === 'school' && 'Class 8–12 · Basic programming & hardware'}
            {level.id === 'ug'     && 'B.Tech / B.E. · Core CS & engineering projects'}
            {level.id === 'pg'     && 'M.Tech / M.E. · Research-grade advanced projects'}
          </p>
        </div>
      </div>
      {/* Categories grid */}
      <div className="p-4 grid grid-cols-3 gap-3">
        {CATEGORY_BASE.map(cat => (
          <div key={cat.id} className="bg-white/4 rounded-xl p-3 hover:bg-white/8 transition">
            <button
              onClick={() => go(cat.id, '')}
              className="flex items-center gap-2 text-white font-semibold text-xs mb-2 w-full hover:text-brand-teal transition"
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
            <ul className="space-y-1">
              {(topics[cat.id] || []).map(topic => (
                <li key={topic}>
                  <button
                    onClick={() => go(cat.id, topic)}
                    className="text-white/50 hover:text-white text-[11px] transition text-left w-full"
                  >
                    › {topic}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [open,        setOpen]        = useState(false)
  const [activeMenu,  setActiveMenu]  = useState(null) // level id or null
  const [scrolled,    setScrolled]    = useState(false)
  const { pathname }                  = useLocation()
  const { user, isLoggedIn, logout }  = useAuth()
  const menuRef                       = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false); setActiveMenu(null) }, [pathname])

  // Close mega menu on outside click
  useEffect(() => {
    function handler(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenu(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const navLinks = [
    { to: '/',                   label: 'Home' },
    { to: '/project-fit',        label: 'Project Fit' },
    { to: '/internal-marks',     label: 'Marks' },
    { to: '/hr-prep',            label: 'HR Prep' },
    { to: '/resume-builder',     label: 'Resume' },
    { to: '/aptitude-practice',  label: 'Aptitude' },
    { to: '/about',              label: 'About' },
    { to: '/pricing',            label: 'Pricing' },
    { to: '/contact',            label: 'Contact' },
  ]

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
        <div className="flex items-center h-[60px] relative" ref={menuRef}>

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
          <div className="hidden xl:flex items-center gap-0 absolute left-1/2 -translate-x-1/2">

            {/* Home */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `relative flex-shrink-0 px-2.5 py-1 rounded-lg text-[13px] font-semibold transition-all duration-150 whitespace-nowrap ${
                  isActive ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {({ isActive }) => (
                <>Home{isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-orange rounded-full" />}</>
              )}
            </NavLink>

            {/* ── Project level dropdowns ── */}
            {PROJECT_LEVELS.map(level => (
              <div key={level.id} className="relative">
                <button
                  onClick={() => setActiveMenu(prev => prev === level.id ? null : level.id)}
                  className={`flex items-center gap-0.5 flex-shrink-0 px-2.5 py-1 rounded-lg text-[13px] font-semibold transition-all duration-150 whitespace-nowrap ${
                    isProjectsActive && activeMenu === level.id
                      ? 'text-white bg-white/10'
                      : isProjectsActive
                        ? 'text-white/90 hover:text-white hover:bg-white/10'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {level.label}
                  <ChevronDown size={13} className={`transition-transform ${activeMenu === level.id ? 'rotate-180' : ''}`} />
                  {isProjectsActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-orange rounded-full" />}
                </button>

                {activeMenu === level.id && (
                  <ProjectMegaMenu level={level} onClose={() => setActiveMenu(null)} />
                )}
              </div>
            ))}

            {/* Rest of nav links (skip Home) */}
            {navLinks.filter(l => l.to !== '/').map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `relative flex-shrink-0 px-2.5 py-1 rounded-lg text-[13px] font-semibold transition-all duration-150 whitespace-nowrap ${
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

          {/* ── Right section ── */}
          <div className="hidden xl:flex items-center gap-2 flex-shrink-0 ml-auto">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-teal to-cyan-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                    {initials}
                  </div>
                  <span className="text-white/80 text-xs font-medium max-w-[96px] truncate">
                    {user?.name}
                  </span>
                </div>
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
                className="flex items-center gap-1.5 px-4 py-1.5 text-white hover:bg-white/10 border border-white/30 hover:border-white/60 rounded-xl text-[13px] font-semibold transition-all"
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
        <div className="xl:hidden bg-[#0B1D3A] border-t border-white/8 px-4 py-3 space-y-0.5 shadow-2xl max-h-[80vh] overflow-y-auto">
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

          {/* Project levels in mobile */}
          {PROJECT_LEVELS.map(level => (
            <div key={level.id}>
              <button
                onClick={() => setActiveMenu(prev => prev === level.id ? null : level.id)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/7 transition"
              >
                <span>{level.icon} {level.label}</span>
                <ChevronDown size={13} className={`transition-transform ${activeMenu === level.id ? 'rotate-180' : ''}`} />
              </button>
              {activeMenu === level.id && (
                <div className="ml-3 mb-2 space-y-2 border-l border-white/10 pl-3">
                  {CATEGORY_BASE.map(cat => (
                    <div key={cat.id}>
                      <Link
                        to={`/projects?level=${level.id}&cat=${cat.id}`}
                        className="flex items-center gap-1.5 text-white/70 font-semibold text-xs py-1"
                        onClick={() => setOpen(false)}
                      >
                        {cat.icon} {cat.label}
                      </Link>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {(LEVEL_TOPICS[level.id]?.[cat.id] || []).map(topic => (
                          <Link
                            key={topic}
                            to={`/projects?level=${level.id}&cat=${cat.id}&topic=${encodeURIComponent(topic)}`}
                            className="text-white/40 hover:text-white text-[10px] px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition"
                            onClick={() => setOpen(false)}
                          >
                            {topic}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

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
