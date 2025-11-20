import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Welcome from './pages/Welcome/Welcome';
import Login from './pages/Login/Login';
import Users from './pages/Users/Users';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import Forbidden from './pages/Forbidden/Forbidden';
import './App.css';

function AppRouter() {
  const { currentPath, navigate } = useRouter();

  const renderRoute = () => {
    if (currentPath === '/login') {
      return <Login />;
    }

    if (currentPath === '/forbidden') {
      return <Forbidden />;
    }

    if (currentPath === '/users') {
      return (
        <ProtectedRoute rolesRequis={['admin', 'user', 'guest']}>
          <Users />
        </ProtectedRoute>
      );
    }

    if (currentPath === '/admin') {
      return (
        <ProtectedRoute rolesRequis={['admin']}>
          <AdminPanel />
        </ProtectedRoute>
      );
    }

    if (currentPath === '/') {
      return <Welcome />;
    }

    navigate('/');
    return null;
  };

  return <>{renderRoute()}</>;
}

function App() {
  return (
    <ThemeProvider>
      <RouterProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </RouterProvider>
    </ThemeProvider>
  );
}

export default App;

