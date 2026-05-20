import { useMicVAD } from '@ricky0123/vad-react'

// Convert Float32Array to WAV format
function encodeWAV(samples: Float32Array): Blob {
  const buffer = new ArrayBuffer(44 + samples.length * 2)
  const view = new DataView(buffer)

  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i))
    }
  }

  writeString(view, 0, 'RIFF')
  view.setUint32(4, 36 + samples.length * 2, true)
  writeString(view, 8, 'WAVE')
  writeString(view, 12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, 16000, true)
  view.setUint32(28, 16000 * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  writeString(view, 36, 'data')
  view.setUint32(40, samples.length * 2, true)

  let offset = 44
  for (let i = 0; i < samples.length; i++, offset += 2) {
    let s = Math.max(-1, Math.min(1, samples[i]))
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true)
  }

  return new Blob([view], { type: 'audio/wav' })
}

export function useVoiceSession(ws: WebSocket | null, isAISpeaking: boolean) {
  const vad = useMicVAD({
    startOnLoad: true,
    onSpeechStart: () => {
      console.log('User started speaking')
    },
    onSpeechEnd: async (audio: Float32Array) => {
      if (isAISpeaking) return; // Prevent interrupting AI while speaking
      
      console.log('User finished speaking, uploading...')
      const blob = encodeWAV(audio)
      
      const formData = new FormData()
      formData.append('file', blob, 'recording.wav')

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/voice/transcribe`, {
          method: 'POST',
          body: formData
        })
        
        const data = await res.json()
        const text = data.text

        if (text && text.trim().length > 0 && ws && ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'student_text', text }))
        }
      } catch (err) {
        console.error('Transcription error:', err)
      }
    },
    positiveSpeechThreshold: 0.8,
    minSpeechFrames: 3,
  })

  return vad
}
