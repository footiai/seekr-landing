'use client';

import { useState } from 'react';

interface UsageDataItem {
  date: string;
  requests: number;
  successful: number;
  failed: number;
}

interface HourlyDataItem {
  hour: string;
  requests: number;
}

interface EndpointDataItem {
  name: string;
  value: number;
  requests: number;
  color: string;
}


interface CustomLineChartProps {
  data: UsageDataItem[];
  height?: number;
}

interface CustomBarChartProps {
  data: HourlyDataItem[];
  height?: number;
}

interface CustomDonutChartProps {
  data: EndpointDataItem[];
  size?: number;
}

export default function UsageDashboard() {
  // Mock data - in production this would come from the API
  const [currentPlan] = useState({
    name: 'Pro Plan',
    totalRequests: 100000,
    usedRequests: 67420,
    remainingRequests: 32580,
    resetDate: '2025-09-27',
    status: 'active'
  });

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
    { time: '14:32', endpoint: 'Search API', requests: 45, status: 'success' },
    { time: '14:28', endpoint: 'Images API', requests: 23, status: 'success' },
    { time: '14:25', endpoint: 'News API', requests: 67, status: 'success' },
    { time: '14:22', endpoint: 'Search API', requests: 12, status: 'failed' },
    { time: '14:18', endpoint: 'Videos API', requests: 34, status: 'success' },
  ]);

  const [timeFilter, setTimeFilter] = useState('7days');

  const getUsagePercentage = () => {
    return Math.round((currentPlan.usedRequests / currentPlan.totalRequests) * 100);
  };


  const getStatusColor = (percentage: number): string => {
    if (percentage >= 90) return 'text-red-400';
    if (percentage >= 75) return 'text-orange-400';
    if (percentage >= 50) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getDaysUntilReset = (): number => {
    const resetDate = new Date(currentPlan.resetDate);
    const today = new Date();
    const diffTime = resetDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Custom Line Chart Component
  const CustomLineChart = ({ data, height = 200 }: CustomLineChartProps) => {
    const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
    const maxValue = Math.max(...data.map(d => d.successful));
    const points = data.map((d, i) => ({
      x: (i / (data.length - 1)) * 100,
      y: 100 - (d.successful / maxValue) * 80,
      data: d
    }));

    const pathD = points.reduce((path, point, i) => {
      return path + (i === 0 ? `M ${point.x},${point.y}` : ` L ${point.x},${point.y}`);
    }, '');

    return (
      <div className="relative" style={{ height }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[20, 40, 60, 80].map(y => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#374151" strokeWidth="0.2" strokeDasharray="2,2" />
          ))}
          
          {/* Area under curve */}
          <path
            d={`${pathD} L 100,100 L 0,100 Z`}
            fill="url(#areaGradient)"
          />
          
          {/* Main line */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          
          {/* Data points */}
          {points.map((point, i) => (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r={hoveredPoint === i ? "1.2" : "0.8"}
              fill="#10B981"
              className="opacity-80 cursor-pointer transition-all duration-200"
              vectorEffect="non-scaling-stroke"
              onMouseEnter={() => setHoveredPoint(i)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}
        </svg>
        
        {/* Tooltip */}
        {hoveredPoint !== null && (
          <div 
            className="absolute bg-black/90 text-white text-xs px-3 py-2 rounded-lg border border-gray-600 pointer-events-none z-10"
            style={{
              left: `${points[hoveredPoint].x}%`,
              top: `${points[hoveredPoint].y - 10}%`,
              transform: 'translate(-50%, -100%)'
            }}
          >
            <div className="font-medium">{points[hoveredPoint].data.successful.toLocaleString()} successful</div>
            <div className="text-gray-400">Day {points[hoveredPoint].data.date}</div>
          </div>
        )}
        
        {/* Labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-gray-500">
          {data.map((d, i) => (
            <span key={i}>{d.date}</span>
          ))}
        </div>
      </div>
    );
  };

  // Custom Bar Chart Component
  const CustomBarChart = ({ data, height = 160 }: CustomBarChartProps) => {
    const [hoveredBar, setHoveredBar] = useState<number | null>(null);
    const maxValue = Math.max(...data.map(d => d.requests));
    
    return (
      <div className="relative" style={{ height }}>
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[25, 50, 75].map(y => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#374151" strokeWidth="0.2" strokeDasharray="2,2" />
          ))}
          
          {/* Bars */}
          {data.map((d, i) => {
            const barWidth = 80 / data.length;
            const barSpacing = 20 / (data.length + 1);
            const x = barSpacing + i * (barWidth + barSpacing / data.length);
            const heightPercent = (d.requests / maxValue) * 80;
            const y = 100 - heightPercent - 10;
            
            return (
              <rect
                key={i}
                x={x}
                y={y}
                width={barWidth}
                height={heightPercent}
                fill="url(#barGradient)"
                className="cursor-pointer transition-all duration-200"
                opacity={hoveredBar === i ? 1 : 0.8}
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
                rx="1"
              />
            );
          })}
        </svg>
        
        {/* Tooltip */}
        {hoveredBar !== null && (
          <div 
            className="absolute bg-black/90 text-white text-xs px-3 py-2 rounded-lg border border-gray-600 pointer-events-none z-10"
            style={{
              left: `${12 + hoveredBar * (80 / data.length)}%`,
              top: `${100 - (data[hoveredBar].requests / maxValue) * 80 - 15}%`,
              transform: 'translate(-50%, -100%)'
            }}
          >
            <div className="font-medium">{data[hoveredBar].requests} requests</div>
            <div className="text-gray-400">{data[hoveredBar].hour}:00</div>
          </div>
        )}
        
        {/* Labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-6 text-xs text-gray-500">
          {data.map((d, i) => (
            <span key={i}>{d.hour}h</span>
          ))}
        </div>
      </div>
    );
  };

  // Custom Donut Chart
  const CustomDonutChart = ({ data, size = 160 }: CustomDonutChartProps) => {
    const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;
    const strokeWidth = 20;
    const radius = (size / 2) - strokeWidth;
    const circumference = 2 * Math.PI * radius;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <defs>
            {data.map((item, index) => (
              <linearGradient key={index} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={item.color} stopOpacity="0.8" />
                <stop offset="100%" stopColor={item.color} stopOpacity="0.6" />
              </linearGradient>
            ))}
          </defs>
          
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#374151"
            strokeWidth={strokeWidth}
            fill="none"
            opacity="0.3"
          />
          
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -((cumulativePercentage / 100) * circumference);
            
            cumulativePercentage += percentage;
            
            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={`url(#gradient-${index})`}
                strokeWidth={hoveredSegment === index ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                fill="none"
                strokeLinecap="round"
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredSegment(index)}
                onMouseLeave={() => setHoveredSegment(null)}
              />
            );
          })}
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {hoveredSegment !== null ? `${data[hoveredSegment].value}%` : `${total.toFixed(0)}%`}
            </div>
            <div className="text-xs text-gray-400">
              {hoveredSegment !== null ? data[hoveredSegment].name : 'Total'}
            </div>
          </div>
        </div>
      </div>
    );
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
                  <p className="text-gray-400 text-sm">Renewal in {getDaysUntilReset()} days</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold text-white">
                  {getUsagePercentage()}%
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

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Usage Timeline */}
          <div className="bg-black/20 backdrop-blur-2xl rounded-lg border border-white/20 p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Usage Trend</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-400">Successful</span>
                  </div>
                </div>
              </div>
              
              <CustomLineChart data={usageData} height={200} />
            </div>
          </div>

          {/* Endpoint Distribution */}
          <div className="bg-black/20 backdrop-blur-2xl rounded-lg border border-white/20 p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-white mb-6">Distribution by Endpoint</h3>
              
              <div className="flex items-center gap-8">
                <CustomDonutChart data={endpointData} size={160} />
                
                <div className="flex-1 space-y-3">
                  {endpointData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-700/50">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm text-gray-300 font-medium">{item.name} API</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-white font-bold">
                          {item.value}%
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.requests.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hourly Usage Chart */}
        <div className="bg-black/20 backdrop-blur-2xl rounded-lg border border-white/20 p-6 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-white mb-6">Hourly Distribution (Today)</h3>
            
            <CustomBarChart data={hourlyData} height={160} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-black/20 backdrop-blur-2xl rounded-lg border border-white/20 p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
            
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
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
      </div>
    </div>
  );
}