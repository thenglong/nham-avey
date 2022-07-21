import { Args, Mutation, Resolver } from "@nestjs/graphql"
import { GraphqlAuthUser } from "src/auth/graphql-auth-user.decorator"
import { Roles } from "src/auth/role.decorator"
import { User, UserRole } from "src/users/entities/user.entity"
import { SignUpAccountInput, SignUpAccountOutput, UpdateProfileInput, UpdateProfileOutput } from "src/users/users.dto"
import { UserService } from "src/users/users.service"

@Resolver()
export class VendorsResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(returns => SignUpAccountOutput)
  async signUpVendor(@Args("input") input: SignUpAccountInput): Promise<SignUpAccountOutput> {
    return this.userService.signUpVendor(input)
  }

  @Roles(UserRole.Vendor)
  @Mutation(returns => UpdateProfileOutput)
  async updateMeAsVendor(@GraphqlAuthUser() authUser: User, @Args("input") input: UpdateProfileInput): Promise<UpdateProfileOutput> {
    try {
      await this.userService.updateProfile(authUser.id, input)
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
