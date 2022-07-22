import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql"
import { CoreOutput } from "src/common/dtos/output.dto"
import { PaginationArgs, PaginationOutput, PaginationWithSearchArgs } from "src/common/dtos/pagination.dto"
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

@ArgsType()
export class PaginationCategoriesArgs extends PaginationWithSearchArgs {}

@ObjectType()
export class PaginationCategoriesOutput extends PaginationOutput {
  @Field(type => [Category], { nullable: true })
  readonly categories?: Category[]
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
