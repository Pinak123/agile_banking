// JWT Configuration
module.exports = {
  secret: process.env.JWT_SECRET || 'simple-banking-secret-key-for-agile-course',
  expiresIn: '24h', // Token expires in 24 hours
};
