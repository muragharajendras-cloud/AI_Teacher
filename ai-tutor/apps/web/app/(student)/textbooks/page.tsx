'use client'

import { useState } from 'react'
import { Book, UploadCloud, CheckCircle2, Trash2, RefreshCcw, AlertCircle } from 'lucide-react'

// Mock Data
const MOCK_BOOKS = [
  { id: 1, title: 'NCERT Biology Class 10', subject: 'Biology', status: 'ready', pages: 312, indexed_at: '2026-05-10T14:30:00Z' },
  { id: 2, title: 'HC Verma Physics Vol 1', subject: 'Physics', status: 'processing', progress: 45, pages: 450, indexed_at: null },
  { id: 3, title: 'Mathematics RD Sharma', subject: 'Mathematics', status: 'failed', error: 'OCR failed on page 42', pages: 600, indexed_at: null }
]

export default function TextbooksPage() {
  const [books, setBooks] = useState<any[]>(MOCK_BOOKS)
  
  const handleDelete = (id: number) => {
    setBooks(books.filter(b => b.id !== id))
  }

  const handleReindex = (id: number) => {
    setBooks(books.map(b => b.id === id ? { ...b, status: 'processing', progress: 0, error: undefined } : b))
    
    // Simulate re-indexing
    setTimeout(() => {
      setBooks(current => current.map(b => b.id === id ? { ...b, status: 'processing', progress: 50 } : b))
    }, 2000)
    
    setTimeout(() => {
      setBooks(current => current.map(b => b.id === id ? { ...b, status: 'ready', progress: 100, indexed_at: new Date().toISOString() } : b))
    }, 4000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center">
              <Book className="mr-3 text-indigo-600" size={32} /> My Textbooks
            </h1>
            <p className="mt-2 text-gray-600">Upload your syllabus PDFs. Our AI reads them to personalize your tutoring.</p>
          </div>
          <button className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition flex items-center shadow-sm">
            <UploadCloud className="mr-2" size={20} /> Upload New PDF
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-6 font-bold">Textbook</th>
                  <th className="p-6 font-bold">Subject</th>
                  <th className="p-6 font-bold">Status</th>
                  <th className="p-6 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {books.map(book => (
                  <tr key={book.id} className="hover:bg-gray-50/50 transition">
                    <td className="p-6">
                      <p className="font-bold text-gray-900">{book.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{book.pages} pages</p>
                    </td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                        {book.subject}
                      </span>
                    </td>
                    <td className="p-6">
                      {book.status === 'ready' && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle2 size={16} className="mr-1.5" />
                          <span className="text-sm font-bold uppercase tracking-wider">Ready</span>
                        </div>
                      )}
                      
                      {book.status === 'processing' && (
                        <div className="w-48">
                          <div className="flex justify-between text-xs font-bold text-indigo-600 mb-1.5 uppercase tracking-wider">
                            <span>Indexing...</span>
                            <span>{book.progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-indigo-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${book.progress}%` }}></div>
                          </div>
                        </div>
                      )}
                      
                      {book.status === 'failed' && (
                        <div className="flex flex-col text-red-600">
                          <div className="flex items-center">
                            <AlertCircle size={16} className="mr-1.5" />
                            <span className="text-sm font-bold uppercase tracking-wider">Failed</span>
                          </div>
                          <p className="text-xs mt-1 text-red-400 font-medium">{book.error}</p>
                        </div>
                      )}
                    </td>
                    <td className="p-6 text-right space-x-3">
                      {(book.status === 'failed' || book.status === 'ready') && (
                        <button 
                          onClick={() => handleReindex(book.id)}
                          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                          title="Re-index"
                        >
                          <RefreshCcw size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(book.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {books.length === 0 && (
              <div className="p-12 text-center flex flex-col items-center">
                <Book className="text-gray-300 w-16 h-16 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No textbooks uploaded</h3>
                <p className="text-gray-500 max-w-sm mb-6">Upload your first syllabus PDF to activate your AI tutor.</p>
                <button className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition">
                  Upload PDF
                </button>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  )
}
