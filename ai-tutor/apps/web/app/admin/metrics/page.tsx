'use client'

import { DollarSign, Users, Activity, HardDrive, TrendingUp, Cpu } from 'lucide-react'

// Mock Data
const METRICS = {
  mrr: '$12,450',
  mrr_growth: '+15%',
  dau: 1240,
  dau_growth: '+5%',
  api_cost_per_student: '$0.12',
  api_cost_trend: '-$0.02',
  queue_depth: 45,
  active_sessions: 89,
}

export default function AdminMetricsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Business & Health Metrics</h1>
        <p className="text-slate-500 mt-2">Platform performance overview for today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <DollarSign size={24} />
            </div>
            <span className="inline-flex items-center text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
              <TrendingUp size={14} className="mr-1" /> {METRICS.mrr_growth}
            </span>
          </div>
          <h3 className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">Monthly Recurring Revenue</h3>
          <div className="text-3xl font-extrabold text-slate-900">{METRICS.mrr}</div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Users size={24} />
            </div>
            <span className="inline-flex items-center text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
              <TrendingUp size={14} className="mr-1" /> {METRICS.dau_growth}
            </span>
          </div>
          <h3 className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">Daily Active Users</h3>
          <div className="text-3xl font-extrabold text-slate-900">{METRICS.dau}</div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
              <Cpu size={24} />
            </div>
            <span className="inline-flex items-center text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
              <TrendingUp size={14} className="mr-1 transform rotate-180" /> {METRICS.api_cost_trend}
            </span>
          </div>
          <h3 className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">API Cost / Student</h3>
          <div className="text-3xl font-extrabold text-slate-900">{METRICS.api_cost_per_student}</div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
              <HardDrive size={24} />
            </div>
          </div>
          <h3 className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">Celery Queue Depth</h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">{METRICS.queue_depth}</span>
            <span className="text-sm font-medium text-slate-500">jobs pending</span>
          </div>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center space-x-3 mb-6">
            <Activity className="text-blue-500 w-6 h-6" />
            <h2 className="text-lg font-bold text-slate-900">Live Server Status</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">Active WebSocket Sessions</p>
                <p className="text-sm text-slate-500">Currently connected AI voice sessions</p>
              </div>
              <div className="text-2xl font-black text-blue-600 flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse mr-3"></span>
                {METRICS.active_sessions}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">Database Connection</p>
                <p className="text-sm text-slate-500">Supabase pgBouncer pool</p>
              </div>
              <span className="px-3 py-1 bg-green-50 text-green-600 font-bold text-xs uppercase tracking-wider rounded-lg">Healthy</span>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">Vector Search</p>
                <p className="text-sm text-slate-500">Pinecone index latency</p>
              </div>
              <span className="px-3 py-1 bg-green-50 text-green-600 font-bold text-xs uppercase tracking-wider rounded-lg">34ms</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-800 text-white">
          <h2 className="text-lg font-bold text-white mb-6">System Alerts</h2>
          
          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700 flex items-start space-x-4">
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0"></div>
              <div>
                <p className="font-bold text-sm">High Load on ElevenLabs API</p>
                <p className="text-xs text-slate-400 mt-1">TTS generation is averaging 600ms latency (normal: 300ms). Consider scaling workers.</p>
                <p className="text-[10px] text-slate-500 mt-2">15 mins ago</p>
              </div>
            </div>
            
            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700 flex items-start space-x-4">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></div>
              <div>
                <p className="font-bold text-sm">Weekly Report Cron Job Complete</p>
                <p className="text-xs text-slate-400 mt-1">Generated and emailed 840 parent reports successfully.</p>
                <p className="text-[10px] text-slate-500 mt-2">Yesterday, 8:05 AM</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
