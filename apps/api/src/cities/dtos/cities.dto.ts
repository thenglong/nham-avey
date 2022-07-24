import { Field, ObjectType } from "@nestjs/graphql"
import { City } from "src/cities/city.entity"
import { PaginationOutput } from "src/common/dtos/pagination.dto"

@ObjectType()
export class PaginationCitiesOutput extends PaginationOutput {
  @Field(type => [City], { nullable: true })
  readonly cities?: City[]
}
