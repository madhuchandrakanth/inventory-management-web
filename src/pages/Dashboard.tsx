import { useState, useEffect } from 'react';
import { IndianRupee, Package, TrendingUp, Users } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardService, type DashboardData } from '../services/dashboard-service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StatCard = ({ title, value, icon, trend, isPositive, trendText }: any) => (
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
        <span className="text-sm text-muted">{trendText || 'vs last month'}</span>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchDashboardData = async () => {
      try {
        const result = await DashboardService.getDashboardData(controller.signal);
        setData(result);
      } catch (error: unknown) {
        // Ignore errors caused by standard AbortController cancellation natively
        const err = error as Error;
        if (err.name !== 'AbortError') {
          console.error("Error fetching dashboard data:", err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();

    // Cleanup function aborts the network request if component unmounts quickly
    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-full"><p className="text-muted">Loading dashboard data...</p></div>;
  }

  if (!data) {
    return <div className="flex items-center justify-center h-full"><p className="text-danger">Failed to load dashboard data.</p></div>;
  }

  // Transform recharts data
  const { labels, datasets } = data.revenueAndProfit;
  const revenueData = datasets.find(d => d.label === 'Revenue')?.data || [];
  const profitData = datasets.find(d => d.label === 'Profit')?.data || [];

  const chartData = labels.map((label, index) => ({
    name: label,
    revenue: revenueData[index] || 0,
    profit: profitData[index] || 0,
  }));

  const getIconForTitle = (title: string) => {
    if (title.includes('Revenue')) return <IndianRupee size={20} />;
    if (title.includes('Profit')) return <TrendingUp size={20} />;
    if (title.includes('Products')) return <Package size={20} />;
    if (title.includes('Suppliers')) return <Users size={20} />;
    return <TrendingUp size={20} />;
  };

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
        {data.summary.map((item, index) => (
          <StatCard
            key={index}
            title={item.title}
            value={item.value}
            icon={getIconForTitle(item.title)}
            trend={item.trend}
            trendText={item.trendText}
            isPositive={item.isPositive}
          />
        ))}
      </div>

      <div className="glass-panel mb-8">
        <h2 className="text-xl font-bold mb-6">Revenue & Profit Overview</h2>
        <div style={{ width: '100%', height: '350px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
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
