import { IncomingMessage } from 'http';
import { getClientIp } from 'request-ip';

import { SessionExtractionResult, RequestExtractor } from './types';

export interface AccountsHttpSession {
  req: IncomingMessage;
}

export interface AccountsHttpSessionResult extends SessionExtractionResult {
  ip: string;
  userAgent?: string;
}

export interface AccountsHttpConfig {
  authorizationHeader?: string;
}

const defaultConfig = {
  authorizationHeader: 'Authorization',
};

export const accountsHttpExtractor: (
  config?: AccountsHttpConfig
) => RequestExtractor<AccountsHttpSession, AccountsHttpSessionResult> = (
  config: AccountsHttpConfig = {}
) => ({ req }) => {
  const headerName = config.authorizationHeader || defaultConfig.authorizationHeader;

  const authToken = (req.headers[headerName] || req.headers[headerName.toLowerCase()]) as string;

  const userAgent: string = (req.headers['x-ucbrowser-ua'] || req.headers['user-agent']) as string;

  return {
    token: authToken && authToken.replace('Bearer ', ''),
    ip: getClientIp(req),
    userAgent,
  };
};

export default accountsHttpExtractor;
