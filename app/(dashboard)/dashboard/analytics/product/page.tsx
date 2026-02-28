'use client'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const ratingOverTime = [
  { month: 'Sep', rating: 3.8 }, { month: 'Oct', rating: 4.1 }, { month: 'Nov', rating: 3.9 },
  { month: 'Dec', rating: 4.3 }, { month: 'Jan', rating: 4.2 }, { month: 'Feb', rating: 4.5 },
]
const npsBreakdown = [
  { month: 'Oct', promoters: 45, passives: 30, detractors: 25 },
  { month: 'Nov', promoters: 40, passives: 35, detractors: 25 },
  { month: 'Dec', promoters: 55, passives: 28, detractors: 17 },
  { month: 'Jan', promoters: 58, passives: 27, detractors: 15 },
  { month: 'Feb', promoters: 62, passives: 25, detractors: 13 },
]
const featureRequests = [
  { feature: 'Salesforce integration', count: 18 },
  { feature: 'Custom reporting', count: 14 },
  { feature: 'Mobile app', count: 11 },
  { feature: 'Bulk export', count: 9 },
  { feature: 'Slack notifications', count: 7 },
]

export default function ProductAnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Product Feedback</h1>
        <p className="text-sm text-slate-500">Last 6 months</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Avg Product Rating', value: '4.3 / 5', color: 'text-teal-600' },
          { label: 'NPS Score', value: '47', color: 'text-indigo-600' },
          { label: 'Feedback Responses', value: '38', color: 'text-slate-900' },
        ].map(m => (
          <div key={m.label} className="bg-white rounded-lg border border-slate-200 p-5">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">{m.label}</p>
            <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <p className="text-sm font-medium text-slate-900 mb-4">Product Rating Over Time</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={ratingOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 5]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, border: '1px solid #e2e8f0', borderRadius: 6 }} />
              <Line type="monotone" dataKey="rating" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <p className="text-sm font-medium text-slate-900 mb-4">NPS Distribution</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={npsBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, border: '1px solid #e2e8f0', borderRadius: 6 }} />
              <Bar dataKey="promoters" name="Promoters" stackId="a" fill="#14b8a6" />
              <Bar dataKey="passives" name="Passives" stackId="a" fill="#f59e0b" />
              <Bar dataKey="detractors" name="Detractors" stackId="a" fill="#f87171" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-5">
        <p className="text-sm font-medium text-slate-900 mb-4">Top Requested Features</p>
        <div className="space-y-3 max-w-lg">
          {featureRequests.map((f, i) => (
            <div key={f.feature} className="flex items-center gap-3">
              <span className="text-xs text-slate-400 w-4">{i + 1}</span>
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700 font-medium">{f.feature}</span>
                  <span className="text-slate-400">{f.count} mentions</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full">
                  <div className="h-1.5 bg-indigo-400 rounded-full" style={{ width: `${(f.count / featureRequests[0].count) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
