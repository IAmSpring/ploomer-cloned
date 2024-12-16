'use client'

import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import NotificationBell from '@/components/NotificationBell'

export default function DashboardNav() {
  const { data: session } = useSession()

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-lg font-semibold">Dashboard</span>
        </div>
        
        <div className="flex items-center gap-4">
          <NotificationBell />
          
          <div className="flex items-center gap-2">
            {session?.user?.image && (
              <img
                src={session.user.image}
                alt={session.user.name || ''}
                className="w-8 h-8 rounded-full"
              />
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium">{session?.user?.name}</span>
              <button
                onClick={() => signOut()}
                className="text-sm text-gray-500 hover:text-gray-700 text-left"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 