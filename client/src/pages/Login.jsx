import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Mail, Lock, Loader } from 'lucide-react';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement actual login logic
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="glass-panel p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-center">
            Sign In
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Welcome back! Please login to your account.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg 
                    text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg 
                    text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 
                text-white font-semibold rounded-lg hover:opacity-90 transition-opacity 
                disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isLoading ? <Loader className="animate-spin" size={20} /> : null}
              <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-3 text-center text-sm">
            <div>
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
