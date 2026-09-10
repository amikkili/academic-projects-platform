import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar, FileText, FlaskConical, ClipboardList, Users,
  AlertTriangle, CheckCircle2, Target, ArrowRight, Info,
  TrendingUp, TrendingDown, Minus,
} from 'lucide-react'

// ── Constants ──────────────────────────────────────────────────────────────────

const ATT_THRESHOLDS = [
  { min: 90, marks: 10, label: '≥ 90%' },
  { min: 75, marks: 8,  label: '75–89%' },
  { min: 65, marks: 6,  label: '65–74%' },
  { min: 50, marks: 4,  label: '50–64%' },
  { min: 0,  marks: 0,  label: '< 50%'  },
]

function attendanceMarks(pct) {
  for (const t of ATT_THRESHOLDS) if (pct >= t.min) return t.marks
  return 0
}

const ASSIGNMENT_OPTIONS = [
  { value: 10, label: 'All submitted — excellent quality' },
  { value: 8,  label: 'All submitted — good quality' },
  { value: 6,  label: 'Most submitted — average quality' },
  { value: 4,  label: 'Some submitted — below average' },
  { value: 2,  label: 'Very few submitted' },
  { value: 0,  label: 'None / very poor' },
]

const PARTICIPATION_OPTIONS = [
  { value: 10, label: 'Very active — seminars, queries, activities' },
  { value: 8,  label: 'Active with good behavior' },
  { value: 6,  label: 'Moderate participation' },
  { value: 4,  label: 'Rarely participates' },
  { value: 2,  label: 'Mostly passive' },
]

function getGrade(pct) {
  if (pct >= 90) return { grade: 'O',  label: 'Outstanding',   hex: '#10b981', text: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' }
  if (pct >= 80) return { grade: 'A+', label: 'Excellent',     hex: '#0d9488', text: 'text-teal-600',    bg: 'bg-teal-50 border-teal-200' }
  if (pct >= 70) return { grade: 'A',  label: 'Very Good',     hex: '#2563eb', text: 'text-blue-600',    bg: 'bg-blue-50 border-blue-200' }
  if (pct >= 60) return { grade: 'B+', label: 'Good',          hex: '#d97706', text: 'text-amber-600',   bg: 'bg-amber-50 border-amber-200' }
  if (pct >= 50) return { grade: 'B',  label: 'Above Average', hex: '#ea580c', text: 'text-orange-600',  bg: 'bg-orange-50 border-orange-200' }
  if (pct >= 40) return { grade: 'C',  label: 'Average',       hex: '#ea580c', text: 'text-orange-700',  bg: 'bg-orange-50 border-orange-100' }
  return              { grade: 'F',  label: 'Fail',           hex: '#dc2626', text: 'text-red-600',     bg: 'bg-red-50 border-red-200' }
}

// ── SVG Score Donut ────────────────────────────────────────────────────────────

function ScoreDonut({ earned, total, grade }) {
  const r = 44
  const circumference = 2 * Math.PI * r
  const pct = total > 0 ? earned / total : 0
  const offset = circumference * (1 - Math.min(pct, 1))

  return (
    <svg viewBox="0 0 120 120" className="w-32 h-32 sm:w-36 sm:h-36">
      <circle cx="60" cy="60" r={r} fill="none" stroke="#f1f5f9" strokeWidth="12" />
      <circle
        cx="60" cy="60" r={r}
        fill="none"
        stroke={grade.hex}
        strokeWidth="12"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 60 60)"
        style={{ transition: 'stroke-dashoffset 0.7s ease, stroke 0.4s' }}
      />
      <text x="60" y="50" textAnchor="middle" fontSize="21" fontWeight="800" fill="#0B1D3A">{earned}</text>
      <text x="60" y="64" textAnchor="middle" fontSize="11" fill="#94a3b8">/ {total}</text>
      <text x="60" y="80" textAnchor="middle" fontSize="13" fontWeight="700" fill={grade.hex}>{grade.grade}</text>
    </svg>
  )
}

// ── Score Input (for test / lab) ───────────────────────────────────────────────

function ScoreInput({ value, max, onChangeValue, onChangeMax }) {
  return (
    <div className="flex items-end gap-3">
      <div className="flex-1">
        <label className="text-xs text-slate-400 mb-1 block">Your score</label>
        <input
          type="number" min="0" max={max}
          value={value}
          onChange={e => {
            const v = e.target.value
            onChangeValue(v === '' ? '' : Math.min(Number(v), max))
          }}
          placeholder="e.g. 22"
          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700
                     focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange"
        />
      </div>
      <span className="text-slate-300 text-xl mb-2.5">/</span>
      <div className="w-20">
        <label className="text-xs text-slate-400 mb-1 block">Out of</label>
        <input
          type="number" min="1"
          value={max}
          onChange={e => onChangeMax(Math.max(1, Number(e.target.value) || 1))}
          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700
                     focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange"
        />
      </div>
    </div>
  )
}

// ── Component Card ─────────────────────────────────────────────────────────────

function CompCard({ icon: Icon, label, maxPts, earnedPts, pending = false, children }) {
  const pct = maxPts > 0 ? earnedPts / maxPts : 0
  const barColor = pending
    ? 'bg-slate-200'
    : pct >= 0.8 ? 'bg-emerald-500' : pct >= 0.6 ? 'bg-amber-400' : 'bg-red-400'
  const TrendIcon = pct >= 0.8 ? TrendingUp : pct >= 0.6 ? Minus : TrendingDown
  const trendColor = pct >= 0.8 ? 'text-emerald-500' : pct >= 0.6 ? 'text-amber-500' : 'text-red-500'

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-brand-navy/10 flex items-center justify-center flex-shrink-0">
            <Icon size={18} className="text-brand-navy" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-[#0B1D3A] text-sm leading-snug">{label}</p>
            <p className="text-slate-400 text-xs">Max: {maxPts} marks</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {!pending && <TrendIcon size={14} className={trendColor} />}
          <div className="text-right">
            {pending
              ? <span className="text-slate-300 text-sm font-semibold">—</span>
              : <><span className="text-xl font-extrabold text-[#0B1D3A]">{Math.round(earnedPts)}</span>
                 <span className="text-slate-400 text-sm">/{maxPts}</span></>
            }
          </div>
        </div>
      </div>

      {children}

      <div className="mt-3.5">
        <div className="w-full bg-slate-100 rounded-full h-1.5">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${pending ? 0 : Math.min(pct * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function InternalMarksEstimator() {
  const [totalMarks,    setTotalMarks]    = useState(50)
  const [attPct,        setAttPct]        = useState(80)
  const [test1Score,    setTest1Score]    = useState('')
  const [test1Max,      setTest1Max]      = useState(30)
  const [test2Score,    setTest2Score]    = useState('')
  const [test2Max,      setTest2Max]      = useState(30)
  const [assignment,    setAssignment]    = useState(8)
  const [labScore,      setLabScore]      = useState('')
  const [labMax,        setLabMax]        = useState(25)
  const [participation, setParticipation] = useState(8)

  // Scale factor: each component is worth 10 pts in a 50-mark system
  const scale = totalMarks / 50
  const compMax = Math.round(10 * scale)

  const calcScore = (rawScore, rawMax) =>
    rawScore !== '' ? Math.min(Math.round((Number(rawScore) / rawMax) * compMax), compMax) : null

  const attEarned  = Math.round(attendanceMarks(attPct) * scale)
  const t1Earned   = calcScore(test1Score, test1Max)
  const t2Earned   = calcScore(test2Score, test2Max)
  const asgnEarned = Math.round(assignment * scale)
  const labEarned  = calcScore(labScore, labMax)
  const partEarned = Math.round(participation * scale)

  const filledTotal = attEarned + (t1Earned ?? 0) + (t2Earned ?? 0) + asgnEarned + (labEarned ?? 0) + partEarned
  const pendingMax  = (t1Earned === null ? compMax : 0) + (t2Earned === null ? compMax : 0) + (labEarned === null ? compMax : 0)
  const maxPossible = Math.min(filledTotal + pendingMax, totalMarks)

  const gradePct = totalMarks > 0 ? (filledTotal / totalMarks) * 100 : 0
  const grade = getGrade(gradePct)

  // Active attendance threshold
  const activeAtt = ATT_THRESHOLDS.find(t => attPct >= t.min) ?? ATT_THRESHOLDS[ATT_THRESHOLDS.length - 1]

  // Tips for weak areas
  const tips = useMemo(() => {
    const list = []
    if (attPct < 75)
      list.push({ label: 'Attendance', msg: attPct < 50 ? 'Critical: below 50% may bar you from exams. Attend all remaining sessions.' : 'Attend every remaining class to push above the 75% threshold.' })
    if (t1Earned !== null && t1Earned / compMax < 0.6)
      list.push({ label: 'Mid-term Test 1', msg: 'Review marked papers; identify the topic-types where marks slipped and revise them.' })
    if (t2Earned !== null && t2Earned / compMax < 0.6)
      list.push({ label: 'Mid-term Test 2', msg: 'Apply feedback from Test 1. Focus on weak topics and practice past questions with timer.' })
    if (asgnEarned / compMax < 0.6)
      list.push({ label: 'Assignments', msg: 'Submit all pending work. Late submission is better than no submission — ask your teacher.' })
    if (labEarned !== null && labEarned / compMax < 0.6)
      list.push({ label: 'Lab / Practical', msg: 'Complete all pending lab exercises. Prepare before each session to improve performance.' })
    if (partEarned / compMax < 0.6)
      list.push({ label: 'Participation', msg: 'Answer questions in class, join extra sessions, attend seminars, and be present on time.' })
    return list
  }, [attPct, t1Earned, t2Earned, asgnEarned, labEarned, partEarned, compMax])

  const resultRows = [
    { label: 'Attendance',    val: attEarned,  max: compMax },
    { label: 'Test 1',        val: t1Earned,   max: compMax },
    { label: 'Test 2',        val: t2Earned,   max: compMax },
    { label: 'Assignments',   val: asgnEarned, max: compMax },
    { label: 'Lab',           val: labEarned,  max: compMax },
    { label: 'Participation', val: partEarned, max: compMax },
  ]

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero ── */}
      <div className="hero-bg py-16 pt-28">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-brand-orange text-sm font-semibold mb-5">
            <Target size={14} /> Internal Marks Estimator
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Know Your Internal Marks<br className="hidden sm:block" /> Before Results Day
          </h1>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Enter your attendance, test scores, and assignments — get an instant estimate of your internal marks, a grade prediction, and improvement tips.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Format selector ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-8">
          <p className="text-sm font-semibold text-[#0B1D3A] mb-3 flex items-center gap-2">
            <Info size={15} className="text-brand-teal" />
            What is your university's total internal marks?
          </p>
          <div className="flex flex-wrap gap-2.5">
            {[25, 50, 75, 100].map(v => (
              <button
                key={v}
                onClick={() => setTotalMarks(v)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  totalMarks === v
                    ? 'bg-brand-navy text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {v} marks
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Most Indian engineering universities use 25 or 50. Each of the 6 components below is scaled equally to fit your total.
          </p>
        </div>

        {/* ── Two-column layout: Results first on mobile, Form first on desktop ── */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-8">

          {/* ── Form (order-2 on mobile, order-1 on desktop) ── */}
          <div className="order-2 lg:order-1 space-y-4">

            {/* Attendance */}
            <CompCard icon={Calendar} label="Attendance" maxPts={compMax} earnedPts={attEarned}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500">Your attendance percentage</span>
                  <span className={`text-sm font-bold ${attPct >= 75 ? 'text-emerald-600' : attPct >= 65 ? 'text-amber-600' : 'text-red-600'}`}>
                    {attPct}%
                  </span>
                </div>
                <input
                  type="range" min="0" max="100"
                  value={attPct}
                  onChange={e => setAttPct(Number(e.target.value))}
                  className="w-full h-2 rounded-full cursor-pointer accent-brand-orange"
                />
                <div className="flex justify-between text-xs text-slate-300 mt-1 mb-3">
                  <span>0%</span><span>100%</span>
                </div>
                {/* Threshold pills */}
                <div className="flex flex-wrap gap-1.5">
                  {ATT_THRESHOLDS.map(t => (
                    <span
                      key={t.min}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        activeAtt === t
                          ? 'bg-brand-orange/15 text-brand-orange border border-brand-orange/30 font-bold'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {t.label} → {Math.round(t.marks * scale)} pts
                    </span>
                  ))}
                </div>
              </div>
            </CompCard>

            {/* Test 1 */}
            <CompCard icon={FileText} label="Mid-term Test 1" maxPts={compMax} earnedPts={t1Earned ?? 0} pending={t1Earned === null}>
              <ScoreInput value={test1Score} max={test1Max} onChangeValue={setTest1Score} onChangeMax={setTest1Max} />
              {test1Score === '' && (
                <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                  <Info size={11} className="flex-shrink-0" /> Leave blank if this test hasn't happened yet — it won't count against you.
                </p>
              )}
            </CompCard>

            {/* Test 2 */}
            <CompCard icon={FileText} label="Mid-term Test 2" maxPts={compMax} earnedPts={t2Earned ?? 0} pending={t2Earned === null}>
              <ScoreInput value={test2Score} max={test2Max} onChangeValue={setTest2Score} onChangeMax={setTest2Max} />
              {test2Score === '' && (
                <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                  <Info size={11} className="flex-shrink-0" /> Leave blank if this test hasn't happened yet.
                </p>
              )}
            </CompCard>

            {/* Assignments */}
            <CompCard icon={ClipboardList} label="Assignments & Records" maxPts={compMax} earnedPts={asgnEarned}>
              <div className="space-y-1.5">
                {ASSIGNMENT_OPTIONS.map(opt => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition ${
                      assignment === opt.value
                        ? 'border-brand-navy bg-brand-navy/5'
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio" name="assignment"
                      checked={assignment === opt.value}
                      onChange={() => setAssignment(opt.value)}
                      className="accent-brand-orange flex-shrink-0"
                    />
                    <span className={`text-sm flex-1 min-w-0 ${assignment === opt.value ? 'text-brand-navy font-semibold' : 'text-slate-600'}`}>
                      {opt.label}
                    </span>
                    <span className="text-xs font-bold text-slate-400 flex-shrink-0">
                      {Math.round(opt.value * scale)}/{compMax}
                    </span>
                  </label>
                ))}
              </div>
            </CompCard>

            {/* Lab */}
            <CompCard icon={FlaskConical} label="Lab / Practical" maxPts={compMax} earnedPts={labEarned ?? 0} pending={labEarned === null}>
              <ScoreInput value={labScore} max={labMax} onChangeValue={setLabScore} onChangeMax={setLabMax} />
              {labScore === '' && (
                <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                  <Info size={11} className="flex-shrink-0" /> Leave blank if lab marks aren't finalised yet.
                </p>
              )}
            </CompCard>

            {/* Participation */}
            <CompCard icon={Users} label="Class Participation & Behaviour" maxPts={compMax} earnedPts={partEarned}>
              <div className="space-y-1.5">
                {PARTICIPATION_OPTIONS.map(opt => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition ${
                      participation === opt.value
                        ? 'border-brand-navy bg-brand-navy/5'
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio" name="participation"
                      checked={participation === opt.value}
                      onChange={() => setParticipation(opt.value)}
                      className="accent-brand-orange flex-shrink-0"
                    />
                    <span className={`text-sm flex-1 min-w-0 ${participation === opt.value ? 'text-brand-navy font-semibold' : 'text-slate-600'}`}>
                      {opt.label}
                    </span>
                    <span className="text-xs font-bold text-slate-400 flex-shrink-0">
                      {Math.round(opt.value * scale)}/{compMax}
                    </span>
                  </label>
                ))}
              </div>
            </CompCard>

          </div>

          {/* ── Results Panel (order-1 on mobile, order-2 on desktop) ── */}
          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-4">

              {/* Score card */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden">
                <div className="hero-bg p-5 text-center">
                  <p className="text-white/60 text-xs font-medium mb-3">Estimated Internal Marks</p>
                  <div className="flex justify-center">
                    <ScoreDonut earned={filledTotal} total={totalMarks} grade={grade} />
                  </div>
                  <div className={`mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl border ${grade.bg}`}>
                    <span className={`font-extrabold text-base ${grade.text}`}>{grade.grade}</span>
                    <span className={`text-sm font-semibold ${grade.text}`}>{grade.label}</span>
                  </div>
                </div>

                <div className="p-5">
                  {/* Pending banner */}
                  {pendingMax > 0 && (
                    <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                      <p className="text-xs text-slate-500">
                        <strong className="text-brand-navy">{pendingMax}</strong> marks still pending
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Max possible: <strong>{maxPossible}/{totalMarks}</strong>
                      </p>
                    </div>
                  )}

                  {/* Component bars */}
                  <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wide">Breakdown</p>
                  <div className="space-y-2.5">
                    {resultRows.map(({ label, val, max }) => {
                      const pct = val !== null ? val / max : null
                      const bar = pct === null
                        ? 'bg-slate-200'
                        : pct >= 0.8 ? 'bg-emerald-500'
                        : pct >= 0.6 ? 'bg-amber-400'
                        : 'bg-red-400'
                      return (
                        <div key={label}>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-slate-600">{label}</span>
                            <span className="text-xs font-bold text-slate-500">
                              {val !== null ? `${val}/${max}` : <span className="text-slate-300 font-normal">pending</span>}
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-1.5">
                            <div
                              className={`h-full rounded-full ${bar} transition-all duration-500`}
                              style={{ width: `${val !== null ? Math.min(pct * 100, 100) : 0}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Tips */}
              {tips.length > 0 ? (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                  <p className="font-bold text-amber-800 mb-3 flex items-center gap-2 text-sm">
                    <AlertTriangle size={15} /> Improve these areas:
                  </p>
                  <ul className="space-y-3">
                    {tips.map(t => (
                      <li key={t.label} className="border-l-2 border-amber-300 pl-3">
                        <p className="text-xs font-bold text-amber-700 mb-0.5">{t.label}</p>
                        <p className="text-xs text-amber-600 leading-relaxed">{t.msg}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center">
                  <CheckCircle2 size={26} className="text-emerald-500 mx-auto mb-2" />
                  <p className="text-emerald-700 font-bold text-sm">Looking great!</p>
                  <p className="text-emerald-600 text-xs mt-1">All components are performing well. Keep it up!</p>
                </div>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-br from-brand-navy to-brand-blue rounded-2xl p-5 text-white">
                <p className="font-bold mb-1 text-sm">Ace your viva too</p>
                <p className="text-white/70 text-xs mb-3 leading-relaxed">
                  Take a Viva Mock Test for your project and get a predicted score out of 10.
                </p>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-1.5 text-brand-orange text-sm font-semibold hover:text-amber-400 transition"
                >
                  Browse Projects <ArrowRight size={14} />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
