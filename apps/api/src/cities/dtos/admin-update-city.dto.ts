import { Field, InputType, Int, ObjectType, PartialType, PickType } from "@nestjs/graphql"
import { City } from "src/cities/city.entity"
import { CoreOutput } from "src/common/dtos/output.dto"

@InputType()
export class AdminUpdateCityInput extends PartialType(PickType(City, ["name", "nameInKhmer"])) {
  @Field(type => Int)
  readonly cityId: number
}

@ObjectType()
export class AdminUpdateCityOutput extends CoreOutput {
  @Field(type => City, { nullable: true })
  city?: City
}
