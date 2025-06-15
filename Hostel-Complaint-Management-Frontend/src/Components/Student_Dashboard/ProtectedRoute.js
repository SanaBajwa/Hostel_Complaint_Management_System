import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('userEmail'); // Check user session
  const location = useLocation(); // Get current route location

  useEffect(() => {
    // Optional: Log or handle analytics for route changes
    console.log('Navigated to:', location.pathname);
  }, [location]);

  // If the user is not logged in, redirect them to the login page
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // Render protected content if logged in
  return children;
};

export default ProtectedRoute;
