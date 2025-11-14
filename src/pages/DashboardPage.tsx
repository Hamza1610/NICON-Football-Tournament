import { useAuth } from '../context/AuthContext';
import { Trophy, Calendar, BarChart3, User as UserIcon } from 'lucide-react';
import Tabs, { Tab } from '../components/Tabs';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { user, profileLoading } = useAuth();

  // Show loading state only while profile is being fetched
  // Session is already verified by PrivateRoute, so we can render the page
  // even if profile is still loading
  if (profileLoading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const tabs: Tab[] = [
    {
      id: 'newsfeed',
      label: 'Newsfeed',
      icon: <Trophy size={18} />,
      content: (
        <div className="space-y-4">
          <Card title="Latest Updates">
            <p className="text-gray-400">Stay tuned for tournament updates and announcements!</p>
          </Card>
        </div>
      ),
    },
    {
      id: 'fixtures',
      label: 'Fixtures',
      icon: <Calendar size={18} />,
      content: (
        <div className="space-y-4">
          <Card title="Upcoming Matches">
            <p className="text-gray-400">Match fixtures will be displayed here.</p>
          </Card>
        </div>
      ),
    },
    {
      id: 'leaderboard',
      label: 'Leaderboard',
      icon: <BarChart3 size={18} />,
      content: (
        <div className="space-y-4">
          <Card title="Top Players">
            <p className="text-gray-400">Player rankings will appear here.</p>
          </Card>
        </div>
      ),
    },
    {
      id: 'profile',
      label: 'My Profile',
      icon: <UserIcon size={18} />,
      content: (
        <div className="space-y-4">
          <Card title="Player Information">
            <div className="space-y-3">
              <div>
                <span className="text-gray-400">Name:</span>
                <span className="ml-2 text-white font-semibold">{user?.full_name}</span>
              </div>
              <div>
                <span className="text-gray-400">Email:</span>
                <span className="ml-2 text-white">{user?.email}</span>
              </div>
              <div>
                <span className="text-gray-400">Role:</span>
                <span className="ml-2 text-white capitalize">{user?.role}</span>
              </div>
              {user?.position && (
                <div>
                  <span className="text-gray-400">Position:</span>
                  <span className="ml-2 text-white">{user?.position}</span>
                </div>
              )}
              {user?.jersey_number && (
                <div>
                  <span className="text-gray-400">Jersey Number:</span>
                  <span className="ml-2 text-white">#{user?.jersey_number}</span>
                </div>
              )}
              <div>
                <span className="text-gray-400">Payment Status:</span>
                <span className={`ml-2 font-semibold ${
                  user?.payment_status === 'verified' ? 'text-green-500' :
                  user?.payment_status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {user?.payment_status.toUpperCase()}
                </span>
              </div>
            </div>
          </Card>

          {user?.payment_status === 'pending' && (
            <Card className="bg-yellow-500/10 border border-yellow-500">
              <p className="text-yellow-500 font-semibold mb-2">Payment Required</p>

              <p className="text-gray-300 text-sm">
                Complete your ₦5,000 registration payment to activate your account and participate in the tournament.
              </p>
              <Link
                to="/payment"
                type="submit"
                className="w-full py-3 rounded-lg font-semibold transition-all">Pay for Registration</Link>
            </Card>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, <span className="text-nicon-green">{user?.full_name}</span>!
        </h1>
        <p className="text-gray-400">Manage your tournament experience from your dashboard</p>
      </div>

      <Tabs tabs={tabs} defaultTab="newsfeed" />
    </div>
    // Hello My name is Muhammad, I'm a programmer 
  );
}
