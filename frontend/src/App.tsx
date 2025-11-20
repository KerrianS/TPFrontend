import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// Pages
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
            {/* Route publique - Page d'accueil */}
            <Route path="/" element={<Welcome />} />
            
            {/* Route publique - Connexion */}
            <Route path="/login" element={<Login />} />
            
            {/* Route protégée - Accessible à tous les utilisateurs authentifiés */}
            <Route element={<ProtectedRoute rolesRequis={['admin', 'user', 'guest']} />}>
              <Route path="/users" element={<Users />} />
            </Route>
            
            {/* Route protégée - Accessible uniquement aux admins */}
            <Route element={<ProtectedRoute rolesRequis={['admin']} />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>
            
            {/* Route publique - Page d'accès refusé */}
            <Route path="/forbidden" element={<Forbidden />} />
            
            {/* Redirection des routes inconnues vers la page d'accueil */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

