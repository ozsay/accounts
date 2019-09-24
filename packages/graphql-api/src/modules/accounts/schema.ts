import gql from 'graphql-tag';

export default gql`
  directive @auth on FIELD_DEFINITION | OBJECT

  type Tokens {
    refreshToken: String
    accessToken: String
  }

  type LoginResult {
    sessionId: String
    tokens: Tokens
  }

  type MFALoginResult {
    mfaToken: String
    challenges: [String]
  }
  union LoginWithServiceResult = LoginResult | MFALoginResult

  type ImpersonateReturn {
    authorized: Boolean
    tokens: Tokens
    user: User
  }

  type EmailRecord {
    address: String
    verified: Boolean
  }

  type User {
    id: ID!
    emails: [EmailRecord!]
    username: String
  }

  input UserInput {
    id: ID
    email: String
    username: String
  }

  input AuthenticateParamsInput {
    type: String
  }

  type Query {
    getUser: User
  }

  type Mutation {
    impersonate(accessToken: String!, username: String!): ImpersonateReturn
    refreshTokens(accessToken: String!, refreshToken: String!): LoginResult
    logout: Boolean
    authenticate(serviceName: String!, params: AuthenticateParamsInput!): LoginWithServiceResult
    verifyAuthentication(serviceName: String!, params: AuthenticateParamsInput!): Boolean
    performMfaChallenge(
      challenge: String!
      mfaToken: String!
      params: AuthenticateParamsInput!
    ): String
  }
`;