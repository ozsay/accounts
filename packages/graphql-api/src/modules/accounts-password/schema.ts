import gql from 'graphql-tag';

export default gql`
  type Tokens {
    refreshToken: String
    accessToken: String
  }

  type LoginResult {
    sessionId: String
    tokens: Tokens
  }

  type TwoFactorSecretKey {
    ascii: String
    base32: String
    hex: String
    qr_code_ascii: String
    qr_code_hex: String
    qr_code_base32: String
    google_auth_qr: String
    otpauth_url: String
  }

  input TwoFactorSecretKeyInput {
    ascii: String
    base32: String
    hex: String
    qr_code_ascii: String
    qr_code_hex: String
    qr_code_base32: String
    google_auth_qr: String
    otpauth_url: String
  }

  input CreateUserInput {
    username: String
    email: String
    password: String
  }

  type Query {
    twoFactorSecret: TwoFactorSecretKey
  }

  type Mutation {
    createUser(user: CreateUserInput!): ID
    verifyEmail(token: String!): Boolean
    resetPassword(token: String!, newPassword: String!): LoginResult
    sendVerificationEmail(email: String!): Boolean
    sendResetPasswordEmail(email: String!): Boolean
    changePassword(oldPassword: String!, newPassword: String!): Boolean
    twoFactorSet(secret: TwoFactorSecretKeyInput!, code: String!): Boolean
    twoFactorUnset(code: String!): Boolean
  }
`;
