import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  User, Smile, Briefcase, Users, Zap, Target, HelpCircle,
  ChevronDown, ChevronUp, Copy, Check, ArrowRight, Lightbulb,
  MessageCircle, Star,
} from 'lucide-react'

// ── Question Bank ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: 'intro',
    label: 'Introduction',
    icon: User,
    color: 'from-brand-navy to-brand-blue',
    questions: [
      {
        q: 'Tell me about yourself.',
        why: 'The most common opener — sets the tone. Interviewers want a concise professional summary, not a life story.',
        structure: [
          'Education: "I\'m a final year [Branch] student at [College]."',
          'Project: "My final year project is [Name] — [one-line problem it solves]."',
          'Skills: "I\'m proficient in [top 2–3 skills]."',
          'Goal: "I\'m looking for a [role] where I can [contribution/impact]."',
        ],
        tip: 'Target 60–90 seconds. End by connecting your background to this specific role.',
      },
      {
        q: 'Walk me through your resume.',
        why: 'Tests whether you can narrate your story clearly and own your experiences.',
        structure: [
          'Start with education — college and branch.',
          'Move to your project — name it, state the problem it solved.',
          'Mention any internship, course, or certification.',
          'End with the role you\'re applying for and why it\'s a fit.',
        ],
        tip: 'Don\'t just read your resume — expand on the most relevant parts with numbers or outcomes.',
      },
      {
        q: 'What are your hobbies and interests outside of academics?',
        why: 'Tests cultural fit and whether you are a well-rounded person.',
        structure: [
          'Name 2 genuine hobbies.',
          'Briefly explain how they developed in you (discipline / creativity / teamwork).',
          'If possible, connect one hobby to the work environment (e.g., chess → strategic thinking).',
        ],
        tip: 'Be honest. Saying "reading" when you don\'t actually read is easy to spot with one follow-up question.',
      },
    ],
  },
  {
    id: 'strengths',
    label: 'Strengths & Weaknesses',
    icon: Smile,
    color: 'from-brand-teal to-cyan-600',
    questions: [
      {
        q: 'What are your greatest strengths?',
        why: 'Checks self-awareness and whether your strengths match what the role needs.',
        structure: [
          'Name 2–3 strengths that are relevant to the role.',
          'Back each with one concrete example.',
          'Example format: "I\'m a fast learner — when our project needed [tech], I picked it up in [time] and [result]."',
        ],
        tip: 'Avoid generic answers like "hardworking" without proof. Specificity wins.',
      },
      {
        q: 'What is your greatest weakness?',
        why: 'Tests honesty and self-awareness. They\'re not looking for perfection — they\'re looking for maturity.',
        structure: [
          'Name a real but non-critical weakness.',
          'Show you are aware of it.',
          'Explain the concrete steps you\'re taking to improve.',
          'Example: "I used to struggle with time estimation. Now I use a task checklist and break work into 2-hour blocks."',
        ],
        tip: 'Never say "I work too hard" or "I\'m a perfectionist" — interviewers see through it immediately.',
      },
      {
        q: 'How do others (teammates, professors) describe you?',
        why: 'Gets an outside perspective on your soft skills and personality.',
        structure: [
          'Use the words people have actually used about you.',
          'Mention one specific situation where that quality showed.',
          'Example: "My teammates often call me the \'go-to person\' for debugging — I like solving the blockers that slow others down."',
        ],
        tip: 'This is a great place to subtly reinforce strengths using a third-person frame.',
      },
      {
        q: 'What makes you unique compared to other candidates?',
        why: 'The "why should we hire YOU" question in disguise.',
        structure: [
          'Identify one combination of skills + mindset that is genuinely yours.',
          'Back with a story or outcome.',
          'Example: "I combine [technical skill] with [soft skill] — for instance, I built [X] and then presented it clearly to non-technical stakeholders."',
        ],
        tip: 'Don\'t compare yourself to other candidates — just make your own value crystal clear.',
      },
    ],
  },
  {
    id: 'project',
    label: 'Project & Technical Background',
    icon: Briefcase,
    color: 'from-purple-600 to-purple-800',
    questions: [
      {
        q: 'Tell me about your final year project.',
        why: 'Most important technical question for freshers. Tests depth of understanding and ability to communicate it.',
        structure: [
          'Problem: What real-world problem does it solve?',
          'Solution: How does your system solve it? (one paragraph)',
          'Tech: What technologies/tools did you use and why?',
          'Outcome: Did it work? Any accuracy/performance numbers?',
        ],
        tip: 'Practice this in 2 minutes flat. Use simple language — imagine you\'re explaining to someone outside your branch.',
      },
      {
        q: 'What was your specific role in the project?',
        why: 'Distinguishes individual contribution from group work.',
        structure: [
          'State your primary responsibility clearly.',
          'Mention 2–3 specific modules or features you built.',
          'If it was a team project, briefly acknowledge teammates while owning your part.',
        ],
        tip: 'Interviewers want "I built X" not "we did Y". Own your contribution confidently.',
      },
      {
        q: 'What was the most challenging part and how did you handle it?',
        why: 'Problem-solving ability and persistence under pressure.',
        structure: [
          'Situation: Describe the specific technical problem.',
          'What you tried first (and why it didn\'t work).',
          'What you eventually did to solve it.',
          'What you learned from it.',
        ],
        tip: 'Prepare 2 challenges — one technical (e.g., low model accuracy) and one process (e.g., missing team member before deadline).',
      },
      {
        q: 'What would you change or improve if you rebuilt the project?',
        why: 'Tests critical thinking and willingness to reflect on your own work.',
        structure: [
          'Name 1–2 genuine technical improvements (better algorithm, more scalable architecture).',
          'Name 1 process improvement (better testing, earlier user feedback).',
          'Frame it as growth: "Now that I know [X], I would have..."',
        ],
        tip: 'This shows maturity — being able to critique your own work is a sign of a strong engineer.',
      },
    ],
  },
  {
    id: 'teamwork',
    label: 'Teamwork & Collaboration',
    icon: Users,
    color: 'from-brand-orange to-amber-500',
    questions: [
      {
        q: 'Describe a time you worked as part of a team.',
        why: 'Most software work is collaborative — they\'re checking if you can function in a team.',
        structure: [
          'Situation: What was the project and the team size?',
          'Your role: What were you responsible for?',
          'How you collaborated: communication tools, meetings, code reviews.',
          'Result: What did the team achieve together?',
        ],
        tip: 'Use STAR: Situation → Task → Action → Result. Keep it under 90 seconds.',
      },
      {
        q: 'Tell me about a conflict with a teammate and how you resolved it.',
        why: 'Tests emotional maturity and communication skills.',
        structure: [
          'Describe the conflict briefly and neutrally (no blame).',
          'What did you do to address it? Did you initiate a conversation?',
          'What was the outcome?',
          'What did you learn about handling disagreements?',
        ],
        tip: 'Never say "we never had conflicts" — it reads as either inexperienced or dishonest.',
      },
      {
        q: 'Have you ever led or organised a team or group? How did it go?',
        why: 'Checks leadership potential even at the fresher level.',
        structure: [
          'Describe the context (group project, club, event).',
          'What did you do to keep people aligned and motivated?',
          'What worked and what was hard?',
          'Result: what did the group accomplish?',
        ],
        tip: 'Leading a college fest, club, or even study group counts — small leadership is still leadership.',
      },
      {
        q: 'How do you handle working with a difficult or unresponsive team member?',
        why: 'Real-world team situations test patience, communication, and ownership.',
        structure: [
          'Don\'t name or blame a specific person.',
          'Describe your approach: direct conversation first, then escalation if needed.',
          'Share what you tried, what happened, and what the outcome was.',
          'Show empathy — maybe the person had reasons you didn\'t know.',
        ],
        tip: 'The ideal answer shows you addressed it professionally, not that you just did their work for them.',
      },
    ],
  },
  {
    id: 'challenges',
    label: 'Handling Challenges',
    icon: Zap,
    color: 'from-red-500 to-rose-600',
    questions: [
      {
        q: 'Tell me about a time you failed and what you learned.',
        why: 'Tests resilience, humility, and growth mindset.',
        structure: [
          'Briefly describe the failure (academic, project, or personal — keep it professional).',
          'Take ownership — don\'t blame external factors.',
          'What you learned specifically.',
          'What you did differently afterward.',
        ],
        tip: 'Choose a real failure with a clear lesson. Fabricated failures are obvious and undermine trust.',
      },
      {
        q: 'Describe a situation where you worked under pressure or met a tight deadline.',
        why: 'Evaluates time management and performance under stress.',
        structure: [
          'Situation: What was the deadline and why was it tight?',
          'What you prioritised and why.',
          'How you managed your time and energy.',
          'Result: Did you meet the deadline? What was the quality of the output?',
        ],
        tip: 'Concrete examples beat vague statements — "I had 48 hours to submit" is better than "I had very little time".',
      },
      {
        q: 'Give an example of when you had to solve a problem creatively.',
        why: 'Checks lateral thinking and initiative.',
        structure: [
          'Describe the problem that had no obvious or standard solution.',
          'What you tried (and what didn\'t work).',
          'The creative approach you came up with.',
          'Outcome and what you would do the same or differently.',
        ],
        tip: 'Technical problems (e.g., optimising code, finding a workaround) are perfect examples here.',
      },
      {
        q: 'Tell me about a time you had to learn something new very quickly.',
        why: 'Important for tech roles — technology changes fast and they need people who adapt.',
        structure: [
          'Situation: What was the new skill or technology?',
          'Why you had to learn it quickly (project need, team need).',
          'How you approached learning it — resources, practice, mentors.',
          'How you applied it and the result.',
        ],
        tip: 'This is a perfect opportunity to mention learning a new framework or tool for your final year project.',
      },
    ],
  },
  {
    id: 'career',
    label: 'Career Goals & Motivation',
    icon: Target,
    color: 'from-emerald-600 to-teal-600',
    questions: [
      {
        q: 'Why do you want to work at this company?',
        why: 'Checks whether you\'ve done your research and are genuinely interested.',
        structure: [
          'One specific thing you know about the company (product, culture, tech stack, mission).',
          'How it connects to your skills or interests.',
          'What excites you about the team or work they do.',
        ],
        tip: 'Spend 15 minutes researching the company before every interview. Generic answers are obvious and forgettable.',
      },
      {
        q: 'Where do you see yourself in 5 years?',
        why: 'Checks ambition, clarity, and whether your goals align with the company\'s growth path.',
        structure: [
          'Be honest about the domain or role you want to grow in.',
          'Mention skills you want to develop.',
          'Show that you see this role as a stepping stone in that direction.',
        ],
        tip: 'Don\'t say "I want your job in 5 years" or "I want to start my own company." Keep it aligned with the role.',
      },
      {
        q: 'Why should we hire you?',
        why: 'A direct challenge — they want to hear you sell yourself concisely.',
        structure: [
          'Sum up your strongest combination of skill + attitude in 3 sentences.',
          'Back with one specific proof point.',
          'End with what you will bring to this team specifically.',
        ],
        tip: 'Prepare a crisp 30-second answer for this. Practise saying it until it sounds natural, not rehearsed.',
      },
      {
        q: 'What motivates you in your work?',
        why: 'Tests whether you\'re motivated by external rewards alone or by genuine curiosity and impact.',
        structure: [
          'Name 1–2 genuine motivators (problem-solving, learning, impact, building things).',
          'Give a short example of a moment when you felt most motivated.',
          'Connect it to the kind of work this role involves.',
        ],
        tip: 'Saying "money" isn\'t wrong — but balance it with something intrinsic. "I\'m motivated by [growth/impact] and also looking for [fair compensation]."',
      },
    ],
  },
  {
    id: 'questions',
    label: 'Questions to Ask the Interviewer',
    icon: HelpCircle,
    color: 'from-slate-600 to-slate-800',
    questions: [
      {
        q: '"Do you have any questions for us?" — What should I ask?',
        why: 'Asking good questions shows genuine interest, preparation, and maturity. Asking nothing is a red flag.',
        structure: [
          '"What does success look like in this role in the first 90 days?"',
          '"What does the typical onboarding process look like for a new engineer?"',
          '"What are the main challenges the team is currently working through?"',
          '"What does career growth / learning look like here?"',
        ],
        tip: 'Avoid asking about salary, leave policy, or WFH in the first round — save those for HR. Focus on role and team.',
      },
      {
        q: 'When should I ask about salary expectations?',
        why: 'Bringing up salary at the wrong time makes you seem purely transactional.',
        structure: [
          'Wait for the HR or final round to discuss compensation — not the technical round.',
          'If asked, give a researched range: "Based on market data for this role and location, I\'m looking at [X–Y LPA]."',
          'Always leave room to negotiate: "I\'m flexible based on the overall package and growth opportunities."',
        ],
        tip: 'Research Glassdoor, Levels.fyi, and Ambitionbox for realistic ranges before your interview.',
      },
    ],
  },
]

// ── Pitch Builder ──────────────────────────────────────────────────────────────

function PitchBuilder() {
  const [form, setForm] = useState({ name: '', branch: '', college: '', project: '', skills: '', role: '' })
  const [copied, setCopied] = useState(false)

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const filled = form.name && form.branch && form.project && form.skills && form.role

  const pitch = filled ? `Hi, I'm ${form.name}${form.college ? `, a final year ${form.branch} student at ${form.college}` : `, a final year ${form.branch} student`}.

My final year project is ${form.project}. Through this project I developed strong skills in ${form.skills}, and gained hands-on experience building a real-world solution from scratch.

I'm passionate about ${form.role.toLowerCase()} and I'm looking for an opportunity where I can contribute meaningfully from day one, continue learning, and grow with the team.` : ''

  const copyPitch = async () => {
    await navigator.clipboard.writeText(pitch)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-8">
      <div className="bg-gradient-to-r from-brand-navy to-brand-blue px-6 py-4">
        <h2 className="text-white font-extrabold text-lg flex items-center gap-2">
          <MessageCircle size={20} /> "Tell Me About Yourself" Pitch Builder
        </h2>
        <p className="text-white/60 text-sm mt-0.5">Fill in the blanks — get a polished 60-second pitch you can customise.</p>
      </div>

      <div className="p-6 grid sm:grid-cols-2 gap-4">
        {[
          { key: 'name',    label: 'Your name',         placeholder: 'e.g. Arun Kumar' },
          { key: 'branch',  label: 'Branch / Degree',   placeholder: 'e.g. B.Tech Computer Science' },
          { key: 'college', label: 'College (optional)', placeholder: 'e.g. Anna University' },
          { key: 'skills',  label: 'Top 2–3 technical skills', placeholder: 'e.g. Python, React, Machine Learning' },
          { key: 'project', label: 'Project (one line)', placeholder: 'e.g. Face Recognition Attendance System using OpenCV' },
          { key: 'role',    label: 'Target role / domain', placeholder: 'e.g. Full Stack Development' },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="text-xs font-semibold text-slate-500 mb-1 block">{label}</label>
            <input
              type="text"
              value={form[key]}
              onChange={e => set(key, e.target.value)}
              placeholder={placeholder}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange"
            />
          </div>
        ))}
      </div>

      {filled && (
        <div className="px-6 pb-6">
          <div className="relative bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">{pitch}</p>
            <button
              onClick={copyPitch}
              className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                copied ? 'bg-emerald-100 text-emerald-700' : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-navy hover:text-brand-navy'
              }`}
            >
              {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
            </button>
          </div>
          <p className="text-slate-400 text-xs mt-2.5 flex items-center gap-1">
            <Lightbulb size={11} /> Practise saying this out loud 3 times until it feels natural.
          </p>
        </div>
      )}

      {!filled && (
        <div className="px-6 pb-6">
          <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-5 text-center">
            <p className="text-slate-400 text-sm">Fill in the fields above to generate your personalised pitch.</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ── STAR Method Card ───────────────────────────────────────────────────────────

function StarCard() {
  const [open, setOpen] = useState(true)
  const steps = [
    { letter: 'S', word: 'Situation', desc: 'Set the scene. When, where, what was happening?', color: 'bg-brand-navy', example: '"During my 6th semester project demo week, our main server went down 2 hours before presentation."' },
    { letter: 'T', word: 'Task',      desc: 'What was your specific responsibility?',         color: 'bg-brand-teal', example: '"I was responsible for the backend — I had to get it back online before 2 PM."' },
    { letter: 'A', word: 'Action',    desc: 'What exactly did YOU do? (use "I", not "we")',   color: 'bg-brand-orange', example: '"I switched to a local server, reconfigured the API endpoints, and ran a quick smoke test."' },
    { letter: 'R', word: 'Result',    desc: 'What was the measurable outcome?',               color: 'bg-emerald-600', example: '"We demoed successfully and received the highest grade in the batch."' },
  ]

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-8">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-orange/10 flex items-center justify-center">
            <Star size={18} className="text-brand-orange" fill="currentColor" />
          </div>
          <div>
            <p className="font-extrabold text-[#0B1D3A]">The STAR Method — answer any behavioural question</p>
            <p className="text-slate-400 text-xs">Situation → Task → Action → Result</p>
          </div>
        </div>
        {open ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
      </button>

      {open && (
        <div className="px-6 pb-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {steps.map(({ letter, word, desc, color }) => (
              <div key={letter} className={`${color} rounded-2xl p-4 text-white`}>
                <div className="text-4xl font-extrabold opacity-20 leading-none mb-2">{letter}</div>
                <p className="font-extrabold text-base mb-1">{word}</p>
                <p className="text-white/70 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wide">Example — "Describe a challenge you faced"</p>
            <div className="space-y-2">
              {steps.map(({ letter, word, example, color }) => (
                <div key={letter} className="flex items-start gap-3">
                  <span className={`${color} text-white text-xs font-bold w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5`}>{letter}</span>
                  <p className="text-slate-600 text-xs italic leading-relaxed">{example}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Question Accordion ─────────────────────────────────────────────────────────

function QuestionItem({ q, index }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-slate-50 transition"
      >
        <span className="w-7 h-7 rounded-xl bg-brand-orange/10 text-brand-orange text-xs font-bold flex-shrink-0 flex items-center justify-center mt-0.5">
          {index + 1}
        </span>
        <p className="flex-1 font-semibold text-[#0B1D3A] text-sm leading-snug">{q.q}</p>
        {open ? <ChevronUp size={16} className="text-slate-400 flex-shrink-0 mt-1" /> : <ChevronDown size={16} className="text-slate-400 flex-shrink-0 mt-1" />}
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4">
          <div className="ml-11 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-xs font-semibold text-slate-400 mb-1">Why they ask this</p>
            <p className="text-slate-600 text-sm">{q.why}</p>
          </div>

          <div className="ml-11">
            <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Suggested structure</p>
            <ul className="space-y-2">
              {q.structure.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand-navy text-white text-[10px] font-bold flex-shrink-0 flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-slate-700 text-sm leading-snug">{s}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="ml-11 flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl p-3">
            <Lightbulb size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 text-xs leading-relaxed">{q.tip}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function HRPrep() {
  const [activeCategory, setActiveCategory] = useState('intro')
  const category = CATEGORIES.find(c => c.id === activeCategory)
  const totalQ = CATEGORIES.reduce((a, c) => a + c.questions.length, 0)

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
      <div className="hero-bg py-10 pt-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight">
            Crack Your HR Round with Confidence
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            60-second pitch, STAR method, and {totalQ} common HR questions interviewers actually ask.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* STAR Method */}
        <StarCard />

        {/* Pitch Builder */}
        <PitchBuilder />

        {/* Question Bank */}
        <div>
          <h2 className="text-2xl font-extrabold text-[#0B1D3A] mb-2">Question Bank</h2>
          <p className="text-slate-500 text-sm mb-6">{totalQ} questions across {CATEGORIES.length} categories — click any question to see the answer structure.</p>

          {/* Category tabs (scrollable on mobile) */}
          <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-none pb-1">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-all ${
                    activeCategory === cat.id
                      ? 'bg-brand-navy text-white shadow-md'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-navy hover:text-brand-navy'
                  }`}
                >
                  <Icon size={14} />
                  {cat.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {cat.questions.length}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Category description */}
          {category && (
            <div className="space-y-3">
              {category.questions.map((q, i) => (
                <QuestionItem key={i} q={q} index={i} />
              ))}
            </div>
          )}
        </div>

        {/* CTA footer */}
        <div className="mt-10 bg-gradient-to-r from-brand-navy to-brand-blue rounded-2xl p-6 text-white flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex-1">
            <p className="font-extrabold text-lg mb-1">Ready to test your overall interview readiness?</p>
            <p className="text-white/70 text-sm">Take the 20-question self-assessment and get a personalised score and action plan.</p>
          </div>
          <Link
            to="/interview-readiness"
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-brand-orange text-white font-bold rounded-2xl hover:bg-amber-500 active:scale-95 transition-all text-sm"
          >
            Check Readiness <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  )
}
