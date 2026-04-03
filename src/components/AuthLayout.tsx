import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '1rem', background: 'var(--bg-main)' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '600px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 className="text-2xl font-bold text-primary">Inventory Web</h2>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
