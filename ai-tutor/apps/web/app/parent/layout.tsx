import Link from 'next/link'
import { Users, Bell, Settings, LogOut, Shield } from 'lucide-react'

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Parent Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg">
              <Shield size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Parent Portal</span>
          </div>
          
          <div className="mb-6">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">My Children</label>
            <select className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500">
              <option>Arjun Doe (Grade 10)</option>
              <option>Priya Doe (Grade 8)</option>
            </select>
          </div>

          <nav className="space-y-2 mt-8">
            <Link href="/parent/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition group">
              <Users size={20} className="group-hover:text-indigo-400" />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link href="/parent/alerts" className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition group">
              <div className="flex items-center space-x-3">
                <Bell size={20} className="group-hover:text-rose-400" />
                <span className="font-medium">Live Alerts</span>
              </div>
              <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">2</span>
            </Link>
            <Link href="/parent/settings" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition group">
              <Settings size={20} className="group-hover:text-slate-400" />
              <span className="font-medium">Settings</span>
            </Link>
          </nav>
        </div>
        
        <div className="mt-auto p-6">
          <Link href="/" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield size={24} className="text-indigo-400" />
            <span className="font-bold">Parent Portal</span>
          </div>
          <select className="bg-slate-800 border border-slate-700 rounded-lg p-1.5 text-xs">
            <option>Arjun</option>
            <option>Priya</option>
          </select>
        </div>
        
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
