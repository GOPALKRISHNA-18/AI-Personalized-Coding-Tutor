import React from 'react';
import { Navigate } from 'react-router-dom';
import { getItem } from '../utils/storage';
import './ProtectedRoute.css';

const ProtectedRoute = ({ children }) => {
  const token = getItem('auth_token');
  const user = getItem('current_user');
  if (!token || !user) {
    return <Navigate to='/login' replace />;
  }
  return <div className='protected-wrapper'>{children}</div>;
};

export default ProtectedRoute;