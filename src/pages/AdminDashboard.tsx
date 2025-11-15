// src/components/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Assuming you have these components or will create them
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import AdminUsers from '../components/AdminUsers';
import AdminTeams from '../components/AdminTeams';
import AdminMatches from '../components/AdminMatches';
import AdminPayments from '../components/AdminPayments';
import AdminPosts from '../components/AdminPosts';

// Define the main Admin Dashboard component
const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('users');
  const navigate = useNavigate();

  // Mock data for demonstration purposes
  const [users, setUsers] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);

  // Simulate fetching data
  useEffect(() => {
    // In a real app, you would fetch this data from your backend API
    // For now, we'll just populate with mock data
    setUsers([
      { id: '1', full_name: 'John Doe', email: 'john@example.com', role: 'player', payment_status: 'verified' },
      { id: '2', full_name: 'Jane Smith', email: 'jane@example.com', role: 'fan', payment_status: 'pending' },
      { id: '3', full_name: 'Admin User', email: 'admin@example.com', role: 'admin', payment_status: 'verified' },
    ]);
    setTeams([
      { id: '1', name: 'Team Alpha', team_group: 'A', coach_name: 'Coach Alpha' },
      { id: '2', name: 'Team Beta', team_group: 'B', coach_name: 'Coach Beta' },
    ]);
    setMatches([
      { id: '1', team_a_id: '1', team_b_id: '2', date: '2025-11-20T15:00:00Z', status: 'upcoming', match_group: 'A' },
    ]);
    setPayments([
      { id: '1', user_id: '2', amount: 5000, status: 'pending', transaction_ref: 'TXN123456789' },
    ]);
    setPosts([
      { id: '1', title: 'Tournament Update', content: 'The first round of matches starts next week!', created_at: '2025-11-15T10:00:00Z' },
    ]);
  }, []);

  // Handle tab switching
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Header */}
      {/* <AdminHeader /> */}

      {/* Main Content */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        {/* <AdminSidebar activeTab={activeTab} onTabChange={handleTabChange} /> */}

        {/* Main Panel */}
        <div className="flex-1 p-6">
          {/* Tab Navigation */}
          <div className="mb-6 border-b border-gray-700">
            <nav className="flex space-x-8">
              <button
                onClick={() => handleTabChange('users')}
                className={`py-2 px-4 font-medium text-lg ${
                  activeTab === 'users'
                    ? 'text-green-400 border-b-2 border-green-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Users
              </button>
              <button
                onClick={() => handleTabChange('teams')}
                className={`py-2 px-4 font-medium text-lg ${
                  activeTab === 'teams'
                    ? 'text-green-400 border-b-2 border-green-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Teams
              </button>
              <button
                onClick={() => handleTabChange('matches')}
                className={`py-2 px-4 font-medium text-lg ${
                  activeTab === 'matches'
                    ? 'text-green-400 border-b-2 border-green-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Matches
              </button>
              <button
                onClick={() => handleTabChange('payments')}
                className={`py-2 px-4 font-medium text-lg ${
                  activeTab === 'payments'
                    ? 'text-green-400 border-b-2 border-green-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Payments
              </button>
              <button
                onClick={() => handleTabChange('posts')}
                className={`py-2 px-4 font-medium text-lg ${
                  activeTab === 'posts'
                    ? 'text-green-400 border-b-2 border-green-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Posts
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-4">
            {activeTab === 'users' && <AdminUsers users={users} />}
            {activeTab === 'teams' && <AdminTeams teams={teams} />}
            {activeTab === 'matches' && <AdminMatches matches={matches} />}
            {activeTab === 'payments' && <AdminPayments payments={payments} />}
            {activeTab === 'posts' && <AdminPosts posts={posts} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;




















// // src/components/AdminDashboard.tsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { fetchUsers, fetchTeams, fetchMatches, fetchPendingPayments, fetchPosts } from '../api/adminApi'; // Import API calls
// import { User, Team, Match, Payment, Post } from '../types'; // Import types
// import AdminSidebar from '../components/AdminSidebar';
// import AdminHeader from '../components/AdminHeader';
// import AdminUsers from '../components/AdminUsers';
// import AdminTeams from '../components/AdminTeams';
// import AdminMatches from '../components/AdminMatches';
// import AdminPayments from '../components//AdminPayments';
// import AdminPosts from '../components/AdminPosts';

// // Define the main Admin Dashboard component
// const AdminDashboard: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<string>('users');
//   const navigate = useNavigate();

//   // State for fetched data
//   const [users, setUsers] = useState<User[]>([]);
//   const [teams, setTeams] = useState<Team[]>([]);
//   const [matches, setMatches] = useState<Match[]>([]);
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true); // Add loading state
//   const [error, setError] = useState<string | null>(null); // Add error state

//   // Fetch data on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null); // Reset error before fetching

//         const [usersData, teamsData, matchesData, paymentsData, postsData] = await Promise.allSettled([
//           fetchUsers(),
//           fetchTeams(),
//           fetchMatches(),
//           fetchPendingPayments(), // This gets pending payments specifically
//           fetchPosts(),
//         ]);

//         // Handle potential errors from individual fetches
//         if (usersData.status === 'rejected') console.error('Error fetching users:', usersData.reason);
//         if (teamsData.status === 'rejected') console.error('Error fetching teams:', teamsData.reason);
//         if (matchesData.status === 'rejected') console.error('Error fetching matches:', matchesData.reason);
//         if (paymentsData.status === 'rejected') console.error('Error fetching payments:', paymentsData.reason);
//         if (postsData.status === 'rejected') console.error('Error fetching posts:', postsData.reason);

//         // Update state only with successful results
//         setUsers(usersData.status === 'fulfilled' ? usersData.value : []);
//         setTeams(teamsData.status === 'fulfilled' ? teamsData.value : []);
//         setMatches(matchesData.status === 'fulfilled' ? matchesData.value : []);
//         setPayments(paymentsData.status === 'fulfilled' ? paymentsData.value : []);
//         setPosts(postsData.status === 'fulfilled' ? postsData.value : []);

//       } catch (err) {
//         console.error('Error fetching initial data:', err);
//         setError('Failed to load dashboard data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Handle tab switching
//   const handleTabChange = (tab: string) => {
//     setActiveTab(tab);
//   };

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen bg-black text-white">Loading...</div>;
//   }

//   if (error) {
//     return <div className="flex justify-center items-center h-screen bg-black text-white">Error: {error}</div>;
//   }

//   return (
//     <div className="bg-black min-h-screen text-white">
//       {/* Header */}
//       <AdminHeader />

//       {/* Main Content */}
//       <div className="flex flex-col md:flex-row">
//         {/* Sidebar */}
//         <AdminSidebar activeTab={activeTab} onTabChange={handleTabChange} />

//         {/* Main Panel */}
//         <div className="flex-1 p-6">
//           {/* Tab Navigation */}
//           <div className="mb-6 border-b border-gray-700">
//             <nav className="flex space-x-8">
//               <button
//                 onClick={() => handleTabChange('users')}
//                 className={`py-2 px-4 font-medium text-lg ${
//                   activeTab === 'users'
//                     ? 'text-green-400 border-b-2 border-green-400'
//                     : 'text-gray-300 hover:text-white'
//                 }`}
//               >
//                 Users
//               </button>
//               <button
//                 onClick={() => handleTabChange('teams')}
//                 className={`py-2 px-4 font-medium text-lg ${
//                   activeTab === 'teams'
//                     ? 'text-green-400 border-b-2 border-green-400'
//                     : 'text-gray-300 hover:text-white'
//                 }`}
//               >
//                 Teams
//               </button>
//               <button
//                 onClick={() => handleTabChange('matches')}
//                 className={`py-2 px-4 font-medium text-lg ${
//                   activeTab === 'matches'
//                     ? 'text-green-400 border-b-2 border-green-400'
//                     : 'text-gray-300 hover:text-white'
//                 }`}
//               >
//                 Matches
//               </button>
//               <button
//                 onClick={() => handleTabChange('payments')}
//                 className={`py-2 px-4 font-medium text-lg ${
//                   activeTab === 'payments'
//                     ? 'text-green-400 border-b-2 border-green-400'
//                     : 'text-gray-300 hover:text-white'
//                 }`}
//               >
//                 Payments
//               </button>
//               <button
//                 onClick={() => handleTabChange('posts')}
//                 className={`py-2 px-4 font-medium text-lg ${
//                   activeTab === 'posts'
//                     ? 'text-green-400 border-b-2 border-green-400'
//                     : 'text-gray-300 hover:text-white'
//                 }`}
//               >
//                 Posts
//               </button>
//             </nav>
//           </div>

//           {/* Tab Content */}
//           <div className="mt-4">
//             {activeTab === 'users' && <AdminUsers users={users} />} {/* Pass fetched data */}
//             {activeTab === 'teams' && <AdminTeams teams={teams} />} {/* Pass fetched data */}
//             {activeTab === 'matches' && <AdminMatches matches={matches} />} {/* Pass fetched data */}
//             {activeTab === 'payments' && <AdminPayments payments={payments} />} {/* Pass fetched data */}
//             {activeTab === 'posts' && <AdminPosts posts={posts} />} {/* Pass fetched data */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;