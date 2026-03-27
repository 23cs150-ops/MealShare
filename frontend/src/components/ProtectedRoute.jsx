import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  const loginPath = role === 'ngo' ? '/login/ngo' : '/login/restaurant';
  if (!user) return <Navigate to={loginPath} replace />;
  if (role && user.role !== role) return <Navigate to={loginPath} replace />;
  return children;
};

export default ProtectedRoute;
