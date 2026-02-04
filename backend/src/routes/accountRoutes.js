// Account Routes - Sprint 2
const express = require('express');
const accountController = require('../controllers/accountController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// GET /api/account - Get user's account (protected)
router.get('/account', authenticate, accountController.getAccount);

module.exports = router;
