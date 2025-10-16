import { Link } from 'react-router-dom';
import { Trophy, Calendar, Users, DollarSign, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

export default function LandingPage() {
  const teams = [
    'NICON United',
    'Emerald Lions',
    'Golden Hawks',
    'Unicorn FC',
    'Titans of Town',
    'Victory Rangers'
  ];

  const fixtures = [
    { teamA: 'NICON United', teamB: 'Emerald Lions', date: 'Dec 10, 2025', time: '4:00 PM' },
    { teamA: 'Golden Hawks', teamB: 'Unicorn FC', date: 'Dec 10, 2025', time: '6:00 PM' },
    { teamA: 'Titans of Town', teamB: 'Victory Rangers', date: 'Dec 11, 2025', time: '4:00 PM' },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-nicon-green/20 via-nicon-charcoal to-nicon-yellow/20" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nicon-green/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-nicon-yellow/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-up">
            <img
              src="/NICON-logo.jpg"
              alt="NICON Tournament"
              className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 rounded-full glow-green"
            />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6">
              <span className="text-nicon-green">THE NICON TOURNAMENT</span>
              <br />
              <span className="text-nicon-yellow">IS BACK</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto leading-relaxed">
              Bigger, Bolder, and Louder This December!
            </p>
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Six fearless teams. One champion. Real cash prizes. Pure Christmas energy.
              <br />
              Get ready for high-intensity matches, live updates, and a grand finale that'll close the football year in unforgettable style!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register">
                <Button variant="primary" icon={<Trophy />}>
                  Register Now (₦5,000)
                </Button>
              </Link>
              <Link to="/fixtures">
                <Button variant="secondary" icon={<Calendar />}>
                  View Fixtures & Teams
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-nicon-green">Tournament</span>{' '}
            <span className="text-nicon-yellow">Highlights</span>
          </h2>
          <p className="text-gray-400 text-lg">Everything you need to know about this year's competition</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <Card hoverable className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-nicon-green/20 p-4 rounded-full">
                <DollarSign className="text-nicon-green" size={32} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-nicon-yellow mb-2">₦300,000</h3>
            <p className="text-gray-400">Total Prize Pool</p>
          </Card>

          <Card hoverable className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-nicon-yellow/20 p-4 rounded-full">
                <Users className="text-nicon-yellow" size={32} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-nicon-green mb-2">6 Teams</h3>
            <p className="text-gray-400">Competing for Glory</p>
          </Card>

          <Card hoverable className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-nicon-lime/20 p-4 rounded-full">
                <Trophy className="text-nicon-lime" size={32} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-nicon-yellow mb-2">2 Groups</h3>
            <p className="text-gray-400">Group Stage Format</p>
          </Card>

          <Card hoverable className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-nicon-green/20 p-4 rounded-full">
                <Sparkles className="text-nicon-green" size={32} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-nicon-lime mb-2">1 Champion</h3>
            <p className="text-gray-400">Winner Takes All</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h3 className="text-3xl font-bold text-nicon-green mb-6">Competing Teams</h3>
            <div className="grid grid-cols-2 gap-4">
              {teams.map((team, index) => (
                <Card key={index} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-nicon-green to-nicon-yellow rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-white">
                    {team.charAt(0)}
                  </div>
                  <p className="font-semibold text-white">{team}</p>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-nicon-yellow mb-6">Upcoming Fixtures</h3>
            <div className="space-y-4">
              {fixtures.map((fixture, index) => (
                <Card key={index} hoverable>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 text-center">
                      <p className="font-semibold text-white">{fixture.teamA}</p>
                    </div>
                    <div className="px-4">
                      <span className="text-nicon-green font-bold text-xl">VS</span>
                    </div>
                    <div className="flex-1 text-center">
                      <p className="font-semibold text-white">{fixture.teamB}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-700 text-center text-sm text-gray-400">
                    {fixture.date} • {fixture.time}
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link to="/fixtures">
                <Button variant="outline">View All Fixtures</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-nicon-green to-nicon-yellow p-1 rounded-2xl">
          <div className="bg-nicon-charcoal rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Join the Action?
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Register now and become part of the biggest football tournament of the year.
              Limited slots available!
            </p>
            <Link to="/register">
              <Button variant="secondary" icon={<Trophy />}>
                Register Your Team Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
