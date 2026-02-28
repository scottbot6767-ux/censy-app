import Link from 'next/link'

const features = [
  { title: 'Automated Triggers', desc: 'Surveys fire the moment a deal closes — won, lost, or stuck. Zero manual work.' },
  { title: 'Custom Survey Builder', desc: 'Build tailored questionnaires with 6 question types, branching logic, and branding.' },
  { title: 'Native Dashboards', desc: 'Win rate trends, loss reason breakdowns, and competitor analysis — all in one view.' },
  { title: 'Template Library', desc: '5 pre-built survey templates for win/loss, NPS, product feedback, and sales experience.' },
  { title: 'Team Collaboration', desc: 'Invite your entire revenue team. Everyone sees the same data in real time.' },
  { title: 'CRM-Ready Architecture', desc: 'Built to plug directly into Salesforce and HubSpot. Native integrations coming soon.' },
]

const problems = [
  { stat: '$20K+', label: 'Traditional win/loss programs cost $20K+ with consultants', fix: 'Censy costs a fraction — no consultants needed.' },
  { stat: 'SMB gap', label: 'Enterprise-only tools leave small and mid-market teams without insights', fix: 'Censy works for teams of 2 or 2,000.' },
  { stat: 'Disconnected', label: 'Feedback lives in spreadsheets, not where your team works', fix: 'Censy lives inside your CRM workflow.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#1e2a4a] rounded flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5eead4" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            </div>
            <span className="font-bold text-[#1e2a4a] text-sm tracking-wide">Censy</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Sign in</Link>
            <Link href="/signup" className="px-4 py-2 text-sm text-white bg-[#1e2a4a] rounded-md hover:bg-[#2a3a5e] transition-colors">Start Free Trial</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center bg-[#1e2a4a]">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 bg-teal-400/20 text-teal-300 text-xs font-semibold rounded-full mb-6 uppercase tracking-wider">Win/Loss Intelligence Platform</div>
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            Win/Loss Analysis<br />Without the $20K Price Tag
          </h1>
          <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto">
            Automated surveys, CRM-ready triggers, and data-dense dashboards that show you exactly why you win and why you lose — built for B2B sales teams.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/signup" className="px-6 py-3 bg-teal-400 text-[#1e2a4a] font-semibold text-sm rounded-md hover:bg-teal-300 transition-colors">
              Start 14-Day Free Trial
            </Link>
            <Link href="/login" className="px-6 py-3 bg-white/10 text-white text-sm rounded-md hover:bg-white/20 transition-colors border border-white/20">
              See a Demo
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-4">No credit card required. Full access during beta.</p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-slate-900 py-8 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { val: '3x', label: 'Faster than hiring consultants' },
            { val: '94%', label: 'Average survey response rate' },
            { val: '2 hrs', label: 'Average time to first insight' },
          ].map(s => (
            <div key={s.val}>
              <p className="text-2xl font-bold text-teal-400 mb-1">{s.val}</p>
              <p className="text-xs text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider text-center mb-3">The Problem</p>
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">Win/loss programs are broken for most teams</h2>
          <div className="grid grid-cols-3 gap-6">
            {problems.map(p => (
              <div key={p.stat} className="bg-white rounded-xl border border-slate-200 p-6">
                <p className="text-2xl font-bold text-red-500 mb-2">{p.stat}</p>
                <p className="text-sm text-slate-600 mb-4">{p.label}</p>
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-xs text-teal-600 font-medium">{p.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider text-center mb-3">How It Works</p>
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">From deal to insight in 3 steps</h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create Your Survey', desc: 'Build a win/loss survey in minutes using templates or the drag-and-drop builder. Set your branding and question flow.' },
              { step: '02', title: 'Set Your Triggers', desc: 'Define when surveys fire automatically — on stage change, field update, or webhook from your CRM.' },
              { step: '03', title: 'Get the Insights', desc: 'Responses flow into live dashboards showing win rates, loss reasons, NPS, and competitor intel — updated in real time.' },
            ].map(step => (
              <div key={step.step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-[#1e2a4a] text-white flex items-center justify-center text-sm font-bold mx-auto mb-4">{step.step}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider text-center mb-3">Features</p>
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">Everything your revenue team needs</h2>
          <div className="grid grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center mb-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="font-semibold text-slate-900 text-sm mb-2">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6">
        <div className="max-w-md mx-auto text-center">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">Pricing</p>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Simple, transparent pricing</h2>
          <div className="bg-[#1e2a4a] rounded-2xl p-8 text-left">
            <p className="text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">All-In Plan</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-bold text-white">$500</span>
              <span className="text-slate-300 mb-1">/month</span>
            </div>
            <p className="text-slate-400 text-sm mb-6">Unlimited everything. No per-seat pricing.</p>
            <ul className="space-y-2 mb-8">
              {['Unlimited surveys', 'Unlimited users', 'Unlimited responses', 'All analytics dashboards', 'API access + webhooks', 'Template library', 'Email support', 'CRM integrations (coming soon)'].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="block w-full py-3 bg-teal-400 text-[#1e2a4a] font-semibold text-sm text-center rounded-md hover:bg-teal-300 transition-colors">
              Start 14-Day Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-10 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#1e2a4a] rounded flex items-center justify-center">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#5eead4" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            </div>
            <span className="font-bold text-[#1e2a4a] text-sm">Censy</span>
          </div>
          <p className="text-xs text-slate-400">© 2026 Censy. All rights reserved.</p>
          <div className="flex gap-4">
            {['Privacy', 'Terms', 'Security', 'Status'].map(l => (
              <a key={l} href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
