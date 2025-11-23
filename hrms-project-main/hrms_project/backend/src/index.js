const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./db');
const Organisation = require('./models/organisation');
const User = require('./models/user');
const Employee = require('./models/employee');
const Team = require('./models/team');
const EmployeeTeam = require('./models/employeeTeam');
const Log = require('./models/log');
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');
const teamRoutes = require('./routes/teams');
const logRoutes = require('./routes/logs');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/logs', logRoutes);
// sync DB and start
const PORT = process.env.PORT || 5000;
(async () => {
  await sequelize.sync();
  app.listen(PORT, () => console.log('HRMS backend running on port', PORT));
})();
