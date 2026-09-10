import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  ArrowLeft, Clock, Code2, BookOpen, Mic2, CheckCircle2,
  ChevronDown, ChevronUp, Copy, Check, Zap,
} from 'lucide-react'
import { projects, categories, difficultyColors } from '../data/projects'
import { vivaMCQ } from '../data/vivaMCQ'

const TABS = [
  { id: 'overview',  label: 'Overview',    icon: BookOpen },
  { id: 'code',      label: 'Source Code', icon: Code2 },
  { id: 'viva',      label: 'Viva Q&A',    icon: Mic2 },
]

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs rounded-lg transition"
      >
        {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
      </button>
      <pre className="mt-0">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function VivaItem({ qa, index }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start gap-4 px-6 py-5 text-left hover:bg-slate-50 transition"
      >
        <span className="w-8 h-8 rounded-xl bg-brand-orange/10 text-brand-orange text-sm font-bold flex-shrink-0 flex items-center justify-center mt-0.5">
          {index + 1}
        </span>
        <p className="flex-1 font-semibold text-[#0B1D3A] leading-snug">{qa.q}</p>
        {open ? <ChevronUp size={18} className="text-slate-400 flex-shrink-0 mt-0.5" /> : <ChevronDown size={18} className="text-slate-400 flex-shrink-0 mt-0.5" />}
      </button>
      {open && (
        <div className="px-6 pb-5 pt-1">
          <div className="ml-12 p-4 bg-emerald-50 border-l-4 border-emerald-400 rounded-xl">
            <p className="text-slate-700 text-sm leading-relaxed">{qa.a}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ProjectDetail() {
  const { id }          = useParams()
  const project         = projects.find(p => p.id === id)
  const [activeTab, setActiveTab] = useState('overview')

  if (!project) return <Navigate to="/projects" replace />

  const {
    title, category, difficulty, duration, tech, description,
    steps, sourceCode, vivaQA, summary,
  } = project

  const catLabel  = categories.find(c => c.id === category)?.label || category
  const diffColor = difficultyColors[difficulty] || 'bg-slate-100 text-slate-700'

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="hero-bg pt-20 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition"
          >
            <ArrowLeft size={16} /> Back to Projects
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge bg-white/15 text-white">{catLabel}</span>
            <span className={`badge ${diffColor}`}>{difficulty}</span>
            <span className="badge bg-white/10 text-white/80 gap-1.5">
              <Clock size={11} /> {duration}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-white/70 text-lg max-w-3xl">{summary}</p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mt-6">
            {tech.map(t => (
              <span
                key={t}
                className="px-3 py-1 bg-white/10 border border-white/20 text-white/80 rounded-lg text-xs font-medium backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2">
            {TABS.map(({ id: tid, label, icon: Icon }) => (
              <button
                key={tid}
                onClick={() => setActiveTab(tid)}
                className={`tab-btn flex items-center gap-2 ${
                  activeTab === tid ? 'tab-btn-active' : 'tab-btn-inactive'
                }`}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Overview ── */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-2xl border border-slate-100 p-7">
                <h2 className="text-xl font-bold text-[#0B1D3A] mb-4 flex items-center gap-2">
                  <BookOpen size={20} className="text-brand-teal" />
                  Project Description
                </h2>
                {description.split('\n\n').map((para, i) => (
                  <p key={i} className="text-slate-600 leading-relaxed mb-3 last:mb-0">{para}</p>
                ))}
              </div>

              {/* Steps */}
              <div className="bg-white rounded-2xl border border-slate-100 p-7">
                <h2 className="text-xl font-bold text-[#0B1D3A] mb-5 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-brand-orange" />
                  Implementation Steps
                </h2>
                <ol className="space-y-3">
                  {steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-navy to-brand-blue text-white text-xs font-bold flex-shrink-0 flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-slate-700 leading-snug pt-0.5">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <h3 className="font-bold text-[#0B1D3A] mb-4">Project Info</h3>
                <dl className="space-y-3 text-sm">
                  {[
                    ['Category',   catLabel],
                    ['Difficulty', difficulty],
                    ['Duration',   duration],
                    ['Tech Stack', tech.join(', ')],
                  ].map(([k, v]) => (
                    <div key={k} className="flex flex-col gap-0.5">
                      <dt className="text-slate-400 font-medium">{k}</dt>
                      <dd className="text-slate-700 font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="bg-gradient-to-br from-brand-navy to-brand-blue rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-2">Need the Full Project?</h3>
                <p className="text-white/70 text-sm mb-4">Get complete source code, documentation and guidance from our community.</p>
                <button className="w-full py-2.5 bg-brand-orange text-white font-semibold rounded-xl hover:bg-amber-500 transition text-sm">
                  Request Full Code
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Source Code ── */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <div className="flex items-center gap-3 mb-5">
                <Code2 size={20} className="text-brand-teal" />
                <h2 className="text-xl font-bold text-[#0B1D3A]">Source Code</h2>
              </div>
              <p className="text-slate-500 text-sm mb-5">
                Core implementation snippet. Copy and integrate into your project.
              </p>
              <CodeBlock code={sourceCode} />
            </div>

            {/* Tech used */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h3 className="font-bold text-[#0B1D3A] mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {tech.map(t => (
                  <div key={t} className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="w-2 h-2 rounded-full bg-brand-teal" />
                    <span className="font-medium text-slate-700 text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Viva Q&A ── */}
        {activeTab === 'viva' && (
          <div>
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                  <Mic2 size={20} className="text-brand-orange" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0B1D3A]">Viva Questions & Answers</h2>
                  <p className="text-slate-500 text-sm">{vivaQA.length} questions — click any to reveal the answer</p>
                </div>
              </div>

              {/* Mock Test CTA */}
              {vivaMCQ[id] && (
                <Link
                  to={`/projects/${id}/viva-test`}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-brand-orange to-amber-500 text-white font-bold rounded-2xl shadow-lg shadow-amber-200 hover:shadow-amber-300 hover:scale-105 active:scale-95 transition-all text-sm whitespace-nowrap"
                >
                  <Zap size={16} fill="currentColor" />
                  Take Mock Test
                  <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                    {vivaMCQ[id].length}Q
                  </span>
                </Link>
              )}
            </div>

            {/* Mock test preview banner */}
            {vivaMCQ[id] && (
              <div className="mb-6 p-5 bg-gradient-to-r from-brand-navy to-brand-blue rounded-2xl text-white flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <p className="font-bold text-base mb-1">Ready to test yourself?</p>
                  <p className="text-white/70 text-sm">
                    {vivaMCQ[id].length} MCQ questions · 30 sec/question · Concept-wise score · Predicted viva marks out of 10
                  </p>
                </div>
                <Link
                  to={`/projects/${id}/viva-test`}
                  className="px-5 py-2.5 bg-brand-orange text-white font-semibold rounded-xl hover:bg-amber-500 transition text-sm whitespace-nowrap flex-shrink-0"
                >
                  Start Now →
                </Link>
              </div>
            )}

            <div className="space-y-3">
              {vivaQA.map((qa, i) => <VivaItem key={i} qa={qa} index={i} />)}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-brand-navy/5 to-brand-teal/5 rounded-2xl border border-brand-navy/10">
              <p className="text-[#0B1D3A] font-semibold mb-1">Pro Tip for Viva</p>
              <p className="text-slate-600 text-sm">
                Don't just memorize answers — understand the concepts. Examiners often ask follow-up questions.
                Practice explaining your project end-to-end without looking at notes.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
