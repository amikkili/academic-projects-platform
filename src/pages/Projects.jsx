import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import { projects, categories, difficultyColors } from '../data/projects'

const difficulties = ['Beginner', 'Intermediate', 'Advanced']

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query,    setQuery]    = useState('')
  const [activeCat, setActiveCat] = useState(searchParams.get('cat') || 'all')
  const [activeDiff, setActiveDiff] = useState('all')

  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat) setActiveCat(cat)
  }, [searchParams])

  const filtered = projects.filter(p => {
    const matchCat  = activeCat  === 'all' || p.category   === activeCat
    const matchDiff = activeDiff === 'all' || p.difficulty  === activeDiff
    const matchQ    = !query     || p.title.toLowerCase().includes(query.toLowerCase()) ||
                      p.tech.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
                      p.summary.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchDiff && matchQ
  })

  const handleCat = (id) => {
    setActiveCat(id)
    setSearchParams(id === 'all' ? {} : { cat: id })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="hero-bg py-20 pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Project Library
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Browse, filter, and find the perfect project for your course.
          </p>
          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, technology..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-slate-700 placeholder-slate-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/50 text-sm"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCat(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCat === cat.id
                    ? 'bg-brand-navy text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-navy hover:text-brand-navy'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Difficulty */}
          <div className="flex items-center gap-2 sm:ml-auto">
            <SlidersHorizontal size={15} className="text-slate-400" />
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
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-slate-500 text-sm mb-6">
          Showing <strong className="text-brand-navy">{filtered.length}</strong> project{filtered.length !== 1 ? 's' : ''}
          {query && <> matching "<em>{query}</em>"</>}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-slate-300" />
            </div>
            <p className="text-slate-500 text-lg font-medium">No projects found</p>
            <p className="text-slate-400 text-sm mt-1">Try adjusting your filters or search query</p>
            <button
              onClick={() => { setQuery(''); setActiveCat('all'); setActiveDiff('all') }}
              className="mt-4 btn-outline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
