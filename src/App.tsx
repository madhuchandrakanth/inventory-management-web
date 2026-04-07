import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { SessionService } from './services/session-service';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Shops from './pages/Shops';
import ShopForm from './pages/ShopForm';
import Products from './pages/Products';
import ProductForm from './pages/ProductForm';
import Sales from './pages/Sales';
import AuthLayout from './components/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import './App.css';

const MainLayout = () => (
  <div className="app-container">
    <Sidebar />
    <main className="main-content">
      <Navbar />
      <div className="animate-fade-in">
        <Outlet />
      </div>
    </main>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={SessionService.isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
        
        {/* Public Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/shops" element={<Shops />} />
            <Route path="/shops/new" element={<ShopForm />} />
            <Route path="/shops/:id/edit" element={<ShopForm />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/:id/edit" element={<ProductForm />} />
            <Route path="/sales" element={<Sales />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
