import { ArgsType, Field } from "@nestjs/graphql"

@ArgsType()
export class SlugArg {
  @Field(type => String)
  readonly slug: string
}
