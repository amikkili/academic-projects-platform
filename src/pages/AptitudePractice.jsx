import { Link } from 'react-router-dom'
import { Clock, BookOpen, Code2, Brain, Calculator, AlignLeft, ChevronRight, Zap } from 'lucide-react'

const COMPANIES = [
  {
    id: 'tcs-nqt',
    route: '/company-exam/tcs-nqt',
    name: 'TCS NQT',
    full: 'Tata Consultancy Services',
    initials: 'TCS',
    color: 'from-blue-700 to-blue-900',
    accent: 'bg-blue-600',
    questions: 90,
    minutes: 135,
    sections: [
      { label: 'Numerical',  color: 'bg-blue-100 text-blue-700'   },
      { label: 'Verbal',     color: 'bg-violet-100 text-violet-700' },
      { label: 'Reasoning',  color: 'bg-teal-100 text-teal-700'   },
      { label: 'Coding',     color: 'bg-orange-100 text-orange-700' },
    ],
    tag: 'Campus Recruitment',
  },
  {
    id: 'infosys-oa',
    route: '/company-exam/infosys-oa',
    name: 'Infosys OA',
    full: 'Infosys Online Assessment',
    initials: 'INF',
    color: 'from-indigo-600 to-indigo-900',
    accent: 'bg-indigo-600',
    questions: 50,
    minutes: 90,
    sections: [
      { label: 'Quantitative', color: 'bg-blue-100 text-blue-700'   },
      { label: 'Reasoning',    color: 'bg-teal-100 text-teal-700'   },
      { label: 'Verbal',       color: 'bg-violet-100 text-violet-700' },
      { label: 'Coding',       color: 'bg-orange-100 text-orange-700' },
    ],
    tag: 'Campus Recruitment',
  },
  {
    id: 'wipro-nlth',
    route: '/company-exam/wipro-nlth',
    name: 'Wipro NLTH',
    full: 'Wipro National Lateral Talent Hunt',
    initials: 'WIP',
    color: 'from-purple-600 to-purple-900',
    accent: 'bg-purple-600',
    questions: 48,
    minutes: 48,
    sections: [
      { label: 'Verbal',    color: 'bg-violet-100 text-violet-700' },
      { label: 'Reasoning', color: 'bg-teal-100 text-teal-700'   },
      { label: 'Numerical', color: 'bg-blue-100 text-blue-700'   },
    ],
    tag: 'Campus Recruitment',
  },
  {
    id: 'cognizant-ccat',
    route: '/company-exam/cognizant-ccat',
    name: 'Cognizant CCAT',
    full: 'Cognizant Corporate Competitive Aptitude Test',
    initials: 'COG',
    color: 'from-teal-600 to-teal-900',
    accent: 'bg-teal-600',
    questions: 66,
    minutes: 95,
    sections: [
      { label: 'Reasoning',  color: 'bg-teal-100 text-teal-700'   },
      { label: 'Verbal',     color: 'bg-violet-100 text-violet-700' },
      { label: 'Numerical',  color: 'bg-blue-100 text-blue-700'   },
      { label: 'Attention',  color: 'bg-amber-100 text-amber-700'  },
    ],
    tag: 'Campus Recruitment',
  },
  {
    id: 'capgemini-oa',
    route: '/company-exam/capgemini-oa',
    name: 'Capgemini OA',
    full: 'Capgemini Online Assessment',
    initials: 'CAP',
    color: 'from-cyan-600 to-cyan-900',
    accent: 'bg-cyan-600',
    questions: 58,
    minutes: 63,
    sections: [
      { label: 'Numerical',   color: 'bg-blue-100 text-blue-700'   },
      { label: 'Reasoning',   color: 'bg-teal-100 text-teal-700'   },
      { label: 'Verbal',      color: 'bg-violet-100 text-violet-700' },
      { label: 'Pseudo Code', color: 'bg-orange-100 text-orange-700' },
    ],
    tag: 'Campus Recruitment',
  },
  {
    id: 'accenture-oa',
    route: '/company-exam/accenture-oa',
    name: 'Accenture OA',
    full: 'Accenture Online Assessment',
    initials: 'ACC',
    color: 'from-rose-600 to-rose-900',
    accent: 'bg-rose-600',
    questions: 40,
    minutes: 60,
    sections: [
      { label: 'Numerical',  color: 'bg-blue-100 text-blue-700'    },
      { label: 'Verbal',     color: 'bg-violet-100 text-violet-700' },
      { label: 'Reasoning',  color: 'bg-teal-100 text-teal-700'    },
    ],
    tag: 'Campus Recruitment',
  },
  {
    id: 'hcl-oa',
    route: '/company-exam/hcl-oa',
    name: 'HCL OA',
    full: 'HCL Online Assessment',
    initials: 'HCL',
    color: 'from-orange-600 to-orange-900',
    accent: 'bg-orange-600',
    questions: 60,
    minutes: 80,
    sections: [
      { label: 'Numerical',  color: 'bg-blue-100 text-blue-700'    },
      { label: 'Verbal',     color: 'bg-violet-100 text-violet-700' },
      { label: 'Reasoning',  color: 'bg-teal-100 text-teal-700'    },
      { label: 'Technical',  color: 'bg-orange-100 text-orange-700' },
    ],
    tag: 'Campus Recruitment',
  },
  {
    id: 'tech-mahindra-oa',
    route: '/company-exam/tech-mahindra-oa',
    name: 'Tech Mahindra',
    full: 'Tech Mahindra Online Assessment',
    initials: 'TM',
    color: 'from-emerald-600 to-emerald-900',
    accent: 'bg-emerald-600',
    questions: 75,
    minutes: 80,
    sections: [
      { label: 'Quantitative', color: 'bg-blue-100 text-blue-700'    },
      { label: 'Reasoning',    color: 'bg-teal-100 text-teal-700'    },
      { label: 'English',      color: 'bg-violet-100 text-violet-700' },
    ],
    tag: 'Campus Recruitment',
  },
]

export default function AptitudePractice() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
      <div className="bg-[#0B1D3A] pt-20 pb-10 px-5 text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
          Aptitude Practice
        </h1>
        <p className="text-white/55 max-w-xl mx-auto text-sm">
          Full-length mock tests for top IT company campus drives. Questions are unique per roll number.
        </p>

      </div>

      {/* Cards grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {COMPANIES.map(co => (
            <Link
              key={co.id}
              to={co.route}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col"
            >
              {/* Color banner with initials */}
              <div className={`bg-gradient-to-br ${co.color} h-24 flex items-center justify-center`}>
                <span className="text-white text-3xl font-black tracking-tight opacity-90">
                  {co.initials}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col gap-3">
                {/* Name + tag */}
                <div>
                  <h2 className="font-extrabold text-brand-navy text-base leading-tight">{co.name}</h2>
                  <p className="text-slate-400 text-xs mt-0.5 leading-tight">{co.full}</p>
                  <span className="inline-block mt-1.5 text-[10px] font-bold uppercase tracking-wide bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                    {co.tag}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <BookOpen size={11} /> {co.questions}Q
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {co.minutes} min
                  </span>
                </div>

                {/* Section badges */}
                <div className="flex flex-wrap gap-1">
                  {co.sections.map(s => (
                    <span key={s.label} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.color}`}>
                      {s.label}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-auto pt-1">
                  <div className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-white text-sm font-bold ${co.accent} group-hover:opacity-90 transition`}>
                    Start Mock Test <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
