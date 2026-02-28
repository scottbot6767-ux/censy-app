'use client'
import { useState } from 'react'
import { Save } from 'lucide-react'

export default function SettingsPage() {
  const [orgName, setOrgName] = useState('Acme Corp')
  const [brandColor, setBrandColor] = useState('#1e2a4a')

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-lg font-semibold text-slate-900 mb-1">Organization Settings</h1>
      <p className="text-sm text-slate-500 mb-6">Manage your organization details and branding</p>

      <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-5">
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Organization Name</label>
          <input value={orgName} onChange={e => setOrgName(e.target.value)} className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-indigo-300" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Logo URL</label>
          <input type="url" placeholder="https://..." className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-indigo-300" />
          <p className="text-xs text-slate-400 mt-1">Used in survey emails and respondent pages</p>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Brand Color</label>
          <div className="flex items-center gap-3">
            <input type="color" value={brandColor} onChange={e => setBrandColor(e.target.value)} className="w-10 h-9 rounded border border-slate-200 cursor-pointer" />
            <input value={brandColor} onChange={e => setBrandColor(e.target.value)} className="text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-indigo-300 font-mono w-32" />
          </div>
        </div>
        <div className="pt-2">
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-[#1e2a4a] rounded-md hover:bg-[#2a3a5e]">
            <Save size={13} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
