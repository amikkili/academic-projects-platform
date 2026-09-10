import { Link } from 'react-router-dom'
import { Code2, Github, Twitter, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0B1D3A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
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
                <a
                  key={i}
                  href="#"
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
              {['About Us','How It Works','For Colleges','Contact','FAQ'].map(l => (
                <li key={l}>
                  <a href="#" className="text-white/55 hover:text-brand-orange text-sm transition">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-xs">
          <p>© {new Date().getFullYear()} AcademiCode. All rights reserved.</p>
          <p>Built with ❤️ for engineering students</p>
        </div>
      </div>
    </footer>
  )
}
