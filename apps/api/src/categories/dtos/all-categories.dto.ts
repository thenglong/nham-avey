import { Field, ObjectType } from "@nestjs/graphql"
import { Category } from "src/categories/category.entity"
import { CoreOutput } from "src/common/dtos/output.dto"

@ObjectType()
export class AllCategoriesOutput extends CoreOutput {
  @Field(type => [Category], { nullable: true })
  readonly categories?: Category[]
}
