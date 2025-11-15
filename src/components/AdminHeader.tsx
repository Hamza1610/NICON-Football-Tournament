// src/components/AdminHeader.tsx
import React from 'react';

const AdminHeader: React.FC = () => {
  // In a real app, you'd get the user info from context or state
  const adminName = "Admin User"; // Placeholder

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
  };

  return (
    <header className="bg-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-400">NICON Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-300">Welcome, {adminName}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;