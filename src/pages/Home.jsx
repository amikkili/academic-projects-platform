import { Link } from 'react-router-dom'
import {
  ArrowRight, BookOpen, Code2, Mic2, GitBranch,
  Star, Users, Trophy, Zap, ChevronRight, Brain,
  Globe, Cpu, BarChart2, Smartphone, Shield, Search, Target, Briefcase, MessageCircle, FileText, Terminal,
} from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import { projects, categories } from '../data/projects'

const stats = [
  { icon: BookOpen, label: 'Projects', value: '50+' },
  { icon: Users,    label: 'Students', value: '10K+' },
  { icon: Code2,    label: 'Code Snippets', value: '200+' },
  { icon: Trophy,   label: 'Viva Q&As', value: '500+' },
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

const catIcons = {
  ml:       Brain,
  web:      Globe,
  iot:      Cpu,
  data:     BarChart2,
  mobile:   Smartphone,
  security: Shield,
}

export default function Home() {
  const featured = projects.slice(0, 6)

  return (
    <div>
      {/* ── Hero ── */}
      <section className="hero-bg min-h-screen flex items-center relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-brand-orange/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
              Build Real Projects.{' '}
              <span className="gradient-text">Ace Your Viva.</span>
            </h1>

            <p className="text-white/70 text-xl leading-relaxed mb-10 max-w-2xl">
              Explore 50+ academic projects with complete source code, detailed explanations,
              and curated viva Q&amp;A — everything you need to succeed in your final year project.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/projects" className="btn-primary text-base px-8 py-4 justify-center">
                Explore Projects <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn-secondary text-base px-8 py-4 justify-center">
                How It Works
              </Link>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-8 mt-12">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 bg-white/7 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none border border-white/10 sm:border-0 rounded-2xl p-3 sm:p-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-brand-orange" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg sm:text-xl leading-none">{value}</p>
                    <p className="text-white/50 text-xs mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>
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

      {/* ── Categories ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-sub">Pick your domain and dive straight into projects</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.filter(c => c.id !== 'all').map(cat => {
              const Icon = catIcons[cat.id] || Code2
              return (
                <Link
                  key={cat.id}
                  to={`/projects?cat=${cat.id}`}
                  className="card p-5 text-center group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-navy to-brand-blue flex items-center justify-center mx-auto mb-3 group-hover:from-brand-teal group-hover:to-cyan-600 transition-all">
                    <Icon size={20} className="text-white" />
                  </div>
                  <p className="text-[#0B1D3A] font-semibold text-sm">{cat.label}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Smart Tools ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-navy/10 text-brand-navy text-sm font-bold mb-4">
              <Zap size={13} fill="currentColor" /> Smart Tools
            </div>
            <h2 className="section-title">Tools to Help You Succeed</h2>
            <p className="section-sub">Beyond just projects — predict, plan, and prepare smarter for your semester</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Project Fit Card */}
            <div className="bg-gradient-to-br from-brand-navy via-[#1B3A6B] to-[#164E63] rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-brand-teal/10 blur-3xl pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center mb-5">
                <Search size={26} className="text-brand-orange" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-bold mb-3">
                <Zap size={11} fill="currentColor" /> FEATURE 2
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">Project Fit Recommender</h3>
              <p className="text-white/65 text-sm leading-relaxed mb-6">
                Tell us your skills — Python, React, Arduino — and we'll rank all projects by match %, with a list of what you'd need to learn.
              </p>
              <Link
                to="/project-fit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange text-white font-bold rounded-2xl hover:bg-amber-500 active:scale-95 transition-all text-sm"
              >
                Find My Project <ArrowRight size={16} />
              </Link>
            </div>

            {/* Internal Marks Card */}
            <div className="bg-gradient-to-br from-[#1B3A6B] to-[#312e81] rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-purple-400/10 blur-3xl pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                <Target size={26} className="text-purple-300" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-bold mb-3">
                <Zap size={11} fill="currentColor" /> FEATURE 3
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">Internal Marks Estimator</h3>
              <p className="text-white/65 text-sm leading-relaxed mb-6">
                Enter your attendance, test scores, and lab marks — get an instant grade prediction and tips on which areas to improve.
              </p>
              <Link
                to="/internal-marks"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 border border-white/25 text-white font-bold rounded-2xl hover:bg-white/25 active:scale-95 transition-all text-sm backdrop-blur-sm"
              >
                Estimate My Marks <ArrowRight size={16} />
              </Link>
            </div>
            {/* Interview Readiness Card */}
            <div className="bg-gradient-to-br from-emerald-800 to-[#064e3b] rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                <Briefcase size={26} className="text-emerald-300" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold mb-3">
                <Zap size={11} fill="currentColor" /> FEATURE 4
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">Interview Readiness Score</h3>
              <p className="text-white/65 text-sm leading-relaxed mb-6">
                20-question self-assessment across project knowledge, coding, CS fundamentals, communication, and resume — with a personalised action plan.
              </p>
              <Link
                to="/interview-readiness"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 border border-white/25 text-white font-bold rounded-2xl hover:bg-white/25 active:scale-95 transition-all text-sm backdrop-blur-sm"
              >
                Check My Readiness <ArrowRight size={16} />
              </Link>
            </div>

            {/* HR Prep Card */}
            <div className="bg-gradient-to-br from-rose-800 to-[#4c0519] rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-rose-400/10 blur-3xl pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                <MessageCircle size={26} className="text-rose-300" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-xs font-bold mb-3">
                <Zap size={11} fill="currentColor" /> FEATURE 5
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">HR Round Prep</h3>
              <p className="text-white/65 text-sm leading-relaxed mb-6">
                Build your 60-second pitch, master the STAR method, and prep 25 common HR and behavioural questions interviewers actually ask.
              </p>
              <Link
                to="/hr-prep"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 border border-white/25 text-white font-bold rounded-2xl hover:bg-white/25 active:scale-95 transition-all text-sm backdrop-blur-sm"
              >
                Prep for HR <ArrowRight size={16} />
              </Link>
            </div>

            {/* Resume Builder Card */}
            <div className="bg-gradient-to-br from-violet-800 to-[#2e1065] rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-violet-400/10 blur-3xl pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                <FileText size={26} className="text-violet-300" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-violet-200 text-xs font-bold mb-3">
                <Zap size={11} fill="currentColor" /> FEATURE 6
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">Resume Bullet Generator</h3>
              <p className="text-white/65 text-sm leading-relaxed mb-6">
                Fill in your project details — get polished, quantified resume bullets and a one-line summary ready to paste into your CV or LinkedIn.
              </p>
              <Link
                to="/resume-builder"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 border border-white/25 text-white font-bold rounded-2xl hover:bg-white/25 active:scale-95 transition-all text-sm backdrop-blur-sm"
              >
                Build My Resume <ArrowRight size={16} />
              </Link>
            </div>

            {/* Coding Practice Card */}
            <div className="bg-gradient-to-br from-slate-700 to-[#0f172a] rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-brand-teal/10 blur-3xl pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                <Terminal size={26} className="text-brand-teal" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-bold mb-3">
                <Zap size={11} fill="currentColor" /> FEATURE 7
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">Coding &amp; Aptitude Practice</h3>
              <p className="text-white/65 text-sm leading-relaxed mb-6">
                Practice company-specific patterns for TCS, Infosys, Wipro and product companies. Track your weak topics over time with localStorage.
              </p>
              <Link
                to="/coding-practice"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal text-white font-bold rounded-2xl hover:bg-cyan-500 active:scale-95 transition-all text-sm"
              >
                Start Practicing <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="section-title">Featured Projects</h2>
              <p className="text-slate-500 text-lg mt-2">Popular picks from our project library</p>
            </div>
            <Link
              to="/projects"
              className="flex items-center gap-2 text-brand-navy font-semibold hover:text-brand-orange transition-colors whitespace-nowrap"
            >
              View All <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 hero-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzYgMzRjMC0xLjEuOS0yIDItMnMyIDkgMiAyLS45IDItMiAyLTItLjktMi0yeiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDMiLz48L2c+PC9zdmc+')] opacity-50" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <Star size={36} className="text-brand-orange mx-auto mb-4" fill="currentColor" />
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Join thousands of students who aced their final year projects using AcademiCode.
          </p>
          <Link to="/projects" className="btn-primary text-base px-10 py-4">
            Get Started Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
