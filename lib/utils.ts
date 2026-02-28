import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date))
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date()
  const d = new Date(date)
  const diffMs = now.getTime() - d.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`
  return `${Math.floor(diffDays / 365)}y ago`
}

export function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function getStageColor(stage: string): string {
  const colors: Record<string, string> = {
    prospecting: 'bg-slate-100 text-slate-700',
    qualification: 'bg-blue-50 text-blue-700',
    demo: 'bg-indigo-50 text-indigo-700',
    proposal: 'bg-violet-50 text-violet-700',
    negotiation: 'bg-amber-50 text-amber-700',
    closed_won: 'bg-teal-50 text-teal-700',
    closed_lost: 'bg-red-50 text-red-700',
  }
  return colors[stage] || 'bg-slate-100 text-slate-600'
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    draft: 'bg-slate-100 text-slate-600',
    active: 'bg-teal-50 text-teal-700',
    archived: 'bg-slate-100 text-slate-400',
    pending: 'bg-amber-50 text-amber-700',
    started: 'bg-blue-50 text-blue-700',
    completed: 'bg-teal-50 text-teal-700',
  }
  return colors[status] || 'bg-slate-100 text-slate-600'
}
