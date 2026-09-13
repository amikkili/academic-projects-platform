import { Mail, Phone, Send, Clock, MapPin, Wrench, BookOpen, Code2, Lightbulb } from 'lucide-react'

const EMAIL = 'anil.mikkili@gmail.com'
const PHONE = '+91 98663 76367'
const TEL   = 'tel:+919866376367'

const HELP_ITEMS = [
  { icon: Wrench,    label: 'Project Setup',     desc: 'IDE configuration, dependencies, running locally' },
  { icon: BookOpen,  label: 'Viva Preparation',  desc: 'Mock Q&A, topic explanations, last-minute help'  },
  { icon: Code2,     label: 'Live Debugging',     desc: 'Real-time call to fix errors in your project'    },
  { icon: Lightbulb, label: 'Custom Projects',    desc: "Share your syllabus — we'll discuss feasibility" },
]

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
      <div className="hero-bg pt-20 pb-16 px-5">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
            We're Here to Help
          </h1>
          <p className="text-white/65 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            Stuck on setup, need viva prep, or want a custom project? Reach out — we respond within a few hours.
          </p>
        </div>
      </div>

      {/* Main split layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6 pb-16">
        <div className="grid lg:grid-cols-[1fr_420px] gap-6 items-start">

          {/* LEFT — What we help with + info */}
          <div className="space-y-5">

            {/* What we help with */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7">
              <h2 className="text-base font-extrabold text-brand-navy mb-1">What We Help With</h2>
              <p className="text-slate-400 text-xs mb-5">Pick any channel on the right and mention what you need.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {HELP_ITEMS.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={16} className="text-brand-orange" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{label}</p>
                      <p className="text-slate-400 text-xs leading-relaxed mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info tiles */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-navy/8 flex items-center justify-center flex-shrink-0">
                  <Clock size={16} className="text-brand-navy" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Support Hours</p>
                  <p className="text-slate-500 text-sm mt-0.5">Mon – Sat · 9 AM – 9 PM IST</p>
                  <p className="text-slate-400 text-xs mt-1">Emergency viva help on request</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-navy/8 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-brand-navy" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Location</p>
                  <p className="text-slate-500 text-sm mt-0.5">Hyderabad, Telangana, India</p>
                  <p className="text-slate-400 text-xs mt-1">Remote support across India</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT — Contact cards */}
          <div className="space-y-4">

            {/* Email */}
            <a
              href={`mailto:${EMAIL}`}
              className="group block bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-brand-orange to-amber-400" />
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={22} className="text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-brand-navy text-base leading-tight">Email</h3>
                    <p className="text-slate-400 text-xs">Detailed queries & collaboration</p>
                  </div>
                </div>
                <p className="font-mono text-sm text-slate-600 bg-slate-50 rounded-xl px-4 py-2.5 break-all">{EMAIL}</p>
                <div className="flex items-center gap-2 text-brand-orange font-semibold text-sm group-hover:gap-3 transition-all">
                  <Send size={13} /> Send an Email
                </div>
              </div>
            </a>

            {/* Phone */}
            <a
              href={TEL}
              className="group block bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-sky-400 to-cyan-400" />
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={22} className="text-sky-500" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-brand-navy text-base leading-tight">Phone / On-Call</h3>
                    <p className="text-slate-400 text-xs">Live debugging & viva support</p>
                  </div>
                </div>
                <p className="font-mono text-sm text-slate-600 bg-slate-50 rounded-xl px-4 py-2.5">{PHONE}</p>
                <div className="flex items-center gap-2 text-sky-500 font-semibold text-sm group-hover:gap-3 transition-all">
                  <Phone size={13} /> Call Now
                </div>
              </div>
            </a>

            {/* Promise card */}
            <div className="bg-brand-navy rounded-3xl p-6 text-white">
              <p className="font-extrabold text-base mb-1">Our Promise</p>
              <p className="text-white/60 text-sm leading-relaxed">
                We respond to every message. If you're stuck the night before your viva, reach out — we'll make time.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
