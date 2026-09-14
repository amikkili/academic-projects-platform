import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Check, ChevronDown, ChevronRight, Zap, Search,
  Trophy, Star, RefreshCw,
  BookOpen, Mic2, Clock, BarChart2, ArrowRight, MessageCircle, Wrench,
} from 'lucide-react'
import { projects, categories, difficultyColors } from '../data/projects'
import { skillCategories, computeMatch, fitLabel } from '../data/skills'
import { WHATSAPP } from '../data/projectMeta'

function waLink(title) {
  const msg = encodeURIComponent(`Hi! I'm interested in the "${title}" project. Can you help me?`)
  return `https://wa.me/${WHATSAPP}?text=${msg}`
}

// ── Skill pill ────────────────────────────────────────────────────────────────

function SkillChip({ skill, checked, onToggle }) {
  return (
    <button
      onClick={() => onToggle(skill)}
      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-[13px] font-medium transition-all active:scale-95 ${
        checked
          ? 'bg-brand-navy border-brand-navy text-white shadow-sm'
          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-brand-navy/50 hover:bg-white'
      }`}
    >
      {checked && <Check size={11} className="shrink-0" strokeWidth={3} />}
      {skill}
    </button>
  )
}

// ── Result card ───────────────────────────────────────────────────────────────

function FitCard({ project, matchData, rank }) {
  const { score, jaccard, knownReq, missingReq, knownHelpful, totalReq } = matchData
  const fit       = fitLabel(score)
  const catLabel  = categories.find(c => c.id === project.category)?.label || project.category
  const diffCol   = difficultyColors[project.difficulty] || 'bg-slate-100 text-slate-700'
  const isTop     = rank === 1
  const isStretch = fit.zone === 'stretch'
  const isPerfect = fit.zone === 'perfect'

  return (
    <div className={`bg-white rounded-2xl border overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 ${
      isTop && isPerfect ? 'border-brand-orange shadow-md shadow-amber-100' :
      isStretch          ? 'border-amber-300 shadow-sm shadow-amber-50' :
                           'border-slate-100'
    }`}>
      {/* Zone banner */}
      {isTop && isPerfect ? (
        <div className="bg-gradient-to-r from-brand-orange to-amber-400 px-5 py-2 flex items-center gap-2">
          <Star size={14} className="text-white" fill="white" />
          <span className="text-white text-xs font-bold">Best Match for You</span>
        </div>
      ) : isStretch ? (
        <div className="bg-gradient-to-r from-amber-400 to-yellow-300 px-5 py-2 flex items-center gap-2">
          <Zap size={14} className="text-amber-900" fill="currentColor" />
          <span className="text-amber-900 text-xs font-bold">Sweet Spot — Ideal for Growth</span>
        </div>
      ) : null}

      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className={`badge ${diffCol}`}>{project.difficulty}</span>
              <span className="badge bg-slate-100 text-slate-600">{catLabel}</span>
              <span className={`badge border ${fit.tagBg}`}>{fit.emoji} {fit.label}</span>
            </div>
            <h3 className="font-bold text-[#0B1D3A] leading-snug">{project.title}</h3>
          </div>

          {/* Score donut */}
          <div className="flex-shrink-0 text-center">
            <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center ${
              isPerfect ? 'border-emerald-400' : isStretch ? 'border-amber-400' : 'border-red-400'
            }`}>
              <span className="font-extrabold text-lg text-[#0B1D3A]">{score}<span className="text-xs font-normal text-slate-400">%</span></span>
            </div>
            <p className={`text-[10px] font-semibold mt-1 text-slate-400`}>Jaccard {jaccard}%</p>
          </div>
        </div>

        {/* Match bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>Skill coverage</span>
            <span>{knownReq.length}/{totalReq} required</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className={`h-full rounded-full ${fit.bar} transition-all duration-700`} style={{ width: `${score}%` }} />
          </div>
        </div>

        {/* Skills you have */}
        {knownReq.length > 0 && (
          <div className="mb-2">
            <p className="text-xs font-semibold text-slate-400 mb-1.5">Skills you already have</p>
            <div className="flex flex-wrap gap-1.5">
              {knownReq.map(s => (
                <span key={s} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium border border-emerald-100">{s}</span>
              ))}
              {knownHelpful.map(s => (
                <span key={s} className="px-2 py-0.5 bg-teal-50 text-teal-700 rounded-lg text-xs font-medium border border-teal-100">{s} <span className="opacity-60">(bonus)</span></span>
              ))}
            </div>
          </div>
        )}

        {/* Learning delta — the core Jaccard output */}
        {missingReq.length > 0 ? (
          <div className="mb-3 p-3 rounded-xl bg-amber-50 border border-amber-100">
            <p className="text-xs font-bold text-amber-800 mb-1.5 flex items-center gap-1">
              <BookOpen size={12} /> You'll learn building this ({missingReq.length} new skill{missingReq.length > 1 ? 's' : ''})
            </p>
            <div className="flex flex-wrap gap-1.5">
              {missingReq.map(s => (
                <span key={s} className="px-2 py-0.5 bg-white text-amber-700 rounded-lg text-xs font-medium border border-amber-200">{s}</span>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-emerald-600 text-xs font-semibold mb-3">🎉 You have all required skills — ready to start!</p>
        )}

        {/* CTAs */}
        <div className="flex gap-2 mb-3">
          <a
            href={waLink(project.title)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 flex-1 py-2.5 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-bold rounded-xl text-xs transition-all shadow-sm"
          >
            <MessageCircle size={13} fill="white" /> Get This Project
          </a>
          <Link
            to={`/projects/${project.id}?tab=setup`}
            className="flex items-center justify-center gap-1.5 flex-1 py-2.5 bg-brand-navy hover:bg-brand-blue active:scale-95 text-white font-bold rounded-xl text-xs transition-all"
          >
            <Wrench size={13} /> Build It Myself
          </Link>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <Clock size={12} />
            {project.duration}
          </div>
          <Link
            to={`/projects/${project.id}`}
            className="flex items-center gap-1 text-slate-400 text-xs font-medium hover:text-brand-navy transition-colors"
          >
            Full Details <ChevronRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ProjectFit() {
  const [selected, setSelected]       = useState(new Set())
  const [showResults, setShowResults] = useState(false)
  const [filterFit, setFilterFit]     = useState('all')
  // All categories open by default
  const [openCats, setOpenCats]       = useState(() => new Set(skillCategories.map(c => c.id)))

  const toggleSkill = (skill) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(skill) ? next.delete(skill) : next.add(skill)
      return next
    })
    setShowResults(false)
  }

  const toggleCat = (id) => {
    setOpenCats(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const selectAll = (catSkills) => {
    setSelected(prev => {
      const next = new Set(prev)
      catSkills.forEach(s => next.add(s))
      return next
    })
    setShowResults(false)
  }

  const clearAll = () => {
    setSelected(new Set())
    setShowResults(false)
  }

  // Ranked project results
  const rankedResults = useMemo(() => {
    return projects
      .map(p => ({ project: p, match: computeMatch(p.id, selected) }))
      .sort((a, b) => b.match.score - a.match.score)
  }, [selected])

  const filteredResults = useMemo(() => {
    if (filterFit === 'perfect')  return rankedResults.filter(r => r.match.score >= 80)
    if (filterFit === 'stretch')  return rankedResults.filter(r => r.match.score >= 50 && r.match.score < 80)
    if (filterFit === 'advanced') return rankedResults.filter(r => r.match.score < 50)
    return rankedResults
  }, [rankedResults, filterFit])

  const topScore      = rankedResults[0]?.match.score ?? 0
  const perfectCount  = rankedResults.filter(r => r.match.score >= 80).length
  const stretchCount  = rankedResults.filter(r => r.match.score >= 50 && r.match.score < 80).length
  const advancedCount = rankedResults.filter(r => r.match.score < 50).length

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="hero-bg py-10 pt-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Find the Perfect Project for Your Skill Set
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            Select the technologies you know — we'll rank every project by how well it matches.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 sm:pb-10 space-y-8">

        {/* ── Skills Picker ── */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-5 pt-6 pb-4 sm:px-7 sm:pt-7">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[#0B1D3A]">What do you already know?</h2>
                <p className="text-slate-400 text-sm mt-0.5">
                  Select every technology and concept you are comfortable with
                </p>
              </div>
              {selected.size > 0 && (
                <div className="flex items-center gap-3 shrink-0 mt-0.5">
                  <span className="bg-brand-navy text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {selected.size} selected
                  </span>
                  <button onClick={clearAll} className="text-slate-400 hover:text-slate-600 transition" title="Clear all">
                    <RefreshCw size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Category accordions */}
          <div className="divide-y divide-slate-100">
            {skillCategories.map(cat => {
              const catCount = cat.skills.filter(s => selected.has(s)).length
              const isOpen   = openCats.has(cat.id)
              return (
                <div key={cat.id}>
                  {/* Category header — tap to toggle */}
                  <button
                    onClick={() => toggleCat(cat.id)}
                    className="w-full flex items-center justify-between px-5 py-3.5 sm:px-7 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base leading-none">{cat.icon}</span>
                      <span className="text-sm font-semibold text-slate-700">{cat.label}</span>
                      {catCount > 0 && (
                        <span className="bg-brand-navy text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
                          {catCount}
                        </span>
                      )}
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Skills grid */}
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 sm:px-7 flex flex-wrap gap-2">
                      {cat.skills.map(skill => (
                        <SkillChip
                          key={skill}
                          skill={skill}
                          checked={selected.has(skill)}
                          onToggle={toggleSkill}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Footer CTA — desktop only (mobile uses fixed bar below) */}
          <div className="hidden sm:flex px-7 py-5 border-t border-slate-100 items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              {selected.size === 0
                ? 'Select at least one skill to see recommendations'
                : `Matching against ${projects.length} projects…`}
            </p>
            <button
              onClick={() => { if (selected.size > 0) setShowResults(true) }}
              disabled={selected.size === 0}
              className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                selected.size > 0
                  ? 'bg-brand-orange text-white hover:bg-amber-500 active:scale-95 shadow-lg shadow-amber-200'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Search size={16} /> Find My Projects
            </button>
          </div>
        </div>

        {/* ── Fixed mobile bottom bar ── */}
        <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 px-4 py-3 flex items-center gap-3">
          {selected.size > 0 && (
            <span className="text-xs text-slate-500 font-medium shrink-0">
              {selected.size} skill{selected.size > 1 ? 's' : ''}
            </span>
          )}
          <button
            onClick={() => { if (selected.size > 0) setShowResults(true) }}
            disabled={selected.size === 0}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all ${
              selected.size > 0
                ? 'bg-brand-orange text-white active:scale-95 shadow-md shadow-amber-200'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Search size={15} />
            {selected.size > 0 ? `Find Projects` : 'Select skills above'}
          </button>
        </div>

        {/* ── Results ── */}
        {showResults && (
          <div>
            {/* Summary strip — 3-zone breakdown */}
            <div className="bg-gradient-to-r from-brand-navy to-brand-blue rounded-2xl p-6 text-white mb-6">
              <div className="flex flex-wrap gap-6 items-center mb-4">
                <div>
                  <p className="text-white/60 text-sm">Best match</p>
                  <p className="text-3xl font-extrabold">{topScore}%</p>
                </div>
                <div className="w-px h-10 bg-white/20 hidden sm:block" />
                <div>
                  <p className="text-white/60 text-sm">Skills selected</p>
                  <p className="text-3xl font-extrabold">{selected.size}</p>
                </div>
                <div className="sm:ml-auto text-right">
                  <p className="text-white/70 text-sm max-w-xs leading-relaxed">
                    {stretchCount > 0
                      ? `${stretchCount} Stretch Project${stretchCount > 1 ? 's' : ''} are your sweet spot — you'll grow fast building them.`
                      : perfectCount > 0
                        ? `${perfectCount} project${perfectCount > 1 ? 's' : ''} are a perfect fit — start building right now.`
                        : 'Add more skills to unlock better matches.'}
                  </p>
                </div>
              </div>
              {/* Zone pills */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                  <span className="text-base">🟢</span>
                  <div>
                    <p className="text-white text-sm font-bold leading-none">{perfectCount}</p>
                    <p className="text-white/50 text-xs">Perfect Fit</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 rounded-xl px-4 py-2">
                  <span className="text-base">🟡</span>
                  <div>
                    <p className="text-white text-sm font-bold leading-none">{stretchCount}</p>
                    <p className="text-amber-200 text-xs">Stretch Projects ✦ Sweet Spot</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                  <span className="text-base">🔴</span>
                  <div>
                    <p className="text-white text-sm font-bold leading-none">{advancedCount}</p>
                    <p className="text-white/50 text-xs">Too Advanced</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-5 flex-wrap">
              {[
                { id: 'all',      label: `All (${rankedResults.length})` },
                { id: 'perfect',  label: `🟢 Perfect Fit (${perfectCount})` },
                { id: 'stretch',  label: `🟡 Stretch Zone (${stretchCount})` },
                { id: 'advanced', label: `🔴 Too Advanced (${advancedCount})` },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterFit(f.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    filterFit === f.id
                      ? 'bg-brand-navy text-white shadow'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-navy'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Project cards */}
            {filteredResults.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-5">
                {filteredResults.map(({ project, match }, i) => (
                  <FitCard key={project.id} project={project} matchData={match} rank={i + 1} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                <p className="text-slate-400 font-medium">No projects match this filter.</p>
                <button onClick={() => setFilterFit('all')} className="mt-3 text-brand-navy text-sm font-semibold hover:underline">
                  Show all projects
                </button>
              </div>
            )}

            {/* CTA at bottom */}
            <div className="mt-8 p-6 bg-white rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1">
                <p className="font-bold text-[#0B1D3A] mb-1">Want to test yourself first?</p>
                <p className="text-slate-500 text-sm">Take a Viva Mock Test for your top-matched project and see your predicted score.</p>
              </div>
              {rankedResults[0] && (
                <Link
                  to={`/projects/${rankedResults[0].project.id}/viva-test`}
                  className="flex items-center gap-2 px-5 py-3 bg-brand-orange text-white font-bold rounded-xl hover:bg-amber-500 transition text-sm whitespace-nowrap"
                >
                  <Mic2 size={15} /> Take Viva Test <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </div>
        )}

        {/* ── Empty state (before selecting skills) ── */}
        {!showResults && selected.size === 0 && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: Check, title: 'Select Your Skills', desc: 'Check every technology you know — languages, frameworks, tools, databases.' },
                { icon: BarChart2,   title: 'Jaccard Similarity Score', desc: 'Each project is ranked by how much of its required skill set you already cover.' },
                { icon: Trophy,      title: 'Find Your Sweet Spot',     desc: 'Aim for 🟡 Stretch Projects (50-80%) — you grow fastest building projects that challenge you just enough.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white rounded-2xl border border-slate-100 p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-brand-navy/10 flex items-center justify-center mx-auto mb-3">
                    <Icon size={22} className="text-brand-navy" />
                  </div>
                  <p className="font-bold text-[#0B1D3A] mb-1">{title}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            {/* Zone legend */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <p className="text-sm font-bold text-slate-600 mb-3">How projects are scored</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { emoji: '🟢', zone: 'Perfect Fit', range: '≥ 80%', desc: 'You know most or all required skills. Ready to build right now.', cls: 'bg-emerald-50 border-emerald-200' },
                  { emoji: '🟡', zone: 'Stretch Project', range: '50–79%', desc: 'Sweet spot. You\'ll learn new skills while applying what you know — fastest growth zone.', cls: 'bg-amber-50 border-amber-200' },
                  { emoji: '🔴', zone: 'Too Advanced', range: '< 50%', desc: 'You\'d need to learn more than half the stack. Worth bookmarking for later.', cls: 'bg-red-50 border-red-100' },
                ].map(z => (
                  <div key={z.zone} className={`rounded-xl border p-4 ${z.cls}`}>
                    <p className="text-lg mb-1">{z.emoji}</p>
                    <p className="font-bold text-[#0B1D3A] text-sm">{z.zone} <span className="font-normal text-slate-400">{z.range}</span></p>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">{z.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
