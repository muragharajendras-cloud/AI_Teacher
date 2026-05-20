'use client'

import { Clock, TrendingUp, AlertTriangle, FileText, Download, Target, ChevronRight } from 'lucide-react'

// Mock Data
const MOCK_DATA = {
  study_hours: 12.5,
  hours_trend: '+2.5',
  behavior_score: 'Amber', // Green, Amber, Red
  sessions_count: 8,
  weak_subject: 'Mathematics',
  weak_subject_trend: '-4% ELO',
  recent_reports: [
    { id: 1, date: 'May 10, 2026', title: 'Weekly Academic Report (May 3 - May 10)', url: '#' },
    { id: 2, date: 'May 3, 2026', title: 'Weekly Academic Report (Apr 26 - May 3)', url: '#' }
  ]
}

export default function ParentDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Arjun's Progress</h1>
          <p className="text-slate-500 mt-1">Here is how Arjun is performing this week.</p>
        </div>
        <button className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow-sm hover:bg-indigo-700 transition flex items-center">
          <FileText size={18} className="mr-2" /> View Latest Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Study Time Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Clock size={24} />
            </div>
            <span className="inline-flex items-center text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
              <TrendingUp size={14} className="mr-1" /> {MOCK_DATA.hours_trend}h
            </span>
          </div>
          <h3 className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">Weekly Study Time</h3>
          <div className="flex items-baseline space-x-1">
            <span className="text-4xl font-extrabold text-slate-900">{MOCK_DATA.study_hours}</span>
            <span className="text-slate-500 font-medium">hours</span>
          </div>
        </div>

        {/* Behavior Score Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl ${
              MOCK_DATA.behavior_score === 'Green' ? 'bg-green-50 text-green-600' : 
              MOCK_DATA.behavior_score === 'Amber' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
            }`}>
              <AlertTriangle size={24} />
            </div>
            {MOCK_DATA.behavior_score === 'Amber' && (
              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md">2 Alerts</span>
            )}
          </div>
          <h3 className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">Behavior Score</h3>
          <div className="flex items-baseline space-x-1">
            <span className={`text-4xl font-extrabold ${
              MOCK_DATA.behavior_score === 'Green' ? 'text-green-600' : 
              MOCK_DATA.behavior_score === 'Amber' ? 'text-orange-500' : 'text-red-600'
            }`}>
              {MOCK_DATA.behavior_score}
            </span>
          </div>
          {MOCK_DATA.behavior_score === 'Amber' && (
            <p className="text-xs text-slate-500 mt-2">Attention drifted during Mathematics.</p>
          )}
        </div>

        {/* Needs Attention Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
              <Target size={24} />
            </div>
          </div>
          <h3 className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">Needs Attention</h3>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-extrabold text-slate-900">{MOCK_DATA.weak_subject}</span>
          </div>
          <p className="text-xs text-rose-500 font-medium mt-2 flex items-center">
            <TrendingUp size={12} className="mr-1 transform rotate-180" /> {MOCK_DATA.weak_subject_trend} this week
          </p>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Subject Trends Mock Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900">Subject Mastery Trends</h2>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2 pb-4 border-b border-slate-100 relative">
            {/* Y-axis lines */}
            <div className="absolute w-full h-px bg-slate-100 top-0"></div>
            <div className="absolute w-full h-px bg-slate-100 top-1/2"></div>
            
            {/* Mock bars */}
            <div className="w-1/4 flex flex-col items-center group relative z-10">
              <div className="w-full bg-indigo-200 rounded-t-lg h-[60%] transition group-hover:bg-indigo-300"></div>
              <div className="text-xs font-bold text-slate-500 mt-3">Biology</div>
            </div>
            <div className="w-1/4 flex flex-col items-center group relative z-10">
              <div className="w-full bg-indigo-600 rounded-t-lg h-[85%] transition shadow-lg shadow-indigo-200 group-hover:bg-indigo-700"></div>
              <div className="text-xs font-bold text-slate-500 mt-3">Physics</div>
            </div>
            <div className="w-1/4 flex flex-col items-center group relative z-10">
              <div className="w-full bg-orange-400 rounded-t-lg h-[40%] transition group-hover:bg-orange-500"></div>
              <div className="text-xs font-bold text-slate-500 mt-3">Math</div>
            </div>
            <div className="w-1/4 flex flex-col items-center group relative z-10">
              <div className="w-full bg-indigo-200 rounded-t-lg h-[70%] transition group-hover:bg-indigo-300"></div>
              <div className="text-xs font-bold text-slate-500 mt-3">Chemistry</div>
            </div>
          </div>
        </div>

        {/* Weekly Reports Archive */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900">Weekly PDF Reports</h2>
          </div>
          
          <div className="space-y-4">
            {MOCK_DATA.recent_reports.map(report => (
              <div key={report.id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-indigo-600 transition">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{report.title}</h4>
                    <p className="text-xs text-slate-500">{report.date}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 transition">
                    <Download size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-indigo-600 transition">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 text-slate-500 font-bold rounded-2xl hover:border-slate-300 hover:text-slate-600 transition text-sm">
            View All Past Reports
          </button>
        </div>

      </div>

    </div>
  )
}
