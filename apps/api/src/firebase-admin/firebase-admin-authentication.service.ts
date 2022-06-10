import { Injectable } from "@nestjs/common"
import { App } from "firebase-admin/app"
import {
  ActionCodeSettings,
  AuthProviderConfig,
  AuthProviderConfigFilter,
  CreateRequest,
  DecodedIdToken,
  DeleteUsersResult,
  getAuth,
  GetUsersResult,
  ListProviderConfigResults,
  ListUsersResult,
  SessionCookieOptions,
  TenantManager,
  UpdateAuthProviderRequest,
  UpdateRequest,
  UserImportOptions,
  UserImportRecord,
  UserImportResult,
  UserRecord,
} from "firebase-admin/auth"

@Injectable()
export class FirebaseAuthenticationService {
  constructor(public readonly app: App) {}

  get auth() {
    if (!this.app) {
      throw new Error("Firebase instance is undefined.")
    }
    return getAuth(this.app)
  }

  tenantManager(): TenantManager {
    return this.auth.tenantManager()
  }
  createCustomToken(uid: string, developerClaims?: object): Promise<string> {
    return this.auth.createCustomToken(uid, developerClaims)
  }

  createUser(properties: CreateRequest): Promise<UserRecord> {
    return this.auth.createUser(properties)
  }
  deleteUser(uid: string): Promise<void> {
    return this.auth.deleteUser(uid)
  }
  deleteUsers(uids: string[]): Promise<DeleteUsersResult> {
    return this.auth.deleteUsers(uids)
  }
  getUser(uid: string): Promise<UserRecord> {
    return this.auth.getUser(uid)
  }
  getUserByEmail(email: string): Promise<UserRecord> {
    return this.auth.getUserByEmail(email)
  }
  getUserByPhoneNumber(phoneNumber: string): Promise<UserRecord> {
    return this.auth.getUserByPhoneNumber(phoneNumber)
  }
  getUserByProviderUid(providerId: string, uid: string): Promise<UserRecord> {
    return this.auth.getUserByProviderUid(providerId, uid)
  }
  getUsers(identifiers: UserRecord[]): Promise<GetUsersResult> {
    return this.auth.getUsers(identifiers)
  }
  listUsers(maxResults?: number, pageToken?: string): Promise<ListUsersResult> {
    return this.auth.listUsers(maxResults, pageToken)
  }
  updateUser(uid: string, properties: UpdateRequest): Promise<UserRecord> {
    return this.auth.updateUser(uid, properties)
  }
  verifyIdToken(idToken: string, checkRevoked?: boolean): Promise<DecodedIdToken> {
    return this.auth.verifyIdToken(idToken, checkRevoked)
  }
  setCustomUserClaims(uid: string, customUserClaims: object): Promise<void> {
    return this.auth.setCustomUserClaims(uid, customUserClaims)
  }
  revokeRefreshTokens(uid: string): Promise<void> {
    return this.auth.revokeRefreshTokens(uid)
  }
  importUsers(
    users: UserImportRecord[],
    options?: UserImportOptions
  ): Promise<UserImportResult> {
    return this.auth.importUsers(users, options)
  }
  createSessionCookie(
    idToken: string,
    sessionCookieOptions: SessionCookieOptions
  ): Promise<string> {
    return this.auth.createSessionCookie(idToken, sessionCookieOptions)
  }
  verifySessionCookie(
    sessionCookie: string,
    checkForRevocation?: boolean
  ): Promise<DecodedIdToken> {
    return this.auth.verifySessionCookie(sessionCookie, checkForRevocation)
  }
  generatePasswordResetLink(
    email: string,
    actionCodeSettings?: ActionCodeSettings
  ): Promise<string> {
    return this.auth.generatePasswordResetLink(email, actionCodeSettings)
  }
  generateEmailVerificationLink(
    email: string,
    actionCodeSettings?: ActionCodeSettings
  ): Promise<string> {
    return this.auth.generateEmailVerificationLink(email, actionCodeSettings)
  }
  generateSignInWithEmailLink(
    email: string,
    actionCodeSettings: ActionCodeSettings
  ): Promise<string> {
    return this.auth.generateSignInWithEmailLink(email, actionCodeSettings)
  }
  listProviderConfigs(
    options: AuthProviderConfigFilter
  ): Promise<ListProviderConfigResults> {
    return this.auth.listProviderConfigs(options)
  }
  getProviderConfig(providerId: string): Promise<AuthProviderConfig> {
    return this.auth.getProviderConfig(providerId)
  }
  deleteProviderConfig(providerId: string): Promise<void> {
    return this.auth.deleteProviderConfig(providerId)
  }
  updateProviderConfig(
    providerId: string,
    updatedConfig: UpdateAuthProviderRequest
  ): Promise<AuthProviderConfig> {
    return this.auth.updateProviderConfig(providerId, updatedConfig)
  }
  createProviderConfig(config: AuthProviderConfig): Promise<AuthProviderConfig> {
    return this.auth.createProviderConfig(config)
  }
}
