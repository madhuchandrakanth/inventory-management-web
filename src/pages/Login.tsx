import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthService } from '../services/auth-service';
import { SessionService } from '../services/session-service';
import FeedbackAlert from '../components/FeedbackAlert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await AuthService.login({ email, password }) as { email: string, full_name: string, phone: string, user_id: string };
      console.log(response);

      // Store into SessionService
      if (response) {
        SessionService.setUser(response);
      }

      navigate('/dashboard');
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-6 text-center">Sign In</h3>

      {error && <FeedbackAlert type="error" message={error} />}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={isLoading}
          />
        </div>

        <div className="input-group">
          <div className="flex justify-between items-center w-full">
            <label className="input-label" htmlFor="password">Password</label>
            <Link to="/forgot-password" className="text-sm">Forgot password?</Link>
          </div>
          <input
            id="password"
            type="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={isLoading}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="text-center mt-6">
        <span className="text-sm text-muted">Don't have an account? </span>
        <Link to="/signup" className="text-sm font-semibold">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
