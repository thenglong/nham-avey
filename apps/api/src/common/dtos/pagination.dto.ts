import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql"
import { CoreOutput } from "src/common/dtos/output.dto"

@ArgsType()
export abstract class PaginationArgs {
  @Field(() => Int, { defaultValue: 1 })
  page: number

  @Field(() => Int, { defaultValue: 20 })
  take: number

  get skip(): number {
    return (this.page - 1) * this.take
  }
}

@ArgsType()
export abstract class PaginationWithSearchArgs extends PaginationArgs {
  @Field(() => String, { nullable: true })
  q: string | null

  get searchQuery() {
    if (this.q) return null
    return `%${this.q}%`
  }
}

@ObjectType()
export class PaginationOutput extends CoreOutput {
  @Field(() => Int, { nullable: true })
  pageCount?: number

  @Field(() => Int, { nullable: true })
  matchedCount?: number

  @Field(() => Boolean, { nullable: true })
  hasPrevious?: boolean

  @Field(() => Boolean, { nullable: true })
  hasNext?: boolean
}
