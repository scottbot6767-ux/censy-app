"use client"
import * as React from "react"
import { LayoutDashboard, TrendingUp, FileText, Zap, Mail, MessageSquare, BarChart2, PieChart, Settings, Users, Puzzle, Key, CreditCard } from "lucide-react"
import Link from "next/link"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"

const navGroups = [
  {
    label: "Main",
    items: [
      { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
      { title: "Deals", url: "/dashboard/deals", icon: TrendingUp },
      { title: "Surveys", url: "/dashboard/surveys", icon: FileText },
      { title: "Triggers", url: "/dashboard/triggers", icon: Zap },
      { title: "Email", url: "/dashboard/email", icon: Mail },
      { title: "Responses", url: "/dashboard/responses", icon: MessageSquare },
    ],
  },
  {
    label: "Analytics",
    items: [
      { title: "Win / Loss", url: "/dashboard/analytics/win-loss", icon: PieChart },
      { title: "Product", url: "/dashboard/analytics/product", icon: BarChart2 },
      { title: "Surveys", url: "/dashboard/analytics/surveys", icon: BarChart2 },
    ],
  },
  {
    label: "Settings",
    items: [
      { title: "Organization", url: "/dashboard/settings", icon: Settings },
      { title: "Team", url: "/dashboard/settings/team", icon: Users },
      { title: "Integrations", url: "/dashboard/settings/integrations", icon: Puzzle },
      { title: "API Keys", url: "/dashboard/settings/api-keys", icon: Key },
      { title: "Billing", url: "/dashboard/settings/billing", icon: CreditCard },
    ],
  },
]

const user = { name: "Alex Johnson", email: "alex@acme.com", avatar: "" }

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                    <polyline points="16 7 22 7 22 13"/>
                  </svg>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Censy</span>
                  <span className="truncate text-xs opacity-60">Win/Loss Intelligence</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navGroups.map((group) => (
          <NavMain key={group.label} label={group.label} items={group.items} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
