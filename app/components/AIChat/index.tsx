"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { chat, Tool, tools } from '@/app/services/openai'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
  toolCalls?: any[]
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      role: 'user',
      content: input
    }
    
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

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-lg shadow-xl flex flex-col">
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
                className={`max-w-[80%] rounded-lg p-3 ${
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
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD666]"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-[#FFD666] text-black rounded-lg hover:bg-[#FFC933] disabled:opacity-50"
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  )
} 