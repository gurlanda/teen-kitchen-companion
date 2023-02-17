import * as ops from '../types';

const AuthReducer = (state, action) => {
  switch (action.type) {
    case ops.LOAD_USER: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    }

    case ops.AUTH_ERROR:
    case ops.LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }

    default:
      throw new TypeError(
        'In AuthReducer: Passed in action has invalid or unhandled type'
      );
  }
};

export default AuthReducer;
