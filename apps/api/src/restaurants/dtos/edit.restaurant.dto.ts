import { Field, InputType, ObjectType, PartialType } from "@nestjs/graphql"
import { CoreOutput } from "src/common/dtos/output.dto"
import { VendorCreateRestaurantInput } from "src/restaurants/dtos/create-restaurant.dto"

@InputType()
export class UpdateRestaurantInput extends PartialType(VendorCreateRestaurantInput) {
  @Field(type => Number)
  restaurantId: number
}

@ObjectType()
export class UpdateRestaurantOutput extends CoreOutput {}
