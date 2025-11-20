import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { navigate } = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username.trim() || !password.trim()) {
      setError('Veuillez remplir tous les champs');
      setIsLoading(false);
      return;
    }

    const success = login(username, password);

    if (success) {
      navigate('/users');
    } else {
      setError('Identifiants incorrects. Veuillez réessayer.');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Connexion</h1>
        <p className="login-subtitle">Veuillez vous connecter pour accéder à l'application</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre nom d'utilisateur"
              disabled={isLoading}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="login-info">
          <h3>Comptes de test :</h3>
          <ul>
            <li><strong>Admin:</strong> admin / admin123</li>
            <li><strong>Utilisateur:</strong> user / user123</li>
            <li><strong>Invité:</strong> guest / guest123</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;

