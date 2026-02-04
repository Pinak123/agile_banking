// Database configuration using Sequelize with SQLite
const { Sequelize } = require('sequelize');
const path = require('path');

// Create SQLite database connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../banking.db'),
  logging: false, // Set to console.log for debugging
});

module.exports = sequelize;
