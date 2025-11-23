HRMS Backend (Node + Express + Sequelize + SQLite)
------------------------------------------------
Quick start:
1. cd backend
2. cp .env.example .env   (edit JWT_SECRET if you want)
3. npm install
4. npm run seed   # creates demo org + admin (admin@example.com / adminpass)
5. npm start
API:
- POST /api/auth/register  { orgName, adminName, email, password }
- POST /api/auth/login     { email, password }
- Protected endpoints require Authorization: Bearer <token>
- Employees: /api/employees
- Teams: /api/teams
- Logs: /api/logs
