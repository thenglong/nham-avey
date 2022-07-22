import { ArgsType, Field, InputType, Int, ObjectType, PartialType, PickType } from "@nestjs/graphql"
import { CoreOutput } from "src/common/dtos/output.dto"
import { PaginationArgs, PaginationOutput } from "src/common/dtos/pagination.dto"
import { Category } from "src/restaurants/entities/category.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"

@ObjectType()
export class AllCategoriesOutput extends CoreOutput {
  @Field(type => [Category], { nullable: true })
  readonly categories?: Category[]
}

@ArgsType()
export class PaginationCategoryRestaurantArgs extends PaginationArgs {
  @Field(type => String)
  readonly slug: string
}

@ObjectType()
export class PaginatedCategoryRestaurantOutput extends PaginationOutput {
  @Field(type => [Restaurant], { nullable: true })
  readonly restaurants?: Restaurant[]

  @Field(type => Category, { nullable: true })
  readonly category?: Category
}

@ObjectType()
export class DeleteCategoryOutput extends CoreOutput {}

@ArgsType()
export class DeleteCategoryArgs {
  @Field(type => Int)
  readonly categoryId: number
}
