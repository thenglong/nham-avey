import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql"
import { Category } from "src/categories/category.entity"
import { CoreOutput } from "src/common/dtos/output.dto"

@InputType()
export class AdminCreateCategoryInput extends PickType(Category, ["name", "coverImageUrl", "iconUrl"]) {}

@ObjectType()
export class AdminCreateCategoryOutput extends CoreOutput {
  @Field(type => Category, { nullable: true })
  category?: Category
}
