import { ArgsType, Field, ObjectType } from "@nestjs/graphql"
import { IsEmail, MinLength } from "class-validator"
import { CoreOutput } from "src/common/dtos/output.dto"
import { User } from "src/users/entities/user.entity"
import { Column } from "typeorm"

@ArgsType()
export class CreateAdminArgs {
  @Field(type => String)
  @MinLength(8)
  password: string

  @Column({ unique: true })
  @Field(type => String)
  @IsEmail()
  email: string
}

@ObjectType()
export class CreateAdminOutput extends CoreOutput {
  @Field(type => User, { nullable: true })
  user?: User
}
