'use client';

interface Activity {
  time: string;
  endpoint: string;
  requests: number;
  status: 'success' | 'failed';
}

interface RecentActivitiesProps {
  activities: Activity[];
}

export default function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <div className="bg-black/20 backdrop-blur-2xl rounded-lg border border-white/20 p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
        
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-black/40 border border-gray-700/50 rounded-lg hover:border-gray-600/50 transition-all">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <div className="text-white font-medium">{activity.endpoint}</div>
                  <div className="text-xs text-gray-400">{activity.time}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-semibold">
                  {activity.requests}
                </div>
                <div className={`text-xs ${
                  activity.status === 'success' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {activity.status === 'success' ? 'Success' : 'Failed'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
