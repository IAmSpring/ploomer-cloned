"use client"

import { useEffect } from 'react'
import { ollamaService } from './services/ollama'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    ollamaService.initialize()
    return () => {
      ollamaService.cleanup()
    }
  }, [])

  return <SessionProvider>{children}</SessionProvider>
} 