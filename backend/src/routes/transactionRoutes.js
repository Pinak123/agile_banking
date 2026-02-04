// Transaction Routes - Sprint 2 & 3
const express = require('express');
const transactionController = require('../controllers/transactionController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// POST /api/deposit - Deposit money (protected)
router.post('/deposit', authenticate, transactionController.deposit);

// POST /api/withdraw - Withdraw money (protected)
router.post('/withdraw', authenticate, transactionController.withdraw);

// GET /api/transactions - Get transaction history (protected)
router.get('/transactions', authenticate, transactionController.getTransactions);

module.exports = router;
