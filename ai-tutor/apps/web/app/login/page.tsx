'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, KeyRound } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // In a real app, you would call Supabase Auth here
    // For demo purposes, we'll mock the smart redirect logic based on the email input
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (email.includes('parent')) {
        router.push('/parent/dashboard')
      } else if (email.includes('admin')) {
        router.push('/admin/metrics')
      } else if (email.includes('new')) {
        router.push('/onboarding')
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-8">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
            <KeyRound className="text-indigo-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h2>
          <p className="text-gray-500 mb-8">Log in to your AI Tutor account to continue learning.</p>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-gray-300 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border bg-gray-50/50"
                placeholder="you@example.com"
              />
              <p className="text-xs text-gray-400 mt-2">
                (Demo hints: use 'parent@', 'admin@', 'new@' to test smart redirects)
              </p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-gray-300 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border bg-gray-50/50"
                placeholder="••••••••"
              />
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white rounded-xl py-3 font-bold hover:bg-indigo-700 transition flex justify-center items-center disabled:opacity-70 shadow-md shadow-indigo-200"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>Sign in <ArrowRight className="ml-2" size={18} /></>
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/register" className="font-bold text-indigo-600 hover:text-indigo-500 transition">
                Start your free trial
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
