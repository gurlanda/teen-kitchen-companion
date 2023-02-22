import { FilterQuery, UpdateQuery } from 'mongoose';
import config from 'config';
import Session, { SessionDocument } from '../models/Session';
// import { signJwt, unpackJwt } from '../utils/jwtUtils';
import Users from './UserService';
import createLogger from '../utils/createLogger';

namespace Sessions {
  export const createSession = async (userEmail: string) => {
    const [log, end] = createLogger('Sessions > createSession()');
    log('Creating a session');
    const session = await Session.create({ user: userEmail, isValid: true });
    log('Session created. Returning...');

    // TODO: Create and return tokens as TokenPayload
    return session;
  };

  export const findById = async (sessionId: string) => {
    return await Session.findById(sessionId);
  };

  export const find = async (query: FilterQuery<SessionDocument>) => {
    return await Session.findOne(query);
  };

  export const findSessions = async (query: FilterQuery<SessionDocument>) => {
    return await Session.find(query).lean();
  };

  export const updateSession = async (
    query: FilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>
  ) => {
    return Session.updateOne(query, update);
  };

  export const invalidateSession = async (sessionId: String) => {
    const session = await updateSession({ _id: sessionId }, { valid: false });
  };

  // const reissueAccessToken = async (refreshToken: string) => {
  //   const { decoded } = unpackJwt(refreshToken);
  //   if (!decoded) {
  //     return null;
  //   }

  //   const session = await Session.findById(decoded.sessionId);
  //   if (!session || !session.isValid) {
  //     return null;
  //   }

  //   const user = await Users.findUser({ _id: session.user });
  //   if (!user) {
  //     return null;
  //   }

  //   const accessToken = signJwt(
  //     { user, sessionId: session._id },
  //     { expiresIn: config.get('accessTokenTtl') } // 15 minutes
  //   );
  //   return accessToken;
  // };
}

export default Sessions;
