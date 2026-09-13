import { Calculator, Brain, AlignLeft, Trophy, Target, AlertTriangle } from 'lucide-react'
import CompanyExamPage from './CompanyExamPage'

const CONFIG = {
  examId:      'wipro_nlth',
  companyName: 'Wipro NLTH',
  title:       'Wipro NLTH Mock Test',
  subtitle:    'Full-length Wipro National Level Talent Hunt aptitude test — 48 questions, 3 sections, 48 minutes. Unique paper per roll number.',

  examInfo: [
    { label: 'Verbal Ability',            qs: 18, time: '18 min', Icon: AlignLeft,  color: 'violet' },
    { label: 'Analytical & Logical',      qs: 18, time: '18 min', Icon: Brain,      color: 'teal'   },
    { label: 'Quantitative Aptitude',     qs: 12, time: '12 min', Icon: Calculator, color: 'blue'   },
  ],

  markingScheme: [
    { label: 'Correct Answer',  val: '+1.00', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { label: 'Wrong Answer',    val: '0',     color: 'text-slate-600 bg-slate-50 border-slate-200'       },
    { label: 'Unattempted',     val: '0',     color: 'text-slate-600 bg-slate-50 border-slate-200'       },
    { label: 'Total Questions', val: '48',    color: 'text-brand-navy bg-blue-50 border-blue-200'        },
  ],

  predictions: [
    { minPct: 65, label: 'Likely Shortlisted',      color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', Icon: Trophy        },
    { minPct: 45, label: 'Average — Revise Topics', color: 'text-amber-600',   bg: 'bg-amber-50 border-amber-200',     Icon: Target        },
    { minPct:  0, label: 'Needs More Practice',     color: 'text-red-600',     bg: 'bg-red-50 border-red-200',         Icon: AlertTriangle },
  ],
}

export default function WiproNlth() {
  return <CompanyExamPage config={CONFIG} />
}
