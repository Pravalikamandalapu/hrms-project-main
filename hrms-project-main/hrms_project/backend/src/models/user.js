const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Organisation = require('./organisation');
const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING }
}, { tableName: 'users' });
User.belongsTo(Organisation, { foreignKey: 'organisation_id' });
module.exports = User;
