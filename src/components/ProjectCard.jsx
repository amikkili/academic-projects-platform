import { Link } from 'react-router-dom'
import { Clock, ChevronRight, MessageCircle, Wrench, Bell, Tag } from 'lucide-react'
import { categories } from '../data/projects'
import { WHATSAPP } from '../data/projectMeta'

// Hex-based gradients so they work without Tailwind JIT scanning this file
const CAT_META = {
  ml:       { from: '#0891B2', to: '#2563EB', icon: '🤖' },
  web:      { from: '#3B82F6', to: '#4338CA', icon: '🌐' },
  data:     { from: '#A855F7', to: '#6D28D9', icon: '📊' },
  iot:      { from: '#16A34A', to: '#059669', icon: '🔌' },
  security: { from: '#DC2626', to: '#BE123C', icon: '🛡️' },
  mobile:   { from: '#EA580C', to: '#B45309', icon: '📱' },
}

const DIFF_META = {
  Beginner:     { color: '#10B981' },
  Intermediate: { color: '#F59E0B' },
  Advanced:     { color: '#EF4444' },
}

const LEVEL_LABELS = {
  school: 'School',
  ug:     'UG / B.Tech',
  pg:     'PG / M.Tech',
}

function waLink(title) {
  const msg = encodeURIComponent(`Hi! I'm interested in the "${title}" project. Can you help me?`)
  return `https://wa.me/${WHATSAPP}?text=${msg}`
}

export default function ProjectCard({ project }) {
  const { id, title, category, difficulty, duration, tech, summary, comingSoon, level, topicTags } = project

  const cat        = CAT_META[category] || { from: '#64748B', to: '#475569', icon: '📁' }
  const catLabel   = categories.find(c => c.id === category)?.label || category
  const diffColor  = (DIFF_META[difficulty] || DIFF_META.Intermediate).color
  const levelLabel = LEVEL_LABELS[level] || level
  const primaryTopic = topicTags?.[0] || null

  const headerGradient = `linear-gradient(135deg, ${cat.from} 0%, ${cat.to} 100%)`

  // ── COMING SOON ────────────────────────────────────────────────────────────
  if (comingSoon) {
    return (
      <div className="card flex flex-col h-full overflow-hidden">
        {/* Gradient header — striped overlay signals "in progress" */}
        <div className="relative px-5 pt-5 pb-4" style={{ background: headerGradient }}>
          {/* diagonal hatch */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, #fff 0, #fff 2px, transparent 2px, transparent 14px)',
            }}
          />
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl leading-none select-none">{cat.icon}</span>
              <div>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest leading-none mb-0.5">
                  {levelLabel}
                </p>
                <p className="text-white/90 font-bold text-sm leading-tight">{catLabel}</p>
              </div>
            </div>
            {/* Coming Soon chip */}
            <span className="flex items-center gap-1 border border-white/30 bg-white/15 text-white/90 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap">
              <Bell size={8} /> Soon
            </span>
          </div>

          {/* Difficulty + Duration */}
          <div className="relative flex items-center gap-2 mt-3">
            <span className="flex items-center gap-1.5 bg-white/15 text-white/80 text-[11px] font-medium px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: diffColor }} />
              {difficulty}
            </span>
            <span className="flex items-center gap-1.5 bg-white/15 text-white/80 text-[11px] font-medium px-2.5 py-1 rounded-full">
              <Clock size={9} />
              {duration}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5">
          {primaryTopic && (
            <div className="flex items-center gap-1.5 mb-2">
              <Tag size={10} className="text-slate-300 shrink-0" />
              <span className="text-slate-400 text-[11px] font-medium truncate">{primaryTopic}</span>
            </div>
          )}

          <h3 className="text-brand-dark font-bold text-[14px] leading-snug mb-2 line-clamp-2 opacity-70">
            {title}
          </h3>

          <p className="text-slate-400 text-[12px] leading-relaxed mb-4 flex-1 line-clamp-3">
            {summary}
          </p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tech.slice(0, 3).map(t => (
              <span key={t} className="px-2 py-0.5 bg-slate-50 text-slate-400 rounded-md text-[11px] font-medium border border-slate-100">
                {t}
              </span>
            ))}
            {tech.length > 3 && (
              <span className="px-2 py-0.5 bg-slate-50 text-slate-400 rounded-md text-[11px] font-medium border border-slate-100">
                +{tech.length - 3}
              </span>
            )}
          </div>

          <button
            disabled
            className="w-full py-2.5 bg-slate-100 text-slate-400 font-semibold rounded-xl text-xs cursor-not-allowed flex items-center justify-center gap-1.5"
          >
            <Bell size={11} /> Get Notified When Ready
          </button>
        </div>
      </div>
    )
  }

  // ── LIVE PROJECT ───────────────────────────────────────────────────────────
  return (
    <div className="card flex flex-col h-full overflow-hidden group">
      {/* Gradient header */}
      <div className="px-5 pt-5 pb-4" style={{ background: headerGradient }}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl leading-none select-none">{cat.icon}</span>
            <div>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest leading-none mb-0.5">
                {levelLabel}
              </p>
              <p className="text-white font-bold text-sm leading-tight">{catLabel}</p>
            </div>
          </div>
        </div>

        {/* Difficulty + Duration */}
        <div className="flex items-center gap-2 mt-3">
          <span className="flex items-center gap-1.5 bg-white/15 text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: diffColor }} />
            {difficulty}
          </span>
          <span className="flex items-center gap-1.5 bg-white/15 text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
            <Clock size={9} />
            {duration}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {primaryTopic && (
          <div className="flex items-center gap-1.5 mb-2">
            <Tag size={10} className="text-slate-400 shrink-0" />
            <span className="text-slate-500 text-[11px] font-medium truncate">{primaryTopic}</span>
          </div>
        )}

        <h3 className="text-brand-dark font-bold text-[15px] leading-snug mb-2 line-clamp-2 group-hover:text-brand-blue transition-colors duration-200">
          {title}
        </h3>

        <p className="text-slate-500 text-[12px] leading-relaxed mb-4 flex-1 line-clamp-3">
          {summary}
        </p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tech.slice(0, 3).map(t => (
            <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[11px] font-medium">
              {t}
            </span>
          ))}
          {tech.length > 3 && (
            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[11px] font-medium">
              +{tech.length - 3} more
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
            className="flex items-center justify-center gap-1.5 flex-1 py-2.5 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-bold rounded-xl text-[11px] transition-all shadow-sm shadow-green-200"
          >
            <MessageCircle size={11} fill="white" /> Get Project
          </a>
          <Link
            to={`/projects/${id}?tab=setup`}
            onClick={e => e.stopPropagation()}
            className="flex items-center justify-center gap-1.5 flex-1 py-2.5 bg-brand-navy hover:bg-brand-blue active:scale-95 text-white font-bold rounded-xl text-[11px] transition-all"
          >
            <Wrench size={11} /> Build It
          </Link>
        </div>

        {/* Footer link */}
        <div className="pt-3 border-t border-slate-100">
          <Link
            to={`/projects/${id}`}
            className="flex items-center justify-center gap-1 text-slate-400 font-medium text-[11px] hover:text-brand-navy transition-colors"
          >
            Full Details <ChevronRight size={11} />
          </Link>
        </div>
      </div>
    </div>
  )
}
