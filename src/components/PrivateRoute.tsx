import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { ReactElement } from 'react';
import Loader from './Loader';

interface PrivateRouteProps {
  children: ReactElement;
}

/**
 * PrivateRoute component protects routes that require authentication.
 * It checks for a valid session (not user profile) since session is available
 * immediately after login, while user profile loads asynchronously.
 */
export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { session, loading, setLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking initial session
  if (loading) {
    console.log("Loading...: ", session, loading);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // If no session exists after loading is complete, redirect to login
  // Pass the current location so we can redirect back after login
  if (!session) {
    console.log("No session...: ", session, loading); 
    return <Navigate to="/login" state={{ from: location }} replace />;
  }


  // User has a valid session, render the protected route
  return children;
}