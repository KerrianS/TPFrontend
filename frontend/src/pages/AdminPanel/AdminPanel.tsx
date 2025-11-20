import React from 'react';
import Link from '../../components/Link/Link';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import { usersData } from '../../data/usersData';
import './AdminPanel.css';

function AdminPanel() {
  const { currentUser, logout } = useAuth();

  const totalUsers = usersData.length;
  const adminCount = usersData.filter(u => u.role === 'admin').length;
  const userCount = usersData.filter(u => u.role === 'user').length;
  const guestCount = usersData.filter(u => u.role === 'guest').length;

  return (
    <div className="admin-page">
      <nav className="admin-nav">
        <div className="admin-nav-left">
          <Link to="/" className="nav-link">← Accueil</Link>
          <Link to="/users" className="nav-link">Utilisateurs</Link>
        </div>
        <div className="admin-nav-right">
          <span className="current-user-info">
            {currentUser?.prenom} {currentUser?.nom} 
            <span className="role-badge role-admin">ADMIN</span>
          </span>
          <ThemeToggle />
          <button onClick={logout} className="btn-logout">Déconnexion</button>
        </div>
      </nav>

      <div className="admin-content">
        <h1>Panneau d'Administration</h1>
        <p className="admin-description">
          Bienvenue dans le panneau d'administration. Vous avez accès à toutes les fonctionnalités.
        </p>

         <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-value">{totalUsers}</div>
            <div className="stat-label">Total Utilisateurs</div>
          </div>

          <div className="stat-card stat-admin">
            <div className="stat-value">{adminCount}</div>
            <div className="stat-label">Administrateurs</div>
          </div>

          <div className="stat-card stat-user">
            <div className="stat-value">{userCount}</div>
            <div className="stat-label">Utilisateurs</div>
          </div>

          <div className="stat-card stat-guest">
            <div className="stat-value">{guestCount}</div>
            <div className="stat-label">Invités</div>
          </div>
        </div>

        <div className="admin-sections">
          <div className="admin-section">
            <h2>Gestion des Utilisateurs</h2>
            <p>Gérez les comptes utilisateurs, leurs rôles et permissions.</p>
            <Link to="/users" className="admin-btn">
              Voir les utilisateurs
            </Link>
          </div>

          <div className="admin-section">
            <h2>Configuration</h2>
            <p>Configurez les paramètres de l'application.</p>
            <button className="admin-btn" disabled>
              Paramètres (Bientôt disponible)
            </button>
          </div>

          <div className="admin-section">
            <h2>Rapports</h2>
            <p>Consultez les rapports et statistiques détaillées.</p>
            <button className="admin-btn" disabled>
              Voir les rapports (Bientôt disponible)
            </button>
          </div>

          <div className="admin-section">
            <h2>Logs</h2>
            <p>Accédez aux journaux d'activité du système.</p>
            <button className="admin-btn" disabled>
              Voir les logs (Bientôt disponible)
            </button>
          </div>
        </div>

        <div className="admin-info">
          <h3>Zone Réservée aux Administrateurs</h3>
          <p>
            Cette page est accessible uniquement aux utilisateurs ayant le rôle "admin". 
            Les utilisateurs avec d'autres rôles seront redirigés vers la page "Accès refusé".
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;

