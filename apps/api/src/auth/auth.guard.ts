import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { RequestWithUser } from "src/auth/auth.middleware"
import { UserRole } from "src/users/entities/user.entity"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<UserRole[]>("roles", context.getHandler())
    if (!roles?.length) {
      return true
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>()
    const { user } = request
    return user?.roles?.some(role => roles.includes(role)) || false
  }
}
