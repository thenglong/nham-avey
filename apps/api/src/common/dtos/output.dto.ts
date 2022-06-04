import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class CoreOutput {
  @Field(() => String, { nullable: true })
  error?: Error | string | unknown

  @Field(() => Boolean)
  ok: boolean
}
