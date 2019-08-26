import { User, AuthenticationService } from '@accounts/types';
import { AccountsServer } from '@accounts/server';

export interface AccountsContext {
  server: AccountsServer;
  token?: string;
  user?: User;
  userId?: string;
  [key: string]: any;
}

export interface AccountsModuleContext<Service extends AuthenticationService>
  extends AccountsContext {
  service: Service;
}

export interface SessionExtractionResult {
  token?: string;
}

export type RequestExtractor<Session extends object, Result extends SessionExtractionResult> = (
  session: Session
) => Result;
