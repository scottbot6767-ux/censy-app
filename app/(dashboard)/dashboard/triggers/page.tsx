'use client'

import { useState } from 'react'
import { mockSurveys } from '@/lib/mock-data'
import { Badge } from '@/components/ui/badge'
import { Plus, Zap, X } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Trigger {
  id: string; name: string; survey_id: string; trigger_type: string
  trigger_config: Record<string, string>; delay_minutes: number; is_active: boolean; created_at: string; last_fired?: string
}

const STAGES = ['prospecting', 'qualification', 'demo', 'proposal', 'negotiation', 'closed_won', 'closed_lost']
const STAGE_LABELS: Record<string, string> = {
  prospecting: 'Prospecting', qualification: 'Qualification', demo: 'Demo',
  proposal: 'Proposal', negotiation: 'Negotiation', closed_won: 'Closed Won', closed_lost: 'Closed Lost', any: 'Any Stage'
}

const defaultTriggers: Trigger[] = [
  { id: 't1', name: 'Closed Lost — Send Lost Analysis', survey_id: 's1', trigger_type: 'stage_change', trigger_config: { from_stage: 'any', to_stage: 'closed_lost' }, delay_minutes: 0, is_active: false, created_at: '2026-01-01T10:00:00Z', last_fired: '2026-02-05T10:00:00Z' },
  { id: 't2', name: 'Closed Won — Send Win Analysis', survey_id: 's2', trigger_type: 'stage_change', trigger_config: { from_stage: 'any', to_stage: 'closed_won' }, delay_minutes: 60, is_active: false, created_at: '2026-01-01T10:00:00Z', last_fired: '2026-02-01T10:00:00Z' },
]

const TRIGGER_TYPE_LABELS: Record<string, string> = {
  stage_change: 'Stage Change', field_update: 'Field Update', manual: 'Manual', webhook: 'Webhook'
}

export default function TriggersPage() {
  const [triggers, setTriggers] = useState<Trigger[]>(defaultTriggers)
  const [showModal, setShowModal] = useState(false)
  const [newTrigger, setNewTrigger] = useState({ name: '', survey_id: '', trigger_type: 'stage_change', from_stage: 'any', to_stage: 'closed_lost', delay_minutes: 0 })

  const toggleActive = (id: string) => {
    setTriggers(prev => prev.map(t => t.id === id ? { ...t, is_active: !t.is_active } : t))
  }

  const createTrigger = () => {
    setTriggers(prev => [...prev, {
      id: Math.random().toString(36).slice(2),
      name: newTrigger.name || `${TRIGGER_TYPE_LABELS[newTrigger.trigger_type]} Trigger`,
      survey_id: newTrigger.survey_id,
      trigger_type: newTrigger.trigger_type,
      trigger_config: { from_stage: newTrigger.from_stage, to_stage: newTrigger.to_stage },
      delay_minutes: newTrigger.delay_minutes,
      is_active: false,
      created_at: new Date().toISOString(),
    }])
    setShowModal(false)
    setNewTrigger({ name: '', survey_id: '', trigger_type: 'stage_change', from_stage: 'any', to_stage: 'closed_lost', delay_minutes: 0 })
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">Triggers</h1>
          <p className="text-sm text-slate-500">Automatically send surveys when deals change</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-3 py-2 text-sm text-white bg-[#1e2a4a] rounded-md hover:bg-[#2a3a5e] transition-colors">
          <Plus size={13} /> Create Trigger
        </button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Trigger</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Survey</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Delay</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Fired</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {triggers.map(trigger => {
              const survey = mockSurveys.find(s => s.id === trigger.survey_id)
              return (
                <tr key={trigger.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-900">{trigger.name}</p>
                    {trigger.trigger_type === 'stage_change' && (
                      <p className="text-xs text-slate-400 mt-0.5">
                        {STAGE_LABELS[trigger.trigger_config.from_stage] || trigger.trigger_config.from_stage}
                        {' '}&rarr;{' '}
                        {STAGE_LABELS[trigger.trigger_config.to_stage] || trigger.trigger_config.to_stage}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className="bg-indigo-50 text-indigo-700">
                      {TRIGGER_TYPE_LABELS[trigger.trigger_type]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{survey?.name || '—'}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {trigger.delay_minutes === 0 ? 'Immediate' : trigger.delay_minutes >= 60 ? `${Math.round(trigger.delay_minutes/60)}h` : `${trigger.delay_minutes}m`}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">{trigger.last_fired ? formatDate(trigger.last_fired) : '—'}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActive(trigger.id)} className={`w-10 h-5 rounded-full transition-colors relative ${trigger.is_active ? 'bg-teal-500' : 'bg-slate-200'}`}>
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${trigger.is_active ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {triggers.length === 0 && (
          <div className="py-16 text-center">
            <Zap size={28} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-400 text-sm">No triggers yet. Create one to start automating survey sends.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h2 className="text-base font-semibold text-slate-900">Create Trigger</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Name</label>
                <input value={newTrigger.name} onChange={e => setNewTrigger(p => ({...p, name: e.target.value}))} placeholder="e.g. Closed Lost Survey" className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-indigo-300" />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Trigger Type</label>
                <select value={newTrigger.trigger_type} onChange={e => setNewTrigger(p => ({...p, trigger_type: e.target.value}))} className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none">
                  <option value="stage_change">Stage Change</option>
                  <option value="field_update">Field Update</option>
                  <option value="manual">Manual</option>
                  <option value="webhook">Webhook</option>
                </select>
              </div>
              {newTrigger.trigger_type === 'stage_change' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">From Stage</label>
                    <select value={newTrigger.from_stage} onChange={e => setNewTrigger(p => ({...p, from_stage: e.target.value}))} className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none">
                      <option value="any">Any Stage</option>
                      {STAGES.map(s => <option key={s} value={s}>{STAGE_LABELS[s]}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">To Stage</label>
                    <select value={newTrigger.to_stage} onChange={e => setNewTrigger(p => ({...p, to_stage: e.target.value}))} className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none">
                      {STAGES.map(s => <option key={s} value={s}>{STAGE_LABELS[s]}</option>)}
                    </select>
                  </div>
                </div>
              )}
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Survey to Send</label>
                <select value={newTrigger.survey_id} onChange={e => setNewTrigger(p => ({...p, survey_id: e.target.value}))} className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none">
                  <option value="">Select a survey...</option>
                  {mockSurveys.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Delay (minutes, 0 = immediate)</label>
                <input type="number" min={0} value={newTrigger.delay_minutes} onChange={e => setNewTrigger(p => ({...p, delay_minutes: Number(e.target.value)}))} className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-indigo-300" />
              </div>
            </div>
            <div className="flex justify-end gap-2 px-5 pb-5">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50">Cancel</button>
              <button onClick={createTrigger} className="px-4 py-2 text-sm text-white bg-[#1e2a4a] rounded-md hover:bg-[#2a3a5e]">Create Trigger</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
