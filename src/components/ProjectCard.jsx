import { Link } from 'react-router-dom'
import { Clock, ChevronRight, MessageCircle, Wrench } from 'lucide-react'
import { categories, difficultyColors } from '../data/projects'
import { WHATSAPP } from '../data/projectMeta'

const categoryColorMap = Object.fromEntries(categories.map(c => [c.id, c.color]))

function waLink(title) {
  const msg = encodeURIComponent(`Hi! I'm interested in the "${title}" project. Can you help me?`)
  return `https://wa.me/${WHATSAPP}?text=${msg}`
}

export default function ProjectCard({ project }) {
  const { id, title, category, difficulty, duration, tech, summary } = project
  const catColor  = categoryColorMap[category] || 'bg-slate-100 text-slate-700'
  const diffColor = difficultyColors[difficulty] || 'bg-slate-100 text-slate-700'
  const catLabel  = categories.find(c => c.id === category)?.label || category

  return (
    <div className="card flex flex-col h-full overflow-hidden group">
      {/* Top accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-brand-navy via-brand-teal to-brand-orange" />

      <div className="flex flex-col flex-1 p-6">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`badge ${catColor}`}>{catLabel}</span>
          <span className={`badge ${diffColor}`}>{difficulty}</span>
        </div>

        {/* Title */}
        <h3 className="text-[#0B1D3A] font-bold text-lg leading-snug mb-2 group-hover:text-brand-navy transition-colors">
          {title}
        </h3>

        {/* Summary */}
        <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">
          {summary}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tech.slice(0, 4).map(t => (
            <span key={t} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
              {t}
            </span>
          ))}
          {tech.length > 4 && (
            <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-medium">
              +{tech.length - 4}
            </span>
          )}
        </div>

        {/* CTAs */}
        <div className="flex gap-2 mb-3">
          <a
            href={waLink(title)}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex items-center justify-center gap-1.5 flex-1 py-2.5 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-bold rounded-xl text-xs transition-all shadow-sm shadow-green-200"
          >
            <MessageCircle size={13} fill="white" /> Get This Project
          </a>
          <Link
            to={`/projects/${id}?tab=setup`}
            onClick={e => e.stopPropagation()}
            className="flex items-center justify-center gap-1.5 flex-1 py-2.5 bg-brand-navy hover:bg-brand-blue active:scale-95 text-white font-bold rounded-xl text-xs transition-all"
          >
            <Wrench size={13} /> Build It Myself
          </Link>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
            <Clock size={13} />
            <span>{duration}</span>
          </div>
          <Link
            to={`/projects/${id}`}
            className="flex items-center gap-1 text-slate-400 font-medium text-xs hover:text-brand-navy transition-colors"
          >
            Full Details <ChevronRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  )
}
