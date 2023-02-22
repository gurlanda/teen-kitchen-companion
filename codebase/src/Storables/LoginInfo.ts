import { isString } from './TypeguardUtil';

type LoginInfo = {
  userEmail: string;
  password: string;
};

export const isLoginInfo = (obj: any): obj is LoginInfo => {
  return isString(obj.userEmail) && isString(obj.password);
};

export default LoginInfo;
