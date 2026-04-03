import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { SessionService } from '../services/session-service';

const ProtectedRoute = () => {
  const isAuth = SessionService.isAuthenticated();
  const location = useLocation();

  if (!isAuth) {
    // Redirect to login but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
