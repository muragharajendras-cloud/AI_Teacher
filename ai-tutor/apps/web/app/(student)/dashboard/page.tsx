'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { Flame, Clock, Brain, AlertTriangle, ArrowRight, Activity, TrendingUp } from 'lucide-react'
import Link from 'next/link'

type DashboardMetrics = {
  streak: number
  study_hours_total: number
  study_hours_week: number
  sessions_week: number
  subject_avg: Record<string, number>
  weak_topics: string[]
  strong_topics: string[]
  behavior_score: number
  elo_by_chapter: Record<string, number>
  test_history: any[]
  ai_recommendations: string[]
  updated_at: string
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch cached metrics
    const fetchMetrics = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/dashboard/metrics`, {
          // Add auth headers if needed
        })
        if (res.ok) {
          const data = await res.json()
          if (Object.keys(data).length > 0) {
            setMetrics(data)
          } else {
             // Mock data if no backend data exists yet
             setMetrics({
                streak: 3,
                study_hours_total: 12.5,
                study_hours_week: 4.2,
                sessions_week: 5,
                subject_avg: { "Math": 85, "Science": 72 },
                weak_topics: ["Photosynthesis", "Algebra I"],
                strong_topics: ["Geometry"],
                behavior_score: 92,
                elo_by_chapter: { "Math.Algebra": 1200, "Science.Biology": 950, "Math.Geometry": 1400 },
                test_history: [
                  { subject: "Math", score: 8, max_score: 10, date: "2026-05-10" },
                  { subject: "Math", score: 9, max_score: 10, date: "2026-05-11" }
                ],
                ai_recommendations: [
                  "Review Photosynthesis concepts carefully before the next test.",
                  "Great job maintaining your streak! Try pushing for 5 days.",
                  "Your geometry scores are excellent. Try attempting harder descriptive questions."
                ],
                updated_at: new Date().toISOString()
             })
          }
        }
      } catch (err) {
        console.error("Failed to fetch metrics", err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchMetrics()
  }, [])

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>
  }

  if (!metrics) {
    return <div className="p-8 text-center text-gray-500">No dashboard data available yet. Start your first session!</div>
  }

  // Format ELO data for Radar Chart
  const eloData = Object.entries(metrics.elo_by_chapter).map(([key, value]) => ({
    subject: key.split('.')[1] || key,
    elo: value,
    fullMark: 2000
  }))

  // Format Test History for Line Chart
  const testData = metrics.test_history.map((t, idx) => ({
    name: `Test ${idx + 1}`,
    score: (t.score / t.max_score) * 100
  }))

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Header & Quick Stats */}
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome Back</h1>
            <p className="text-sm text-gray-500 mt-1">Here is your learning overview for this week.</p>
          </div>
          
          <div className="flex space-x-4">
            {/* Glassmorphic Stat Cards */}
            <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-2 bg-orange-100 text-orange-500 rounded-lg">
                <Flame size={20} className="fill-orange-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Day Streak</p>
                <p className="text-xl font-bold text-gray-800">{metrics.streak}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Hours (Week)</p>
                <p className="text-xl font-bold text-gray-800">{metrics.study_hours_week}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* ELO Radar Chart */}
          <div className="md:col-span-1 bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
            <div className="flex items-center space-x-2 mb-4">
              <Brain size={18} className="text-purple-500" />
              <h2 className="text-lg font-semibold text-gray-800">Mastery Profile</h2>
            </div>
            <div className="h-[250px] w-full">
              {eloData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={eloData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <Radar name="ELO" dataKey="elo" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                    <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">Not enough data to map ELO.</div>
              )}
            </div>
          </div>

          {/* Test Performance Line Chart */}
          <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <TrendingUp size={18} className="text-blue-500" />
                <h2 className="text-lg font-semibold text-gray-800">Recent Test Scores</h2>
              </div>
            </div>
            <div className="h-[250px] w-full mt-2">
              {testData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={testData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">Take a mock test to see your progress here.</div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Grid: Actionable Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          
          {/* Weak Topics */}
          <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-rose-100">
            <div className="flex items-center space-x-2 mb-6">
              <AlertTriangle size={18} className="text-rose-500" />
              <h2 className="text-lg font-semibold text-gray-800">Focus Areas</h2>
            </div>
            <div className="space-y-3">
              {metrics.weak_topics.length > 0 ? (
                metrics.weak_topics.map((topic, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/60 p-4 rounded-xl shadow-sm backdrop-blur-sm transition hover:bg-white/80">
                    <span className="font-medium text-gray-700">{topic}</span>
                    <Link href={`/session/new?topic=${topic}`} className="flex items-center text-sm text-rose-600 font-semibold hover:text-rose-700 transition">
                      Tutor Me <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500 bg-white/50 p-4 rounded-xl">No weak topics identified yet. Keep it up!</div>
              )}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-indigo-100">
            <div className="flex items-center space-x-2 mb-6">
              <Activity size={18} className="text-indigo-500" />
              <h2 className="text-lg font-semibold text-gray-800">AI Tutor Insights</h2>
            </div>
            <div className="space-y-4">
              {metrics.ai_recommendations.map((rec, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                  <p className="text-sm text-gray-700 leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-indigo-100/50 pt-4">
               <div className="text-xs text-gray-500">Behavior Score: <span className={`font-bold ${metrics.behavior_score > 80 ? 'text-green-500' : 'text-orange-500'}`}>{metrics.behavior_score}/100</span></div>
               <Link href="/session/new" className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition shadow-sm">
                 Start Daily Session
               </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
