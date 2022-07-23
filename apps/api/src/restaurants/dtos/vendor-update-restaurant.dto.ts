import { Field, InputType, PartialType } from "@nestjs/graphql"
import { VendorCreateRestaurantInput } from "src/restaurants/dtos/vendor-create-restaurant.dto"

@InputType()
export class VendorUpdateRestaurantInput extends PartialType(VendorCreateRestaurantInput) {
  @Field(type => Number)
  restaurantId: number
}
