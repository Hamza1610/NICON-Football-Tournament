// File: src/components/PrivateRoute.tsx (or .jsx)
import { useAuth } from '../context/AuthContext'; // Adjust path as needed
import { Navigate, useLocation } from 'react-router-dom';
import { ReactElement } from 'react';

interface PrivateRouteProps {
  children: ReactElement; // The component to render if authenticated
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading } = useAuth();
//   const location = useLocation(); // Get the current location

  // If auth is still loading, you might want to show a spinner or similar
  // Alternatively, you could show nothing, or a skeleton layout matching your dashboard
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // If user is not authenticated after loading is complete, redirect to login
  // Pass the current location in state so we can redirect back after login if desired
//   if (!user) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

  // If user is authenticated, render the protected children
  return children;
}