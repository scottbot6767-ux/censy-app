'use client'
import { mockSurveys, mockResponses } from '@/lib/mock-data'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getStatusColor } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

const responseRateOverTime = [
  { month: 'Sep', rate: 58 }, { month: 'Oct', rate: 62 }, { month: 'Nov', rate: 55 },
  { month: 'Dec', rate: 71 }, { month: 'Jan', rate: 74 }, { month: 'Feb', rate: 68 },
]

export default function SurveyAnalyticsPage() {
  const surveyStats = mockSurveys.map(s => {
    const responses = mockResponses.filter(r => r.survey_id === s.id)
    const completed = responses.filter(r => r.status === 'completed')
    const rate = responses.length > 0 ? Math.round((completed.length / responses.length) * 100) : 0
    const avgTime = completed.filter(r => r.completed_at && r.started_at)
      .map(r => Math.round((new Date(r.completed_at!).getTime() - new Date(r.started_at!).getTime()) / 60000))
    const avgMinutes = avgTime.length > 0 ? Math.round(avgTime.reduce((a, b) => a + b, 0) / avgTime.length) : 0
    return { ...s, sent: responses.length, completed: completed.length, rate, avgMinutes }
  })

  const chartData = surveyStats.map(s => ({ name: s.name.replace(' Analysis', '').replace(' Survey', ''), rate: s.rate }))

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Survey Performance</h1>
        <p className="text-sm text-slate-500">Response rates and completion metrics</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <p className="text-sm font-medium text-slate-900 mb-4">Response Rate Over Time</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={responseRateOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={v => `${v}%`} />
              <Tooltip formatter={(v) => [`${v}%`, 'Response Rate']} contentStyle={{ fontSize: 12, border: '1px solid #e2e8f0', borderRadius: 6 }} />
              <Line type="monotone" dataKey="rate" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <p className="text-sm font-medium text-slate-900 mb-4">Response Rate by Survey</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={80} />
              <Tooltip formatter={(v) => [`${v}%`, 'Rate']} contentStyle={{ fontSize: 12, border: '1px solid #e2e8f0', borderRadius: 6 }} />
              <Bar dataKey="rate" fill="#14b8a6" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <p className="text-sm font-medium text-slate-900">Survey Breakdown</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {['Survey', 'Status', 'Sent', 'Completed', 'Response Rate', 'Avg Time'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {surveyStats.map(s => (
              <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-900">{s.name}</td>
                <td className="px-4 py-3"><Badge className={getStatusColor(s.status)}>{s.status}</Badge></td>
                <td className="px-4 py-3 text-sm text-slate-600">{s.sent}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{s.completed}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-slate-100 rounded-full">
                      <div className="h-1.5 bg-teal-500 rounded-full" style={{ width: `${s.rate}%` }} />
                    </div>
                    <span className="text-xs text-slate-600">{s.rate}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-500">{s.avgMinutes > 0 ? `${s.avgMinutes}m` : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
