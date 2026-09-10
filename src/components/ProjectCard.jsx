import { Link } from 'react-router-dom'
import { Clock, ChevronRight, Code, Zap } from 'lucide-react'
import { categories, difficultyColors } from '../data/projects'

const categoryColorMap = Object.fromEntries(categories.map(c => [c.id, c.color]))

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
            <span
              key={t}
              className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium"
            >
              {t}
            </span>
          ))}
          {tech.length > 4 && (
            <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-medium">
              +{tech.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
            <Clock size={13} />
            <span>{duration}</span>
          </div>
          <Link
            to={`/projects/${id}`}
            className="flex items-center gap-1 text-brand-navy font-semibold text-sm hover:text-brand-orange transition-colors"
          >
            View Project <ChevronRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  )
}
