import { Field, ObjectType } from "@nestjs/graphql"
import { City } from "src/cities/city.entity"
import { CoreOutput } from "src/common/dtos/output.dto"

@ObjectType()
export class AllCitiesOutput extends CoreOutput {
  @Field(type => [City], { nullable: true })
  readonly cities?: City[]
}
