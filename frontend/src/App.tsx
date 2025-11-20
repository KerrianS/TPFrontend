import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Welcome from './pages/Welcome/Welcome';
import Login from './pages/Login/Login';
import Users from './pages/Users/Users';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import Forbidden from './pages/Forbidden/Forbidden';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forbidden" element={<Forbidden />} />
            
            <Route element={<ProtectedRoute rolesRequis={['admin', 'user', 'guest']} />}>
              <Route path="/users" element={<Users />} />
            </Route>
            
            <Route element={<ProtectedRoute rolesRequis={['admin']} />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

