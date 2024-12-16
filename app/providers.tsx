'use client'

import React, { useEffect } from 'react'
import { SessionProvider } from 'next-auth/react'
import { initDatadog } from '@/lib/datadog'
import { initPostHog } from '@/lib/posthog'
import { useSession } from 'next-auth/react'
import { trackUser } from '@/lib/analytics/datadog'

export function Providers({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user) {
      trackUser({
        id: session.user.id,
        email: session.user.email,
        name: session.user.name || undefined
      })
    }
  }, [session])

  useEffect(() => {
    initDatadog()
    initPostHog()
  }, [])

  return <SessionProvider>{children}</SessionProvider>
} 