import { useState, useRef, useEffect } from 'react';
import { Bell, Mail, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SessionService } from '../services/session-service';

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const user = SessionService.getUser();

  const handleLogout = () => {
    SessionService.clearSession();
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="top-nav" style={{
      background: '#ffffff',
      padding: '1rem 2rem',
      borderRadius: '16px',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
      position: 'relative'
    }}>
      <div className="flex items-center gap-4">
        <button className="btn-icon-custom">
          <Bell size={18} />
        </button>
        <button className="btn-icon-custom">
          <Mail size={18} />
        </button>
        
        <div className="relative inline-block" ref={dropdownRef}>
          <div 
            className="flex items-center gap-2" 
            style={{ marginLeft: '1rem', cursor: 'pointer', padding: '0.25rem 0.5rem', borderRadius: '8px', transition: 'var(--transition)' }}
            onClick={() => setShowDropdown(!showDropdown)}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <span className="text-sm font-semibold text-main">{user?.full_name || 'My Account'}</span>
            <div style={{ background: '#f1f5f9', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #e2e8f0' }}>
              <User size={20} color="var(--primary-color)" />
            </div>
          </div>

          {showDropdown && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: 'calc(100% + 10px)',
              background: '#ffffff',
              boxShadow: 'var(--shadow-lg)',
              borderRadius: '8px',
              padding: '0.5rem',
              width: '200px',
              zIndex: 100,
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.5rem' }}>
                <p className="text-sm font-bold truncate">{user?.full_name || 'Guest'}</p>
                <p className="text-sm text-muted truncate">{user?.email || ''}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 text-danger"
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  background: 'transparent',
                  justifyContent: 'flex-start',
                  fontWeight: 500,
                  fontSize: '0.875rem'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--danger-bg)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
