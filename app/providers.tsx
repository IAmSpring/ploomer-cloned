'use client'

import { SessionProvider } from "next-auth/react"
import { useEffect } from "react"
import { datadogRum } from "@datadog/browser-rum"
import { initDatadog } from "@/lib/datadog"
import { useSession } from "next-auth/react"

function DatadogProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()

  useEffect(() => {
    initDatadog()
    if (session?.user) {
      datadogRum.setUser({
        id: session.user.id,
        email: session.user.email || undefined,
        name: session.user.name || undefined,
      })
    }
  }, [session])

  return <>{children}</>
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <DatadogProvider>
        {children}
      </DatadogProvider>
    </SessionProvider>
  )
} 