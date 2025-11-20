import React, { createContext, useState, useContext, ReactNode } from 'react';
import { usersData, User } from '../data/usersData';

type UserRole = 'admin' | 'user' | 'guest' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  currentUser: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('isAuthenticated');
    return saved === 'true';
  });

  const [userRole, setUserRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('userRole');
    return (saved as UserRole) || null;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (username: string, password: string): boolean => {
    const user = usersData.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      setIsAuthenticated(true);
      setUserRole(user.role);
      setCurrentUser(user);
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      return true;
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setCurrentUser(null);
    
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('currentUser');
  };

  const value: AuthContextType = {
    isAuthenticated,
    userRole,
    currentUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

