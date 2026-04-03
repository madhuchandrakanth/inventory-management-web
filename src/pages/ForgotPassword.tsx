import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthService } from '../services/auth-service';
import FeedbackAlert from '../components/FeedbackAlert';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setIsLoading(true);
      await AuthService.forgotPassword({ email });
      setSuccess('Password reset link has been sent to your email.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || 'Failed to request password reset.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-6 text-center">Reset Password</h3>

      {error && <FeedbackAlert type="error" message={error} />}
      {success && <FeedbackAlert type="success" message={success} />}

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
            disabled={isLoading || !!success}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4" disabled={isLoading || !!success}>
          {isLoading ? 'Sending Request...' : 'Reset Password'}
        </button>
      </form>

      <div className="text-center mt-6">
        <Link to="/login" className="text-sm font-semibold">Back to Sign In</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
