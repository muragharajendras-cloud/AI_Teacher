'use client'

import { useState } from 'react'
import { Link2, Smartphone, Mail, CreditCard, ShieldCheck } from 'lucide-react'

export default function ParentSettingsPage() {
  const [whatsapp, setWhatsapp] = useState('+91 98765 43210')
  const [email, setEmail] = useState('parent@example.com')
  const [reportFrequency, setReportFrequency] = useState('weekly')
  
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 mt-2">Manage your connected children, notifications, and billing.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Left Col: Sidebar Navigation (Mock) */}
        <div className="space-y-2">
          <div className="px-4 py-3 bg-indigo-50 text-indigo-700 font-bold rounded-xl border border-indigo-100">Notification Preferences</div>
          <div className="px-4 py-3 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition cursor-pointer">Linked Children</div>
          <div className="px-4 py-3 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition cursor-pointer">Billing & Subscription</div>
          <div className="px-4 py-3 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition cursor-pointer">Privacy & Data</div>
        </div>

        {/* Right Col: Content Area */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Notifications Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Smartphone size={20} /></div>
              <h2 className="text-xl font-bold text-slate-900">Real-time Alerts</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">WhatsApp Number</label>
                <input 
                  type="text" 
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full border-slate-300 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border bg-slate-50/50 font-mono"
                />
                <p className="text-xs text-slate-500 mt-2">Used for instant behavior alerts (Elite tier only).</p>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" />
                  <span className="text-sm font-medium text-slate-700">Send WhatsApp for High Severity alerts (No Face Detected)</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="w-5 h-5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" />
                  <span className="text-sm font-medium text-slate-700">Send WhatsApp for Medium Severity alerts (Looking Away)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Reports Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Mail size={20} /></div>
              <h2 className="text-xl font-bold text-slate-900">Academic Reports</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-slate-300 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Report Frequency</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setReportFrequency('weekly')}
                    className={`py-3 rounded-xl border font-medium transition text-sm ${
                      reportFrequency === 'weekly' 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    Weekly (Sundays)
                  </button>
                  <button
                    onClick={() => setReportFrequency('monthly')}
                    className={`py-3 rounded-xl border font-medium transition text-sm ${
                      reportFrequency === 'monthly' 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Link Child Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Link2 size={20} /></div>
              <h2 className="text-xl font-bold text-slate-900">Link Child Account</h2>
            </div>
            
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">Enter the unique linking code shown on your child's Dashboard settings. This grants you access to their academic progress and behavior metrics.</p>
              <div className="flex space-x-3">
                <input 
                  type="text" 
                  placeholder="e.g. AIT-8X9P"
                  className="flex-1 border-slate-300 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border bg-white font-mono uppercase tracking-widest"
                />
                <button className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-sm hover:bg-indigo-700 transition">
                  Link Account
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between p-4 border border-slate-200 rounded-2xl">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-700 font-black rounded-full flex items-center justify-center">A</div>
                <div>
                  <h4 className="font-bold text-slate-900">Arjun Doe</h4>
                  <p className="text-xs text-slate-500">Linked on May 1, 2026</p>
                </div>
              </div>
              <button className="text-sm font-bold text-rose-500 hover:text-rose-600 transition px-3 py-1.5 rounded-lg hover:bg-rose-50">Unlink</button>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-sm hover:bg-slate-800 transition">
              Save Preferences
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}
