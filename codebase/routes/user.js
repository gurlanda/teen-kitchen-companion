const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const ErrorMessages = require('../utils/ErrorMessages');

const User = require('../models/User');
const { ADMIN, userTypes } = require('../models/userTypes');
const auth = require('../middleware/auth');

// @route   POST /api/v1/user
// @desc    Register a new user
// @access  Admin (but public for now)
router.post(
  '/',
  [
    check('name', ErrorMessages.NONEXISTENT_NAME).not().isEmpty(),
    check('email', ErrorMessages.INVALID_EMAIL).isEmail(),
    check('password', ErrorMessages.INVALID_PASSWORD).isLength({ min: 6 }),
    check('type', ErrorMessages.INVALID_USER_TYPE)
      .not()
      .isEmpty()
      .isIn(userTypes),
  ],
  async (req, res, next) => {
    // Uncomment the following lines and use the auth middleware only after re-registration of current admins
    // if (req.session.userType !== ADMIN) {
    //   return res.status(401).json({ error: ErrorMessages.INVALID_CREDENTIALS });
    // }

    // Validation middlewares to use 
    // const validation = [
    //   check('name', ErrorMessages.NONEXISTENT_NAME).not().isEmpty(),
    //   check('email', ErrorMessages.INVALID_EMAIL).isEmail(),
    //   check('password', ErrorMessages.INVALID_PASSWORD).isLength({ min: 6 }),
    //   check('type', ErrorMessages.INVALID_USER_TYPE)
    //     .not()
    //     .isEmpty()
    //     .isIn(userTypes),
    // ];

    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password, type } = req.body;

      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: ErrorMessages.DUPLICATE_USER });
      }

      // Encrypt the password before storing
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);

      // Save new user
      user = new User({ name, email, type, password: encryptedPassword });
      await user.save();

      res.status(201).json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  }
);

// @route   GET /api/v1/user
// @desc    Get user: Get a logged-in user's info
// @access  Private
router.get('/', auth, async (req, res, next) => {
  try {
    // Retrieve user data except for sensitive data
    const user = await User.findOne({ email: req.session.userEmail }).select(
      '-password -_id'
    );
    if (!user) {
      // This can happen if a user isn't logged in
      req.session.destroy();
      return res.status(400).json({ error: 'No user found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
  }
});

// @route    POST /api/v1/user/auth
// @desc     Log in a user
// @access   Public
router.post(
  '/auth',
  [
    check('email', ErrorMessages.INVALID_EMAIL).isEmail(),
    check('password', ErrorMessages.NO_PASSWORD).not().isEmpty(),
  ],
  async (req, res, next) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      // Make sure the user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .json({ error: ErrorMessages.INVALID_CREDENTIALS });
      }

      // Validate the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ error: ErrorMessages.INVALID_CREDENTIALS });
      }

      // Regenerating the session protects against a class of attacks
      req.session.regenerate((err) => {
        if (err) {
          console.log(err);
        }

        // Store email & type in session to retrieve user info in the future, if needed
        req.session.userEmail = email;
        req.session.userType = user.type;

        // Make sure that the session cookie is stored
        req.session.save((err) => {
          if (err) {
            console.log(err);
          }

          res.status(200).json({ success: true });
          next();
        });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
    }
  }
);

// @route    POST /api/v1/auth/logout
// @desc     Logout
// @access   Public
router.post('/auth/logout', async (req, res) => {
  req.session.destroy();
  return res.status(200).json({ success: true });
});

module.exports = router;
