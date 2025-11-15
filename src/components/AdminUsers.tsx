// src/components/AdminUsers.tsx
import React, { useState } from 'react';

interface User {
  id: string;
  full_name: string;
  email: string;
  role: 'fan' | 'player' | 'admin';
  payment_status: 'pending' | 'verified' | 'failed';
  team_id?: string;
  position?: string;
  jersey_number?: number;
  age?: number;
  created_at: string;
}

interface AdminUsersProps {
  users: User[];
}

const AdminUsers: React.FC<AdminUsersProps> = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (userId: string) => {
    // Implement delete logic
    console.log('Delete user:', userId);
    // Example: fetch(`/api/users/${userId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } })
  };

  const handleUpdateUser = (userId: string) => {
    // Implement update logic
    console.log('Update user:', userId);
    // Example: Navigate to an edit user page or open a modal
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-400 mb-4">Manage Users</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* User List */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Payment Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-800">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{user.full_name}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{user.role}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.payment_status)}`}>
                    {user.payment_status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleUpdateUser(user.id)}
                    className="mr-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
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

export default AdminUsers;