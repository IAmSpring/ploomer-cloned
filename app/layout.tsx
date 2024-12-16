import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'swiper/css'
import 'swiper/css/autoplay'
import './globals.css'
import { Providers } from './providers'
import { NotificationProvider } from '@/contexts/NotificationContext'
import Navbar from './components/navbar'
import Footer from "@/app/components/footer"
import { initDatadog } from '@/lib/datadog'
import TextAnimation from './components/TextAnimation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ploomber Clone',
  description: 'A clone of the Ploomber website',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body suppressHydrationWarning>
        <TextAnimation />
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