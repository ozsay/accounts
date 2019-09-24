import { LoginWithServiceResultResolvers, LoginResult as GeneratedLoginResult } from '../models';

export const LoginResult = {};

export const LoginWithServiceResult: LoginWithServiceResultResolvers = {
  __resolveType(obj) {
    if ((obj as GeneratedLoginResult).tokens) {
      return 'LoginResult';
    }

    return 'MFALoginResult';
  },
};
