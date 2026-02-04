// Auth Service - Sprint 1 (Business Logic)
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const { User, Account } = require('../models');

class AuthService {
  // Register new user and create account
  async register({ name, email, password }) {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      const error = new Error('Email already registered');
      error.status = 400;
      throw error;
    }

    // Create user
    const user = await User.create({ name, email, password });

    // Auto-create bank account for user (one account per user)
    await Account.create({
      userId: user.id,
      accountNumber: Account.generateAccountNumber(),
      balance: 0.00,
    });

    return { message: 'Registration successful', userId: user.id };
  }

  // Login user
  async login({ email, password }) {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      const error = new Error('Invalid email or password');
      error.status = 401;
      throw error;
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      const error = new Error('Invalid email or password');
      error.status = 401;
      throw error;
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    return {
      token,
      user: user.toJSON(),
    };
  }
}

module.exports = new AuthService();
