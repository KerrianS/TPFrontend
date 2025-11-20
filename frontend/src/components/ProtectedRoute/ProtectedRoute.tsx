import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../context/RouterContext';

interface ProtectedRouteProps {
  rolesRequis: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ rolesRequis, children }) => {
  const { isAuthenticated, userRole } = useAuth();
  const { navigate } = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (userRole && !rolesRequis.includes(userRole)) {
      navigate('/forbidden');
      return;
    }
  }, [isAuthenticated, userRole, rolesRequis, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  if (userRole && !rolesRequis.includes(userRole)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

