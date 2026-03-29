import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, BookOpen } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="icon-container">
          <BookOpen size={24} />
        </div>
        <span>Maha Shop</span>
      </div>

      <nav className="nav-links">
        <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Package size={20} />
          <span>Products</span>
        </NavLink>
        <NavLink to="/sales" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <ShoppingCart size={20} />
          <span>Sales & Orders</span>
        </NavLink>
        <NavLink to="/suppliers" className="nav-link">
          <Users size={20} />
          <span>Suppliers</span>
        </NavLink>
      </nav>

      <div className="mt-auto" style={{ position: 'relative', overflow: 'hidden', paddingBottom: '1rem', paddingTop: '2rem' }}>
        <button className="nav-link w-full" style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', fontSize: '1rem', position: 'relative', zIndex: 10 }}>
          <Settings size={20} />
          <span>Settings</span>
        </button>
        {/* Decorative graphic placeholder like screenshot */}
        <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(75,58,110,0) 70%)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10px', right: '-30px', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, rgba(75,58,110,0) 70%)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none' }} />
      </div>
    </aside>
  );
};

export default Sidebar;
