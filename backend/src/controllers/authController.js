// Auth Controller - Sprint 1 (HTTP Layer)
const authService = require('../services/authService');

class AuthController {
  // POST /register
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      // Validate required fields
      if (!name || !email || !password) {
        return res.status(400).json({ 
          error: 'Name, email, and password are required' 
        });
      }

      const result = await authService.register({ name, email, password });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  // POST /login
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({ 
          error: 'Email and password are required' 
        });
      }

      const result = await authService.login({ email, password });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
