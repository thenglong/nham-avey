import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql"
import { CoreOutput } from "src/common/dtos/output.dto"

@ArgsType()
export class AllRestaurantsSlugArgs {
  @Field(type => Int, { nullable: true })
  readonly take?: number
}

@ObjectType()
export class AllRestaurantsSlugOutput extends CoreOutput {
  @Field(type => [String], { nullable: true })
  readonly slugs?: string[]

  @Field(type => Int, { nullable: true })
  readonly allCount?: number
}
