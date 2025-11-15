// src/components/AdminPosts.tsx
import React, { useState } from 'react';

interface Post {
  id: string;
  admin_id: string;
  title: string;
  content: string;
  media_url?: string;
  created_at: string;
}

interface AdminPostsProps {
  posts: Post[];
}

const AdminPosts: React.FC<AdminPostsProps> = ({ posts }) => {
  const [newPost, setNewPost] = useState({ title: '', content: '', media_url: '' });

  const handleCreatePost = () => {
    // Implement create post logic
    console.log('Create post:', newPost);
    // Example: fetch('/api/posts', { method: 'POST', body: JSON.stringify(newPost), headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } })
    setNewPost({ title: '', content: '', media_url: '' });
  };

  const handleDeletePost = (postId: string) => {
    // Implement delete post logic
    console.log('Delete post:', postId);
    // Example: fetch(`/api/posts/${postId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } })
  };

  const handleUpdatePost = (postId: string) => {
    // Implement update post logic
    console.log('Update post:', postId);
    // Example: Navigate to an edit post page or open a modal
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-400 mb-4">Manage Announcements</h2>

      {/* Create Post Form */}
      <div className="mb-6 p-4 bg-gray-800 rounded">
        <h3 className="text-xl font-semibold mb-3">Create New Announcement</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <textarea
            placeholder="Content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            rows={4}
          />
          <input
            type="text"
            placeholder="Media URL (optional)"
            value={newPost.media_url}
            onChange={(e) => setNewPost({ ...newPost, media_url: e.target.value })}
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <button
          onClick={handleCreatePost}
          className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
        >
          Publish Announcement
        </button>
      </div>

      {/* Post List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-800 p-4 rounded">
            <h3 className="font-semibold text-lg text-green-400">{post.title}</h3>
            <p className="text-sm text-gray-400 mb-2">Published: {new Date(post.created_at).toLocaleString()}</p>
            <p className="mb-2">{post.content}</p>
            {post.media_url && (
              <img src={post.media_url} alt="Media" className="max-w-full h-auto mt-2 rounded" />
            )}
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleUpdatePost(post.id)}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPosts;