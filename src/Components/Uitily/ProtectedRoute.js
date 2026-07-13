import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import baseUrl from '../../Api/baseURL';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    if (token && (!parsedUser?.role || parsedUser?.role === 'undefined')) {
      baseUrl.get('/users/getMe', {
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => {
        const profile = response?.data?.data || response?.data?.user || response?.data || parsedUser;
        if (profile) {
          localStorage.setItem('user', JSON.stringify(profile));
          setUser(profile);
        }
      }).catch(() => {
        setUser(parsedUser);
      });
    } else {
      setUser(parsedUser);
    }
  }, [location.pathname]);

  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
