import { Args, Mutation, Resolver } from "@nestjs/graphql"
import { GraphqlAuthUser } from "src/auth/graphql-auth-user.decorator"
import { Roles } from "src/auth/role.decorator"
import { CreateAccountInput, CreateAccountOutput } from "src/users/dtos/create-account.dto"
import { UpdateProfileInput, UpdateProfileOutput } from "src/users/dtos/edit-profile.dto"
import { User, UserRole } from "src/users/entities/user.entity"
import { UserService } from "src/users/users.service"

@Resolver()
export class AdminsResolver {
  constructor(private readonly UserService: UserService) {}

  @Roles(UserRole.Admin)
  @Mutation(() => CreateAccountOutput)
  async createAdmin(@Args("input") createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
    return this.UserService.createAdmin(createAccountInput)
  }

  @Roles(UserRole.Admin)
  @Mutation(() => UpdateProfileOutput)
  async updateMeAsAdmin(
    @GraphqlAuthUser() authUser: User,
    @Args("input") updateProfileInput: UpdateProfileInput,
  ): Promise<UpdateProfileOutput> {
    try {
      await this.UserService.editProfile(authUser.id, updateProfileInput)
      return {
        ok: true,
      }
    } catch (error) {
      return {
        ok: false,
        error,
      }
    }
  }
}
