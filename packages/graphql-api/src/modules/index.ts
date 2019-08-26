import { typeDefs, Mutation, Query } from './accounts';
import {
  typeDefs as passwordsTypeDefs,
  Mutation as PasswordsMutation,
  Query as PasswordsQuery,
} from './accounts-password';

import { AuthenticatedDirective } from '../utils/authenticated-directive';

export const services: { [key: string]: any } = {
  accounts: {
    typeDefs,
    resolvers: {
      Mutation,
      Query,
    },
    directives: {
      auth: AuthenticatedDirective,
    },
  },
  password: {
    typeDefs: passwordsTypeDefs,
    resolvers: {
      Mutation: PasswordsMutation,
      Query: PasswordsQuery,
    },
  },
};
