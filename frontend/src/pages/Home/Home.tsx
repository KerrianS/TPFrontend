import React, { useState, useEffect } from 'react';
import Tableau from '../../components/Tableau/Tableau';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import './Home.css';

interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  age: number;
}

function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsersFromBackend = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/users');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      const data: User[] = await response.json();
      setUsers(data);
    } catch (err) {
      console.error('Erreur backend:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersFromBackend();
  }, []);

  return (
    <div className="home-page">
      <ThemeToggle />
      <h1>TP3 - Gestion d'État et Thèmes</h1>
      
      {error && (
        <div className="info-banner warning">
          Backend non disponible - Impossible de charger les données
          <button onClick={fetchUsersFromBackend} className="retry-btn">
            Réessayer
          </button>
        </div>
      )}
      
      {!error && users.length > 0 && (
        <div className="info-banner success">
          ✓ Connecté au backend - {users.length} utilisateurs chargés
        </div>
      )}

      {loading ? (
        <div className="loading">Chargement des données...</div>
      ) : (
        <Tableau 
          data={users} 
          title="Liste des utilisateurs"
          storageKey="users-table-state"
        />
      )}
    </div>
  );
}

export default Home;

