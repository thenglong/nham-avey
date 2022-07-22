import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql"
import { CoreOutput } from "src/common/dtos/output.dto"
import { Category } from "src/restaurants/entities/category.entity"

@InputType()
export class AdminCreateCategoryInput extends PickType(Category, ["name", "coverImageUrl"]) {}

@ObjectType()
export class AdminCreateCategoryOutput extends CoreOutput {
  @Field(type => Category, { nullable: true })
  category?: Category
}
