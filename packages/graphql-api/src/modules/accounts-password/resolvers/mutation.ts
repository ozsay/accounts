import { AccountsPassword, PasswordCreateUserType } from '@accounts/password';

import { AccountsModuleContext } from '../../../context';
import { MutationResolvers } from '../models';

export const Mutation: MutationResolvers<AccountsModuleContext<AccountsPassword>> = {
  changePassword: async (_, { oldPassword, newPassword }, { user, service }) => {
    if (!(user && user.id)) {
      throw new Error('Unauthorized');
    }

    const userId = user.id;
    await service.changePassword(userId, oldPassword, newPassword);
    return null;
  },
  createUser: async (_, { user }, { service, server }) => {
    const userId = await service.createUser(user as PasswordCreateUserType);
    return server.options.ambiguousErrorMessages ? null : userId;
  },
  twoFactorSet: async (_, { code, secret }, { user, service }) => {
    // Make sure user is logged in
    if (!(user && user.id)) {
      throw new Error('Unauthorized');
    }

    const userId = user.id;

    await service.twoFactor.set(userId, secret as any, code);
    return null;
  },
  twoFactorUnset: async (_, { code }, { user, service }) => {
    // Make sure user is logged in
    if (!(user && user.id)) {
      throw new Error('Unauthorized');
    }

    const userId = user.id;

    await service.twoFactor.unset(userId, code);
    return null;
  },
  resetPassword: async (_, { token, newPassword }, { service, ip, userAgent }) => {
    return service.resetPassword(token, newPassword, { ip, userAgent });
  },
  sendResetPasswordEmail: async (_, { email }, { service }) => {
    await service.sendResetPasswordEmail(email);
    return null;
  },
  verifyEmail: async (_, { token }, { service }) => {
    await service.verifyEmail(token);
    return null;
  },
  sendVerificationEmail: async (_, { email }, { service }) => {
    await service.sendVerificationEmail(email);
    return null;
  },
};
