"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { chat, Tool, tools } from '@/app/services/openai'
import { MicrophoneIcon, StopIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useAIChat } from '@/app/contexts/AIChatContext'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { DEMO_STEPS, DEMO_RESPONSES } from '@/app/constants/demo-steps'
import { DemoStep, DemoResponses } from '@/app/types/demo'
import { socketService } from '@/app/services/socket'
import { aiService } from '@/app/services/ai'

type MessageRole = 'user' | 'assistant' | 'system'

interface Message {
  role: MessageRole
  content: string
  toolCalls?: any[]
  isAudio?: boolean
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isWhisperReady, setIsWhisperReady] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recordingTimeoutRef = useRef<NodeJS.Timeout>()
  const { isOpen, setIsOpen, isDemoMode, stopDemo, demoProgress } = useAIChat()
  const router = useRouter()
  const { data: session } = useSession()
  const [voiceError, setVoiceError] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleDemoAction = async (step: DemoStep) => {
    if (step.action === 'login' && step.credentials && !session) {
      const { signIn } = await import('next-auth/react')
      try {
        const result = await signIn('credentials', {
          email: step.credentials.email,
          password: step.credentials.password,
          redirect: false
        })
        
        if (result?.error) {
          throw new Error(result.error)
        }
      } catch (error) {
        console.error('Demo login error:', error)
        setMessages(prev => [...prev, {
          role: 'system',
          content: DEMO_RESPONSES.error
        }])
        return
      }
    } else if (step.action === 'navigate' && step.path) {
      router.push(step.path)
    } else if (step.action === 'highlight' && step.selector) {
      const element = document.querySelector(step.selector)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        const overlay = document.createElement('div')
        overlay.className = 'highlight-overlay active'
        element.appendChild(overlay)
        setTimeout(() => overlay.remove(), 2000)
      }
    }
  }

  useEffect(() => {
    if (isDemoMode) {
      const currentStep = DEMO_STEPS[demoProgress.length]
      if (currentStep) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: currentStep.message
        }])
        if (!currentStep.waitForResponse) {
          handleDemoAction(currentStep)
        }
      }
    }
  }, [isDemoMode, demoProgress])

  useEffect(() => {
    socketService.connect()
    
    socketService.onMessage((message) => {
      setMessages(prev => [...prev, message])
    })

    return () => {
      socketService.disconnect()
    }
  }, [])

  useEffect(() => {
    const initAI = async () => {
      try {
        await aiService.initialize()
        setIsInitialized(true)
      } catch (error) {
        console.log('AI initialization error (expected in development):', error)
        // Still set as initialized to prevent loading state
        setIsInitialized(true)
      }
    }

    if (!isInitialized) {
      initAI()
    }
  }, [isInitialized])

  useEffect(() => {
    const checkWhisper = async () => {
      try {
        const response = await fetch('https://api.openai.com/v1/models/whisper-1', {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          }
        })
        setIsWhisperReady(response.ok)
        if (!response.ok) {
          setVoiceError('Voice input is currently unavailable')
        }
      } catch {
        setIsWhisperReady(false)
        setVoiceError('Voice input is currently unavailable')
      }
    }
    checkWhisper()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    try {
      setIsLoading(true)
      const newMessage: Message = { 
        role: 'user', 
        content: input 
      }
      setMessages(prev => [...prev, newMessage])
      setInput('')

      const response = await aiService.chat([...messages, newMessage])
      setMessages(prev => [...prev, {
        role: response.role as MessageRole,
        content: response.content
      }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        role: 'system' as MessageRole,
        content: 'Sorry, there was an error processing your request. Make sure Ollama is running locally in development.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const startRecording = async () => {
    try {
      setVoiceError(null)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      const chunks: Blob[] = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data)
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' })
        await handleAudioTranscription(audioBlob)
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
      setIsRecording(true)

      recordingTimeoutRef.current = setTimeout(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          stopRecording()
        }
      }, 5000)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      setVoiceError('Unable to access microphone. Please check your permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current)
      }
    }
  }

  const handleAudioTranscription = async (audioBlob: Blob) => {
    try {
      setIsLoading(true)
      
      const formData = new FormData()
      formData.append('file', audioBlob, 'audio.webm')
      formData.append('model', 'whisper-1')

      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        body: formData
      })

      const data = await response.json()
      
      if (data.text) {
        const userMessage: Message = {
          role: 'user',
          content: data.text,
          isAudio: true
        }
        
        setMessages(prev => [...prev, userMessage])
        
        const chatResponse = await chat([...messages, userMessage])
        
        if (chatResponse.choices[0].message.content) {
          const assistantMessage: Message = {
            role: 'assistant',
            content: chatResponse.choices[0].message.content
          }
          setMessages(prev => [...prev, assistantMessage])
        }
      }
    } catch (error) {
      console.error('Error transcribing audio:', error)
      const errorMessage: Message = {
        role: 'system',
        content: 'Sorry, there was an error processing your voice message.'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-lg shadow-xl flex flex-col"
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold">AI Setup Assistant</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close chat"
        >
          <XMarkIcon className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`message-bubble ${
                  message.isAudio ? 'audio' : ''
                } ${
                  message.role === 'user'
                    ? 'bg-[#FFD666] text-black'
                    : 'bg-gray-100'
                }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex flex-col gap-2">
          {voiceError && (
            <div className="text-sm text-red-500 px-2">
              {voiceError}
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD666]"
              disabled={isLoading || isRecording}
            />
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isLoading || !isWhisperReady}
              className={`p-2 rounded-lg transition-colors group relative ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : isWhisperReady
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              title={!isWhisperReady ? 'Voice input unavailable' : 'Record voice message'}
            >
              {isRecording ? (
                <StopIcon className="h-5 w-5" />
              ) : (
                <MicrophoneIcon className="h-5 w-5" />
              )}
              {!isWhisperReady && !voiceError && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Voice input unavailable
                </span>
              )}
            </button>
            <button
              type="submit"
              disabled={isLoading || isRecording}
              className="px-4 py-2 bg-[#FFD666] text-black rounded-lg hover:bg-[#FFC933] disabled:opacity-50"
            >
              {isLoading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  )
} 