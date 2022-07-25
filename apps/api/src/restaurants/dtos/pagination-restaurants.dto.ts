import { Field, ObjectType } from "@nestjs/graphql"
import { PaginationOutput } from "src/common/dtos/pagination.dto"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"

@ObjectType()
export class PaginatedRestaurantsOutput extends PaginationOutput {
  @Field(type => [Restaurant], { nullable: true })
  data?: Restaurant[]
}
