import React from 'react';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';

export default function AdminDashboard() {
  const { data: session } = useSession();

  if (!session?.user?.role || session.user.role !== 'admin') {
    return <p>Access denied. Admins only.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, {session.user.name}. Here you can manage the system.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">User Management</h2>
          {/* Add user management features here */}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">System Monitoring</h2>
          {/* Add system monitoring features here */}
        </div>
      </div>
    </div>
  );
} 