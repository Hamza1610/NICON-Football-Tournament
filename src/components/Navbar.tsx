import { Link } from 'react-router-dom';
import { Menu, X, Trophy, Calendar, BarChart3, User } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  user?: { full_name: string; role: string } | null;
  onLogout?: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home', icon: <Trophy size={18} /> },
    { to: '/fixtures', label: 'Fixtures', icon: <Calendar size={18} /> },
    { to: '/leaderboard', label: 'Leaderboard', icon: <BarChart3 size={18} /> },
  ];

  return (
    <nav className="bg-nicon-slate border-b border-gray-800 sticky top-0 z-40 backdrop-blur-lg bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img src="/NICON-logo.jpg" alt="NICON" className="h-12 w-12 rounded-full" />
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-nicon-green">NICON</span>
              <span className="text-xl font-bold text-nicon-yellow ml-1">TOURNAMENT</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-2 text-gray-300 hover:text-nicon-green transition-colors"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-gray-300 hover:text-nicon-green transition-colors"
                >
                  <User size={18} />
                  {user.full_name}
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 bg-nicon-yellow text-nicon-charcoal rounded-lg font-semibold hover:bg-nicon-yellow/90 transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={onLogout}
                  className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-nicon-green text-white rounded-lg font-semibold hover:glow-green transition-all"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-nicon-charcoal border-t border-gray-800 animate-slide-up">
          <div className="px-4 py-4 space-y-3">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-2 text-gray-300 hover:text-nicon-green transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-gray-300 hover:text-nicon-green transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User size={18} />
                  Dashboard
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block px-4 py-2 bg-nicon-yellow text-nicon-charcoal rounded-lg font-semibold text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    onLogout?.();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 border border-red-600 text-red-600 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-center py-2 text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 bg-nicon-green text-white rounded-lg font-semibold text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
