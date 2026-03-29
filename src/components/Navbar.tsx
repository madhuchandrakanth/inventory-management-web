// Removed unused React import
import { Bell, Search, Mail, User } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="top-nav" style={{
      background: '#ffffff',
      padding: '1rem 2rem',
      borderRadius: '16px',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="flex items-center gap-6">
        <h2 style={{ fontSize: '1.25rem', color: 'var(--text-muted)', margin: 0, fontWeight: 600 }}>
          Welcome to <span style={{ color: 'var(--text-main)' }}>Maha Shop</span>
        </h2>

        <div className="input-group" style={{ margin: 0, width: '350px', position: 'relative' }}>
          <input
            type="text"
            className="input-field"
            placeholder="Search"
            style={{
              paddingRight: '3rem',
              background: '#f8fafc',
              border: 'none',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
            }}
          />
          <button style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '40px',
            background: 'var(--primary-color)',
            border: 'none',
            borderRadius: '0 30px 30px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            cursor: 'pointer'
          }}>
            <Search size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="btn-icon-custom">
          <Bell size={18} />
        </button>
        <button className="btn-icon-custom">
          <Mail size={18} />
        </button>
        <div className="flex items-center" style={{ marginLeft: '1rem', cursor: 'pointer' }}>
          <div style={{ background: '#f1f5f9', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #e2e8f0' }}>
            <User size={20} color="var(--primary-color)" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
