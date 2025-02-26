const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateRequest = require('../middleware/validation');
const verifyToken = require('../middleware/auth');
const { loginSchema, signupSchema, passwordChangeSchema, profileUpdateSchema } = require('../validation/schemas');

// Login route
router.post('/login', validateRequest(loginSchema), authController.login);

// Signup route
router.post('/signup', validateRequest(signupSchema), authController.signup);

// Logout route
router.post('/logout', verifyToken, authController.logout);

// Get user profile
router.get('/profile', verifyToken, authController.getProfile);

// Update user profile
router.put('/profile', verifyToken, validateRequest(profileUpdateSchema), authController.updateProfile);

// Change password
router.post('/change-password', verifyToken, validateRequest(passwordChangeSchema), authController.changePassword);

// Refresh token
router.post('/refresh-token', verifyToken, authController.refreshToken);

module.exports = router; 