import { ArgsType, Field, Int } from "@nestjs/graphql"

@ArgsType()
export class IdArg {
  @Field(type => Int)
  readonly id: number
}
