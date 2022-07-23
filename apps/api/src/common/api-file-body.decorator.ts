import { applyDecorators } from "@nestjs/common"
import { ApiBody, ApiExtraModels, getSchemaPath } from "@nestjs/swagger"

export const ApiFileBody = ({ key, required }: { key: string; required: boolean }) => {
  // use empty class to make swagger work properly
  const extraModel = class File {}

  return applyDecorators(
    ApiExtraModels(extraModel),
    ApiBody({
      schema: {
        allOf: [{ $ref: getSchemaPath(extraModel) }],
        properties: {
          [key]: {
            type: "string",
            format: "binary",
          },
        },
        required: required ? [key] : [],
      },
    }),
  )
}
