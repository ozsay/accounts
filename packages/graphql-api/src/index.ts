import { AuthenticationService } from '@accounts/types';
import { AccountsServer } from '@accounts/server';
import { GraphQLModule } from '@graphql-modules/core';
import { DocumentNode } from 'graphql';

import {
  AccountsContext,
  SessionExtractionResult,
  RequestExtractor,
  context,
  AccountsModuleContext,
} from './context';

import { services } from './modules';

export interface ServiceDefinition<Service extends AuthenticationService> {
  service: Service;
  typeDefs: DocumentNode;
  resolvers: any;
  directives?: { [key: string]: any };
}

export function createGraphQLModuleForService<
  Session extends object,
  Result extends SessionExtractionResult,
  Service extends AuthenticationService
>(
  accountsServer: AccountsServer,
  requestExtractor: RequestExtractor<Session, Result>,
  serviceDefinition: ServiceDefinition<Service>
): GraphQLModule<any, Session, AccountsModuleContext<Service>> {
  return new GraphQLModule<any, Session, AccountsModuleContext<Service>>({
    typeDefs: serviceDefinition.typeDefs,
    resolvers: serviceDefinition.resolvers,
    context: context(requestExtractor, accountsServer, serviceDefinition.service),
    schemaDirectives: serviceDefinition.directives,
  });
}

export function createGraphQLModule<Session extends object, Result extends SessionExtractionResult>(
  accountsServer: AccountsServer,
  requestExtractor: RequestExtractor<Session, Result>,
  serviceDefinitions: { [key: string]: ServiceDefinition<any> } = {}
): GraphQLModule<any, Session, AccountsContext> {
  const servicesModules = [];
  const accountsServerServices = accountsServer.getServices();

  for (const service in accountsServerServices) {
    if (accountsServerServices[service]) {
      const accountsService = accountsServerServices[service];
      if (services[accountsService.serviceName]) {
        const serviceDefinition: ServiceDefinition<any> = {
          service: accountsService,
          typeDefs: services[accountsService.serviceName].typeDefs,
          resolvers: services[accountsService.serviceName].resolvers,
        };

        servicesModules.push(
          createGraphQLModuleForService(accountsServer, requestExtractor, serviceDefinition)
        );
      } else if (serviceDefinitions[service]) {
        servicesModules.push(
          createGraphQLModuleForService(
            accountsServer,
            requestExtractor,
            serviceDefinitions[service]
          )
        );
      }
    }
  }

  return new GraphQLModule<any, Session, AccountsContext>({
    typeDefs: services.accounts.typeDefs,
    resolvers: () =>
      ({
        ...services.accounts.resolvers,
      } as any),
    imports: servicesModules,
    schemaDirectives: services.accounts.directives,
    context: context(requestExtractor, accountsServer),
  });
}
