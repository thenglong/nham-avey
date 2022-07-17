import { ArgsType, Field, ObjectType } from "@nestjs/graphql"
import { PaginationArgs, PaginationOutput } from "src/common/dtos/pagination.dto"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"

@ArgsType()
export class SearchRestaurantArgs extends PaginationArgs {
  @Field(type => String, { defaultValue: "", nullable: true })
  query: string
}

@ObjectType()
export class SearchRestaurantOutput extends PaginationOutput {
  @Field(type => [Restaurant], { nullable: true })
  restaurants?: Restaurant[]
}
