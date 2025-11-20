const express = require('express');
const cors = require('cors');
const { initDatabase } = require('./config/database');
const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue sur l\'API TP3 Frontend',
    version: '1.0.0',
    endpoints: {
      users: {
        getAll: 'GET /api/users',
        getOne: 'GET /api/users/:id',
        create: 'POST /api/users',
        update: 'PUT /api/users/:id',
        delete: 'DELETE /api/users/:id'
      }
    }
  });
});

app.use('/api/users', usersRouter);
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route non trouvée',
    path: req.originalUrl 
  });
});

app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({ 
    error: 'Erreur serveur interne',
    message: err.message 
  });
});

initDatabase();

app.listen(PORT, () => {
  console.log('\n========================================');
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}`);
  console.log('========================================\n');
});

process.on('SIGINT', () => {
  console.log('\n⚠️  Arrêt du serveur...');
  process.exit(0);
});

module.exports = app;

