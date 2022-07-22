import { Field, InputType, Int, ObjectType, PartialType, PickType } from "@nestjs/graphql"
import { CoreOutput } from "src/common/dtos/output.dto"
import { Category } from "src/restaurants/entities/category.entity"

@InputType()
export class AdminUpdateCategoryInput extends PartialType(PickType(Category, ["name", "coverImageUrl"])) {
  @Field(type => Int)
  readonly categoryId: number
}

@ObjectType()
export class AdminUpdateCategoryOutput extends CoreOutput {}
