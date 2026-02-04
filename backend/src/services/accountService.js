// Account Service - Sprint 2 (Business Logic)
const { Account, User } = require('../models');

class AccountService {
  // Get user's account details
  async getAccount(userId) {
    const account = await Account.findOne({
      where: { userId },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email'],
      }],
    });

    if (!account) {
      const error = new Error('Account not found');
      error.status = 404;
      throw error;
    }

    return {
      id: account.id,
      accountNumber: account.accountNumber,
      balance: parseFloat(account.balance),
      owner: account.user,
      createdAt: account.createdAt,
    };
  }

  // Get account by ID (internal use)
  async getAccountById(accountId) {
    const account = await Account.findByPk(accountId);
    if (!account) {
      const error = new Error('Account not found');
      error.status = 404;
      throw error;
    }
    return account;
  }

  // Get account by user ID (internal use)
  async getAccountByUserId(userId) {
    return Account.findOne({ where: { userId } });
  }
}

module.exports = new AccountService();
