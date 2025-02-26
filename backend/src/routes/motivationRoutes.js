const express = require('express');
const router = express.Router();
const motivationController = require('../controllers/motivationController');
const validateRequest = require('../middleware/validation');
const verifyToken = require('../middleware/auth');
const { moodSchema } = require('../validation/schemas');

// Get personalized motivation based on user profile and mood
router.get('/personalized/:mood', verifyToken, validateRequest(moodSchema), motivationController.getPersonalizedMotivation);

// Get motivation based on mood
router.get('/:mood', verifyToken, validateRequest(moodSchema), motivationController.getMotivation);

module.exports = router; 