'use client'
import { useState } from 'react'
import { mockTeamMembers } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, X } from 'lucide-react'

const ROLE_COLORS: Record<string, string> = { owner: 'bg-indigo-50 text-indigo-700', admin: 'bg-amber-50 text-amber-700', member: 'bg-slate-100 text-slate-600' }

export default function TeamPage() {
  const [showInvite, setShowInvite] = useState(false)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('member')

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">Team</h1>
          <p className="text-sm text-slate-500">{mockTeamMembers.length} members</p>
        </div>
        <button onClick={() => setShowInvite(true)} className="flex items-center gap-1.5 px-3 py-2 text-sm text-white bg-[#1e2a4a] rounded-md hover:bg-[#2a3a5e]">
          <Plus size={13} /> Invite Member
        </button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Member</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Joined</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {mockTeamMembers.map(member => (
              <tr key={member.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-semibold">{member.full_name.charAt(0)}</div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{member.full_name}</p>
                      <p className="text-xs text-slate-400">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3"><Badge className={ROLE_COLORS[member.role]}>{member.role}</Badge></td>
                <td className="px-4 py-3 text-sm text-slate-400">{formatDate(member.created_at)}</td>
                <td className="px-4 py-3">
                  {member.role !== 'owner' && <button className="p-1 text-slate-300 hover:text-red-400 rounded"><Trash2 size={13} /></button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showInvite && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm">
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h2 className="text-base font-semibold text-slate-900">Invite Team Member</h2>
              <button onClick={() => setShowInvite(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="colleague@company.com" className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-indigo-300" />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Role</label>
                <select value={role} onChange={e => setRole(e.target.value)} className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none">
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 px-5 pb-5">
              <button onClick={() => setShowInvite(false)} className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50">Cancel</button>
              <button onClick={() => setShowInvite(false)} className="px-4 py-2 text-sm text-white bg-[#1e2a4a] rounded-md hover:bg-[#2a3a5e]">Send Invite</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
