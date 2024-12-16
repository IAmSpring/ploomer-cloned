import { Card, Title, Text } from "@tremor/react"
import DashboardLayout from "../components/dashboard/layout"

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome to your dashboard overview.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <Title>Total Users</Title>
            <Text>1,234</Text>
          </Card>
          <Card>
            <Title>Active Sessions</Title>
            <Text>123</Text>
          </Card>
          <Card>
            <Title>Revenue</Title>
            <Text>$12,345</Text>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <Title>Recent Activity</Title>
            {/* Add activity list or chart here */}
          </Card>
          <Card>
            <Title>Performance</Title>
            {/* Add performance metrics or chart here */}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
} 