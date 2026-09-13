import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Code2, Mic2, GitBranch,
  Zap, Brain,
  Globe, Cpu, BarChart2, Smartphone, Shield, Search, Target, Briefcase, MessageCircle, FileText, Terminal,
  Settings, Landmark, BookOpen, Phone, Users, Eye,
} from 'lucide-react'

const TECH_LOGOS = [
  { name: 'Python',       src: 'https://cdn.simpleicons.org/python/3776AB'   },
  { name: 'Java',         src: 'https://cdn.simpleicons.org/java/007396'     },
  { name: 'React',        src: 'https://cdn.simpleicons.org/react/61DAFB'    },
  { name: 'Flutter',      src: 'https://cdn.simpleicons.org/flutter/02569B'  },
  { name: 'Arduino',      src: 'https://cdn.simpleicons.org/arduino/00979D'  },
  { name: 'Android',      src: 'https://cdn.simpleicons.org/android/3DDC84'  },
  { name: 'PHP',          src: 'https://cdn.simpleicons.org/php/777BB4'      },
  { name: 'Node.js',      src: 'https://cdn.simpleicons.org/nodedotjs/339933'},
  { name: 'MySQL',        src: 'https://cdn.simpleicons.org/mysql/4479A1'    },
  { name: 'MongoDB',      src: 'https://cdn.simpleicons.org/mongodb/47A248'  },
  { name: 'TensorFlow',   src: 'https://cdn.simpleicons.org/tensorflow/FF6F00'},
  { name: 'Raspberry Pi', src: 'https://cdn.simpleicons.org/raspberrypi/A22846'},
]

const TEAM = [
  {
    name: 'Anil Mikkili',
    role: 'Founder & Lead Mentor',
    bio: '10+ years of experience in software engineering and academic project mentorship. Helped 2,000+ students ace their final year projects and viva.',
    color: 'from-brand-orange to-amber-500',
  },
  {
    name: 'Padma',
    role: 'ECE & Embedded Systems',
    bio: 'Specialist in Arduino, Raspberry Pi and IoT projects. Passionate about helping students bridge the gap between theory and hardware.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Ramesh',
    role: 'Full-Stack & ML Projects',
    bio: 'Expert in Python, React and machine learning pipelines. Guides students from dataset selection to model deployment.',
    color: 'from-violet-500 to-purple-700',
  },
]

const features = [
  {
    icon: Code2,
    title: 'Complete Source Code',
    desc: 'Every project comes with fully working, well-commented source code you can run immediately.',
    color: 'from-brand-navy to-blue-700',
  },
  {
    icon: BookOpen,
    title: 'Step-by-Step Explanation',
    desc: 'Detailed explanations of every component, algorithm, and design decision in plain English.',
    color: 'from-brand-teal to-cyan-600',
  },
  {
    icon: Mic2,
    title: 'Viva Q&A Practice',
    desc: 'Curated viva questions and expert answers to help you confidently face your examination board.',
    color: 'from-brand-orange to-amber-500',
  },
  {
    icon: GitBranch,
    title: 'Multiple Tech Stacks',
    desc: 'Projects spanning Python, Java, React, Flutter, Arduino, and more — choose what fits your syllabus.',
    color: 'from-purple-600 to-purple-800',
  },
]


export default function Home() {
  const [visitors, setVisitors] = useState(null)
  useEffect(() => {
    fetch('https://api.counterapi.dev/v1/academicode-ap/home/up')
      .then(r => r.json())
      .then(d => setVisitors(d.count))
      .catch(() => {})
  }, [])

  return (
    <div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .marquee-track { animation: marquee 28s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>

      {/* ── Hero ── */}
      <section className="hero-bg flex relative overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-brand-teal/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-brand-orange/8 blur-3xl pointer-events-none" />

        <div className="w-full pl-4 sm:pl-10 lg:pl-16 pr-4 lg:pr-0 pt-20">
          <div className="grid lg:grid-cols-[480px_1fr] gap-10 items-center min-h-[calc(100vh-80px)]">

            {/* ── LEFT ── */}
            <div className="flex flex-col justify-center py-10 lg:min-h-[calc(100vh-100px)]">
              <p className="text-amber-400 text-lg font-semibold mb-8 leading-snug max-w-sm -mt-10">
                Need expert guidance for your academic projects?
              </p>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
                <span className="sm:whitespace-nowrap">Build Real Projects.</span><br />
                <span className="gradient-text">Ace Your Viva.</span>
              </h1>

              <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-lg line-clamp-2">
                Complete source code, step-by-step guides, and curated viva Q&amp;A —
                everything you need to ace your final year project.
              </p>

              {/* Level selector */}
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-1.5">Select Level</p>
              <div className="flex gap-2 mb-3">
                {[
                  { label: 'School', icon: BookOpen, accent: 'text-sky-300',    bg: 'bg-sky-500/15',    border: 'border-sky-400/25'    },
                  { label: 'UG',     icon: Brain,    accent: 'text-violet-300', bg: 'bg-violet-500/15', border: 'border-violet-400/25' },
                  { label: 'PG',     icon: BarChart2,accent: 'text-cyan-300',   bg: 'bg-cyan-500/15',   border: 'border-cyan-400/25'   },
                ].map(({ label, icon: Icon, accent, bg, border }) => (
                  <button
                    key={label}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl ${bg} border ${border} hover:brightness-125 hover:scale-105 transition-all duration-200`}
                  >
                    <Icon size={13} className={accent} />
                    <span className={`${accent} font-bold text-xs whitespace-nowrap`}>{label}</span>
                  </button>
                ))}
              </div>

              {/* Domain badges — prominent icon cards */}
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-1.5">Select Domain</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
                {[
                  { label: 'CSE',        icon: Code2,    color: 'from-violet-500/20 to-purple-600/10',  border: 'border-violet-400/30',  iconCol: 'text-violet-300'  },
                  { label: 'IT',         icon: Globe,    color: 'from-cyan-500/20 to-sky-600/10',       border: 'border-cyan-400/30',    iconCol: 'text-cyan-300'    },
                  { label: 'ECE',        icon: Cpu,      color: 'from-emerald-500/20 to-green-600/10',  border: 'border-emerald-400/30', iconCol: 'text-emerald-300' },
                  { label: 'EEE',        icon: Zap,      color: 'from-amber-500/20 to-orange-600/10',   border: 'border-amber-400/30',   iconCol: 'text-amber-300'   },
                  { label: 'Mechanical', icon: Settings, color: 'from-pink-500/20 to-rose-600/10',      border: 'border-pink-400/30',    iconCol: 'text-pink-300'    },
                  { label: 'Civil',      icon: Landmark, color: 'from-sky-500/20 to-blue-600/10',       border: 'border-sky-400/30',     iconCol: 'text-sky-300'     },
                ].map(({ label, icon: Icon, color, border, iconCol }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-br ${color} border ${border} hover:scale-105 transition-all duration-200 group cursor-default`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                      <Icon size={18} className={iconCol} />
                    </div>
                    <p className="text-white font-extrabold text-sm whitespace-nowrap">{label}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10">
                <Link to="/projects" className="btn-primary text-base px-8 py-3.5 justify-center">
                  Explore Projects <ArrowRight size={17} />
                </Link>
                <Link to="/about" className="btn-secondary text-base px-8 py-3.5 justify-center">
                  How It Works
                </Link>
              </div>

            </div>

            {/* ── RIGHT — 3-col staggered image mosaic ── */}
            <div className="hidden lg:block relative h-[calc(100vh-100px)] max-h-[780px] overflow-hidden -mr-0">
              {/* Fades */}
              <div className="absolute inset-x-0 top-0    h-24 bg-gradient-to-b from-[#0B1D3A] to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0B1D3A] to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0  w-16 bg-gradient-to-l from-[#0B1D3A] to-transparent z-10 pointer-events-none" />

              <div className="flex gap-4 h-full">

                {/* Col 1 — slight offset */}
                <div className="flex flex-col gap-3 flex-1 pt-6">
                  {[
                    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=300&fit=crop',
                    'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=480&h=300&fit=crop',
                    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=480&h=300&fit=crop',
                    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=480&h=300&fit=crop',
                  ].map((src, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden ring-2 ring-white/15 shadow-2xl shadow-black/50 flex-1 min-h-0">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>

                {/* Col 2 — starts at top */}
                <div className="flex flex-col gap-3 flex-1">
                  {[
                    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=480&h=300&fit=crop',
                    'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=480&h=300&fit=crop',
                    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=480&h=300&fit=crop',
                    'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=480&h=300&fit=crop',
                  ].map((src, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden ring-2 ring-white/15 shadow-2xl shadow-black/50 flex-1 min-h-0">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>

                {/* Col 3 — slight offset */}
                <div className="flex flex-col gap-3 flex-1 pt-3">
                  {[
                    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=480&h=300&fit=crop',
                    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=480&h=300&fit=crop',
                    'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=480&h=300&fit=crop',
                    'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=480&h=300&fit=crop',
                  ].map((src, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden ring-2 ring-white/15 shadow-2xl shadow-black/50 flex-1 min-h-0">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Why Choose AcademiCode ── */}
      <section className="py-20 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="section-title">Why Choose AcademiCode?</h2>
            <p className="section-sub max-w-2xl mx-auto">
              We go beyond giving you code — we prepare you to understand, present, and defend it.
              Every project is built to help you succeed not just in submission, but in the viva room.
            </p>
          </div>

          {/* Cards — staggered row */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {[
              {
                icon: Code2,
                title: '100% Working Code',
                desc: 'Every project ships with complete, runnable source code — not snippets. Clone it, run it, it works.',
                gradient: 'from-violet-500 to-purple-700',
                iconBg: 'bg-violet-500/15',
                iconColor: 'text-violet-600',
                bar: 'bg-gradient-to-r from-violet-500 to-purple-700',
                offset: 'lg:mt-0',
              },
              {
                icon: Mic2,
                title: 'Viva-Proof Preparation',
                desc: 'Curated Q&A banks for every project — the exact questions examiners ask, with expert-level answers.',
                gradient: 'from-brand-orange to-amber-500',
                iconBg: 'bg-orange-500/15',
                iconColor: 'text-orange-600',
                bar: 'bg-gradient-to-r from-brand-orange to-amber-500',
                offset: 'lg:mt-8',
              },
              {
                icon: GitBranch,
                title: 'Your Stack, Your Choice',
                desc: 'Python, Java, React, Flutter, Arduino — multiple tech stacks so you learn what fits your syllabus.',
                gradient: 'from-emerald-500 to-teal-600',
                iconBg: 'bg-emerald-500/15',
                iconColor: 'text-emerald-600',
                bar: 'bg-gradient-to-r from-emerald-500 to-teal-600',
                offset: 'lg:mt-4',
              },
              {
                icon: MessageCircle,
                title: 'On-Call Support',
                desc: 'Stuck the night before your viva? We offer real-time debugging and live guidance when it matters most.',
                gradient: 'from-sky-500 to-cyan-600',
                iconBg: 'bg-sky-500/15',
                iconColor: 'text-sky-600',
                bar: 'bg-gradient-to-r from-sky-500 to-cyan-600',
                offset: 'lg:mt-12',
              },
            ].map(({ icon: Icon, title, desc, gradient, iconBg, iconColor, bar, offset }) => (
              <div key={title} className={`bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${offset}`}>
                {/* Colored top strip */}
                <div className={`h-1.5 w-full ${bar}`} />
                {/* Icon block */}
                <div className={`bg-gradient-to-br ${gradient} px-6 pt-7 pb-8 flex items-end`}>
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <Icon size={30} className="text-white" strokeWidth={1.8} />
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <h3 className="font-extrabold text-brand-navy text-[17px] mb-2 leading-snug">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">Everything You Need to Succeed</h2>
            <p className="section-sub">
              From concept to code to viva — we cover the entire project lifecycle.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card p-6 text-center group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-[#0B1D3A] text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Smart Tools ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Tools to Help You Succeed</h2>
            <p className="section-sub">Beyond just projects — predict, plan, and prepare smarter for your semester</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-gradient-to-br from-brand-navy via-[#1B3A6B] to-[#164E63] rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-brand-teal/10 blur-3xl pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center mb-5">
                <Search size={26} className="text-brand-orange" />
              </div>
              <h3 className="text-xl font-extrabold text-white mb-2">Project Fit Recommender</h3>
              <p className="text-white/65 text-sm leading-relaxed mb-6">Tell us your skills — Python, React, Arduino — and we'll rank all projects by match %, with a list of what you'd need to learn.</p>
              <Link to="/project-fit" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange text-white font-bold rounded-2xl hover:bg-amber-500 active:scale-95 transition-all text-sm">Find My Project <ArrowRight size={16} /></Link>
            </div>

            <div className="bg-gradient-to-br from-[#1B3A6B] to-[#312e81] rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-purple-400/10 blur-3xl pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                <Target size={26} className="text-purple-300" />
              </div>
              <h3 className="text-xl font-extrabold text-white mb-2">Internal Marks Estimator</h3>
              <p className="text-white/65 text-sm leading-relaxed mb-6">Enter your attendance, test scores, and lab marks — get an instant grade prediction and tips on which areas to improve.</p>
              <Link to="/internal-marks" className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 border border-white/25 text-white font-bold rounded-2xl hover:bg-white/25 active:scale-95 transition-all text-sm backdrop-blur-sm">Estimate My Marks <ArrowRight size={16} /></Link>
            </div>

            <div className="bg-gradient-to-br from-emerald-800 to-[#064e3b] rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                <Briefcase size={26} className="text-emerald-300" />
              </div>
              <h3 className="text-xl font-extrabold text-white mb-2">Interview Readiness Score</h3>
              <p className="text-white/65 text-sm leading-relaxed mb-6">20-question self-assessment across project knowledge, coding, CS fundamentals, communication, and resume — with a personalised action plan.</p>
              <Link to="/interview-readiness" className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 border border-white/25 text-white font-bold rounded-2xl hover:bg-white/25 active:scale-95 transition-all text-sm backdrop-blur-sm">Check My Readiness <ArrowRight size={16} /></Link>
            </div>

            <div className="bg-gradient-to-br from-rose-800 to-[#4c0519] rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-rose-400/10 blur-3xl pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                <MessageCircle size={26} className="text-rose-300" />
              </div>
              <h3 className="text-xl font-extrabold text-white mb-2">HR Round Prep</h3>
              <p className="text-white/65 text-sm leading-relaxed mb-6">Build your 60-second pitch, master the STAR method, and prep 25 common HR and behavioural questions interviewers actually ask.</p>
              <Link to="/hr-prep" className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 border border-white/25 text-white font-bold rounded-2xl hover:bg-white/25 active:scale-95 transition-all text-sm backdrop-blur-sm">Prep for HR <ArrowRight size={16} /></Link>
            </div>

            <div className="bg-gradient-to-br from-violet-800 to-[#2e1065] rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-violet-400/10 blur-3xl pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                <FileText size={26} className="text-violet-300" />
              </div>
              <h3 className="text-xl font-extrabold text-white mb-2">Resume Bullet Generator</h3>
              <p className="text-white/65 text-sm leading-relaxed mb-6">Fill in your project details — get polished, quantified resume bullets and a one-line summary ready to paste into your CV or LinkedIn.</p>
              <Link to="/resume-builder" className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 border border-white/25 text-white font-bold rounded-2xl hover:bg-white/25 active:scale-95 transition-all text-sm backdrop-blur-sm">Build My Resume <ArrowRight size={16} /></Link>
            </div>

            <div className="bg-gradient-to-br from-slate-700 to-[#0f172a] rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-brand-teal/10 blur-3xl pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                <Terminal size={26} className="text-brand-teal" />
              </div>
              <h3 className="text-xl font-extrabold text-white mb-2">Coding &amp; Aptitude Practice</h3>
              <p className="text-white/65 text-sm leading-relaxed mb-6">Practice company-specific patterns for TCS, Infosys, Wipro and product companies. Track your weak topics over time with localStorage.</p>
              <Link to="/coding-practice" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal text-white font-bold rounded-2xl hover:bg-cyan-500 active:scale-95 transition-all text-sm">Start Practicing <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Team ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">Meet the Team</h2>
            <p className="section-sub">The people behind every project, guide, and late-night viva rescue.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {TEAM.map(({ name, role, bio, color }) => (
              <div key={name} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden">
                <div className={`bg-gradient-to-br ${color} h-28 flex items-end px-6 pb-0`}>
                  <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-xl translate-y-10 overflow-hidden flex items-center justify-center">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                    </svg>
                  </div>
                </div>
                <div className="pt-14 px-6 pb-6">
                  <p className="font-extrabold text-brand-navy text-base">{name}</p>
                  <p className="text-brand-orange text-xs font-bold uppercase tracking-wider mt-0.5 mb-3">{role}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── Tech Logos Marquee ── */}
      <div className="bg-white border-y border-slate-100 py-5 overflow-hidden">
        <p className="text-center text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">Tech Stacks We Cover</p>
        <div className="overflow-hidden">
          <div className="marquee-track flex gap-5 w-max">
            {[...TECH_LOGOS, ...TECH_LOGOS].map((t, i) => (
              <div key={i} className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-200 transition-all flex-shrink-0">
                <img src={t.src} alt={t.name} className="w-5 h-5 object-contain" />
                <span className="text-slate-600 font-semibold text-sm whitespace-nowrap">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Need Help CTA ── */}
      <section className="py-20 bg-gradient-to-br from-[#1B3A6B] via-[#0B1D3A] to-[#164E63] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-brand-teal/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-brand-orange/8 blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
            Need help selecting a project topic?
          </h2>
          <p className="text-white/65 text-base leading-relaxed mb-10">
            Don't wait until it's too late. Contact us today and our mentors will help you find the right project for your department, skill level, and submission deadline.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+919866376367"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-orange hover:bg-amber-500 text-white font-bold rounded-2xl text-base transition-all active:scale-95 shadow-lg shadow-orange-900/30"
            >
              <Phone size={18} /> CALL @ +91 98663 76367
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold rounded-2xl text-base transition-all backdrop-blur-sm"
            >
              Message Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>


    </div>
  )
}
