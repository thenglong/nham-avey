import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { AuthUser } from "src/auth/auth-user.decorator"
import { AuthGuard } from "src/auth/auth.guard"
import {
  CreateAccountInput,
  CreateAccountOutput,
} from "src/users/dtos/create-account.dto"
import { EditProfileInput, EditProfileOutput } from "src/users/dtos/edit-profile.dto"
import { UserProfileInput, UserProfileOutput } from "src/users/dtos/user-profile.dto"
import { VerifyEmailInput, VerifyEmailOutput } from "src/users/dtos/verify-email.dto"
import { User } from "src/users/entities/user.entity"
import { UserService } from "src/users/users.service"

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly UserService: UserService) {}
  @Mutation(() => CreateAccountOutput)
  async createAccount(
    @Args("input") createAccountInput: CreateAccountInput
  ): Promise<CreateAccountOutput> {
    return this.UserService.createAccount(createAccountInput)
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser: User) {
    return authUser
  }

  @Query(() => UserProfileOutput)
  async userProfile(
    @Args() userProfileInput: UserProfileInput
  ): Promise<UserProfileOutput> {
    return this.UserService.findById(userProfileInput.userId)
  }

  @Mutation(() => EditProfileOutput)
  async editProfile(
    @AuthUser() authUser: User,
    @Args("input") editProfileInput: EditProfileInput
  ): Promise<EditProfileOutput> {
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

  @Mutation(() => VerifyEmailOutput)
  verifyEmail(@Args("input") { code }: VerifyEmailInput): Promise<VerifyEmailOutput> {
    return this.UserService.verifyEmail(code)
  }
}
