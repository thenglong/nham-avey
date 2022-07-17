import { Args, Mutation, Resolver } from "@nestjs/graphql"
import { GraphqlAuthUser } from "src/auth/graphql-auth-user.decorator"
import { Roles } from "src/auth/role.decorator"
import { SignUpAccountInput, SignUpAccountOutput } from "src/users/dtos/create-account.dto"
import { UpdateProfileInput, UpdateProfileOutput } from "src/users/dtos/edit-profile.dto"
import { User, UserRole } from "src/users/entities/user.entity"
import { UserService } from "src/users/users.service"

@Resolver()
export class VendorsResolver {
  constructor(private readonly UserService: UserService) {}

  @Mutation(() => SignUpAccountOutput)
  async signUpVendor(@Args("input") signUpAccountInput: SignUpAccountInput): Promise<SignUpAccountOutput> {
    return this.UserService.signUpVendor(signUpAccountInput)
  }

  @Roles(UserRole.Vendor)
  @Mutation(() => UpdateProfileOutput)
  async updateMeAsVendor(
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
