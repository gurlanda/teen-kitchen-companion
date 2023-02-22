import jwt from 'jsonwebtoken';
import StorableUser from '../Storables/StorableUser';
import { load } from 'ts-dotenv';
import Users from '../services/UserService';
import Sessions from '../services/SessionService';
import createLogger from './createLogger';

type TokenPayload = {
  user: StorableUser;
  sessionId: string;
};

const env = load({
  ACCESS_PUBLIC_KEY: String,
  ACCESS_PRIVATE_KEY: String,
  REFRESH_PUBLIC_KEY: String,
  REFRESH_PRIVATE_KEY: String,
  ACCESS_TOKEN_TTL: String,
  REFRESH_TOKEN_TTL: String,
});
const formatMultiline = (input: string): string => {
  return input.replaceAll('\\n', '\n');
};

const envr = {
  ACCESS_PUBLIC_KEY: formatMultiline(env.ACCESS_PUBLIC_KEY),
  ACCESS_PRIVATE_KEY: formatMultiline(env.ACCESS_PRIVATE_KEY),
  ACCESS_TOKEN_TTL: env.ACCESS_TOKEN_TTL,
  REFRESH_PUBLIC_KEY: formatMultiline(env.REFRESH_PUBLIC_KEY),
  REFRESH_PRIVATE_KEY: formatMultiline(env.REFRESH_PRIVATE_KEY),
  REFRESH_TOKEN_TTL: env.REFRESH_TOKEN_TTL,
};

namespace JwtUtils {
  const sign = (
    payload: TokenPayload,
    privateKey: string,
    tokenLifetime: string
  ) => {
    return jwt.sign(payload, privateKey, {
      expiresIn: tokenLifetime,
      algorithm: 'RS256',
    });
  };

  const unpackToken = (
    token: string | null,
    publicKey: string
  ): TokenPayload | null => {
    const [log, end] = createLogger('unpackToken()');

    if (!token) {
      return null;
    }

    try {
      const decoded = jwt.verify(token, publicKey) as TokenPayload;
      return decoded;
    } catch (e: any) {
      log('Error:');
      end(e);
      return null;
    }
  };

  export const unpackAccessToken = (
    accessToken: string | null
  ): TokenPayload | null => {
    return unpackToken(accessToken, envr.ACCESS_PUBLIC_KEY);
  };

  const unpackRefreshToken = (
    refreshToken: string | null
  ): TokenPayload | null => {
    return unpackToken(refreshToken, envr.REFRESH_PUBLIC_KEY);
  };

  /**
   * Validates a token payload.
   *
   * A payload is valid if and only if all the following hold:
   * - The payload exists
   * - payload.user.email exists and identifies an existing user
   * - payload.sessionId exists and identifies an existing session
   * - session.valid === true
   * - session.user === payload.user.email
   * @param {TokenPayload | null} payload
   * @returns {Promise<TokenPayload | null>} Returns the payload unchanged if it is valid. If it was invalid, returns null.
   */
  const validatePayload = async (
    payload: TokenPayload | null
  ): Promise<TokenPayload | null> => {
    if (!payload) {
      return null;
    }

    const userEmail = payload.user.email;
    if (!userEmail) {
      return null;
    }

    const sessionId = payload.sessionId;
    if (!sessionId) {
      return null;
    }

    const user = await Users.findByEmail(userEmail);
    if (!user) {
      return null;
    }

    const session = await Sessions.findById(sessionId);
    if (!session) {
      return null;
    }

    if (!session.isValid) {
      return null;
    }

    if (session.user !== userEmail) {
      return null;
    }

    return payload;
  };

  export const generateAccessToken = (
    user: StorableUser,
    sessionId: string
  ) => {
    return sign(
      { user, sessionId },
      envr.ACCESS_PRIVATE_KEY,
      envr.ACCESS_TOKEN_TTL
    );
  };

  export const generateRefreshToken = (
    user: StorableUser,
    sessionId: string
  ) => {
    return sign(
      { user, sessionId },
      envr.REFRESH_PRIVATE_KEY,
      envr.REFRESH_TOKEN_TTL
    );
  };

  export const validateAccess = async (accessToken: string | null) => {
    const payload = unpackAccessToken(accessToken);
    return validatePayload(payload);
  };

  export const validateRefresh = async (refreshToken: string | null) => {
    const payload = unpackRefreshToken(refreshToken);
    return validatePayload(payload);
  };
}

export default JwtUtils;
