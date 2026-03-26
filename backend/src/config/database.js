// Database configuration using Sequelize with SQLite
const { Sequelize } = require('sequelize');
const path = require('path');

// Create SQLite database connection
// DB_PATH env var is used in Docker; falls back to local path for dev
const dbPath = process.env.DB_PATH || path.join(__dirname, '../../banking.db');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false, // Set to console.log for debugging
});

module.exports = sequelize;
