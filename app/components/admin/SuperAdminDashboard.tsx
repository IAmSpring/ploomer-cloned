import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { UserRole } from '@/types/roles'
import UserManagement from './UserManagement'

interface SystemStats {
  totalUsers: number
  activeUsers: number
  totalReports: number
  systemHealth: {
    database: string
    redis: string
    api: string
  }
}

export default function SuperAdminDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<SystemStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSystemStats() {
      try {
        const [usersRes, healthRes] = await Promise.all([
          fetch('/api/admin/users'),
          fetch('/api/health')
        ])

        if (usersRes.ok && healthRes.ok) {
          const users = await usersRes.json()
          const health = await healthRes.json()

          setStats({
            totalUsers: users.length,
            activeUsers: users.filter((u: any) => u.lastLoginAt).length,
            totalReports: 0, // TODO: Implement reports count
            systemHealth: {
              database: health.services.database,
              redis: health.services.redis,
              api: health.status
            }
          })
        }
      } catch (error) {
        console.error('Error fetching system stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSystemStats()
  }, [])

  if (!session?.user || session.user.role !== UserRole.SUPER_ADMIN) {
    return <div>Access denied. Super Admin only.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Super Admin Dashboard</h1>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-2xl">{stats?.totalUsers || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Active Users</h3>
          <p className="text-2xl">{stats?.activeUsers || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Reports</h3>
          <p className="text-2xl">{stats?.totalReports || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">System Health</h3>
          <div className="space-y-2">
            <p>
              Database:{' '}
              <span className={stats?.systemHealth.database === 'connected' ? 'text-green-500' : 'text-red-500'}>
                {stats?.systemHealth.database || 'Unknown'}
              </span>
            </p>
            <p>
              Redis:{' '}
              <span className={stats?.systemHealth.redis === 'connected' ? 'text-green-500' : 'text-red-500'}>
                {stats?.systemHealth.redis || 'Unknown'}
              </span>
            </p>
            <p>
              API:{' '}
              <span className={stats?.systemHealth.api === 'healthy' ? 'text-green-500' : 'text-red-500'}>
                {stats?.systemHealth.api || 'Unknown'}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* User Management */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">User Management</h2>
        <UserManagement />
      </div>

      {/* System Configuration */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">System Configuration</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Environment</h3>
            <p className="text-gray-600">
              Mode: <span className="font-semibold">{process.env.NODE_ENV}</span>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">API Configuration</h3>
            <p className="text-gray-600">
              Base URL: <span className="font-semibold">{process.env.NEXT_PUBLIC_APP_URL}</span>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Actions</h3>
            <div className="space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Clear Cache
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Run Migrations
              </button>
              <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                System Backup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 