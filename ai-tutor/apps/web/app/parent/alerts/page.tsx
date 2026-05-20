'use client'

import { Bell, EyeOff, Smartphone, UserX, Clock, ChevronRight } from 'lucide-react'

// Mock Data
const ALERTS = [
  { 
    id: 1, 
    type: 'phone', 
    title: 'Phone Usage Detected', 
    session: 'Mathematics: Quadratic Equations',
    time: 'Today, 4:32 PM',
    severity: 'high',
    duration: '45 seconds',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  { 
    id: 2, 
    type: 'gaze', 
    title: 'Looking Away', 
    session: 'Biology: Photosynthesis',
    time: 'Yesterday, 2:15 PM',
    severity: 'medium',
    duration: '2 minutes',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  { 
    id: 3, 
    type: 'absence', 
    title: 'No Face Detected', 
    session: 'Physics: Kinematics',
    time: 'May 8, 2026, 11:05 AM',
    severity: 'high',
    duration: '5 minutes',
    image: null
  }
]

export default function ParentAlertsPage() {
  const getIcon = (type: string) => {
    switch(type) {
      case 'phone': return <Smartphone size={20} />
      case 'gaze': return <EyeOff size={20} />
      case 'absence': return <UserX size={20} />
      default: return <Bell size={20} />
    }
  }

  const getColor = (severity: string) => {
    return severity === 'high' ? 'text-red-600 bg-red-50 border-red-100' : 'text-orange-600 bg-orange-50 border-orange-100'
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center">
            <Bell className="mr-3 text-rose-500" size={32} /> Live Alerts Feed
          </h1>
          <p className="text-slate-500 mt-2">Real-time behavior monitoring powered by computer vision. Raw video never leaves the device.</p>
        </div>
      </div>

      <div className="space-y-4">
        {ALERTS.map(alert => (
          <div key={alert.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 items-start hover:border-slate-300 transition cursor-pointer group">
            
            {/* Snapshot */}
            <div className="w-full md:w-48 h-32 bg-slate-100 rounded-xl overflow-hidden shrink-0 relative flex items-center justify-center">
              {alert.image ? (
                <>
                  <img src={alert.image} alt="Incident snapshot" className="w-full h-full object-cover filter blur-[2px] group-hover:blur-0 transition duration-300" />
                  <div className="absolute inset-0 bg-black/10"></div>
                </>
              ) : (
                <div className="flex flex-col items-center text-slate-400">
                  <UserX size={32} className="mb-2" />
                  <span className="text-xs font-bold uppercase tracking-widest">No Camera Data</span>
                </div>
              )}
              <div className={`absolute top-2 right-2 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                alert.severity === 'high' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
              }`}>
                {alert.severity}
              </div>
            </div>

            {/* Details */}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <div className={`p-1.5 rounded-lg border ${getColor(alert.severity)}`}>
                  {getIcon(alert.type)}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{alert.title}</h3>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-slate-600 font-medium">{alert.session}</p>
                <div className="flex items-center space-x-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span className="flex items-center"><Clock size={14} className="mr-1" /> {alert.time}</span>
                  <span className="flex items-center">Duration: {alert.duration}</span>
                </div>
              </div>
              
              <div className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-700 transition">
                View Full Incident Report <ChevronRight size={16} className="ml-1" />
              </div>
            </div>

          </div>
        ))}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
        <p className="text-sm text-slate-500 font-medium">Showing alerts from the last 7 days. Older alerts are automatically deleted.</p>
      </div>

    </div>
  )
}
