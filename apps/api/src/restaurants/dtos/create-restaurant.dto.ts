import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql"
import { IsString, MinLength } from "class-validator"
import { CoreOutput } from "src/common/dtos/output.dto"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"

@InputType()
export class VendorCreateRestaurantInput extends PickType(Restaurant, ["name", "coverImg", "address"]) {
  @Field(type => [String], { nullable: true })
  @IsString({ each: true })
  @MinLength(2, { each: true })
  categories: string[] | null
}

@InputType()
export class AdminCreateRestaurantInput extends VendorCreateRestaurantInput {
  @Field(type => String)
  @IsString()
  vendorId: string
}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {
  @Field(type => Restaurant, { nullable: true })
  restaurant?: Restaurant
}
