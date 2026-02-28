'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', orgName: '', password: '' })
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-10 h-10 bg-[#1e2a4a] rounded-lg flex items-center justify-center mx-auto mb-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5eead4" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
          </div>
          <h1 className="text-xl font-bold text-slate-900">Start your free trial</h1>
          <p className="text-sm text-slate-500 mt-1">14 days free. No credit card required.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          {[
            { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Alex Johnson' },
            { key: 'orgName', label: 'Company Name', type: 'text', placeholder: 'Acme Corp' },
            { key: 'email', label: 'Work Email', type: 'email', placeholder: 'you@company.com' },
            { key: 'password', label: 'Password', type: 'password', placeholder: 'At least 8 characters' },
          ].map(field => (
            <div key={field.key}>
              <label className="text-xs font-medium text-slate-600 mb-1 block">{field.label}</label>
              <input
                type={field.type}
                value={form[field.key as keyof typeof form]}
                onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                placeholder={field.placeholder}
                required
                className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-200"
              />
            </div>
          ))}
          <button type="submit" className="w-full py-2.5 text-sm font-semibold text-white bg-[#1e2a4a] rounded-md hover:bg-[#2a3a5e] transition-colors">
            Create Account
          </button>
          <p className="text-xs text-slate-400 text-center">By signing up you agree to our Terms of Service and Privacy Policy</p>
        </form>

        <p className="text-center text-sm text-slate-500 mt-4">
          Already have an account? <Link href="/login" className="text-indigo-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
