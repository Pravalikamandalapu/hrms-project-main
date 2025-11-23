HRMS (Human Resource Management System) - Minimal fullstack reference
-------------------------------------------------------------------
Structure:
- backend: Node + Express + Sequelize (SQLite). Zero DB setup; uses ./database.sqlite
- frontend: Vite + React

Quick run (both):
1. Backend:
   cd backend
   cp .env.example .env
   npm install
   npm run seed
   npm start
   Backend runs on http://localhost:5000

2. Frontend:
   cd frontend
   npm install
   cp .env.example .env
   npm run dev
   Frontend runs on http://localhost:5173 by default (Vite)

Notes:
- The backend uses SQLite for ease of running. For production, change Sequelize config in src/db.js to connect to Postgres/MySQL.
- Seed creates admin@example.com / adminpass (organisation: Demo Organisation).
