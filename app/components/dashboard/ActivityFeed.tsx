import React from 'react';
import { useSession } from 'next-auth/react';

interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  userId: string;
}

export default function ActivityFeed() {
  const { data: session } = useSession();
  const [activities, setActivities] = React.useState<Activity[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch('/api/activities');
        if (response.ok) {
          const data = await response.json();
          setActivities(data);
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, []);

  if (loading) {
    return <div className="animate-pulse">Loading activities...</div>;
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            activity.type === 'pageview' ? 'bg-blue-100' :
            activity.type === 'click' ? 'bg-green-100' :
            activity.type === 'signup' ? 'bg-purple-100' :
            'bg-gray-100'
          }`}>
            <span className="text-xs">
              {activity.type.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm">{activity.description}</p>
            <p className="text-xs text-gray-500">
              {new Date(activity.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
      {activities.length >= 10 && (
        <button className="w-full text-center text-sm text-blue-500 hover:text-blue-700 py-2">
          Load More
        </button>
      )}
    </div>
  );
} 