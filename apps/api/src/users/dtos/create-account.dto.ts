import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql"
import { MinLength } from "class-validator"
import { CoreOutput } from "src/common/dtos/output.dto"
import { User } from "src/users/entities/user.entity"

@InputType()
export class CreateAccountInput extends PickType(User, ["email", "roles"]) {
  @Field(() => String)
  @MinLength(8)
  password: string
}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {
  @Field(type => Boolean, { nullable: true })
  user?: User

  @Field(type => String, { nullable: true })
  token?: string
}
