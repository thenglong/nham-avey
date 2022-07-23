import { Field, InputType, Int, PartialType, PickType } from "@nestjs/graphql"
import { Dish } from "src/dishes/dish.entity"

@InputType()
export class UpdateDishInput extends PickType(PartialType(Dish), ["name", "price", "description", "options"]) {
  @Field(type => Int)
  dishId: number
}
