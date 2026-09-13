import { Calculator, Brain, AlignLeft, FileCode2, Trophy, Target, AlertTriangle } from 'lucide-react'
import CompanyExamPage from './CompanyExamPage'

const CONFIG = {
  examId:      'infosys',
  companyName: 'Infosys Online Assessment',
  title:       'Infosys OA Mock Test',
  subtitle:    'Full-length Infosys Online Assessment — 50 questions, 4 sections, 90 minutes. Unique paper per roll number.',

  examInfo: [
    { label: 'Quantitative Aptitude',    qs: 10, time: '35 min', Icon: Calculator, color: 'blue'   },
    { label: 'Reasoning & Logical',      qs: 15, time: '25 min', Icon: Brain,      color: 'teal'   },
    { label: 'Verbal Ability',           qs: 20, time: '20 min', Icon: AlignLeft,  color: 'violet' },
    { label: 'Programming Concepts',     qs:  5, time: '10 min', Icon: FileCode2,  color: 'orange' },
  ],

  markingScheme: [
    { label: 'Correct Answer',  val: '+1.00', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { label: 'Wrong Answer',    val: '0',     color: 'text-slate-600 bg-slate-50 border-slate-200'       },
    { label: 'Unattempted',     val: '0',     color: 'text-slate-600 bg-slate-50 border-slate-200'       },
    { label: 'Total Questions', val: '50',    color: 'text-brand-navy bg-blue-50 border-blue-200'        },
  ],

  // sorted highest first; last entry is the catch-all
  predictions: [
    { minPct: 70, label: 'Likely Shortlisted',      color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', Icon: Trophy        },
    { minPct: 50, label: 'Interview Possible',       color: 'text-amber-600',   bg: 'bg-amber-50 border-amber-200',     Icon: Target        },
    { minPct:  0, label: 'Needs More Practice',      color: 'text-red-600',     bg: 'bg-red-50 border-red-200',         Icon: AlertTriangle },
  ],
}

export default function InfosysOA() {
  return <CompanyExamPage config={CONFIG} />
}
