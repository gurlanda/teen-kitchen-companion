import { onCall } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import * as logger from 'firebase-functions/logger';

import { mailerOnCallFactory } from './mailerFactory';

initializeApp();

const cors = {
  cors: [/localhost:+/, 'https://teen-kitchen-companion.web.app'],
};
const testMailerHandler = mailerOnCallFactory('g.urlanda@gmail.com');
export const testMailer = onCall(cors, testMailerHandler);

export const addAdmin = onCall<string>(cors, async (request) => {
  try {
    const auth = getAuth();

    // An admin user must be logged in
    const noAdminLoggedInError =
      'Admin user must be logged in to create admin users.';
    const requestingUserId = request.auth?.uid;
    if (requestingUserId === undefined) {
      return {
        message: noAdminLoggedInError,
        error: noAdminLoggedInError,
      };
    }

    // Check if the user sending the request is admin
    const requestingUser = await auth.getUser(requestingUserId);
    const requestingUserClaims = requestingUser.customClaims;
    if (requestingUserClaims === undefined) {
      return {
        message: noAdminLoggedInError,
        error: noAdminLoggedInError,
      };
    }

    const isAdminUser = requestingUserClaims['admin'] as boolean;
    if (!isAdminUser) {
      return {
        message: noAdminLoggedInError,
        error: noAdminLoggedInError,
      };
    }

    const userToPromoteEmail = request.data;
    const userToPromote = await auth.getUserByEmail(userToPromoteEmail);

    await auth.setCustomUserClaims(userToPromote.uid, { admin: true });
    return {
      message: `Success! Promoted ${userToPromoteEmail} to admin`,
      error: null,
    };
  } catch (error) {
    logger.error(error);
    return {
      message: 'Error',
      data: request.data,
      error,
    };
  }
});
