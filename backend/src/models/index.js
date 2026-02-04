// Models Index - Define relationships
const sequelize = require('../config/database');
const User = require('./User');
const Account = require('./Account');
const Transaction = require('./Transaction');

// Define relationships

// User has one Account (one-to-one)
User.hasOne(Account, { 
  foreignKey: 'userId', 
  as: 'account',
  onDelete: 'CASCADE',
});
Account.belongsTo(User, { 
  foreignKey: 'userId', 
  as: 'user',
});

// Account has many Transactions (one-to-many)
Account.hasMany(Transaction, { 
  foreignKey: 'accountId', 
  as: 'transactions',
  onDelete: 'CASCADE',
});
Transaction.belongsTo(Account, { 
  foreignKey: 'accountId', 
  as: 'account',
});

// Sync database (create tables if not exist)
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: false }); // Use { force: true } to reset
    console.log('✅ Database synchronized');
  } catch (error) {
    console.error('❌ Database sync error:', error);
  }
};

module.exports = {
  sequelize,
  User,
  Account,
  Transaction,
  syncDatabase,
};
