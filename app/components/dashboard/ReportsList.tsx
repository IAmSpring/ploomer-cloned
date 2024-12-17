import React from 'react';
import { useSession } from 'next-auth/react';

interface Report {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  isPublic: boolean;
}

export default function ReportsList() {
  const { data: session } = useSession();
  const [reports, setReports] = React.useState<Report[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchReports() {
      try {
        const response = await fetch('/api/reports');
        if (response.ok) {
          const data = await response.json();
          setReports(data);
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, []);

  if (loading) {
    return <div className="animate-pulse">Loading reports...</div>;
  }

  if (reports.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No reports found</p>
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Your First Report
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{report.name}</h3>
              <p className="text-sm text-gray-500">{report.description}</p>
            </div>
            <span className={`px-2 py-1 rounded text-xs ${report.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {report.isPublic ? 'Public' : 'Private'}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Created: {new Date(report.createdAt).toLocaleDateString()}
          </div>
          <div className="mt-2 space-x-2">
            <button className="text-blue-500 hover:text-blue-700">View</button>
            <button className="text-blue-500 hover:text-blue-700">Edit</button>
            <button className="text-red-500 hover:text-red-700">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
} 