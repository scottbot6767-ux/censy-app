'use client'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const WEBHOOK_URL = 'https://censy.app/api/webhooks/inbound'

function IntegrationCard({ name, desc, status, children }: { name: string; desc: string; status: 'connected' | 'coming_soon' | 'available'; children?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-slate-900">{name}</h3>
            {status === 'connected' && <Badge className="bg-teal-50 text-teal-700">Active</Badge>}
            {status === 'coming_soon' && <Badge className="bg-slate-100 text-slate-500">Coming Soon</Badge>}
          </div>
          <p className="text-xs text-slate-500">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

export default function IntegrationsPage() {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(WEBHOOK_URL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-lg font-semibold text-slate-900 mb-1">Integrations</h1>
      <p className="text-sm text-slate-500 mb-6">Connect Censy to your existing tools</p>

      <div className="space-y-4">
        <IntegrationCard name="Webhooks" desc="Receive deal events from any system using your webhook URL and API key." status="connected">
          <div className="mt-3 pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-500 mb-1.5">Webhook URL</p>
            <div className="flex items-center gap-2 bg-slate-50 rounded-md border border-slate-200 px-3 py-2">
              <code className="text-xs text-slate-700 flex-1 truncate">{WEBHOOK_URL}</code>
              <button onClick={copy} className="text-slate-400 hover:text-slate-600 shrink-0">
                {copied ? <Check size={13} className="text-teal-500" /> : <Copy size={13} />}
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-1.5">Authenticate with your API key in the <code className="bg-slate-100 px-1 rounded">x-api-key</code> header</p>
          </div>
        </IntegrationCard>

        <IntegrationCard name="Salesforce" desc="Trigger surveys automatically from Salesforce opportunity stage changes. Pull deal data directly into Censy." status="coming_soon">
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-400">Native CRM integration — coming Q2 2026</p>
            <button className="px-3 py-1.5 text-xs text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50">Notify me</button>
          </div>
        </IntegrationCard>

        <IntegrationCard name="HubSpot" desc="Sync deal stages and contact data from HubSpot. Trigger surveys on pipeline movement." status="coming_soon">
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-400">Native CRM integration — coming Q3 2026</p>
            <button className="px-3 py-1.5 text-xs text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50">Notify me</button>
          </div>
        </IntegrationCard>
      </div>

      <div className="mt-6 bg-indigo-50 rounded-lg border border-indigo-100 p-4">
        <p className="text-xs font-semibold text-indigo-700 mb-1">Webhook Payload Format</p>
        <pre className="text-xs text-indigo-600 overflow-x-auto">{`POST /api/webhooks/inbound
x-api-key: your-api-key

{
  "event": "deal.stage_changed",
  "data": {
    "deal_id": "...",
    "deal_name": "Acme Corp",
    "contact_email": "sarah@acme.com",
    "from_stage": "proposal",
    "to_stage": "closed_lost"
  }
}`}</pre>
      </div>
    </div>
  )
}
