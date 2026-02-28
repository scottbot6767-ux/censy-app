'use client'

import { mockDeals, mockResponses, mockSurveys } from '@/lib/mock-data'
import { formatCurrency, formatDate, getStageColor, getStatusColor } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Send, Edit, Clock, Mail, BarChart2 } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const STAGE_LABELS: Record<string, string> = {
  prospecting: 'Prospecting', qualification: 'Qualification', demo: 'Demo',
  proposal: 'Proposal', negotiation: 'Negotiation', closed_won: 'Closed Won', closed_lost: 'Closed Lost'
}

export default function DealDetailPage({ params }: { params: { id: string } }) {
  const deal = mockDeals.find(d => d.id === params.id)
  if (!deal) return notFound()

  const dealResponses = mockResponses.filter(r => r.deal_id === deal.id)

  const timeline = [
    { type: 'created', label: 'Deal created', date: deal.created_at, icon: BarChart2 },
    ...dealResponses.map(r => ({ type: 'survey', label: `Survey sent to ${r.respondent_email}`, date: r.sent_at, icon: Send })),
    ...dealResponses.filter(r => r.completed_at).map(r => ({ type: 'completed', label: `Survey completed by ${r.respondent_name}`, date: r.completed_at!, icon: Mail })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/dashboard/deals" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft size={14} /> Deals
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-sm text-slate-900 font-medium">{deal.deal_name}</span>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left — Deal Info */}
        <div className="col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-xl font-semibold text-slate-900 mb-1">{deal.deal_name}</h1>
                <p className="text-sm text-slate-500">{deal.contact_name} — <a href={`mailto:${deal.contact_email}`} className="text-indigo-600 hover:underline">{deal.contact_email}</a></p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStageColor(deal.stage)}>{STAGE_LABELS[deal.stage]}</Badge>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50">
                  <Edit size={12} /> Edit
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-[#1e2a4a] rounded-md hover:bg-[#2a3a5e]">
                  <Send size={12} /> Send Survey
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-slate-100">
              {[
                { label: 'Deal Value', value: deal.value ? formatCurrency(deal.value) : '—' },
                { label: 'Source', value: deal.source || '—' },
                { label: 'Competitor', value: deal.competitor || '—' },
                { label: 'Closed', value: deal.closed_at ? formatDate(deal.closed_at) : '—' },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-xs text-slate-500 mb-0.5">{item.label}</p>
                  <p className="text-sm font-medium text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Survey Responses */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Survey Responses ({dealResponses.length})</h2>
            {dealResponses.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-sm">No surveys sent for this deal yet</div>
            ) : (
              <div className="space-y-3">
                {dealResponses.map(r => {
                  const survey = mockSurveys.find(s => s.id === r.survey_id)
                  return (
                    <Link key={r.id} href={`/dashboard/responses/${r.id}`} className="flex items-center gap-4 p-3 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-semibold">
                        {r.respondent_name?.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{survey?.name}</p>
                        <p className="text-xs text-slate-500">Sent {formatDate(r.sent_at)}</p>
                      </div>
                      <Badge className={getStatusColor(r.status)}>{r.status}</Badge>
                      {r.completed_at && (
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock size={11} />
                          {Math.round((new Date(r.completed_at).getTime() - new Date(r.started_at!).getTime()) / 60000)}m
                        </div>
                      )}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right — Timeline */}
        <div>
          <div className="bg-white rounded-lg border border-slate-200 p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Activity Timeline</h2>
            <div className="space-y-3">
              {timeline.map((event, i) => {
                const Icon = event.icon
                return (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                        <Icon size={11} className="text-slate-500" />
                      </div>
                      {i < timeline.length - 1 && <div className="w-px flex-1 bg-slate-100 mt-1" />}
                    </div>
                    <div className="pb-3">
                      <p className="text-xs font-medium text-slate-700">{event.label}</p>
                      <p className="text-xs text-slate-400">{formatDate(event.date)}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
