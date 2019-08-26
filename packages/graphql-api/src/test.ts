import { AccountsServer } from '@accounts/server';
import { AccountsPassword } from '@accounts/password';
import { Mongo } from '@accounts/mongo';
import { MongoClient } from 'mongodb';

import { ApolloServer } from 'apollo-server';

import { createGraphQLModule } from '.';
import { accountsHttpExtractor } from './context';

const { MONGO_URL = 'mongodb://localhost:27017', DB_NAME = 'accounts-js' } = process.env;

async function create() {
  const mongoClient = (await MongoClient.connect(MONGO_URL)).db(DB_NAME);

  const accountsServer = new AccountsServer(
    { tokenSecret: 'baba', db: new Mongo(mongoClient) },
    {
      password: new AccountsPassword(),
    }
  );

  const mod = createGraphQLModule(accountsServer, accountsHttpExtractor());

  const apolloServer = new ApolloServer({
    modules: [mod],
    context: mod.context,
  });

  apolloServer.listen(8080);
}

create();
