'use client'

import { mockSurveys, mockResponses } from '@/lib/mock-data'
import { formatDate, getStatusColor } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Plus, Copy, Archive, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

const TYPE_COLORS: Record<string, string> = {
  win: 'bg-teal-50 text-teal-700',
  loss: 'bg-red-50 text-red-700',
  product_feedback: 'bg-indigo-50 text-indigo-700',
  nps: 'bg-amber-50 text-amber-700',
  custom: 'bg-slate-100 text-slate-600',
}
const TYPE_LABELS: Record<string, string> = {
  win: 'Win', loss: 'Loss', product_feedback: 'Product', nps: 'NPS', custom: 'Custom'
}

export default function SurveysPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">Surveys</h1>
          <p className="text-sm text-slate-500">{mockSurveys.length} surveys</p>
        </div>
        <Link href="/dashboard/surveys/new" className="flex items-center gap-1.5 px-3 py-2 text-sm text-white bg-[#1e2a4a] rounded-md hover:bg-[#2a3a5e] transition-colors">
          <Plus size={13} /> New Survey
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Survey</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Responses</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Completion</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Created</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {mockSurveys.map(survey => {
              const responses = mockResponses.filter(r => r.survey_id === survey.id)
              const completed = responses.filter(r => r.status === 'completed').length
              const rate = responses.length > 0 ? Math.round((completed / responses.length) * 100) : 0
              return (
                <tr key={survey.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/surveys/${survey.id}`} className="font-medium text-slate-900 text-sm hover:text-indigo-600">{survey.name}</Link>
                    {survey.description && <p className="text-xs text-slate-400 mt-0.5 truncate max-w-48">{survey.description}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={TYPE_COLORS[survey.type]}>{TYPE_LABELS[survey.type]}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={getStatusColor(survey.status)}>{survey.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-900">{responses.length}<span className="text-slate-400"> sent</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full">
                        <div className="h-1.5 bg-teal-500 rounded-full" style={{ width: `${rate}%` }} />
                      </div>
                      <span className="text-xs text-slate-600">{rate}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">{formatDate(survey.created_at)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1 text-slate-400 hover:text-slate-600 rounded"><Copy size={13} /></button>
                      <button className="p-1 text-slate-400 hover:text-slate-600 rounded"><Archive size={13} /></button>
                      <button className="p-1 text-slate-400 hover:text-slate-600 rounded"><MoreHorizontal size={13} /></button>
                    </div>
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
