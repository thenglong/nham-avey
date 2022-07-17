import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql"
import { MinLength } from "class-validator"
import { CoreOutput } from "src/common/dtos/output.dto"
import { User } from "src/users/entities/user.entity"

@ObjectType()
export class UpdateProfileOutput extends CoreOutput {}

@InputType()
export class UpdateProfileInput extends PartialType(PickType(User, ["email"])) {
  @Field(type => String)
  @MinLength(8)
  password: string
}
