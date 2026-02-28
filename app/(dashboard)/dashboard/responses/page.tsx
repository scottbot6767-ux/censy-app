'use client'

import { mockResponses, mockSurveys, mockDeals } from '@/lib/mock-data'
import { formatDate, getStatusColor } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Clock, Filter } from 'lucide-react'
import Link from 'next/link'

export default function ResponsesPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">Responses</h1>
          <p className="text-sm text-slate-500">{mockResponses.length} total responses</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50">
          <Filter size={13} /> Filter
        </button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Respondent</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Survey</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Deal</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Sent</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Completed</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody>
            {mockResponses.map(r => {
              const survey = mockSurveys.find(s => s.id === r.survey_id)
              const deal = mockDeals.find(d => d.id === r.deal_id)
              const duration = r.completed_at && r.started_at
                ? Math.round((new Date(r.completed_at).getTime() - new Date(r.started_at).getTime()) / 60000)
                : null

              return (
                <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/responses/${r.id}`} className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-semibold shrink-0">
                        {r.respondent_name?.charAt(0) || '?'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 hover:text-indigo-600">{r.respondent_name || 'Anonymous'}</p>
                        <p className="text-xs text-slate-400">{r.respondent_email}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{survey?.name || '—'}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{deal?.deal_name || '—'}</td>
                  <td className="px-4 py-3"><Badge className={getStatusColor(r.status)}>{r.status}</Badge></td>
                  <td className="px-4 py-3 text-sm text-slate-400">{formatDate(r.sent_at)}</td>
                  <td className="px-4 py-3 text-sm text-slate-400">{r.completed_at ? formatDate(r.completed_at) : '—'}</td>
                  <td className="px-4 py-3">
                    {duration !== null ? (
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock size={11} />{duration}m
                      </div>
                    ) : '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
