import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { AuthUser } from "src/auth/auth-user.decorator"
import { AuthGuard } from "src/auth/auth.guard"
import { CreateAccountInput, CreateAccountOutput } from "src/users/dtos/create-account.dto"
import { EditProfileInput, EditProfileOutput } from "src/users/dtos/edit-profile.dto"
import { UserProfileInput, UserProfileOutput } from "src/users/dtos/user-profile.dto"
import { User } from "src/users/entities/user.entity"
import { UserService } from "src/users/users.service"

@Resolver(() => User)
export class CustomersResolver {
  constructor(private readonly UserService: UserService) {}

  @Mutation(() => CreateAccountOutput)
  async signUp(@Args("input") createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
    return this.UserService.createCustomer(createAccountInput)
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  getMe(@AuthUser() authUser: User) {
    return authUser
  }

  @Query(() => UserProfileOutput)
  async userProfile(@Args() userProfileInput: UserProfileInput): Promise<UserProfileOutput> {
    return this.UserService.findById(userProfileInput.userId)
  }

  @Mutation(() => EditProfileOutput)
  async editProfile(@AuthUser() authUser: User, @Args("input") editProfileInput: EditProfileInput): Promise<EditProfileOutput> {
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
