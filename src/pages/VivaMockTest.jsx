import { useState, useEffect, useCallback } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  ArrowLeft, Clock, CheckCircle2, XCircle, ChevronRight,
  Trophy, AlertTriangle, BookOpen, BarChart2, RefreshCw,
  Mic2, Target, TrendingUp, TrendingDown, Minus,
} from 'lucide-react'
import { projects } from '../data/projects'
import { vivaMCQ }  from '../data/vivaMCQ'

const QUESTION_TIME = 30 // seconds per question

// ── helpers ────────────────────────────────────────────────────────────────

function groupByConcept(questions, answers) {
  const map = {}
  questions.forEach((q, i) => {
    if (!map[q.concept]) map[q.concept] = { correct: 0, total: 0 }
    map[q.concept].total++
    if (answers[i] === q.correct) map[q.concept].correct++
  })
  return map
}

function predictionLabel(pct) {
  if (pct >= 80) return { label: 'Viva Ready',          color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', icon: Trophy }
  if (pct >= 60) return { label: 'Good — Minor Gaps',   color: 'text-amber-600',   bg: 'bg-amber-50 border-amber-200',   icon: Target }
  if (pct >= 40) return { label: 'Needs Preparation',   color: 'text-orange-600',  bg: 'bg-orange-50 border-orange-200', icon: AlertTriangle }
  return              { label: 'At Risk — Revise More', color: 'text-red-600',     bg: 'bg-red-50 border-red-200',       icon: XCircle }
}

function predictedMarks(pct) {
  // Scale to 10-mark viva (university typical)
  return (pct / 100 * 10).toFixed(1)
}

// ── Timer bar ───────────────────────────────────────────────────────────────

function TimerBar({ seconds, total }) {
  const pct = (seconds / total) * 100
  const color = seconds <= 8 ? 'bg-red-500' : seconds <= 15 ? 'bg-amber-400' : 'bg-brand-teal'
  return (
    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-1000 ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

// ── Results View ─────────────────────────────────────────────────────────────

function Results({ questions, answers, project, onRetry }) {
  const correct  = answers.filter((a, i) => a === questions[i].correct).length
  const total    = questions.length
  const pct      = Math.round((correct / total) * 100)
  const pred     = predictionLabel(pct)
  const PredIcon = pred.icon
  const concepts = groupByConcept(questions, answers)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Score card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden mb-6">
        <div className="hero-bg p-8 text-center">
          <p className="text-white/60 text-sm font-medium mb-2">Your Viva Score</p>
          <div className="text-7xl font-extrabold text-white mb-1">{pct}<span className="text-3xl text-white/60">%</span></div>
          <p className="text-white/70">{correct} / {total} correct</p>
        </div>

        <div className="p-6">
          {/* Prediction badge */}
          <div className={`flex items-center gap-3 p-4 rounded-2xl border ${pred.bg} mb-6`}>
            <PredIcon size={24} className={pred.color} />
            <div>
              <p className={`font-bold text-lg ${pred.color}`}>{pred.label}</p>
              <p className="text-slate-500 text-sm">
                Predicted viva marks: <strong className={pred.color}>{predictedMarks(pct)} / 10</strong>
              </p>
            </div>
          </div>

          {/* Concept-wise breakdown */}
          <h3 className="font-bold text-[#0B1D3A] text-lg mb-4 flex items-center gap-2">
            <BarChart2 size={18} className="text-brand-teal" /> Concept-wise Breakdown
          </h3>
          <div className="space-y-3 mb-6">
            {Object.entries(concepts).map(([concept, { correct: c, total: t }]) => {
              const cpct = Math.round((c / t) * 100)
              const barColor = cpct >= 80 ? 'bg-emerald-500' : cpct >= 60 ? 'bg-amber-400' : 'bg-red-400'
              const Icon = cpct >= 80 ? TrendingUp : cpct >= 60 ? Minus : TrendingDown
              const icolor = cpct >= 80 ? 'text-emerald-500' : cpct >= 60 ? 'text-amber-500' : 'text-red-500'
              return (
                <div key={concept}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Icon size={14} className={icolor} />
                      <span className="text-slate-700 text-sm font-medium">{concept}</span>
                    </div>
                    <span className={`text-sm font-bold ${icolor}`}>{c}/{t} ({cpct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className={`h-full rounded-full ${barColor} transition-all duration-700`} style={{ width: `${cpct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Weak areas */}
          {Object.entries(concepts).some(([, { correct: c, total: t }]) => c / t < 0.6) && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-6">
              <p className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                <AlertTriangle size={15} /> Focus on these before your viva:
              </p>
              <ul className="space-y-1">
                {Object.entries(concepts)
                  .filter(([, { correct: c, total: t }]) => c / t < 0.6)
                  .map(([concept]) => (
                    <li key={concept} className="text-red-600 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      {concept}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onRetry}
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-navy text-white font-semibold rounded-xl hover:bg-navy-800 transition text-sm"
            >
              <RefreshCw size={15} /> Retake Test
            </button>
            <Link
              to={`/projects/${project.id}`}
              className="flex items-center gap-2 px-5 py-2.5 border-2 border-brand-navy text-brand-navy font-semibold rounded-xl hover:bg-brand-navy hover:text-white transition text-sm"
            >
              <BookOpen size={15} /> Review Viva Q&A
            </Link>
            <Link
              to="/projects"
              className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition text-sm"
            >
              Browse Projects
            </Link>
          </div>
        </div>
      </div>

      {/* Detailed answer review */}
      <h3 className="font-bold text-[#0B1D3A] text-xl mb-4">Answer Review</h3>
      <div className="space-y-4">
        {questions.map((q, i) => {
          const chosen  = answers[i]
          const isRight = chosen === q.correct
          return (
            <div
              key={i}
              className={`bg-white rounded-2xl border p-5 ${isRight ? 'border-emerald-200' : 'border-red-200'}`}
            >
              <div className="flex items-start gap-3 mb-3">
                {isRight
                  ? <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  : <XCircle     size={20} className="text-red-500     flex-shrink-0 mt-0.5" />}
                <p className="font-semibold text-[#0B1D3A] text-sm leading-snug">{q.q}</p>
              </div>

              <div className="ml-8 space-y-1 mb-3">
                {q.options.map((opt, j) => (
                  <div
                    key={j}
                    className={`px-3 py-2 rounded-xl text-sm ${
                      j === q.correct
                        ? 'bg-emerald-50 text-emerald-700 font-semibold'
                        : j === chosen && !isRight
                        ? 'bg-red-50 text-red-700'
                        : 'text-slate-500'
                    }`}
                  >
                    {j === q.correct && '✓ '}
                    {j === chosen && !isRight && '✗ '}
                    {opt}
                  </div>
                ))}
              </div>

              {!isRight && (
                <div className="ml-8 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-xl">
                  <p className="text-blue-700 text-xs font-semibold mb-0.5">Explanation</p>
                  <p className="text-blue-700 text-sm">{q.explanation}</p>
                </div>
              )}

              <div className="ml-8 mt-2">
                <span className="inline-flex items-center px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-medium">
                  {q.concept}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Main component ──────────────────────────────────────────────────────────

export default function VivaMockTest() {
  const { id }      = useParams()
  const project     = projects.find(p => p.id === id)
  const questions   = vivaMCQ[id]

  const [phase,    setPhase]    = useState('intro')   // 'intro' | 'test' | 'results'
  const [current,  setCurrent]  = useState(0)
  const [answers,  setAnswers]  = useState([])
  const [selected, setSelected] = useState(null)      // chosen option index for current Q
  const [revealed, setRevealed] = useState(false)     // show correct after choosing
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME)

  if (!project || !questions) return <Navigate to="/projects" replace />

  const totalQ = questions.length

  // Timer countdown
  useEffect(() => {
    if (phase !== 'test' || revealed) return
    if (timeLeft === 0) { handleTimeUp(); return }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [phase, timeLeft, revealed])

  const handleTimeUp = useCallback(() => {
    setAnswers(prev => [...prev, -1]) // -1 = timed out / skipped
    advance()
  }, [current, totalQ])

  function advance() {
    const next = current + 1
    if (next >= totalQ) {
      setPhase('results')
    } else {
      setCurrent(next)
      setSelected(null)
      setRevealed(false)
      setTimeLeft(QUESTION_TIME)
    }
  }

  function handleOption(idx) {
    if (revealed) return
    setSelected(idx)
    setRevealed(true)
    setAnswers(prev => [...prev, idx])
  }

  function handleNext() {
    if (!revealed) {
      // skipped — count as wrong
      setAnswers(prev => [...prev, -1])
    }
    advance()
  }

  function handleRetry() {
    setCurrent(0)
    setAnswers([])
    setSelected(null)
    setRevealed(false)
    setTimeLeft(QUESTION_TIME)
    setPhase('intro')
  }

  const q = questions[current]

  // ── Intro ──
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="hero-bg py-20 pt-28">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center mx-auto mb-5">
              <Mic2 size={30} className="text-brand-orange" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Viva Mock Test</h1>
            <p className="text-white/70 text-lg mb-2">{project.title}</p>
            <p className="text-white/50 text-sm">Predict your viva score before the real examination</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-8">
            <h2 className="font-bold text-[#0B1D3A] text-xl mb-5">Before you begin</h2>
            <ul className="space-y-3 mb-8">
              {[
                [`${totalQ} multiple-choice questions`, 'Each covers a key concept examiners test'],
                [`${QUESTION_TIME} seconds per question`, 'Unanswered questions are marked wrong — just like a real viva'],
                ['Concept-wise score breakdown', 'See exactly which topics you need to revise'],
                ['Predicted viva marks', 'Get a score out of 10, matching university grading'],
              ].map(([title, desc]) => (
                <li key={title} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-brand-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#0B1D3A] text-sm">{title}</span>
                    <span className="text-slate-400 text-sm"> — {desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex gap-3">
              <button
                onClick={() => setPhase('test')}
                className="flex-1 py-3.5 bg-brand-orange text-white font-bold rounded-2xl hover:bg-amber-500 active:scale-95 transition-all text-base shadow-lg shadow-amber-200"
              >
                Start Test →
              </button>
              <Link
                to={`/projects/${id}`}
                className="px-5 py-3.5 border-2 border-slate-200 text-slate-600 font-semibold rounded-2xl hover:border-brand-navy hover:text-brand-navy transition text-sm flex items-center"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Results ──
  if (phase === 'results') {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="hero-bg py-14 pt-24">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <p className="text-white/60 text-sm mb-1">{project.title}</p>
            <h1 className="text-3xl font-extrabold text-white">Your Results</h1>
          </div>
        </div>
        <Results questions={questions} answers={answers} project={project} onRetry={handleRetry} />
      </div>
    )
  }

  // ── Test ──
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="fixed top-0 inset-x-0 z-40 bg-[#0B1D3A]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link to={`/projects/${id}`} className="text-white/60 hover:text-white transition">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex-1">
            <TimerBar seconds={timeLeft} total={QUESTION_TIME} />
          </div>
          <div className={`flex items-center gap-1.5 text-sm font-bold min-w-[3.5rem] justify-end ${
            timeLeft <= 8 ? 'text-red-400' : 'text-white'
          }`}>
            <Clock size={14} />
            {timeLeft}s
          </div>
          <span className="text-white/40 text-sm">{current + 1}/{totalQ}</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-24 pb-16">
        {/* Progress dots */}
        <div className="flex gap-1.5 mb-8 flex-wrap">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full flex-1 min-w-[8px] transition-all ${
                i < answers.length
                  ? answers[i] === questions[i].correct
                    ? 'bg-emerald-400'
                    : answers[i] === -1
                    ? 'bg-slate-300'
                    : 'bg-red-400'
                  : i === current
                  ? 'bg-brand-orange'
                  : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Question card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-7 mb-5">
          <div className="flex items-center gap-2 mb-5">
            <span className="badge bg-slate-100 text-slate-500">{q.concept}</span>
            <span className="badge bg-brand-orange/10 text-brand-orange">Q{current + 1}</span>
          </div>

          <p className="text-[#0B1D3A] font-bold text-lg leading-snug mb-6">{q.q}</p>

          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              let style = 'border-slate-200 text-slate-700 hover:border-brand-navy hover:bg-slate-50'
              if (revealed) {
                if (idx === q.correct)           style = 'border-emerald-400 bg-emerald-50 text-emerald-800 font-semibold'
                else if (idx === selected)        style = 'border-red-400 bg-red-50 text-red-700'
                else                             style = 'border-slate-100 text-slate-400'
              } else if (selected === idx)       style = 'border-brand-navy bg-brand-navy/5 text-brand-navy font-semibold'

              return (
                <button
                  key={idx}
                  onClick={() => handleOption(idx)}
                  disabled={revealed}
                  className={`w-full text-left px-5 py-4 rounded-2xl border-2 text-sm transition-all ${style} ${!revealed ? 'active:scale-[0.99] cursor-pointer' : 'cursor-default'}`}
                >
                  <span className="font-bold text-xs mr-2 opacity-60">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </button>
              )
            })}
          </div>

          {/* Explanation after reveal */}
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

        {/* Next button */}
        <button
          onClick={handleNext}
          className="w-full py-4 bg-brand-navy text-white font-bold rounded-2xl hover:bg-brand-blue active:scale-[0.99] transition-all text-sm flex items-center justify-center gap-2"
        >
          {current + 1 < totalQ ? (
            <>{revealed ? 'Next Question' : 'Skip'} <ChevronRight size={18} /></>
          ) : (
            'See My Results →'
          )}
        </button>
      </div>
    </div>
  )
}
