'use client'
import { useState } from 'react'
import { Plus, Trash2, Eye, EyeOff, Copy, X } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface ApiKey { id: string; name: string; prefix: string; created_at: string; last_used_at?: string; is_active: boolean }

const defaultKeys: ApiKey[] = [
  { id: 'k1', name: 'Production', prefix: 'cnsy_live_a8f2', created_at: '2026-01-10T10:00:00Z', last_used_at: '2026-02-27T14:00:00Z', is_active: true },
  { id: 'k2', name: 'Staging', prefix: 'cnsy_live_b3c9', created_at: '2026-02-01T10:00:00Z', is_active: true },
]

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>(defaultKeys)
  const [showModal, setShowModal] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [newKeyValue, setNewKeyValue] = useState<string | null>(null)

  const createKey = () => {
    const fullKey = `cnsy_live_${Math.random().toString(36).slice(2, 14)}`
    const key: ApiKey = {
      id: Math.random().toString(36).slice(2),
      name: newKeyName,
      prefix: fullKey.slice(0, 16),
      created_at: new Date().toISOString(),
      is_active: true,
    }
    setKeys(k => [...k, key])
    setNewKeyValue(fullKey)
    setNewKeyName('')
  }

  const revokeKey = (id: string) => {
    setKeys(k => k.filter(key => key.id !== id))
  }

  return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">API Keys</h1>
          <p className="text-sm text-slate-500">Use API keys to authenticate webhook requests</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-3 py-2 text-sm text-white bg-[#1e2a4a] rounded-md hover:bg-[#2a3a5e]">
          <Plus size={13} /> New Key
        </button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {['Name', 'Key', 'Created', 'Last Used', ''].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {keys.map(key => (
              <tr key={key.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-900">{key.name}</td>
                <td className="px-4 py-3"><code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">{key.prefix}••••••••</code></td>
                <td className="px-4 py-3 text-sm text-slate-400">{formatDate(key.created_at)}</td>
                <td className="px-4 py-3 text-sm text-slate-400">{key.last_used_at ? formatDate(key.last_used_at) : 'Never'}</td>
                <td className="px-4 py-3">
                  <button onClick={() => revokeKey(key.id)} className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 size={12} /> Revoke
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {keys.length === 0 && <div className="py-10 text-center text-slate-400 text-sm">No API keys yet</div>}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm">
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h2 className="text-base font-semibold text-slate-900">{newKeyValue ? 'Key Created' : 'New API Key'}</h2>
              <button onClick={() => { setShowModal(false); setNewKeyValue(null) }} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>
            <div className="p-5">
              {newKeyValue ? (
                <div>
                  <p className="text-sm text-slate-600 mb-3">Copy this key — you won't see it again.</p>
                  <div className="flex items-center gap-2 bg-slate-50 rounded-md border border-slate-200 px-3 py-2 mb-4">
                    <code className="text-xs text-slate-700 flex-1 break-all">{newKeyValue}</code>
                    <button onClick={() => navigator.clipboard.writeText(newKeyValue)} className="text-slate-400 hover:text-slate-600 shrink-0"><Copy size={13} /></button>
                  </div>
                  <button onClick={() => { setShowModal(false); setNewKeyValue(null) }} className="w-full py-2 text-sm text-white bg-[#1e2a4a] rounded-md hover:bg-[#2a3a5e]">Done</button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Key Name</label>
                    <input value={newKeyName} onChange={e => setNewKeyName(e.target.value)} placeholder="e.g. Production, Staging" className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-indigo-300" />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50">Cancel</button>
                    <button onClick={createKey} disabled={!newKeyName.trim()} className="px-4 py-2 text-sm text-white bg-[#1e2a4a] rounded-md hover:bg-[#2a3a5e] disabled:opacity-50">Create Key</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
