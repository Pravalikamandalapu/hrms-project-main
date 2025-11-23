const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Log = sequelize.define('Log', {
  organisation_id: DataTypes.INTEGER,
  user_id: DataTypes.INTEGER,
  action: DataTypes.STRING,
  meta: DataTypes.JSON
}, { tableName: 'logs' });
module.exports = Log;
