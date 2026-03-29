import React from 'react';
import { Download, ShoppingBag } from 'lucide-react';

const MOCK_SALES = [
  { id: 'ORD-8942', date: 'Oct 24, 2023', customer: 'John Doe', items: 3, total: '₹459.98', status: 'Completed' },
  { id: 'ORD-8941', date: 'Oct 24, 2023', customer: 'Sarah Smith', items: 1, total: '₹199.50', status: 'Processing' },
  { id: 'ORD-8940', date: 'Oct 23, 2023', customer: 'Michael Chen', items: 5, total: '₹120.45', status: 'Completed' },
  { id: 'ORD-8939', date: 'Oct 22, 2023', customer: 'Emma Wilson', items: 2, total: '₹59.00', status: 'Refunded' },
];

const Sales = () => {
  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold">Sales & Orders</h1>
          <p className="text-muted">Track your recent transactions and process orders.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-outline">
            <Download size={18} />
            <span>Export CSV</span>
          </button>
          <button className="btn btn-primary">
            <ShoppingBag size={18} />
            <span>New Sale</span>
          </button>
        </div>
      </div>

      <div className="glass-panel">
        <h2 className="text-xl font-bold mb-6">Recent Transactions</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: 'var(--glass-border)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Order ID</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Date</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Customer</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Items</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Total</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_SALES.map((sale) => (
                <tr key={sale.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                  <td style={{ padding: '1rem', fontWeight: 500, color: 'var(--primary-color)' }}>{sale.id}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{sale.date}</td>
                  <td style={{ padding: '1rem' }}>{sale.customer}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{sale.items} items</td>
                  <td style={{ padding: '1rem', fontWeight: 500 }}>{sale.total}</td>
                  <td style={{ padding: '1rem' }}>
                    <span className={`badge ${sale.status === 'Completed' ? 'badge-success' : sale.status === 'Processing' ? 'badge-warning' : 'badge-danger'}`}>
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sales;
