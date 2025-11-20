import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Forbidden.css';

function Forbidden() {
  const { currentUser, isAuthenticated } = useAuth();

  return (
    <div className="forbidden-container">
      <div className="forbidden-content">
        <h1 className="forbidden-title">Accès Refusé</h1>
        <p className="forbidden-message">
          Désolé, vous n'avez pas les permissions nécessaires pour accéder à cette page.
        </p>

        {isAuthenticated && currentUser ? (
          <div className="forbidden-info">
            <p>
              Vous êtes connecté en tant que <strong>{currentUser.prenom} {currentUser.nom}</strong>
            </p>
            <p>
              Votre rôle actuel : <span className={`role-badge role-${currentUser.role}`}>
                {currentUser.role.toUpperCase()}
              </span>
            </p>
            <p className="forbidden-hint">
              Cette page nécessite des permissions différentes.
            </p>
          </div>
        ) : (
          <div className="forbidden-info">
            <p>Vous devez être connecté pour accéder à cette ressource.</p>
          </div>
        )}

        <div className="forbidden-actions">
          <Link to="/" className="btn btn-primary">
            Retour à l'accueil
          </Link>
          {isAuthenticated && (
            <Link to="/users" className="btn btn-secondary">
              Voir les utilisateurs
            </Link>
          )}
          {!isAuthenticated && (
            <Link to="/login" className="btn btn-secondary">
              Se connecter
            </Link>
          )}
        </div>

        <div className="forbidden-code">
          <span>Erreur 403</span>
        </div>
      </div>
    </div>
  );
}

export default Forbidden;

