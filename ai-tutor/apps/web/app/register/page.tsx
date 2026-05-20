'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, UserPlus, GraduationCap, Users, Building } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [role, setRole] = useState<'student' | 'parent' | 'school'>('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Mock Supabase registration and redirect
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (role === 'student') {
        router.push('/onboarding')
      } else if (role === 'parent') {
        router.push('/parent/settings') // Parent needs to link child
      } else {
        router.push('/admin/metrics')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Start your free trial</h2>
        <p className="mt-2 text-sm text-gray-600">Join thousands of students getting perfect scores.</p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-3xl sm:px-10 border border-gray-100">
          
          {/* Role Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">I am a...</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex flex-col items-center justify-center py-3 border rounded-xl transition ${
                  role === 'student' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                <GraduationCap size={20} className="mb-1" />
                <span className="text-xs">Student</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('parent')}
                className={`flex flex-col items-center justify-center py-3 border rounded-xl transition ${
                  role === 'parent' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                <Users size={20} className="mb-1" />
                <span className="text-xs">Parent</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('school')}
                className={`flex flex-col items-center justify-center py-3 border rounded-xl transition ${
                  role === 'school' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                <Building size={20} className="mb-1" />
                <span className="text-xs">School</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-gray-300 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border bg-gray-50/50"
                placeholder="John Doe"
              />
            </div>

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
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-gray-300 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border bg-gray-50/50"
                placeholder="••••••••"
                minLength={8}
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white rounded-xl py-3 font-bold hover:bg-indigo-700 transition flex justify-center items-center disabled:opacity-70 shadow-md shadow-indigo-200"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>Create Account <UserPlus className="ml-2" size={18} /></>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <img className="h-5 w-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-bold text-indigo-600 hover:text-indigo-500 transition">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
