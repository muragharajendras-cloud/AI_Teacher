import Link from 'next/link'
import { LayoutDashboard, Users, BookOpen, Settings, LogOut, Activity } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <Activity size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">System Admin</span>
          </div>
          
          <nav className="space-y-2 mt-8">
            <Link href="/admin/metrics" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition group">
              <LayoutDashboard size={20} className="group-hover:text-blue-400" />
              <span className="font-medium">Metrics & Health</span>
            </Link>
            <Link href="/admin/students" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition group">
              <Users size={20} className="group-hover:text-emerald-400" />
              <span className="font-medium">Students</span>
            </Link>
            <Link href="/admin/textbooks" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition group">
              <BookOpen size={20} className="group-hover:text-amber-400" />
              <span className="font-medium">Textbook Jobs</span>
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
            <Activity size={24} className="text-blue-400" />
            <span className="font-bold">System Admin</span>
          </div>
        </div>
        
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
