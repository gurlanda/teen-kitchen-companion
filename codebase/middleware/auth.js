const ErrorResponse = require('../utils/errorResponse');
const ErrorMessages = require('../utils/ErrorMessages');

// Checks if there's a valid session
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

  return next();
};
