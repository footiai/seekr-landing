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

interface ChartsProps {
  usageData: UsageDataItem[];
  hourlyData: HourlyDataItem[];
  endpointData: EndpointDataItem[];
}

export default function Charts({ usageData, hourlyData, endpointData }: ChartsProps) {
  return (
    <>
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
    </>
  );
}
