'use client'

import { useState } from 'react'
import { mockDeals, mockTeamMembers } from '@/lib/mock-data'
import { formatCurrency, formatDate, getStageColor } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Plus, Download, Search, SlidersHorizontal, ChevronUp, ChevronDown } from 'lucide-react'
import Link from 'next/link'

const STAGES = ['prospecting', 'qualification', 'demo', 'proposal', 'negotiation', 'closed_won', 'closed_lost']
const STAGE_LABELS: Record<string, string> = {
  prospecting: 'Prospecting', qualification: 'Qualification', demo: 'Demo',
  proposal: 'Proposal', negotiation: 'Negotiation', closed_won: 'Closed Won', closed_lost: 'Closed Lost'
}

export default function DealsPage() {
  const [view, setView] = useState<'table' | 'kanban'>('table')
  const [search, setSearch] = useState('')
  const [stageFilter, setStageFilter] = useState('')
  const [sortKey, setSortKey] = useState<string>('created_at')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const filtered = mockDeals
    .filter(d => {
      if (search && !d.deal_name.toLowerCase().includes(search.toLowerCase()) && !d.contact_name?.toLowerCase().includes(search.toLowerCase())) return false
      if (stageFilter && d.stage !== stageFilter) return false
      return true
    })
    .sort((a, b) => {
      const av = (a as unknown as Record<string, unknown>)[sortKey] ?? ''
      const bv = (b as unknown as Record<string, unknown>)[sortKey] ?? ''
      return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av))
    })

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const SortIcon = ({ col }: { col: string }) => (
    <span className="ml-1">
      {sortKey === col ? (sortDir === 'asc' ? <ChevronUp size={11} className="inline" /> : <ChevronDown size={11} className="inline" />) : <ChevronDown size={11} className="inline opacity-30" />}
    </span>
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">Deals</h1>
          <p className="text-sm text-slate-500">{mockDeals.length} deals in pipeline</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
            <Download size={13} /> Export CSV
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-white bg-[#1e2a4a] rounded-md hover:bg-[#2a3a5e] transition-colors">
            <Plus size={13} /> Add Deal
          </button>
        </div>
      </div>

      {/* View Toggle + Filters */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex rounded-md border border-slate-200 overflow-hidden text-sm">
          <button onClick={() => setView('table')} className={`px-3 py-1.5 ${view === 'table' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>Table</button>
          <button onClick={() => setView('kanban')} className={`px-3 py-1.5 ${view === 'kanban' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>Kanban</button>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm flex-1 max-w-64">
          <Search size={13} className="text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search deals..." className="outline-none flex-1 text-slate-700 placeholder:text-slate-400 text-sm" />
        </div>

        <select value={stageFilter} onChange={e => setStageFilter(e.target.value)} className="px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm text-slate-600 outline-none cursor-pointer">
          <option value="">All Stages</option>
          {STAGES.map(s => <option key={s} value={s}>{STAGE_LABELS[s]}</option>)}
        </select>

        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 border border-slate-200 rounded-md bg-white hover:bg-slate-50">
          <SlidersHorizontal size={13} /> Filters
        </button>
      </div>

      {view === 'table' ? (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {[
                  { label: 'Deal', key: 'deal_name' },
                  { label: 'Contact', key: 'contact_name' },
                  { label: 'Stage', key: 'stage' },
                  { label: 'Value', key: 'value' },
                  { label: 'Competitor', key: 'competitor' },
                  { label: 'Owner', key: 'owner_id' },
                  { label: 'Created', key: 'created_at' },
                ].map(col => (
                  <th key={col.key} onClick={() => handleSort(col.key)} className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 select-none">
                    {col.label}<SortIcon col={col.key} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(deal => {
                const owner = mockTeamMembers.find(m => m.id === deal.owner_id)
                return (
                  <tr key={deal.id} className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/dashboard/deals/${deal.id}`} className="font-medium text-slate-900 text-sm hover:text-indigo-600">{deal.deal_name}</Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{deal.contact_name || '—'}</td>
                    <td className="px-4 py-3">
                      <Badge className={getStageColor(deal.stage)}>{STAGE_LABELS[deal.stage]}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-900 font-medium">{deal.value ? formatCurrency(deal.value) : '—'}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{deal.competitor || '—'}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{owner?.full_name || '—'}</td>
                    <td className="px-4 py-3 text-sm text-slate-400">{formatDate(deal.created_at)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-slate-400 text-sm">No deals match your filters</div>
          )}
        </div>
      ) : (
        // Kanban View
        <div className="flex gap-3 overflow-x-auto pb-4">
          {STAGES.map(stage => {
            const stageDeals = filtered.filter(d => d.stage === stage)
            return (
              <div key={stage} className="w-56 shrink-0">
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{STAGE_LABELS[stage]}</span>
                  <span className="text-xs text-slate-400 bg-slate-100 rounded-full px-2 py-0.5">{stageDeals.length}</span>
                </div>
                <div className="space-y-2">
                  {stageDeals.map(deal => (
                    <Link key={deal.id} href={`/dashboard/deals/${deal.id}`} className="block bg-white rounded-lg border border-slate-200 p-3 hover:shadow-md hover:border-slate-300 transition-all">
                      <p className="font-medium text-slate-900 text-sm mb-1">{deal.deal_name}</p>
                      <p className="text-xs text-slate-500 mb-2">{deal.contact_name}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-700">{deal.value ? formatCurrency(deal.value) : '—'}</span>
                        {deal.competitor && <span className="text-xs text-slate-400">vs {deal.competitor}</span>}
                      </div>
                    </Link>
                  ))}
                  {stageDeals.length === 0 && <div className="h-16 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-xs text-slate-400">Empty</div>}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
