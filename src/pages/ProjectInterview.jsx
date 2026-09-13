import { useState, useEffect, useRef } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  ArrowLeft, Play, Pause, RotateCcw, CheckCircle2, ChevronDown, ChevronUp,
  MessageSquare, Zap, Lightbulb, AlertTriangle, Globe, TrendingUp,
  Clock, Mic, Briefcase,
} from 'lucide-react'
import { projects } from '../data/projects'

// ── Dynamic follow-up generator ───────────────────────────────────────────────

function getFollowUps(project) {
  const { title, tech, category, summary } = project
  const techList = tech.slice(0, 2).join(' and ')

  const universal = [
    {
      q: `What are the biggest limitations of your current implementation of ${title}?`,
      hint: 'Talk about accuracy gaps, missing edge cases, scalability limits, or assumptions made for simplicity.',
      category: 'trade-off',
    },
    {
      q: `If you had to rebuild ${title} from scratch with 2× the time, what would you do differently?`,
      hint: 'Mention a better architecture, more rigorous testing, more data, or better tooling choices.',
      category: 'reflection',
    },
    {
      q: `How would ${title} behave under real-world conditions versus a controlled lab/test dataset?`,
      hint: 'Discuss real-world noise, edge cases, varied user inputs, and how robust your solution actually is.',
      category: 'edge-case',
    },
    {
      q: `Explain the end-to-end data flow of ${title} in one minute without using code.`,
      hint: 'Input → processing steps → output. Avoid jargon — imagine explaining to a non-technical manager.',
      category: 'communication',
    },
    {
      q: `How would you scale ${title} to serve 10,000 users instead of one?`,
      hint: 'Think about server load, database design, caching, queues, and deployment infrastructure.',
      category: 'scaling',
    },
    {
      q: `What security or privacy concerns exist in ${title} and how would you address them?`,
      hint: 'Input validation, authentication, data encryption, API rate limiting, or GDPR compliance.',
      category: 'security',
    },
  ]

  const categorySpecific = {
    ml: [
      {
        q: `How did you evaluate your model's performance beyond accuracy — did you check precision, recall, F1?`,
        hint: 'Accuracy alone is misleading on imbalanced datasets. Explain your choice of evaluation metric.',
        category: 'technical',
      },
      {
        q: `What is model overfitting, and how did you prevent it in ${title}?`,
        hint: 'Dropout, regularization, cross-validation, early stopping — pick what you actually used.',
        category: 'technical',
      },
      {
        q: `If your model accuracy suddenly dropped by 10% in production, how would you debug it?`,
        hint: 'Check for data drift, preprocessing bugs, or distribution shift between train and live data.',
        category: 'edge-case',
      },
    ],
    web: [
      {
        q: `How does ${title} handle authentication and authorisation?`,
        hint: 'JWT, session cookies, OAuth — explain your choice and the trade-offs.',
        category: 'technical',
      },
      {
        q: `What would happen if the database in ${title} went offline for 30 seconds?`,
        hint: 'Discuss error handling, retry logic, graceful degradation, and user experience.',
        category: 'edge-case',
      },
      {
        q: `How would you optimise the performance of ${title} if page load was taking 4 seconds?`,
        hint: 'Lazy loading, CDN, caching, database indexing, bundle optimisation.',
        category: 'scaling',
      },
    ],
    iot: [
      {
        q: `What happens in ${title} if a sensor sends corrupted or missing data?`,
        hint: 'Data validation, fallback defaults, alerts — show that you\'ve thought about failure modes.',
        category: 'edge-case',
      },
      {
        q: `How does ${title} handle unreliable network connectivity?`,
        hint: 'Local buffering, retry logic, offline mode, MQTT QoS levels.',
        category: 'technical',
      },
      {
        q: `What is the power consumption profile of your IoT device, and how did you optimise it?`,
        hint: 'Sleep modes, polling intervals, data compression, edge processing.',
        category: 'trade-off',
      },
    ],
    data: [
      {
        q: `How did you handle missing or null values in the dataset for ${title}?`,
        hint: 'Imputation, dropping rows, using median/mode, domain-specific strategies.',
        category: 'technical',
      },
      {
        q: `What was your most surprising finding during the exploratory data analysis of ${title}?`,
        hint: 'Pick a genuine insight — outliers, unexpected correlations, class imbalance.',
        category: 'reflection',
      },
      {
        q: `How would you automate the data pipeline in ${title} to refresh every night?`,
        hint: 'Schedulers (cron/Airflow), data validation checks, alerting on failures.',
        category: 'scaling',
      },
    ],
    mobile: [
      {
        q: `How did you manage offline functionality in ${title}?`,
        hint: 'Local storage, SQLite, sync logic when connection restores.',
        category: 'technical',
      },
      {
        q: `How does ${title} handle different screen sizes and OS versions?`,
        hint: 'Responsive layouts, conditional code for API differences, testing on multiple devices.',
        category: 'edge-case',
      },
    ],
    security: [
      {
        q: `How did you test the security controls in ${title} — did you try to break it yourself?`,
        hint: 'Penetration testing, OWASP top 10 checklist, automated scanning tools.',
        category: 'technical',
      },
      {
        q: `What is the risk if someone bypasses the main security mechanism in ${title}?`,
        hint: 'Defense in depth — what else protects the system if the first layer fails?',
        category: 'trade-off',
      },
    ],
  }

  return [...universal, ...(categorySpecific[category] || [])].slice(0, 8)
}

// ── Category badge colours ────────────────────────────────────────────────────

const CAT_COLORS = {
  'trade-off':    'bg-amber-100 text-amber-700',
  reflection:     'bg-purple-100 text-purple-700',
  'edge-case':    'bg-red-100 text-red-700',
  communication:  'bg-blue-100 text-blue-700',
  scaling:        'bg-teal-100 text-teal-700',
  security:       'bg-rose-100 text-rose-700',
  technical:      'bg-slate-100 text-slate-600',
}

// ── Pitch Coach ───────────────────────────────────────────────────────────────

const PITCH_TOTAL = 120 // 2 minutes in seconds

function PitchCoach({ project }) {
  const { title, tech, summary, category } = project
  const [timer,   setTimer]   = useState(PITCH_TOTAL)
  const [running, setRunning] = useState(false)
  const [done,    setDone]    = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running && timer > 0) {
      intervalRef.current = setInterval(() => setTimer(t => {
        if (t <= 1) { clearInterval(intervalRef.current); setRunning(false); setDone(true); return 0 }
        return t - 1
      }), 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  const reset = () => { setTimer(PITCH_TOTAL); setRunning(false); setDone(false) }

  const mins = String(Math.floor(timer / 60)).padStart(2, '0')
  const secs = String(timer % 60).padStart(2, '0')
  const pct  = ((PITCH_TOTAL - timer) / PITCH_TOTAL) * 100

  const statusColor = timer <= 20
    ? 'text-red-500 border-red-200 bg-red-50'
    : timer <= 60
    ? 'text-amber-500 border-amber-200 bg-amber-50'
    : 'text-emerald-600 border-emerald-200 bg-emerald-50'

  const phases = [
    { range: [91, 120], label: '0:00 – 0:29', cue: `Introduce yourself and name the project: "My project is ${title}..."` },
    { range: [61,  90], label: '0:30 – 0:59', cue: `Explain the problem it solves — one clear sentence without jargon.` },
    { range: [31,  60], label: '1:00 – 1:29', cue: `Describe your technical approach: "I used ${tech.slice(0,3).join(', ')} to..."` },
    { range: [ 0,  30], label: '1:30 – 2:00', cue: `Share the outcome and what you learned. End strong: "The result was..."` },
  ]
  const currentPhase = phases.find(p => timer > p.range[0] && timer <= p.range[1]) || phases[3]

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-brand-navy to-brand-blue p-6">
        <div className="flex items-center gap-3 mb-1">
          <Mic size={20} className="text-brand-orange" />
          <h2 className="text-white font-extrabold text-lg">2-Minute Pitch Coach</h2>
        </div>
        <p className="text-white/60 text-sm">Explain your project clearly in under 2 minutes — the first thing every interviewer asks.</p>
      </div>

      <div className="p-6">
        {/* Timer ring */}
        <div className="flex flex-col sm:flex-row gap-6 items-start mb-6">
          <div className="flex-shrink-0 w-full sm:w-auto flex flex-col items-center">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="50" fill="none"
                  stroke={timer <= 20 ? '#ef4444' : timer <= 60 ? '#f59e0b' : '#10b981'}
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - pct / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-3xl font-extrabold tabular-nums ${timer <= 20 ? 'text-red-500' : timer <= 60 ? 'text-amber-500' : 'text-emerald-600'}`}>
                  {mins}:{secs}
                </span>
                <span className="text-slate-400 text-xs">remaining</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setRunning(r => !r)}
                disabled={done}
                className="flex items-center gap-2 px-5 py-2.5 bg-brand-orange text-white font-bold rounded-xl hover:bg-amber-500 active:scale-95 transition text-sm disabled:opacity-40"
              >
                {running ? <><Pause size={14} /> Pause</> : <><Play size={14} /> {timer < PITCH_TOTAL && !done ? 'Resume' : 'Start'}</>}
              </button>
              <button
                onClick={reset}
                className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {/* Phase guide */}
          <div className="flex-1 w-full">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Pitch Guide</p>
            <div className="space-y-2.5">
              {phases.map((ph, i) => {
                const active = currentPhase === ph && running
                return (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-xl transition-all ${active ? 'bg-brand-orange/10 border border-brand-orange/30' : 'bg-slate-50'}`}>
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${active ? 'bg-brand-orange text-white' : 'bg-slate-200 text-slate-500'}`}>
                      {i + 1}
                    </span>
                    <div>
                      <p className={`text-xs font-semibold mb-0.5 ${active ? 'text-brand-orange' : 'text-slate-500'}`}>{ph.label}</p>
                      <p className={`text-sm ${active ? 'text-slate-800 font-medium' : 'text-slate-500'}`}>{ph.cue}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {done && (
          <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
            <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-700 mb-0.5">Time's up — great job!</p>
              <p className="text-emerald-600 text-sm">Was your pitch within 2 minutes? Practice until it flows naturally without hesitation. Reset and go again.</p>
            </div>
          </div>
        )}

        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-500 flex items-start gap-2">
            <Lightbulb size={13} className="text-amber-500 flex-shrink-0 mt-0.5" />
            Practice tip: Record yourself on your phone. Watch it back. Most people speak too fast when nervous — aim for a calm, confident pace.
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Interview Q&A accordion ───────────────────────────────────────────────────

function QuestionCard({ q, a, index, isFollowUp, category: cat }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`rounded-2xl border overflow-hidden ${open ? 'border-brand-navy/20 shadow-sm' : 'border-slate-200'}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-slate-50 transition"
      >
        <span className={`flex-shrink-0 w-7 h-7 rounded-xl text-xs font-bold flex items-center justify-center mt-0.5 ${
          isFollowUp ? 'bg-purple-100 text-purple-700' : 'bg-brand-orange/10 text-brand-orange'
        }`}>
          {isFollowUp ? '↳' : index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[#0B1D3A] text-sm leading-snug">{q}</p>
          {cat && (
            <span className={`inline-flex items-center mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${CAT_COLORS[cat] || 'bg-slate-100 text-slate-500'}`}>
              {cat.replace('-', ' ')}
            </span>
          )}
        </div>
        {open
          ? <ChevronUp size={16} className="text-slate-400 flex-shrink-0 mt-1" />
          : <ChevronDown size={16} className="text-slate-400 flex-shrink-0 mt-1" />
        }
      </button>

      {open && (
        <div className="px-5 pb-5">
          <div className={`ml-11 p-4 rounded-2xl border-l-4 ${isFollowUp ? 'bg-purple-50 border-purple-400' : 'bg-emerald-50 border-emerald-400'}`}>
            {isFollowUp
              ? <p className="text-slate-600 text-sm leading-relaxed"><span className="font-semibold text-purple-700">Hint: </span>{a}</p>
              : <p className="text-slate-700 text-sm leading-relaxed">{a}</p>
            }
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function ProjectInterview() {
  const { id }  = useParams()
  const project = projects.find(p => p.id === id)

  if (!project) return <Navigate to="/projects" replace />

  const { title, tech, vivaQA } = project
  const followUps = getFollowUps(project)

  const [section, setSection] = useState('pitch')

  const SECTIONS = [
    { id: 'pitch',     label: 'Pitch Coach',       icon: Mic },
    { id: 'questions', label: 'Core Questions',    icon: MessageSquare },
    { id: 'followups', label: 'Interviewer Depth', icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
      <div className="hero-bg py-14 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link to={`/projects/${id}`} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-5 transition">
            <ArrowLeft size={15} /> Back to {title}
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight">
            Project Interview Prep
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-2xl">
            Practise your 2-minute pitch, master the core questions, and tackle the tough follow-up questions real interviewers ask about <span className="text-white font-semibold">{title}</span>.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {tech.map(t => (
              <span key={t} className="px-3 py-1 bg-white/10 border border-white/20 text-white/70 rounded-lg text-xs font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Section tabs */}
      <div className="sticky top-16 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 py-2 overflow-x-auto scrollbar-none">
            {SECTIONS.map(({ id: sid, label, icon: Icon }) => (
              <button
                key={sid}
                onClick={() => setSection(sid)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap flex-shrink-0 transition ${
                  section === sid
                    ? 'bg-brand-navy text-white shadow-md'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Pitch Coach ── */}
        {section === 'pitch' && <PitchCoach project={project} />}

        {/* ── Core Questions ── */}
        {section === 'questions' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                <MessageSquare size={20} className="text-brand-orange" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#0B1D3A]">Core Interview Questions</h2>
                <p className="text-slate-500 text-sm">{vivaQA.length} questions — every interviewer asks these for this project</p>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {vivaQA.map((qa, i) => (
                <QuestionCard key={i} q={qa.q} a={qa.a} index={i} isFollowUp={false} />
              ))}
            </div>

            <div className="p-5 bg-brand-navy/5 border border-brand-navy/10 rounded-2xl">
              <p className="font-semibold text-[#0B1D3A] text-sm mb-1 flex items-center gap-2">
                <Zap size={14} className="text-brand-orange" fill="currentColor" />
                Interview vs Viva — what's different
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                In a viva, the examiner tests if you understand what you built.
                In an interview, the interviewer also tests <em>how you think</em> — your problem-solving process, trade-offs you considered, and how you'd handle things going wrong.
                Always end answers with "and the reason I chose this approach was..."
              </p>
            </div>
          </div>
        )}

        {/* ── Follow-up Depth Questions ── */}
        {section === 'followups' && (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <TrendingUp size={20} className="text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#0B1D3A]">Interviewer Depth Questions</h2>
                <p className="text-slate-500 text-sm">The tough follow-ups that separate good candidates from great ones</p>
              </div>
            </div>

            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
              <AlertTriangle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-amber-700 text-sm leading-relaxed">
                There are no "correct" answers here — interviewers want to see <strong>how you think</strong>.
                Show that you considered trade-offs, are honest about limitations, and can reason through problems you haven't solved before.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {followUps.map((fu, i) => (
                <QuestionCard
                  key={i}
                  q={fu.q}
                  a={fu.hint}
                  index={i}
                  isFollowUp={true}
                  category={fu.category}
                />
              ))}
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-6">
              {[
                { icon: Globe, color: 'text-teal-600 bg-teal-50', title: 'Scaling', tip: 'Always think in orders of magnitude — 10×, 100×. Mention load balancers, caching, async processing.' },
                { icon: AlertTriangle, color: 'text-amber-600 bg-amber-50', title: 'Edge Cases', tip: 'Interviewers love edge cases. What happens with empty input, max load, network failure, corrupt data?' },
                { icon: TrendingUp, color: 'text-purple-600 bg-purple-50', title: 'Trade-offs', tip: '"Why X over Y?" is the most common follow-up. Always know why you made each technical choice.' },
              ].map(({ icon: Icon, color, title: t, tip }) => (
                <div key={t} className={`p-4 rounded-2xl border ${color.split(' ')[1]}/30 border-${color.split(' ')[1].replace('bg-', '')}`}>
                  <div className={`w-9 h-9 rounded-xl ${color.split(' ')[1]} flex items-center justify-center mb-3`}>
                    <Icon size={18} className={color.split(' ')[0]} />
                  </div>
                  <p className="font-bold text-slate-800 text-sm mb-1">{t}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA footer */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            to={`/projects/${id}/viva-test`}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-brand-orange text-white font-bold rounded-2xl hover:bg-amber-500 active:scale-95 transition text-sm shadow-lg shadow-amber-200"
          >
            <Zap size={15} fill="currentColor" /> Take Viva Mock Test
          </Link>
          <Link
            to="/hr-prep"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 border-2 border-brand-navy text-brand-navy font-bold rounded-2xl hover:bg-brand-navy hover:text-white transition text-sm"
          >
            <Briefcase size={15} /> HR Round Prep
          </Link>
          <Link
            to="/interview-readiness"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-slate-200 text-slate-600 font-semibold rounded-2xl hover:bg-slate-100 transition text-sm"
          >
            <Clock size={15} /> Readiness Score
          </Link>
        </div>
      </div>
    </div>
  )
}
