import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { DecodedIdToken } from "firebase-admin/auth"
import { GraphqlAuthGuard } from "src/auth/graphql-auth-guard.service"
import { GraphqlAuthUser } from "src/auth/graphql-auth-user.decorator"
import { EditProfileInput, EditProfileOutput } from "src/users/dtos/edit-profile.dto"
import { User } from "src/users/entities/user.entity"
import { UserService } from "src/users/users.service"

@Resolver(() => User)
export class CommonUsersResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(GraphqlAuthGuard)
  getMe(@GraphqlAuthUser() authUser: DecodedIdToken) {
    return authUser
  }

  @Mutation(() => EditProfileOutput)
  async editProfile(@GraphqlAuthUser() authUser: User, @Args("input") editProfileInput: EditProfileInput): Promise<EditProfileOutput> {
    try {
      await this.userService.editProfile(authUser.id, editProfileInput)
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
