import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { GraphqlAuthGuard } from "src/auth/graphql-auth-guard.service"
import { GraphqlAuthUser } from "src/auth/graphql-auth-user.decorator"
import { SignUpAccountInput, SignUpAccountOutput } from "src/users/dtos/create-account.dto"
import { EditProfileInput, EditProfileOutput } from "src/users/dtos/edit-profile.dto"
import { UserProfileInput, UserProfileOutput } from "src/users/dtos/user-profile.dto"
import { User } from "src/users/entities/user.entity"
import { UserService } from "src/users/users.service"

@Resolver(() => User)
export class CustomersResolver {
  constructor(private readonly UserService: UserService) {}

  @Mutation(() => SignUpAccountOutput)
  async signUpCustomer(@Args("input") signUpAccountInput: SignUpAccountInput): Promise<SignUpAccountOutput> {
    return this.UserService.signUpCustomer(signUpAccountInput)
  }

  @Query(() => User)
  @UseGuards(GraphqlAuthGuard)
  getMe(@GraphqlAuthUser() authUser: User) {
    return authUser
  }

  @Query(() => UserProfileOutput)
  async userProfile(@Args() userProfileInput: UserProfileInput): Promise<UserProfileOutput> {
    return this.UserService.findById(userProfileInput.userId)
  }

  @Mutation(() => EditProfileOutput)
  async editProfile(@GraphqlAuthUser() authUser: User, @Args("input") editProfileInput: EditProfileInput): Promise<EditProfileOutput> {
    try {
      await this.UserService.editProfile(authUser.id, editProfileInput)
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
