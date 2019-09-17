/* tslint:disable */
import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthenticateParamsInput = {
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type CreateUserInput = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type LoginResult = {
  __typename?: 'LoginResult';
  sessionId?: Maybe<Scalars['String']>;
  tokens?: Maybe<Tokens>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<Scalars['ID']>;
  verifyEmail?: Maybe<Scalars['Boolean']>;
  resetPassword?: Maybe<LoginResult>;
  sendVerificationEmail?: Maybe<Scalars['Boolean']>;
  sendResetPasswordEmail?: Maybe<Scalars['Boolean']>;
  changePassword?: Maybe<Scalars['Boolean']>;
  twoFactorSet?: Maybe<Scalars['Boolean']>;
  twoFactorUnset?: Maybe<Scalars['Boolean']>;
};

export type MutationCreateUserArgs = {
  user: CreateUserInput;
};

export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};

export type MutationResetPasswordArgs = {
  token: Scalars['String'];
  newPassword: Scalars['String'];
};

export type MutationSendVerificationEmailArgs = {
  email: Scalars['String'];
};

export type MutationSendResetPasswordEmailArgs = {
  email: Scalars['String'];
};

export type MutationChangePasswordArgs = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type MutationTwoFactorSetArgs = {
  secret: TwoFactorSecretKeyInput;
  code: Scalars['String'];
};

export type MutationTwoFactorUnsetArgs = {
  code: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  twoFactorSecret?: Maybe<TwoFactorSecretKey>;
};

export type Tokens = {
  __typename?: 'Tokens';
  refreshToken?: Maybe<Scalars['String']>;
  accessToken?: Maybe<Scalars['String']>;
};

export type TwoFactorSecretKey = {
  __typename?: 'TwoFactorSecretKey';
  ascii?: Maybe<Scalars['String']>;
  base32?: Maybe<Scalars['String']>;
  hex?: Maybe<Scalars['String']>;
  qr_code_ascii?: Maybe<Scalars['String']>;
  qr_code_hex?: Maybe<Scalars['String']>;
  qr_code_base32?: Maybe<Scalars['String']>;
  google_auth_qr?: Maybe<Scalars['String']>;
  otpauth_url?: Maybe<Scalars['String']>;
};

export type TwoFactorSecretKeyInput = {
  ascii?: Maybe<Scalars['String']>;
  base32?: Maybe<Scalars['String']>;
  hex?: Maybe<Scalars['String']>;
  qr_code_ascii?: Maybe<Scalars['String']>;
  qr_code_hex?: Maybe<Scalars['String']>;
  qr_code_base32?: Maybe<Scalars['String']>;
  google_auth_qr?: Maybe<Scalars['String']>;
  otpauth_url?: Maybe<Scalars['String']>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  TwoFactorSecretKey: ResolverTypeWrapper<TwoFactorSecretKey>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Mutation: ResolverTypeWrapper<{}>;
  CreateUserInput: CreateUserInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  LoginResult: ResolverTypeWrapper<LoginResult>;
  Tokens: ResolverTypeWrapper<Tokens>;
  TwoFactorSecretKeyInput: TwoFactorSecretKeyInput;
  AuthenticateParamsInput: AuthenticateParamsInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  TwoFactorSecretKey: TwoFactorSecretKey;
  String: Scalars['String'];
  Mutation: {};
  CreateUserInput: CreateUserInput;
  ID: Scalars['ID'];
  Boolean: Scalars['Boolean'];
  LoginResult: LoginResult;
  Tokens: Tokens;
  TwoFactorSecretKeyInput: TwoFactorSecretKeyInput;
  AuthenticateParamsInput: AuthenticateParamsInput;
};

export type LoginResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LoginResult'] = ResolversParentTypes['LoginResult']
> = {
  sessionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tokens?: Resolver<Maybe<ResolversTypes['Tokens']>, ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createUser?: Resolver<
    Maybe<ResolversTypes['ID']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, 'user'>
  >;
  verifyEmail?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationVerifyEmailArgs, 'token'>
  >;
  resetPassword?: Resolver<
    Maybe<ResolversTypes['LoginResult']>,
    ParentType,
    ContextType,
    RequireFields<MutationResetPasswordArgs, 'token' | 'newPassword'>
  >;
  sendVerificationEmail?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationSendVerificationEmailArgs, 'email'>
  >;
  sendResetPasswordEmail?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationSendResetPasswordEmailArgs, 'email'>
  >;
  changePassword?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationChangePasswordArgs, 'oldPassword' | 'newPassword'>
  >;
  twoFactorSet?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationTwoFactorSetArgs, 'secret' | 'code'>
  >;
  twoFactorUnset?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationTwoFactorUnsetArgs, 'code'>
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  twoFactorSecret?: Resolver<Maybe<ResolversTypes['TwoFactorSecretKey']>, ParentType, ContextType>;
};

export type TokensResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Tokens'] = ResolversParentTypes['Tokens']
> = {
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type TwoFactorSecretKeyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TwoFactorSecretKey'] = ResolversParentTypes['TwoFactorSecretKey']
> = {
  ascii?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  base32?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hex?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  qr_code_ascii?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  qr_code_hex?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  qr_code_base32?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  google_auth_qr?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  otpauth_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  LoginResult?: LoginResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tokens?: TokensResolvers<ContextType>;
  TwoFactorSecretKey?: TwoFactorSecretKeyResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
