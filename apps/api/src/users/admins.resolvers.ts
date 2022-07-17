import { Args, Mutation, Resolver } from "@nestjs/graphql"
import { Roles } from "src/auth/role.decorator"
import { CreateAccountInput, CreateAccountOutput } from "src/users/dtos/create-account.dto"
import { User, UserRole } from "src/users/entities/user.entity"
import { UserService } from "src/users/users.service"

@Resolver(() => User)
export class AdminsResolver {
  constructor(private readonly UserService: UserService) {}

  @Roles(UserRole.Admin)
  @Mutation(() => CreateAccountOutput)
  async createAdmin(@Args("input") createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
    return this.UserService.createAdmin(createAccountInput)
  }
}
