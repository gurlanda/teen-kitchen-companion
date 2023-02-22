import { Request, NextFunction } from 'express';
import JwtUtils from '../utils/jwtUtils';
import { TypedRequest, TypedResponse } from '../utils/TypedExpress';
import ResponseData from '../Storables/ResponseData';
import UserType from '../models/UserType';
import createLogger from '../utils/createLogger';

namespace Auth {
  // For use on private paths
  export const authenticator = async (
    req: Request,
    res: TypedResponse<null>,
    next: NextFunction
  ) => {
    const [log, end] = createLogger('Auth.authenticator()');

    // Extract token and validate
    log('Extracting and validating token.');
    const accessToken = req.headers['authorization'];
    log(`Access token:`);
    log(accessToken);
    const payload = await JwtUtils.validateAccess(accessToken ?? null);

    // Case 1: The accessToken is valid. Grant access.
    if (payload) {
      end('Validated, access granted.');
      res.locals = { loggedIn: true, ...payload };
      return next();
    }

    // Case 2: The accessToken is not valid. Don't grant access.
    // The user may then use their refresh token to obtain a new access token.
    // They can then repeat the request.
    end('Invalid access token.');
    return res
      .status(401)
      .json(new ResponseData<null>(false, null, 'Invalid token'));
  };

  // For use on admin paths. Requires authenticator() be called first.
  export const adminAuthorizer = async (
    req: Request,
    res: TypedResponse<null>,
    next: NextFunction
  ) => {
    const [log, end] = createLogger('Auth.adminAuthorizer()');

    // If not authenticated, then don't grant access
    if (!res.locals?.loggedIn) {
      end('Error, not logged in.');
      return res
        .status(500)
        .json(new ResponseData<null>(false, null, 'Server error'));
    }

    // If not an admin, then don't grant access
    if (res.locals?.user?.type !== UserType.ADMIN) {
      end('Error, Admin not logged in.');
      return res
        .status(403)
        .json(new ResponseData<null>(false, null, 'Invalid credentials'));
    }

    end('Success, access granted to admin path.');
    return next();
  };
}

export default Auth;
