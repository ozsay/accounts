import { AccountsContext } from '../../../context';
import { MutationResolvers } from '../models';

export const Mutation: MutationResolvers<AccountsContext> = {
  authenticate: async (_, args, ctx) => {
    const { serviceName, params } = args;
    const { ip, userAgent, server } = ctx;

    const authenticated = await server.loginWithService(serviceName, params, {
      ip,
      userAgent,
    });
    return authenticated;
  },
  performMfaChallenge: async (_, args, ctx) => {
    const { challenge, mfaToken, params } = args;
    const { server } = ctx;

    const loginToken = await server.performMfaChallenge(challenge, mfaToken, params);
    return loginToken;
  },
  verifyAuthentication: async (_, args, ctx) => {
    const { serviceName, params } = args;
    const { ip, userAgent, server } = ctx;

    const authenticated = await server.authenticateWithService(serviceName, params, {
      ip,
      userAgent,
    });
    return authenticated;
  },
  impersonate: async (_, args, ctx) => {
    const { accessToken, username } = args;
    const { ip, userAgent, server } = ctx;

    const impersonateRes = await server.impersonate(accessToken, { username }, ip, userAgent);

    // So ctx.user can be used in subsequent queries / mutations
    if (impersonateRes && impersonateRes.user && impersonateRes.tokens) {
      ctx.user = impersonateRes.user;
      ctx.authToken = impersonateRes.tokens.accessToken;
    }

    return impersonateRes;
  },
  logout: async (_, __, context) => {
    const { token, server } = context;

    if (token) {
      await server.logout(token);
    }

    return null;
  },
  refreshTokens: async (_, args, ctx) => {
    const { accessToken, refreshToken } = args;
    const { ip, userAgent, server } = ctx;

    const refreshedSession = await server.refreshTokens(accessToken, refreshToken, ip, userAgent);

    return refreshedSession;
  },
};
