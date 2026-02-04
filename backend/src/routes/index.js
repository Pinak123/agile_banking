// Routes Index - Combine all routes
const express = require('express');
const authRoutes = require('./authRoutes');
const accountRoutes = require('./accountRoutes');
const transactionRoutes = require('./transactionRoutes');

const router = express.Router();

// Mount routes
router.use('/', authRoutes);           // /api/register, /api/login
router.use('/', accountRoutes);        // /api/account
router.use('/', transactionRoutes);    // /api/deposit, /api/withdraw, /api/transactions

module.exports = router;
