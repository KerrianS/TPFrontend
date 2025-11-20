import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';

/**
 * Composant ThemeToggle
 * Bouton pour basculer entre le thème clair et sombre
 */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Basculer le thème"
      title={`Passer au thème ${theme === 'light' ? 'sombre' : 'clair'}`}
    >
      {theme === 'light' ? (
        <span className="theme-icon">🌙</span>
      ) : (
        <span className="theme-icon">☀️</span>
      )}
      <span className="theme-text">
        {theme === 'light' ? 'Mode sombre' : 'Mode clair'}
      </span>
    </button>
  );
}

export default ThemeToggle;

