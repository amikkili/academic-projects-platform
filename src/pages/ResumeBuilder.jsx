import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  FileText, Download, Copy, Check, Link2, Zap,
  ArrowRight, Trash2, ChevronDown, ChevronUp,
  BarChart2, Users, Clock, Award, GraduationCap, Briefcase, Sparkles, AlertCircle,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

// ── URL encoding ──────────────────────────────────────────────────────────────

function b64encode(str) { return btoa(unescape(encodeURIComponent(str))) }
function b64decode(str) { try { return decodeURIComponent(escape(atob(str))) } catch { return null } }

function loadFromHash() {
  const hash = window.location.hash.slice(1)
  if (!hash) return null
  const decoded = b64decode(hash)
  try { return decoded ? JSON.parse(decoded) : null } catch { return null }
}

// ── Bullet generators ─────────────────────────────────────────────────────────

function generateFresherBullets(p) {
  if (!p.title || !p.role || !p.solution) return []
  const bullets = []

  // Primary
  bullets.push(
    [
      `${p.role} ${p.title}`,
      p.solution && `— ${p.solution}`,
      p.metric    && `, achieving ${p.metric}`,
      p.outcome   && `; ${p.outcome}`,
    ].filter(Boolean).join('') + '.'
  )

  // Tech
  if (p.tech) {
    bullets.push(
      `Built using ${p.tech}${p.duration ? ` over ${p.duration}` : ''}, gaining hands-on experience across the full project lifecycle from design to deployment.`
    )
  }

  // Problem → solution
  if (p.problem) {
    bullets.push(
      `Addressed the challenge of ${p.problem} by designing and implementing ${p.solution.toLowerCase().trim().replace(/\.$/, '')}.`
    )
  }

  // Quantified outcome
  if (p.metric && p.users) {
    bullets.push(
      `Validated with ${p.metric} on ${p.users}, demonstrating real-world reliability and generalisability.`
    )
  } else if (p.metric) {
    bullets.push(`Achieved ${p.metric} on held-out test data, demonstrating model accuracy and reliability.`)
  } else if (p.users) {
    bullets.push(`Tested across ${p.users}, validating system stability and end-to-end functionality.`)
  }

  return bullets
}

function generateFresherSummary(p) {
  if (!p.title || !p.role) return ''
  return [
    `${p.role} ${p.title}`,
    p.tech && `using ${p.tech}`,
    p.duration && `over ${p.duration}`,
    p.metric && `achieving ${p.metric}`,
    p.outcome && `— ${p.outcome}`,
  ].filter(Boolean).join(', ').replace(', —', ' —') + '.'
}

function generateExpBullets(p) {
  if (!p.title || !p.role || !p.solution) return []
  const bullets = []

  // 1. Impact-first (always generated)
  bullets.push(
    [
      `${p.role} ${p.title}`,
      p.company && `at ${p.company}`,
      `— ${p.solution}`,
      p.business_impact && `, resulting in ${p.business_impact}`,
    ].filter(Boolean).join(' ') + '.'
  )

  // 2. Before → After (if both provided)
  if (p.before_metric && p.after_metric) {
    bullets.push(
      `Reduced / improved ${p.before_metric.toLowerCase()} to ${p.after_metric.toLowerCase()} by implementing ${p.solution.toLowerCase().replace(/\.$/, '')}, delivering measurable efficiency gains.`
    )
  }

  // 3. Team leadership (if team size provided)
  if (p.team_size) {
    bullets.push(
      `Led a team of ${p.team_size} engineer${parseInt(p.team_size) > 1 ? 's' : ''}${p.duration ? ` over ${p.duration}` : ''} to design, build, and ship ${p.title}${p.business_impact ? `, ${p.business_impact}` : ''}.`
    )
  }

  // 4. Tech + scale
  if (p.tech) {
    bullets.push(
      [
        `Engineered ${p.title} using ${p.tech}`,
        p.scale && `to handle ${p.scale}`,
        p.perf_metric && `, achieving ${p.perf_metric}`,
        !p.scale && !p.perf_metric && `, ensuring scalability, maintainability, and production readiness`,
      ].filter(Boolean).join('') + '.'
    )
  }

  // 5. Scale alone (if tech not given but scale is)
  if (!p.tech && p.scale) {
    bullets.push(
      `Designed and delivered ${p.title} capable of handling ${p.scale}${p.perf_metric ? `, with ${p.perf_metric}` : ''}.`
    )
  }

  // 6. Quantified performance metric
  if (p.perf_metric && !p.tech) {
    bullets.push(`Achieved ${p.perf_metric} through systematic optimisation and rigorous testing of ${p.title}.`)
  }

  return bullets.filter(Boolean)
}

function generateExpSummary(p) {
  if (!p.title || !p.role) return ''
  return [
    p.exp_years && `${p.exp_years} of experience`,
    `${p.role} of ${p.title}`,
    p.company && `at ${p.company}`,
    p.tech && `using ${p.tech}`,
    p.business_impact && `— ${p.business_impact}`,
  ].filter(Boolean).join(', ').replace(', —', ' —') + '.'
}

// ── Default state ─────────────────────────────────────────────────────────────

const DEFAULT_FRESHER = {
  title: '', role: '', tech: '', duration: '',
  problem: '', solution: '', outcome: '', metric: '', users: '',
}

const DEFAULT_EXP = {
  title: '', role: '', company: '', exp_years: '', team_size: '',
  tech: '', duration: '',
  problem: '', solution: '',
  business_impact: '', before_metric: '', after_metric: '',
  scale: '', perf_metric: '',
}

// ── Reusable Field ────────────────────────────────────────────────────────────

function Field({ label, placeholder, value, onChange, type = 'text', hint, optional, accent }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</label>
        {optional && <span className="text-[10px] text-slate-400">optional</span>}
      </div>
      {type === 'textarea' ? (
        <textarea
          rows={2}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-3 py-2.5 rounded-xl border text-sm text-slate-700 focus:outline-none focus:ring-2 resize-none ${
            accent
              ? 'border-purple-200 focus:ring-purple-400/40 focus:border-purple-400'
              : 'border-slate-200 focus:ring-brand-orange/40 focus:border-brand-orange'
          }`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-3 py-2.5 rounded-xl border text-sm text-slate-700 focus:outline-none focus:ring-2 ${
            accent
              ? 'border-purple-200 focus:ring-purple-400/40 focus:border-purple-400'
              : 'border-slate-200 focus:ring-brand-orange/40 focus:border-brand-orange'
          }`}
        />
      )}
      {hint && <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{hint}</p>}
    </div>
  )
}

// ── Bullet list item ──────────────────────────────────────────────────────────

function BulletItem({ text, index, accent }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="flex items-start gap-3 group">
      <span className={`flex-shrink-0 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center mt-0.5 ${accent ? 'bg-purple-600' : 'bg-brand-orange'}`}>
        {index + 1}
      </span>
      <p className="flex-1 text-slate-700 text-sm leading-relaxed">{text}</p>
      <button
        onClick={copy}
        className={`flex-shrink-0 opacity-0 group-hover:opacity-100 transition p-1.5 rounded-lg ${
          copied ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
        }`}
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
      </button>
    </div>
  )
}

// ── Tips ──────────────────────────────────────────────────────────────────────

const FRESHER_TIPS = [
  { icon: BarChart2, color: 'text-teal-600 bg-teal-50', title: 'Quantify everything', body: '"85% accuracy" beats "high accuracy". "Reduced time by 40%" beats "improved performance". Use approximate ranges if you don\'t have exact numbers.' },
  { icon: Award,     color: 'text-amber-600 bg-amber-50', title: 'Lead with the impact', body: '"Achieved 92% F1 by implementing LSTM classification" > "Implemented LSTM for sentiment analysis". Action verb + outcome + method.' },
  { icon: Users,     color: 'text-purple-600 bg-purple-50', title: 'Write for HR first', body: 'HR screens resumes before engineers. Keep the first bullet jargon-free. Pattern: impact first, technical detail second.' },
  { icon: Clock,     color: 'text-rose-600 bg-rose-50', title: 'Match the JD keywords', body: 'Copy exact keywords from the job description — "REST APIs", "Agile", "Full-stack". ATS systems rank you on keyword match before a human reads it.' },
]

const EXP_TIPS = [
  { icon: BarChart2, color: 'text-purple-600 bg-purple-50', title: 'Business impact > technical detail', body: '"Saved $200K/year by automating X" is stronger than "Built an automation script using Python". Quantify in revenue, cost, time, or users.' },
  { icon: Award,     color: 'text-teal-600 bg-teal-50', title: 'Before → After format', body: 'The most powerful senior bullet pattern: "Reduced deployment time from 4 hours to 12 minutes by building a CI/CD pipeline." Gives context, action, and proof.' },
  { icon: Users,     color: 'text-amber-600 bg-amber-50', title: 'Own your leadership', body: '"Led a team of 4 engineers" shows scope and seniority. Even informal team leadership (mentoring, code reviews, tech decisions) counts — claim it.' },
  { icon: Clock,     color: 'text-rose-600 bg-rose-50', title: 'System scale matters', body: '"Serving 5M daily users" or "processing 500K events/min" signals that you\'ve worked at production scale. Include it even if you didn\'t design it — you operated it.' },
]

function TipsPanel({ tips, accent }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition">
        <span className={`font-bold text-[#0B1D3A] text-sm flex items-center gap-2`}>
          <Zap size={14} className={accent ? 'text-purple-600' : 'text-brand-orange'} fill="currentColor" /> Resume Bullet Tips
        </span>
        {open ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
      </button>
      {open && (
        <div className="px-5 pb-5 grid sm:grid-cols-2 gap-3">
          {tips.map(({ icon: Icon, color, title, body }) => (
            <div key={title} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 mb-1.5">
                <Icon size={14} className={color.split(' ')[0]} />
                <p className="font-semibold text-slate-700 text-xs">{title}</p>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Print CSS ─────────────────────────────────────────────────────────────────

const PRINT_CSS = `
@media print {
  body * { visibility: hidden !important; }
  #resume-print, #resume-print * { visibility: visible !important; }
  #resume-print { position: fixed; top: 0; left: 0; width: 100%; padding: 40px; font-family: sans-serif; }
  .resume-title { font-size: 22px; font-weight: 800; color: #0B1D3A; margin-bottom: 4px; }
  .resume-meta  { font-size: 12px; color: #64748b; margin-bottom: 16px; }
  .resume-badge { display: inline-block; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 99px; margin-bottom: 16px; }
  .resume-section-head { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin: 16px 0 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
  .resume-summary { font-size: 13px; color: #334155; line-height: 1.6; margin-bottom: 12px; }
  .resume-bullet { font-size: 13px; color: #334155; line-height: 1.6; margin-bottom: 6px; padding-left: 16px; position: relative; }
  .resume-bullet::before { content: "•"; position: absolute; left: 0; color: #F59E0B; font-weight: 700; }
}
`
function injectPrintCSS() {
  if (document.getElementById('resume-print-style')) return
  const style = document.createElement('style')
  style.id = 'resume-print-style'
  style.textContent = PRINT_CSS
  document.head.appendChild(style)
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function ResumeBuilder() {
  const initial = loadFromHash()
  const [mode,    setMode]    = useState(initial?._mode || 'fresher')
  const [fresher, setFresher] = useState(initial?._mode === 'fresher' ? { ...DEFAULT_FRESHER, ...initial } : DEFAULT_FRESHER)
  const [exp,     setExp]     = useState(initial?._mode === 'exp'     ? { ...DEFAULT_EXP,     ...initial } : DEFAULT_EXP)

  const { authFetch, isLoggedIn } = useAuth()

  const [shareCopied,  setShareCopied]  = useState(false)
  const [allCopied,    setAllCopied]    = useState(false)
  const [aiLoading,    setAiLoading]    = useState(false)
  const [aiBullets,    setAiBullets]    = useState(null)   // null = not generated yet
  const [aiSummary,    setAiSummary]    = useState(null)
  const [aiUnmatched,  setAiUnmatched]  = useState([])
  const [aiError,      setAiError]      = useState('')

  const isExp   = mode === 'exp'
  const project = isExp ? exp : fresher
  const setP    = (k, v) => isExp ? setExp(p => ({ ...p, [k]: v })) : setFresher(p => ({ ...p, [k]: v }))

  const bullets = useMemo(
    () => isExp ? generateExpBullets(exp) : generateFresherBullets(fresher),
    [isExp, exp, fresher]
  )
  const summary = useMemo(
    () => isExp ? generateExpSummary(exp) : generateFresherSummary(fresher),
    [isExp, exp, fresher]
  )
  const hasContent = bullets.length > 0

  const shareLink = () => {
    const data = b64encode(JSON.stringify({ ...project, _mode: mode }))
    return `${window.location.origin}/resume-builder#${data}`
  }

  const copyShareLink = async () => {
    await navigator.clipboard.writeText(shareLink())
    setShareCopied(true)
    setTimeout(() => setShareCopied(false), 2500)
  }

  const copyAll = async () => {
    const parts = [
      summary && `Summary:\n${summary}`,
      bullets.length && `Bullet Points:\n${bullets.map(b => `• ${b}`).join('\n')}`,
    ].filter(Boolean)
    await navigator.clipboard.writeText(parts.join('\n\n'))
    setAllCopied(true)
    setTimeout(() => setAllCopied(false), 2500)
  }

  const handlePrint = () => { injectPrintCSS(); setTimeout(() => window.print(), 100) }

  const reset = () => {
    if (isExp) setExp(DEFAULT_EXP); else setFresher(DEFAULT_FRESHER)
    window.history.replaceState(null, '', window.location.pathname)
  }

  const switchMode = (m) => { setMode(m); setShareCopied(false); setAllCopied(false); setAiBullets(null); setAiSummary(null); setAiError('') }

  const aiGenerate = async () => {
    const techStr = project.tech || ''
    const skills = techStr.split(/[,;]+/).map(s => s.trim()).filter(Boolean)
    if (skills.length === 0) { setAiError('Enter your Tech Stack / Skills first, then click Generate.'); return }
    const yrs = isExp ? parseFloat(project.exp_years) || 0 : 0
    setAiLoading(true); setAiError(''); setAiBullets(null); setAiSummary(null)
    try {
      const apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/api'
      const res = await fetch(`${apiBase}/resume/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills, years_exp: yrs, max_bullets: 10 }),
      })
      if (!res.ok) throw new Error('Backend error — is the server running?')
      const data = await res.json()
      setAiBullets(data.bullets)
      setAiSummary(data.summary)
      setAiUnmatched(data.unmatched || [])
    } catch (e) {
      setAiError(e.message)
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Print target */}
      <div id="resume-print" style={{ display: 'none' }}>
        {summary && <>
          <div className="resume-title">{project.title || 'My Project'}</div>
          <div className="resume-meta">
            {project.role}
            {isExp && project.company ? ` · ${project.company}` : ''}
            {project.tech ? ` · ${project.tech}` : ''}
            {project.duration ? ` · ${project.duration}` : ''}
            {isExp && project.exp_years ? ` · ${project.exp_years} experience` : ''}
          </div>
          <div className={`resume-badge`} style={{ background: isExp ? '#ede9fe' : '#fff7ed', color: isExp ? '#7c3aed' : '#c2410c' }}>
            {isExp ? 'Experienced Professional' : 'Fresher / Student'}
          </div>
          <div className="resume-section-head">Summary</div>
          <div className="resume-summary">{summary}</div>
        </>}
        {bullets.length > 0 && <>
          <div className="resume-section-head">Resume Bullets</div>
          {bullets.map((b, i) => <div key={i} className="resume-bullet">{b}</div>)}
        </>}
      </div>

      {/* Hero */}
      <div className="hero-bg py-14 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-brand-orange text-sm font-semibold mb-5">
            <FileText size={14} /> Resume Bullet Generator
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Turn Your Work Into<br className="hidden sm:block" /> Resume Gold
          </h1>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            For freshers and experienced engineers alike — fill in your project details and get polished, quantified resume bullets ready to paste into your CV or LinkedIn.
          </p>

          {/* Mode toggle */}
          <div className="inline-flex mt-6 p-1 bg-white/10 rounded-2xl border border-white/20">
            <button
              onClick={() => switchMode('fresher')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                !isExp ? 'bg-brand-orange text-white shadow-md' : 'text-white/70 hover:text-white'
              }`}
            >
              <GraduationCap size={16} /> Fresher / Student
            </button>
            <button
              onClick={() => switchMode('exp')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                isExp ? 'bg-purple-600 text-white shadow-md' : 'text-white/70 hover:text-white'
              }`}
            >
              <Briefcase size={16} /> Experienced Engineer
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-[1fr_360px] gap-8">

          {/* ── Form ── */}
          <div className="order-2 lg:order-1 space-y-5">
            <div className={`bg-white rounded-3xl border shadow-sm p-6 ${isExp ? 'border-purple-100' : 'border-slate-100'}`}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-extrabold text-[#0B1D3A] text-lg">
                  {isExp ? 'Work / Project Details' : 'Project Details'}
                </h2>
                <button onClick={reset} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition">
                  <Trash2 size={12} /> Clear
                </button>
              </div>

              {/* ── FRESHER FORM ── */}
              {!isExp && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Project Title"    placeholder="e.g. Sentiment Analysis using LSTM"    value={fresher.title}    onChange={v => setFresher(p => ({...p, title: v}))} />
                    <Field label="Your Role / Verb" placeholder="e.g. Developed / Built / Designed"     value={fresher.role}     onChange={v => setFresher(p => ({...p, role: v}))} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Technologies Used"      placeholder="e.g. Python, TensorFlow, Keras"  value={fresher.tech}     onChange={v => setFresher(p => ({...p, tech: v}))}     optional />
                    <Field label="Duration"               placeholder="e.g. 4 weeks"                    value={fresher.duration} onChange={v => setFresher(p => ({...p, duration: v}))} optional />
                  </div>
                  <Field label="Problem Solved" placeholder="e.g. classifying customer reviews at scale" value={fresher.problem}  onChange={v => setFresher(p => ({...p, problem: v}))} type="textarea" hint="Complete: 'addressed the challenge of...'" optional />
                  <Field label="What You Built / How"     placeholder="e.g. an LSTM neural network trained on 50,000 IMDB reviews" value={fresher.solution} onChange={v => setFresher(p => ({...p, solution: v}))} type="textarea" hint="One clear sentence describing your technical approach." />
                  <Field label="Outcome / Impact"         placeholder="e.g. deployed as a REST API used in a dashboard" value={fresher.outcome}  onChange={v => setFresher(p => ({...p, outcome: v}))} type="textarea" hint="What did it enable? Who used it?" optional />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Accuracy / Metric" placeholder="e.g. 89% accuracy, 0.91 F1 score"  value={fresher.metric}  onChange={v => setFresher(p => ({...p, metric: v}))} hint="Numbers make bullets 2× stronger." optional />
                    <Field label="Users / Test Samples"   placeholder="e.g. 10,000 reviews, 500 students"  value={fresher.users}   onChange={v => setFresher(p => ({...p, users: v}))}  optional />
                  </div>
                </div>
              )}

              {/* ── EXPERIENCED FORM ── */}
              {isExp && (
                <div className="space-y-4">
                  {/* Divider label */}
                  <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Role & Context</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Project / System Name"  placeholder="e.g. Payment Gateway Microservice"  value={exp.title}     onChange={v => setExp(p => ({...p, title: v}))}     accent />
                    <Field label="Your Role / Designation" placeholder="e.g. Led / Architected / Designed / Migrated" value={exp.role}    onChange={v => setExp(p => ({...p, role: v}))}      accent />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Field label="Company / Team"      placeholder="e.g. Infosys, Fintech team"   value={exp.company}    onChange={v => setExp(p => ({...p, company: v}))}    accent optional />
                    <Field label="Years of Experience" placeholder="e.g. 3+ years"                value={exp.exp_years}  onChange={v => setExp(p => ({...p, exp_years: v}))}  accent optional />
                    <Field label="Team Size Led"        placeholder="e.g. 5, 12"                   value={exp.team_size}  onChange={v => setExp(p => ({...p, team_size: v}))}  accent optional hint="Leave blank if individual contributor." />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Tech Stack"  placeholder="e.g. Java, Spring Boot, Kafka, AWS"  value={exp.tech}      onChange={v => setExp(p => ({...p, tech: v}))}     accent optional />
                    <Field label="Duration"    placeholder="e.g. 6 months, Q1–Q3 2024"           value={exp.duration}  onChange={v => setExp(p => ({...p, duration: v}))} accent optional />
                  </div>

                  <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest pt-2">What You Did</p>
                  <Field label="Problem / Challenge"    placeholder="e.g. monolithic checkout service causing 5–8s page loads at peak traffic" value={exp.problem}  onChange={v => setExp(p => ({...p, problem: v}))} type="textarea" hint="Complete: 'addressed the challenge of...'" accent optional />
                  <Field label="Solution / Approach"    placeholder="e.g. re-architected checkout into 3 microservices with async Kafka events"  value={exp.solution} onChange={v => setExp(p => ({...p, solution: v}))} type="textarea" hint="One clear technical sentence. Lead with an action verb." accent />

                  <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest pt-2">Impact & Results</p>
                  <Field label="Business Impact"        placeholder="e.g. saved ₹18L/year in infra costs, increased checkout conversion by 12%"  value={exp.business_impact} onChange={v => setExp(p => ({...p, business_impact: v}))} type="textarea" hint="Revenue, cost, conversion, uptime, time saved — the more specific, the stronger." accent optional />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Before Metric (old state)"  placeholder="e.g. 4-hour manual deployment process"     value={exp.before_metric} onChange={v => setExp(p => ({...p, before_metric: v}))} accent optional hint="What was the situation before your work?" />
                    <Field label="After Metric (new state)"   placeholder="e.g. 12-minute automated CI/CD pipeline"   value={exp.after_metric}  onChange={v => setExp(p => ({...p, after_metric: v}))}  accent optional hint="What does it look like after?" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="System Scale"          placeholder="e.g. 5M daily active users, 500K req/min"    value={exp.scale}        onChange={v => setExp(p => ({...p, scale: v}))}        accent optional />
                    <Field label="Performance Metric"    placeholder="e.g. p99 latency < 80ms, 99.95% uptime"      value={exp.perf_metric}  onChange={v => setExp(p => ({...p, perf_metric: v}))}  accent optional />
                  </div>
                </div>
              )}
            </div>

            <TipsPanel tips={isExp ? EXP_TIPS : FRESHER_TIPS} accent={isExp} />
          </div>

          {/* ── Output panel ── */}
          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className={`px-5 py-4 flex items-center justify-between bg-gradient-to-r ${isExp ? 'from-purple-800 to-purple-600' : 'from-brand-navy to-brand-blue'}`}>
                  <div>
                    <p className="text-white font-extrabold">Generated Output</p>
                    <p className="text-white/60 text-xs mt-0.5">Updates as you type</p>
                  </div>
                  {hasContent && (
                    <button
                      onClick={copyAll}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${allCopied ? 'bg-emerald-400 text-white' : 'bg-white/15 text-white border border-white/25 hover:bg-white/25'}`}
                    >
                      {allCopied ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy All</>}
                    </button>
                  )}
                </div>

                <div className="p-5">
                  {!hasContent ? (
                    <div className="py-10 text-center">
                      <FileText size={36} className="text-slate-200 mx-auto mb-3" />
                      <p className="text-slate-400 text-sm">Fill in the form to generate your resume bullets.</p>
                      {isExp && <p className="text-purple-300 text-xs mt-1">Minimum: Project Name + Role + Solution</p>}
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {summary && (
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">One-Line Summary</p>
                          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                            <p className="text-slate-700 text-sm leading-relaxed italic">{summary}</p>
                          </div>
                        </div>
                      )}
                      {bullets.length > 0 && (
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-3">Resume Bullets</p>
                          <div className="space-y-3">
                            {bullets.map((b, i) => <BulletItem key={i} text={b} index={i} accent={isExp} />)}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* ── AI Skills Generator ── */}
              <div className={`bg-white rounded-3xl border shadow-sm overflow-hidden ${isExp ? 'border-purple-100' : 'border-slate-100'}`}>
                <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
                  <Sparkles size={15} className={isExp ? 'text-purple-500' : 'text-brand-teal'} />
                  <p className="font-bold text-[#0B1D3A] text-sm">Generate from Skills</p>
                  <span className="ml-auto text-[10px] bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-bold">Backend AI</span>
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-xs text-slate-500 leading-relaxed">Enter your skills in the <strong>Tech Stack</strong> field above, then click Generate to get curated resume bullets from our skill knowledge base.</p>
                  <button
                    onClick={aiGenerate}
                    disabled={aiLoading}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 disabled:opacity-50 ${
                      isExp ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-brand-teal hover:bg-cyan-500 text-white'
                    }`}
                  >
                    <Sparkles size={14} />
                    {aiLoading ? 'Generating…' : 'Generate from Skills (AI)'}
                  </button>
                  {aiError && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-xs">
                      <AlertCircle size={13} className="flex-shrink-0 mt-0.5" />{aiError}
                    </div>
                  )}
                  {aiUnmatched.length > 0 && (
                    <p className="text-[11px] text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
                      Skills not in database (try alt names): {aiUnmatched.join(', ')}
                    </p>
                  )}
                  {aiBullets && (
                    <div className="space-y-3 pt-1">
                      {aiSummary && (
                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Summary</p>
                          <p className="text-slate-700 text-xs leading-relaxed italic">{aiSummary}</p>
                        </div>
                      )}
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Skill-based Bullets</p>
                      {aiBullets.map((b, i) => <BulletItem key={i} text={b} index={i} accent={isExp} />)}
                    </div>
                  )}
                </div>
              </div>

              {hasContent && (
                <div className="space-y-2">
                  <button
                    onClick={handlePrint}
                    className={`w-full flex items-center justify-center gap-2 py-3 text-white font-bold rounded-2xl active:scale-95 transition text-sm ${isExp ? 'bg-purple-700 hover:bg-purple-600' : 'bg-brand-navy hover:bg-brand-blue'}`}
                  >
                    <Download size={15} /> Download / Print PDF
                  </button>
                  <button
                    onClick={copyShareLink}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition active:scale-95 ${
                      shareCopied
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : isExp
                        ? 'border-2 border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white'
                        : 'border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white'
                    }`}
                  >
                    {shareCopied ? <><Check size={15} /> Link copied!</> : <><Link2 size={15} /> Copy Shareable Link</>}
                  </button>
                  <p className="text-[11px] text-slate-400 text-center">Link encodes your data in the URL — no server needed.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA footer */}
        <div className="mt-10 bg-gradient-to-r from-brand-navy to-brand-blue rounded-2xl p-6 text-white flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex-1">
            <p className="font-extrabold text-lg mb-1">Now prep for the interview too</p>
            <p className="text-white/70 text-sm">A great resume gets you the call. A great pitch gets you the offer.</p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <Link to="/hr-prep" className="flex items-center gap-2 px-5 py-2.5 bg-brand-orange text-white font-bold rounded-xl hover:bg-amber-500 transition text-sm">
              HR Prep <ArrowRight size={14} />
            </Link>
            <Link to="/interview-readiness" className="flex items-center gap-2 px-5 py-2.5 bg-white/15 border border-white/25 text-white font-bold rounded-xl hover:bg-white/25 transition text-sm">
              Readiness Score
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
