import { readFile } from "fs/promises"

import { INestApplication } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { API_KEY_HEADER, API_KEY_NAME, SWAGGER_PATH } from "src/common/common.constants"

export const createSwagger = async (app: INestApplication) => {
  const css = await readFile("apps/api/src/assets/swagger-ui-theme-material.css", {
    encoding: "utf-8",
  })

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Nham Avey API Documentation")
    .setDescription("")
    .setVersion("1.0")
    .addApiKey(
      {
        type: "apiKey",
        name: API_KEY_HEADER,
        in: "header",
        description: "API Key",
        bearerFormat: "apiKey",
      },
      API_KEY_NAME,
    )
    .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup(SWAGGER_PATH, app, document, {
    customCss: css,
    customSiteTitle: "Nham Avey API Documentation",
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
}

export const getFileExtension = (filename: string) => {
  const ext = /^.+\.([^.]+)$/.exec(filename)
  return ext === null ? "" : ext[1]
}
