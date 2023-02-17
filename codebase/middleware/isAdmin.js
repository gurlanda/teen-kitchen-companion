const ErrorResponse = require('../utils/errorResponse');
const ErrorMessages = require('../utils/ErrorMessages');
const { ADMIN } = require('../models/userTypes');

// Verifies that there is a valid session and that the currently-logged-in user is an admin
module.exports = (req, res, next) => {
  // Check if the session exists
  if (!req.session.id) {
    return next(new ErrorResponse('Authentication error', 401));
  }

  // Check if the session is valid
  if (!req.session.userEmail || !req.session.userType) {
    req.session.destroy();
    return res.status(400).json({ error: ErrorMessages.INVALID_SESSION });
  }

  // Check if the user is an admin
  if (req.session.userType !== ADMIN) {
    return res.status(401).json({ error: ErrorMessages.INVALID_CREDENTIALS });
  }

  return next();
};
