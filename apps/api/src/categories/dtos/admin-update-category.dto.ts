import { Field, InputType, Int, ObjectType, PartialType, PickType } from "@nestjs/graphql"
import { Category } from "src/categories/category.entity"
import { CoreOutput } from "src/common/dtos/output.dto"

@InputType()
export class AdminUpdateCategoryInput extends PartialType(PickType(Category, ["name", "coverImageUrl", "iconUrl"])) {
  @Field(type => Int)
  readonly categoryId: number
}

@ObjectType()
export class AdminUpdateCategoryOutput extends CoreOutput {
  @Field(type => Category, { nullable: true })
  category?: Category
}
