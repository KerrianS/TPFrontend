const express = require('express');
const router = express.Router();
const { db } = require('../config/database');

/**
 * GET /api/users
 * Récupérer tous les utilisateurs
 */
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM users ORDER BY id';
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs:', err);
      return res.status(500).json({ 
        error: 'Erreur serveur lors de la récupération des données',
        message: err.message 
      });
    }
    
    res.json(rows);
  });
});

/**
 * GET /api/users/:id
 * Récupérer un utilisateur par son ID
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM users WHERE id = ?';
  
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', err);
      return res.status(500).json({ 
        error: 'Erreur serveur',
        message: err.message 
      });
    }
    
    if (!row) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    
    res.json(row);
  });
});

/**
 * POST /api/users
 * Créer un nouvel utilisateur
 */
router.post('/', (req, res) => {
  const { nom, prenom, email, age } = req.body;
  
  if (!nom || !prenom || !email || !age) {
    return res.status(400).json({ 
      error: 'Tous les champs sont requis (nom, prenom, email, age)' 
    });
  }
  
  const sql = 'INSERT INTO users (nom, prenom, email, age) VALUES (?, ?, ?, ?)';
  
  db.run(sql, [nom, prenom, email, age], function(err) {
    if (err) {
      console.error('Erreur lors de la création de l\'utilisateur:', err);
      return res.status(500).json({ 
        error: 'Erreur lors de la création',
        message: err.message 
      });
    }
    
    res.status(201).json({
      id: this.lastID,
      nom,
      prenom,
      email,
      age
    });
  });
});

/**
 * PUT /api/users/:id
 * Mettre à jour un utilisateur
 */
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nom, prenom, email, age } = req.body;
  
  if (!nom || !prenom || !email || !age) {
    return res.status(400).json({ 
      error: 'Tous les champs sont requis (nom, prenom, email, age)' 
    });
  }
  
  const sql = 'UPDATE users SET nom = ?, prenom = ?, email = ?, age = ? WHERE id = ?';
  
  db.run(sql, [nom, prenom, email, age, id], function(err) {
    if (err) {
      console.error('Erreur lors de la mise à jour:', err);
      return res.status(500).json({ 
        error: 'Erreur lors de la mise à jour',
        message: err.message 
      });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    
    res.json({
      id: parseInt(id),
      nom,
      prenom,
      email,
      age
    });
  });
});

/**
 * DELETE /api/users/:id
 * Supprimer un utilisateur
 */
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  
  db.run(sql, [id], function(err) {
    if (err) {
      console.error('Erreur lors de la suppression:', err);
      return res.status(500).json({ 
        error: 'Erreur lors de la suppression',
        message: err.message 
      });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    
    res.json({ message: 'Utilisateur supprimé avec succès' });
  });
});

module.exports = router;

