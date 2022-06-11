import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { NextFunction, Request, Response } from "express"
import { API_KEY_HEADER } from "src/common/common.constants"

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const serverApiKey = this.configService.get("serverApiKey")
    const apiKey = req.headers[API_KEY_HEADER]
    if (!apiKey) {
      throw new BadRequestException(`${API_KEY_HEADER} header is required`)
    }
    if (apiKey !== serverApiKey) {
      throw new UnauthorizedException("Invalid API key")
    }
    next()
  }
}
