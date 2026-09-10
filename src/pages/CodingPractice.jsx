import { useState, useEffect, useMemo, useCallback } from 'react'
import {
  Zap, BarChart2, Trophy, XCircle, CheckCircle2, RefreshCw,
  ChevronRight, Target, TrendingDown, TrendingUp, Minus,
  BookOpen, Clock, AlertTriangle,
} from 'lucide-react'
import { questions, COMPANIES, TOPICS } from '../data/codingQBank'

// ── localStorage helpers ──────────────────────────────────────────────────────

const LS_KEY = 'academi_weak_topics'

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}') } catch { return {} }
}

function saveHistory(data) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)) } catch {}
}

function updateHistory(topic, correct, total) {
  const hist = loadHistory()
  if (!hist[topic]) hist[topic] = { sessions: 0, correct: 0, total: 0 }
  hist[topic].sessions += 1
  hist[topic].correct  += correct
  hist[topic].total    += total
  hist[topic].lastDate  = new Date().toISOString().split('T')[0]
  saveHistory(hist)
  return hist
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const DIFF_COLOR = {
  Easy:   'bg-emerald-100 text-emerald-700',
  Medium: 'bg-amber-100 text-amber-700',
  Hard:   'bg-red-100 text-red-700',
}

function pctColor(pct) {
  if (pct >= 75) return 'text-emerald-600'
  if (pct >= 50) return 'text-amber-600'
  return 'text-red-500'
}
function pctBar(pct) {
  if (pct >= 75) return 'bg-emerald-500'
  if (pct >= 50) return 'bg-amber-400'
  return 'bg-red-400'
}
function pctIcon(pct) {
  return pct >= 75 ? TrendingUp : pct >= 50 ? Minus : TrendingDown
}

// ── Results ──────────────────────────────────────────────────────────────────

function Results({ qs, answers, company, topic, onRetry, onHome }) {
  const correct = answers.filter((a, i) => a === qs[i].correct).length
  const pct     = Math.round((correct / qs.length) * 100)

  const byTopic = useMemo(() => {
    const map = {}
    qs.forEach((q, i) => {
      if (!map[q.topic]) map[q.topic] = { c: 0, t: 0 }
      map[q.topic].t++
      if (answers[i] === q.correct) map[q.topic].c++
    })
    return map
  }, [qs, answers])

  const prediction = pct >= 80
    ? { label: 'Interview Ready', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', Icon: Trophy }
    : pct >= 60
    ? { label: 'Almost There',    color: 'text-amber-600',   bg: 'bg-amber-50 border-amber-200',   Icon: Target }
    : { label: 'Needs Practice',  color: 'text-red-600',     bg: 'bg-red-50 border-red-200',       Icon: AlertTriangle }

  const weakTopics = Object.entries(byTopic).filter(([, v]) => v.c / v.t < 0.6).map(([k]) => k)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Score card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden mb-5">
        <div className="hero-bg p-8 text-center">
          <p className="text-white/60 text-sm font-medium mb-2">Your Score</p>
          <div className="text-7xl font-extrabold text-white mb-1">
            {pct}<span className="text-3xl text-white/60">%</span>
          </div>
          <p className="text-white/70">{correct} / {qs.length} correct</p>
        </div>

        <div className="p-6">
          <div className={`flex items-center gap-3 p-4 rounded-2xl border ${prediction.bg} mb-5`}>
            <prediction.Icon size={22} className={prediction.color} />
            <p className={`font-bold text-lg ${prediction.color}`}>{prediction.label}</p>
          </div>

          {Object.keys(byTopic).length > 1 && (
            <>
              <h3 className="font-bold text-[#0B1D3A] mb-3 flex items-center gap-2">
                <BarChart2 size={16} className="text-brand-teal" /> Topic Breakdown
              </h3>
              <div className="space-y-3 mb-5">
                {Object.entries(byTopic).map(([tId, { c, t }]) => {
                  const tp   = Math.round((c / t) * 100)
                  const Icon = pctIcon(tp)
                  const topicLabel = TOPICS.find(tt => tt.id === tId)?.label || tId
                  return (
                    <div key={tId}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Icon size={13} className={pctColor(tp)} />
                          <span className="text-sm text-slate-700">{topicLabel}</span>
                        </div>
                        <span className={`text-sm font-bold ${pctColor(tp)}`}>{c}/{t} ({tp}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className={`h-2 rounded-full ${pctBar(tp)} transition-all duration-700`} style={{ width: `${tp}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {weakTopics.length > 0 && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-5">
              <p className="font-semibold text-red-700 mb-2 flex items-center gap-2 text-sm">
                <AlertTriangle size={14} /> Revise these before your interview:
              </p>
              {weakTopics.map(tId => {
                const label = TOPICS.find(tt => tt.id === tId)?.label || tId
                return (
                  <p key={tId} className="text-red-600 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    {label}
                  </p>
                )
              })}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onRetry}
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-navy text-white font-semibold rounded-xl hover:bg-brand-blue transition text-sm"
            >
              <RefreshCw size={14} /> Retry
            </button>
            <button
              onClick={onHome}
              className="flex items-center gap-2 px-5 py-2.5 border-2 border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition text-sm"
            >
              <BookOpen size={14} /> Change Company
            </button>
          </div>
        </div>
      </div>

      {/* Answer Review */}
      <h3 className="font-bold text-[#0B1D3A] text-lg mb-3">Answer Review</h3>
      <div className="space-y-3">
        {qs.map((q, i) => {
          const ok = answers[i] === q.correct
          return (
            <div key={i} className={`bg-white rounded-2xl border p-5 ${ok ? 'border-emerald-200' : 'border-red-200'}`}>
              <div className="flex items-start gap-3 mb-3">
                {ok
                  ? <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  : <XCircle     size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                }
                <p className="font-semibold text-[#0B1D3A] text-sm leading-snug">{q.q}</p>
              </div>
              <div className="ml-8 space-y-1 mb-3">
                {q.options.map((opt, j) => (
                  <div key={j} className={`px-3 py-2 rounded-xl text-sm ${
                    j === q.correct
                      ? 'bg-emerald-50 text-emerald-700 font-semibold'
                      : j === answers[i] && !ok
                      ? 'bg-red-50 text-red-700'
                      : 'text-slate-400'
                  }`}>
                    {j === q.correct && '✓ '}
                    {j === answers[i] && !ok && '✗ '}
                    {opt}
                  </div>
                ))}
              </div>
              {!ok && (
                <div className="ml-8 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-xl">
                  <p className="text-blue-700 text-xs font-semibold mb-0.5">Explanation</p>
                  <p className="text-blue-700 text-sm">{q.explanation}</p>
                </div>
              )}
              <div className="ml-8 mt-2 flex gap-2">
                <span className={`badge ${DIFF_COLOR[q.difficulty]}`}>{q.difficulty}</span>
                <span className="badge bg-slate-100 text-slate-500">
                  {TOPICS.find(t => t.id === q.topic)?.label || q.topic}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Weak Topic Tracker ────────────────────────────────────────────────────────

function WeakTopicTracker() {
  const [hist, setHist] = useState(loadHistory)

  const clear = () => {
    saveHistory({})
    setHist({})
  }

  const entries = Object.entries(hist)
  if (entries.length === 0) return null

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-[#0B1D3A] flex items-center gap-2 text-sm">
          <TrendingUp size={16} className="text-brand-teal" /> Your Progress (saved locally)
        </h3>
        <button onClick={clear} className="text-xs text-slate-400 hover:text-red-500 transition">Reset</button>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {entries.map(([tId, { correct, total, sessions, lastDate }]) => {
          const pct  = total ? Math.min(100, Math.round((correct / total) * 100)) : 0
          const Icon = pctIcon(pct)
          const label = TOPICS.find(t => t.id === tId)?.label || tId
          return (
            <div key={tId} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <Icon size={16} className={pctColor(pct)} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-700 truncate">{label}</p>
                  <span className={`text-xs font-bold ml-2 ${pctColor(pct)}`}>{pct}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1">
                  <div className={`h-1.5 rounded-full ${pctBar(pct)}`} style={{ width: `${pct}%` }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{sessions} session{sessions !== 1 ? 's' : ''} · last {lastDate}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Quiz Engine ───────────────────────────────────────────────────────────────

const Q_PER_SESSION = 8

function Quiz({ company, topics, onDone }) {
  const pool = useMemo(() => {
    const filtered = questions.filter(q =>
      q.company === company && (topics.length === 0 || topics.includes(q.topic))
    )
    return shuffle(filtered).slice(0, Q_PER_SESSION)
  }, [company, topics])

  const [current,  setCurrent]  = useState(0)
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [answers,  setAnswers]  = useState([])

  const q = pool[current]

  function handleOption(idx) {
    if (revealed) return
    setSelected(idx)
    setRevealed(true)
    setAnswers(prev => [...prev, idx])
  }

  function handleNext() {
    if (!revealed) setAnswers(prev => [...prev, -1])
    const next = current + 1
    if (next >= pool.length) {
      // Save to history per topic
      const byTopic = {}
      pool.forEach((q, i) => {
        if (!byTopic[q.topic]) byTopic[q.topic] = { c: 0, t: 0 }
        byTopic[q.topic].t++
        if ((revealed && selected === q.correct) || answers[i] === q.correct) byTopic[q.topic].c++
      })
      Object.entries(byTopic).forEach(([topic, stats]) => updateHistory(topic, stats.c, stats.t || 1))
      onDone(pool, [...answers, revealed ? selected : -1])
    } else {
      setCurrent(next)
      setSelected(null)
      setRevealed(false)
    }
  }

  if (!q) return (
    <div className="text-center py-16 text-slate-400">No questions available for this selection.</div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Progress bar */}
      <div className="flex gap-1.5 mb-6 flex-wrap">
        {pool.map((_, i) => (
          <div key={i} className={`h-2 rounded-full flex-1 min-w-[8px] ${
            i < answers.length
              ? answers[i] === pool[i].correct ? 'bg-emerald-400' : answers[i] === -1 ? 'bg-slate-300' : 'bg-red-400'
              : i === current ? 'bg-brand-orange' : 'bg-slate-200'
          }`} />
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-7 mb-4">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`badge ${DIFF_COLOR[q.difficulty]}`}>{q.difficulty}</span>
          <span className="badge bg-slate-100 text-slate-500">
            {TOPICS.find(t => t.id === q.topic)?.icon} {TOPICS.find(t => t.id === q.topic)?.label || q.topic}
          </span>
          <span className="badge bg-brand-navy/10 text-brand-navy">Q{current + 1}/{pool.length}</span>
        </div>

        <p className="text-[#0B1D3A] font-bold text-lg leading-snug mb-6">{q.q}</p>

        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            let style = 'border-slate-200 text-slate-700 hover:border-brand-navy hover:bg-slate-50 cursor-pointer'
            if (revealed) {
              if (idx === q.correct)      style = 'border-emerald-400 bg-emerald-50 text-emerald-800 font-semibold cursor-default'
              else if (idx === selected)  style = 'border-red-400 bg-red-50 text-red-700 cursor-default'
              else                        style = 'border-slate-100 text-slate-400 cursor-default'
            } else if (selected === idx) style = 'border-brand-navy bg-brand-navy/5 text-brand-navy font-semibold'
            return (
              <button
                key={idx}
                onClick={() => handleOption(idx)}
                disabled={revealed}
                className={`w-full text-left px-5 py-4 rounded-2xl border-2 text-sm transition-all active:scale-[0.99] ${style}`}
              >
                <span className="font-bold text-xs mr-2 opacity-50">{String.fromCharCode(65 + idx)}.</span>
                {opt}
              </button>
            )
          })}
        </div>

        {revealed && (
          <div className={`mt-5 p-4 rounded-2xl border-l-4 ${selected === q.correct ? 'bg-emerald-50 border-emerald-400' : 'bg-blue-50 border-blue-400'}`}>
            <p className={`text-xs font-semibold mb-1 ${selected === q.correct ? 'text-emerald-700' : 'text-blue-700'}`}>
              {selected === q.correct ? '✓ Correct!' : '✗ Incorrect — Explanation'}
            </p>
            <p className={`text-sm ${selected === q.correct ? 'text-emerald-700' : 'text-blue-700'}`}>
              {q.explanation}
            </p>
          </div>
        )}
      </div>

      <button
        onClick={handleNext}
        className="w-full py-4 bg-brand-navy text-white font-bold rounded-2xl hover:bg-brand-blue active:scale-[0.99] transition text-sm flex items-center justify-center gap-2"
      >
        {current + 1 < pool.length
          ? <>{revealed ? 'Next Question' : 'Skip'} <ChevronRight size={18} /></>
          : 'See My Results →'
        }
      </button>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function CodingPractice() {
  const [phase,       setPhase]       = useState('home')   // home | quiz | results
  const [company,     setCompany]     = useState(null)
  const [topics,      setTopics]      = useState([])       // [] = all
  const [quizQs,      setQuizQs]      = useState([])
  const [quizAnswers, setQuizAnswers] = useState([])

  const companyObj = COMPANIES.find(c => c.id === company)

  const availableTopics = useMemo(() => {
    if (!company) return []
    const seen = new Set(questions.filter(q => q.company === company).map(q => q.topic))
    return TOPICS.filter(t => seen.has(t.id))
  }, [company])

  const toggleTopic = (tId) => {
    setTopics(prev => prev.includes(tId) ? prev.filter(t => t !== tId) : [...prev, tId])
  }

  const startQuiz = () => {
    setQuizQs([])
    setQuizAnswers([])
    setPhase('quiz')
  }

  const handleDone = useCallback((qs, answers) => {
    setQuizQs(qs)
    setQuizAnswers(answers)
    setPhase('results')
  }, [])

  const handleRetry = () => {
    setPhase('quiz')
    setQuizQs([])
    setQuizAnswers([])
  }

  const handleHome = () => {
    setPhase('home')
    setCompany(null)
    setTopics([])
  }

  // ── Home ──
  if (phase === 'home') {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="hero-bg py-16 pt-28">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-brand-orange text-sm font-semibold mb-5">
              <Zap size={14} fill="currentColor" /> Coding & Aptitude Practice
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              Practice by Company Pattern
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto">
              {Q_PER_SESSION}-question sessions tailored to TCS, Infosys, Wipro, and product company question patterns. Track your weak topics over time.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <WeakTopicTracker />

          <h2 className="text-xl font-extrabold text-[#0B1D3A] mb-4">Select a Company Pattern</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {COMPANIES.map(c => {
              const qCount = questions.filter(q => q.company === c.id).length
              const selected = company === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => { setCompany(c.id === company ? null : c.id); setTopics([]) }}
                  className={`text-left p-5 rounded-2xl border-2 transition-all ${
                    selected
                      ? 'border-brand-orange bg-brand-orange/5 shadow-md'
                      : 'border-slate-200 bg-white hover:border-brand-navy'
                  }`}
                >
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 ${c.badge}`}>
                    {c.label}
                  </div>
                  <p className="font-bold text-[#0B1D3A] text-base">{c.label} Pattern</p>
                  <p className="text-slate-400 text-sm mt-1">{qCount} questions · Quant, Logical, Technical</p>
                  {selected && (
                    <div className="mt-3 flex items-center gap-1.5 text-brand-orange text-xs font-semibold">
                      <CheckCircle2 size={13} /> Selected
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Topic filter */}
          {company && availableTopics.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-[#0B1D3A] mb-3 text-sm">Filter by Topic <span className="text-slate-400 font-normal">(optional — leave blank for all)</span></h3>
              <div className="flex flex-wrap gap-2">
                {availableTopics.map(t => {
                  const on = topics.includes(t.id)
                  return (
                    <button
                      key={t.id}
                      onClick={() => toggleTopic(t.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border-2 transition ${
                        on ? 'border-brand-orange bg-brand-orange/10 text-brand-orange' : 'border-slate-200 text-slate-600 hover:border-brand-navy'
                      }`}
                    >
                      {t.icon} {t.label}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Start button */}
          <button
            onClick={startQuiz}
            disabled={!company}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white font-bold rounded-2xl hover:bg-amber-500 active:scale-95 transition shadow-lg shadow-amber-200 text-base disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Zap size={18} fill="currentColor" /> Start {Q_PER_SESSION}-Question Session
          </button>
          {!company && (
            <p className="text-slate-400 text-sm mt-2">Select a company pattern above to begin</p>
          )}
        </div>
      </div>
    )
  }

  // ── Quiz ──
  if (phase === 'quiz') {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="fixed top-0 inset-x-0 z-40 bg-[#0B1D3A]/95 backdrop-blur-md border-b border-white/10">
          <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
            <button onClick={handleHome} className="text-white/60 hover:text-white transition text-sm">
              ← Exit
            </button>
            <div className="flex-1 text-center">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${companyObj?.badge}`}>
                {companyObj?.label} Pattern
              </span>
            </div>
            {topics.length > 0 && (
              <span className="text-white/40 text-xs">{topics.length} topic{topics.length > 1 ? 's' : ''}</span>
            )}
          </div>
        </div>
        <Quiz company={company} topics={topics} onDone={handleDone} />
      </div>
    )
  }

  // ── Results ──
  if (phase === 'results') {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="hero-bg py-12 pt-24">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <p className="text-white/60 text-sm mb-1">{companyObj?.label} Pattern</p>
            <h1 className="text-3xl font-extrabold text-white">Your Results</h1>
          </div>
        </div>
        <Results
          qs={quizQs}
          answers={quizAnswers}
          company={company}
          topic={topics[0]}
          onRetry={handleRetry}
          onHome={handleHome}
        />
      </div>
    )
  }
}
