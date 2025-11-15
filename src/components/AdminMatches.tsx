// src/components/AdminMatches.tsx
import React, { useState } from 'react';

interface Match {
  id: string;
  team_a_id: string;
  team_b_id: string;
  date: string;
  status: 'upcoming' | 'live' | 'finished';
  score_a: number;
  score_b: number;
  match_group: 'A' | 'B' | 'final';
  venue?: string;
  created_at: string;
}

interface AdminMatchesProps {
  matches: Match[];
}

const AdminMatches: React.FC<AdminMatchesProps> = ({ matches }) => {
  const [newMatch, setNewMatch] = useState({
    team_a_id: '',
    team_b_id: '',
    date: '',
    match_group: 'A' as 'A' | 'B' | 'final',
    venue: '',
  });

  const handleCreateMatch = () => {
    // Implement create match logic
    console.log('Create match:', newMatch);
    // Example: fetch('/api/matches', { method: 'POST', body: JSON.stringify(newMatch), headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } })
    setNewMatch({
      team_a_id: '',
      team_b_id: '',
      date: '',
      match_group: 'A',
      venue: '',
    });
  };

  const handleUpdateMatch = (matchId: string) => {
    // Implement update match logic
    console.log('Update match:', matchId);
    // Example: Navigate to an edit match page or open a modal
  };

  const handleDeleteMatch = (matchId: string) => {
    // Implement delete match logic
    console.log('Delete match:', matchId);
    // Example: fetch(`/api/matches/${matchId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } })
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-yellow-400';
      case 'live': return 'text-red-400';
      case 'finished': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-400 mb-4">Manage Matches</h2>

      {/* Create Match Form */}
      <div className="mb-6 p-4 bg-gray-800 rounded">
        <h3 className="text-xl font-semibold mb-3">Schedule New Match</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Team A ID"
            value={newMatch.team_a_id}
            onChange={(e) => setNewMatch({ ...newMatch, team_a_id: e.target.value })}
            className="p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="Team B ID"
            value={newMatch.team_b_id}
            onChange={(e) => setNewMatch({ ...newMatch, team_b_id: e.target.value })}
            className="p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="datetime-local"
            value={newMatch.date}
            onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })}
            className="p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <select
            value={newMatch.match_group}
            onChange={(e) => setNewMatch({ ...newMatch, match_group: e.target.value as any })}
            className="p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="A">Group A</option>
            <option value="B">Group B</option>
            <option value="final">Final</option>
          </select>
          <input
            type="text"
            placeholder="Venue"
            value={newMatch.venue}
            onChange={(e) => setNewMatch({ ...newMatch, venue: e.target.value })}
            className="p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <button
          onClick={handleCreateMatch}
          className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
        >
          Schedule Match
        </button>
      </div>

      {/* Match List */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Teams</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Group</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Score</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {matches.map((match) => (
              <tr key={match.id} className="hover:bg-gray-800">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{match.team_a_id} vs {match.team_b_id}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{new Date(match.date).toLocaleString()}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{match.match_group}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(match.status)}`}>
                    {match.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{match.score_a} - {match.score_b}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleUpdateMatch(match.id)}
                    className="mr-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMatch(match.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMatches;