import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem('scaams_token');
  const user = JSON.parse(localStorage.getItem('scaams_user') || 'null');

  if (!token) return <Navigate to="/login" replace />;
  if (role && user?.role !== role) {
    return <Navigate to={`/${user.role}`} replace />;
  }
  return children;
}
