import { Field, InputType, PickType } from "@nestjs/graphql"
import { IsString, MinLength } from "class-validator"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"

@InputType()
export class VendorCreateRestaurantInput extends PickType(Restaurant, ["name", "coverImageUrls", "address", "logoImageUrl"]) {
  @Field(type => [String], { nullable: true })
  @IsString({ each: true })
  @MinLength(2, { each: true })
  categories: string[] | null
}
