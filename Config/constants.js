// Success Statuses
exports.OK = { code: 200, message: 'Success' };
exports.CREATED = { code: 201, message: 'Created' };
exports.ACCEPTED = { code: 202, message: 'Accepted' };

// Redirection Statuses
exports.NOT_MODIFIED = { code: 304, message: 'Not Modified' };

// Client Error Statuses
exports.BAD_REQUEST = { code: 400, message: 'Bad Request' };
exports.UNAUTHORIZED = { code: 401, message: 'Unauthorized' };
exports.FORBIDDEN = { code: 403, message: 'Forbidden' };
exports.NOT_FOUND = { code: 404, message: 'Not Found' };
exports.METHOD_NOT_ALLOWED = { code: 405, message: 'Method Not Allowed' };

// Server Error Statuses
exports.INTERNAL_SERVER_ERROR = { code: 500, message: 'Internal Server Error' };
exports.NOT_IMPLEMENTED = { code: 501, message: 'Not Implemented' };

// User-related Constants
exports.USER_NOT_FOUND = { code: 404, message: 'User not found.' };
exports.PASSWORD_INCORRECT = { code: 403, message: 'Password incorrect.' };
exports.ACCESS_DENIED = { code: 403, message: 'Access denied.' };
exports.TOKEN_NOT_VALID = { code: 401, message: 'Token not valid.' };
exports.INSUFFICIENT_PERMISSIONS = { code: 403, message: 'Insufficient permissions.' };
exports.INACTIVE_ACCOUNT = { code: 403, message: 'Account is inactive.' };
exports.NO_USERNAME_EMAIL = { code: 400, message: 'Invalid credentials: username or email is missing.' };
exports.NO_PASSWORD = { code: 400, message: 'Invalid credentials: password is missing.' };

// Registration
exports.USER_ALREADY_EXISTS = { code: 409, message: 'A user with this email already exists.' };
exports.REGISTRATION_FAILED = { code: 500, message: 'Registration failed.' };

// Password updates
exports.PASSWORD_UPDATE_SUCCESS = { code: 200, message: 'Password updated successfully.' };
exports.PASSWORD_UPDATE_FAILED = { code: 500, message: 'Failed to update password.' };

// Account updates
exports.ACCOUNT_UPDATE_SUCCESS = { code: 200, message: 'Account information updated successfully.' };
exports.ACCOUNT_UPDATE_FAILED = { code: 500, message: 'Failed to update account information.' };

// Login and logout
exports.LOGIN_SUCCESS = { code: 200, message: 'Login successful.' };
exports.LOGIN_FAILED = { code: 403, message: 'Login failed.' };
exports.LOGOUT_SUCCESS = { code: 200, message: 'Logout successful.' };

// Account verification
exports.ACCOUNT_ALREADY_VERIFIED = { code: 400, message: 'This account is already verified.' };
exports.ACCOUNT_VERIFICATION_SUCCESS = { code: 200, message: 'Account verified successfully.' };
exports.ACCOUNT_VERIFICATION_FAILED = { code: 500, message: 'Account verification failed.' };



// Authentication and user management
exports.USER_NOT_FOUND = 'User not found.';
exports.PASSWORD_INCORRECT = 'Password incorrect.';
exports.ACCESS_DENIED = 'Access denied.';
exports.TOKEN_NOT_VALID = 'Token not valid.';
exports.INSUFFICIENT_PERMISSIONS = 'Insufficient permissions.';
exports.INACTIVE_ACCOUNT = 'Account is inactive.';
exports.NO_USERNAME_EMAIL = 'Invalid credentials: username or email is missing.';
exports.NO_PASSWORD = 'Invalid credentials: password is missing.';

// Registration
exports.USER_ALREADY_EXISTS = 'A user with this email already exists.';
exports.REGISTRATION_FAILED = 'Registration failed.';

// Password updates
exports.PASSWORD_UPDATE_SUCCESS = 'Password updated successfully.';
exports.PASSWORD_UPDATE_FAILED = 'Failed to update password.';

// Account updates
exports.ACCOUNT_UPDATE_SUCCESS = 'Account information updated successfully.';
exports.ACCOUNT_UPDATE_FAILED = 'Failed to update account information.';

// Login and logout
exports.LOGIN_SUCCESS = 'Login successful.';
exports.LOGIN_FAILED = 'Login failed.';
exports.LOGOUT_SUCCESS = 'Logout successful.';

// Account verification
exports.ACCOUNT_ALREADY_VERIFIED = 'This account is already verified.';
exports.ACCOUNT_VERIFICATION_SUCCESS = 'Account verified successfully.';
exports.ACCOUNT_VERIFICATION_FAILED = 'Account verification failed.';



// User-related Errors with HTTP Status Codes
exports.USER_NOT_FOUND = { code: 404, message: 'User not found.' };
exports.PASSWORD_INCORRECT = { code: 403, message: 'Password incorrect.' };
exports.ACCESS_DENIED = { code: 403, message: 'Access denied.' };
exports.TOKEN_NOT_VALID = { code: 401, message: 'Token not valid.' };
exports.INSUFFICIENT_PERMISSIONS = { code: 403, message: 'Insufficient permissions.' };
exports.INACTIVE_ACCOUNT = { code: 403, message: 'Account is inactive.' };
exports.NO_USERNAME_EMAIL = { code: 400, message: 'Invalid credentials: username or email is missing.' };
exports.NO_PASSWORD = { code: 400, message: 'Invalid credentials: password is missing.' };
