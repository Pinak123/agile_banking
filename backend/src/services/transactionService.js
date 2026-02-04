// Transaction Service - Sprint 2 & 3 (Business Logic)
const { Transaction, Account, sequelize } = require('../models');

class TransactionService {
  // Deposit money into account
  async deposit(userId, amount, description = 'Deposit') {
    // Validate amount
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      const error = new Error('Amount must be a positive number');
      error.status = 400;
      throw error;
    }

    // Use transaction to ensure data consistency
    const result = await sequelize.transaction(async (t) => {
      // Get user's account
      const account = await Account.findOne({ 
        where: { userId },
        transaction: t,
        lock: true, // Lock row to prevent race conditions
      });

      if (!account) {
        const error = new Error('Account not found');
        error.status = 404;
        throw error;
      }

      // Update balance
      const newBalance = parseFloat(account.balance) + depositAmount;
      await account.update({ balance: newBalance }, { transaction: t });

      // Create transaction record
      const transaction = await Transaction.create({
        accountId: account.id,
        type: 'deposit',
        amount: depositAmount,
        balanceAfter: newBalance,
        description,
      }, { transaction: t });

      return {
        transaction: {
          id: transaction.id,
          type: transaction.type,
          amount: parseFloat(transaction.amount),
          balanceAfter: parseFloat(transaction.balanceAfter),
          description: transaction.description,
          createdAt: transaction.createdAt,
        },
        newBalance,
      };
    });

    return result;
  }

  // Withdraw money from account
  async withdraw(userId, amount, description = 'Withdrawal') {
    // Validate amount
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      const error = new Error('Amount must be a positive number');
      error.status = 400;
      throw error;
    }

    // Use transaction to ensure data consistency
    const result = await sequelize.transaction(async (t) => {
      // Get user's account
      const account = await Account.findOne({ 
        where: { userId },
        transaction: t,
        lock: true,
      });

      if (!account) {
        const error = new Error('Account not found');
        error.status = 404;
        throw error;
      }

      // Check sufficient balance
      const currentBalance = parseFloat(account.balance);
      if (currentBalance < withdrawAmount) {
        const error = new Error('Insufficient balance');
        error.status = 400;
        throw error;
      }

      // Update balance
      const newBalance = currentBalance - withdrawAmount;
      await account.update({ balance: newBalance }, { transaction: t });

      // Create transaction record
      const transaction = await Transaction.create({
        accountId: account.id,
        type: 'withdraw',
        amount: withdrawAmount,
        balanceAfter: newBalance,
        description,
      }, { transaction: t });

      return {
        transaction: {
          id: transaction.id,
          type: transaction.type,
          amount: parseFloat(transaction.amount),
          balanceAfter: parseFloat(transaction.balanceAfter),
          description: transaction.description,
          createdAt: transaction.createdAt,
        },
        newBalance,
      };
    });

    return result;
  }

  // Get transaction history for user
  async getTransactions(userId) {
    // Get user's account first
    const account = await Account.findOne({ where: { userId } });
    
    if (!account) {
      const error = new Error('Account not found');
      error.status = 404;
      throw error;
    }

    // Get all transactions for this account
    const transactions = await Transaction.findAll({
      where: { accountId: account.id },
      order: [['createdAt', 'DESC']], // Most recent first
    });

    return transactions.map(tx => ({
      id: tx.id,
      type: tx.type,
      amount: parseFloat(tx.amount),
      balanceAfter: parseFloat(tx.balanceAfter),
      description: tx.description,
      createdAt: tx.createdAt,
    }));
  }
}

module.exports = new TransactionService();
