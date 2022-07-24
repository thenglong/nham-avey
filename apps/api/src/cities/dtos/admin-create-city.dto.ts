import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql"
import { City } from "src/cities/city.entity"
import { CoreOutput } from "src/common/dtos/output.dto"

@InputType()
export class AdminCreateCityInput extends PickType(City, ["name", "nameInKhmer"]) {}

@ObjectType()
export class AdminCreateCityOutput extends CoreOutput {
  @Field(type => City, { nullable: true })
  city?: City
}
