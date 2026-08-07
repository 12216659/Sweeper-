import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api';
import { 
  DollarSign, Users, Calendar, Sparkles, TrendingUp, ArrowUpRight 
} from 'lucide-react';

export const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await api.get('/admin/stats');
      return res.data.data.stats;
    }
  });

  if (isLoading) {
    return <div className="flex h-96 items-center justify-center">Loading dashboard data...</div>;
  }

  const statCards = [
    { title: 'Total Revenue', value: `$${stats?.totalRevenue?.toLocaleString() || '0'}`, icon: DollarSign, color: 'bg-green-500', trend: '+12.5%' },
    { title: 'Total Bookings', value: stats?.totalBookings || '0', icon: Calendar, color: 'bg-orange-500', trend: '+5.2%' },
    { title: 'Active Customers', value: stats?.totalCustomers || '0', icon: Users, color: 'bg-purple-500', trend: '+18.1%' },
    { title: 'Active Services', value: stats?.totalServices || '0', icon: Sparkles, color: 'bg-orange-500', trend: '0%' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl text-white ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                {stat.trend}
              </span>
            </div>
            <h3 className="text-slate-500 font-medium">{stat.title}</h3>
            <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Placeholder */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900 text-lg">Revenue Overview</h3>
            <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-orange-500">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-72 w-full bg-slate-50 rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
            <TrendingUp className="w-12 h-12 mb-2 text-slate-300" />
            <p>Interactive Revenue Chart Placeholder</p>
            <p className="text-xs mt-1">(Requires Chart.js or Recharts integration)</p>
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-900 text-lg mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-slate-900">New Booking received</p>
                  <p className="text-xs text-slate-500 mt-0.5">Booking ID: SWP-82{i}X for Deep Cleaning</p>
                  <p className="text-xs text-slate-400 mt-1">{i * 15} minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
