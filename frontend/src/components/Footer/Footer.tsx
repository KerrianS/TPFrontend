import React from 'react';

interface Column {
  key: string;
  label: string;
}

interface FooterProps {
  data: Record<string, any>[];
  columns: Column[];
}

/**
 * Composant Footer du tableau
 * Affiche le pied de page avec le nombre total d'éléments
 */
function Footer({ data, columns }: FooterProps) {
  return (
    <tfoot>
      <tr>
        <td colSpan={columns.length}>
          <strong>Total: {data.length} utilisateur(s)</strong>
        </td>
      </tr>
    </tfoot>
  );
}

export default Footer;

