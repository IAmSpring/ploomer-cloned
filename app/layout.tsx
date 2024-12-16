import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { NotificationProvider } from '@/contexts/NotificationContext'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { initDatadog } from '@/lib/datadog'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SaaS Platform',
  description: 'Modern SaaS Platform',
}

if (process.env.NODE_ENV === 'production') {
  initDatadog()
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NotificationProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </NotificationProvider>
        </Providers>
      </body>
    </html>
  )
} 