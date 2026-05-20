'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, Brain, Clock, Zap } from 'lucide-react'

export default function TestGenerationPage() {
  const router = useRouter()
  const [subject, setSubject] = useState('Biology')
  const [chapter, setChapter] = useState('Photosynthesis')
  const [difficulty, setDifficulty] = useState('Adaptive')
  const [format, setFormat] = useState('Mix')
  const [generating, setGenerating] = useState(false)

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setGenerating(true)
    
    // Mock backend generation latency
    setTimeout(() => {
      const mockTestId = "test-123"
      router.push(`/tests/${mockTestId}`)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center">
            <FileText className="mr-3 text-indigo-600" size={32} /> Generate Mock Test
          </h1>
          <p className="mt-2 text-gray-600">Our AI will instantly generate a personalized test based on your ELO mastery level and uploaded textbooks.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <form onSubmit={handleGenerate} className="p-8 space-y-8">
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                <select 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border-gray-300 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border bg-gray-50/50"
                >
                  <option>Biology</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Mathematics</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Chapter</label>
                <select 
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  className="w-full border-gray-300 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border bg-gray-50/50"
                >
                  <option>Photosynthesis</option>
                  <option>Cell Structure</option>
                  <option>Human Anatomy</option>
                  <option>Genetics</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Difficulty Level</label>
              <div className="grid grid-cols-3 gap-3">
                {['Adaptive', 'Medium', 'Hard'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`py-3 rounded-xl border font-medium transition flex justify-center items-center ${
                      difficulty === level 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {level === 'Adaptive' && <Brain size={16} className="mr-2" />}
                    {level}
                  </button>
                ))}
              </div>
              {difficulty === 'Adaptive' && (
                <p className="text-xs text-indigo-600 mt-2 flex items-center">
                  <Zap size={14} className="mr-1" /> The AI will automatically adjust question difficulty based on your 720 ELO rating.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Question Format</label>
              <div className="grid grid-cols-4 gap-3">
                {['MCQ Only', 'Short Answer', 'Descriptive', 'Mix'].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFormat(f)}
                    className={`py-3 rounded-xl border text-sm font-medium transition ${
                      format === f 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-start">
              <Clock className="text-orange-500 w-5 h-5 mr-3 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-gray-900">Timed Exam Mode</h4>
                <p className="text-xs text-gray-600 mt-1">This test will be timed. Server-side enforcement means you cannot pause or cheat the timer. Make sure you have 15 minutes of uninterrupted time.</p>
              </div>
            </div>

            <button 
              type="submit"
              disabled={generating}
              className="w-full bg-indigo-600 text-white rounded-xl py-4 font-bold text-lg hover:bg-indigo-700 transition flex justify-center items-center disabled:opacity-70 shadow-lg shadow-indigo-200"
            >
              {generating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Generating from Textbook...
                </>
              ) : (
                'Generate & Start Exam'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
