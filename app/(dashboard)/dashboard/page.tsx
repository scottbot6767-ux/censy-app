'use client'

import { mockWinRateData, mockResponsesOverTime, mockLossReasons, mockResponses, mockDeals } from '@/lib/mock-data'
import { formatCurrency, formatRelativeTime, getStageColor } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, Send, MessageSquare, Star, ArrowUpRight } from 'lucide-react'

function MetricCard({ label, value, trend, trendLabel, icon: Icon, color = 'text-slate-900' }: {
  label: string; value: string; trend?: number; trendLabel?: string; icon: React.ElementType; color?: string
}) {
  const isPositive = (trend ?? 0) >= 0
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</span>
        <div className="w-7 h-7 rounded-md bg-slate-50 flex items-center justify-center">
          <Icon size={14} className="text-slate-400" />
        </div>
      </div>
      <div className={`text-2xl font-bold mb-1 ${color}`}>{value}</div>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 text-xs ${isPositive ? 'text-teal-600' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          <span>{isPositive ? '+' : ''}{trend}% {trendLabel}</span>
        </div>
      )}
    </div>
  )
}

export default function DashboardPage() {
  const totalDeals = mockDeals.length
  const wonDeals = mockDeals.filter(d => d.stage === 'closed_won').length
  const closedDeals = mockDeals.filter(d => ['closed_won', 'closed_lost'].includes(d.stage)).length
  const winRate = closedDeals > 0 ? Math.round((wonDeals / closedDeals) * 100) : 0
  const completedResponses = mockResponses.filter(r => r.status === 'completed').length
  const totalSent = mockResponses.length
  const responseRate = totalSent > 0 ? Math.round((completedResponses / totalSent) * 100) : 0

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Overview</h1>
        <p className="text-sm text-slate-500">February 2026 — win/loss and feedback at a glance</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-5 gap-4">
        <MetricCard label="Total Deals" value={String(totalDeals)} trend={8} trendLabel="vs last month" icon={TrendingUp} />
        <MetricCard label="Win Rate" value={`${winRate}%`} trend={3} trendLabel="vs last month" icon={ArrowUpRight} color="text-teal-600" />
        <MetricCard label="Surveys Sent" value={String(totalSent)} trend={22} trendLabel="this month" icon={Send} />
        <MetricCard label="Response Rate" value={`${responseRate}%`} trend={-4} trendLabel="vs last month" icon={MessageSquare} />
        <MetricCard label="Avg NPS" value="47" trend={5} trendLabel="vs last month" icon={Star} color="text-indigo-600" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Win Rate Over Time */}
        <div className="col-span-2 bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-slate-900">Win Rate Over Time</p>
              <p className="text-xs text-slate-500">Last 6 months</p>
            </div>
            <span className="text-xl font-bold text-teal-600">{winRate}%</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={mockWinRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={v => `${v}%`} />
              <Tooltip formatter={(v) => [`${v}%`, 'Win Rate']} contentStyle={{ fontSize: 12, border: '1px solid #e2e8f0', borderRadius: 6 }} />
              <Line type="monotone" dataKey="winRate" stroke="#14b8a6" strokeWidth={2} dot={{ fill: '#14b8a6', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Loss Reasons */}
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <p className="text-sm font-medium text-slate-900 mb-1">Loss Reasons</p>
          <p className="text-xs text-slate-500 mb-4">From survey responses</p>
          <div className="space-y-3">
            {mockLossReasons.map(r => (
              <div key={r.reason}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">{r.reason}</span>
                  <span className="font-medium text-slate-900">{r.pct}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full">
                  <div className="h-1.5 bg-red-400 rounded-full" style={{ width: `${r.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Responses Over Time */}
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <p className="text-sm font-medium text-slate-900 mb-1">Survey Responses</p>
          <p className="text-xs text-slate-500 mb-4">Last 6 months</p>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={mockResponsesOverTime}>
              <defs>
                <linearGradient id="respGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11, border: '1px solid #e2e8f0', borderRadius: 6 }} />
              <Area type="monotone" dataKey="responses" stroke="#6366f1" strokeWidth={2} fill="url(#respGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="col-span-2 bg-white rounded-lg border border-slate-200 p-5">
          <p className="text-sm font-medium text-slate-900 mb-4">Recent Activity</p>
          <div className="space-y-3">
            {mockResponses.slice(0, 5).map(r => {
              const deal = mockDeals.find(d => d.id === r.deal_id)
              return (
                <div key={r.id} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                  <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-semibold shrink-0">
                    {r.respondent_name?.charAt(0) || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{r.respondent_name}</p>
                    <p className="text-xs text-slate-500 truncate">{deal?.deal_name} — {r.survey_id === 's1' ? 'Closed Lost' : r.survey_id === 's2' ? 'Closed Won' : 'Product Feedback'}</p>
                  </div>
                  <Badge className={
                    r.status === 'completed' ? 'bg-teal-50 text-teal-700' :
                    r.status === 'started' ? 'bg-blue-50 text-blue-700' :
                    'bg-amber-50 text-amber-700'
                  }>{r.status}</Badge>
                  <span className="text-xs text-slate-400 shrink-0">{formatRelativeTime(r.sent_at)}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
