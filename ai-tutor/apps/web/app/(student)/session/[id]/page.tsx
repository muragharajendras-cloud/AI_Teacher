'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useVoiceSession } from '@/lib/voiceSession'

type Message = {
  role: 'student' | 'teacher'
  text: string
}

export default function SessionPage() {
  const params = useParams()
  const router = useRouter()
  const sessionId = params.id as string
  
  const [messages, setMessages] = useState<Message[]>([])
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [isAISpeaking, setIsAISpeaking] = useState(false)
  const [currentAIResponse, setCurrentAIResponse] = useState('')
  const [hasConsent, setHasConsent] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Audio playback queue
  const audioQueue = useRef<string[]>([])
  const isPlayingAudio = useRef(false)
  
  // Silence timeout
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Behavior monitoring
  const workerRef = useRef<Worker | null>(null)
  const incidentCooldown = useRef<{ [key: string]: number }>({})

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, currentAIResponse])

  // MediaPipe Worker Setup & Camera
  useEffect(() => {
    if (!hasConsent) return

    // 1. Setup Camera
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        }
      })
      .catch((err) => console.error("Camera error:", err))

    // 2. Setup Worker
    workerRef.current = new Worker(new URL('/workers/behaviorWorker.ts', window.location.origin))
    
    workerRef.current.onmessage = async (e) => {
      if (e.data.type === 'incident') {
        const kind = e.data.kind
        const now = Date.now()
        const lastFired = incidentCooldown.current[kind] || 0
        
        // 60-second cooldown per incident type
        if (now - lastFired > 60000) {
          incidentCooldown.current[kind] = now
          console.log(`Incident detected: ${kind}. Taking snapshot...`)
          
          if (videoRef.current && canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d')
            if (ctx) {
              // 320x240 snapshot
              ctx.drawImage(videoRef.current, 0, 0, 320, 240)
              canvasRef.current.toBlob(async (blob) => {
                if (!blob) return
                
                const formData = new FormData()
                formData.append('session_id', sessionId)
                formData.append('incident_type', kind)
                formData.append('file', blob, 'snapshot.jpg')
                
                try {
                  await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/behavior/incident`, {
                    method: 'POST',
                    body: formData
                  })
                  console.log(`Incident ${kind} uploaded to server.`)
                } catch (err) {
                  console.error("Incident upload failed:", err)
                }
              }, 'image/jpeg', 0.8)
            }
          }
        }
      }
    }

    // 3. Send frame to worker at 1fps
    const frameInterval = setInterval(() => {
      if (videoRef.current && canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d')
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0, 320, 240)
          const imageData = ctx.getImageData(0, 0, 320, 240)
          
          createImageBitmap(imageData).then((bitmap) => {
            workerRef.current?.postMessage({ type: 'process_frame', frame: bitmap }, [bitmap])
          })
        }
      }
    }, 1000)

    return () => {
      clearInterval(frameInterval)
      workerRef.current?.terminate()
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [hasConsent, sessionId])

  const connectWebSocket = useCallback(() => {
    if (!hasConsent) return null
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    const wsUrl = apiUrl.replace(/^http/, 'ws') + `/ws/session/${sessionId}`
    
    const websocket = new WebSocket(wsUrl)
    
    websocket.onopen = () => {
      console.log('Connected to session')
      setWs(websocket)
      
      const pingInterval = setInterval(() => {
        if (websocket.readyState === WebSocket.OPEN) {
          websocket.send(JSON.stringify({ type: 'ping' }))
        }
      }, 30000)
      
      websocket.addEventListener('close', () => clearInterval(pingInterval))
    }

    websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        
        if (data.type === 'chunk') {
          setIsAISpeaking(true)
          setCurrentAIResponse((prev) => prev + data.text)
        } 
        else if (data.type === 'audio') {
          audioQueue.current.push(data.data)
          playNextAudio()
        }
        else if (data.type === 'turn_end') {
          setMessages((prev) => {
            return [...prev, { role: 'teacher', text: currentAIResponse }]
          })
          setCurrentAIResponse('')
        }
      } catch (err) {
        console.error('WS parse error:', err)
      }
    }

    websocket.onclose = () => {
      console.log('WebSocket disconnected. Reconnecting in 2 seconds...')
      setWs(null)
      setTimeout(() => {
        connectWebSocket()
      }, 2000)
    }

    return websocket
  }, [sessionId, currentAIResponse, hasConsent])

  useEffect(() => {
    if (hasConsent) {
      const websocket = connectWebSocket()
      return () => {
        if (websocket) {
          websocket.onclose = null
          websocket.close()
        }
      }
    }
  }, [connectWebSocket, hasConsent])

  const playNextAudio = async () => {
    if (isPlayingAudio.current || audioQueue.current.length === 0) return
    
    isPlayingAudio.current = true
    setIsAISpeaking(true)
    
    const base64Audio = audioQueue.current.shift()
    if (!base64Audio) return
    
    try {
      if (base64Audio === "MOCK_BASE64_AUDIO_DATA") {
        await new Promise(r => setTimeout(r, 1000))
      } else {
        const audioData = `data:audio/mp3;base64,${base64Audio}`
        const audio = new Audio(audioData)
        await new Promise((resolve) => {
          audio.onended = resolve
          audio.play()
        })
      }
    } catch (e) {
      console.error("Audio playback failed", e)
    } finally {
      isPlayingAudio.current = false
      if (audioQueue.current.length > 0) {
        playNextAudio()
      } else {
        setIsAISpeaking(false)
        resetSilenceTimeout()
      }
    }
  }

  // Hook up VAD (only when consent given)
  const vad = useVoiceSession(ws, isAISpeaking)

  const resetSilenceTimeout = () => {
    if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current)
    silenceTimeoutRef.current = setTimeout(() => {
      if (ws && ws.readyState === WebSocket.OPEN && !vad.userSpeaking && !isAISpeaking) {
        console.log("8 seconds of silence, triggering WAIT state")
        ws.send(JSON.stringify({ type: 'silence_timeout' }))
      }
    }, 8000)
  }

  useEffect(() => {
    if (vad.userSpeaking) {
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current)
    } else if (!isAISpeaking && hasConsent) {
      resetSilenceTimeout()
    }
  }, [vad.userSpeaking, isAISpeaking, hasConsent])

  const endSession = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'end_session' }))
    }
    router.push(`/session/${sessionId}/summary`)
  }

  const handleConsent = () => {
    // In a real app, POST to /users/consent to update StudentProfile
    setHasConsent(true)
  }

  if (!hasConsent) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Camera Access Required</h2>
          <p className="mb-6 text-gray-600 text-sm">
            By clicking "I Agree", you consent to having your camera and microphone activated during this session.
            Your behavior is monitored for attention tracking. Raw video is processed entirely on your device and is NEVER sent to our servers.
            Low-resolution snapshots are only captured and sent to your parents if you look away for an extended period.
          </p>
          <button 
            onClick={handleConsent}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            I Agree — Start Session
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden relative">
      <div className="bg-red-600/90 text-white text-center py-1.5 text-xs font-bold uppercase tracking-widest absolute top-0 left-0 right-0 z-50">
        Camera active — behavior is being monitored
      </div>
      
      {/* Top Right PIP Webcam */}
      <div className="absolute top-12 right-4 md:right-8 z-40">
        <div className="w-4 h-4 rounded-full bg-green-500 md:hidden absolute -top-1 -right-1 border-2 border-black"></div>
        <div className="hidden md:block w-32 h-24 md:w-48 md:h-36 bg-gray-900 rounded-2xl overflow-hidden border-2 border-gray-800 shadow-2xl relative">
          <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
          <div className="absolute bottom-2 left-2 flex items-center space-x-1">
             <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] uppercase font-bold text-white drop-shadow-md">Rec</span>
          </div>
        </div>
      </div>
      
      {/* Hidden canvas for CV */}
      <canvas ref={canvasRef} width="320" height="240" className="hidden" />

      {/* Main Transcript Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 pb-32 max-w-4xl w-full mt-10">
        <div className="space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'student' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-5 rounded-3xl max-w-[85%] ${msg.role === 'student' ? 'bg-indigo-600/20 text-indigo-100 rounded-br-sm border border-indigo-500/30' : 'bg-gray-800/50 text-gray-100 rounded-bl-sm border border-gray-700/50'}`}>
                <div className="text-[10px] uppercase tracking-wider opacity-50 mb-2 font-bold">{msg.role === 'student' ? 'You' : 'AI Tutor'}</div>
                <div className="text-lg md:text-xl leading-relaxed">{msg.text}</div>
              </div>
            </div>
          ))}
          
          {currentAIResponse && (
            <div className="flex justify-start">
              <div className="p-5 rounded-3xl max-w-[85%] bg-gray-800/50 text-gray-100 rounded-bl-sm border border-gray-700/50 backdrop-blur-sm">
                <div className="text-[10px] uppercase tracking-wider opacity-50 mb-2 font-bold">AI Tutor</div>
                <div className="text-lg md:text-xl leading-relaxed">{currentAIResponse}<span className="inline-block w-2 h-5 ml-1 bg-white animate-pulse"></span></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-10" />
        </div>
      </main>

      {/* Bottom Waveform & Controls Area */}
      <footer className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
             {/* Waveform Visualization (Mock) */}
             <div className="flex items-center space-x-1 h-12 mb-2">
               {[...Array(15)].map((_, i) => (
                 <div 
                   key={i} 
                   className={`w-1.5 rounded-full transition-all duration-150 ${
                     vad.userSpeaking ? 'bg-indigo-500 h-full animate-bounce' : 
                     isAISpeaking ? 'bg-blue-400 h-8 animate-pulse' : 
                     'bg-gray-700 h-2'
                   }`}
                   style={{ 
                     animationDelay: `${i * 0.05}s`,
                     height: vad.userSpeaking ? `${Math.max(20, Math.random() * 100)}%` : isAISpeaking ? `${Math.max(40, Math.random() * 80)}%` : '8px'
                   }}
                 ></div>
               ))}
             </div>
             <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
               {vad.userSpeaking ? 'Listening...' : isAISpeaking ? 'Speaking...' : 'Waiting for you to speak'}
             </span>
          </div>

          <button 
            onClick={endSession}
            className="px-6 py-3 bg-red-600/20 text-red-400 font-bold rounded-xl border border-red-500/30 hover:bg-red-600/40 hover:text-white transition shadow-lg"
          >
            End Session
          </button>
        </div>
      </footer>
    </div>
  )
}
