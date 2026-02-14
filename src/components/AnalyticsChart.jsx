'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

export default function AnalyticsChart({ urls }) {
  // Prepare data for bar chart (top 5 URLs by clicks)
  const topUrls = [...urls]
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 5)
    .map(url => ({
      name: url.shortCode,
      clicks: url.clicks
    }));

  // Prepare data for pie chart (click distribution)
  const pieData = urls.length > 0 ? [...urls]
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 6)
    .map(url => ({
      name: url.shortCode,
      value: url.clicks
    })) : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Top 5 URLs by Clicks</h3>
        {topUrls.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topUrls}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clicks" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-slate-400">
            No data available
          </div>
        )}
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Click Distribution</h3>
        {pieData.length > 0 && pieData.some(d => d.value > 0) ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-slate-400">
            No clicks yet
          </div>
        )}
      </div>
    </div>
  );
}
