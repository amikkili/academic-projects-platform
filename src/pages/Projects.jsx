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

        {/* Nothing selected — guide */}
        {(!levelId || !catId) && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">☝️</div>
            <h2 className="text-xl font-bold text-slate-700 mb-2">Choose a Topic to Begin</h2>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">
              Click the <strong>Projects ▼</strong> menu in the top navbar, select your level (School / UG / PG), then pick a topic.
            </p>
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
