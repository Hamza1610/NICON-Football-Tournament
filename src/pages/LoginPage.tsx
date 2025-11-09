import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import Button from '../components/Button';
import Card from '../components/Card';
import { LogIn, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { session, loading: authLoading , user} = useAuth();

  // Redirect to dashboard if already logged in
  // useEffect(() => {

    
  //   if (!authLoading && session) {
  //     const from = (location.state as any)?.from?.pathname || '/dashboard';
  //     navigate(from, { replace: true });
  //   }
  // }, [session, authLoading, navigate, location]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });


      if (authError) throw authError;

      // Session is set immediately by Supabase, and AuthContext will update via onAuthStateChange
      // Navigate to the intended page or dashboard
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to login');
      setLoading(false);
    }
    // Note: Don't setLoading(false) on success as we're navigating away
  };

  // Show loading while checking auth state
  // if (authLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="w-12 h-12 border-4 border-gray-700 border-t-nicon-green rounded-full animate-spin mx-auto mb-4" />
  //         <p className="text-gray-400">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/NICON-logo.jpg" alt="NICON" className="w-24 h-24 mx-auto mb-4 rounded-full" />
          <h1 className="text-3xl font-bold text-nicon-green mb-2">Welcome Back</h1>
          <p className="text-gray-400">Login to access your tournament account</p>
        </div>

        <Card>
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-nicon-charcoal border border-gray-700 rounded-lg text-white focus:outline-none focus:border-nicon-green transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-nicon-charcoal border border-gray-700 rounded-lg text-white focus:outline-none focus:border-nicon-green transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              icon={<LogIn />}
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-nicon-green hover:text-nicon-yellow transition-colors">
                Register here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
