'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Clock, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react'

// Mock Data
const MOCK_QUESTIONS = [
  { id: 1, type: 'mcq', text: "What is the primary pigment responsible for photosynthesis?", options: ["Chlorophyll", "Hemoglobin", "Melanin", "Carotene"] },
  { id: 2, type: 'short', text: "In which organelle does photosynthesis occur?" },
  { id: 3, type: 'descriptive', text: "Explain the difference between the light-dependent and light-independent reactions of photosynthesis." }
]

export default function TestExecutionPage() {
  const params = useParams()
  const router = useRouter()
  const testId = params.id as string
  
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(900) // 15 mins
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleSubmit = () => {
    setSubmitting(true)
    setTimeout(() => {
      router.push(`/tests/${testId}/results`)
    }, 1500)
  }

  const q = MOCK_QUESTIONS[currentIdx]

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Test Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Biology: Photosynthesis</h1>
          <p className="text-sm text-gray-500">Adaptive Mock Test</p>
        </div>
        <div className={`flex items-center px-4 py-2 rounded-lg font-mono font-bold text-lg ${timeLeft < 300 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-800'}`}>
          <Clock className="mr-2" size={20} />
          {formatTime(timeLeft)}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center p-6 w-full max-w-4xl mx-auto">
        
        {/* Progress Bar */}
        <div className="w-full mb-8">
          <div className="flex justify-between text-sm font-bold text-gray-500 mb-2">
            <span>Question {currentIdx + 1} of {MOCK_QUESTIONS.length}</span>
            <span>{Math.round(((currentIdx + 1) / MOCK_QUESTIONS.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300" 
              style={{ width: `${((currentIdx + 1) / MOCK_QUESTIONS.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white w-full rounded-3xl shadow-sm border border-gray-100 p-8 flex-1 flex flex-col">
          
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider rounded-md mb-4">
              {q.type === 'mcq' ? 'Multiple Choice' : q.type === 'short' ? 'Short Answer' : 'Descriptive'}
            </span>
            <h2 className="text-2xl font-bold text-gray-900 leading-relaxed">{q.text}</h2>
          </div>

          <div className="flex-1">
            {q.type === 'mcq' && q.options && (
              <div className="space-y-3">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setAnswers({...answers, [q.id]: opt})}
                    className={`w-full text-left p-4 rounded-xl border-2 transition font-medium ${
                      answers[q.id] === opt 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <span className="inline-block w-6 h-6 rounded-full bg-white border text-center text-sm leading-5 mr-3">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {q.type === 'short' && (
              <input 
                type="text"
                value={answers[q.id] || ''}
                onChange={(e) => setAnswers({...answers, [q.id]: e.target.value})}
                placeholder="Type your answer here..."
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-indigo-600 focus:ring-0 text-lg transition"
              />
            )}

            {q.type === 'descriptive' && (
              <textarea 
                value={answers[q.id] || ''}
                onChange={(e) => setAnswers({...answers, [q.id]: e.target.value})}
                placeholder="Write a detailed explanation..."
                rows={6}
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-indigo-600 focus:ring-0 text-lg transition resize-none"
              ></textarea>
            )}
          </div>

        </div>

        {/* Navigation Footer */}
        <div className="w-full mt-6 flex justify-between items-center">
          <button 
            onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
            className="px-6 py-3 bg-white text-gray-700 font-bold rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition disabled:opacity-50 flex items-center"
          >
            <ArrowLeft className="mr-2" size={18} /> Previous
          </button>
          
          {currentIdx === MOCK_QUESTIONS.length - 1 ? (
            <button 
              onClick={handleSubmit}
              disabled={submitting}
              className="px-8 py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 transition flex items-center disabled:opacity-70"
            >
              {submitting ? 'Submitting...' : 'Submit Exam'}
            </button>
          ) : (
            <button 
              onClick={() => setCurrentIdx(prev => Math.min(MOCK_QUESTIONS.length - 1, prev + 1))}
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition flex items-center"
            >
              Next <ArrowRight className="ml-2" size={18} />
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
