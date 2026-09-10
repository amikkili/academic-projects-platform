import { MessageCircle, Mail, Phone, MapPin, Clock, Send } from 'lucide-react'

const WHATSAPP_NUMBER = '919866376367'
const WHATSAPP_LINK   = `https://wa.me/${WHATSAPP_NUMBER}`
const EMAIL           = 'anil.mikkili@gmail.com'

const contactCards = [
  {
    icon: MessageCircle,
    color: 'bg-green-500/10 text-green-400',
    border: 'border-green-500/20',
    title: 'WhatsApp Support',
    detail: '+91 98663 76367',
    sub: 'Fastest response — usually within 2 hours',
    href: WHATSAPP_LINK,
    cta: 'Chat on WhatsApp',
    ctaClass: 'bg-green-500 hover:bg-green-400 text-white',
  },
  {
    icon: Mail,
    color: 'bg-brand-orange/10 text-brand-orange',
    border: 'border-brand-orange/20',
    title: 'Email',
    detail: EMAIL,
    sub: 'For detailed queries, code reviews & collaboration',
    href: `mailto:${EMAIL}`,
    cta: 'Send Email',
    ctaClass: 'bg-brand-orange hover:bg-amber-500 text-white',
  },
  {
    icon: Phone,
    color: 'bg-sky-500/10 text-sky-400',
    border: 'border-sky-500/20',
    title: 'Phone / On-Call',
    detail: '+91 98663 76367',
    sub: 'Available for live debugging sessions & on-call help',
    href: `tel:+${WHATSAPP_NUMBER}`,
    cta: 'Call Now',
    ctaClass: 'bg-sky-500 hover:bg-sky-400 text-white',
  },
]

const faqs = [
  {
    q: 'How do I get my project set up?',
    a: 'Open the project page, go to the Setup Guide tab, and follow the step-by-step IDE instructions. Reach out on WhatsApp if you get stuck.',
  },
  {
    q: 'Can I get help during my viva?',
    a: 'Yes — on-call support is available. Message on WhatsApp in advance to schedule a time slot before your viva date.',
  },
  {
    q: 'Is source code included with every project?',
    a: 'Yes. Once you choose a project, the GitHub repo link and a .zip download appear in the Source Code tab.',
  },
  {
    q: 'Can I request a custom project?',
    a: "Absolutely. Share your college syllabus or project idea on WhatsApp and we'll discuss feasibility.",
  },
]

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
      <div className="hero-bg py-20 pt-28">
        <div className="w-full px-5 lg:px-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 text-sm font-medium mb-5">
            <MessageCircle size={14} />
            We typically respond within 2 hours
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-white/65 text-lg max-w-lg mx-auto">
            Stuck on setup? Need help before your viva? We're here — reach out through any channel below.
          </p>
        </div>
      </div>

      <div className="w-full px-5 lg:px-10 py-14">

        {/* Contact cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {contactCards.map(({ icon: Icon, color, border, title, detail, sub, href, cta, ctaClass }) => (
            <div key={title} className={`bg-white rounded-2xl border ${border} p-6 flex flex-col gap-4 shadow-sm`}>
              <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                <Icon size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
                <p className="text-slate-700 font-mono text-sm mt-0.5">{detail}</p>
                <p className="text-slate-400 text-xs mt-1">{sub}</p>
              </div>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${ctaClass}`}
              >
                <Send size={14} />
                {cta}
              </a>
            </div>
          ))}
        </div>

        {/* Info strip */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 mb-16 flex flex-col sm:flex-row gap-6 shadow-sm">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-9 h-9 rounded-lg bg-brand-navy/10 flex items-center justify-center flex-shrink-0">
              <Clock size={17} className="text-brand-navy" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-sm">Support Hours</p>
              <p className="text-slate-500 text-sm">Mon – Sat · 9 AM – 9 PM IST</p>
              <p className="text-slate-400 text-xs mt-0.5">Emergency viva help available on request</p>
            </div>
          </div>
          <div className="flex items-start gap-3 flex-1">
            <div className="w-9 h-9 rounded-lg bg-brand-navy/10 flex items-center justify-center flex-shrink-0">
              <MapPin size={17} className="text-brand-navy" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-sm">Location</p>
              <p className="text-slate-500 text-sm">Hyderabad, Telangana, India</p>
              <p className="text-slate-400 text-xs mt-0.5">Serving students across India · Remote support</p>
            </div>
          </div>
          <div className="flex items-start gap-3 flex-1">
            <div className="w-9 h-9 rounded-lg bg-brand-navy/10 flex items-center justify-center flex-shrink-0">
              <MessageCircle size={17} className="text-brand-navy" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-sm">WhatsApp Community</p>
              <p className="text-slate-500 text-sm">Join for project updates & tips</p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 text-xs font-medium hover:underline mt-0.5 inline-block"
              >
                wa.me/{WHATSAPP_NUMBER} →
              </a>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-800 mb-6 text-center">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
                <p className="font-semibold text-slate-800 text-sm mb-1.5">{q}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center bg-gradient-to-br from-brand-navy to-slate-800 rounded-2xl p-8 text-white">
            <h3 className="font-extrabold text-xl mb-2">Still have questions?</h3>
            <p className="text-white/60 text-sm mb-5">Drop a WhatsApp message — it's the quickest way to get help.</p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 rounded-xl font-semibold text-sm transition-all"
            >
              <MessageCircle size={16} />
              Message on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
