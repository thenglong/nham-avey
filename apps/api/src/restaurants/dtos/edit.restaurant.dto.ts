import { Field, InputType, ObjectType, PartialType } from "@nestjs/graphql"
import { CoreOutput } from "src/common/dtos/output.dto"
import { AdminCreateRestaurantByInput, VendorCreateRestaurantInput } from "src/restaurants/dtos/create-restaurant.dto"

@InputType()
export class VendorUpdateRestaurantInput extends PartialType(VendorCreateRestaurantInput) {
  @Field(type => Number)
  restaurantId: number
}

@InputType()
export class AdminUpdateRestaurantInput extends PartialType(AdminCreateRestaurantByInput) {
  @Field(type => Number)
  restaurantId: number
}

@ObjectType()
export class UpdateRestaurantOutput extends CoreOutput {}
