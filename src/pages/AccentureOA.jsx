import { Calculator, AlignLeft, Brain, Trophy, Target, AlertTriangle } from 'lucide-react'
import CompanyExamPage from './CompanyExamPage'

const CONFIG = {
  examId:      'accenture',
  companyName: 'Accenture Cognitive Assessment',
  title:       'Accenture OA Mock Test',
  subtitle:    'Full-length Accenture Cognitive Assessment — 40 questions, 3 sections, 60 minutes. Unique paper per roll number.',

  examInfo: [
    { label: 'Quantitative Aptitude', qs: 15, time: '25 min', Icon: Calculator, color: 'blue'   },
    { label: 'Verbal Ability',         qs: 15, time: '20 min', Icon: AlignLeft,  color: 'violet' },
    { label: 'Critical Reasoning',     qs: 10, time: '15 min', Icon: Brain,      color: 'teal'   },
  ],

  markingScheme: [
    { label: 'Correct Answer',  val: '+1.00', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { label: 'Wrong Answer',    val: '0',     color: 'text-slate-600 bg-slate-50 border-slate-200'       },
    { label: 'Unattempted',     val: '0',     color: 'text-slate-600 bg-slate-50 border-slate-200'       },
    { label: 'Total Questions', val: '40',    color: 'text-brand-navy bg-blue-50 border-blue-200'        },
  ],

  predictions: [
    { minPct: 70, label: 'Likely Shortlisted',   color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', Icon: Trophy        },
    { minPct: 50, label: 'Interview Possible',    color: 'text-amber-600',   bg: 'bg-amber-50 border-amber-200',     Icon: Target        },
    { minPct:  0, label: 'Needs More Practice',   color: 'text-red-600',     bg: 'bg-red-50 border-red-200',         Icon: AlertTriangle },
  ],
}

export default function AccentureOA() {
  return <CompanyExamPage config={CONFIG} />
}
