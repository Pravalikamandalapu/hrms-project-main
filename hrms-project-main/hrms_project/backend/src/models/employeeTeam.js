const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Employee = require('./employee');
const Team = require('./team');
const EmployeeTeam = sequelize.define('EmployeeTeam', {
  assigned_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'employee_teams' });
Employee.belongsToMany(Team, { through: EmployeeTeam, foreignKey: 'employee_id' });
Team.belongsToMany(Employee, { through: EmployeeTeam, foreignKey: 'team_id' });
module.exports = EmployeeTeam;
