import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Clock, ChevronRight, ChevronLeft, CheckCircle2, XCircle,
  AlertTriangle, Trophy, RefreshCw, BookOpen,
  Target, Flag, Home,
  Cpu, FileCode2, Brain, Calculator, AlignLeft, Lightbulb,
} from 'lucide-react'
import { ResultsScreen } from './CompanyExamPage'

// ── Constants ─────────────────────────────────────────────────────────────────

const SECTION_META = {
  numerical_ability:  { label: 'Numerical Ability',  Icon: Calculator,  color: 'blue'   },
  verbal_ability:     { label: 'Verbal Ability',      Icon: AlignLeft,   color: 'violet' },
  reasoning_ability:  { label: 'Reasoning Ability',   Icon: Brain,       color: 'teal'   },
  programming_logic:  { label: 'Programming Logic',   Icon: FileCode2,   color: 'orange' },
}

const COLOR_MAP = {
  blue:   { badge: 'bg-blue-100 text-blue-700',   ring: 'ring-blue-400',   dot: 'bg-blue-500',   bar: 'bg-blue-500'   },
  violet: { badge: 'bg-violet-100 text-violet-700', ring: 'ring-violet-400', dot: 'bg-violet-500', bar: 'bg-violet-500' },
  teal:   { badge: 'bg-teal-100 text-teal-700',   ring: 'ring-teal-400',   dot: 'bg-teal-500',   bar: 'bg-teal-500'   },
  orange: { badge: 'bg-orange-100 text-orange-700', ring: 'ring-orange-400', dot: 'bg-orange-500', bar: 'bg-orange-500' },
}

const EXAM_INFO = [
  { label: 'Numerical Ability', qs: 26, time: '40 min', Icon: Calculator,  color: 'blue'   },
  { label: 'Verbal Ability',    qs: 24, time: '30 min', Icon: AlignLeft,   color: 'violet' },
  { label: 'Reasoning Ability', qs: 30, time: '50 min', Icon: Brain,       color: 'teal'   },
  { label: 'Programming Logic', qs: 10, time: '15 min', Icon: FileCode2,   color: 'orange' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0')
  const s = (secs % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function pctColor(p) {
  return p >= 75 ? 'text-emerald-600' : p >= 50 ? 'text-amber-600' : 'text-red-500'
}
function pctBar(p) {
  return p >= 75 ? 'bg-emerald-500' : p >= 50 ? 'bg-amber-400' : 'bg-red-400'
}

// Render question text that may contain a ```python...``` code block
function QuestionText({ text }) {
  if (!text) return null
  const parts = text.split(/(```[\w]*\n[\s\S]*?```)/g)
  return (
    <div className="space-y-3">
      {parts.map((part, i) => {
        const codeMatch = part.match(/^```[\w]*\n([\s\S]*?)```$/)
        if (codeMatch) {
          return (
            <pre
              key={i}
              className="bg-slate-900 text-green-300 rounded-xl p-4 text-sm font-mono overflow-x-auto leading-relaxed border border-slate-700"
            >
              <code>{codeMatch[1].trimEnd()}</code>
            </pre>
          )
        }
        return part.trim()
          ? <p key={i} className="text-slate-800 text-base leading-relaxed">{part.trim()}</p>
          : null
      })}
    </div>
  )
}

// ── Landing Screen ─────────────────────────────────────────────────────────────

function LandingScreen({ onStart }) {
  const [studentId, setStudentId] = useState('')
  const [name, setName]           = useState('')
  const [error, setError]         = useState('')

  function handleStart() {
    if (!name.trim())      { setError('Please enter your name.'); return }
    if (!studentId.trim()) { setError('Please enter your Roll No / Student ID.'); return }
    onStart(name.trim(), studentId.trim())
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="hero-bg py-10 pt-20 px-5 text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
          TCS NQT Mock Test
        </h1>
        <p className="text-white/70 text-sm max-w-xl mx-auto">
          Full-length TCS National Qualifier Test — 90 questions, 4 sections, 135 minutes. Unique paper per roll number.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

        {/* Exam structure cards */}
        <h2 className="text-lg font-bold text-brand-navy mb-4">Exam Structure</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {EXAM_INFO.map(({ label, qs, time, Icon, color }) => {
            const c = COLOR_MAP[color]
            return (
              <div key={label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 text-center">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 ${c.badge}`}>
                  <Icon size={18} />
                </div>
                <p className="font-bold text-brand-navy text-sm leading-tight">{label}</p>
                <p className="text-2xl font-extrabold text-brand-navy mt-1">{qs}</p>
                <p className="text-xs text-slate-400 mt-0.5">{time}</p>
              </div>
            )
          })}
        </div>

        {/* Marking scheme */}
        <div className="flex flex-wrap gap-4 mb-10">
          {[
            { label: 'Correct Answer',   val: '+1.00',  color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
            { label: 'Wrong Answer',     val: '−0.33',  color: 'text-red-600 bg-red-50 border-red-200' },
            { label: 'Unattempted',      val: '0',      color: 'text-slate-600 bg-slate-50 border-slate-200' },
            { label: 'Total Questions',  val: '90',     color: 'text-brand-navy bg-blue-50 border-blue-200' },
          ].map(({ label, val, color }) => (
            <div key={label} className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium ${color}`}>
              <span className="font-extrabold text-lg">{val}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Start form */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 max-w-lg mx-auto">
          <h2 className="text-xl font-extrabold text-brand-navy mb-1">Start Your Mock Test</h2>
          <p className="text-slate-500 text-sm mb-6">
            Your Roll No is used as the question seed — same ID always generates the same paper.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your Name</label>
              <input
                type="text"
                placeholder="e.g. Anil Kumar"
                value={name}
                onChange={e => { setName(e.target.value); setError('') }}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Roll No / Student ID</label>
              <input
                type="text"
                placeholder="e.g. 21BD1A0501"
                value={studentId}
                onChange={e => { setStudentId(e.target.value); setError('') }}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange"
                onKeyDown={e => e.key === 'Enter' && handleStart()}
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm flex items-center gap-1.5">
                <AlertTriangle size={13} /> {error}
              </p>
            )}

            <button
              onClick={handleStart}
              className="w-full py-3.5 rounded-xl bg-brand-navy text-white font-bold text-sm hover:bg-[#1a3a6b] transition-all shadow-lg shadow-navy-900/20 flex items-center justify-center gap-2 mt-2"
            >
              Start Mock Test <ChevronRight size={16} />
            </button>
          </div>

          <p className="text-xs text-slate-400 text-center mt-4">
            Sections are timed. Complete each section within the time limit.
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Loading Screen ─────────────────────────────────────────────────────────────

function LoadingScreen({ studentName }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-5">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-orange to-amber-500 flex items-center justify-center shadow-xl shadow-orange-300/40 animate-pulse">
        <Cpu size={30} className="text-white" />
      </div>
      <div className="text-center">
        <h2 className="text-xl font-extrabold text-brand-navy">Generating your paper…</h2>
        <p className="text-slate-500 text-sm mt-1">Personalised for {studentName}</p>
      </div>
      <div className="flex gap-1.5 mt-2">
        {[0,1,2].map(i => (
          <div key={i} className="w-2 h-2 rounded-full bg-brand-orange animate-bounce"
               style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  )
}

// ── Question Palette ───────────────────────────────────────────────────────────

function Palette({ count, current, answers, marked, onJump }) {
  return (
    <div className="grid grid-cols-5 gap-1.5">
      {Array.from({ length: count }, (_, i) => {
        const answered = answers[i] != null
        const isCurrent = i === current
        const isMarked  = marked.has(i)
        let cls = 'w-8 h-8 rounded-lg text-xs font-bold transition-all '
        if (isCurrent)     cls += 'bg-brand-navy text-white ring-2 ring-offset-1 ring-brand-navy'
        else if (answered) cls += 'bg-emerald-500 text-white'
        else if (isMarked) cls += 'bg-amber-400 text-white'
        else               cls += 'bg-slate-100 text-slate-500 hover:bg-slate-200'
        return (
          <button key={i} onClick={() => onJump(i)} className={cls}>
            {i + 1}
          </button>
        )
      })}
    </div>
  )
}

// ── Exam Screen ────────────────────────────────────────────────────────────────

function ExamScreen({ paper, studentName, onFinish }) {
  const [secIdx,  setSecIdx]  = useState(0)
  const [qIdx,    setQIdx]    = useState(0)
  const [answers, setAnswers] = useState(() => paper.sections.map(s => Array(s.questions.length).fill(null)))
  const [marked,  setMarked]  = useState(() => paper.sections.map(() => new Set()))
  const [timeLeft, setTimeLeft] = useState(paper.sections[0].time_mins * 60)
  const [showPalette, setShowPalette] = useState(false)
  const [secDone,  setSecDone]  = useState(false)
  const timerRef = useRef(null)

  const section    = paper.sections[secIdx]
  const questions  = section.questions
  const question   = questions[qIdx]
  const secAnswers = answers[secIdx]
  const secMarked  = marked[secIdx]
  const isLast     = secIdx === paper.sections.length - 1
  const attempted  = secAnswers.filter(a => a != null).length

  // Timer
  useEffect(() => {
    setTimeLeft(section.time_mins * 60)
    setQIdx(0)
    setSecDone(false)
  }, [secIdx, section.time_mins])

  useEffect(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); setSecDone(true); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [secIdx])

  function selectOption(opt) {
    setAnswers(prev => {
      const copy = prev.map(s => [...s])
      copy[secIdx][qIdx] = opt
      return copy
    })
  }

  function toggleMark() {
    setMarked(prev => {
      const copy = prev.map(s => new Set(s))
      if (copy[secIdx].has(qIdx)) copy[secIdx].delete(qIdx)
      else copy[secIdx].add(qIdx)
      return copy
    })
  }

  function nextSection() {
    clearInterval(timerRef.current)
    if (isLast) {
      onFinish(answers)
    } else {
      setQIdx(0)
      setSecIdx(s => s + 1)
    }
  }

  const timerColor = timeLeft <= 60 ? 'text-red-500' : timeLeft <= 300 ? 'text-amber-500' : 'text-brand-navy'

  // Section done overlay
  if (secDone) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-5">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-4">
            <Clock size={28} className="text-amber-500" />
          </div>
          <h2 className="text-2xl font-extrabold text-brand-navy mb-2">Time's Up!</h2>
          <p className="text-slate-500 mb-2">
            <span className="font-semibold">{section.label}</span> section ended.
          </p>
          <p className="text-slate-500 mb-6">
            Attempted <strong className="text-brand-navy">{attempted}/{questions.length}</strong> questions.
          </p>
          <button
            onClick={nextSection}
            className="w-full py-3 rounded-xl bg-brand-navy text-white font-bold text-sm hover:bg-[#1a3a6b] transition flex items-center justify-center gap-2"
          >
            {isLast ? 'View Results' : `Start ${paper.sections[secIdx + 1]?.label}`}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* Header */}
      <div className="bg-brand-navy text-white sticky top-0 z-20 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          {/* Section tabs */}
          <div className="flex-1 flex gap-1 overflow-x-auto hide-scrollbar">
            {paper.sections.map((s, i) => {
              const meta = SECTION_META[s.id] || {}
              const done  = i < secIdx
              const active = i === secIdx
              return (
                <div
                  key={s.id}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition
                    ${active ? 'bg-white/20 text-white' : done ? 'text-white/40' : 'text-white/30'}`}
                >
                  {done && <CheckCircle2 size={11} className="text-emerald-400" />}
                  {s.label}
                </div>
              )
            })}
          </div>
          {/* Timer */}
          <div className={`flex items-center gap-1.5 font-mono font-bold text-sm px-3 py-1 rounded-lg
            ${timeLeft <= 60 ? 'bg-red-500/30 text-red-200' : timeLeft <= 300 ? 'bg-amber-500/20 text-amber-200' : 'bg-white/10 text-white'}`}>
            <Clock size={13} />
            {fmtTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 flex gap-6">

        {/* Question panel */}
        <div className="flex-1 min-w-0">

          {/* Section label + progress */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {(() => { const meta = SECTION_META[section.id] || {}; const Icon = meta.Icon || BookOpen; return <Icon size={16} className="text-slate-400" /> })()}
              <span className="text-sm font-semibold text-slate-500">{section.label}</span>
              <span className="text-slate-300">·</span>
              <span className="text-sm text-slate-400">Q {qIdx + 1} of {questions.length}</span>
            </div>
            <button
              onClick={() => setShowPalette(v => !v)}
              className="sm:hidden text-xs text-brand-navy font-semibold border border-slate-200 rounded-lg px-2 py-1"
            >
              Palette
            </button>
          </div>

          {/* Question card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6 mb-4">
            {/* Mark for review */}
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full
                ${question.metadata?.difficulty === 'hard'   ? 'bg-red-100 text-red-700' :
                  question.metadata?.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
                                                               'bg-emerald-100 text-emerald-700'}`}>
                {(question.metadata?.difficulty || 'easy').charAt(0).toUpperCase() + (question.metadata?.difficulty || 'easy').slice(1)}
              </span>
              <button
                onClick={toggleMark}
                className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border transition
                  ${secMarked.has(qIdx) ? 'bg-amber-50 border-amber-300 text-amber-700' : 'border-slate-200 text-slate-400 hover:border-amber-300 hover:text-amber-600'}`}
              >
                <Flag size={11} /> {secMarked.has(qIdx) ? 'Marked' : 'Mark for Review'}
              </button>
            </div>

            <QuestionText text={question.question} />

            {/* Options */}
            <div className="mt-5 space-y-2.5">
              {Object.entries(question.options).map(([label, value]) => {
                const selected = secAnswers[qIdx] === label
                return (
                  <button
                    key={label}
                    onClick={() => selectOption(label)}
                    className={`w-full flex items-start gap-3 px-4 py-3.5 rounded-xl border text-left text-sm transition-all
                      ${selected
                        ? 'border-brand-orange bg-orange-50 text-brand-navy font-semibold ring-2 ring-brand-orange/20'
                        : 'border-slate-200 hover:border-brand-orange/40 hover:bg-orange-50/30 text-slate-700'}`}
                  >
                    <span className={`w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold border
                      ${selected ? 'bg-brand-orange text-white border-brand-orange' : 'bg-white border-slate-300 text-slate-500'}`}>
                      {label}
                    </span>
                    <span className="font-mono text-sm leading-relaxed">{value}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setQIdx(i => Math.max(0, i - 1))}
              disabled={qIdx === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600
                         hover:border-brand-navy hover:text-brand-navy disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={15} /> Previous
            </button>

            {qIdx < questions.length - 1 ? (
              <button
                onClick={() => setQIdx(i => i + 1)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-navy text-white text-sm font-semibold hover:bg-[#1a3a6b] transition"
              >
                Next <ChevronRight size={15} />
              </button>
            ) : (
              <button
                onClick={nextSection}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-orange text-white text-sm font-bold hover:bg-amber-500 transition shadow-lg shadow-orange-300/30"
              >
                {isLast ? 'Submit Test' : 'Submit Section'}
                <ChevronRight size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Sidebar palette — desktop */}
        <div className={`w-56 flex-shrink-0 hidden sm:block`}>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sticky top-20">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Question Palette</h3>
            <Palette
              count={questions.length}
              current={qIdx}
              answers={secAnswers}
              marked={secMarked}
              onJump={setQIdx}
            />
            <div className="mt-4 space-y-1.5 text-xs text-slate-500">
              {[
                { color: 'bg-brand-navy',   label: 'Current'    },
                { color: 'bg-emerald-500',  label: 'Answered'   },
                { color: 'bg-amber-400',    label: 'Marked'     },
                { color: 'bg-slate-100 border border-slate-200', label: 'Not visited' },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${color}`} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
              <p>Attempted: <strong className="text-brand-navy">{attempted}/{questions.length}</strong></p>
              <p className="mt-1">Marked: <strong className="text-amber-600">{secMarked.size}</strong></p>
            </div>
            {qIdx === questions.length - 1 && (
              <button
                onClick={nextSection}
                className="w-full mt-4 py-2.5 rounded-xl bg-brand-orange text-white text-xs font-bold hover:bg-amber-500 transition"
              >
                {isLast ? 'Submit Test' : 'Submit & Next Section'}
              </button>
            )}
          </div>
        </div>

        {/* Mobile palette overlay */}
        {showPalette && (
          <div className="sm:hidden fixed inset-0 bg-black/40 z-30 flex items-end" onClick={() => setShowPalette(false)}>
            <div className="bg-white rounded-t-3xl p-5 w-full" onClick={e => e.stopPropagation()}>
              <h3 className="text-sm font-bold text-brand-navy mb-3">Question Palette</h3>
              <Palette
                count={questions.length}
                current={qIdx}
                answers={secAnswers}
                marked={secMarked}
                onJump={i => { setQIdx(i); setShowPalette(false) }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── TCS NQT results config ─────────────────────────────────────────────────────

const TCS_RESULTS_CONFIG = {
  companyName: 'TCS NQT Mock Test',
  predictions: [
    { minPct: 75, label: 'NQT Qualifier',          color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', Icon: Trophy        },
    { minPct: 55, label: 'Good — Keep Practising', color: 'text-amber-600',   bg: 'bg-amber-50 border-amber-200',     Icon: Target        },
    { minPct:  0, label: 'Needs Improvement',      color: 'text-red-600',     bg: 'bg-red-50 border-red-200',         Icon: AlertTriangle },
  ],
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function TcsNqt() {
  const [phase,       setPhase]       = useState('landing')   // landing | loading | exam | results
  const [paper,       setPaper]       = useState(null)
  const [studentName, setStudentName] = useState('')
  const [finalAnswers, setFinalAnswers] = useState(null)
  const [apiError,    setApiError]    = useState('')

  async function handleStart(name, studentId) {
    setStudentName(name)
    setPhase('loading')
    setApiError('')
    try {
      const res = await fetch('/api/company-exam/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exam_id: 'tcs_nqt', master_seed: studentId }),
      })
      if (!res.ok) throw new Error(`Server error ${res.status}`)
      const data = await res.json()
      setPaper(data)
      setPhase('exam')
    } catch (err) {
      setApiError(`Could not connect to the exam server. Make sure the backend is running.\n\n${err.message}`)
      setPhase('error')
    }
  }

  function handleFinish(answers) {
    setFinalAnswers(answers)
    setPhase('results')
  }

  function handleRetry() {
    setPaper(null)
    setFinalAnswers(null)
    setPhase('landing')
  }

  if (phase === 'landing') return <LandingScreen onStart={handleStart} />
  if (phase === 'loading') return <LoadingScreen studentName={studentName} />

  if (phase === 'error') return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-5">
      <div className="bg-white rounded-3xl border border-red-100 shadow p-8 max-w-md w-full text-center">
        <XCircle size={40} className="text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-brand-navy mb-2">Connection Error</h2>
        <p className="text-slate-500 text-sm whitespace-pre-line mb-6">{apiError}</p>
        <button onClick={handleRetry}
          className="px-6 py-3 rounded-xl bg-brand-navy text-white font-semibold text-sm hover:bg-[#1a3a6b] transition">
          Try Again
        </button>
      </div>
    </div>
  )

  if (phase === 'exam' && paper)
    return <ExamScreen paper={paper} studentName={studentName} onFinish={handleFinish} />

  if (phase === 'results' && paper && finalAnswers)
    return <ResultsScreen paper={paper} answers={finalAnswers} studentName={studentName} onRetry={handleRetry} config={TCS_RESULTS_CONFIG} />

  return null
}
