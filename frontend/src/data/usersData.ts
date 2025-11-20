export interface User {
  id: number;
  username: string;
  password: string;
  nom: string;
  prenom: string;
  email: string;
  age: number;
  role: 'admin' | 'user' | 'guest';
}

export const usersData: User[] = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    nom: 'Administrateur',
    prenom: 'Système',
    email: 'admin@example.com',
    age: 35,
    role: 'admin'
  },
  {
    id: 2,
    username: 'user',
    password: 'user123',
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'jean.dupont@example.com',
    age: 28,
    role: 'user'
  },
  {
    id: 3,
    username: 'guest',
    password: 'guest123',
    nom: 'Martin',
    prenom: 'Marie',
    email: 'marie.martin@example.com',
    age: 22,
    role: 'guest'
  },
  {
    id: 4,
    username: 'alice',
    password: 'alice123',
    nom: 'Bernard',
    prenom: 'Alice',
    email: 'alice.bernard@example.com',
    age: 30,
    role: 'user'
  },
  {
    id: 5,
    username: 'bob',
    password: 'bob123',
    nom: 'Petit',
    prenom: 'Bob',
    email: 'bob.petit@example.com',
    age: 25,
    role: 'guest'
  }
];

