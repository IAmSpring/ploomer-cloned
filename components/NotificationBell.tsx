'use client'

import React, { useState } from 'react'
import { Bell } from 'lucide-react'
import { useNotifications } from '@/contexts/NotificationContext'

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const { notifications, clearNotifications } = useNotifications()
  const hasUnread = notifications.length > 0

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full relative"
      >
        <Bell className="h-5 w-5" />
        {hasUnread && (
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Notifications</h3>
              {hasUnread && (
                <button
                  onClick={clearNotifications}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 ${
                    notification.type === 'error' ? 'bg-red-50' :
                    notification.type === 'warning' ? 'bg-yellow-50' :
                    notification.type === 'success' ? 'bg-green-50' :
                    'bg-blue-50'
                  }`}
                >
                  <p className="text-sm text-gray-800">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No new notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 