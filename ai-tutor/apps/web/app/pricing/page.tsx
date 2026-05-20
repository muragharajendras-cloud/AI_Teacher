'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, XCircle } from 'lucide-react'

export default function PricingPage() {
  const [annual, setAnnual] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Invest in your child's future</h1>
          <p className="text-xl text-gray-600 mb-8">Choose the perfect plan to unlock 24/7 AI tutoring, adaptive testing, and deep performance insights.</p>
          
          <div className="inline-flex items-center p-1 bg-gray-200/50 rounded-2xl border border-gray-200">
            <button 
              onClick={() => setAnnual(false)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition ${!annual ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setAnnual(true)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition flex items-center ${annual ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Annually <span className="ml-2 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          
          {/* Free Tier */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-full flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Free</h3>
            <p className="text-gray-500 text-sm mb-6">Perfect for trying out the platform.</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-gray-900">$0</span>
              <span className="text-gray-500">/mo</span>
            </div>
            <Link href="/register" className="w-full py-3 px-4 bg-gray-100 text-gray-900 rounded-xl font-bold text-center hover:bg-gray-200 transition mb-8">
              Start Free Trial
            </Link>
            <ul className="space-y-4 text-sm text-gray-600 flex-1">
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-indigo-500 mr-3 shrink-0" /> 1 Textbook Upload</li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-indigo-500 mr-3 shrink-0" /> 5 AI Voice Sessions / month</li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-indigo-500 mr-3 shrink-0" /> Basic ELO Tracking</li>
              <li className="flex items-start text-gray-400"><XCircle className="w-5 h-5 mr-3 shrink-0" /> Behavior Monitoring</li>
              <li className="flex items-start text-gray-400"><XCircle className="w-5 h-5 mr-3 shrink-0" /> Weekly PDF Reports</li>
            </ul>
          </div>

          {/* Scholar Tier */}
          <div className="bg-indigo-900 text-white rounded-3xl p-8 shadow-2xl border border-indigo-700 transform md:scale-105 relative h-full flex flex-col z-10">
            <div className="absolute top-0 right-8 transform -translate-y-1/2">
              <span className="bg-gradient-to-r from-orange-400 to-rose-400 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                Most Popular
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Scholar</h3>
            <p className="text-indigo-200 text-sm mb-6">Everything you need for perfect scores.</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-white">${annual ? '15' : '19'}</span>
              <span className="text-indigo-200">/mo</span>
            </div>
            <Link href="/register" className="w-full py-3 px-4 bg-white text-indigo-900 rounded-xl font-bold text-center hover:bg-gray-50 transition mb-8 shadow-lg">
              Get Started
            </Link>
            <ul className="space-y-4 text-sm text-indigo-100 flex-1">
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-green-400 mr-3 shrink-0" /> Unlimited Textbook Uploads</li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-green-400 mr-3 shrink-0" /> Unlimited AI Voice Sessions</li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-green-400 mr-3 shrink-0" /> Advanced ELO & Radar Charts</li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-green-400 mr-3 shrink-0" /> Computer Vision Behavior Monitoring</li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-green-400 mr-3 shrink-0" /> Weekly Parent PDF Reports</li>
            </ul>
          </div>

          {/* Elite Tier */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-full flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Elite</h3>
            <p className="text-gray-500 text-sm mb-6">For families seeking priority support.</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-gray-900">${annual ? '25' : '29'}</span>
              <span className="text-gray-500">/mo</span>
            </div>
            <Link href="/register" className="w-full py-3 px-4 bg-indigo-50 text-indigo-700 rounded-xl font-bold text-center hover:bg-indigo-100 transition mb-8">
              Upgrade to Elite
            </Link>
            <ul className="space-y-4 text-sm text-gray-600 flex-1">
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-indigo-500 mr-3 shrink-0" /> Everything in Scholar</li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-indigo-500 mr-3 shrink-0" /> Priority Server Processing (Faster responses)</li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-indigo-500 mr-3 shrink-0" /> Instant WhatsApp Alerts for Parents</li>
              <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-indigo-500 mr-3 shrink-0" /> Multi-child support (up to 3)</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}
