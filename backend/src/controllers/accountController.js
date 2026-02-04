// Account Controller - Sprint 2 (HTTP Layer)
const accountService = require('../services/accountService');

class AccountController {
  // GET /account
  async getAccount(req, res, next) {
    try {
      const userId = req.user.id;
      const account = await accountService.getAccount(userId);
      res.json(account);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AccountController();
