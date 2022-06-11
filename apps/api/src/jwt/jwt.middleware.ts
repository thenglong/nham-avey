import { Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction, Request, Response } from "express"
import { JwtService } from "src/jwt/jwt.service"
import { User } from "src/users/entities/user.entity"
import { UserService } from "src/users/users.service"

export interface RequestWithUser extends Request {
  user?: User
}

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly UserService: UserService
  ) {}

  async use(req: RequestWithUser, _res: Response, next: NextFunction) {
    if (req.headers.authorization) {
      const token = req.headers.authorization
      const decoded = this.jwtService.verify(token.toString())
      try {
        if (typeof decoded === "object" && "id" in decoded) {
          const { user, ok } = await this.UserService.findById(decoded["id"])
          if (ok) {
            req.user = user
          }
        }
      } catch (e) {
        // TODO: Log or response error
      }
    }
    next()
  }
}
