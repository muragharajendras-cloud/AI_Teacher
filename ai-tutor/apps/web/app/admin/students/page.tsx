'use client'

import { useState } from 'react'
import { Search, Filter, RefreshCcw, LogIn, ChevronDown, MoreVertical } from 'lucide-react'

// Mock Data
const MOCK_STUDENTS = [
  { id: '1', name: 'Arjun Doe', grade: 10, board: 'CBSE', plan: 'Scholar', joined: 'Jan 15, 2026', elo: 1250 },
  { id: '2', name: 'Priya Sharma', grade: 12, board: 'ICSE', plan: 'Elite', joined: 'Feb 2, 2026', elo: 1420 },
  { id: '3', name: 'Rahul Kumar', grade: 9, board: 'State', plan: 'Free', joined: 'May 10, 2026', elo: 950 },
  { id: '4', name: 'Ananya Singh', grade: 10, board: 'CBSE', plan: 'Scholar', joined: 'Mar 18, 2026', elo: 1100 },
]

export default function AdminStudentsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Student Directory</h1>
          <p className="text-slate-500 mt-2">Manage all registered students on the platform.</p>
        </div>
        <div className="flex space-x-3 w-full md:w-auto">
          <button className="px-4 py-2 border border-slate-300 text-slate-600 font-bold rounded-xl shadow-sm hover:bg-slate-50 transition flex items-center justify-center bg-white">
            <Filter size={18} className="mr-2" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Search Bar */}
        <div className="p-6 border-b border-slate-100 flex items-center bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-widest font-bold">
                <th className="p-6">Student</th>
                <th className="p-6">Grade & Board</th>
                <th className="p-6">Plan</th>
                <th className="p-6">ELO Score</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_STUDENTS.map(student => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center mr-4">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{student.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">Joined {student.joined}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-bold">Grade {student.grade}</span>
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-bold">{student.board}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                      student.plan === 'Elite' ? 'bg-amber-100 text-amber-800' :
                      student.plan === 'Scholar' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {student.plan}
                    </span>
                  </td>
                  <td className="p-6 font-mono font-bold text-slate-700">
                    {student.elo}
                  </td>
                  <td className="p-6 text-right space-x-2 flex justify-end">
                    <button 
                      className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition border border-transparent hover:border-emerald-200"
                      title="Impersonate User"
                    >
                      <LogIn size={18} />
                    </button>
                    <button 
                      className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition border border-transparent hover:border-amber-200"
                      title="Force Re-index Textbooks"
                    >
                      <RefreshCcw size={18} />
                    </button>
                    <button 
                      className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-sm text-slate-500">Showing <span className="font-bold">1</span> to <span className="font-bold">4</span> of <span className="font-bold">1,240</span> results</p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-slate-300 rounded-md text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-slate-300 rounded-md text-sm font-medium text-slate-600 bg-white hover:bg-slate-50">Next</button>
          </div>
        </div>

      </div>
    </div>
  )
}
