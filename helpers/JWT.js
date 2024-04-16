const jwt = require('jsonwebtoken');
require('dotenv').config()

// JwtManager class for signing and verifying JSON Web Tokens
class JwtManager {
  // Asynchronously sign a JSON Web Token with a payload and an optional expiration time
  sign(payload, expiresIn = '1h') {
    try {
      // Generate a signed token using the payload and JWT secret key
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
      return token;
    } catch (error) {
      throw error;
    }
  }

  // Asynchronously verify a JSON Web Token and return the decoded payload
  verify(token) {
    try {
      // Verify the token and decode its payload using the JWT secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      return decoded;
    } catch (error) {
      throw error;
    }
  }
}

// Export an instance of the JwtManager class
module.exports = new JwtManager;