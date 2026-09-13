import { Brain, AlignLeft, Calculator, BookOpen, Trophy, Target, AlertTriangle } from 'lucide-react'
import CompanyExamPage from './CompanyExamPage'

const CONFIG = {
  examId:      'cognizant_ccat',
  companyName: 'Cognizant CCAT',
  title:       'Cognizant CCAT Mock Test',
  subtitle:    'Full-length Cognizant Corporate Aptitude Test — 66 questions, 4 sections, 95 minutes. Unique paper per roll number.',

  examInfo: [
    { label: 'Reasoning Aptitude',   qs: 16, time: '25 min', Icon: Brain,       color: 'teal'   },
    { label: 'Verbal Ability',        qs: 22, time: '25 min', Icon: AlignLeft,   color: 'violet' },
    { label: 'Applied Mathematics',   qs: 16, time: '35 min', Icon: Calculator,  color: 'blue'   },
    { label: 'Attention to Detail',   qs: 12, time: '10 min', Icon: BookOpen,    color: 'orange' },
  ],

  markingScheme: [
    { label: 'Correct Answer',  val: '+1.00', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { label: 'Wrong Answer',    val: '0',     color: 'text-slate-600 bg-slate-50 border-slate-200'       },
    { label: 'Unattempted',     val: '0',     color: 'text-slate-600 bg-slate-50 border-slate-200'       },
    { label: 'Total Questions', val: '66',    color: 'text-brand-navy bg-blue-50 border-blue-200'        },
  ],

  predictions: [
    { minPct: 70, label: 'Likely Shortlisted',   color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', Icon: Trophy        },
    { minPct: 50, label: 'Interview Possible',    color: 'text-amber-600',   bg: 'bg-amber-50 border-amber-200',     Icon: Target        },
    { minPct:  0, label: 'Needs More Practice',   color: 'text-red-600',     bg: 'bg-red-50 border-red-200',         Icon: AlertTriangle },
  ],
}

export default function CognizantCcat() {
  return <CompanyExamPage config={CONFIG} />
}
