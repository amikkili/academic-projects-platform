import { Calculator, AlignLeft, Brain, FileCode2, Trophy, Target, AlertTriangle } from 'lucide-react'
import CompanyExamPage from './CompanyExamPage'

const CONFIG = {
  examId:      'hcl',
  companyName: 'HCL Online Aptitude Test',
  title:       'HCL Aptitude Mock Test',
  subtitle:    'Full-length HCL Online Aptitude Test — 60 questions, 4 sections, 80 minutes. Unique paper per roll number.',

  examInfo: [
    { label: 'Numerical Ability',  qs: 15, time: '20 min', Icon: Calculator, color: 'blue'   },
    { label: 'Verbal Ability',      qs: 15, time: '20 min', Icon: AlignLeft,  color: 'violet' },
    { label: 'Logical Reasoning',   qs: 20, time: '25 min', Icon: Brain,      color: 'teal'   },
    { label: 'Technical MCQ',       qs: 10, time: '15 min', Icon: FileCode2,  color: 'orange' },
  ],

  markingScheme: [
    { label: 'Correct Answer',  val: '+1.00', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { label: 'Wrong Answer',    val: '0',     color: 'text-slate-600 bg-slate-50 border-slate-200'       },
    { label: 'Unattempted',     val: '0',     color: 'text-slate-600 bg-slate-50 border-slate-200'       },
    { label: 'Total Questions', val: '60',    color: 'text-brand-navy bg-blue-50 border-blue-200'        },
  ],

  predictions: [
    { minPct: 68, label: 'Likely Shortlisted',   color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', Icon: Trophy        },
    { minPct: 48, label: 'Interview Possible',    color: 'text-amber-600',   bg: 'bg-amber-50 border-amber-200',     Icon: Target        },
    { minPct:  0, label: 'Needs More Practice',   color: 'text-red-600',     bg: 'bg-red-50 border-red-200',         Icon: AlertTriangle },
  ],
}

export default function HclOA() {
  return <CompanyExamPage config={CONFIG} />
}
