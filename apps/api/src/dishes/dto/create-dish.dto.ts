import { Field, InputType, Int, PickType } from "@nestjs/graphql"
import { Dish } from "src/dishes/dish.entity"

@InputType()
export class CreateDishInput extends PickType(Dish, ["name", "price", "description", "options"]) {
  @Field(type => Int)
  restaurantId: number
}
