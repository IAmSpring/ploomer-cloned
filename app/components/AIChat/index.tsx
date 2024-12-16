"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { chat, Tool, tools } from '@/app/services/openai'
import { MicrophoneIcon, StopIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid'
import { VolumeVisualizer } from './VolumeVisualizer'
import { useAIChat } from '@/app/contexts/AIChatContext'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { DEMO_STEPS, DEMO_RESPONSES } from '@/app/constants/demo-steps'
import { DemoStep, DemoResponses } from '@/app/types/demo'
import { socketService } from '@/app/services/socket'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
  toolCalls?: any[]
  isAudio?: boolean
}

interface AudioVisualizerProps {
  isRecording: boolean
}

const AudioVisualizer = ({ isRecording }: AudioVisualizerProps) => {
  const bars = 5
  const controls = useAnimation()

  useEffect(() => {
    if (isRecording) {
      controls.start(i => ({
        scaleY: [1, 2, 1],
        transition: {
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: i * 0.1
        }
      }))
    } else {
      controls.stop()
      controls.set({ scaleY: 1 })
    }
  }, [isRecording, controls])

  return (
    <div className="flex items-center gap-0.5 h-5">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          animate={controls}
          className="w-1 h-full bg-red-500 origin-bottom"
          style={{ opacity: 0.7 + (i * 0.1) }}
        />
      ))}
    </div>
  )
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null)
  const { isOpen, setIsOpen, isDemoMode, stopDemo, demoProgress } = useAIChat()
  const router = useRouter()
  const { data: session } = useSession()

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = {
      role: 'user' as const,
      content: input,
      timestamp: Date.now()
    }

    socketService.sendMessage(input)
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await chat(messages)
      
      if (response.choices[0].message.tool_calls) {
        const toolCalls = response.choices[0].message.tool_calls
        for (const toolCall of toolCalls) {
          const tool = tools.find(t => t.name === toolCall.function.name)
          if (tool) {
            try {
              const args = JSON.parse(toolCall.function.arguments)
              const result = await tool.execute(args)
              const toolMessage: Message = {
                role: 'system',
                content: `${result}`
              }
              setMessages(prev => [...prev, toolMessage])
            } catch (error) {
              console.error('Tool execution error:', error)
              const errorMessage: Message = {
                role: 'system',
                content: 'Sorry, there was an error executing that action.'
              }
              setMessages(prev => [...prev, errorMessage])
            }
          }
        }
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.choices[0].message.content || ''
      }
      setMessages(prev => [...prev, assistantMessage])

    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        role: 'system',
        content: 'Sorry, there was an error processing your request.'
      }
      setMessages(prev => [...prev, errorMessage])
    }

    setIsLoading(false)
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setAudioStream(stream)
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setAudioBlob(audioBlob)
        await handleAudioTranscription(audioBlob)
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop())
        setAudioStream(null)
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
      setAudioBlob(null)
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
      <div className="p-4 border-b">
        <h3 className="font-semibold">AI Setup Assistant</h3>
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
        <div className="flex gap-2">
          {isRecording && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <div className="recording-indicator">
                <div className="relative">
                  <div className="wave-container px-2 py-1">
                    <VolumeVisualizer 
                      isRecording={isRecording} 
                      stream={audioStream}
                    />
                    <div className="wave opacity-30" />
                  </div>
                </div>
                <span className="ml-2 text-white/90">Recording...</span>
              </div>
            </div>
          )}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isRecording ? "Recording..." : "Ask me anything..."}
            className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD666] transition-all ${
              isRecording ? 'bg-gray-50' : ''
            }`}
            disabled={isLoading || isRecording}
          />
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-2 rounded-lg transition-all ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 text-white recording-pulse'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            disabled={isLoading}
          >
            <div className="relative">
              {isRecording ? (
                <StopIcon className="h-5 w-5" />
              ) : (
                <MicrophoneIcon className="h-5 w-5" />
              )}
              {isRecording && (
                <motion.div
                  className="absolute inset-0 rounded-lg bg-red-500"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.1, 0.2],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              )}
            </div>
          </button>
          <button
            type="submit"
            disabled={isLoading || isRecording}
            className="px-4 py-2 bg-[#FFD666] text-black rounded-lg hover:bg-[#FFC933] disabled:opacity-50 transition-colors"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
              />
            ) : (
              'Send'
            )}
          </button>
        </div>
      </form>
    </motion.div>
  )
} 