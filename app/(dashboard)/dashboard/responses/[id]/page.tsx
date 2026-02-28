'use client'
import { mockResponses, mockSurveys, mockDeals } from '@/lib/mock-data'
import { formatDate, getStatusColor } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Clock, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const MOCK_ANSWERS = [
  { question: 'What was the primary reason you chose not to move forward with us?', type: 'single_choice', answer: 'Pricing', options: ['Pricing', 'Product Fit', 'Competitor', 'Timing / Budget', 'Internal Decision', 'Other'] },
  { question: 'Which competitor did you choose, if any?', type: 'open_text', answer: 'We went with Gong — they had a stronger enterprise offering.' },
  { question: 'How would you rate your overall sales experience with us?', type: 'rating', answer: 4 },
  { question: 'Any other insights you can share with our team?', type: 'open_text', answer: 'The sales team was great, responsiveness was excellent. Pricing was just 30% above our budget at this stage.' },
]

export default function ResponseDetailPage({ params }: { params: { id: string } }) {
  const response = mockResponses.find(r => r.id === params.id)
  if (!response) return notFound()

  const survey = mockSurveys.find(s => s.id === response.survey_id)
  const deal = mockDeals.find(d => d.id === response.deal_id)
  const duration = response.completed_at && response.started_at
    ? Math.round((new Date(response.completed_at).getTime() - new Date(response.started_at).getTime()) / 60000)
    : null

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/dashboard/responses" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft size={14} /> Responses
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-sm text-slate-900 font-medium">{response.respondent_name}</span>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          {/* Answers */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-5">Responses</h2>
            <div className="space-y-6">
              {(response.status === 'completed' ? MOCK_ANSWERS : []).map((a, i) => (
                <div key={i} className="pb-5 border-b border-slate-100 last:border-0 last:pb-0">
                  <p className="text-xs text-slate-400 mb-1">Q{i + 1}</p>
                  <p className="text-sm font-medium text-slate-800 mb-3">{a.question}</p>

                  {a.type === 'rating' && (
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map(n => (
                        <div key={n} className={`w-9 h-9 rounded-md flex items-center justify-center text-sm font-semibold border ${n <= (a.answer as number) ? 'bg-[#1e2a4a] text-white border-[#1e2a4a]' : 'border-slate-200 text-slate-300'}`}>{n}</div>
                      ))}
                    </div>
                  )}

                  {a.type === 'single_choice' && (
                    <div className="flex flex-wrap gap-2">
                      {(a.options || []).map(opt => (
                        <span key={opt} className={`px-3 py-1.5 rounded-full text-xs font-medium border ${opt === a.answer ? 'bg-[#1e2a4a] text-white border-[#1e2a4a]' : 'border-slate-200 text-slate-400'}`}>{opt}</span>
                      ))}
                    </div>
                  )}

                  {a.type === 'open_text' && (
                    <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3 italic">"{a.answer}"</p>
                  )}
                </div>
              ))}

              {response.status !== 'completed' && (
                <div className="py-8 text-center text-slate-400 text-sm">
                  {response.status === 'pending' ? 'Survey not yet started' : 'Survey in progress — not yet completed'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-3">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Details</h3>
            {[
              { label: 'Respondent', value: response.respondent_name || '—' },
              { label: 'Email', value: response.respondent_email || '—' },
              { label: 'Survey', value: survey?.name || '—' },
              { label: 'Status', value: null },
              { label: 'Sent', value: formatDate(response.sent_at) },
              { label: 'Completed', value: response.completed_at ? formatDate(response.completed_at) : '—' },
              { label: 'Time to complete', value: duration ? `${duration} min` : '—' },
            ].map(item => (
              <div key={item.label}>
                <p className="text-xs text-slate-400">{item.label}</p>
                {item.value === null
                  ? <Badge className={getStatusColor(response.status)}>{response.status}</Badge>
                  : <p className="text-sm text-slate-700 font-medium">{item.value}</p>
                }
              </div>
            ))}
          </div>

          {deal && (
            <div className="bg-white rounded-lg border border-slate-200 p-5">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Linked Deal</h3>
              <Link href={`/dashboard/deals/${deal.id}`} className="flex items-center justify-between group">
                <div>
                  <p className="text-sm font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">{deal.deal_name}</p>
                  <p className="text-xs text-slate-400">{deal.contact_name}</p>
                </div>
                <ExternalLink size={13} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
