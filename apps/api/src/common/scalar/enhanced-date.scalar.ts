import { CustomScalar, Scalar } from "@nestjs/graphql"
import { Kind, ValueNode } from "graphql"

@Scalar("EnhancedDate", () => Date)
export class EnhancedDate implements CustomScalar<Date, Date | string | null> {
  description = "`Date` type as integer. Type represents date and time as number of milliseconds from start of UNIX epoch."

  serialize(outputValue: unknown): Date {
    return outputValue instanceof Date ? outputValue : new Date(outputValue as string)
  }

  parseValue(inputValue: unknown): Date {
    if (inputValue instanceof Date) return inputValue
    return new Date(inputValue as string)
  }

  parseLiteral(valueNode: ValueNode) {
    if (valueNode.kind === Kind.STRING) {
      return new Date(valueNode.value)
    }
    return null
  }
}
