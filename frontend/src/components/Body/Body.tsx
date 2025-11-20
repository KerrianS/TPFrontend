import React from 'react';

interface Column {
  key: string;
  label: string;
}

interface BodyProps {
  data: Record<string, any>[];
  columns: Column[];
}

/**
 * Composant Body du tableau
 * Affiche le corps du tableau avec toutes les lignes de données
 */
function Body({ data, columns }: BodyProps) {
  return (
    <tbody>
      {data.map((row, index) => (
        <tr key={row.id || index}>
          {columns.map((column) => (
            <td key={column.key}>{row[column.key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default Body;

