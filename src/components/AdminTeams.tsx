// src/components/AdminTeams.tsx
import React, { useState } from 'react';

interface Team {
  id: string;
  name: string;
  logo_url?: string;
  team_group: 'A' | 'B' | 'final';
  coach_name?: string;
  created_at: string;
}

interface AdminTeamsProps {
  teams: Team[];
}

const AdminTeams: React.FC<AdminTeamsProps> = ({ teams }) => {
  const [newTeam, setNewTeam] = useState({ name: '', team_group: 'A' as 'A' | 'B' | 'final', coach_name: '' });

  const handleCreateTeam = () => {
    // Implement create team logic
    console.log('Create team:', newTeam);
    // Example: fetch('/api/teams', { method: 'POST', body: JSON.stringify(newTeam), headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } })
    setNewTeam({ name: '', team_group: 'A', coach_name: '' });
  };

  const handleDeleteTeam = (teamId: string) => {
    // Implement delete team logic
    console.log('Delete team:', teamId);
    // Example: fetch(`/api/teams/${teamId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } })
  };

  const handleUpdateTeam = (teamId: string) => {
    // Implement update team logic
    console.log('Update team:', teamId);
    // Example: Navigate to an edit team page or open a modal
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-400 mb-4">Manage Teams</h2>

      {/* Create Team Form */}
      <div className="mb-6 p-4 bg-gray-800 rounded">
        <h3 className="text-xl font-semibold mb-3">Add New Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Team Name"
            value={newTeam.name}
            onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
            className="p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <select
            value={newTeam.team_group}
            onChange={(e) => setNewTeam({ ...newTeam, team_group: e.target.value as any })}
            className="p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="A">Group A</option>
            <option value="B">Group B</option>
            <option value="final">Final</option>
          </select>
          <input
            type="text"
            placeholder="Coach Name"
            value={newTeam.coach_name}
            onChange={(e) => setNewTeam({ ...newTeam, coach_name: e.target.value })}
            className="p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <button
          onClick={handleCreateTeam}
          className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
        >
          Create Team
        </button>
      </div>

      {/* Team List */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Group</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Coach</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {teams.map((team) => (
              <tr key={team.id} className="hover:bg-gray-800">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{team.name}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{team.team_group}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{team.coach_name || 'N/A'}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleUpdateTeam(team.id)}
                    className="mr-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTeam(team.id)}
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

export default AdminTeams;