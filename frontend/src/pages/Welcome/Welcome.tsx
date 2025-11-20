import React from 'react';
import Link from '../../components/Link/Link';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import './Welcome.css';

function Welcome() {
  const { isAuthenticated, currentUser, logout } = useAuth();

  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <ThemeToggle />
      </div>

      <div className="welcome-content">
        <h1 className="welcome-title">Bienvenue sur l'Application</h1>
        
        {isAuthenticated && currentUser ? (
          <div className="welcome-authenticated">
            <p className="welcome-user">
              Bonjour, <strong>{currentUser.prenom} {currentUser.nom}</strong>
            </p>
            <p className="welcome-role">
              Rôle : <span className={`role-badge role-${currentUser.role}`}>
                {currentUser.role.toUpperCase()}
              </span>
            </p>
            
            <div className="welcome-actions">
              <Link to="/users" className="btn btn-primary">
                Voir les utilisateurs
              </Link>
              {currentUser.role === 'admin' && (
                <Link to="/admin" className="btn btn-secondary">
                  Panneau d'administration
                </Link>
              )}
              <button onClick={logout} className="btn btn-logout">
                Se déconnecter
              </button>
            </div>
          </div>
        ) : (
          <div className="welcome-guest">
            <p className="welcome-description">
              Connectez-vous pour accéder aux fonctionnalités de l'application.
            </p>
            <Link to="/login" className="btn btn-primary">
              Se connecter
            </Link>
          </div>
        )}

        <div className="welcome-info">
          <h2>Fonctionnalités</h2>
          <ul>
            <li>Authentification sécurisée</li>
            <li>Gestion des utilisateurs</li>
            <li>Thème clair / sombre</li>
            <li>Tableaux interactifs</li>
            <li>Routes protégées par rôle</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Welcome;

