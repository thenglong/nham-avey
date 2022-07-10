import { Inject, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common"
import { NextFunction, Request, Response } from "express"
import { DecodedIdToken } from "firebase-admin/auth"
import { FirebaseAuthenticationService } from "src/firebase-admin/firebase-admin-authentication.service"
import { UserRole } from "src/users/entities/user.entity"

export interface UserClaims extends DecodedIdToken {
  roles?: UserRole[]
}

export interface RequestWithUser extends Request {
  user?: UserClaims
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  @Inject(FirebaseAuthenticationService)
  private readonly firebaseAuthService: FirebaseAuthenticationService

  public static validateAndGetToken(bearerToken: string): string {
    const match = bearerToken.match(/^Bearer (.*)$/)
    if (!match || match.length < 2) {
      throw new UnauthorizedException("Invalid Authorization token - Token does not match Bearer schema")
    }
    return match[1]
  }

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    const { authorization } = req.headers
    if (!authorization) {
      return next()
    }
    const accessToken = AuthMiddleware.validateAndGetToken(authorization as string)
    const decodedIdToken = await this.firebaseAuthService.auth.verifyIdToken(accessToken)
    req.user = decodedIdToken
    next()
  }
}
