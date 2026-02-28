export default function BillingPage() {
  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-lg font-semibold text-slate-900 mb-1">Billing</h1>
      <p className="text-sm text-slate-500 mb-6">Manage your subscription and billing details</p>
      <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
        </div>
        <h2 className="text-base font-semibold text-slate-900 mb-2">Billing — Coming Soon</h2>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          Censy is currently in beta. You have full access to all features at no charge.
          Billing will be enabled when we launch publicly.
        </p>
        <div className="mt-6 p-4 bg-teal-50 rounded-lg text-left">
          <p className="text-xs font-semibold text-teal-700 mb-1">Your current plan</p>
          <p className="text-sm text-teal-800 font-medium">Beta Access — All Features Included</p>
          <ul className="mt-2 space-y-1 text-xs text-teal-600">
            <li>Unlimited surveys</li>
            <li>Unlimited team members</li>
            <li>Unlimited responses</li>
            <li>All analytics features</li>
            <li>API access</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
