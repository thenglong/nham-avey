import { ArgsType, Field, ObjectType } from "@nestjs/graphql"
import { PaginationArgs, PaginationOutput } from "src/common/dtos/pagination.dto"
import { Category } from "src/restaurants/entities/category.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"

@ArgsType()
export class CategoryInput extends PaginationArgs {
  @Field(type => String)
  slug: string
}

@ObjectType()
export class CategoryOutput extends PaginationOutput {
  @Field(type => [Restaurant], { nullable: true })
  restaurants?: Restaurant[]
  @Field(type => Category, { nullable: true })
  category?: Category
}
