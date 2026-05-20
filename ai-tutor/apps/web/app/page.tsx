'use client'

import Link from 'next/link'
import { PlayCircle, CheckCircle2, ChevronRight, Brain, BookOpen, Shield } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-100">
      
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-indigo-600" />
              <span className="font-extrabold text-xl tracking-tight text-slate-900">AITutor</span>
            </div>
            <div className="flex space-x-4 items-center">
              <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition">Log In</Link>
              <Link href="/pricing" className="text-sm font-bold bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition shadow-sm hover:shadow-md">View Pricing</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full font-bold text-sm border border-indigo-100">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            <span>Now supporting CBSE, ICSE & State Boards</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Your Personal AI Tutor for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Academic Mastery</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Upload your textbook and start a live, voice-based tutoring session. Our AI understands your curriculum, adapts to your pace, and keeps parents in the loop.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center text-lg">
              Start Free Trial <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition border-2 border-slate-200 flex items-center justify-center text-lg">
              <PlayCircle className="mr-2 w-5 h-5 text-indigo-600" /> Watch Demo
            </button>
          </div>
        </div>

        {/* Hero Visual Mock */}
        <div className="flex-1 w-full max-w-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-blue-50 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
          <div className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border-4 border-white aspect-video relative flex items-center justify-center group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Student using AI Tutor" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-50 transition duration-500" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>
            <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition duration-300 shadow-xl">
              <PlayCircle className="w-10 h-10 text-indigo-600 ml-1" />
            </div>
            
            {/* Mock Floating UI Element */}
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg flex items-center space-x-3 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500 delay-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">+15</div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">ELO Gained</p>
                <p className="text-sm font-extrabold text-slate-900">Photosynthesis</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Built for students, trusted by parents.</h2>
            <p className="text-lg text-slate-600">The only AI tutor that combines real-time voice teaching with computer-vision behavior monitoring.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-indigo-100 hover:shadow-md transition">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                <Brain className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Adaptive Teaching</h3>
              <p className="text-slate-600 leading-relaxed">The AI adjusts to your ELO rating, delivering simple explanations for beginners and challenging questions for experts.</p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-blue-100 hover:shadow-md transition">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Textbook Intelligence</h3>
              <p className="text-slate-600 leading-relaxed">Upload your exact school PDF. The AI teaches strictly from your curriculum so you never learn out-of-syllabus concepts.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-emerald-100 hover:shadow-md transition">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Behavior Monitoring</h3>
              <p className="text-slate-600 leading-relaxed">Privacy-first computer vision detects if a student looks away or uses a phone, sending real-time alerts to the Parent Dashboard.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
