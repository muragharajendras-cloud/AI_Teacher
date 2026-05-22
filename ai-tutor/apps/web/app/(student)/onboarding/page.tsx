'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, BookOpen, GraduationCap, ArrowRight, UploadCloud } from 'lucide-react'

export default function OnboardingWizard() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  
  // Form State
  const [grade, setGrade] = useState<number>(10)
  const [board, setBoard] = useState<string>('CBSE')
  const [subjects, setSubjects] = useState<string[]>([])
  const [fileUploaded, setFileUploaded] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [diagnosticScore, setDiagnosticScore] = useState<number | null>(null)

  const handleSubjectToggle = (subject: string) => {
    if (subjects.includes(subject)) {
      setSubjects(subjects.filter(s => s !== subject))
    } else {
      setSubjects([...subjects, subject])
    }
  }

  const handleDiagnosticComplete = (scorePct: number) => {
    setDiagnosticScore(scorePct)
    submitOnboarding(scorePct)
  }

  const simulateUpload = () => {
    setUploadProgress(10)
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setFileUploaded(true)
          return 100
        }
        return prev + 15
      })
    }, 500)
  }

  const submitOnboarding = async (scorePct: number) => {
    setLoading(true)
    try {
      const { createClient } = await import('@/lib/supabase')
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/onboarding/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({
          grade: parseInt(grade.toString() || "0"),
          board,
          subjects,
          diagnostic_score_pct: scorePct
        })
      })
      
      if (response.ok) {
        router.push('/dashboard')
      } else {
        const err = await response.text()
        console.error("Onboarding failed:", err)
        alert("Onboarding failed: " + err)
      }
    } catch (err) {
      console.error("Onboarding failed:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Sidebar Steps */}
        <div className="bg-indigo-900 text-white p-8 md:w-1/3 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-8">Setup Profile</h2>
            <div className="space-y-6">
              <div className={`flex items-center space-x-3 ${step >= 1 ? 'opacity-100' : 'opacity-50'}`}>
                <GraduationCap size={20} className={step > 1 ? 'text-green-400' : 'text-indigo-300'} />
                <span className={`font-medium ${step === 1 ? 'text-white' : 'text-indigo-200'}`}>1. Profile</span>
              </div>
              <div className={`flex items-center space-x-3 ${step >= 2 ? 'opacity-100' : 'opacity-50'}`}>
                <BookOpen size={20} className={step > 2 ? 'text-green-400' : 'text-indigo-300'} />
                <span className={`font-medium ${step === 2 ? 'text-white' : 'text-indigo-200'}`}>2. Subjects</span>
              </div>
              <div className={`flex items-center space-x-3 ${step >= 3 ? 'opacity-100' : 'opacity-50'}`}>
                <BookOpen size={20} className={step > 3 ? 'text-green-400' : 'text-indigo-300'} />
                <span className={`font-medium ${step === 3 ? 'text-white' : 'text-indigo-200'}`}>3. Textbooks</span>
              </div>
              <div className={`flex items-center space-x-3 ${step >= 4 ? 'opacity-100' : 'opacity-50'}`}>
                <CheckCircle2 size={20} className={step > 4 ? 'text-green-400' : 'text-indigo-300'} />
                <span className={`font-medium ${step === 4 ? 'text-white' : 'text-indigo-200'}`}>4. Diagnostic</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wizard Content */}
        <div className="p-8 md:w-2/3">
          
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-2xl font-bold text-gray-900">Tell us about yourself</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">School Board</label>
                <select 
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border bg-white"
                  value={board}
                  onChange={(e) => setBoard(e.target.value)}
                >
                  <option>CBSE</option>
                  <option>ICSE</option>
                  <option>State Board</option>
                  <option>IB</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Grade / Class</label>
                <select 
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border bg-white"
                  value={grade}
                  onChange={(e) => setGrade(parseInt(e.target.value))}
                >
                  {[8, 9, 10, 11, 12].map(g => <option key={g} value={g}>Grade {g}</option>)}
                </select>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full bg-indigo-600 text-white rounded-xl py-3 font-semibold hover:bg-indigo-700 transition flex justify-center items-center"
              >
                Continue <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-2xl font-bold text-gray-900">Select Subjects</h3>
              <p className="text-sm text-gray-500">We suggest starting with your core subjects.</p>
              
              <div className="grid grid-cols-2 gap-3">
                {['Math', 'Science', 'Social Studies', 'English', 'Hindi'].map(sub => (
                  <button
                    key={sub}
                    onClick={() => handleSubjectToggle(sub)}
                    className={`p-4 border rounded-xl text-left transition ${
                      subjects.includes(sub) 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold' 
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button 
                  onClick={() => setStep(3)}
                  disabled={subjects.length === 0}
                  className="flex-1 bg-indigo-600 text-white rounded-xl py-3 font-semibold hover:bg-indigo-700 transition disabled:opacity-50 flex justify-center items-center"
                >
                  Continue <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in text-center">
              <h3 className="text-2xl font-bold text-gray-900">Upload Textbooks</h3>
              <p className="text-sm text-gray-500">Drag and drop your syllabus PDFs here.</p>
              
              <div 
                className="mt-6 border-2 border-dashed border-indigo-200 rounded-3xl p-12 bg-indigo-50/50 flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-50 transition"
                onClick={!uploadProgress ? simulateUpload : undefined}
              >
                {uploadProgress > 0 && uploadProgress < 100 ? (
                  <div className="w-full max-w-xs space-y-4">
                    <div className="flex justify-between text-sm font-medium text-indigo-900">
                      <span>Uploading & Indexing...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-2 w-full bg-indigo-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                    <p className="text-xs text-indigo-400 text-center">Estimated time: 10s</p>
                  </div>
                ) : fileUploaded ? (
                  <div className="flex flex-col items-center text-green-600">
                    <CheckCircle2 size={48} className="mb-4 text-green-500" />
                    <p className="font-semibold text-lg">Your textbook is ready for AI tutoring!</p>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                      <UploadCloud className="text-indigo-600" size={32} />
                    </div>
                    <p className="font-medium text-indigo-900">Click to upload or drag & drop</p>
                    <p className="text-sm text-indigo-400 mt-1">PDF, DOCX up to 50MB</p>
                  </>
                )}
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button 
                  onClick={() => setStep(4)}
                  disabled={!fileUploaded}
                  className="flex-1 bg-indigo-600 text-white rounded-xl py-3 font-semibold hover:bg-indigo-700 transition disabled:opacity-50 flex justify-center items-center"
                >
                  Continue <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-fade-in text-center py-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Diagnostic Check</h3>
              <p className="text-gray-600 mb-8">
                To personalize your AI Tutor's difficulty, let's do a quick 5-question check.
              </p>
              
              {loading ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                  <p className="text-indigo-600 font-medium">Calibrating your AI Tutor...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Mock diagnostic for UI purposes */}
                  <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl text-left">
                    <p className="font-semibold text-gray-800 mb-4">1. What is the powerhouse of the cell?</p>
                    <div className="space-y-2">
                      <button onClick={() => setDiagnosticScore(0.8)} className={`w-full text-left p-3 border rounded-lg hover:bg-white bg-white/50 transition ${diagnosticScore === 0.8 ? 'border-indigo-600 ring-1 ring-indigo-600' : ''}`}>A. Nucleus</button>
                      <button onClick={() => setDiagnosticScore(1.0)} className={`w-full text-left p-3 border rounded-lg hover:bg-white bg-white/50 transition ${diagnosticScore === 1.0 ? 'border-indigo-600 ring-1 ring-indigo-600' : ''}`}>B. Mitochondria</button>
                    </div>
                  </div>
                  
                  {diagnosticScore !== null && (
                    <button 
                      onClick={() => handleDiagnosticComplete(diagnosticScore)}
                      className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transition transform hover:-translate-y-0.5"
                    >
                      Your AI tutor is ready. Start your first session now!
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
