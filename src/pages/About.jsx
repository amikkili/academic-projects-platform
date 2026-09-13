import { Link } from 'react-router-dom'
import { Code2, BookOpen, Mic2, Users, Target, Heart, ArrowRight } from 'lucide-react'

const team = [
  { name: 'Anil Kumar', role: 'Founder & Developer', initials: 'AK' },
  { name: 'Priya Sharma', role: 'Content Lead', initials: 'PS' },
  { name: 'Rahul Verma', role: 'ML Engineer', initials: 'RV' },
]

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="hero-bg py-10 pt-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            About <span className="gradient-text">AcademiCode</span>
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            We're on a mission to make academic project work less stressful and more rewarding for engineering students across India.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 text-brand-orange font-semibold text-sm mb-5">
                <Target size={14} /> Our Mission
              </div>
              <h2 className="text-3xl font-extrabold text-[#0B1D3A] mb-5 leading-tight">
                Bridging the gap between theory and practice
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Too many students struggle with final year projects — not because they aren't smart,
                but because they lack access to well-structured resources that bridge classroom theory
                with real implementation.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                AcademiCode was created to fix that. Every project on our platform comes with clean,
                working source code, a plain-English explanation of every concept, and viva questions
                curated from real university examinations.
              </p>
              <Link to="/projects" className="btn-outline">
                Browse Projects <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Code2,    label: 'Source Code',    desc: 'Every project, fully working',  bg: 'from-brand-navy to-blue-700' },
                { icon: BookOpen, label: 'Explanations',   desc: 'Plain English, not jargon',    bg: 'from-brand-teal to-cyan-600' },
                { icon: Mic2,     label: 'Viva Practice',  desc: 'Real exam questions',           bg: 'from-brand-orange to-amber-500' },
                { icon: Users,    label: 'Community',      desc: '10K+ students learning',        bg: 'from-purple-600 to-purple-800' },
              ].map(({ icon: Icon, label, desc, bg }) => (
                <div key={label} className="card p-5">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center mb-3`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <p className="font-bold text-[#0B1D3A] text-sm">{label}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#0B1D3A] text-center mb-12">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Browse & Choose', desc: 'Filter projects by category, difficulty, or tech stack. Read summaries to find one that matches your course.' },
              { step: '02', title: 'Study the Project', desc: 'Read the step-by-step explanation, understand the architecture, and follow along with the source code.' },
              { step: '03', title: 'Ace Your Viva', desc: 'Go through the curated Q&A to understand why every design decision was made — the way examiners think.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-navy to-brand-blue text-white font-extrabold text-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {step}
                </div>
                <h3 className="font-bold text-[#0B1D3A] text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-500 font-semibold text-sm mb-5">
            <Heart size={14} fill="currentColor" /> Made with passion
          </div>
          <h2 className="text-3xl font-extrabold text-[#0B1D3A] mb-10">Meet the Team</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {team.map(({ name, role, initials }) => (
              <div key={name} className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-navy to-brand-blue text-white text-2xl font-bold flex items-center justify-center mx-auto mb-3 shadow-lg">
                  {initials}
                </div>
                <p className="font-bold text-[#0B1D3A]">{name}</p>
                <p className="text-slate-500 text-sm">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
