import React from 'react';
import { useSession } from 'next-auth/react';
import { UserRole } from '@prisma/client';
import ReportsList from './ReportsList';
import ActivityFeed from './ActivityFeed';
import TicketsList from './TicketsList';

export default function UserDashboard() {
  const { data: session } = useSession();

  if (!session?.user || session.user.role !== UserRole.USER) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">My Dashboard</h1>
      <p className="mb-8">Welcome back, {session.user.name || session.user.email}!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">My Reports</h2>
          <ReportsList />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ActivityFeed />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">My Tickets</h2>
          <TicketsList />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Create New Report
            </button>
            <button className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
              Submit Ticket
            </button>
            <button className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 