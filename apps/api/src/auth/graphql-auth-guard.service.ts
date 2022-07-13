import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { GqlExecutionContext } from "@nestjs/graphql"
import { AuthMiddleware } from "src/auth/auth.middleware"
import { AUTHORIZATION_HEADER } from "src/common/common.constants"
import { FirebaseAuthenticationService } from "src/firebase-admin/firebase-admin-authentication.service"
import { UserRole } from "src/users/entities/user.entity"

@Injectable()
export class GraphqlAuthGuard implements CanActivate {
  @Inject(FirebaseAuthenticationService)
  private readonly firebaseAuthService: FirebaseAuthenticationService

  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<UserRole[]>("roles", context.getHandler())
    if (!roles?.length) {
      return true
    }

    const gqlContext = GqlExecutionContext.create(context).getContext()
    const authorization = gqlContext[AUTHORIZATION_HEADER]
    if (!authorization) {
      return false
    }

    const accessToken = AuthMiddleware.validateAndGetToken(authorization as string)
    const decodedIdToken = await this.firebaseAuthService.verifyIdToken(accessToken)
    gqlContext["user"] = decodedIdToken

    return decodedIdToken?.roles?.some((role: UserRole) => roles.includes(role)) || false
  }
}
