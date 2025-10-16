import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-nicon-slate border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/NICON-logo.jpg" alt="NICON" className="h-16 w-16 rounded-full" />
              <div>
                <div className="text-2xl font-bold">
                  <span className="text-nicon-green">NICON</span>
                  <span className="text-nicon-yellow"> TOWN</span>
                </div>
                <div className="text-sm text-gray-400">Football Tournament 2025</div>
              </div>
            </div>
            <p className="text-gray-400 max-w-md">
              The official NICON Town Football Tournament. Six teams competing for glory,
              ₦300,000 in prizes, and unforgettable Christmas football action.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/fixtures" className="text-gray-400 hover:text-nicon-green transition-colors">
                  Fixtures
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-gray-400 hover:text-nicon-green transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-nicon-green transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/rules" className="text-gray-400 hover:text-nicon-green transition-colors">
                  Rules
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-nicon-green transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-nicon-green transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-nicon-green transition-colors">
                <Instagram size={24} />
              </a>
              <a href="mailto:tournament@nicontown.com" className="text-gray-400 hover:text-nicon-green transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} NICON Town Football Tournament. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
