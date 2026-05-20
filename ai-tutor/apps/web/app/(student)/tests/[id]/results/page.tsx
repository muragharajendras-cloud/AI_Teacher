'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Award, Share2, ArrowRight, CheckCircle2, XCircle, Lightbulb } from 'lucide-react'

// Mock Data
const MOCK_RESULTS = {
  score: 85,
  max_score: 100,
  elo_gain: 45,
  questions: [
    {
      id: 1,
      text: "What is the primary pigment responsible for photosynthesis?",
      student_answer: "Chlorophyll",
      correct_answer: "Chlorophyll",
      is_correct: true,
      ai_explanation: "Correct! Chlorophyll is the green pigment in plants that absorbs light energy used to carry out photosynthesis."
    },
    {
      id: 2,
      text: "In which organelle does photosynthesis occur?",
      student_answer: "Nucleus",
      correct_answer: "Chloroplast",
      is_correct: false,
      ai_explanation: "Photosynthesis occurs in the Chloroplasts, which contain the chlorophyll pigment. The nucleus contains genetic material."
    },
    {
      id: 3,
      text: "Explain the difference between the light-dependent and light-independent reactions of photosynthesis.",
      student_answer: "Light dependent needs light, independent doesn't.",
      correct_answer: "Detailed explanation expected.",
      is_correct: true, // partial credit mock
      ai_explanation: "Partial credit. You are right that light-dependent reactions require sunlight, but you missed that light-independent reactions (Calvin cycle) use the ATP and NADPH produced by the light reactions to convert CO2 into glucose."
    }
  ]
}

export default function TestResultsPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock backend grading latency
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI is grading your exam...</h2>
        <p className="text-gray-500">Evaluating descriptive answers using the semantic rubric.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Score Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Exam Results</h1>
            <p className="text-gray-500">Biology: Photosynthesis</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-5xl font-black text-indigo-600 mb-1">{MOCK_RESULTS.score}%</div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Score</div>
            </div>
            <div className="h-16 w-px bg-gray-200"></div>
            <div className="text-center">
              <div className="flex items-center justify-center text-2xl font-black text-green-500 mb-1">
                <Award className="mr-1 w-6 h-6" /> +{MOCK_RESULTS.elo_gain}
              </div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">ELO Mastery</div>
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 px-2">Detailed Analysis</h2>
          
          {MOCK_RESULTS.questions.map((q, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start">
                <div className="mr-4 mt-1 shrink-0">
                  {q.is_correct ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{q.text}</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className={`p-4 rounded-xl border ${q.is_correct ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                      <p className="text-xs font-bold text-gray-500 uppercase mb-1">Your Answer</p>
                      <p className={`font-medium ${q.is_correct ? 'text-green-800' : 'text-red-800'}`}>{q.student_answer}</p>
                    </div>
                    {!q.is_correct && (
                      <div className="p-4 rounded-xl border bg-gray-50 border-gray-100">
                        <p className="text-xs font-bold text-gray-500 uppercase mb-1">Correct Answer</p>
                        <p className="font-medium text-gray-800">{q.correct_answer}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-start">
                    <Lightbulb className="w-5 h-5 text-indigo-500 mr-3 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-indigo-400 uppercase mb-1">AI Explanation</p>
                      <p className="text-sm text-indigo-900 leading-relaxed">{q.ai_explanation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
          <Link href="/dashboard" className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition text-center flex justify-center items-center">
            Return to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <button className="flex-1 py-4 bg-white text-gray-900 border border-gray-200 font-bold rounded-xl shadow-sm hover:bg-gray-50 transition flex justify-center items-center">
            <Share2 className="mr-2 w-5 h-5" /> Share Score
          </button>
        </div>

      </div>
    </div>
  )
}
