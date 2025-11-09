import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import Button from '../components/Button';
import Card from '../components/Card';
import { UserPlus, Mail, Lock, User, Users } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    position: '',
    jerseyNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { session, loading: authLoading } = useAuth();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!authLoading && session) {
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [session, authLoading, navigate, location]);

  const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      console.log("Data...: ", authData);
      if (authError) throw authError;

      if (authData.user) {
        // Check if session exists (email confirmation might be required)
        if (authData.session) {
          // Session exists - insert profile immediately
          const { error: profileError } = await supabase.from('users').insert({
            id: authData.user.id,
            full_name: formData.fullName,
            email: formData.email,
            role: 'player',
            age: parseInt(formData.age),
            position: formData.position,
            jersey_number: parseInt(formData.jerseyNumber),
            payment_status: 'pending',
          });

          if (profileError) {
            console.error('Profile creation error:', profileError);
            throw profileError;
          }

          // Session is set immediately by Supabase, and AuthContext will update via onAuthStateChange
          // Navigate to dashboard
          navigate('/dashboard', { replace: true });
        } else {
          // No session - email confirmation required
          // Store registration data temporarily for profile creation after email confirmation
          sessionStorage.setItem('pendingRegistration', JSON.stringify({
            userId: authData.user.id,
            fullName: formData.fullName,
            email: formData.email,
            age: parseInt(formData.age),
            position: formData.position,
            jerseyNumber: parseInt(formData.jerseyNumber),
          }));

          setError('Please check your email to confirm your account before logging in.');
          setLoading(false);
          // Optionally navigate to a "check your email" page or show success message
        }
      }
    } catch (err: any) {
      console.log("Err: ", err);
      setError(err.message || 'Failed to register');
      setLoading(false);
    }
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
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <img src="/NICON-logo.jpg" alt="NICON" className="w-24 h-24 mx-auto mb-4 rounded-full" />
          <h1 className="text-3xl font-bold text-nicon-green mb-2">Join the Tournament</h1>
          <p className="text-gray-400">Register as a player - ₦5,000 registration fee</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-nicon-charcoal border border-gray-700 rounded-lg text-white focus:outline-none focus:border-nicon-green transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-nicon-charcoal border border-gray-700 rounded-lg text-white focus:outline-none focus:border-nicon-green transition-colors"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-nicon-charcoal border border-gray-700 rounded-lg text-white focus:outline-none focus:border-nicon-green transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-nicon-charcoal border border-gray-700 rounded-lg text-white focus:outline-none focus:border-nicon-green transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-nicon-charcoal border border-gray-700 rounded-lg text-white focus:outline-none focus:border-nicon-green transition-colors"
                  placeholder="25"
                  min="16"
                  max="60"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Position *
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-nicon-charcoal border border-gray-700 rounded-lg text-white focus:outline-none focus:border-nicon-green transition-colors appearance-none"
                    required
                  >
                    <option value="">Select Position</option>
                    {positions.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Jersey Number *
                </label>
                <input
                  type="number"
                  name="jerseyNumber"
                  value={formData.jerseyNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-nicon-charcoal border border-gray-700 rounded-lg text-white focus:outline-none focus:border-nicon-green transition-colors"
                  placeholder="10"
                  min="1"
                  max="99"
                  required
                />
              </div>
            </div>

            <div className="bg-nicon-yellow/10 border border-nicon-yellow rounded-lg p-4">
              <p className="text-nicon-yellow font-semibold mb-2">Payment Required</p>
              <p className="text-gray-300 text-sm">
                After registration, you'll need to complete a ₦5,000 payment to activate your account
                and participate in the tournament.
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              icon={<UserPlus />}
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-nicon-green hover:text-nicon-yellow transition-colors">
                Login here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
