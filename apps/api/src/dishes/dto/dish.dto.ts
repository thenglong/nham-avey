import { Field, ObjectType } from "@nestjs/graphql"
import { CoreOutput } from "src/common/dtos/output.dto"
import { Dish } from "src/dishes/dish.entity"

@ObjectType()
export class DishOutput extends CoreOutput {
  @Field(type => Dish, { nullable: true })
  dish?: Dish
}
