import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X, Layers } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import { projects, categories, levels } from '../data/projects'

export default function Projects() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState('')

  const levelId = searchParams.get('level')
  const catId   = searchParams.get('cat')

  const levelMeta = levels.find(l => l.id === levelId)
  const catMeta   = categories.find(c => c.id === catId)

  const displayProjects = (levelId && catId)
    ? projects.filter(p => {
        const matchLevel = p.level    === levelId
        const matchCat   = p.category === catId
        const matchQ     = !query ||
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.tech.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
          p.summary.toLowerCase().includes(query.toLowerCase())
        return matchLevel && matchCat && matchQ
      })
    : []

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="hero-bg pt-28 pb-12">
        <div className="w-full px-5 lg:px-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold mb-4">
            <Layers size={12} />
            {projects.length} Projects · School, UG &amp; PG levels
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
            Project Library
          </h1>
          <p className="text-white/65 text-base max-w-md mx-auto">
            Use the <strong className="text-white">Projects</strong> menu in the navbar to pick your level and topic.
          </p>
        </div>
      </div>

      <div className="w-full px-5 lg:px-10 py-8">

        {/* Nothing selected — landing content */}
        {(!levelId || !catId) && (
          <div className="max-w-5xl mx-auto">

            {/* Intro */}
            <div className="text-center mb-12">
              <p className="inline-block px-4 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-widest mb-4">
                Learn by Building
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy mb-4 leading-tight">
                The Fastest Way to Master a Skill<br className="hidden md:block" /> is to Build Something Real
              </h2>
              <p className="text-slate-500 text-base max-w-2xl mx-auto leading-relaxed">
                Theory gives you the map — projects give you the terrain. Every project in this library is designed to take you from concept to working code, building the kind of hands-on confidence that no textbook can replicate.
              </p>
            </div>

            {/* Benefit cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
              {[
                {
                  title: 'Retain More, Forget Less',
                  body: 'Research shows learners retain up to 75% of what they practise by doing, versus just 10% from reading. Building a project locks concepts into long-term memory.',
                  accent: 'border-cyan-400',
                  tag: 'Cognitive Science',
                },
                {
                  title: 'Solve Real Problems',
                  body: 'Every project mirrors an industry problem — from IoT sensor dashboards to NLP pipelines. You learn to break down ambiguous requirements, just like professionals do.',
                  accent: 'border-brand-orange',
                  tag: 'Industry Readiness',
                },
                {
                  title: 'Build a Portfolio That Speaks',
                  body: 'Recruiters spend 30 seconds on a resume. A deployed, documented project on GitHub speaks louder than a list of tools — it proves you can finish what you start.',
                  accent: 'border-violet-400',
                  tag: 'Career Impact',
                },
                {
                  title: 'Debug Like an Engineer',
                  body: 'Real code breaks in unexpected ways. Wrestling with actual errors builds problem-solving instincts that mock exercises cannot — the kind interviewers test in live coding rounds.',
                  accent: 'border-emerald-400',
                  tag: 'Problem Solving',
                },
                {
                  title: 'Connect the Dots Across Topics',
                  body: 'A single web project touches HTML, CSS, JavaScript, APIs, and databases at once. Integrated projects reveal how disciplines interlock — a perspective lectures rarely provide.',
                  accent: 'border-sky-400',
                  tag: 'Systems Thinking',
                },
                {
                  title: 'Grow at Your Own Level',
                  body: 'Projects here span School to PG / M.Tech. Start where you are, build confidence, then climb. Each level adds depth — not just difficulty — so your growth is always intentional.',
                  accent: 'border-rose-400',
                  tag: 'Structured Growth',
                },
              ].map(card => (
                <div key={card.title} className={`bg-white rounded-2xl border-t-4 ${card.accent} border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow`}>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">{card.tag}</span>
                  <h3 className="text-base font-bold text-brand-navy mb-2">{card.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>

            {/* Stats strip */}
            <div className="bg-gradient-to-r from-brand-navy to-[#1a3a6b] rounded-2xl px-6 py-7 grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-12">
              {[
                { value: '22+', label: 'Curated Projects' },
                { value: '3', label: 'Learning Levels' },
                { value: '6', label: 'Topic Domains' },
                { value: '100%', label: 'Hands-on Focus' },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-3xl font-extrabold text-brand-orange mb-1">{s.value}</p>
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>

            {/* How it works */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-7">
              <h3 className="text-lg font-bold text-brand-navy mb-5 text-center">How to Get Started</h3>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { step: '1', title: 'Pick Your Level', desc: 'Open the Projects menu in the navbar and hover over School, UG / B.Tech, or PG / M.Tech.' },
                  { step: '2', title: 'Choose a Topic', desc: 'Select a domain — Machine Learning, Web Dev, IoT, and more — that matches your current coursework or interests.' },
                  { step: '3', title: 'Start Building', desc: 'Read the project brief, explore the tech stack, and follow the guided steps. Document as you go and push it to GitHub.' },
                ].map(s => (
                  <div key={s.step} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-brand-orange text-white font-extrabold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      {s.step}
                    </div>
                    <div>
                      <p className="font-bold text-brand-navy text-sm mb-1">{s.title}</p>
                      <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Topic selected — show projects */}
        {levelId && catId && catMeta && levelMeta && (
          <>
            {/* Topic header */}
            <div className={`bg-gradient-to-r ${catMeta.gradient} rounded-2xl px-6 py-5 mb-6 flex flex-col sm:flex-row sm:items-center gap-4`}>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{catMeta.icon}</span>
                <div>
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">
                    {levelMeta.icon} {levelMeta.label} · {levelMeta.desc}
                  </p>
                  <h2 className="text-white font-bold text-xl">{catMeta.label} Projects</h2>
                  <p className="text-white/65 text-sm">{catMeta.desc}</p>
                </div>
              </div>
              {/* Search */}
              <div className="sm:ml-auto relative w-full sm:w-56">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="w-full pl-8 pr-8 py-2 rounded-lg bg-white/15 border border-white/25 text-white placeholder-white/50 text-sm focus:outline-none focus:bg-white/20"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>

            <p className="text-slate-500 text-sm mb-5">
              Showing <strong className="text-brand-navy">{displayProjects.length}</strong> project{displayProjects.length !== 1 ? 's' : ''}
              {query && <> matching "<em>{query}</em>"</>}
            </p>

            {displayProjects.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {displayProjects.map(p => <ProjectCard key={p.id} project={p} />)}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-400 text-sm">No projects match your search.</p>
                <button onClick={() => setQuery('')} className="mt-2 text-brand-orange text-sm font-semibold hover:underline">Clear search</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
