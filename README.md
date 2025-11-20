# TP Frontend - Application React Complète

Projet complet fullstack React + Node.js/Express avec gestion d'état, thèmes light/dark, authentification et routage protégé.

## 🎯 Objectifs du TP

1. ✅ **Gestion et Persistance d'État du Tableau**
   - Tri des colonnes (ascendant/descendant)
   - Recherche/filtrage en temps réel
   - Pagination avec nombre d'éléments configurable
   - Persistance dans `sessionStorage`

2. ✅ **Implémentation du Thème Global (Light/Dark)**
   - Context API React pour la gestion du thème
   - Variables CSS (Custom Properties)
   - Persistance du thème dans `localStorage`
   - Toggle animé pour basculer entre les thèmes

3. ✅ **Backend et API REST**
   - Backend Node.js/Express
   - Base de données SQLite
   - API REST complète (CRUD)
   - CORS activé pour communication frontend-backend

4. ✅ **Routage et Authentification (TP4)**
   - React Router pour la navigation
   - AuthContext pour la gestion de l'authentification
   - Routes protégées avec vérification des rôles
   - Système de permissions (admin, user, guest)
   - Redirections conditionnelles

## 📦 Technologies Utilisées

### Frontend
- **React 18** - Bibliothèque UI
- **React Router v6** - Navigation et routage
- **React Hooks** - useState, useEffect, useMemo, useContext
- **Context API** - Gestion du thème et de l'authentification
- **TypeScript** - Typage statique
- **CSS Variables** - Thème dynamique
- **Fetch API** - Communication avec le backend

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **SQLite3** - Base de données embarquée
- **CORS** - Gestion des requêtes cross-origin

### DevOps
- **Concurrently** - Lancement simultané frontend + backend

## 🚀 Installation et Démarrage

### Installation des dépendances

```bash
# À la racine du projet - installer concurrently
npm install

# Installer toutes les dépendances (backend + frontend)
npm run install:all

# OU installer séparément :
npm run install:backend
npm run install:frontend
```

### Lancer l'application complète

**Une seule commande pour tout lancer :**

```bash
npm run dev
```

Cette commande lance automatiquement :
- ✅ Backend sur `http://localhost:5000`
- ✅ Frontend sur `http://localhost:3000`

### Lancer séparément

**Backend uniquement :**
```bash
cd backend
npm run dev
```

**Frontend uniquement :**
```bash
cd frontend
npm start
```

## 📁 Structure du Projet

```
TPFrontend/
├── backend/                       # Backend Node.js/Express
│   ├── config/
│   │   └── database.js           # Configuration SQLite
│   ├── routes/
│   │   └── users.js              # Routes API CRUD
│   ├── server.js                 # Point d'entrée backend
│   ├── package.json
│   └── users.db                  # Base de données (générée auto)
│
├── frontend/                     # Frontend React
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Tableau/              # Tableau interactif
│   │   │   ├── Header/               # En-tête avec tri
│   │   │   ├── Body/                 # Corps du tableau
│   │   │   ├── Footer/               # Pied avec total
│   │   │   ├── ThemeToggle/          # Changement de thème
│   │   │   └── ProtectedRoute/       # Route protégée 🔐
│   │   ├── context/
│   │   │   ├── ThemeContext.tsx      # Context du thème
│   │   │   └── AuthContext.tsx       # Context d'authentification 🔐
│   │   ├── pages/
│   │   │   ├── Welcome/              # Page d'accueil 🏠
│   │   │   ├── Login/                # Page de connexion 🔐
│   │   │   ├── Users/                # Liste des utilisateurs 🔒
│   │   │   ├── AdminPanel/           # Panneau admin 🔒
│   │   │   └── Forbidden/            # Accès refusé ⛔
│   │   ├── data/
│   │   │   └── usersData.ts          # Données utilisateurs simulées 🔐
│   │   ├── App.tsx                   # Configuration des routes
│   │   ├── App.css
│   │   ├── index.tsx                 # Point d'entrée React
│   │   └── index.css                 # Variables CSS globales
│   ├── ROUTING_GUIDE.md              # 📖 Guide du routage
│   └── package.json
│
├── package.json                  # Config racine avec concurrently
└── README.md
```

## 🎨 Fonctionnalités Frontend

### 1. Système d'Authentification et Routage 🔐

**Authentification simulée :**
- Système de connexion avec username/password
- Gestion des rôles : admin, user, guest
- Persistance de session (sessionStorage)

**Routes protégées :**
- Vérification de l'authentification
- Contrôle d'accès basé sur les rôles
- Redirection automatique vers /login ou /forbidden

**Pages disponibles :**
- `/` - Page d'accueil (publique)
- `/login` - Connexion (publique)
- `/users` - Liste des utilisateurs (authentifié)
- `/admin` - Panneau d'administration (admin uniquement)
- `/forbidden` - Accès refusé

**Comptes de test :**
| Rôle  | Username | Password  | Accès                    |
|-------|----------|-----------|--------------------------|
| Admin | admin    | admin123  | Toutes les pages         |
| User  | user     | user123   | Pages utilisateur        |
| Guest | guest    | guest123  | Pages en lecture seule   |

📖 **Documentation complète :** Voir [ROUTING_GUIDE.md](frontend/ROUTING_GUIDE.md)

### 2. Tableau Interactif

**Tri :**
- Cliquez sur les en-têtes de colonnes pour trier
- Flèches indiquant la direction du tri (↑ ↓)
- Tri ascendant/descendant

**Recherche :**
- Barre de recherche globale
- Recherche en temps réel dans toutes les colonnes
- Mise à jour instantanée des résultats

**Pagination :**
- Navigation Précédent/Suivant
- Choix du nombre d'éléments par page (5, 10, 20)
- Indicateur de page actuelle

**Persistance :**
- État sauvegardé dans `sessionStorage`
- Conservation du tri, page, et filtres
- Restauration automatique au rechargement

### 3. Thème Light/Dark

**Implémentation :**
- Context API React (`ThemeProvider`)
- Variables CSS pour tous les composants
- Transitions fluides entre les thèmes

**Thème Clair :**
- Fond blanc
- Texte sombre
- Couleurs vives

**Thème Sombre :**
- Fond noir/gris foncé
- Texte clair
- Couleurs adaptées

**Persistance :**
- Sauvegarde dans `localStorage`
- Thème restauré au rechargement

### 4. Connexion Backend

**Chargement des données :**
- Tentative de connexion au backend au démarrage
- Fallback sur données locales si backend indisponible
- Bannière d'information de l'état de connexion

## 🔌 API Backend

### Base URL
`http://localhost:5000/api`

### Endpoints

#### GET /api/users
Récupère tous les utilisateurs

**Réponse :**
```json
[
  {
    "id": 1,
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "jean.dupont@example.com",
    "age": 28
  }
]
```

#### GET /api/users/:id
Récupère un utilisateur par ID

#### POST /api/users
Crée un nouvel utilisateur

**Body :**
```json
{
  "nom": "Nouveau",
  "prenom": "Utilisateur",
  "email": "nouveau@example.com",
  "age": 30
}
```

#### PUT /api/users/:id
Met à jour un utilisateur

#### DELETE /api/users/:id
Supprime un utilisateur

### Documentation complète
Voir `backend/README.md` pour la documentation détaillée de l'API.

## 🗃️ Base de Données

**Type :** SQLite (fichier `backend/users.db`)

**Schéma :**
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  age INTEGER NOT NULL
);
```

**Initialisation automatique :**
- Table créée au démarrage si inexistante
- 20 utilisateurs de test insérés automatiquement

## 💡 Points Techniques Importants

### 1. Routage avec React Router v6

**Configuration des routes :**
```typescript
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/login" element={<Login />} />
    
    {/* Route protégée avec rôles */}
    <Route element={<ProtectedRoute rolesRequis={['admin', 'user', 'guest']} />}>
      <Route path="/users" element={<Users />} />
    </Route>
  </Routes>
</BrowserRouter>
```

**Navigation programmatique :**
```typescript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/users'); // Redirection
```

### 2. Gestion d'État
- **useState** : État local du composant tableau
- **useEffect** : Persistance automatique dans sessionStorage
- **useMemo** : Optimisation des calculs (tri, filtrage, pagination)

### 3. Context API

**ThemeContext :**
```typescript
const ThemeContext = createContext();
const { theme, toggleTheme } = useTheme();
```

**AuthContext :**
```typescript
const AuthContext = createContext();
const { isAuthenticated, userRole, login, logout } = useAuth();
```

### 4. Variables CSS
```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #333333;
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --text-primary: #e0e0e0;
}
```

### 5. Persistance
- **sessionStorage** : État du tableau (tri, page, filtres)
- **localStorage** : Préférence de thème

### 6. Communication API
```javascript
const response = await fetch('http://localhost:5000/api/users');
const data = await response.json();
```

## 🎓 Réponses aux Questions du TP

### TP4 : Routage et Authentification

**Objectif :** Implémenter un système complet de routage avec authentification et gestion des rôles.

**Implémentation :**

1. **AuthContext** - Gestion centralisée de l'authentification
   - `isAuthenticated` : État de connexion
   - `userRole` : Rôle de l'utilisateur
   - `login()` : Vérification des identifiants
   - `logout()` : Déconnexion

2. **ProtectedRoute** - Composant de route protégée
   - Vérifie l'authentification
   - Contrôle les rôles requis
   - Redirige vers /login ou /forbidden

3. **React Router** - Configuration des routes
   - Routes publiques (/, /login)
   - Routes protégées (/users, /admin)
   - Redirections conditionnelles

4. **Données simulées** - usersData.ts
   - 3 comptes de test avec rôles différents
   - Fonction d'authentification

**Flux de navigation :**
```
Non connecté + accès /users → Redirection /login
Connecté (user) + accès /admin → Redirection /forbidden
Connecté (admin) + accès /admin → Accès autorisé ✅
```

📖 **Guide complet :** [ROUTING_GUIDE.md](frontend/ROUTING_GUIDE.md)

---

### TP3 : Question 1 - Persistance de l'État

**Solution technique :**
- Utilisation de `sessionStorage` pour sauvegarder l'état
- Sauvegarde automatique à chaque changement avec `useEffect`
- Restauration au chargement du composant

**Avantages :**
- Persistance durant la session de navigation
- Léger et rapide
- Pas de limite de taille pour nos besoins

### TP3 : Question 2 - Thème Global

**Méthodes implémentées :**

1. **Context API :**
   - `ThemeProvider` enveloppe l'application
   - Hook `useTheme()` accessible partout
   - État global partagé

2. **Variables CSS :**
   - Custom properties CSS (`--bg-primary`, etc.)
   - Changement dynamique avec JavaScript
   - Transitions CSS automatiques

**Avantages de la double approche :**
- Context API : logique JavaScript, état React
- Variables CSS : styling, performances optimales

### TP3 : Question 3 - Architecture Backend

**Choix techniques :**
- **Node.js/Express** : Simplicité, JavaScript full-stack
- **SQLite** : Base de données embarquée, pas de serveur externe
- **API REST** : Standard, simple, bien documenté

**Protocole API REST :**
- Verbes HTTP standard (GET, POST, PUT, DELETE)
- URLs RESTful (`/api/users`, `/api/users/:id`)
- Codes de statut HTTP appropriés
- Réponses JSON

## 🧪 Tests

### Tester l'API avec curl

```bash
# Récupérer tous les utilisateurs
curl http://localhost:5000/api/users

# Créer un utilisateur
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"nom":"Test","prenom":"User","email":"test@example.com","age":25}'

# Mettre à jour un utilisateur
curl -X PUT http://localhost:5000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"nom":"Dupont","prenom":"Jean","email":"jean@example.com","age":30}'

# Supprimer un utilisateur
curl -X DELETE http://localhost:5000/api/users/1
```

## 📝 Notes de Développement

### Logs Backend
- Chaque requête HTTP est loguée avec timestamp
- Erreurs détaillées dans la console

### Mode Développement
- Nodemon : auto-reload du backend
- React : hot reload du frontend

### CORS
- Activé pour toutes les origines en développement
- À restreindre en production

## 🚀 Améliorations Possibles

- [x] ✅ Authentification utilisateur (simulée)
- [x] ✅ Gestion des rôles et permissions
- [x] ✅ Routes protégées
- [ ] Authentification JWT (backend)
- [ ] Validation des données (Joi, Yup)
- [ ] Tests unitaires et d'intégration
- [ ] Déploiement (Heroku, Vercel)
- [ ] GraphQL en alternative à REST
- [ ] Base de données PostgreSQL/MongoDB
- [ ] Pagination côté serveur
- [ ] Upload d'images pour profils

## 📄 Licence

MIT

## 👨‍💻 Auteur

TP3 - IMT Frontend Development
