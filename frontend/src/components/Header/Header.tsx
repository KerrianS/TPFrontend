import React from 'react';

interface Column {
  key: string;
  label: string;
}

interface HeaderProps {
  columns: Column[];
  onSort?: (columnKey: string) => void;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  columnFilters: Record<string, string>;
  onFilterChange?: (columnKey: string, value: string) => void;
}

/**
 * Composant Header du tableau
 * Affiche l'en-tête avec les noms des colonnes, tri et filtres
 */
function Header({ 
  columns, 
  onSort, 
  sortColumn, 
  sortDirection, 
  columnFilters, 
  onFilterChange 
}: HeaderProps) {
  const getSortIndicator = (columnKey: string): string => {
    if (sortColumn !== columnKey) return ' ⇅';
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <thead>
      {/* Ligne des en-têtes avec tri */}
      <tr className="header-row">
        {columns.map((column) => (
          <th 
            key={column.key}
            onClick={() => onSort && onSort(column.key)}
            className={onSort ? 'sortable' : ''}
            style={{ cursor: onSort ? 'pointer' : 'default' }}
          >
            {column.label}
            {onSort && <span className="sort-indicator">{getSortIndicator(column.key)}</span>}
          </th>
        ))}
      </tr>
      
      {/* Ligne des filtres */}
      {onFilterChange && (
        <tr className="filter-row">
          {columns.map((column) => (
            <th key={`filter-${column.key}`} className="filter-cell">
              <input
                type="text"
                placeholder={`Filtrer ${column.label}...`}
                value={columnFilters[column.key] || ''}
                onChange={(e) => onFilterChange(column.key, e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="column-filter-input"
              />
            </th>
          ))}
        </tr>
      )}
    </thead>
  );
}

export default Header;

