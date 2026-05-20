'use client'

import { useState } from 'react'
import { BookOpen, AlertCircle, RefreshCcw, CheckCircle2, HardDrive, Filter } from 'lucide-react'

// Mock Data
const MOCK_JOBS = [
  { id: 'job_8921', student: 'Rahul Kumar', filename: 'Physics_Vol_2_scan.pdf', pages: 412, status: 'failed', error: 'OCR Timeout: Page 89 contained complex math blocks that stalled Tesseract.', time: '10 mins ago', retryCount: 2 },
  { id: 'job_8920', student: 'Priya Sharma', filename: 'Biology_NCERT.pdf', pages: 300, status: 'processing', progress: 45, time: '2 mins ago', retryCount: 0 },
  { id: 'job_8919', student: 'Arjun Doe', filename: 'History_Modern.pdf', pages: 150, status: 'completed', time: '1 hour ago', retryCount: 0 },
  { id: 'job_8918', student: 'Ananya Singh', filename: 'Chemistry_Organic_blur.pdf', pages: 200, status: 'failed', error: 'Image Quality Error: Resolution too low for accurate OCR (< 150 DPI).', time: '3 hours ago', retryCount: 1 },
]

export default function AdminTextbooksPage() {
  const [filter, setFilter] = useState('all')

  const filteredJobs = MOCK_JOBS.filter(job => filter === 'all' || job.status === filter)

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Textbook OCR Operations</h1>
          <p className="text-slate-500 mt-2">Monitor system-wide PDF indexing jobs and manage OCR failures.</p>
        </div>
        <div className="flex space-x-3 w-full md:w-auto">
          <select 
            className="px-4 py-2 border border-slate-300 text-slate-600 font-bold rounded-xl shadow-sm hover:bg-slate-50 transition bg-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Jobs</option>
            <option value="failed">Failed Only</option>
            <option value="processing">Processing Only</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">14,205</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Books Indexed</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-2xl font-black text-red-600">24</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active OCR Failures</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
            <HardDrive size={24} />
          </div>
          <div>
            <p className="text-2xl font-black text-indigo-900">1.2 TB</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pinecone Vector Storage</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-widest font-bold">
                <th className="p-6">Job ID / File</th>
                <th className="p-6">Student</th>
                <th className="p-6">Status / Error</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredJobs.map(job => (
                <tr key={job.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-6">
                    <p className="font-mono text-xs text-slate-400 mb-1">{job.id}</p>
                    <p className="font-bold text-slate-900">{job.filename}</p>
                    <p className="text-xs text-slate-500 mt-1">{job.pages} pages • Uploaded {job.time}</p>
                  </td>
                  <td className="p-6 font-medium text-slate-700">
                    {job.student}
                  </td>
                  <td className="p-6 max-w-xs">
                    {job.status === 'completed' && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-green-100 text-green-800 uppercase tracking-wider">
                        <CheckCircle2 size={14} className="mr-1" /> Success
                      </span>
                    )}
                    {job.status === 'processing' && (
                      <div className="w-full max-w-[200px]">
                        <div className="flex justify-between text-[10px] font-bold text-indigo-600 mb-1.5 uppercase tracking-wider">
                          <span>OCR Processing...</span>
                          <span>{job.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-indigo-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${job.progress}%` }}></div>
                        </div>
                      </div>
                    )}
                    {job.status === 'failed' && (
                      <div className="space-y-1">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-red-100 text-red-800 uppercase tracking-wider mb-1">
                          <AlertCircle size={12} className="mr-1" /> Failed (Retries: {job.retryCount})
                        </span>
                        <p className="text-xs text-slate-600 bg-slate-100 p-2 rounded-md font-mono break-words leading-relaxed border border-slate-200">
                          {job.error}
                        </p>
                      </div>
                    )}
                  </td>
                  <td className="p-6 text-right">
                    {job.status === 'failed' && (
                      <button 
                        className="px-4 py-2 bg-slate-900 text-white font-bold rounded-lg shadow-sm hover:bg-slate-800 transition text-sm flex items-center ml-auto"
                        title="Force Retry Job"
                      >
                        <RefreshCcw size={16} className="mr-2" /> Force Retry
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
