import { Field, ObjectType } from "@nestjs/graphql"
import { Category } from "src/categories/category.entity"
import { PaginationOutput } from "src/common/dtos/pagination.dto"

@ObjectType()
export class PaginationCategoriesOutput extends PaginationOutput {
  @Field(type => [Category], { nullable: true })
  readonly categories?: Category[]
}
