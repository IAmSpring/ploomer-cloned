'use client'

import React, { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

interface Activity {
  id: string
  type: string
  description: string
  timestamp: string
}

interface RecentActivityProps {
  userId: string
}

export default function RecentActivity({ userId }: RecentActivityProps) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch(`/api/activities?userId=${userId}`)
        const data = await response.json()
        setActivities(data)
      } catch (error) {
        console.error('Error fetching activities:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [userId])

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="px-6 py-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.type}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.description}
                  </p>
                </div>
                <span className="ml-auto text-sm text-gray-500">
                  {new Date(activity.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 py-4 text-center text-gray-500">
            No recent activity
          </div>
        )}
      </div>
    </div>
  )
} 