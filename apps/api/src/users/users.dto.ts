import { ArgsType, Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql"
import { MinLength } from "class-validator"
import { CoreOutput } from "src/common/dtos/output.dto"
import { PaginationOutput, PaginationWithSearchArgs } from "src/common/dtos/pagination.dto"
import { User, UserRole } from "src/users/entities/user.entity"

@ArgsType()
export class PaginationUserArgs extends PaginationWithSearchArgs {
  @Field(() => UserRole, { nullable: true })
  role: UserRole | null
}

@ObjectType()
export class PaginatedUsersOutput extends PaginationOutput {
  @Field(type => [User], { nullable: true })
  data?: User[]
}

@InputType()
export class CreateAccountInput extends PickType(User, ["email", "firstName", "lastName", "photoURL"]) {}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {
  @Field(type => User, { nullable: true })
  user?: User
}

@InputType()
export class SignUpAccountInput extends CreateAccountInput {
  @Field(type => String)
  password: string
}

@ObjectType()
export class SignUpAccountOutput extends CreateAccountOutput {
  @Field(type => String, { nullable: true })
  signInToken?: string
}

@ObjectType()
export class DeleteAccountOutput extends CoreOutput {}

@ObjectType()
export class UpdateProfileOutput extends CoreOutput {}

@InputType()
export class UpdateProfileInput extends PartialType(PickType(User, ["email", "firstName", "lastName", "photoURL"])) {
  @Field(type => String)
  @MinLength(8)
  password: string
}

@ObjectType()
export class UserProfileOutput extends CoreOutput {
  @Field(type => User, { nullable: true })
  user?: User
}

@InputType()
export class AdminUpdateUserInput extends PartialType(
  PickType(User, ["email", "firstName", "lastName", "photoURL", "roles", "isVerified"]),
) {
  @Field(type => String)
  userId: string
}

@ObjectType()
export class AdminUpdateUserOutput extends CoreOutput {}

@ArgsType()
export class UserArgs {
  @Field(type => String)
  userId: string
}
