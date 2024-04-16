const bcrypt = require('bcrypt');

// BcryptHash class for password hashing and verification
class BcryptHash {
    // Asynchronously hash a password with an optional salt
    async HashPassword(password, salt = 10) {
        try {
            // Generate a hashed password using bcrypt
            const hashedPassword = await bcrypt.hash(password, salt);
            return hashedPassword;
        } catch (err) {
            throw err;
        }
    }

    // Asynchronously verify a password against a hashed password
    async VerifyPassword(password, hashedPassword) {
        try {
            // Compare the provided password with the hashed password
            const isMatch = await bcrypt.compare(password, hashedPassword);
            return isMatch;
        } catch (err) {
            throw err;
        }
    }
}

// Export an instance of the BcryptHash class
module.exports = new BcryptHash;