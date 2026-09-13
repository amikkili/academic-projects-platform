import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Check, Zap, BookOpen, Code2, FileDown, Rocket, Phone, Star, Lock, ShoppingCart, Unlock, Repeat2, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useAccess } from '../context/AccessContext'
import { usePayment } from '../hooks/usePayment'
import { projects } from '../data/projects'

// ── Plan definitions ──────────────────────────────────────────────────────────

const PLANS = [
  {
    id:       'free',
    name:     'Free',
    price:    '₹0',
    sub:      'Forever free',
    badge:    null,
    color:    'border-slate-200',
    btnClass: 'bg-slate-100 text-slate-600 hover:bg-slate-200',
    features: [
      { icon: BookOpen, text: 'Browse all projects',    ok: true },
      { icon: Star,     text: 'Project overview & demo video', ok: true },
      { icon: Zap,      text: 'Viva Q&A bank (50+ questions)',  ok: true },
      { icon: Code2,    text: 'Setup guide & IDE steps',        ok: false },
      { icon: FileDown, text: 'PPT download',                   ok: false },
      { icon: Rocket,   text: 'Deployment guide',               ok: false },
      { icon: Code2,    text: 'Source code access',             ok: false },
      { icon: Phone,    text: 'On-call support',                ok: false },
    ],
  },
  {
    id:       'single',
    name:     'Single Project',
    price:    '₹499',
    sub:      'One-time · Per project',
    badge:    null,
    color:    'border-brand-orange',
    btnClass: 'bg-brand-orange hover:bg-amber-500 text-white',
    features: [
      { icon: BookOpen, text: 'Browse all projects',    ok: true },
      { icon: Star,     text: 'Project overview & demo video', ok: true },
      { icon: Zap,      text: 'Viva Q&A bank (50+ questions)',  ok: true },
      { icon: Code2,    text: 'Setup guide & IDE steps',        ok: true },
      { icon: FileDown, text: 'PPT download',                   ok: true },
      { icon: Rocket,   text: 'Deployment guide',               ok: true },
      { icon: Code2,    text: 'Source code access',             ok: true },
      { icon: Phone,    text: 'On-call support',                ok: false },
    ],
  },
  {
    id:       'all',
    name:     'All Projects',
    price:    '₹1,999',
    sub:      'One-time · All 8 projects',
    badge:    'Best Value',
    color:    'border-brand-navy ring-2 ring-brand-navy',
    btnClass: 'bg-brand-navy hover:bg-slate-700 text-white',
    features: [
      { icon: BookOpen, text: 'Browse all projects',    ok: true },
      { icon: Star,     text: 'Project overview & demo video', ok: true },
      { icon: Zap,      text: 'Viva Q&A bank (50+ questions)',  ok: true },
      { icon: Code2,    text: 'Setup guide & IDE steps (all)',  ok: true },
      { icon: FileDown, text: 'PPT download (all)',             ok: true },
      { icon: Rocket,   text: 'Deployment guide (all)',         ok: true },
      { icon: Code2,    text: 'Source code access (all)',       ok: true },
      { icon: Phone,    text: 'Priority on-call support',       ok: true },
    ],
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function Pricing() {
  const { user, token, isLoggedIn } = useAuth()
  const { has_all, project_ids, refresh } = useAccess()
  const [selectedProject, setSelectedProject] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const location = useLocation()
  const highlightPlan = location.state?.highlight || null

  const [openFaq, setOpenFaq] = useState(null)

  const { pay, loading, error } = usePayment({
    token,
    user,
    onSuccess: ({ plan, project_id }) => {
      setSuccessMsg(
        plan === 'all'
          ? '🎉 All Projects unlocked! Enjoy full access.'
          : `🎉 "${project_id}" unlocked! Go to the project to download.`
      )
      refresh()
    },
  })

  function handleBuy(plan) {
    if (!isLoggedIn) return
    if (plan === 'single' && !selectedProject) {
      alert('Please select a project first.')
      return
    }
    pay({ plan, project_id: plan === 'single' ? selectedProject : null })
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
      <div className="hero-bg py-10 pt-20">
        <div className="w-full px-5 lg:px-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Simple, Honest Pricing
          </h1>
          <p className="text-white/65 text-sm max-w-lg mx-auto">
            Pay once. No subscriptions. Unlock what you need for your viva.
          </p>
        </div>
      </div>

      <div className="w-full px-5 lg:px-10 py-14">

        {/* Success banner */}
        {successMsg && (
          <div className="max-w-2xl mx-auto mb-8 flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-4 text-green-700 font-medium">
            <Check size={20} className="text-green-500 flex-shrink-0" />
            {successMsg}
          </div>
        )}

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {PLANS.map((plan) => {
            const alreadyHasAll    = has_all
            const alreadyHasSingle = plan.id === 'single' && selectedProject && project_ids.includes(selectedProject)
            const isPurchased      = plan.id === 'all' ? alreadyHasAll : (plan.id === 'free' ? true : alreadyHasSingle)

            const isHighlighted = highlightPlan === plan.id
            return (
              <div key={plan.id}
                className={`relative bg-white rounded-2xl border-2 ${plan.color} p-7 flex flex-col shadow-sm transition-all ${
                  isHighlighted ? 'ring-4 ring-brand-orange scale-[1.02]' : ''
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 bg-brand-navy text-white text-xs font-bold rounded-full">
                    {plan.badge}
                  </div>
                )}

                <div className="mb-5">
                  <p className="text-slate-500 text-sm font-medium">{plan.name}</p>
                  <p className="text-4xl font-extrabold text-slate-900 mt-1">{plan.price}</p>
                  <p className="text-slate-400 text-xs mt-1">{plan.sub}</p>
                </div>

                {/* Project selector for single plan */}
                {plan.id === 'single' && (
                  <select
                    value={selectedProject}
                    onChange={e => setSelectedProject(e.target.value)}
                    className="w-full mb-4 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
                  >
                    <option value="">— Select a project —</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.id}
                        disabled={project_ids.includes(p.id)}
                      >
                        {p.title}{project_ids.includes(p.id) ? ' ✓ Owned' : ''}
                      </option>
                    ))}
                  </select>
                )}

                {/* CTA */}
                {plan.id === 'free' ? (
                  <Link to="/projects"
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold text-center transition ${plan.btnClass}`}
                  >
                    Browse Projects
                  </Link>
                ) : !isLoggedIn ? (
                  <Link to="/login"
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold text-center transition ${plan.btnClass}`}
                  >
                    Sign in to Purchase
                  </Link>
                ) : isPurchased ? (
                  <div className="w-full py-2.5 rounded-xl text-sm font-semibold text-center bg-green-50 text-green-600 border border-green-200 flex items-center justify-center gap-2">
                    <Check size={15} /> Already Owned
                  </div>
                ) : (
                  <button
                    onClick={() => handleBuy(plan.id)}
                    disabled={loading || (plan.id === 'single' && !selectedProject)}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${plan.btnClass}`}
                  >
                    {loading ? 'Processing…' : `Buy — ${plan.price}`}
                  </button>
                )}

                {/* Error */}
                {error && plan.id !== 'free' && (
                  <p className="text-red-500 text-xs mt-2 text-center">{error}</p>
                )}

                {/* Feature list */}
                <ul className="mt-6 space-y-2.5 flex-1">
                  {plan.features.map(({ icon: Icon, text, ok }) => (
                    <li key={text} className={`flex items-center gap-2.5 text-sm ${ok ? 'text-slate-700' : 'text-slate-300'}`}>
                      {ok
                        ? <Check size={15} className="text-green-500 flex-shrink-0" />
                        : <Lock  size={14} className="text-slate-300 flex-shrink-0" />
                      }
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* How it works */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-xl font-extrabold text-brand-navy text-center mb-2">How It Works</h2>
          <p className="text-slate-400 text-sm text-center mb-8">Three steps, no surprises.</p>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: ShoppingCart, num: '01', title: 'Choose a Plan',    desc: 'Pick a single project you need, or unlock all 8 at once with the best-value plan.'    },
              { icon: Unlock,       num: '02', title: 'Pay Once',         desc: 'One-time payment via Razorpay. No subscriptions, no renewals, no hidden charges.'       },
              { icon: Repeat2,      num: '03', title: 'Access Forever',   desc: 'Your project is unlocked permanently — setup guide, source code, deploy guide and PPT.' },
            ].map(({ icon: Icon, num, title, desc }) => (
              <div key={num} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-brand-orange" />
                  </div>
                  <span className="text-3xl font-black text-slate-100 leading-none">{num}</span>
                </div>
                <div>
                  <h3 className="font-extrabold text-brand-navy text-base mb-1">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-4">
          <h2 className="text-xl font-extrabold text-brand-navy text-center mb-2">Common Questions</h2>
          <p className="text-slate-400 text-sm text-center mb-8">Everything you need to know before buying.</p>
          <div className="space-y-3">
            {[
              { q: 'Do I need to pay again if the project is updated?',        a: 'No. Once you unlock a project, all future updates are included at no extra cost.' },
              { q: 'Can I switch from Single to All Projects later?',          a: 'Yes — you can upgrade anytime. The ₹499 you already paid is not deducted, but you get full access to every project once you purchase the All Projects plan.' },
              { q: 'Is the source code downloadable or just viewable online?', a: 'Both. You get a GitHub repo link and a direct .zip download inside the Source Code tab of the project page.' },
              { q: 'What if I need help after purchasing?',                    a: 'Reach out on email or phone (see the Contact page). For All Projects plan holders, you get priority on-call support.' },
            ].map(({ q, a }, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-semibold text-slate-800 text-sm pr-4">{q}</span>
                  <ChevronDown size={16} className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-slate-500 text-sm leading-relaxed border-t border-slate-50 pt-3">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
