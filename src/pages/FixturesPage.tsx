import Card from '../components/Card';
import { Calendar } from 'lucide-react';

export default function FixturesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-nicon-green mb-4">Tournament Fixtures</h1>
        <p className="text-gray-400 text-lg">All matches and schedules</p>
      </div>

      <Card>
        <div className="flex flex-col items-center justify-center py-12">
          <Calendar className="text-nicon-green mb-4" size={64} />
          <p className="text-gray-400 text-lg">Fixtures will be announced soon!</p>
        </div>
      </Card>
    </div>
  );
}
