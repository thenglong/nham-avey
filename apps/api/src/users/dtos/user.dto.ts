import { ArgsType, Field, ObjectType } from "@nestjs/graphql"
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
  users?: User[]
}
