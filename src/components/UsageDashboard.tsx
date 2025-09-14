'use client';

import { useState, useEffect } from 'react';
import Charts from './Charts';
import RecentActivities from './RecentActivities';
import { getMyPackages, getUsageStats } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface UserPackage {
  id: number;
  package: {
    id: number;
    name: string;
    request_limit: number;
  };
  renews_at?: string;
}

interface TokenStat {
  requests_used: number;
}

interface ApiError {
  response?: {
    status?: number;
    data?: {
      detail?: string;
    };
  };
}

export default function UsageDashboard() {
  const { isLoggedIn, logout } = useAuth();
  const [currentPlan, setCurrentPlan] = useState({
    name: 'Loading...',
    totalRequests: 0,
    usedRequests: 0,
    remainingRequests: 0,
    resetDate: 'N/A',
    status: 'active'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false);
      setCurrentPlan(prev => ({ ...prev, name: 'Please log in' }));
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [packagesResponse, statsResponse] = await Promise.all([
          getMyPackages(),
          getUsageStats(),
        ]);

        const packages: UserPackage[] = packagesResponse;
        const stats: TokenStat[] = statsResponse;

        if (packages && packages.length > 0) {
          const totalRequests = packages.reduce((acc, p) => acc + p.package.request_limit, 0);
          const usedRequests = stats.reduce((acc, s) => acc + s.requests_used, 0);
          
          setCurrentPlan({
            name: packages[0].package.name,
            totalRequests,
            usedRequests,
            remainingRequests: totalRequests - usedRequests,
            resetDate: packages[0].renews_at || 'N/A',
            status: 'active'
          });
        } else {
          setCurrentPlan(prev => ({ ...prev, name: 'No active plan found', totalRequests: 0 }));
        }
      } catch (err) {
        const apiError = err as ApiError;
        if (apiError.response?.status === 401) {
          logout();
        } else {
          setError('Failed to load usage data.');
        }
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn, logout]);

  // Mock data - in production this would come from the API
  const [usageData] = useState([
    { date: '22', requests: 2800, successful: 2650, failed: 150 },
    { date: '23', requests: 3200, successful: 3100, failed: 100 },
    { date: '24', requests: 2900, successful: 2850, failed: 50 },
    { date: '25', requests: 4100, successful: 4000, failed: 100 },
    { date: '26', requests: 3800, successful: 3700, failed: 100 },
    { date: '27', requests: 4200, successful: 4100, failed: 100 },
    { date: '28', requests: 1850, successful: 1800, failed: 50 },
  ]);

  const [hourlyData] = useState([
    { hour: '00', requests: 45 },
    { hour: '03', requests: 23 },
    { hour: '06', requests: 67 },
    { hour: '09', requests: 234 },
    { hour: '12', requests: 345 },
    { hour: '15', requests: 289 },
    { hour: '18', requests: 456 },
    { hour: '21', requests: 234 },
  ]);

  const [endpointData] = useState([
    { name: 'Search', value: 45.2, requests: 30420, color: '#10B981' },
    { name: 'Images', value: 28.7, requests: 19350, color: '#3B82F6' },
    { name: 'News', value: 16.8, requests: 11320, color: '#F59E0B' },
    { name: 'Videos', value: 9.3, requests: 6330, color: '#EF4444' }
  ]);

  const [recentActivity] = useState([
    { time: '14:32', endpoint: 'Search API', requests: 45, status: 'success' as 'success' | 'failed' },
    { time: '14:28', endpoint: 'Images API', requests: 23, status: 'success' as 'success' | 'failed' },
    { time: '14:25', endpoint: 'News API', requests: 67, status: 'success' as 'success' | 'failed' },
    { time: '14:22', endpoint: 'Search API', requests: 12, status: 'failed' as 'success' | 'failed' },
    { time: '14:18', endpoint: 'Videos API', requests: 34, status: 'success' as 'success' | 'failed' },
  ]);

  const [timeFilter, setTimeFilter] = useState('7days');

  const getUsagePercentage = () => {
    if (currentPlan.totalRequests === 0) return 0;
    return Math.round((currentPlan.usedRequests / currentPlan.totalRequests) * 100);
  };


  const getStatusColor = (percentage: number): string => {
    if (percentage >= 90) return 'text-red-400';
    if (percentage >= 75) return 'text-orange-400';
    if (percentage >= 50) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getDaysUntilReset = (): string => {
    if (currentPlan.resetDate === 'N/A' || loading) return 'N/A';
    const resetDate = new Date(currentPlan.resetDate);
    const today = new Date();
    const diffTime = resetDate.getTime() - today.getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return days.toString();
  };

  return (
    <div className="bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 leading-tight">
                Usage <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">Dashboard</span>
              </h1>
              <p className="text-gray-400 text-sm">
                Monitor your API consumption and track real-time metrics
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeFilter}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTimeFilter(e.target.value)}
                className="px-3 py-2 bg-black/30 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-gray-400 transition-all"
              >
                <option value="24h">Last 24 hours</option>
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Plan Overview - Redesigned */}
        <div className="bg-black/20 backdrop-blur-2xl rounded-xl border border-white/20 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 p-8">
            {loading && <div className="text-white text-center">Loading...</div>}
            {error && <div className="text-red-400 text-center">{error}</div>}
            
            {!loading && !isLoggedIn && !error && (
              <div className="text-center text-gray-400">
                Please log in to see your usage statistics.
              </div>
            )}

            {!loading && !error && isLoggedIn && currentPlan.totalRequests > 0 && (
              <>
                {/* Plan Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{currentPlan.name}</h2>
                      <p className="text-gray-400 text-sm">
                        {currentPlan.resetDate !== 'N/A' ? `Renewal in ${getDaysUntilReset()} days` : 'No renewal date'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">
                      {currentPlan.totalRequests > 0 ? `${getUsagePercentage()}%` : '...'}
                    </div>
                    <div className="text-sm text-gray-400">used</div>
                  </div>
                </div>

                {/* Usage Progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-300 font-medium">Plan Progress</span>
                    <span className={`font-medium ${getStatusColor(getUsagePercentage())}`}>
                      {currentPlan.usedRequests.toLocaleString()} / {currentPlan.totalRequests.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-800/50 rounded-full h-4 backdrop-blur-sm border border-gray-700/50">
                    <div 
                      className={`h-4 rounded-full transition-all duration-500 bg-gradient-to-r ${
                        getUsagePercentage() >= 90 ? 'from-red-500 to-red-400' :
                        getUsagePercentage() >= 75 ? 'from-orange-500 to-orange-400' :
                        getUsagePercentage() >= 50 ? 'from-yellow-500 to-yellow-400' :
                        'from-green-500 to-green-400'
                      }`}
                      style={{ width: `${getUsagePercentage()}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-black/30 rounded-lg border border-gray-700/50">
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      {currentPlan.usedRequests.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">Used Requests</div>
                  </div>
                  <div className="text-center p-4 bg-black/30 rounded-lg border border-gray-700/50">
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                      {currentPlan.remainingRequests.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">Available Requests</div>
                  </div>
                  <div className="text-center p-4 bg-black/30 rounded-lg border border-gray-700/50">
                    <div className="text-2xl font-bold text-white mb-1">97.8%</div>
                    <div className="text-sm text-gray-400">Success Rate</div>
                  </div>
                </div>
              </>
            )}
            {!loading && !error && isLoggedIn && currentPlan.totalRequests === 0 && (
              <div className="text-center text-gray-400">No active plan found.</div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { 
              title: 'Today', 
              value: usageData[usageData.length - 1]?.requests.toLocaleString() || '0',
              subtitle: 'requests',
              trend: '+12%',
              color: 'text-blue-400',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              )
            },
            { 
              title: 'Avg/Hour', 
              value: Math.round(usageData[usageData.length - 1]?.requests / 24 || 0).toString(),
              subtitle: 'requests',
              trend: '+8%',
              color: 'text-green-400',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )
            },
            { 
              title: 'Daily Peak', 
              value: Math.max(...usageData.map(d => d.requests)).toLocaleString(),
              subtitle: 'requests',
              trend: 'Yesterday',
              color: 'text-orange-400',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              )
            },
            { 
              title: 'Endpoints', 
              value: '4',
              subtitle: 'active',
              trend: '100%',
              color: 'text-purple-400',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              )
            }
          ].map((stat, index) => (
            <div key={index} className="bg-black/20 backdrop-blur-2xl rounded-lg border border-white/20 p-4 relative overflow-hidden group hover:border-white/30 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className={`${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="text-xs text-green-400 font-medium">{stat.trend}</div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.title}</div>
              </div>
            </div>
          ))}
        </div>

        <Charts usageData={usageData} hourlyData={hourlyData} endpointData={endpointData} />
        <RecentActivities activities={recentActivity} />
      </div>
    </div>
  );
}
