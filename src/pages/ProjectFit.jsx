import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  CheckSquare, Square, ChevronRight, Zap, Search,
  Trophy, Star, AlertTriangle, XCircle, RefreshCw,
  BookOpen, Mic2, Clock, BarChart2, ArrowRight,
} from 'lucide-react'
import { projects, categories, difficultyColors } from '../data/projects'
import { skillCategories, computeMatch, fitLabel } from '../data/skills'

// ── Skill checkbox ────────────────────────────────────────────────────────────

function SkillChip({ skill, checked, onToggle }) {
  return (
    <button
      onClick={() => onToggle(skill)}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all active:scale-95 ${
        checked
          ? 'bg-brand-navy border-brand-navy text-white shadow-md'
          : 'bg-white border-slate-200 text-slate-600 hover:border-brand-navy hover:text-brand-navy'
      }`}
    >
      {checked
        ? <CheckSquare size={14} className="flex-shrink-0" />
        : <Square      size={14} className="flex-shrink-0 opacity-40" />}
      {skill}
    </button>
  )
}

// ── Result card ───────────────────────────────────────────────────────────────

function FitCard({ project, matchData, rank }) {
  const { score, knownReq, missingReq, knownHelpful, totalReq } = matchData
  const fit      = fitLabel(score)
  const catLabel = categories.find(c => c.id === project.category)?.label || project.category
  const diffCol  = difficultyColors[project.difficulty] || 'bg-slate-100 text-slate-700'
  const isTop    = rank === 1

  return (
    <div className={`bg-white rounded-2xl border overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 ${isTop ? 'border-brand-orange shadow-md shadow-amber-100' : 'border-slate-100'}`}>
      {isTop && (
        <div className="bg-gradient-to-r from-brand-orange to-amber-400 px-5 py-2 flex items-center gap-2">
          <Star size={14} className="text-white" fill="white" />
          <span className="text-white text-xs font-bold">Best Match for You</span>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className={`badge ${diffCol}`}>{project.difficulty}</span>
              <span className="badge bg-slate-100 text-slate-600">{catLabel}</span>
            </div>
            <h3 className="font-bold text-[#0B1D3A] leading-snug">{project.title}</h3>
          </div>

          {/* Score donut */}
          <div className="flex-shrink-0 text-center">
            <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center ${
              score >= 75 ? 'border-emerald-400' : score >= 50 ? 'border-amber-400' : score >= 25 ? 'border-orange-400' : 'border-red-400'
            }`}>
              <span className="font-extrabold text-lg text-[#0B1D3A]">{score}<span className="text-xs font-normal text-slate-400">%</span></span>
            </div>
            <p className={`text-xs font-semibold mt-1 ${fit.color}`}>{fit.label}</p>
          </div>
        </div>

        {/* Match bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>Skill match</span>
            <span>{knownReq.length}/{totalReq} required skills</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className={`h-full rounded-full ${fit.bar} transition-all duration-700`} style={{ width: `${score}%` }} />
          </div>
        </div>

        {/* Skills you have */}
        {knownReq.length > 0 && (
          <div className="mb-2">
            <p className="text-xs font-semibold text-slate-400 mb-1.5">Skills you have ✓</p>
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

        {/* Missing skills */}
        {missingReq.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-slate-400 mb-1.5">You'd need to learn</p>
            <div className="flex flex-wrap gap-1.5">
              {missingReq.map(s => (
                <span key={s} className="px-2 py-0.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium border border-red-100">{s}</span>
              ))}
            </div>
          </div>
        )}

        {missingReq.length === 0 && (
          <p className="text-emerald-600 text-xs font-semibold mb-3">🎉 You have all required skills — ready to start!</p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <Clock size={12} />
            {project.duration}
          </div>
          <Link
            to={`/projects/${project.id}`}
            className="flex items-center gap-1 text-brand-navy text-sm font-semibold hover:text-brand-orange transition-colors"
          >
            View Project <ChevronRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ProjectFit() {
  const [selected, setSelected]     = useState(new Set())
  const [showResults, setShowResults] = useState(false)
  const [filterFit, setFilterFit]   = useState('all')

  const toggleSkill = (skill) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(skill) ? next.delete(skill) : next.add(skill)
      return next
    })
    setShowResults(false)
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
    if (filterFit === 'all') return rankedResults
    if (filterFit === 'ready') return rankedResults.filter(r => r.match.missingReq.length === 0)
    if (filterFit === 'close') return rankedResults.filter(r => r.match.score >= 50 && r.match.missingReq.length > 0)
    return rankedResults
  }, [rankedResults, filterFit])

  const topScore   = rankedResults[0]?.match.score ?? 0
  const readyCount = rankedResults.filter(r => r.match.missingReq.length === 0).length

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="hero-bg py-20 pt-28">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-brand-orange text-sm font-semibold mb-5">
            <Zap size={14} fill="currentColor" /> Project Fit Recommender
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Find the Perfect Project<br />for Your Skill Set
          </h1>
          <p className="text-white/70 text-lg">
            Select the technologies and concepts you already know.
            We'll rank every project by how well it matches — and show you exactly what you'd need to learn.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* ── Skills Picker ── */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-bold text-[#0B1D3A]">What do you already know?</h2>
              <p className="text-slate-400 text-sm mt-0.5">
                {selected.size > 0
                  ? `${selected.size} skill${selected.size > 1 ? 's' : ''} selected`
                  : 'Select every technology and concept you are comfortable with'}
              </p>
            </div>
            {selected.size > 0 && (
              <button onClick={clearAll} className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 text-sm transition">
                <RefreshCw size={13} /> Clear all
              </button>
            )}
          </div>

          <div className="space-y-6">
            {skillCategories.map(cat => (
              <div key={cat.id}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-slate-600 flex items-center gap-1.5">
                    <span>{cat.icon}</span> {cat.label}
                  </p>
                  <button
                    onClick={() => selectAll(cat.skills)}
                    className="text-xs text-brand-navy font-medium hover:text-brand-orange transition"
                  >
                    Select all
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map(skill => (
                    <SkillChip
                      key={skill}
                      skill={skill}
                      checked={selected.has(skill)}
                      onToggle={toggleSkill}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
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

        {/* ── Results ── */}
        {showResults && (
          <div>
            {/* Summary strip */}
            <div className="bg-gradient-to-r from-brand-navy to-brand-blue rounded-2xl p-6 text-white mb-6 flex flex-wrap gap-6 items-center">
              <div>
                <p className="text-white/60 text-sm">Best match</p>
                <p className="text-3xl font-extrabold">{topScore}%</p>
              </div>
              <div className="w-px h-10 bg-white/20 hidden sm:block" />
              <div>
                <p className="text-white/60 text-sm">Ready to start now</p>
                <p className="text-3xl font-extrabold">{readyCount}</p>
              </div>
              <div className="w-px h-10 bg-white/20 hidden sm:block" />
              <div>
                <p className="text-white/60 text-sm">Skills selected</p>
                <p className="text-3xl font-extrabold">{selected.size}</p>
              </div>
              <div className="sm:ml-auto">
                <p className="text-white/70 text-sm max-w-xs leading-relaxed">
                  {readyCount > 0
                    ? `You can start ${readyCount} project${readyCount > 1 ? 's' : ''} with your current skills right now.`
                    : 'Add more skills or pick a project to learn as you build.'}
                </p>
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-5 flex-wrap">
              {[
                { id: 'all',   label: `All (${rankedResults.length})` },
                { id: 'ready', label: `Ready to Start (${readyCount})` },
                { id: 'close', label: 'Close Matches' },
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
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: CheckSquare, title: 'Select Your Skills', desc: 'Check every technology you know from the list above — languages, frameworks, tools.' },
              { icon: BarChart2,   title: 'See Match Scores',  desc: 'Each project gets a match % based on your skills. Missing skills are listed clearly.' },
              { icon: Trophy,      title: 'Pick & Start',       desc: 'Start from your best-match project, or stretch yourself with a challenging one.' },
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
        )}
      </div>
    </div>
  )
}
