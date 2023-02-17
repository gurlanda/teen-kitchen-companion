const ErrorResponse = require('../utils/errorResponse');

// This middleware checks if the logged-in user is the owner of the data given in the request
// Requires that the field userId exists within the body and that the auth middleware has already been executed
module.exports = (req, res, next) => {
  // Check if the session exists
  if (!req.session.id) {
    return next(new ErrorResponse('Authentication error', 401));
  }

  const submittedEntry = req.body;
  if (submittedEntry?.userId !== req.session.userEmail) {
    return next(
      new ErrorResponse(
        'userId in the given entry does not match the logged-in user',
        400
      )
    );
  }

  return next();
};
