import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql"
import { CoreOutput } from "src/common/dtos/output.dto"

interface PaginateOptions {
  page: number
  take: number
  skip: number
}

const PAGE_DEFAULT_VALUE = 1
const TAKE_DEFAULT_VALUE = 20

@ArgsType()
export abstract class PaginationArgs {
  @Field(() => Int, { defaultValue: PAGE_DEFAULT_VALUE })
  // use options getter instead
  page: number

  @Field(() => Int, { defaultValue: TAKE_DEFAULT_VALUE })
  // use options getter instead
  take: number

  /**
   * https://github.com/nestjs/graphql/issues/1511
   */
  get pageOptions(): PaginateOptions {
    const page = this.page ?? PAGE_DEFAULT_VALUE
    const take = this.take ?? TAKE_DEFAULT_VALUE
    const skip = (page - 1) * take
    return {
      skip,
      take,
      page,
    }
  }
}

@ArgsType()
export abstract class PaginationWithSearchArgs extends PaginationArgs {
  @Field(() => String, { nullable: true })
  q: string | null

  get searchQuery() {
    if (this.q) return `%${this.q.trim()}%`
    return null
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
