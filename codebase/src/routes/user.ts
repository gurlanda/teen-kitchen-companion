import express from 'express';
import { load } from 'ts-dotenv';
import { TypedRequest, TypedResponse } from '../utils/TypedExpress';
import * as ErrorMessages from '../utils/ErrorMessages';
import User from '../models/User';
import StorableUser, { isStorableUser } from '../Storables/StorableUser';
import Users from '../services/UserService';
import LoginInfo from '../Storables/LoginInfo';
import Sessions from '../services/SessionService';
import createLogger from '../utils/createLogger';
import { resBodyAbstractFactory } from '../Storables/ResponseData';
import JwtUtils from '../utils/jwtUtils';
import Tokens from '../Storables/Tokens';
import Auth from '../middleware/auth';
import { isString } from '../Storables/TypeguardUtil';
import { isUserType } from '../models/UserType';

const userRoutes = express.Router();
type StorableUserWithPassword = StorableUser & { password: string };
const isNewUserInfo = (arg: any): boolean =>
  isString(arg.name) &&
  isString(arg.email) &&
  isUserType(arg.type) &&
  isString(arg.password);

// Implement input verification
/**
 * @route   POST /api/v1/user
 * @desc    Register a new user
 * @access  Admin (but public for now)
 * @param   {StorableUser & { password: string }} body
 * @return  {ResponseData<null>}
 */
userRoutes.post(
  '/',
  async (
    req: TypedRequest<{}, StorableUserWithPassword>,
    res: TypedResponse<null>
  ) => {
    type Payload = null;
    const resBody = resBodyAbstractFactory<Payload>();
    const [log, end] = createLogger('POST /user (Register new user)');

    try {
      log('Get req.body...');
      const userInfo = req.body;
      if (!isNewUserInfo(req.body)) {
        end('Ill-formed body.');
        return res.status(400).json(resBody(false, null, 'Ill-formed body'));
      }

      // Check if the user already exists
      log('Validating uniqueness...');
      let user = await User.findOne({ email: userInfo.email });
      if (user) {
        log('Error, duplicate user');
        return res
          .status(400)
          .json(resBody(false, null, ErrorMessages.DUPLICATE_USER));
      }

      // Save new user
      user = new User(userInfo);
      log('Saving the new user...');
      await user.save();

      return res.status(201).json(resBody(true));
    } catch (err) {
      log('Error:');
      log(err);
      console.error(err);
      return res.status(500).json(resBody(false, null, 'Server error'));
    }
  }
);

// Implement input verification
/**
 * @route   GET /api/v1/user
 * @desc    Get user: Get a logged-in user's info
 * @access  Private
 * @return  {ResponseData<StorableUser>}
 */
userRoutes.get(
  '/',
  Auth.authenticator,
  async (req: TypedRequest, res: TypedResponse<StorableUser>) => {
    type Payload = StorableUser;
    const resBody = resBodyAbstractFactory<Payload>();
    const [log, end] = createLogger('GET /user (Get user info)');

    try {
      // Retrieve user data except for sensitive data
      const userInfo = res.locals.user;
      const user = await Users.findUser({ email: userInfo?.email });
      if (!user) {
        end(
          'Possibly server error: res.local.user is invalid after successful auth.'
        );
        return res.status(401).json(resBody(false, null, 'Unauthorized'));
      }

      end('Success, serving user info.');
      return res.status(200).json(resBody(true, user));
    } catch (e: any) {
      if (e?.kind === 'ObjectId') {
        log('Cast error.');
        end(e);
        return res.status(404).json(resBody(false));
      }

      log('Uncaught error.');
      end(e);
      return res.status(500).json(resBody(false));
    }
  }
);

/**
 * @route   POST /api/v1/user/auth
 * @desc    Log in a user
 * @access  Public
 * @param   {LoginInfo} body
 * @return  {ResponseData<Tokens & StorableUser>}
 */
userRoutes.post(
  '/auth',
  async (
    req: TypedRequest<{}, LoginInfo>,
    res: TypedResponse<Tokens & StorableUser>
  ) => {
    type Payload = Tokens & StorableUser;
    const resBody = resBodyAbstractFactory<Payload>();
    const [log, end] = createLogger('POST /user/auth (Login)');

    try {
      log('Parsing the body');
      const { userEmail, password } = req.body;

      // Make sure the user exists and validate the password
      log('Validating password');
      const isValid = await Users.validatePassword(userEmail, password);
      if (!isValid) {
        end('Invalid credentials.');
        return res
          .status(403)
          .json(resBody(false, null, ErrorMessages.INVALID_CREDENTIALS));
      }

      const user = await Users.findByEmail(userEmail);
      if (!user) {
        end('No user found.');
        return res
          .status(403)
          .json(resBody(false, null, ErrorMessages.INVALID_CREDENTIALS));
      }

      log('Creating a new session');
      const newSession = await Sessions.createSession(userEmail);

      log('Creating tokens');
      const accessToken = JwtUtils.generateAccessToken(user, newSession._id);
      const refreshToken = JwtUtils.generateRefreshToken(user, newSession._id);

      end('Success. Serving user data.');
      return res
        .status(200)
        .json(resBody(true, { accessToken, refreshToken, ...user }));
    } catch (err: any) {
      log('Error:');
      end(err);
      return res
        .status(500)
        .json(resBody(false, null, ErrorMessages.SERVER_ERROR));
    }
  }
);

/**
 * @route   PUT /api/v1/user/auth
 * @desc    Request new access token
 * @access  Public
 * @param   {{refreshToken: string}} body
 * @return  {ResponseData<{accessToken: string}>} A new access token
 */
userRoutes.put(
  '/auth',
  async (
    req: TypedRequest<{}, { refreshToken: string }>,
    res: TypedResponse<{ accessToken: string }>
  ) => {
    type Payload = { accessToken: string };
    const resBody = resBodyAbstractFactory<Payload>();
    const [log, end] = createLogger('GET /user/auth (Request access token)');

    // Extract the token
    log('Extracting the token');
    const refreshToken: string = req.body.refreshToken;

    try {
      // Validate the token
      log('Validating token');
      const payload = await JwtUtils.validateRefresh(refreshToken);
      if (!payload) {
        log('401 Error');
        return res
          .status(401)
          .json(resBody(false, null, 'Invalid credentials'));
      }

      // Create a new access token
      log('Creating new access token');
      const accessToken = JwtUtils.generateAccessToken(
        payload.user,
        payload.sessionId
      );

      log('Success, serving token');
      end();
      return res.status(200).json(resBody(true, { accessToken }));
    } catch (e: any) {
      log('Error:');
      log(e);
      end();
      return res
        .status(500)
        .json(resBody(false, null, 'Unhandled server error'));
    }
  }
);

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout
 * @access  Private
 * @return  {ResponseData<null>}
 */
userRoutes.post(
  '/auth/logout',
  Auth.authenticator,
  async (req: TypedRequest, res: TypedResponse<null>) => {
    type Payload = null;
    const resBody = resBodyAbstractFactory<Payload>();
    const [log, end] = createLogger('POST /auth/logout (Logout)');

    if (!res.locals.loggedIn || !res.locals.sessionId) {
      return res.status(200).json(resBody(true, null, 'No session found'));
    }

    Sessions.invalidateSession(res.locals.sessionId);
    return res.status(200).json(resBody(true));
  }
);

export default userRoutes;
