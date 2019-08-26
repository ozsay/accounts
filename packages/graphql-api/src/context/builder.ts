import { AuthenticationService } from '@accounts/types';
import { AccountsServer } from '@accounts/server';

import { RequestExtractor, SessionExtractionResult, AccountsContext } from './types';

export const context = <
  Session extends object,
  Result extends SessionExtractionResult,
  Context extends AccountsContext
>(
  requestExtractor: RequestExtractor<Session, Result>,
  accountsServer: AccountsServer,
  service?: AuthenticationService
) => async (session: Session): Promise<Context> => {
  const { token, ...sessionParams } = requestExtractor(session);

  const user = token && (await accountsServer.resumeSession(token));

  return {
    token,
    server: accountsServer,
    service,
    user,
    userId: user && user.id,
    ...sessionParams,
  } as any;
};
