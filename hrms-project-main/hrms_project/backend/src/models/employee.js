const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Organisation = require('./organisation');
const Employee = sequelize.define('Employee', {
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING
}, { tableName: 'employees' });
Employee.belongsTo(Organisation, { foreignKey: 'organisation_id' });
module.exports = Employee;
