const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// @route    POST api/auth/register
// @desc     Register a user
// @access   Public
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], authController.register);

// @route    POST api/auth/login
// @desc     Authenticate user and get token
// @access   Public
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], authController.login);

// @route    GET api/auth/protected
// @desc     Get user data
// @access   Private
router.get('/protected', auth, authController.getProtectedData);

// @route    GET api/auth/profile
// @desc     Get user profile
// @access   Private
router.get('/profile', auth, authController.getUserProfile);

// @route    PUT api/auth/profile
// @desc     Update user profile
// @access   Private
router.put('/profile', auth, authController.updateUserProfile);

module.exports = router;
