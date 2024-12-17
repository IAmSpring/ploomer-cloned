import React from 'react';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import UserManagement from './UserManagement';
import { UserRole } from '@/types/roles';

export default function AdminDashboard() {
  const { data: session } = useSession();

  if (!session?.user?.role || session.user.role !== UserRole.ADMIN) {
    return <p>Access denied. Admins only.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-8">Welcome, {session.user.name}. Here you can manage the system.</p>
      
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <UserManagement />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">System Monitoring</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Active Users</h3>
              <p className="text-2xl font-bold text-blue-600">--</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Total Reports</h3>
              <p className="text-2xl font-bold text-green-600">--</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Open Tickets</h3>
              <p className="text-2xl font-bold text-yellow-600">--</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 