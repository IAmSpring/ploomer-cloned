import React from 'react';
import { useSession } from 'next-auth/react';

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
}

export default function TicketsList() {
  const { data: session } = useSession();
  const [tickets, setTickets] = React.useState<Ticket[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await fetch('/api/tickets');
        if (response.ok) {
          const data = await response.json();
          setTickets(data);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTickets();
  }, []);

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600';
      case 'high':
        return 'text-orange-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return <div className="animate-pulse">Loading tickets...</div>;
  }

  if (tickets.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No tickets found</p>
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create New Ticket
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <div key={ticket.id} className="border rounded-lg p-4 hover:bg-gray-50">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{ticket.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{ticket.description}</p>
            </div>
            <div className="flex space-x-2">
              <span className={`px-2 py-1 rounded text-xs ${getStatusColor(ticket.status)}`}>
                {ticket.status.replace('_', ' ').toUpperCase()}
              </span>
              <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500 flex justify-between">
            <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
            <span>Updated: {new Date(ticket.updatedAt).toLocaleDateString()}</span>
          </div>
          <div className="mt-2 space-x-2">
            <button className="text-blue-500 hover:text-blue-700">View Details</button>
            <button className="text-blue-500 hover:text-blue-700">Update Status</button>
          </div>
        </div>
      ))}
    </div>
  );
} 