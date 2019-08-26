import { AccountsPassword } from '@accounts/password';

import { AccountsModuleContext } from '../../../context';
import { QueryResolvers } from '../models';

export const Query: QueryResolvers<AccountsModuleContext<AccountsPassword>> = {
  twoFactorSecret: async (_, args, ctx) => {
    const { user, service } = ctx;

    // Make sure user is logged in
    if (!(user && user.id)) {
      throw new Error('Unauthorized');
    }

    // https://github.com/speakeasyjs/speakeasy/blob/master/index.js#L517
    const secret = service.twoFactor.getNewAuthSecret();
    return secret;
  },
};
