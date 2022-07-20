import { ArgsType, Field, InputType, Int, ObjectType, PartialType, PickType } from "@nestjs/graphql"
import { IsString, MinLength } from "class-validator"
import { CoreOutput } from "src/common/dtos/output.dto"
import { PaginationOutput, PaginationWithSearchArgs } from "src/common/dtos/pagination.dto"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"

@ArgsType()
export class PaginationRestaurantsArgs extends PaginationWithSearchArgs {}

@ObjectType()
export class RestaurantsOutput extends PaginationOutput {
  @Field(type => [Restaurant], { nullable: true })
  results?: Restaurant[]
}

@InputType()
export class VendorCreateRestaurantInput extends PickType(Restaurant, ["name", "coverImageUrls", "address", "logoImageUrl"]) {
  @Field(type => [String], { nullable: true })
  @IsString({ each: true })
  @MinLength(2, { each: true })
  categories: string[] | null
}

@InputType()
export class AdminCreateRestaurantInput extends VendorCreateRestaurantInput {
  @Field(type => [String])
  @IsString({ each: true })
  vendorIds: string[]
}

@InputType()
export class VendorUpdateRestaurantInput extends PartialType(VendorCreateRestaurantInput) {
  @Field(type => Number)
  restaurantId: number
}

@InputType()
export class AdminUpdateRestaurantInput extends PartialType(AdminCreateRestaurantInput) {
  @Field(type => Number)
  restaurantId: number
}

@ObjectType()
export class UpdateRestaurantOutput extends CoreOutput {}

@ArgsType()
export class RestaurantArgs {
  @Field(type => Int)
  restaurantId: number
}

@ObjectType()
export class RestaurantOutput extends CoreOutput {
  @Field(type => Restaurant, { nullable: true })
  restaurant?: Restaurant
}

@ObjectType()
export class PaginatedRestaurantsOutput extends PaginationOutput {
  @Field(type => [Restaurant], { nullable: true })
  restaurants?: Restaurant[]
}

@ObjectType()
export class MyRestaurantOutput extends CoreOutput {
  @Field(type => Restaurant, { nullable: true })
  restaurant?: Restaurant | null
}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {
  @Field(type => Restaurant, { nullable: true })
  restaurant?: Restaurant
}
