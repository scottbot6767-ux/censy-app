'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, TrendingUp, FileText, Zap, MessageSquare,
  BarChart2, Settings, ChevronRight, Bell, Search, LogOut,
  Users, Key, Puzzle, CreditCard, PieChart
} from 'lucide-react'

const navItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Deals', href: '/dashboard/deals', icon: TrendingUp },
  { label: 'Surveys', href: '/dashboard/surveys', icon: FileText },
  { label: 'Triggers', href: '/dashboard/triggers', icon: Zap },
  { label: 'Responses', href: '/dashboard/responses', icon: MessageSquare },
  {
    label: 'Analytics', href: '/dashboard/analytics', icon: BarChart2,
    children: [
      { label: 'Win / Loss', href: '/dashboard/analytics/win-loss', icon: PieChart },
      { label: 'Product', href: '/dashboard/analytics/product', icon: BarChart2 },
      { label: 'Surveys', href: '/dashboard/analytics/surveys', icon: FileText },
    ]
  },
]

const settingsItems = [
  { label: 'Organization', href: '/dashboard/settings', icon: Settings },
  { label: 'Team', href: '/dashboard/settings/team', icon: Users },
  { label: 'Integrations', href: '/dashboard/settings/integrations', icon: Puzzle },
  { label: 'API Keys', href: '/dashboard/settings/api-keys', icon: Key },
  { label: 'Billing', href: '/dashboard/settings/billing', icon: CreditCard },
]

function NavItem({ item, depth = 0 }: { item: typeof navItems[0]; depth?: number }) {
  const pathname = usePathname()
  const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
  const Icon = item.icon

  return (
    <div>
      <Link
        href={item.href}
        className={cn(
          'flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors',
          depth > 0 && 'ml-4 text-xs',
          isActive
            ? 'bg-white/10 text-white font-medium'
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        )}
      >
        <Icon size={14} className="shrink-0" />
        <span>{item.label}</span>
        {(item as { children?: unknown[] }).children && <ChevronRight size={12} className="ml-auto" />}
      </Link>
      {(item as { children?: typeof navItems }).children?.map(child => (
        <NavItem key={child.href} item={child} depth={depth + 1} />
      ))}
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 bg-[#1e2a4a] flex flex-col shrink-0">
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-teal-400 rounded flex items-center justify-center">
              <BarChart2 size={14} className="text-[#1e2a4a]" />
            </div>
            <span className="text-white font-semibold text-sm tracking-wide">Censy</span>
          </div>
        </div>

        {/* Org selector */}
        <div className="px-3 py-3 border-b border-white/10">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
            <div className="w-5 h-5 rounded bg-indigo-400 flex items-center justify-center text-white text-xs font-bold">A</div>
            <span className="text-white text-xs font-medium truncate">Acme Corp</span>
            <ChevronRight size={10} className="ml-auto text-slate-400" />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map(item => <NavItem key={item.href} item={item} />)}

          <div className="pt-4 pb-1">
            <p className="px-3 text-xs font-medium text-slate-500 uppercase tracking-widest mb-1">Settings</p>
          </div>
          {settingsItems.map(item => <NavItem key={item.href} item={item} />)}
        </nav>

        {/* User */}
        <div className="px-3 py-3 border-t border-white/10">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/5 cursor-pointer transition-colors">
            <div className="w-6 h-6 rounded-full bg-indigo-400 flex items-center justify-center text-white text-xs font-semibold">A</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">Alex Johnson</p>
              <p className="text-slate-500 text-xs truncate">alex@company.com</p>
            </div>
            <LogOut size={12} className="text-slate-500 shrink-0" />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center gap-4 px-6 shrink-0">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <Search size={14} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search deals, surveys, contacts..."
              className="text-sm text-slate-600 placeholder:text-slate-400 bg-transparent outline-none w-full"
            />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={16} />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-teal-500 rounded-full" />
            </button>
            <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-semibold">AJ</div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
