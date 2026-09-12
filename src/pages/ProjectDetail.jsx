import { useState } from 'react'
import { useParams, Link, Navigate, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft, Clock, Code2, BookOpen, Mic2, CheckCircle2,
  ChevronDown, ChevronUp, Copy, Check, Zap, Briefcase,
  MessageCircle, Download, Video, Package, MonitorPlay,
  FileText, Wrench, AlertCircle, ExternalLink, Star, Layers,
  Rocket, Globe, Info, Github,
} from 'lucide-react'
import { projects, categories, difficultyColors } from '../data/projects'
import { vivaMCQ } from '../data/vivaMCQ'
import { projectMeta, WHATSAPP } from '../data/projectMeta'
import { API_BASE } from '../lib/api'

const TABS = [
  { id: 'overview', label: 'Overview',    icon: BookOpen },
  { id: 'setup',    label: 'Setup Guide', icon: Wrench },
  { id: 'code',     label: 'Source Code', icon: Code2 },
  { id: 'deploy',   label: 'Deploy',      icon: Rocket },
  { id: 'viva',     label: 'Viva Q&A',   icon: Mic2 },
]

// ── What's included items ─────────────────────────────────────────────────────

const DELIVERABLES = [
  { icon: Code2,         label: 'Full Source Code',   desc: 'Complete working project' },
  { icon: Layers,        label: 'PPT Download',       desc: '14 slides, auto-generated' },
  { icon: MonitorPlay,   label: 'Setup Video',        desc: 'Import & run in VS Code' },
  { icon: Mic2,          label: 'Viva Preparation',   desc: '20+ Q&A + Mock Test' },
  { icon: MessageCircle, label: 'WhatsApp Support',   desc: 'Direct doubt clearing' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function whatsappLink(title) {
  const msg = encodeURIComponent(
    `Hi! I'm interested in the "${title}" project. Can you help me?`
  )
  return `https://wa.me/${WHATSAPP}?text=${msg}`
}

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
      <pre className="mt-0"><code>{code}</code></pre>
    </div>
  )
}

function ScreenshotGallery({ screenshots }) {
  const [active, setActive] = useState(0)
  if (!screenshots || screenshots.length === 0) return null
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="px-7 pt-6 pb-4 border-b border-slate-100 flex items-center gap-2">
        <MonitorPlay size={20} className="text-brand-orange" />
        <h2 className="text-xl font-bold text-[#0B1D3A]">Project Preview</h2>
        <span className="ml-auto text-xs text-slate-400 font-medium">What you will build</span>
      </div>

      {/* Main image */}
      <div className="relative bg-slate-900 flex items-center justify-center overflow-hidden" style={{ minHeight: '280px' }}>
        <img
          key={active}
          src={screenshots[active].url}
          alt={screenshots[active].label}
          className="w-full object-contain max-h-[420px]"
          style={{ display: 'block' }}
        />
        {/* Prev / Next arrows */}
        {screenshots.length > 1 && (
          <>
            <button
              onClick={() => setActive(i => (i - 1 + screenshots.length) % screenshots.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition"
            >
              ‹
            </button>
            <button
              onClick={() => setActive(i => (i + 1) % screenshots.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition"
            >
              ›
            </button>
          </>
        )}
        {/* Label overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-3">
          <p className="text-white text-sm font-medium">{screenshots[active].label}</p>
        </div>
      </div>

      {/* Thumbnail strip */}
      {screenshots.length > 1 && (
        <div className="flex gap-2 p-4 bg-slate-50 overflow-x-auto">
          {screenshots.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 rounded-xl overflow-hidden border-2 transition ${
                active === i ? 'border-brand-orange shadow-md' : 'border-transparent opacity-60 hover:opacity-90'
              }`}
              style={{ width: 120 }}
            >
              <img src={s.url} alt={s.label} className="w-full h-16 object-cover object-top" />
            </button>
          ))}
        </div>
      )}
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
        {open
          ? <ChevronUp size={18} className="text-slate-400 flex-shrink-0 mt-0.5" />
          : <ChevronDown size={18} className="text-slate-400 flex-shrink-0 mt-0.5" />}
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

// ── Main Page ─────────────────────────────────────────────────────────────────

const DIFFICULTIES = [
  { key: 'easy',   label: 'Easy',   color: 'text-emerald-700 bg-emerald-50 border-emerald-200', activeColor: 'bg-emerald-500 text-white border-emerald-500' },
  { key: 'medium', label: 'Medium', color: 'text-amber-700 bg-amber-50 border-amber-200',       activeColor: 'bg-amber-500 text-white border-amber-500' },
  { key: 'hard',   label: 'Hard',   color: 'text-red-700 bg-red-50 border-red-200',             activeColor: 'bg-red-500 text-white border-red-500' },
]

function GeneratedVivaItem({ qa, index }) {
  const [open, setOpen] = useState(false)
  const conceptColors = {
    easy:   'bg-emerald-100 text-emerald-700',
    medium: 'bg-amber-100 text-amber-700',
    hard:   'bg-red-100 text-red-700',
  }
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start gap-4 px-6 py-5 text-left hover:bg-slate-50 transition"
      >
        <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 text-sm font-bold flex-shrink-0 flex items-center justify-center mt-0.5">
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[#0B1D3A] leading-snug">{qa.q}</p>
          <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-md text-xs font-medium ${conceptColors[qa.difficulty] || 'bg-slate-100 text-slate-600'}`}>
            {qa.concept}
          </span>
        </div>
        {open
          ? <ChevronUp size={18} className="text-slate-400 flex-shrink-0 mt-0.5" />
          : <ChevronDown size={18} className="text-slate-400 flex-shrink-0 mt-0.5" />}
      </button>
      {open && (
        <div className="px-6 pb-5 pt-1">
          <div className="ml-12 p-4 bg-purple-50 border-l-4 border-purple-400 rounded-xl">
            <p className="text-slate-700 text-sm leading-relaxed">{qa.a}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ProjectDetail() {
  const { id }    = useParams()
  const [searchParams] = useSearchParams()
  const project   = projects.find(p => p.id === id)
  const meta      = projectMeta[id] || {}
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview')

  // Viva generator state
  const [vivaGenDifficulty, setVivaGenDifficulty] = useState('easy')
  const [vivaGenCount,      setVivaGenCount]      = useState(8)
  const [vivaGenSeed,       setVivaGenSeed]       = useState('')
  const [vivaGenLoading,    setVivaGenLoading]    = useState(false)
  const [vivaGenError,      setVivaGenError]      = useState('')
  const [vivaGenResults,    setVivaGenResults]    = useState(null)

  // PPT download state
  const [pptName,           setPptName]           = useState('')
  const [pptBranch,         setPptBranch]         = useState('')
  const [pptYear,           setPptYear]           = useState('')
  const [pptLoading,        setPptLoading]        = useState(false)
  const [pptError,          setPptError]          = useState('')

  function handleDownloadPPT() {
    setPptLoading(true)
    setPptError('')
    const params = new URLSearchParams({
      name:   pptName.trim(),
      branch: pptBranch.trim(),
      year:   pptYear.trim(),
    })
    const url = `${API_BASE}/ppt/${id}?${params}`
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Server error ${res.status}`)
        return res.blob()
      })
      .then(blob => {
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `${id}_project_ppt.pptx`
        link.click()
        URL.revokeObjectURL(link.href)
      })
      .catch(() => setPptError('Backend not running. Start the FastAPI server first.'))
      .finally(() => setPptLoading(false))
  }

  async function handleGenerateViva() {
    setVivaGenLoading(true)
    setVivaGenError('')
    setVivaGenResults(null)
    try {
      const res = await fetch(`${API_BASE}/viva/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_id: id,
          difficulty: vivaGenDifficulty,
          count:      vivaGenCount,
          user_seed:  vivaGenSeed.trim() || 'anonymous',
        }),
      })
      if (!res.ok) throw new Error(`Server error ${res.status}`)
      const data = await res.json()
      setVivaGenResults(data.questions || [])
    } catch (err) {
      setVivaGenError('Could not connect to the backend. Make sure it is running.')
    } finally {
      setVivaGenLoading(false)
    }
  }

  if (!project) return <Navigate to="/projects" replace />

  const { title, category, difficulty, duration, tech, description, steps, sourceCode, vivaQA, summary, screenshots } = project
  const {
    prerequisites = [],
    ideSteps = [],
    setupVideoUrl = null,
    deployPlatform = '',
    deployNote = '',
    deploySteps = [],
    repoUrl = null,
  } = meta

  const catLabel  = categories.find(c => c.id === category)?.label || category
  const diffColor = difficultyColors[difficulty] || 'bg-slate-100 text-slate-700'
  const waLink    = whatsappLink(title)

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero ── */}
      <div className="hero-bg pt-20 pb-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/projects" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition">
            <ArrowLeft size={16} /> Back to Projects
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge bg-white/15 text-white">{catLabel}</span>
            <span className={`badge ${diffColor}`}>{difficulty}</span>
            <span className="badge bg-white/10 text-white/80 gap-1.5"><Clock size={11} /> {duration}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">{title}</h1>
              <p className="text-white/70 text-base max-w-2xl">{summary}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {tech.map(t => (
                  <span key={t} className="px-3 py-1 bg-white/10 border border-white/20 text-white/80 rounded-lg text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero CTA */}
            <div className="flex-shrink-0 flex flex-col gap-2">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-bold rounded-2xl shadow-lg shadow-green-900/30 transition-all text-sm whitespace-nowrap"
              >
                <MessageCircle size={17} fill="white" /> Get This Project
              </a>
              <button
                onClick={() => setActiveTab('overview')}
                className="flex items-center justify-center gap-1.5 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white/80 text-sm font-medium rounded-2xl transition border border-white/20"
              >
                <BookOpen size={14} /> I'll build it myself
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── What You Get strip ── */}
      <div className="bg-[#0B1D3A] border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div className="flex flex-wrap gap-4">
              {DELIVERABLES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-white/70 text-sm">
                  <Icon size={14} className="text-green-400 flex-shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition text-sm whitespace-nowrap"
            >
              <MessageCircle size={15} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div className="sticky top-[60px] z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2 overflow-x-auto scrollbar-none">
            {TABS.map(({ id: tid, label, icon: Icon }) => (
              <button
                key={tid}
                onClick={() => setActiveTab(tid)}
                className={`tab-btn flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${
                  activeTab === tid ? 'tab-btn-active' : 'tab-btn-inactive'
                }`}
              >
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab content ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Overview ── */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">

              {/* Track choice */}
              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col gap-2 p-5 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2 font-bold text-base">
                    <Package size={18} /> Get Ready Project
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Receive the complete working project with source code, PPT, setup video, and viva prep. We explain everything.
                  </p>
                  <span className="mt-1 text-xs font-semibold bg-white/20 rounded-lg px-3 py-1 w-fit">
                    WhatsApp us to get started →
                  </span>
                </a>

                <button
                  onClick={() => setActiveTab('setup')}
                  className="flex flex-col gap-2 p-5 rounded-2xl bg-gradient-to-br from-brand-navy to-brand-blue text-white hover:shadow-lg hover:-translate-y-0.5 transition-all text-left"
                >
                  <div className="flex items-center gap-2 font-bold text-base">
                    <Wrench size={18} /> Build It Yourself
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Want to learn by doing? Follow the step-by-step guide, setup instructions, and use the source code as reference.
                  </p>
                  <span className="mt-1 text-xs font-semibold bg-white/20 rounded-lg px-3 py-1 w-fit">
                    View Setup Guide →
                  </span>
                </button>
              </div>

              {/* Screenshot gallery */}
              <ScreenshotGallery screenshots={screenshots} />

              {/* Description */}
              <div className="bg-white rounded-2xl border border-slate-100 p-7">
                <h2 className="text-xl font-bold text-[#0B1D3A] mb-4 flex items-center gap-2">
                  <BookOpen size={20} className="text-brand-teal" /> Project Description
                </h2>
                {description.split('\n\n').map((para, i) => (
                  <p key={i} className="text-slate-600 leading-relaxed mb-3 last:mb-0">{para}</p>
                ))}
              </div>

              {/* Steps */}
              <div className="bg-white rounded-2xl border border-slate-100 p-7">
                <h2 className="text-xl font-bold text-[#0B1D3A] mb-5 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-brand-orange" /> Implementation Steps
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
              {/* Get Project card */}
              <div className="bg-gradient-to-br from-[#0B1D3A] to-brand-blue rounded-2xl p-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Star size={16} className="text-brand-orange" fill="currentColor" />
                  <h3 className="font-bold text-base">Get the Full Project</h3>
                </div>
                <p className="text-white/60 text-sm mb-4 leading-relaxed">
                  We provide everything you need — source code, PPT, setup guide, viva prep, and personal explanation.
                </p>
                <ul className="space-y-2 mb-5">
                  {DELIVERABLES.map(({ icon: Icon, label, desc }) => (
                    <li key={label} className="flex items-center gap-2 text-sm">
                      <Icon size={13} className="text-green-400 flex-shrink-0" />
                      <span className="text-white/80 font-medium">{label}</span>
                      <span className="text-white/40 text-xs">— {desc}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-bold rounded-xl transition text-sm"
                >
                  <MessageCircle size={16} fill="white" /> Chat on WhatsApp
                </a>
              </div>

              {/* Project Info */}
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

              {/* Viva shortcut */}
              {vivaMCQ[id] && (
                <Link
                  to={`/projects/${id}/viva-test`}
                  className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl hover:bg-amber-100 transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                    <Zap size={18} className="text-brand-orange" fill="currentColor" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0B1D3A] text-sm group-hover:text-brand-orange transition">Practice Viva Now</p>
                    <p className="text-slate-500 text-xs">{vivaMCQ[id].length} MCQ mock test</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* ── Setup Guide ── */}
        {activeTab === 'setup' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">

              {/* WhatsApp nudge */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-2xl">
                <div className="flex-1">
                  <p className="font-bold text-green-900 text-sm mb-0.5">Want personal guidance while you build?</p>
                  <p className="text-green-700 text-xs leading-relaxed">
                    We'll explain the project, help you set it up, and debug errors with you on WhatsApp — step by step.
                  </p>
                </div>
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi! I want to build the "${title}" project myself. Can you guide me through it?`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-sm transition whitespace-nowrap flex-shrink-0"
                >
                  <MessageCircle size={15} fill="white" /> Chat on WhatsApp
                </a>
              </div>

              {/* Setup video */}
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                  <Video size={20} className="text-brand-teal" />
                  <h2 className="text-xl font-bold text-[#0B1D3A]">Setup Walkthrough Video</h2>
                </div>
                {setupVideoUrl ? (
                  <div className="aspect-video">
                    <iframe
                      src={setupVideoUrl}
                      title="Project Setup Video"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-slate-900 flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                      <Video size={28} className="text-white/40" />
                    </div>
                    <p className="text-white/50 font-medium text-sm">Setup video coming soon</p>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl text-sm transition"
                    >
                      <MessageCircle size={14} /> Get a Live Walkthrough on WhatsApp
                    </a>
                  </div>
                )}
              </div>

              {/* Prerequisites */}
              <div className="bg-white rounded-2xl border border-slate-100 p-7">
                <h2 className="text-xl font-bold text-[#0B1D3A] mb-2 flex items-center gap-2">
                  <AlertCircle size={20} className="text-amber-500" /> Prerequisites
                </h2>
                <p className="text-slate-500 text-sm mb-5">Install these before opening the project.</p>
                <ul className="space-y-3">
                  {prerequisites.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* VS Code setup steps */}
              <div className="bg-white rounded-2xl border border-slate-100 p-7">
                <h2 className="text-xl font-bold text-[#0B1D3A] mb-5 flex items-center gap-2">
                  <MonitorPlay size={20} className="text-brand-orange" /> How to Run in VS Code
                </h2>
                <ol className="space-y-4">
                  {ideSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-orange to-amber-500 text-white text-xs font-bold flex-shrink-0 flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-slate-700 text-sm leading-relaxed pt-0.5">{step}</p>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                  <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-800 text-sm leading-relaxed">
                    Stuck during setup? Message us on WhatsApp — we'll walk you through it live.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-gradient-to-br from-[#0B1D3A] to-brand-blue rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-1">Need help setting up?</h3>
                <p className="text-white/60 text-sm mb-4 leading-relaxed">
                  We'll share the complete project + walk you through the setup step by step on WhatsApp.
                </p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition text-sm"
                >
                  <MessageCircle size={16} fill="white" /> Get Help on WhatsApp
                </a>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <h3 className="font-bold text-[#0B1D3A] mb-3 text-sm">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {tech.map(t => (
                    <span key={t} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <h3 className="font-bold text-[#0B1D3A] mb-3 text-sm">Quick Links</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('code')}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl text-sm transition"
                  >
                    <Code2 size={14} className="text-brand-teal" /> View Source Code
                  </button>
                  <button
                    onClick={() => setActiveTab('viva')}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl text-sm transition"
                  >
                    <Mic2 size={14} className="text-brand-orange" /> Viva Preparation
                  </button>
                  {vivaMCQ[id] && (
                    <Link
                      to={`/projects/${id}/viva-test`}
                      className="flex items-center gap-2 px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl text-sm transition"
                    >
                      <Zap size={14} className="text-amber-500" /> Mock Test
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Source Code ── */}
        {activeTab === 'code' && (
          <div className="space-y-6">

            {/* ── GitHub Repo + ZIP download ── */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#0B1D3A] flex items-center justify-center flex-shrink-0">
                  <Github size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0B1D3A]">Source Code Repository</h2>
                  <p className="text-slate-500 text-xs mt-0.5">Clone, browse, or download the complete project as a .zip</p>
                </div>
              </div>

              {repoUrl ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl mb-4 overflow-x-auto">
                    <Github size={14} className="text-slate-400 flex-shrink-0" />
                    <span className="font-mono text-sm text-slate-600 truncate">{repoUrl}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#0B1D3A] hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition"
                    >
                      <ExternalLink size={14} /> View on GitHub
                    </a>
                    <a
                      href={`${repoUrl}/archive/refs/heads/main.zip`}
                      className="flex items-center gap-2 px-5 py-2.5 bg-brand-teal hover:bg-cyan-600 text-white font-bold rounded-xl text-sm transition"
                    >
                      <Download size={14} /> Download .zip
                    </a>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-sm transition"
                    >
                      <MessageCircle size={14} fill="white" /> WhatsApp Support
                    </a>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-3 py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  <Github size={36} className="text-slate-300" />
                  <div className="text-center">
                    <p className="font-semibold text-slate-600 mb-1">Repository coming soon</p>
                    <p className="text-slate-400 text-sm max-w-xs">
                      The project repo will be published here. Contact us on WhatsApp to receive the complete folder now.
                    </p>
                  </div>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-sm transition mt-1"
                  >
                    <MessageCircle size={14} fill="white" /> Get Full Code on WhatsApp
                  </a>
                </div>
              )}
            </div>

            {/* ── Code snippet preview ── */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Code2 size={18} className="text-brand-teal" />
                <div>
                  <h3 className="font-bold text-[#0B1D3A]">Code Preview</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Core implementation snippet for reference</p>
                </div>
              </div>
              <CodeBlock code={sourceCode} />
            </div>

            {/* ── PPT Download ── */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
                  <Layers size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0B1D3A] text-base">Download PPT Presentation</h3>
                  <p className="text-slate-500 text-xs mt-0.5">14 slides — auto-generated, ready for college submission</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Your Name</label>
                  <input
                    type="text"
                    value={pptName}
                    onChange={e => setPptName(e.target.value)}
                    placeholder="e.g. Anil Kumar"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Branch</label>
                  <input
                    type="text"
                    value={pptBranch}
                    onChange={e => setPptBranch(e.target.value)}
                    placeholder="e.g. B.Tech – CSE"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Academic Year</label>
                  <input
                    type="text"
                    value={pptYear}
                    onChange={e => setPptYear(e.target.value)}
                    placeholder="e.g. 2024–25"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleDownloadPPT}
                  disabled={pptLoading}
                  className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold rounded-xl transition text-sm"
                >
                  {pptLoading
                    ? <><span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> Generating...</>
                    : <><Download size={15} /> Download .pptx</>
                  }
                </button>
                <div className="flex flex-wrap gap-2">
                  {['Title Slide', 'Architecture', 'Tech Stack', 'Results', 'Future Scope', '+9 more'].map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium">{tag}</span>
                  ))}
                </div>
              </div>

              {pptError && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm">
                  <AlertCircle size={14} className="flex-shrink-0" />
                  {pptError}
                </div>
              )}
            </div>

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

        {/* ── Deploy ── */}
        {activeTab === 'deploy' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">

              {/* Platform banner */}
              <div className="bg-gradient-to-r from-[#0B1D3A] to-[#1a3255] rounded-2xl p-6 text-white">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Globe size={22} className="text-[#1ABAAF]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-[#1ABAAF] uppercase tracking-widest mb-1">Recommended Platform</p>
                    <p className="text-xl font-bold text-white mb-2">{deployPlatform || 'See steps below'}</p>
                    {deployNote && (
                      <div className="flex items-start gap-2 mt-3 p-3 bg-white/5 rounded-xl border border-white/10">
                        <Info size={14} className="text-[#1ABAAF] flex-shrink-0 mt-0.5" />
                        <p className="text-white/70 text-sm leading-relaxed">{deployNote}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Why deploy callout */}
              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-amber-800 text-sm leading-relaxed">
                  <strong>Viva tip:</strong> A live URL you can open on your phone during the exam is worth more than
                  any explanation. Deploy before your viva — even a basic working demo closes the deal.
                </p>
              </div>

              {/* Step-by-step */}
              <div className="bg-white rounded-2xl border border-slate-100 p-7">
                <h2 className="text-xl font-bold text-[#0B1D3A] mb-6 flex items-center gap-2">
                  <Rocket size={20} className="text-brand-orange" /> Deployment Steps
                </h2>
                {deploySteps.length > 0 ? (
                  <ol className="space-y-5">
                    {deploySteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-orange to-amber-500 text-white text-sm font-bold flex-shrink-0 flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-slate-700 text-sm leading-relaxed pt-1">{step}</p>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <div className="flex flex-col items-center gap-3 py-8 text-slate-400">
                    <Rocket size={28} className="opacity-30" />
                    <p className="text-sm">Deployment guide coming soon</p>
                  </div>
                )}

                <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                  <AlertCircle size={15} className="text-slate-400 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Stuck on a deployment step? Message us on WhatsApp — we'll walk you through it and help you get a live URL before your viva.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-gradient-to-br from-[#0B1D3A] to-brand-blue rounded-2xl p-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Rocket size={15} className="text-brand-orange" />
                  <h3 className="font-bold text-base">Need a live URL fast?</h3>
                </div>
                <p className="text-white/60 text-sm mb-4 leading-relaxed">
                  We'll deploy the project for you and hand you a working link before your viva.
                </p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition text-sm"
                >
                  <MessageCircle size={16} fill="white" /> Get Help on WhatsApp
                </a>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-3">
                <h3 className="font-bold text-[#0B1D3A] text-sm">What you'll get after deploy</h3>
                {[
                  ['Live URL', 'Share with evaluator during viva'],
                  ['Always-on', 'No need to keep your laptop running'],
                  ['Free hosting', 'All platforms above have free tiers'],
                  ['Shareable proof', 'Screenshot or QR code for your report'],
                ].map(([label, desc]) => (
                  <div key={label} className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-[#0B1D3A]">{label}</p>
                      <p className="text-xs text-slate-500">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <h3 className="font-bold text-[#0B1D3A] mb-3 text-sm">Quick Links</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('setup')}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl text-sm transition"
                  >
                    <Wrench size={14} className="text-brand-teal" /> Setup Guide
                  </button>
                  <button
                    onClick={() => setActiveTab('code')}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl text-sm transition"
                  >
                    <Code2 size={14} className="text-brand-teal" /> Source Code
                  </button>
                  <button
                    onClick={() => setActiveTab('viva')}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl text-sm transition"
                  >
                    <Mic2 size={14} className="text-brand-orange" /> Viva Preparation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Viva Q&A ── */}
        {activeTab === 'viva' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                  <Mic2 size={20} className="text-brand-orange" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0B1D3A]">Viva Questions & Answers</h2>
                  <p className="text-slate-500 text-sm">{vivaQA.length} standard questions + AI-personalized generator below</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  to={`/projects/${id}/interview-prep`}
                  className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 active:scale-95 transition-all text-sm whitespace-nowrap shadow-sm"
                >
                  <Briefcase size={14} /> Interview Prep
                </Link>
                {vivaMCQ[id] && (
                  <Link
                    to={`/projects/${id}/viva-test`}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brand-orange to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-amber-200 hover:scale-105 active:scale-95 transition-all text-sm whitespace-nowrap"
                  >
                    <Zap size={14} fill="currentColor" /> Mock Test
                    <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                      {vivaMCQ[id]?.length}Q
                    </span>
                  </Link>
                )}
              </div>
            </div>

            {/* ── Personalized Viva Generator ── */}
            <div className="mb-8 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
                  <Zap size={18} className="text-white" fill="white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0B1D3A] text-base">Generate Personalized Questions</h3>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Pure Python engine — concept-weighted, unique per student
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                {/* Difficulty */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                    Difficulty Level
                  </label>
                  <div className="flex gap-2">
                    {DIFFICULTIES.map(d => (
                      <button
                        key={d.key}
                        onClick={() => setVivaGenDifficulty(d.key)}
                        className={`flex-1 py-2 text-sm font-semibold rounded-xl border transition ${
                          vivaGenDifficulty === d.key ? d.activeColor : d.color
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question count */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                    Number of Questions: <span className="text-purple-700">{vivaGenCount}</span>
                  </label>
                  <input
                    type="range"
                    min={4}
                    max={15}
                    value={vivaGenCount}
                    onChange={e => setVivaGenCount(Number(e.target.value))}
                    className="w-full accent-purple-600 h-2 rounded-full"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>4</span><span>15</span>
                  </div>
                </div>
              </div>

              {/* Seed input */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                  Your Name (optional — ensures you always get the same set)
                </label>
                <input
                  type="text"
                  value={vivaGenSeed}
                  onChange={e => setVivaGenSeed(e.target.value)}
                  placeholder="e.g. Ravi Kumar"
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400"
                />
              </div>

              <button
                onClick={handleGenerateViva}
                disabled={vivaGenLoading}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 text-sm"
              >
                {vivaGenLoading
                  ? <><span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> Generating...</>
                  : <><Zap size={15} fill="white" /> Generate {vivaGenCount} {vivaGenDifficulty.charAt(0).toUpperCase() + vivaGenDifficulty.slice(1)} Questions</>
                }
              </button>

              {vivaGenError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm">
                  <AlertCircle size={15} className="flex-shrink-0" />
                  {vivaGenError}
                </div>
              )}
            </div>

            {/* Generated results */}
            {vivaGenResults && vivaGenResults.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                    {vivaGenResults.length} Personalized Questions Generated
                  </span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>
                <div className="space-y-3">
                  {vivaGenResults.map((qa, i) => (
                    <GeneratedVivaItem key={i} qa={qa} index={i} />
                  ))}
                </div>
                <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-xl text-center">
                  <p className="text-purple-800 text-sm font-medium">
                    These questions are seeded to your name — re-generate with the same name to get the same set.
                  </p>
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-semibold rounded-full">
                Standard Q&A Bank ({vivaQA.length} questions)
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {vivaMCQ[id] && (
              <div className="mb-6 p-5 bg-gradient-to-r from-brand-navy to-brand-blue rounded-2xl text-white flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <p className="font-bold text-base mb-1">Ready to test yourself?</p>
                  <p className="text-white/70 text-sm">
                    {vivaMCQ[id].length} MCQ questions · 30 sec/question · Predicted viva marks out of 10
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
