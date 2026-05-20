'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { TrendingUp, Award, Brain, CheckCircle2, ArrowRight } from 'lucide-react'

export default function SessionSummaryPage() {
  const params = useParams()
  const router = useRouter()
  const sessionId = params.id as string
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch the session summary from the backend here
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [sessionId])

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 shadow-sm border border-green-200">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Session Complete!</h1>
          <p className="text-lg text-gray-600 mt-2">Great job. Here's a breakdown of what you accomplished.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* ELO Gain Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp className="w-24 h-24 text-indigo-600" />
            </div>
            <div className="flex items-center space-x-3 mb-6 relative z-10">
              <Award className="text-indigo-500 w-6 h-6" />
              <h2 className="text-xl font-bold text-gray-900">Mastery Updated</h2>
            </div>
            <div className="relative z-10">
              <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Photosynthesis (Biology)</p>
              <div className="flex items-end space-x-3">
                <span className="text-4xl font-extrabold text-gray-900">720</span>
                <span className="text-green-500 font-bold flex items-center mb-1">
                  +80 <TrendingUp className="w-4 h-4 ml-1" />
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">Previous score: 640</p>
            </div>
          </div>

          {/* Concepts Covered */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <Brain className="text-purple-500 w-6 h-6" />
              <h2 className="text-xl font-bold text-gray-900">Key Concepts</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 mr-3 shrink-0"></div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Chlorophyll function</p>
                  <p className="text-xs text-gray-500">Mastered during this session.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 mr-3 shrink-0"></div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Light vs Dark reactions</p>
                  <p className="text-xs text-gray-500">Good understanding shown.</p>
                </div>
              </li>
              <li className="flex items-start opacity-60">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 mr-3 shrink-0"></div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Calvin Cycle</p>
                  <p className="text-xs text-gray-500">Needs further review.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between border border-indigo-700">
          <div className="mb-6 md:mb-0 md:pr-8">
            <h3 className="text-2xl font-bold mb-2">Lock in your knowledge</h3>
            <p className="text-indigo-200 text-sm">Take a quick 5-question mock test to solidify these concepts and increase your streak.</p>
          </div>
          <div className="flex flex-col space-y-3 w-full md:w-auto shrink-0">
            <Link href="/tests" className="px-8 py-4 bg-white text-indigo-900 font-bold rounded-xl shadow-lg hover:bg-gray-50 transition flex items-center justify-center">
              Take 5-Question Test <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/dashboard" className="px-8 py-3 bg-indigo-800 text-indigo-100 font-medium rounded-xl hover:bg-indigo-700 transition flex items-center justify-center border border-indigo-600">
              Return to Dashboard
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
