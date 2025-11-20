import React, { useState, useEffect, useMemo } from 'react';
import Header from '../Header/Header';
import Body from '../Body/Body';
import Footer from '../Footer/Footer';
import './Tableau.css';

export interface Column {
  key: string;
  label: string;
}

interface TableauState {
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  currentPage: number;
  itemsPerPage: number;
  filters: Record<string, string>;
}

interface TableauProps {
  data: Record<string, any>[];
  columns?: Column[];
  title?: string;
  storageKey?: string;
}

const defaultColumns: Column[] = [
  { key: 'id', label: 'ID' },
  { key: 'nom', label: 'Nom' },
  { key: 'prenom', label: 'Prénom' },
  { key: 'email', label: 'Email' },
  { key: 'age', label: 'Âge' }
];

/**
 * Composant Tableau générique avec gestion d'état
 */
function Tableau({ 
  data, 
  columns = defaultColumns, 
  title, 
  storageKey = 'tableau-state' 
}: TableauProps) {
  // État initial récupéré depuis sessionStorage
  const getInitialState = (): TableauState => {
    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'état:', error);
    }
    return {
      sortColumn: null,
      sortDirection: 'asc',
      currentPage: 1,
      itemsPerPage: 5,
      filters: {}
    };
  };

  const [state, setState] = useState<TableauState>(getInitialState);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>(() => {
    try {
      const saved = sessionStorage.getItem(`${storageKey}-filters`);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des filtres:', error);
    }
    return {};
  });

  // Sauvegarder l'état dans sessionStorage à chaque changement
  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(state));
      sessionStorage.setItem(`${storageKey}-filters`, JSON.stringify(columnFilters));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'état:', error);
    }
  }, [state, columnFilters, storageKey]);

  // Filtrer les données par colonne
  const filteredData = useMemo(() => {
    return data.filter(row => {
      return columns.every(col => {
        const filterValue = columnFilters[col.key];
        if (!filterValue || filterValue.trim() === '') return true;
        
        const cellValue = String(row[col.key]).toLowerCase();
        const filter = filterValue.toLowerCase();
        return cellValue.includes(filter);
      });
    });
  }, [data, columnFilters, columns]);

  // Trier les données
  const sortedData = useMemo(() => {
    if (!state.sortColumn) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aVal = a[state.sortColumn!];
      const bVal = b[state.sortColumn!];
      
      if (aVal === bVal) return 0;
      
      const comparison = aVal < bVal ? -1 : 1;
      return state.sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, state.sortColumn, state.sortDirection]);

  // Paginer les données
  const paginatedData = useMemo(() => {
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    return sortedData.slice(startIndex, startIndex + state.itemsPerPage);
  }, [sortedData, state.currentPage, state.itemsPerPage]);

  const totalPages = Math.ceil(sortedData.length / state.itemsPerPage);

  // Fonction de tri
  const handleSort = (columnKey: string) => {
    setState(prev => ({
      ...prev,
      sortColumn: columnKey,
      sortDirection: prev.sortColumn === columnKey && prev.sortDirection === 'asc' ? 'desc' : 'asc',
      currentPage: 1
    }));
  };

  // Fonction de changement de page
  const handlePageChange = (newPage: number) => {
    setState(prev => ({ ...prev, currentPage: newPage }));
  };

  // Fonction de changement du nombre d'éléments par page
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(prev => ({ 
      ...prev, 
      itemsPerPage: parseInt(e.target.value),
      currentPage: 1 
    }));
  };

  // Fonction de gestion des filtres par colonne
  const handleColumnFilter = (columnKey: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [columnKey]: value
    }));
    setState(prev => ({ ...prev, currentPage: 1 })); // Retour à la page 1
  };

  // Fonction pour réinitialiser tous les filtres
  const clearAllFilters = () => {
    setColumnFilters({});
    setState(prev => ({ ...prev, currentPage: 1 }));
  };

  // Vérifier si des filtres sont actifs
  const hasActiveFilters = Object.values(columnFilters).some(filter => filter && filter.trim() !== '');

  return (
    <div className="tableau-container">
      {title && <h2 className="tableau-title">{title}</h2>}
      
      {/* Contrôles du tableau */}
      <div className="tableau-controls">
        <div className="items-per-page">
          <label>
            Lignes par page:
            <select value={state.itemsPerPage} onChange={handleItemsPerPageChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
        
        {hasActiveFilters && (
          <button onClick={clearAllFilters} className="clear-filters-btn">
            ✕ Réinitialiser les filtres
          </button>
        )}
      </div>

      <table className="tableau">
        <Header 
          columns={columns} 
          onSort={handleSort}
          sortColumn={state.sortColumn}
          sortDirection={state.sortDirection}
          columnFilters={columnFilters}
          onFilterChange={handleColumnFilter}
        />
        <Body data={paginatedData} columns={columns} />
        <Footer data={sortedData} columns={columns} />
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => handlePageChange(state.currentPage - 1)}
            disabled={state.currentPage === 1}
            className="pagination-btn"
          >
            Précédent
          </button>
          
          <span className="pagination-info">
            Page {state.currentPage} sur {totalPages}
          </span>
          
          <button 
            onClick={() => handlePageChange(state.currentPage + 1)}
            disabled={state.currentPage === totalPages}
            className="pagination-btn"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}

export default Tableau;

