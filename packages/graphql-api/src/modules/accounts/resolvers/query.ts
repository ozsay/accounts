import { AccountsContext } from '../../../context';
import { QueryResolvers } from '../models';

export const Query: QueryResolvers<AccountsContext> = {
  getUser: (_, __, context) => context.user || null,
};
