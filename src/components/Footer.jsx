import { Link } from 'react-router-dom'
import { Code2, Github, Twitter, Linkedin, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { API_BASE } from '../lib/api'

// ── Visitor counter ───────────────────────────────────────────────────────────

function DigitBox({ digit }) {
  return (
    <span className="inline-flex items-center justify-center w-7 h-8 rounded bg-black/40 border border-white/10 font-mono text-brand-orange font-bold text-base leading-none select-none">
      {digit}
    </span>
  )
}

function VisitorCounter() {
  const [count, setCount] = useState(null)

  useEffect(() => {
    async function run() {
      try {
        // Ping once per day per browser
        const today = new Date().toISOString().slice(0, 10)
        const lastPing = localStorage.getItem('ac_visitor_ping')
        if (lastPing !== today) {
          const res = await fetch(`${API_BASE}/stats/visitors/ping`, { method: 'POST' })
          if (res.ok) {
            const data = await res.json()
            setCount(data.count)
            localStorage.setItem('ac_visitor_ping', today)
            return
          }
        }
        // Already pinged today — just get count
        const res = await fetch(`${API_BASE}/stats/visitors`)
        if (res.ok) setCount((await res.json()).count)
      } catch { /* backend not running — show nothing */ }
    }
    run()
  }, [])

  if (count === null) return null

  const digits = String(count).padStart(6, '0').split('')

  return (
    <div className="flex items-center gap-2 mt-3">
      <div className="flex gap-1">
        {digits.map((d, i) => <DigitBox key={i} digit={d} />)}
      </div>
      <span className="text-white/40 text-xs">total visitors</span>
    </div>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="bg-[#0B1D3A] text-white">
      <div className="w-full px-5 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-orange to-amber-500 flex items-center justify-center">
                <Code2 size={20} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-xl">
                Academi<span className="text-brand-orange">Code</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Hands-on academic projects with complete source code, detailed explanations,
              and viva Q&amp;A — everything you need to ace your final year project.
            </p>
            <div className="flex gap-3 mt-5">
              {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="font-semibold text-white mb-4">Explore</p>
            <ul className="space-y-2">
              {['Machine Learning','Web Development','IoT Projects','Data Science','Mobile Apps','Cybersecurity'].map(l => (
                <li key={l}>
                  <Link to="/projects" className="text-white/55 hover:text-brand-orange text-sm transition">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white mb-4">Platform</p>
            <ul className="space-y-2">
              {[
                ['About Us',    '/about'],
                ['Pricing',     '/pricing'],
                ['Contact',     '/contact'],
                ['Projects',    '/projects'],
                ['Resume',      '/resume-builder'],
              ].map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-white/55 hover:text-brand-orange text-sm transition">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-white/40 text-xs">© {new Date().getFullYear()} AcademiCode · All rights reserved</p>
            <VisitorCounter />
          </div>
          <p className="text-white/30 text-xs">Built with ❤️ for engineering students</p>
        </div>
      </div>
    </footer>
  )
}
