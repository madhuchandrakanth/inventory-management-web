import { Bell, Mail, User } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="top-nav" style={{
      background: '#ffffff',
      padding: '1rem 2rem',
      borderRadius: '16px',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%'
    }}>
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
