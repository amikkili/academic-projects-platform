import { Link } from 'react-router-dom'
import { Code2, Github, Twitter, Linkedin, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

// ── Visitor counter (Supabase-backed) ────────────────────────────────────────
// Requires in Supabase:
//   CREATE TABLE site_stats (key TEXT PRIMARY KEY, value BIGINT DEFAULT 0);
//   INSERT INTO site_stats (key, value) VALUES ('visitor_count', 0);
//   CREATE OR REPLACE FUNCTION increment_visitor_count()
//     RETURNS bigint LANGUAGE sql SECURITY DEFINER AS $$
//       UPDATE site_stats SET value = value + 1 WHERE key = 'visitor_count' RETURNING value;
//     $$;
//   ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;
//   CREATE POLICY "anon read" ON site_stats FOR SELECT TO anon USING (true);

function DigitBox({ digit }) {
  return (
    <span className="inline-flex items-center justify-center w-7 h-8 rounded bg-black/40 border border-white/10 font-mono text-brand-orange font-bold text-base leading-none select-none">
      {digit}
    </span>
  )
}

function VisitorCounter() {
  const cached = (() => { try { return localStorage.getItem('ac_visitor_count') } catch { return null } })()
  const [count, setCount] = useState(cached ? Number(cached) : null)

  useEffect(() => {
    async function run() {
      try {
        const today = new Date().toISOString().slice(0, 10)
        const lastPing = localStorage.getItem('ac_visitor_ping')

        if (lastPing !== today) {
          // Atomic increment via Supabase RPC
          const { data, error } = await supabase.rpc('increment_visitor_count')
          if (!error && data != null) {
            const n = Number(data)
            setCount(n)
            localStorage.setItem('ac_visitor_ping', today)
            localStorage.setItem('ac_visitor_count', String(n))
            return
          }
        }

        // Just read the current count
        const { data, error } = await supabase
          .from('site_stats')
          .select('value')
          .eq('key', 'visitor_count')
          .single()
        if (!error && data) {
          const n = Number(data.value)
          setCount(n)
          localStorage.setItem('ac_visitor_count', String(n))
        }
      } catch { /* show cached value if offline */ }
    }
    run()
  }, [])

  const digits = String(count ?? 0).padStart(6, '0').split('')

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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
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
