import { Link } from 'react-router-dom'
import { Clock, ChevronRight, MessageCircle, Wrench, Bell } from 'lucide-react'
import { categories, difficultyColors } from '../data/projects'
import { WHATSAPP } from '../data/projectMeta'

const categoryColorMap = Object.fromEntries(categories.map(c => [c.id, c.color]))

const LEVEL_META = {
  school: { label: 'School',     color: 'bg-emerald-100 text-emerald-700' },
  ug:     { label: 'UG / B.Tech', color: 'bg-violet-100 text-violet-700'  },
  pg:     { label: 'PG / M.Tech', color: 'bg-cyan-100 text-cyan-700'      },
}

function waLink(title) {
  const msg = encodeURIComponent(`Hi! I'm interested in the "${title}" project. Can you help me?`)
  return `https://wa.me/${WHATSAPP}?text=${msg}`
}

export default function ProjectCard({ project }) {
  const { id, title, category, difficulty, duration, tech, summary, comingSoon, level } = project
  const catColor   = categoryColorMap[category] || 'bg-slate-100 text-slate-700'
  const diffColor  = difficultyColors[difficulty] || 'bg-slate-100 text-slate-700'
  const catLabel   = categories.find(c => c.id === category)?.label || category
  const levelMeta  = LEVEL_META[level] || null

  if (comingSoon) {
    return (
      <div className="card flex flex-col h-full overflow-hidden relative opacity-80 hover:opacity-100 transition-opacity">
        {/* Top accent bar — muted */}
        <div className="h-1.5 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300" />

        {/* Coming Soon ribbon */}
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 border border-amber-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
            <Bell size={9} /> Coming Soon
          </span>
        </div>

        <div className="flex flex-col flex-1 p-6">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4 pr-24">
            {levelMeta && <span className={`badge ${levelMeta.color}`}>{levelMeta.label}</span>}
            <span className={`badge ${catColor}`}>{catLabel}</span>
            <span className={`badge ${diffColor}`}>{difficulty}</span>
          </div>

          {/* Title */}
          <h3 className="text-[#0B1D3A] font-bold text-lg leading-snug mb-2">
            {title}
          </h3>

          {/* Summary */}
          <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
            {summary}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {tech.slice(0, 4).map(t => (
              <span key={t} className="px-2.5 py-1 bg-slate-100 text-slate-400 rounded-lg text-xs font-medium">
                {t}
              </span>
            ))}
          </div>

          {/* Disabled CTAs */}
          <div className="flex gap-2 mb-3">
            <button
              disabled
              className="flex items-center justify-center gap-1.5 flex-1 py-2.5 bg-slate-100 text-slate-400 font-bold rounded-xl text-xs cursor-not-allowed"
            >
              <MessageCircle size={13} /> Notify Me
            </button>
            <button
              disabled
              className="flex items-center justify-center gap-1.5 flex-1 py-2.5 bg-slate-100 text-slate-400 font-bold rounded-xl text-xs cursor-not-allowed"
            >
              <Wrench size={13} /> Coming Soon
            </button>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-slate-300 text-xs">
              <Clock size={13} />
              <span>{duration}</span>
            </div>
            <span className="text-slate-300 text-xs">In progress…</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card flex flex-col h-full overflow-hidden group">
      {/* Top accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-brand-navy via-brand-teal to-brand-orange" />

      <div className="flex flex-col flex-1 p-6">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {levelMeta && <span className={`badge ${levelMeta.color}`}>{levelMeta.label}</span>}
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
