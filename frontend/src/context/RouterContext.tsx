import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type RouterContextType = {
  currentPath: string;
  navigate: (path: string) => void;
  goBack: () => void;
};

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter doit être utilisé dans un RouterProvider');
  }
  return context;
};

interface RouterProviderProps {
  children: ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [history, setHistory] = useState<string[]>([window.location.pathname || '/']);

  const navigate = (path: string) => {
    setCurrentPath(path);
    setHistory(prev => [...prev, path]);
    window.history.pushState({}, '', path);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const previousPath = newHistory[newHistory.length - 1];
      setCurrentPath(previousPath);
      setHistory(newHistory);
      window.history.pushState({}, '', previousPath);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const value: RouterContextType = {
    currentPath,
    navigate,
    goBack
  };

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
};

export default RouterContext;

