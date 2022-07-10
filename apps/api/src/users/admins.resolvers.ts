import { Args, Mutation, Resolver } from "@nestjs/graphql"
import { Roles } from "src/auth/role.decorator"
import { CreateAdminArgs, CreateAdminOutput } from "src/users/dtos/create-admin.dto"
import { User, UserRole } from "src/users/entities/user.entity"
import { UserService } from "src/users/users.service"

@Resolver(() => User)
export class AdminsResolver {
  constructor(private readonly UserService: UserService) {}

  @Roles(UserRole.Admin)
  @Mutation(() => CreateAdminOutput)
  async createAdmin(@Args() createAccountInput: CreateAdminArgs): Promise<CreateAdminOutput> {
    return this.UserService.createAdmin(createAccountInput)
  }
}
