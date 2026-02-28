'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
          <h1 className="text-xl font-bold text-slate-900">Sign in to Censy</h1>
          <p className="text-sm text-slate-500 mt-1">Win/loss intelligence for your sales team</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1 block">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" required className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-200" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1 block">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-200" />
          </div>
          <button type="submit" className="w-full py-2.5 text-sm font-semibold text-white bg-[#1e2a4a] rounded-md hover:bg-[#2a3a5e] transition-colors">
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-4">
          Don&apos;t have an account? <Link href="/signup" className="text-indigo-600 hover:underline">Start free trial</Link>
        </p>
      </div>
    </div>
  )
}
