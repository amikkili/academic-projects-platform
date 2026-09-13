import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Clock, ChevronRight, ChevronLeft, CheckCircle2, XCircle,
  AlertTriangle, Trophy, BarChart2, RefreshCw, BookOpen,
  Target, Flag, Home, Cpu, FileCode2, Brain, Calculator, AlignLeft, Lightbulb,
  TrendingUp, TrendingDown, Minus, Zap, ListChecks, Camera, User,
} from 'lucide-react'

// ── Shared section metadata ───────────────────────────────────────────────────

export const SECTION_META = {
  numerical_ability:  { label: 'Numerical Ability',             Icon: Calculator, color: 'blue'   },
  verbal_ability:     { label: 'Verbal Ability',                Icon: AlignLeft,  color: 'violet' },
  reasoning_ability:  { label: 'Reasoning Ability',             Icon: Brain,      color: 'teal'   },
  programming_logic:  { label: 'Programming Logic',             Icon: FileCode2,  color: 'orange' },
}

export const COLOR_MAP = {
  blue:   { badge: 'bg-blue-100 text-blue-700',    ring: 'ring-blue-400',    dot: 'bg-blue-500',    bar: 'bg-blue-500'   },
  violet: { badge: 'bg-violet-100 text-violet-700', ring: 'ring-violet-400',  dot: 'bg-violet-500',  bar: 'bg-violet-500' },
  teal:   { badge: 'bg-teal-100 text-teal-700',    ring: 'ring-teal-400',    dot: 'bg-teal-500',    bar: 'bg-teal-500'   },
  orange: { badge: 'bg-orange-100 text-orange-700', ring: 'ring-orange-400',  dot: 'bg-orange-500',  bar: 'bg-orange-500' },
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0')
  const s = (secs % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function pctColor(p) { return p >= 75 ? 'text-emerald-600' : p >= 50 ? 'text-amber-600' : 'text-red-500' }
function pctBar(p)   { return p >= 75 ? 'bg-emerald-500'   : p >= 50 ? 'bg-amber-400'   : 'bg-red-400'   }

function QuestionText({ text }) {
  if (!text) return null
  const parts = text.split(/(```[\w]*\n[\s\S]*?```)/g)
  return (
    <div className="space-y-3">
      {parts.map((part, i) => {
        const codeMatch = part.match(/^```[\w]*\n([\s\S]*?)```$/)
        if (codeMatch) {
          return (
            <pre key={i} className="bg-slate-900 text-green-300 rounded-xl p-4 text-sm font-mono overflow-x-auto leading-relaxed border border-slate-700">
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
        {[0, 1, 2].map(i => (
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
        const answered  = answers[i] != null
        const isCurrent = i === current
        const isMarked  = marked.has(i)
        let cls = 'w-8 h-8 rounded-lg text-xs font-bold transition-all '
        if (isCurrent)     cls += 'bg-brand-navy text-white ring-2 ring-offset-1 ring-brand-navy'
        else if (answered) cls += 'bg-emerald-500 text-white'
        else if (isMarked) cls += 'bg-amber-400 text-white'
        else               cls += 'bg-slate-100 text-slate-500 hover:bg-slate-200'
        return <button key={i} onClick={() => onJump(i)} className={cls}>{i + 1}</button>
      })}
    </div>
  )
}

// ── Exam Screen ────────────────────────────────────────────────────────────────

function ExamScreen({ paper, studentName, onFinish }) {
  const [secIdx,      setSecIdx]     = useState(0)
  const [qIdx,        setQIdx]       = useState(0)
  const [answers,     setAnswers]    = useState(() => paper.sections.map(s => Array(s.questions.length).fill(null)))
  const [marked,      setMarked]     = useState(() => paper.sections.map(() => new Set()))
  const [timeLeft,    setTimeLeft]   = useState(paper.sections[0].time_mins * 60)
  const [showPalette, setShowPalette] = useState(false)
  const [secDone,     setSecDone]    = useState(false)
  const timerRef = useRef(null)

  const section    = paper.sections[secIdx]
  const questions  = section.questions
  const question   = questions[qIdx]
  const secAnswers = answers[secIdx]
  const secMarked  = marked[secIdx]
  const isLast     = secIdx === paper.sections.length - 1
  const attempted  = secAnswers.filter(a => a != null).length

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
          <div className="flex-1 flex gap-1 overflow-x-auto hide-scrollbar">
            {paper.sections.map((s, i) => {
              const done   = i < secIdx
              const active = i === secIdx
              return (
                <div key={s.id}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition
                    ${active ? 'bg-white/20 text-white' : done ? 'text-white/40' : 'text-white/30'}`}
                >
                  {done && <CheckCircle2 size={11} className="text-emerald-400" />}
                  {s.label}
                </div>
              )
            })}
          </div>
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

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6 mb-4">
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

            <div className="mt-5 space-y-2.5">
              {Object.entries(question.options).map(([label, value]) => {
                const selected = secAnswers[qIdx] === label
                return (
                  <button key={label} onClick={() => selectOption(label)}
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

          <div className="flex items-center justify-between">
            <button onClick={() => setQIdx(i => Math.max(0, i - 1))} disabled={qIdx === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:border-brand-navy hover:text-brand-navy disabled:opacity-30 disabled:cursor-not-allowed transition">
              <ChevronLeft size={15} /> Previous
            </button>
            {qIdx < questions.length - 1 ? (
              <button onClick={() => setQIdx(i => i + 1)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-navy text-white text-sm font-semibold hover:bg-[#1a3a6b] transition">
                Next <ChevronRight size={15} />
              </button>
            ) : (
              <button onClick={nextSection}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-orange text-white text-sm font-bold hover:bg-amber-500 transition shadow-lg shadow-orange-300/30">
                {isLast ? 'Submit Test' : 'Submit Section'} <ChevronRight size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Sidebar palette — desktop */}
        <div className="w-56 flex-shrink-0 hidden sm:block">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sticky top-20">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Question Palette</h3>
            <Palette count={questions.length} current={qIdx} answers={secAnswers} marked={secMarked} onJump={setQIdx} />
            <div className="mt-4 space-y-1.5 text-xs text-slate-500">
              {[
                { color: 'bg-brand-navy',   label: 'Current'     },
                { color: 'bg-emerald-500',  label: 'Answered'    },
                { color: 'bg-amber-400',    label: 'Marked'      },
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
              <button onClick={nextSection}
                className="w-full mt-4 py-2.5 rounded-xl bg-brand-orange text-white text-xs font-bold hover:bg-amber-500 transition">
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
              <Palette count={questions.length} current={qIdx} answers={secAnswers} marked={secMarked}
                onJump={i => { setQIdx(i); setShowPalette(false) }} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Topic metadata ────────────────────────────────────────────────────────────

const TOPIC_LABELS = {
  simplification:             'Simplification',
  number_series:              'Number Series',
  data_interpretation:        'Data Interpretation',
  percentage:                 'Percentage',
  profit_loss:                'Profit & Loss',
  time_work:                  'Time & Work',
  time_speed_distance:        'Time, Speed & Distance',
  simple_compound_interest:   'Simple & Compound Interest',
  reading_comprehension:      'Reading Comprehension',
  error_detection:            'Error Detection',
  fill_in_the_blanks:         'Fill in the Blanks',
  vocabulary:                 'Vocabulary',
  para_jumbles:               'Para Jumbles',
  cloze_test:                 'Cloze Test',
  coding_decoding:            'Coding & Decoding',
  seating_arrangement_linear: 'Seating Arrangement',
  blood_relations:            'Blood Relations',
  syllogism:                  'Syllogism',
  direction_sense:            'Direction Sense',
  analogy:                    'Analogy',
  series_completion:          'Series Completion',
  output_prediction:          'Output Prediction',
  time_complexity:            'Time Complexity',
  cs_concepts:                'CS Concepts',
}

const TOPIC_TIPS = {
  simplification:             'Master BODMAS and practice mental arithmetic shortcuts.',
  number_series:              'Identify difference, ratio, and square/cube patterns.',
  data_interpretation:        'Practice reading bar charts, pie charts, and tables under time pressure.',
  percentage:                 'Learn fraction↔percentage conversions and % change formulas.',
  profit_loss:                'Memorise CP / SP / MP relationships and discount formulas.',
  time_work:                  'Use the LCM method; learn pipe & cistern equivalents.',
  time_speed_distance:        'Practice relative speed and average speed questions.',
  simple_compound_interest:   'Learn SI & CI formulas; compare CI vs SI for 2 years.',
  reading_comprehension:      'Read questions first, then skim the passage for answers.',
  error_detection:            'Focus on subject-verb agreement, tense, and preposition usage.',
  fill_in_the_blanks:         'Understand context clues; build collocations and idioms.',
  vocabulary:                 'Study word roots, prefixes and suffixes; use word-in-context drills.',
  para_jumbles:               'Find the opening sentence first, then build logical sentence pairs.',
  cloze_test:                 'Read the whole passage before filling blanks; focus on coherence.',
  coding_decoding:            'Detect the shift or substitution pattern from the first example.',
  seating_arrangement_linear: 'Draw the row/circle and place definite clues first.',
  blood_relations:            'Draw a family tree; use generational levels systematically.',
  syllogism:                  'Draw Venn diagrams for every statement before checking conclusions.',
  direction_sense:            'Fix a compass reference and track cumulative direction changes.',
  analogy:                    'State the relationship explicitly before choosing the answer.',
  series_completion:          'Check differences, ratios, squares, cubes, and alternating patterns.',
  output_prediction:          'Trace each variable step-by-step; pay close attention to loop counters.',
  time_complexity:            'Remember: O(1) < O(log n) < O(n) < O(n log n) < O(n²).',
  cs_concepts:                'Revise OOP pillars, stack/queue basics, and OS fundamentals.',
}

// ── Score Gauge (SVG ring) ─────────────────────────────────────────────────────

function ScoreGauge({ pct }) {
  const R   = 54
  const C   = 2 * Math.PI * R
  const arc = (pct / 100) * C
  const strokeColor = pct >= 75 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#f87171'
  return (
    <svg viewBox="0 0 140 140" className="w-36 h-36 sm:w-44 sm:h-44">
      <circle cx="70" cy="70" r={R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="11" />
      <circle cx="70" cy="70" r={R} fill="none"
        stroke={strokeColor} strokeWidth="11" strokeLinecap="round"
        strokeDasharray={`${arc} ${C}`}
        transform="rotate(-90 70 70)"
        style={{ transition: 'stroke-dasharray 1.3s cubic-bezier(.4,0,.2,1)' }}
      />
      <text x="70" y="64" textAnchor="middle" fill="white" fontSize="28" fontWeight="800"
            fontFamily="system-ui, sans-serif">{pct}</text>
      <text x="70" y="82" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="11"
            fontFamily="system-ui, sans-serif">/ 100</text>
    </svg>
  )
}

// ── Topic card ────────────────────────────────────────────────────────────────

function TopicCard({ topic, correct, total }) {
  const pct   = total ? Math.round((correct / total) * 100) : 0
  const label = TOPIC_LABELS[topic] || topic.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  const bar   = pct >= 75 ? 'bg-emerald-400' : pct >= 50 ? 'bg-amber-400' : 'bg-red-400'
  const txt   = pct >= 75 ? 'text-emerald-700' : pct >= 50 ? 'text-amber-700' : 'text-red-600'
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-slate-700 leading-tight">{label}</span>
        <span className={`text-xs font-bold ml-2 tabular-nums ${txt}`}>{pct}%</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-1.5 mb-1">
        <div className={`h-1.5 rounded-full ${bar} transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
      <p className="text-[10px] text-slate-400 tabular-nums">{correct}/{total} correct</p>
    </div>
  )
}

// ── Results Screen ─────────────────────────────────────────────────────────────

export function ResultsScreen({ paper, answers, studentName, onRetry, config }) {
  // ── Compute section stats ──
  const sections = paper.sections.map((sec, si) => {
    const qs = sec.questions
    let correct = 0, wrong = 0, skipped = 0
    qs.forEach((q, qi) => {
      const ans = answers[si][qi]
      if (ans == null)                   skipped++
      else if (ans === q.correct_option) correct++
      else                               wrong++
    })
    const score = correct * paper.correct_marks + wrong * paper.negative_marks
    const pct   = Math.round((correct / qs.length) * 100)
    return { ...sec, correct, wrong, skipped, score, pct }
  })

  const totalCorrect = sections.reduce((a, s) => a + s.correct, 0)
  const totalWrong   = sections.reduce((a, s) => a + s.wrong, 0)
  const totalSkipped = sections.reduce((a, s) => a + s.skipped, 0)
  const totalScore   = sections.reduce((a, s) => a + s.score, 0)
  const totalPct     = Math.round((totalCorrect / paper.total_questions) * 100)

  // ── Compute topic stats from question metadata ──
  const topicMap = {}
  paper.sections.forEach((sec, si) => {
    sec.questions.forEach((q, qi) => {
      const t = q.metadata?.topic || 'unknown'
      if (!topicMap[t]) topicMap[t] = { correct: 0, total: 0 }
      topicMap[t].total++
      if (answers[si][qi] === q.correct_option) topicMap[t].correct++
    })
  })
  const topicList = Object.entries(topicMap)
    .map(([topic, { correct, total }]) => ({ topic, correct, total, pct: Math.round((correct / total) * 100) }))
    .sort((a, b) => a.pct - b.pct)

  const critical   = topicList.filter(t => t.pct < 50)
  const developing = topicList.filter(t => t.pct >= 50 && t.pct < 75)
  const strong     = topicList.filter(t => t.pct >= 75)

  const pred     = config.predictions.find(p => totalPct >= p.minPct) || config.predictions[config.predictions.length - 1]
  const PredIcon   = pred.Icon
  const photoRef   = useRef(null)
  const [photo, setPhoto] = useState(() => {
    try { return localStorage.getItem('exam_profile_photo') || null } catch { return null }
  })

  function handlePhotoChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      const dataUrl = ev.target.result
      setPhoto(dataUrl)
      try { localStorage.setItem('exam_profile_photo', dataUrl) } catch {}
    }
    reader.readAsDataURL(file)
  }

  const verdictBg = totalPct >= 75 ? 'from-emerald-500 to-teal-600'
                  : totalPct >= 50 ? 'from-amber-400 to-orange-500'
                  : 'from-red-500 to-rose-600'

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ── Header bar ── */}
      <div className="hero-bg py-4 px-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">{config.companyName} · Result</p>
          <button onClick={onRetry} className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-semibold transition">
            <RefreshCw size={12} /> Retake
          </button>
        </div>
      </div>

      {/* ── Three-column grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">

          {/* ══ BOX 1 — Profile + Score ══ */}
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col">

            {/* Gradient banner */}
            <div className={`bg-gradient-to-br ${verdictBg} h-24 relative`} />

            {/* Avatar — overlaps banner */}
            <div className="px-6 pb-5">
              <div className="relative -mt-12 mb-4 flex flex-col items-center">
                <div className="relative">
                  <div
                    onClick={() => photoRef.current?.click()}
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-slate-100 flex items-center justify-center cursor-pointer group"
                  >
                    {photo
                      ? <img src={photo} alt="profile" className="w-full h-full object-cover" />
                      : <User size={36} className="text-slate-300" />
                    }
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-full">
                      <Camera size={18} className="text-white" />
                    </div>
                  </div>
                  <button
                    onClick={() => photoRef.current?.click()}
                    className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-brand-orange border-2 border-white flex items-center justify-center shadow"
                  >
                    <Camera size={12} className="text-white" />
                  </button>
                  <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                </div>
                <p className="text-xs text-slate-400 mt-1.5">Tap to add photo</p>
              </div>

              {/* Name + verdict */}
              <div className="text-center mb-5">
                <h2 className="text-2xl font-extrabold text-brand-navy leading-tight">{studentName}</h2>
                <p className={`text-sm font-bold mt-1 ${
                  totalPct >= 75 ? 'text-emerald-500' : totalPct >= 50 ? 'text-amber-500' : 'text-red-500'
                }`}>{pred.label}</p>
              </div>

              {/* Score gauge centered */}
              <div className="flex justify-center mb-5">
                <ScoreGauge pct={totalPct} />
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-4 gap-2 py-4 border-t border-slate-100">
                {[
                  { val: totalCorrect,         label: 'Correct', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { val: totalWrong,            label: 'Wrong',   color: 'text-red-500',    bg: 'bg-red-50'     },
                  { val: totalSkipped,          label: 'Skipped', color: 'text-slate-500',  bg: 'bg-slate-50'   },
                  { val: totalScore.toFixed(1), label: 'Score',   color: 'text-brand-navy', bg: 'bg-blue-50'    },
                ].map(({ val, label, color, bg }) => (
                  <div key={label} className={`flex flex-col items-center py-2 rounded-xl ${bg}`}>
                    <span className={`text-xl font-extrabold tabular-nums ${color}`}>{val}</span>
                    <span className="text-[9px] text-slate-400 uppercase tracking-wide mt-0.5 font-semibold">{label}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 mt-4">
                <button onClick={onRetry}
                  className="flex items-center justify-center gap-2 py-2.5 bg-brand-navy text-white font-semibold rounded-xl hover:bg-[#1a3a6b] transition text-sm">
                  <RefreshCw size={14} /> Retake with New Paper
                </button>
                <div className="flex gap-2">
                  <Link to="/aptitude-practice"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:border-brand-orange hover:text-brand-orange transition text-sm">
                    <BookOpen size={13} /> Practice
                  </Link>
                  <Link to="/"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-200 text-slate-500 font-semibold rounded-xl hover:bg-slate-50 transition text-sm">
                    <Home size={13} /> Home
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ══ BOX 2 — Section Performance + Study Plan ══ */}
          <div className="space-y-5">

            {/* Section performance */}
            <div className="bg-white rounded-3xl shadow-sm p-6">
              <h3 className="text-sm font-bold text-brand-navy mb-4 flex items-center gap-2">
                <BarChart2 size={15} className="text-brand-orange" /> Section Performance
              </h3>
              <div className="space-y-5">
                {sections.map(sec => {
                  const meta  = SECTION_META[sec.id] || {}
                  const Icon  = meta.Icon || BookOpen
                  const total = sec.correct + sec.wrong + sec.skipped
                  const cW    = total ? (sec.correct / total) * 100 : 0
                  const wW    = total ? (sec.wrong   / total) * 100 : 0
                  const sW    = total ? (sec.skipped / total) * 100 : 0
                  return (
                    <div key={sec.id}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <Icon size={13} className="text-slate-400" />
                          <span className="text-sm font-semibold text-slate-700">{sec.label}</span>
                        </div>
                        <span className={`text-sm font-extrabold tabular-nums ${pctColor(sec.pct)}`}>{sec.pct}%</span>
                      </div>
                      <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-100">
                        <div className="bg-emerald-400 h-full transition-all duration-700" style={{ width: `${cW}%` }} />
                        <div className="bg-red-400 h-full transition-all duration-700"     style={{ width: `${wW}%` }} />
                        <div className="bg-slate-200 h-full transition-all duration-700"   style={{ width: `${sW}%` }} />
                      </div>
                      <div className="flex gap-4 text-[10px] text-slate-400 mt-1.5">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />{sec.correct} correct</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" />{sec.wrong} wrong</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-300 inline-block" />{sec.skipped} skipped</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Study Priority Plan */}
            {critical.length + developing.length > 0 && (
              <div className="bg-white rounded-3xl shadow-sm p-6">
                <h3 className="text-sm font-bold text-brand-navy mb-4 flex items-center gap-2">
                  <ListChecks size={15} className="text-brand-orange" /> Study Priority Plan
                </h3>
                <div className="space-y-4">
                  {[...critical, ...developing].slice(0, 6).map((t, i) => {
                    const label = TOPIC_LABELS[t.topic] || t.topic.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
                    const tip   = TOPIC_TIPS[t.topic] || 'Practise more questions on this topic.'
                    const isRed = t.pct < 50
                    return (
                      <div key={t.topic} className="flex gap-3">
                        <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white mt-0.5
                          ${isRed ? 'bg-red-500' : 'bg-amber-400'}`}>
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-semibold text-slate-800">{label}</span>
                            <span className={`text-xs font-bold tabular-nums ${isRed ? 'text-red-500' : 'text-amber-600'}`}>{t.pct}%</span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">{tip}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ══ BOX 3 — Prediction + Topic Analysis ══ */}
          <div className="space-y-5">

            {/* Prediction card */}
            <div className={`rounded-3xl p-6 border ${pred.bg}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-white/50 flex items-center justify-center flex-shrink-0">
                  <PredIcon size={26} className={pred.color} />
                </div>
                <div>
                  <p className={`font-extrabold text-xl leading-tight ${pred.color}`}>{pred.label}</p>
                  <p className="text-slate-500 text-xs mt-0.5">Overall score: <strong className={pred.color}>{totalPct}%</strong></p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                {totalPct >= 75
                  ? 'Excellent performance! Maintain consistency across all topics to secure your place.'
                  : totalPct >= 50
                  ? 'Good effort. Strengthening weak topics will significantly improve your rank.'
                  : 'Dedicated practice on the critical topics listed below will make a big difference.'}
              </p>
            </div>

            {/* Topic-wise analysis */}
            <div className="bg-white rounded-3xl shadow-sm p-6">
              <h3 className="text-sm font-bold text-brand-navy mb-1 flex items-center gap-2">
                <Zap size={15} className="text-brand-orange" /> Topic-wise Analysis
              </h3>
              <p className="text-[11px] text-slate-400 mb-4">Based on your answers across all sections</p>

              {critical.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                    <span className="text-xs font-bold text-red-700">Critical Focus</span>
                    <span className="text-[10px] text-red-400">— under 50%</span>
                  </div>
                  <div className="space-y-1.5">
                    {critical.map(t => <TopicCard key={t.topic} {...t} />)}
                  </div>
                </div>
              )}

              {developing.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                    <span className="text-xs font-bold text-amber-700">Practice More</span>
                    <span className="text-[10px] text-amber-500">— 50–74%</span>
                  </div>
                  <div className="space-y-1.5">
                    {developing.map(t => <TopicCard key={t.topic} {...t} />)}
                  </div>
                </div>
              )}

              {strong.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span className="text-xs font-bold text-emerald-700">Your Strengths</span>
                    <span className="text-[10px] text-emerald-500">— 75%+</span>
                  </div>
                  <div className="space-y-1.5">
                    {strong.map(t => <TopicCard key={t.topic} {...t} />)}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

// ── Landing Screen ─────────────────────────────────────────────────────────────

function LandingScreen({ config, onStart }) {
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
      <div className="hero-bg py-10 pt-20 px-5 text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">{config.title}</h1>
        <p className="text-white/70 text-sm max-w-xl mx-auto">{config.subtitle}</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-lg font-bold text-brand-navy mb-4">Exam Structure</h2>
        <div className={`grid grid-cols-2 ${['','sm:grid-cols-1','sm:grid-cols-2','sm:grid-cols-3','sm:grid-cols-4'][config.examInfo.length] || 'sm:grid-cols-4'} gap-3 mb-10`}>
          {config.examInfo.map(({ label, qs, time, Icon, color }) => {
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

        <div className="flex flex-wrap gap-4 mb-10">
          {config.markingScheme.map(({ label, val, color }) => (
            <div key={label} className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium ${color}`}>
              <span className="font-extrabold text-lg">{val}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 max-w-lg mx-auto">
          <h2 className="text-xl font-extrabold text-brand-navy mb-1">Start Your Mock Test</h2>
          <p className="text-slate-500 text-sm mb-6">
            Your Roll No is used as the question seed — same ID always generates the same paper.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your Name</label>
              <input type="text" placeholder="e.g. Anil Kumar" value={name}
                onChange={e => { setName(e.target.value); setError('') }}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Roll No / Student ID</label>
              <input type="text" placeholder="e.g. 21BD1A0501" value={studentId}
                onChange={e => { setStudentId(e.target.value); setError('') }}
                onKeyDown={e => e.key === 'Enter' && handleStart()}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange" />
            </div>
            {error && (
              <p className="text-red-600 text-sm flex items-center gap-1.5">
                <AlertTriangle size={13} /> {error}
              </p>
            )}
            <button onClick={handleStart}
              className="w-full py-3.5 rounded-xl bg-brand-navy text-white font-bold text-sm hover:bg-[#1a3a6b] transition-all shadow-lg shadow-navy-900/20 flex items-center justify-center gap-2 mt-2">
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

// ── Main ──────────────────────────────────────────────────────────────────────

export default function CompanyExamPage({ config }) {
  const [phase,        setPhase]        = useState('landing')
  const [paper,        setPaper]        = useState(null)
  const [studentName,  setStudentName]  = useState('')
  const [finalAnswers, setFinalAnswers] = useState(null)
  const [apiError,     setApiError]     = useState('')

  async function handleStart(name, studentId) {
    setStudentName(name)
    setPhase('loading')
    setApiError('')
    try {
      const res = await fetch('/api/company-exam/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exam_id: config.examId, master_seed: studentId }),
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

  function handleFinish(answers) { setFinalAnswers(answers); setPhase('results') }
  function handleRetry()         { setPaper(null); setFinalAnswers(null); setPhase('landing') }

  if (phase === 'landing') return <LandingScreen config={config} onStart={handleStart} />
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
    return <ResultsScreen paper={paper} answers={finalAnswers} studentName={studentName} onRetry={handleRetry} config={config} />

  return null
}
