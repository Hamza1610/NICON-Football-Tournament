import Card from '../components/Card';
import { Trophy } from 'lucide-react';

export default function LeaderboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-nicon-yellow mb-4">Leaderboard</h1>
        <p className="text-gray-400 text-lg">Top players and statistics</p>
      </div>

      <Card>
        <div className="flex flex-col items-center justify-center py-12">
          <Trophy className="text-nicon-yellow mb-4" size={64} />
          <p className="text-gray-400 text-lg">Leaderboard will be updated after matches begin!</p>
        </div>
      </Card>
    </div>
  );
}
