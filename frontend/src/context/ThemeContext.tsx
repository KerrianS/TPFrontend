import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

// Création du contexte
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme doit être utilisé dans un ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

// Provider du thème
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Récupérer le thème sauvegardé ou utiliser 'light' par défaut
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || 'light';
  });

  // Sauvegarder le thème dans localStorage et appliquer les variables CSS
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    // Appliquer les variables CSS selon le thème
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--bg-primary', '#1a1a1a');
      document.documentElement.style.setProperty('--bg-secondary', '#2d2d2d');
      document.documentElement.style.setProperty('--bg-tertiary', '#3a3a3a');
      document.documentElement.style.setProperty('--text-primary', '#e0e0e0');
      document.documentElement.style.setProperty('--text-secondary', '#b0b0b0');
      document.documentElement.style.setProperty('--border-color', '#4a4a4a');
      document.documentElement.style.setProperty('--hover-color', '#404040');
      document.documentElement.style.setProperty('--accent-color', '#8b9cff');
    } else {
      document.documentElement.style.setProperty('--bg-primary', '#ffffff');
      document.documentElement.style.setProperty('--bg-secondary', '#ffffff');
      document.documentElement.style.setProperty('--bg-tertiary', '#f9f9f9');
      document.documentElement.style.setProperty('--text-primary', '#333333');
      document.documentElement.style.setProperty('--text-secondary', '#555555');
      document.documentElement.style.setProperty('--border-color', '#e0e0e0');
      document.documentElement.style.setProperty('--hover-color', '#f8f9fa');
      document.documentElement.style.setProperty('--accent-color', '#667eea');
    }
  }, [theme]);

  // Fonction pour basculer entre les thèmes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

