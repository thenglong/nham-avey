import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql"
import { CoreOutput } from "src/common/dtos/output.dto"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"

@InputType()
export class VendorCreateRestaurantInput extends PickType(Restaurant, ["name", "coverImg", "address"]) {
  @Field(type => String)
  categoryName: string
}

@InputType()
export class AdminCreateRestaurantByInput extends VendorCreateRestaurantInput {
  @Field(type => String)
  vendorId: string
}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {
  @Field(type => Restaurant, { nullable: true })
  restaurant?: Restaurant
}
