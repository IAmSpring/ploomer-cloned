"use client"

import { motion } from 'framer-motion'
import { useAIChat } from '@/app/contexts/AIChatContext'
import { ChatBubbleLeftIcon, XMarkIcon } from '@heroicons/react/24/solid'

export function MinimizedChat() {
  const { 
    setIsOpen, 
    hasOpenAI, 
    startDemo, 
    isDemoMode,
    demoState 
  } = useAIChat()

  const handleClick = () => {
    if (hasOpenAI) {
      setIsOpen(true)
    } else if (!isDemoMode) {
      startDemo()
    } else {
      setIsOpen(true)
    }
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 flex items-center gap-2"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      {isDemoMode && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white px-3 py-1.5 rounded-full shadow-lg text-sm"
        >
          Demo Mode {demoState.currentStep + 1}/8
        </motion.div>
      )}
      <motion.button
        onClick={handleClick}
        className="p-4 bg-[#FFD666] rounded-full shadow-lg hover:bg-[#FFC933] transition-colors relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChatBubbleLeftIcon className="h-6 w-6 text-black" />
        {isDemoMode && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
        )}
      </motion.button>
    </motion.div>
  )
} 