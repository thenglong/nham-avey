import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql"
import { CoreOutput } from "src/common/dtos/output.dto"
import { PaginationArgs, PaginationOutput } from "src/common/dtos/pagination.dto"
import { Category } from "src/restaurants/entities/category.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"

@ObjectType()
export class AllCategoriesOutput extends CoreOutput {
  @Field(type => [Category], { nullable: true })
  categories?: Category[]
}

@ArgsType()
export class PaginationCategoryRestaurantArgs extends PaginationArgs {
  @Field(type => String)
  slug: string
}

@ObjectType()
export class PaginatedCategoryRestaurantOutput extends PaginationOutput {
  @Field(type => [Restaurant], { nullable: true })
  restaurants?: Restaurant[]

  @Field(type => Category, { nullable: true })
  category?: Category
}

@ObjectType()
export class DeleteCategoryOutput extends CoreOutput {}

@ArgsType()
export class DeleteCategoryArgs {
  @Field(type => Int)
  categoryId: number
}
