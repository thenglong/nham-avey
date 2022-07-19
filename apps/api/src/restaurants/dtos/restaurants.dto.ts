import { ArgsType, Field, ObjectType } from "@nestjs/graphql"
import { PaginationOutput, PaginationWithSearchArgs } from "src/common/dtos/pagination.dto"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"

@ArgsType()
export class PaginationRestaurantsArgs extends PaginationWithSearchArgs {}

@ObjectType()
export class RestaurantsOutput extends PaginationOutput {
  @Field(type => [Restaurant], { nullable: true })
  results?: Restaurant[]
}
