// src/components/AdminSidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-gray-900 w-full md:w-64 p-6">
      <div className="mb-8">
        <img
          src="/path/to/logo.png" // Replace with actual logo path
          alt="Nicon Tournament Logo"
          className="w-20 h-20 mx-auto mb-4"
        />
        <h1 className="text-xl font-bold text-green-400 text-center">Nicon Admin</h1>
      </div>

      <nav className="space-y-2">
        <button
          onClick={() => onTabChange('users')}
          className={`w-full p-3 rounded flex items-center ${
            activeTab === 'users'
              ? 'bg-green-600 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 116 0 3 3 0 016 0v2a3 3 0 116 0 3 3 0 016 0v2a3 3 0 116 0 3 3 0 016 0v2a3 3 0 116 0 3 3 0 016 0v2a3 3 0 116 0 3 3 0 016 0v2a3 3 0 116 0 3 3 0 016 0v2a3 3 0 116 0 3 3 0 016 0v2a3 3 0 116 0 3 3 0 016 0v2a3 3 0 116 0 3 3 0 016 0v2a3 3 0 116 0 3 3 0 016 0v2a3 3 0 116 0 3 3 0 016 0v2a3 3 0 116 0 3 3 0 016 0v2a3 3 0 116 0 3 3 0 016 0v2a3 3 0 116 0 3 3 0 016 0v2a3 3 0 116 0 3 3 0 016 0v2a3 3 0 116 0 3 3 0 016 0v2a3 3 0 116 0 3 3 0 016 0v2a3 3 0 116 0 3 3 0 016 0v2a3 3 0 116 0 3 3 0 016 0v2a3 3 0 116 0 3 3 0 016 0v2a3 3 0 116" />
          </svg>
          Users
        </button>
        <button
          onClick={() => onTabChange('teams')}
          className={`w-full p-3 rounded flex items-center ${
            activeTab === 'teams'
              ? 'bg-green-600 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
          Teams
        </button>
        <button
          onClick={() => onTabChange('matches')}
          className={`w-full p-3 rounded flex items-center ${
            activeTab === 'matches'
              ? 'bg-green-600 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          Matches
        </button>
        <button
          onClick={() => onTabChange('payments')}
          className={`w-full p-3 rounded flex items-center ${
            activeTab === 'payments'
              ? 'bg-green-600 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
          Payments
        </button>
         <button
          onClick={() => onTabChange('posts')}
          className={`w-full p-3 rounded flex items-center ${
            activeTab === 'posts'
              ? 'bg-green-600 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
            <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
          </svg>
          Posts
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;