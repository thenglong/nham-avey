import { Field, InputType, ObjectType } from "@nestjs/graphql"
import { IsEmail, MinLength } from "class-validator"
import { CoreOutput } from "src/common/dtos/output.dto"
import { User } from "src/users/entities/user.entity"
import { Column } from "typeorm"

@InputType()
export class CreateAccountInput {
  @Field(type => String)
  @MinLength(8)
  password: string

  @Column({ unique: true })
  @Field(type => String)
  @IsEmail()
  email: string
}

@InputType()
export class SignUpAccountInput extends CreateAccountInput {}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {
  @Field(type => User, { nullable: true })
  user?: User
}

@ObjectType()
export class SignUpAccountOutput extends CreateAccountOutput {
  @Field(type => String, { nullable: true })
  signInToken?: string
}
