import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { GqlExecutionContext } from "@nestjs/graphql"
import { AllowedRoles } from "src/auth/role.decorator"
import { AUTHORIZATION_HEADER } from "src/common/common.constants"
import { JwtService } from "src/jwt/jwt.service"
import { UserService } from "src/users/users.service"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  private static validateToken(bearerToken: string): string {
    const match = bearerToken.match(/^Bearer (.*)$/)
    if (!match || match.length < 2) {
      throw new UnauthorizedException(
        "Invalid Authorization token - Token does not match Bearer schema"
      )
    }
    return match[1]
  }

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowedRoles>("roles", context.getHandler())
    if (!roles) {
      return true
    }
    const gqlContext = GqlExecutionContext.create(context).getContext()
    const bearerToken = gqlContext[AUTHORIZATION_HEADER]
    const token = AuthGuard.validateToken(bearerToken)

    const decoded = this.jwtService.verify(token)

    if (typeof decoded === "object" && "id" in decoded) {
      const { user } = await this.userService.findById(decoded["id"])
      if (!user) {
        return false
      }
      gqlContext["user"] = user
      if (roles.includes("Any")) {
        return true
      }
      return roles.includes(user.role)
    }
    return false
  }
}
