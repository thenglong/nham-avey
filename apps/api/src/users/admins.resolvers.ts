import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { GraphqlAuthUser } from "src/auth/graphql-auth-user.decorator"
import { Roles } from "src/auth/role.decorator"
import { CreateAccountInput, CreateAccountOutput } from "src/users/dtos/create-account.dto"
import { UpdateProfileInput, UpdateProfileOutput } from "src/users/dtos/edit-profile.dto"
import { PaginatedUsersOutput, PaginationUserArgs } from "src/users/dtos/user.dto"
import { User, UserRole } from "src/users/entities/user.entity"
import { UserService } from "src/users/users.service"

@Resolver()
export class AdminsResolver {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRole.Admin)
  @Mutation(() => CreateAccountOutput)
  async createAdmin(@Args("input") input: CreateAccountInput): Promise<CreateAccountOutput> {
    return this.userService.createAdmin(input)
  }

  @Roles(UserRole.Admin)
  @Mutation(() => UpdateProfileOutput)
  async updateMeAsAdmin(@GraphqlAuthUser() authUser: User, @Args("input") input: UpdateProfileInput): Promise<UpdateProfileOutput> {
    try {
      await this.userService.editProfile(authUser.id, input)
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

  @Query(() => PaginatedUsersOutput)
  @Roles(UserRole.Admin)
  adminGetUsers(@Args() args: PaginationUserArgs): Promise<PaginatedUsersOutput> {
    return this.userService.getUsersByAdmin(args)
  }
}
