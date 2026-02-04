// Transaction Controller - Sprint 2 & 3 (HTTP Layer)
const transactionService = require('../services/transactionService');

class TransactionController {
  // POST /deposit
  async deposit(req, res, next) {
    try {
      const userId = req.user.id;
      const { amount, description } = req.body;

      // Validate amount
      if (!amount) {
        return res.status(400).json({ error: 'Amount is required' });
      }

      const result = await transactionService.deposit(userId, amount, description);
      res.status(201).json({
        message: 'Deposit successful',
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /withdraw
  async withdraw(req, res, next) {
    try {
      const userId = req.user.id;
      const { amount, description } = req.body;

      // Validate amount
      if (!amount) {
        return res.status(400).json({ error: 'Amount is required' });
      }

      const result = await transactionService.withdraw(userId, amount, description);
      res.status(201).json({
        message: 'Withdrawal successful',
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /transactions
  async getTransactions(req, res, next) {
    try {
      const userId = req.user.id;
      const transactions = await transactionService.getTransactions(userId);
      res.json(transactions);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TransactionController();
