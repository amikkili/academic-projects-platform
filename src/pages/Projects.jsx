import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import { projects, categories, levels } from '../data/projects'

const SUB_TOPICS = {
  ml:       ['Deep Learning', 'NLP', 'Computer Vision', 'Predictive Analytics', 'Neural Networks', 'Data Mining'],
  web:      ['React / Frontend', 'Node.js / Backend', 'Full-Stack', 'REST APIs', 'PHP / MySQL', 'Django / Flask'],
  data:     ['Data Analytics', 'Data Visualization', 'EDA', 'Statistical Modelling', 'Business Intelligence'],
  iot:      ['Arduino', 'Raspberry Pi', 'Home Automation', 'Smart Agriculture', 'Wearables', 'MQTT'],
  security: ['Network Security', 'Intrusion Detection', 'Cryptography', 'Ethical Hacking', 'Malware Analysis'],
  mobile:   ['Flutter / Dart', 'Android (Java/Kotlin)', 'React Native', 'Firebase', 'Offline-First Apps'],
}

export default function Projects() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState('')

  const selectedLevel = searchParams.get('level') || 'ug'
  const selectedCat   = searchParams.get('cat')   || ''
  const selectedTopic = searchParams.get('topic') || ''

  // Reset search on URL change
  useEffect(() => { setQuery('') }, [selectedLevel, selectedCat, selectedTopic])

  const levelMeta = levels.find(l => l.id === selectedLevel)
  const catMeta   = categories.find(c => c.id === selectedCat)

  // Strip everything after "/" for fuzzy keyword matching on untagged projects
  const topicKeyword = selectedTopic.toLowerCase().replace(/\s*\/.*$/, '').trim()

  const displayProjects = projects.filter(p => {
    const matchLevel = !selectedLevel || selectedLevel === 'all' || p.level === selectedLevel
    const matchCat   = !selectedCat   || p.category === selectedCat
    const matchTopic = !selectedTopic || (
      // Tagged projects match exactly
      p.topicTags?.includes(selectedTopic) ||
      // Legacy / real projects without topicTags fall back to fuzzy match
      (!p.topicTags && (
        p.tech.some(t => t.toLowerCase().includes(topicKeyword)) ||
        p.title.toLowerCase().includes(topicKeyword) ||
        (p.summary && p.summary.toLowerCase().includes(topicKeyword))
      ))
    )
    const matchQ = !query ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.tech.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
      (p.summary && p.summary.toLowerCase().includes(query.toLowerCase()))
    return matchLevel && matchCat && matchTopic && matchQ
  })

  // Build heading
  let heading = levelMeta?.label || 'All Projects'
  if (catMeta) heading += ` › ${catMeta.label}`
  if (selectedTopic) heading += ` › ${selectedTopic}`

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-8">

        {/* Page heading + search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-white/50 text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
              Browse Projects
            </p>
            <h1 className="text-2xl font-extrabold text-brand-navy leading-tight">
              {catMeta && <span className="mr-2">{catMeta.icon}</span>}
              {heading}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {displayProjects.length} project{displayProjects.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="relative flex-shrink-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="pl-8 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-brand-navy/40 focus:ring-2 focus:ring-brand-navy/10 w-full sm:w-64 transition"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Project grid */}
        {displayProjects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayProjects.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-slate-700 font-semibold text-lg mb-2">No projects found</p>
            <p className="text-slate-400 text-sm">Try a different search or browse from the menu above.</p>
          </div>
        )}
      </div>
    </div>
  )
}
