"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface DemoState {
  currentStep: number
  completedSteps: string[]
  lastLocation: string
}

interface AIChatContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isDemoMode: boolean
  startDemo: () => void
  stopDemo: () => void
  demoProgress: string[]
  hasOpenAI: boolean
  demoState: DemoState
  setDemoState: (state: DemoState) => void
  resetDemo: () => void
  continueDemo: () => void
}

const initialDemoState: DemoState = {
  currentStep: 0,
  completedSteps: [],
  lastLocation: '/'
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined)

export function AIChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [demoProgress, setDemoProgress] = useState<string[]>([])
  const [hasOpenAI, setHasOpenAI] = useState(false)
  const [demoState, setDemoState] = useState<DemoState>(initialDemoState)
  const { data: session } = useSession()

  useEffect(() => {
    setHasOpenAI(!!process.env.NEXT_PUBLIC_OPENAI_API_KEY)
  }, [])

  const startDemo = () => {
    setIsDemoMode(true)
    setDemoProgress([])
    setIsOpen(true)
    setDemoState(initialDemoState)
  }

  const stopDemo = () => {
    setIsDemoMode(false)
    setDemoProgress([])
  }

  const resetDemo = () => {
    setDemoState(initialDemoState)
  }

  const continueDemo = () => {
    if (demoState.lastLocation !== window.location.pathname) {
      setDemoState(prev => ({
        ...prev,
        lastLocation: window.location.pathname
      }))
    }
  }

  return (
    <AIChatContext.Provider value={{
      isOpen,
      setIsOpen,
      isDemoMode,
      startDemo,
      stopDemo,
      demoProgress,
      hasOpenAI,
      demoState,
      setDemoState,
      resetDemo,
      continueDemo
    }}>
      {children}
    </AIChatContext.Provider>
  )
}

export const useAIChat = () => {
  const context = useContext(AIChatContext)
  if (context === undefined) {
    throw new Error('useAIChat must be used within an AIChatProvider')
  }
  return context
} 