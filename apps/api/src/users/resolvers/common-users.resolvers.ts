import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { DecodedIdToken } from "firebase-admin/auth"
import { GraphqlAuthGuard } from "src/auth/graphql-auth-guard.service"
import { GraphqlAuthUser } from "src/auth/graphql-auth-user.decorator"
import { Roles } from "src/auth/role.decorator"
import { User, UserRole } from "src/users/entities/user.entity"
import { UpdateProfileInput, UpdateProfileOutput } from "src/users/users.dto"
import { UserService } from "src/users/users.service"

@Resolver(() => User)
export class CommonUsersResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(GraphqlAuthGuard)
  getMe(@GraphqlAuthUser() authUser: DecodedIdToken): Promise<User | null> {
    return this.userService.findUserById(authUser.uid)
  }

  @Roles(UserRole.Admin, UserRole.Vendor, UserRole.Driver, UserRole.Customer)
  @Mutation(() => UpdateProfileOutput)
  async updateMe(@GraphqlAuthUser() authUser: User, @Args("input") input: UpdateProfileInput): Promise<UpdateProfileOutput> {
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
}
