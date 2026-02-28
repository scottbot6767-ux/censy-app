'use client'
import { useState } from 'react'
import { Save, Eye, EyeOff, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

const MERGE_TAGS = [
  { tag: '{{first_name}}', label: 'First Name' },
  { tag: '{{last_name}}', label: 'Last Name' },
  { tag: '{{company}}', label: 'Company' },
  { tag: '{{deal_name}}', label: 'Deal Name' },
  { tag: '{{survey_link}}', label: 'Survey Link' },
  { tag: '{{sender_name}}', label: 'Sender Name' },
]

interface Reminder {
  id: string
  delay_days: number
  enabled: boolean
}

const defaultReminders: Reminder[] = [
  { id: 'r1', delay_days: 3, enabled: true },
  { id: 'r2', delay_days: 7, enabled: false },
]

const defaultTemplate = {
  from_name: 'Alex at Censy',
  reply_to: 'alex@yourcompany.com',
  subject: "Quick question about your experience with {{company}}",
  preheader: "We'd love your honest feedback — takes 3 minutes.",
  body: `Hi {{first_name}},

I wanted to reach out personally after our recent conversation about {{deal_name}}.

Whether things went well or not, your feedback genuinely helps us improve. We put together a short 3-minute survey — no fluff, just the questions that actually matter.

{{survey_link}}

Thanks for your time, and I hope we get the chance to work together down the road.

{{sender_name}}`,
}

function EmailPreview({ template }: { template: typeof defaultTemplate }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden text-sm">
      {/* Email header */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 space-y-1.5">
        <div className="flex gap-2">
          <span className="text-xs text-slate-400 w-14">From</span>
          <span className="text-xs text-slate-700">{template.from_name || '—'} &lt;{template.reply_to || '—'}&gt;</span>
        </div>
        <div className="flex gap-2">
          <span className="text-xs text-slate-400 w-14">Subject</span>
          <span className="text-xs text-slate-700 font-medium">{template.subject || '—'}</span>
        </div>
        {template.preheader && (
          <div className="flex gap-2">
            <span className="text-xs text-slate-400 w-14">Preview</span>
            <span className="text-xs text-slate-400 italic">{template.preheader}</span>
          </div>
        )}
      </div>

      {/* Email body */}
      <div className="p-6 max-w-lg mx-auto">
        <div className="mb-6 pb-4 border-b border-slate-100 flex items-center gap-2">
          <div className="w-6 h-6 bg-[#1e2a4a] rounded flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5eead4" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/></svg>
          </div>
          <span className="text-xs font-bold text-[#1e2a4a] tracking-wide">Censy</span>
        </div>

        <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap mb-6">
          {template.body
            .replace('{{first_name}}', 'Sarah')
            .replace('{{company}}', 'Acme Corp')
            .replace('{{deal_name}}', 'Acme Corp - Enterprise')
            .replace('{{sender_name}}', template.from_name || 'Alex')
            .replace('{{survey_link}}', '')
          }
        </div>

        {/* Fake CTA button where {{survey_link}} was */}
        <div className="text-center my-4">
          <div className="inline-block px-6 py-3 bg-[#1e2a4a] text-white text-sm font-semibold rounded-md">
            Share Your Feedback
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 text-center space-y-1">
          <p>You're receiving this because you recently interacted with {template.from_name || 'our team'}.</p>
          <p><span className="underline cursor-pointer">Unsubscribe</span> &bull; <span className="underline cursor-pointer">Privacy Policy</span></p>
        </div>
      </div>
    </div>
  )
}

export default function EmailPage() {
  const [tab, setTab] = useState<'template' | 'cadence'>('template')
  const [template, setTemplate] = useState(defaultTemplate)
  const [reminders, setReminders] = useState<Reminder[]>(defaultReminders)
  const [initialDelay, setInitialDelay] = useState(0)
  const [maxAttempts, setMaxAttempts] = useState(2)
  const [stopOnResponse, setStopOnResponse] = useState(true)
  const [preview, setPreview] = useState(false)
  const [saved, setSaved] = useState(false)
  const [tagOpen, setTagOpen] = useState(false)
  const [activeField, setActiveField] = useState<'subject' | 'body' | null>(null)

  const set = (k: keyof typeof defaultTemplate, v: string) => setTemplate(t => ({ ...t, [k]: v }))

  const insertTag = (tag: string) => {
    if (activeField === 'subject') set('subject', template.subject + tag)
    else if (activeField === 'body') set('body', template.body + tag)
    setTagOpen(false)
  }

  const addReminder = () => {
    setReminders(r => [...r, { id: Math.random().toString(36).slice(2), delay_days: (r[r.length - 1]?.delay_days || 3) + 4, enabled: true }])
  }

  const save = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">Email</h1>
          <p className="text-sm text-slate-500">Customize how survey invitations look and when they're sent</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPreview(p => !p)} className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50">
            {preview ? <EyeOff size={13} /> : <Eye size={13} />}
            {preview ? 'Hide Preview' : 'Preview'}
          </button>
          <button onClick={save} className="flex items-center gap-1.5 px-4 py-2 text-sm text-white bg-[#1e2a4a] rounded-md hover:bg-[#2a3a5e]">
            <Save size={13} />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left: editor */}
        <div className="flex-1 min-w-0">
          {/* Tabs */}
          <div className="flex gap-1 mb-5 border-b border-slate-200">
            {(['template', 'cadence'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} className={`pb-2.5 px-1 mr-4 text-sm capitalize border-b-2 -mb-px transition-colors ${tab === t ? 'border-[#1e2a4a] text-[#1e2a4a] font-medium' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                {t === 'template' ? 'Email Template' : 'Send Cadence'}
              </button>
            ))}
          </div>

          {tab === 'template' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">From Name</label>
                  <input value={template.from_name} onChange={e => set('from_name', e.target.value)} className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100" placeholder="Alex at Acme" />
                  <p className="text-xs text-slate-400 mt-1">Shown as the sender's display name</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Reply-To Address</label>
                  <input value={template.reply_to} onChange={e => set('reply_to', e.target.value)} type="email" className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100" placeholder="you@company.com" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-600">Subject Line</label>
                  <button onClick={() => { setTagOpen(o => !o); setActiveField('subject') }} className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700">
                    Insert tag {tagOpen && activeField === 'subject' ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                  </button>
                </div>
                <input value={template.subject} onChange={e => set('subject', e.target.value)} onFocus={() => setActiveField('subject')} className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100" placeholder="Quick question about {{company}}" />
                {tagOpen && activeField === 'subject' && (
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {MERGE_TAGS.map(m => (
                      <button key={m.tag} onClick={() => insertTag(m.tag)} className="px-2 py-1 text-xs bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 transition-colors font-mono">{m.tag}</button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Preview Text</label>
                <input value={template.preheader} onChange={e => set('preheader', e.target.value)} className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100" placeholder="Short text shown in inbox previews..." />
                <p className="text-xs text-slate-400 mt-1">Shown after the subject line in most email clients</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-600">Email Body</label>
                  <button onClick={() => { setTagOpen(o => !o); setActiveField('body') }} className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700">
                    Insert tag {tagOpen && activeField === 'body' ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                  </button>
                </div>
                <textarea value={template.body} onChange={e => set('body', e.target.value)} onFocus={() => setActiveField('body')} rows={10} className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100 font-mono resize-none" />
                {tagOpen && activeField === 'body' && (
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {MERGE_TAGS.map(m => (
                      <button key={m.tag} onClick={() => insertTag(m.tag)} className="px-2 py-1 text-xs bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 transition-colors font-mono">{m.tag}</button>
                    ))}
                  </div>
                )}
                <p className="text-xs text-slate-400 mt-1">Place <code className="bg-slate-100 px-1 rounded">{'{{survey_link}}'}</code> where you want the button to appear</p>
              </div>
            </div>
          )}

          {tab === 'cadence' && (
            <div className="space-y-6">
              {/* Initial send */}
              <div className="bg-white rounded-lg border border-slate-200 p-5">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">1</div>
                  <h3 className="text-sm font-semibold text-slate-900">Initial Email</h3>
                </div>
                <p className="text-xs text-slate-500 ml-9 mb-4">Sent when the trigger fires</p>
                <div className="ml-9 flex items-center gap-3">
                  <label className="text-xs text-slate-600">Send</label>
                  <input type="number" min={0} max={30} value={initialDelay} onChange={e => setInitialDelay(Number(e.target.value))} className="w-16 text-sm border border-slate-200 rounded-md px-2 py-1.5 text-center outline-none focus:border-indigo-300" />
                  <label className="text-xs text-slate-600">day(s) after trigger fires</label>
                </div>
                {initialDelay === 0 && <p className="text-xs text-teal-600 ml-9 mt-2">Sends immediately when trigger fires</p>}
              </div>

              {/* Reminders */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-900">Follow-Up Reminders</h3>
                  <button onClick={addReminder} className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700">
                    <Plus size={12} /> Add reminder
                  </button>
                </div>

                <div className="space-y-3">
                  {reminders.map((r, i) => (
                    <div key={r.id} className={`bg-white rounded-lg border p-5 transition-colors ${r.enabled ? 'border-slate-200' : 'border-slate-100 opacity-60'}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${r.enabled ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'}`}>{i + 2}</div>
                        <h4 className="text-sm font-medium text-slate-900">Reminder {i + 1}</h4>
                        <div className="ml-auto flex items-center gap-3">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <div onClick={() => setReminders(rs => rs.map(x => x.id === r.id ? { ...x, enabled: !x.enabled } : x))} className={`w-9 h-5 rounded-full transition-colors relative ${r.enabled ? 'bg-teal-500' : 'bg-slate-200'}`}>
                              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${r.enabled ? 'translate-x-4' : 'translate-x-0.5'}`} />
                            </div>
                            <span className="text-xs text-slate-500">{r.enabled ? 'On' : 'Off'}</span>
                          </label>
                          <button onClick={() => setReminders(rs => rs.filter(x => x.id !== r.id))} className="text-slate-300 hover:text-red-400 transition-colors">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 ml-9">
                        <label className="text-xs text-slate-600">Send</label>
                        <input type="number" min={1} max={90} value={r.delay_days} onChange={e => setReminders(rs => rs.map(x => x.id === r.id ? { ...x, delay_days: Number(e.target.value) } : x))} className="w-16 text-sm border border-slate-200 rounded-md px-2 py-1.5 text-center outline-none focus:border-indigo-300" />
                        <label className="text-xs text-slate-600">day(s) after initial email if no response</label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stop rules */}
              <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4">
                <h3 className="text-sm font-semibold text-slate-900">Stop Sending When</h3>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div onClick={() => setStopOnResponse(v => !v)} className={`w-9 h-5 rounded-full transition-colors relative shrink-0 ${stopOnResponse ? 'bg-teal-500' : 'bg-slate-200'}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${stopOnResponse ? 'translate-x-4' : 'translate-x-0.5'}`} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-700">Stop after respondent completes the survey</p>
                    <p className="text-xs text-slate-400">Recommended — prevents sending reminders after a response is received</p>
                  </div>
                </label>
                <div className="flex items-center gap-3 pt-1">
                  <label className="text-xs text-slate-600 shrink-0">Max attempts total</label>
                  <input type="number" min={1} max={10} value={maxAttempts} onChange={e => setMaxAttempts(Number(e.target.value))} className="w-16 text-sm border border-slate-200 rounded-md px-2 py-1.5 text-center outline-none focus:border-indigo-300" />
                  <p className="text-xs text-slate-400">including the initial email</p>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-600 mb-2">Cadence Summary</p>
                <ul className="space-y-1">
                  <li className="text-xs text-slate-500">
                    — Initial email sent {initialDelay === 0 ? 'immediately' : `${initialDelay} day(s) after trigger`}
                  </li>
                  {reminders.filter(r => r.enabled).map((r, i) => (
                    <li key={r.id} className="text-xs text-slate-500">
                      — Reminder {i + 1} sent {r.delay_days} day(s) later if no response
                    </li>
                  ))}
                  {stopOnResponse && <li className="text-xs text-slate-500">— Stops automatically after response received</li>}
                  <li className="text-xs text-slate-500">— Max {maxAttempts} total email(s) per respondent</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Right: preview */}
        {preview && (
          <div className="w-96 shrink-0">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Preview</p>
            <EmailPreview template={template} />
            <p className="text-xs text-slate-400 text-center mt-2">Rendered with example data</p>
          </div>
        )}
      </div>
    </div>
  )
}
