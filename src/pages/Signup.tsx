import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthService } from '../services/auth-service';
import FeedbackAlert from '../components/FeedbackAlert';

const Signup = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
  });
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (formData.full_name.trim().length < 3) return "Full Name must be at least 3 characters long.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "Please enter a valid email address.";
    if (!/^\d{10}$/.test(formData.phone)) return "Phone number must be exactly 10 digits.";
    if (formData.password.length < 6) return "Password must be at least 6 characters long.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsLoading(true);
      await AuthService.signup(formData);
      navigate('/login');
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-6 text-center">Create Account</h3>

      {error && <FeedbackAlert type="error" message={error} />}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label" htmlFor="full_name">Full Name</label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            className="input-field"
            value={formData.full_name}
            onChange={handleInputChange}
            placeholder="John Doe"
            disabled={isLoading}
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="input-field"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="johndoe@example.com"
            disabled={isLoading}
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="text"
            className="input-field"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="1234567890"
            disabled={isLoading}
            maxLength={10}
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="input-field"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Create a password (min 6 chars)"
            disabled={isLoading}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <div className="text-center mt-6">
        <span className="text-sm text-muted">Already have an account? </span>
        <Link to="/login" className="text-sm font-semibold">Sign In</Link>
      </div>
    </div>
  );
};

export default Signup;
