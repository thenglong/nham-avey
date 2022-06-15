import { Logger, ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "src/app/app.module"
import { createSwagger } from "src/common/common.helpers"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = "api/v1"
  app.setGlobalPrefix(globalPrefix)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.enableCors()

  const configService: ConfigService = app.get(ConfigService)
  const port: number = configService.get<number>("port") || 3333

  const showSwagger = configService.get<boolean>("enableSwagger")
  if (showSwagger) {
    await createSwagger(app)
  }

  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
}

bootstrap()
