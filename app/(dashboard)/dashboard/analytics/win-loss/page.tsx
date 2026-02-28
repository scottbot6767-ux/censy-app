'use client'

import { mockWinRateData, mockLossReasons, mockCompetitorData, mockDeals } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, Cell
} from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Clock } from 'lucide-react'

export default function WinLossPage() {
  const wonDeals = mockDeals.filter(d => d.stage === 'closed_won')
  const lostDeals = mockDeals.filter(d => d.stage === 'closed_lost')
  const closedDeals = [...wonDeals, ...lostDeals]
  const winRate = closedDeals.length > 0 ? Math.round((wonDeals.length / closedDeals.length) * 100) : 0
  const avgWonValue = wonDeals.length > 0 ? wonDeals.reduce((s, d) => s + (d.value || 0), 0) / wonDeals.length : 0
  const avgLostValue = lostDeals.length > 0 ? lostDeals.reduce((s, d) => s + (d.value || 0), 0) / lostDeals.length : 0

  const repData = [
    { rep: 'Alex J.', wins: 4, losses: 1, winRate: 80 },
    { rep: 'Sam P.', wins: 3, losses: 2, winRate: 60 },
    { rep: 'Taylor K.', wins: 2, losses: 2, winRate: 50 },
  ]

  const sizeData = [
    { range: '<$5K', winRate: 70 },
    { range: '$5–25K', winRate: 62 },
    { range: '$25–100K', winRate: 55 },
    { range: '$100K+', winRate: 45 },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">Win / Loss Analysis</h1>
          <p className="text-sm text-slate-500">Last 6 months</p>
        </div>
        <select className="text-sm border border-slate-200 rounded-md px-3 py-1.5 bg-white text-slate-600 outline-none">
          <option>Last 6 months</option>
          <option>Last 3 months</option>
          <option>Last 12 months</option>
        </select>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Deals Closed', value: String(closedDeals.length), icon: TrendingUp, color: 'text-slate-900' },
          { label: 'Win Rate', value: `${winRate}%`, icon: TrendingUp, color: 'text-teal-600' },
          { label: 'Avg Won Value', value: formatCurrency(avgWonValue), icon: DollarSign, color: 'text-teal-600' },
          { label: 'Avg Lost Value', value: formatCurrency(avgLostValue), icon: TrendingDown, color: 'text-red-500' },
        ].map(m => {
          const Icon = m.icon
          return (
            <div key={m.label} className="bg-white rounded-lg border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{m.label}</span>
                <Icon size={14} className="text-slate-300" />
              </div>
              <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Win Rate Over Time */}
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <p className="text-sm font-medium text-slate-900 mb-4">Win Rate Over Time</p>
          <ResponsiveContainer width="100%" height={200}>
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
          <p className="text-sm font-medium text-slate-900 mb-4">Loss Reasons</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockLossReasons} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <YAxis type="category" dataKey="reason" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={80} />
              <Tooltip formatter={(v) => [`${v}%`, 'Share']} contentStyle={{ fontSize: 12, border: '1px solid #e2e8f0', borderRadius: 6 }} />
              <Bar dataKey="pct" fill="#f87171" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Competitor Analysis */}
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <p className="text-sm font-medium text-slate-900 mb-4">Win Rate vs. Competitors</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockCompetitorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="competitor" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={{ fontSize: 12, border: '1px solid #e2e8f0', borderRadius: 6 }} />
              <Bar dataKey="winRate" name="Win Rate" radius={[3, 3, 0, 0]}>
                {mockCompetitorData.map((entry) => (
                  <Cell key={entry.competitor} fill={entry.winRate >= 60 ? '#14b8a6' : entry.winRate >= 40 ? '#f59e0b' : '#f87171'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Win Rate by Rep */}
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <p className="text-sm font-medium text-slate-900 mb-4">Win Rate by Sales Rep</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={repData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="rep" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={{ fontSize: 12, border: '1px solid #e2e8f0', borderRadius: 6 }} />
              <Bar dataKey="wins" name="Wins" stackId="a" fill="#14b8a6" radius={[0,0,0,0]} />
              <Bar dataKey="losses" name="Losses" stackId="a" fill="#f87171" radius={[3,3,0,0]} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Deal Size */}
      <div className="bg-white rounded-lg border border-slate-200 p-5">
        <p className="text-sm font-medium text-slate-900 mb-4">Win Rate by Deal Size</p>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={sizeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={v => `${v}%`} />
            <Tooltip formatter={(v) => [`${v}%`, 'Win Rate']} contentStyle={{ fontSize: 12, border: '1px solid #e2e8f0', borderRadius: 6 }} />
            <Bar dataKey="winRate" fill="#6366f1" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
