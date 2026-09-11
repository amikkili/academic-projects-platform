import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Search, SlidersHorizontal, X, ArrowLeft } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import { projects, categories, levels, difficultyColors } from '../data/projects'

const difficulties = ['Beginner', 'Intermediate', 'Advanced']

export default function TopicProjects() {
  const { cat } = useParams()
  const topic = categories.find(c => c.id === cat)

  const [query,       setQuery]       = useState('')
  const [activeLevel, setActiveLevel] = useState('all')
  const [activeDiff,  setActiveDiff]  = useState('all')

  if (!topic) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 text-lg">Topic not found.</p>
          <Link to="/projects" className="mt-4 inline-block text-brand-orange font-semibold hover:underline">
            ← Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  const filtered = projects.filter(p => {
    const matchCat   = p.category === cat
    const matchLevel = activeLevel === 'all' || p.level     === activeLevel
    const matchDiff  = activeDiff  === 'all' || p.difficulty === activeDiff
    const matchQ     = !query || p.title.toLowerCase().includes(query.toLowerCase()) ||
                       p.tech.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
                       p.summary.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchLevel && matchDiff && matchQ
  })

  const clearAll = () => { setQuery(''); setActiveLevel('all'); setActiveDiff('all') }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className={`bg-gradient-to-br ${topic.gradient} py-20 pt-28`}>
        <div className="w-full px-5 lg:px-10">
          {/* Breadcrumb */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium mb-6 transition"
          >
            <ArrowLeft size={14} /> All Topics
          </Link>

          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-5xl">{topic.icon}</span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                  {topic.label}
                </h1>
              </div>
              <p className="text-white/75 text-base md:text-lg max-w-2xl leading-relaxed">
                {topic.longDesc}
              </p>
            </div>

            {/* Search */}
            <div className="w-full md:w-80 relative flex-shrink-0">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                type="text"
                placeholder="Search projects..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-3 rounded-xl bg-white/15 border border-white/25 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 text-sm backdrop-blur"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Tech pills in hero */}
          <div className="flex flex-wrap gap-2 mt-5">
            {topic.tools.map(t => (
              <span key={t} className="text-xs bg-white/15 text-white/90 border border-white/20 rounded-full px-3 py-1 font-medium backdrop-blur">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full px-5 lg:px-10 py-8">
        {/* Level tabs */}
        <div className="flex flex-wrap gap-2 mb-5">
          {levels.map(lv => (
            <button
              key={lv.id}
              onClick={() => setActiveLevel(lv.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeLevel === lv.id
                  ? 'bg-brand-orange text-white shadow-md shadow-orange-200'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-orange hover:text-brand-orange'
              }`}
            >
              <span>{lv.icon}</span>
              {lv.label}
              <span className={`text-xs ml-0.5 ${activeLevel === lv.id ? 'text-white/80' : 'text-slate-400'}`}>
                ({projects.filter(p => p.category === cat && (lv.id === 'all' || p.level === lv.id)).length})
              </span>
            </button>
          ))}
        </div>

        {/* Difficulty filter */}
        <div className="flex items-center gap-2 mb-6">
          <SlidersHorizontal size={14} className="text-slate-400" />
          <div className="flex gap-2">
            <button
              onClick={() => setActiveDiff('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeDiff === 'all' ? 'bg-brand-navy text-white' : 'bg-white text-slate-500 border border-slate-200'
              }`}
            >All</button>
            {difficulties.map(d => (
              <button
                key={d}
                onClick={() => setActiveDiff(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeDiff === d ? 'bg-brand-navy text-white' : 'bg-white text-slate-500 border border-slate-200 hover:border-brand-navy'
                }`}
              >{d}</button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-slate-500 text-sm mb-6">
          Showing <strong className="text-brand-navy">{filtered.length}</strong> project{filtered.length !== 1 ? 's' : ''}
          {query && <> matching "<em>{query}</em>"</>}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-slate-300" />
            </div>
            <p className="text-slate-500 text-lg font-medium">No projects found</p>
            <p className="text-slate-400 text-sm mt-1">Try adjusting your filters or search query</p>
            <button onClick={clearAll} className="mt-4 btn-outline">Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  )
}
