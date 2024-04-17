const express = require('express');
const router = express.Router();
const userController = require('../Controllers//user.Controllers');
const { isAuthenticate } = require('../Middlewares/isAuth.middlwares');
const checkPermissions = require('../Middlewares/checkPermissions.middlwares');
const { checkBlacklist } = require('../Middlewares/tokenBlack.middlwares');
const { cacheData } = require('../libs/REDISconnection');

// CRUD operations for User
router.post('/users/create', checkBlacklist,isAuthenticate,checkPermissions('Users','create'),userController.createUser);      // Create a new user
router.get('/users/:id', checkBlacklist,isAuthenticate,checkPermissions('Customers','view'),cacheData('cached_user'),userController.getUser);      // Get a specific user by ID
router.put('/users/:id',checkBlacklist,isAuthenticate,checkPermissions('Users','edit'), userController.updateUser);   // Update a specific user by ID
router.delete('/users/:id',checkBlacklist,isAuthenticate,checkPermissions('Users','delete'), userController.deleteUser);// Delete a specific user by ID

// Authentication routes
router.post('/users/login', userController.loginUser);       // User login
router.post('/users/logout',isAuthenticate,checkBlacklist, userController.logoutUser);     // User logout

// Password management
router.post('/users/:id/password', userController.changePassword); // Change password for a user

// Role assignment (assuming role management is part of user management)
router.post('/users/:id/role', userController.assignRole); // Assign a role to a user

// Additional routes can be added as needed, such as:
// - Route for resetting passwords
// - Route for verifying user accounts
// - Routes for managing user permissions, if not handled directly by role management

module.exports = router;
