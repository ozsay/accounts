import { AccountsContext } from '../context';

export const authenticated = <
  Resolver extends (...args: any[]) => any,
  Context extends AccountsContext
>(
  func: Resolver
) => async (root: any, args: any, context: Context, info: any) => {
  if (!context.user) {
    throw new Error('Unauthorized');
  }
  return func(root, args, context, info);
};
