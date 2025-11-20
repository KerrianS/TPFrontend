const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'users.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erreur lors de l\'ouverture de la base de données:', err);
  } else {
    console.log('✓ Connecté à la base de données SQLite');
  }
});

const createTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      prenom TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      age INTEGER NOT NULL
    )
  `;
  
  db.run(sql, (err) => {
    if (err) {
      console.error('Erreur lors de la création de la table:', err);
    } else {
      console.log('✓ Table users créée ou déjà existante');
    }
  });
};

const seedDatabase = () => {
  db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
    if (err) {
      console.error('Erreur lors de la vérification des données:', err);
      return;
    }
    
    if (row.count === 0) {
      console.log('📊 Insertion des données de test...');
      
      const users = [
        { nom: 'Dupont', prenom: 'Jean', email: 'jean.dupont@example.com', age: 28 },
        { nom: 'Martin', prenom: 'Sophie', email: 'sophie.martin@example.com', age: 34 },
        { nom: 'Bernard', prenom: 'Pierre', email: 'pierre.bernard@example.com', age: 45 },
        { nom: 'Dubois', prenom: 'Marie', email: 'marie.dubois@example.com', age: 29 },
        { nom: 'Thomas', prenom: 'Luc', email: 'luc.thomas@example.com', age: 52 },
        { nom: 'Robert', prenom: 'Claire', email: 'claire.robert@example.com', age: 31 },
        { nom: 'Richard', prenom: 'Paul', email: 'paul.richard@example.com', age: 38 },
        { nom: 'Petit', prenom: 'Emma', email: 'emma.petit@example.com', age: 26 },
        { nom: 'Durand', prenom: 'Lucas', email: 'lucas.durand@example.com', age: 41 },
        { nom: 'Leroy', prenom: 'Julie', email: 'julie.leroy@example.com', age: 33 },
        { nom: 'Moreau', prenom: 'Nicolas', email: 'nicolas.moreau@example.com', age: 37 },
        { nom: 'Simon', prenom: 'Camille', email: 'camille.simon@example.com', age: 24 },
        { nom: 'Laurent', prenom: 'Thomas', email: 'thomas.laurent@example.com', age: 43 },
        { nom: 'Lefebvre', prenom: 'Léa', email: 'lea.lefebvre@example.com', age: 30 },
        { nom: 'Michel', prenom: 'Antoine', email: 'antoine.michel@example.com', age: 35 },
        { nom: 'Garcia', prenom: 'Sarah', email: 'sarah.garcia@example.com', age: 27 },
        { nom: 'David', prenom: 'Maxime', email: 'maxime.david@example.com', age: 39 },
        { nom: 'Bertrand', prenom: 'Chloé', email: 'chloe.bertrand@example.com', age: 32 },
        { nom: 'Roux', prenom: 'Alexandre', email: 'alexandre.roux@example.com', age: 44 },
        { nom: 'Vincent', prenom: 'Manon', email: 'manon.vincent@example.com', age: 25 }
      ];
      
      const stmt = db.prepare('INSERT INTO users (nom, prenom, email, age) VALUES (?, ?, ?, ?)');
      
      users.forEach(user => {
        stmt.run(user.nom, user.prenom, user.email, user.age);
      });
      
      stmt.finalize(() => {
        console.log('✓ Données de test insérées avec succès');
      });
    } else {
      console.log('✓ Base de données déjà peuplée');
    }
  });
};

const initDatabase = () => {
  createTable();
  setTimeout(seedDatabase, 1000); 
};

module.exports = { db, initDatabase };

