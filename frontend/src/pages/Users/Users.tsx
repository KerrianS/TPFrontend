import React from 'react';
import Link from '../../components/Link/Link';
import { useAuth } from '../../context/AuthContext';
import Tableau from '../../components/Tableau/Tableau';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import { usersData } from '../../data/usersData';
import './Users.css';

function Users() {
  const { currentUser, logout } = useAuth();

  const tableData = usersData.map(user => ({
    id: user.id,
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    age: user.age,
    role: user.role,
    username: user.username
  }));

  return (
    <div className="users-page">
      <nav className="users-nav">
        <div className="users-nav-left">
          <Link to="/" className="nav-link">← Accueil</Link>
          {currentUser?.role === 'admin' && (
            <Link to="/admin" className="nav-link">Panneau Admin</Link>
          )}
        </div>
        <div className="users-nav-right">
          <span className="current-user-info">
            {currentUser?.prenom} {currentUser?.nom} 
            <span className={`role-badge role-${currentUser?.role}`}>
              {currentUser?.role}
            </span>
          </span>
          <ThemeToggle />
          <button onClick={logout} className="btn-logout">Déconnexion</button>
        </div>
      </nav>

      <div className="users-content">
        <h1>Liste des Utilisateurs</h1>
        <p className="users-description">
          Voici la liste complète des utilisateurs de l'application.
        </p>
        
        <Tableau 
          data={tableData}
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'nom', label: 'Nom' },
            { key: 'prenom', label: 'Prénom' },
            { key: 'email', label: 'Email' },
            { key: 'age', label: 'Âge' },
            { key: 'role', label: 'Rôle' },
            { key: 'username', label: 'Username' }
          ]}
          title=""
          storageKey="users-table"
        />
      </div>
    </div>
  );
}

export default Users;

