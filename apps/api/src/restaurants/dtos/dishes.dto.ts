import { ArgsType, Field, InputType, Int, ObjectType, PartialType, PickType } from "@nestjs/graphql"
import { CoreOutput } from "src/common/dtos/output.dto"
import { Dish } from "src/restaurants/entities/dish.entity"

@InputType()
export class CreateDishInput extends PickType(Dish, ["name", "price", "description", "options"]) {
  @Field(type => Int)
  restaurantId: number
}

@ObjectType()
export class CreateDishOutput extends CoreOutput {}

@ArgsType()
export class DeleteDishArgs {
  @Field(type => Int)
  dishId: number
}

@ObjectType()
export class DeleteDishOutput extends CoreOutput {}

@InputType()
export class DeleteRestaurantInput {
  @Field(type => Number)
  restaurantId: number
}

@ObjectType()
export class DeleteRestaurantOutput extends CoreOutput {}

@InputType()
export class UpdateDishInput extends PickType(PartialType(Dish), ["name", "price", "description", "options"]) {
  @Field(type => Int)
  dishId: number
}

@ObjectType()
export class UpdateDishOutput extends CoreOutput {}
