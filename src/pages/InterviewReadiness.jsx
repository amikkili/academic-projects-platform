import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen, Code2, Database, MessageCircle, FileText,
  ChevronRight, ChevronLeft, Trophy, AlertTriangle,
  CheckCircle2, Target, ArrowRight, Lightbulb, RotateCcw,
  TrendingUp, TrendingDown, Minus, Zap, Star,
} from 'lucide-react'

// ── Data ───────────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: 'project',
    label: 'Project Knowledge',
    icon: BookOpen,
    colorClass: 'from-brand-navy to-brand-blue',
    hex: '#1B3A6B',
    weight: 25,
    desc: 'How well do you know your final year project?',
    questions: [
      {
        q: 'Can you explain what problem your project solves and why it matters — in under 2 minutes?',
        options: [
          'I struggle to explain it without my report',
          'I can explain the basics but get confused under pressure',
          'I can explain it reasonably well with some prompting',
          'I can explain it clearly and confidently without notes',
          'I can explain it perfectly, with real-world examples and impact',
        ],
      },
      {
        q: 'Can you walk through your project architecture, tech stack, and key modules?',
        options: [
          'I need to refer to the code to answer this',
          'I know the modules but struggle to connect them',
          'I can describe the architecture with some gaps',
          'I can draw and explain the architecture clearly',
          'I can explain every design decision and why I chose it',
        ],
      },
      {
        q: 'Can you discuss challenges you faced during development and how you solved them?',
        options: [
          "I don't remember the specific challenges",
          'I remember some issues but not how I resolved them',
          'I can recall 1–2 challenges with partial solutions',
          'I have 2–3 specific examples ready with clear resolutions',
          'I have detailed stories for multiple challenges with learnings',
        ],
      },
      {
        q: 'Are you prepared to discuss your project\'s limitations and what you would improve?',
        options: [
          'I haven\'t thought about this',
          'I know a few limitations but can\'t suggest improvements',
          'I can name limitations and mention some improvements',
          'I have clear answers on limitations and future scope',
          'I can deeply discuss trade-offs and a full improvement roadmap',
        ],
      },
    ],
    tips: [
      'Practice your 2-minute project pitch out loud — time yourself.',
      'Draw the architecture diagram on paper; explain each component to a friend.',
      'Prepare 3 specific challenges with clear Problem → Approach → Result stories.',
      'List 2–3 limitations and suggest concrete improvements — examiners love this.',
    ],
  },
  {
    id: 'coding',
    label: 'Coding & DSA',
    icon: Code2,
    colorClass: 'from-brand-teal to-cyan-600',
    hex: '#06B6D4',
    weight: 25,
    desc: 'Your data structures, algorithms, and coding ability.',
    questions: [
      {
        q: 'How comfortable are you with core data structures (arrays, linked lists, stacks, trees, graphs)?',
        options: [
          'I know what they are but struggle to use them',
          'I can use arrays and stacks but weaker on trees/graphs',
          'Comfortable with most; shaky on graphs and advanced trees',
          'Comfortable with all; can implement them from scratch',
          'Very strong — I can solve problems using the right structure instantly',
        ],
      },
      {
        q: 'Can you write sorting and searching algorithms (bubble, merge, binary search) from memory?',
        options: [
          'No — I would need to look them up',
          'I can do bubble sort and linear search only',
          'I can write most but might have bugs under pressure',
          'I can write them correctly and explain the logic',
          'I can write them, explain complexity, and compare trade-offs',
        ],
      },
      {
        q: 'How well can you write and debug code during a live interview (on whiteboard or shared screen)?',
        options: [
          "I freeze under pressure and can't write code without an IDE",
          'I can write pseudocode but struggle with actual syntax',
          'I can write code slowly with some syntax errors',
          'I can write correct code at a reasonable pace',
          'I write clean, well-structured code quickly and explain as I go',
        ],
      },
      {
        q: 'Can you analyse the time and space complexity (Big-O) of your solutions?',
        options: [
          "I don't understand Big-O notation",
          'I know O(n) and O(n²) but struggle with the rest',
          'I can estimate complexity for simple algorithms',
          'I can accurately state complexity for most solutions',
          'I can compare multiple approaches and justify the most efficient one',
        ],
      },
    ],
    tips: [
      'Solve 2–3 LeetCode Easy problems daily — consistency beats cramming.',
      'Practice writing code on paper or whiteboard, not just an IDE.',
      'After solving a problem, always ask: "What is the time and space complexity?"',
      'Focus on arrays, strings, and recursion first — they appear most frequently.',
    ],
  },
  {
    id: 'cscore',
    label: 'CS Fundamentals',
    icon: Database,
    colorClass: 'from-purple-600 to-purple-800',
    hex: '#7c3aed',
    weight: 20,
    desc: 'DBMS, OS, Computer Networks, and OOP concepts.',
    questions: [
      {
        q: 'How well do you know Database Management (SQL queries, normalization, ACID, transactions)?',
        options: [
          'I only know basic SELECT queries',
          'I know JOINs and GROUP BY but struggle with normalization',
          'I can write complex queries and explain ACID at a basic level',
          'Comfortable with SQL, normalization up to 3NF, and ACID properties',
          'I can design schemas, optimize queries, and explain transactions in depth',
        ],
      },
      {
        q: 'How comfortable are you with Operating Systems (processes, threads, scheduling, memory management)?',
        options: [
          'I barely remember anything from the OS course',
          'I know processes and threads but not scheduling or memory',
          'I understand scheduling algorithms and basics of memory management',
          'Strong on all major topics: scheduling, paging, deadlock',
          'I can explain kernel-level concepts and compare OS designs',
        ],
      },
      {
        q: 'Can you explain Computer Networks concepts (OSI model, TCP/IP, HTTP, DNS, sockets)?',
        options: [
          'I remember very little from networking',
          'I know HTTP and TCP/UDP but not the OSI layers',
          'I can explain most layers and protocols at a basic level',
          'I can walk through a request lifecycle (DNS → TCP → HTTP)',
          'I can explain protocols, headers, handshakes, and security in depth',
        ],
      },
      {
        q: 'How well do you understand OOP (classes, inheritance, polymorphism, SOLID principles)?',
        options: [
          'I can write classes but struggle to explain the concepts',
          'I understand the four pillars but not SOLID',
          'I can explain pillars and a few SOLID principles with examples',
          'Strong on all pillars and SOLID; can explain design patterns',
          'I can design systems using OOP and justify every design decision',
        ],
      },
    ],
    tips: [
      'Revise SQL: practice JOINs, GROUP BY, subqueries, and EXPLAIN plans.',
      'Study deadlock conditions (Coffman conditions) and prevention strategies.',
      'Draw a diagram of the OSI model and annotate each layer with a real protocol.',
      'Explain SOLID with one code example each — write them out by hand once.',
    ],
  },
  {
    id: 'communication',
    label: 'Communication',
    icon: MessageCircle,
    colorClass: 'from-brand-orange to-amber-500',
    hex: '#F59E0B',
    weight: 15,
    desc: 'Your ability to express ideas clearly and handle pressure.',
    questions: [
      {
        q: 'Can you introduce yourself professionally in 60 seconds (covering education, project, skills, goal)?',
        options: [
          'I ramble and lose track when introducing myself',
          "I have a general idea but it's too long or too vague",
          'I have a structure but it needs more polish',
          'I have a clear, concise 60-second pitch ready',
          'My intro is sharp, memorable, and tailored for the role',
        ],
      },
      {
        q: 'Have you practised behavioural questions (tell me about a challenge, teamwork, failure, leadership)?',
        options: [
          "I haven't thought about these",
          "I know what they are but haven't prepared answers",
          'I have rough answers for 2–3 questions',
          'I have STAR-format answers ready for 5+ questions',
          'I have polished, specific stories for 8+ behavioural questions',
        ],
      },
      {
        q: 'How well can you explain a technical concept (e.g. recursion) to someone non-technical?',
        options: [
          'I use jargon and the person usually gets confused',
          'I try but often overcomplicate it',
          'I can do it with simple examples but it takes time',
          'I can explain clearly using analogies and everyday examples',
          'I naturally simplify ideas and check for understanding as I go',
        ],
      },
      {
        q: 'How do you handle unexpected or difficult questions during an interview?',
        options: [
          'I panic and often go silent',
          "I try to answer but it's disorganised",
          'I take a breath and give a partial answer',
          'I can say "let me think" and give a structured answer',
          'I handle curveball questions calmly and turn them into positives',
        ],
      },
    ],
    tips: [
      'Record a 60-second self-intro and watch it back — refine until it flows naturally.',
      'Prepare 5 STAR-format stories covering: challenge, teamwork, failure, leadership, success.',
      'Practice explaining your project to a family member with zero tech background.',
      'For tough questions: "That\'s a great question, let me think for a moment..." buys you time.',
    ],
  },
  {
    id: 'portfolio',
    label: 'Resume & Portfolio',
    icon: FileText,
    colorClass: 'from-emerald-600 to-teal-600',
    hex: '#10b981',
    weight: 15,
    desc: 'Your resume, GitHub, and overall readiness profile.',
    questions: [
      {
        q: 'How strong is your resume — does it clearly show your project, skills, and impact in 1 page?',
        options: [
          'My resume is outdated or very generic',
          "It has the right info but isn't formatted well or too long",
          'Decent — includes project and skills but could be sharper',
          'Clean, 1-page resume with clear sections and action verbs',
          'ATS-optimised, tailored resume with measurable impact statements',
        ],
      },
      {
        q: 'Is your project code on GitHub with a proper README that anyone can understand?',
        options: [
          'No GitHub profile or no project pushed yet',
          'GitHub exists but the project is there without a README',
          'Project is on GitHub with a basic README',
          'Clear README with setup instructions, screenshots, and tech used',
          'Professional repo with README, demo GIF/link, and clean commit history',
        ],
      },
      {
        q: 'Have you researched the company / role you are targeting and tailored your preparation?',
        options: [
          "I haven't researched any companies yet",
          'I know the company name and basic info',
          'I know their products and can mention them in the interview',
          'I know their tech stack, culture, and recent news',
          'I have tailored answers, skills, and questions for each specific company',
        ],
      },
      {
        q: 'Do you have any certifications, online courses, or internship experience to mention?',
        options: [
          'No extra credentials or experience beyond coursework',
          'Completed 1–2 Udemy/YouTube courses (no certificate)',
          'Have 1 certification or a short internship',
          'Have 2+ certifications or a relevant internship',
          'Multiple certifications, internships, and/or hackathon wins',
        ],
      },
    ],
    tips: [
      'Rewrite every resume bullet as: "Action verb + what you did + result/impact".',
      'Push your project to GitHub today — add a README with screenshots and setup steps.',
      'Spend 15 minutes researching each company before applying; note 2 things about their tech.',
      'Complete one free Google/AWS/Coursera certification — it stands out at entry level.',
    ],
  },
]

// ── Helpers ────────────────────────────────────────────────────────────────────

function getReadiness(score) {
  if (score >= 80) return { label: 'Interview Ready',    color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', hex: '#10b981', icon: Trophy }
  if (score >= 65) return { label: 'Almost There',       color: 'text-teal-600',    bg: 'bg-teal-50 border-teal-200',       hex: '#0d9488', icon: Star }
  if (score >= 50) return { label: 'Good Progress',      color: 'text-amber-600',   bg: 'bg-amber-50 border-amber-200',     hex: '#d97706', icon: TrendingUp }
  if (score >= 35) return { label: 'Needs Preparation',  color: 'text-orange-600',  bg: 'bg-orange-50 border-orange-200',   hex: '#ea580c', icon: AlertTriangle }
  return                  { label: 'Early Stage',         color: 'text-red-600',     bg: 'bg-red-50 border-red-200',         hex: '#dc2626', icon: TrendingDown }
}

// ── SVG Donut (reused pattern) ─────────────────────────────────────────────────

function ReadinessDonut({ score, hex }) {
  const r = 44
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - Math.min(score / 100, 1))

  return (
    <svg viewBox="0 0 120 120" className="w-36 h-36 sm:w-44 sm:h-44">
      <circle cx="60" cy="60" r={r} fill="none" stroke="#f1f5f9" strokeWidth="12" />
      <circle
        cx="60" cy="60" r={r}
        fill="none" stroke={hex} strokeWidth="12"
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round" transform="rotate(-90 60 60)"
        style={{ transition: 'stroke-dashoffset 1s ease, stroke 0.4s' }}
      />
      <text x="60" y="52" textAnchor="middle" fontSize="24" fontWeight="800" fill="#0B1D3A">{score}</text>
      <text x="60" y="67" textAnchor="middle" fontSize="11" fill="#94a3b8">/ 100</text>
      <text x="60" y="82" textAnchor="middle" fontSize="10" fill="#94a3b8">readiness</text>
    </svg>
  )
}

// ── Rating Option ──────────────────────────────────────────────────────────────

function RatingOption({ value, label, selected, onClick }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`w-full text-left flex items-start gap-3 p-3.5 rounded-xl border-2 transition-all active:scale-[0.99] ${
        selected
          ? 'border-brand-navy bg-brand-navy/5 shadow-sm'
          : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
      }`}
    >
      <span className={`w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5 transition-all ${
        selected ? 'bg-brand-navy text-white' : 'bg-slate-100 text-slate-400'
      }`}>
        {value}
      </span>
      <span className={`text-sm leading-snug pt-0.5 ${selected ? 'text-brand-navy font-semibold' : 'text-slate-600'}`}>
        {label}
      </span>
    </button>
  )
}

// ── Stepper dots ───────────────────────────────────────────────────────────────

function StepDots({ total, current }) {
  return (
    <div className="flex items-center gap-2 justify-center mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i < current
              ? 'w-2 h-2 bg-emerald-400'
              : i === current
              ? 'w-6 h-2 bg-brand-orange'
              : 'w-2 h-2 bg-slate-200'
          }`}
        />
      ))}
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function InterviewReadiness() {
  const [step,    setStep]    = useState(0)           // 0..4 = quiz, 5 = results
  const [answers, setAnswers] = useState({})          // { 'project_0': 3, 'coding_2': 5, ... }
  const [phase,   setPhase]   = useState('intro')     // 'intro' | 'quiz' | 'results'

  const section = SECTIONS[step]

  // Compute results
  const results = useMemo(() => {
    return SECTIONS.map(sec => {
      const scores = sec.questions.map((_, qi) => answers[`${sec.id}_${qi}`] ?? 0)
      const total  = scores.reduce((a, b) => a + b, 0)
      const maxPossible = sec.questions.length * 5
      const pct = maxPossible > 0 ? Math.round((total / maxPossible) * 100) : 0
      return { ...sec, pct, scores }
    })
  }, [answers])

  const overallScore = useMemo(() => {
    return Math.round(
      results.reduce((acc, r) => acc + (r.pct * r.weight) / 100, 0)
    )
  }, [results])

  const readiness = getReadiness(overallScore)
  const ReadIcon  = readiness.icon

  const weakSections = results.filter(r => r.pct < 60)

  function setAnswer(key, value) {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  function sectionAnswered() {
    return section.questions.every((_, qi) => answers[`${section.id}_${qi}`] !== undefined)
  }

  function handleNext() {
    if (step < SECTIONS.length - 1) setStep(s => s + 1)
    else setPhase('results')
  }

  function handleBack() {
    if (step > 0) setStep(s => s - 1)
  }

  function handleReset() {
    setStep(0)
    setAnswers({})
    setPhase('intro')
  }

  // ── Intro ──
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="hero-bg py-16 pt-28">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center mx-auto mb-5">
              <Target size={30} className="text-brand-orange" />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-brand-orange text-sm font-semibold mb-5">
              <Zap size={14} fill="currentColor" /> Interview Readiness Score
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              How Ready Are You<br className="hidden sm:block" /> for Your Interview?
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed">
              A 20-question self-assessment across project knowledge, coding, CS fundamentals, communication, and resume — with a personalised readiness score and action plan.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-8">
            <h2 className="font-bold text-[#0B1D3A] text-xl mb-5">What this assessment covers</h2>
            <div className="space-y-3 mb-8">
              {SECTIONS.map((sec, i) => {
                const Icon = sec.icon
                return (
                  <div key={sec.id} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50">
                    <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400 flex-shrink-0">{i + 1}</span>
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${sec.colorClass} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={15} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#0B1D3A] text-sm">{sec.label}</p>
                      <p className="text-slate-400 text-xs">{sec.desc}</p>
                    </div>
                    <span className="text-xs font-bold text-slate-400 flex-shrink-0">{sec.weight}%</span>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <button
                onClick={() => { setPhase('quiz') }}
                className="flex-1 py-4 bg-brand-orange text-white font-bold rounded-2xl hover:bg-amber-500 active:scale-95 transition-all text-base shadow-lg shadow-amber-200 flex items-center justify-center gap-2"
              >
                Start Assessment <ChevronRight size={20} />
              </button>
              <Link
                to="/projects"
                className="px-6 py-4 border-2 border-slate-200 text-slate-600 font-semibold rounded-2xl hover:border-brand-navy hover:text-brand-navy transition text-sm flex items-center justify-center"
              >
                Browse Projects First
              </Link>
            </div>

            <p className="text-slate-400 text-xs text-center mt-4">
              Takes about 5–7 minutes · 20 questions · 5 sections
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ── Quiz ──
  if (phase === 'quiz') {
    const SectionIcon = section.icon
    const answered    = sectionAnswered()

    return (
      <div className="min-h-screen bg-slate-50">
        {/* Top bar */}
        <div className="fixed top-0 inset-x-0 z-40 bg-[#0B1D3A]/95 backdrop-blur-md border-b border-white/10">
          <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-4">
            <button onClick={handleBack} disabled={step === 0} className="text-white/60 hover:text-white transition disabled:opacity-30">
              <ChevronLeft size={20} />
            </button>
            <div className="flex-1">
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div
                  className="h-full bg-brand-orange rounded-full transition-all duration-500"
                  style={{ width: `${((step + 1) / SECTIONS.length) * 100}%` }}
                />
              </div>
            </div>
            <span className="text-white/50 text-sm tabular-nums">{step + 1}/{SECTIONS.length}</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 pt-24 pb-16">
          <StepDots total={SECTIONS.length} current={step} />

          {/* Section header */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${section.colorClass} flex items-center justify-center flex-shrink-0 shadow-lg`}>
              <SectionIcon size={22} className="text-white" />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide">Section {step + 1} of {SECTIONS.length}</p>
              <h2 className="text-xl font-extrabold text-[#0B1D3A]">{section.label}</h2>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-5">
            {section.questions.map((q, qi) => {
              const key = `${section.id}_${qi}`
              const val = answers[key]
              return (
                <div key={qi} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-lg bg-brand-orange/10 text-brand-orange text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {qi + 1}
                    </span>
                    <p className="font-semibold text-[#0B1D3A] text-sm leading-snug">{q.q}</p>
                  </div>
                  <div className="space-y-2">
                    {q.options.map((opt, oi) => (
                      <RatingOption
                        key={oi}
                        value={oi + 1}
                        label={opt}
                        selected={val === oi + 1}
                        onClick={v => setAnswer(key, v)}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Nav buttons */}
          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button
                onClick={handleBack}
                className="px-6 py-4 border-2 border-slate-200 text-slate-600 font-semibold rounded-2xl hover:border-brand-navy hover:text-brand-navy transition text-sm flex items-center gap-2"
              >
                <ChevronLeft size={16} /> Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!answered}
              className={`flex-1 py-4 font-bold rounded-2xl transition-all text-sm flex items-center justify-center gap-2 ${
                answered
                  ? 'bg-brand-orange text-white hover:bg-amber-500 active:scale-95 shadow-lg shadow-amber-200'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {step < SECTIONS.length - 1 ? (
                <>Next Section <ChevronRight size={18} /></>
              ) : (
                <>See My Score <Trophy size={17} /></>
              )}
            </button>
          </div>

          {!answered && (
            <p className="text-center text-slate-400 text-xs mt-3">Answer all {section.questions.length} questions to continue</p>
          )}
        </div>
      </div>
    )
  }

  // ── Results ──
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="hero-bg py-14 pt-24">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-white/60 text-sm mb-1">Your Interview Readiness Score</p>
          <h1 className="text-3xl font-extrabold text-white">Assessment Complete</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">

        {/* Score card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden">
          <div className="hero-bg p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <ReadinessDonut score={overallScore} hex={readiness.hex} />
            <div>
              <p className="text-white/60 text-sm mb-1">Overall Readiness</p>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${readiness.bg} mb-3`}>
                <ReadIcon size={18} className={readiness.color} />
                <span className={`font-extrabold text-lg ${readiness.color}`}>{readiness.label}</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                {overallScore >= 80
                  ? 'You are well-prepared. Fine-tune your weak areas and go nail that interview!'
                  : overallScore >= 65
                  ? 'Strong foundation — a focused 1-2 week sprint will get you to Interview Ready.'
                  : overallScore >= 50
                  ? 'Solid progress. Your action plan below shows exactly where to invest time.'
                  : overallScore >= 35
                  ? 'You have the basics. A structured 3–4 week plan will make a big difference.'
                  : 'Early stage — every expert started here. Follow the action plan and you\'ll improve fast.'}
              </p>
            </div>
          </div>

          {/* Section breakdown */}
          <div className="p-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Section Breakdown</p>
            <div className="space-y-4">
              {results.map(r => {
                const Icon     = r.icon
                const barColor = r.pct >= 80 ? 'bg-emerald-500' : r.pct >= 60 ? 'bg-amber-400' : 'bg-red-400'
                const TIcon    = r.pct >= 80 ? TrendingUp : r.pct >= 60 ? Minus : TrendingDown
                const tColor   = r.pct >= 80 ? 'text-emerald-500' : r.pct >= 60 ? 'text-amber-500' : 'text-red-500'
                return (
                  <div key={r.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${r.colorClass} flex items-center justify-center`}>
                          <Icon size={13} className="text-white" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">{r.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TIcon size={13} className={tColor} />
                        <span className={`text-sm font-bold ${tColor}`}>{r.pct}%</span>
                        <span className="text-xs text-slate-400">({r.weight}% weight)</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className={`h-full rounded-full ${barColor} transition-all duration-700`}
                        style={{ width: `${r.pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Action Plan */}
        {weakSections.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={18} className="text-brand-orange" />
              <h2 className="text-lg font-extrabold text-[#0B1D3A]">Your Action Plan</h2>
              <span className="text-xs bg-brand-orange/10 text-brand-orange font-bold px-2.5 py-1 rounded-full">
                Focus on {weakSections.length} area{weakSections.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="space-y-4">
              {weakSections.map(sec => {
                const Icon = sec.icon
                return (
                  <div key={sec.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className={`flex items-center gap-3 px-5 py-3 bg-gradient-to-r ${sec.colorClass}`}>
                      <Icon size={16} className="text-white" />
                      <span className="text-white font-bold text-sm">{sec.label}</span>
                      <span className="ml-auto text-white/70 text-xs font-semibold">{sec.pct}% — below 60%</span>
                    </div>
                    <ul className="p-5 space-y-2.5">
                      {sec.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            {i + 1}
                          </div>
                          <p className="text-slate-600 text-sm leading-relaxed">{tip}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* All clear */}
        {weakSections.length === 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
            <CheckCircle2 size={32} className="text-emerald-500 mx-auto mb-3" />
            <p className="font-extrabold text-emerald-700 text-lg mb-1">All Areas Above 60%!</p>
            <p className="text-emerald-600 text-sm">You're performing well across all sections. Focus on 80%+ targets to reach Interview Ready status.</p>
          </div>
        )}

        {/* Strong areas */}
        {results.some(r => r.pct >= 80) && (
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <p className="font-bold text-[#0B1D3A] mb-3 flex items-center gap-2">
              <Star size={16} className="text-brand-orange" fill="currentColor" />
              Your Strengths
            </p>
            <div className="flex flex-wrap gap-2">
              {results.filter(r => r.pct >= 80).map(r => {
                const Icon = r.icon
                return (
                  <div key={r.id} className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r ${r.colorClass} text-white text-xs font-semibold`}>
                    <Icon size={13} />
                    {r.label} · {r.pct}%
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* CTA buttons */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <p className="font-bold text-[#0B1D3A] mb-4">What's next?</p>
          <div className="grid sm:grid-cols-3 gap-3">
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-slate-200 text-slate-600 font-semibold rounded-xl hover:border-brand-navy hover:text-brand-navy transition text-sm"
            >
              <RotateCcw size={15} /> Retake
            </button>
            <Link
              to="/projects"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-brand-navy text-white font-semibold rounded-xl hover:bg-brand-blue transition text-sm"
            >
              <BookOpen size={15} /> Browse Projects
            </Link>
            <Link
              to="/internal-marks"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-brand-orange text-white font-semibold rounded-xl hover:bg-amber-500 transition text-sm"
            >
              <Target size={15} /> Mark Estimator
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
