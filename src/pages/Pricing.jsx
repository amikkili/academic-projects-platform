import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Zap, BookOpen, Code2, FileDown, Rocket, Phone, Star, Lock, Shield, AlertCircle } from 'lucide-react'
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
      <div className="hero-bg py-20 pt-28">
        <div className="w-full px-5 lg:px-10 text-center">
          {/* TEST MODE banner */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-xs font-semibold mb-5">
            <AlertCircle size={13} />
            TEST MODE — No real charges · Use test card 4111 1111 1111 1111 · OTP: 1234
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Simple, Honest Pricing
          </h1>
          <p className="text-white/65 text-lg max-w-lg mx-auto">
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

            return (
              <div key={plan.id}
                className={`relative bg-white rounded-2xl border-2 ${plan.color} p-7 flex flex-col shadow-sm`}
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

        {/* Test card info */}
        <div className="max-w-2xl mx-auto bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-14">
          <p className="font-bold text-yellow-800 text-sm mb-3 flex items-center gap-2">
            <AlertCircle size={16} /> Test Mode — Sample Transaction Details
          </p>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {[
              ['Card Number', '4111 1111 1111 1111'],
              ['Expiry',      'Any future date (e.g. 12/26)'],
              ['CVV',         'Any 3 digits (e.g. 123)'],
              ['OTP',         '1234'],
              ['UPI',         'success@razorpay'],
              ['Net Banking', 'Any bank → use test credentials'],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <span className="text-yellow-700 font-semibold w-28 flex-shrink-0">{k}:</span>
                <span className="font-mono text-yellow-900">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust strip */}
        <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-6 text-center">
          {[
            { icon: Shield, title: 'Secure Payments',  sub: 'Powered by Razorpay — India\'s #1 payment gateway' },
            { icon: Check,  title: 'One-Time Payment', sub: 'No subscriptions. Pay once, access forever.' },
            { icon: Phone,  title: 'WhatsApp Support', sub: 'Any issue? Message us and we\'ll resolve it instantly.' },
          ].map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-brand-navy/8 flex items-center justify-center">
                <Icon size={18} className="text-brand-navy" />
              </div>
              <p className="font-semibold text-slate-800 text-sm">{title}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
