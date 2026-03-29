import React from 'react';
import { IndianRupee, Package, TrendingUp, Users } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, profit: 2400 },
  { name: 'Feb', revenue: 3000, profit: 1398 },
  { name: 'Mar', revenue: 2000, profit: 9800 },
  { name: 'Apr', revenue: 2780, profit: 3908 },
  { name: 'May', revenue: 1890, profit: 4800 },
  { name: 'Jun', revenue: 2390, profit: 3800 },
  { name: 'Jul', revenue: 3490, profit: 4300 },
];

const StatCard = ({ title, value, icon, trend, isPositive }: any) => (
  <div className="glass-panel">
    <div className="flex justify-between items-center mb-4">
      <span className="text-muted font-semibold">{title}</span>
      <div className="btn-icon-custom" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)' }}>
        {icon}
      </div>
    </div>
    <div className="flex-col">
      <span className="text-3xl font-bold">{value}</span>
      <div className="flex items-center gap-2 mt-2">
        <span className={`badge ${isPositive ? 'badge-success' : 'badge-danger'}`}>
          {trend}
        </span>
        <span className="text-sm text-muted">vs last month</span>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted">Welcome back, here's what's happening today.</p>
        </div>
        <button className="btn btn-primary">
          <TrendingUp size={18} />
          <span>Generate Report</span>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Revenue" value="₹45,231.89" icon={<IndianRupee size={20} />} trend="+20.1%" isPositive={true} />
        <StatCard title="Total Profit" value="₹12,382.40" icon={<TrendingUp size={20} />} trend="+15.3%" isPositive={true} />
        <StatCard title="Total Products" value="1,245" icon={<Package size={20} />} trend="+4.1%" isPositive={true} />
        <StatCard title="Active Suppliers" value="48" icon={<Users size={20} />} trend="-1.2%" isPositive={false} />
      </div>

      <div className="glass-panel mb-8">
        <h2 className="text-xl font-bold mb-6">Revenue & Profit Overview</h2>
        <div style={{ width: '100%', height: '350px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-color)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--accent-color)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}`} />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)', backdropFilter: 'blur(12px)' }}
                itemStyle={{ color: 'var(--text-main)' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="var(--primary-color)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              <Area type="monotone" dataKey="profit" stroke="var(--accent-color)" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
