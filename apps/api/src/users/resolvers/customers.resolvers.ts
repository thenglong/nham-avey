import { Args, Mutation, Resolver } from "@nestjs/graphql"
import { GraphqlAuthUser } from "src/auth/graphql-auth-user.decorator"
import { Roles } from "src/auth/role.decorator"
import { User, UserRole } from "src/users/entities/user.entity"
import { SignUpAccountInput, SignUpAccountOutput, UpdateProfileInput, UpdateProfileOutput } from "src/users/users.dto"
import { UserService } from "src/users/users.service"

@Resolver()
export class CustomersResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => SignUpAccountOutput)
  async signUpCustomer(@Args("input") input: SignUpAccountInput): Promise<SignUpAccountOutput> {
    return this.userService.signUpCustomer(input)
  }

  @Roles(UserRole.Customer)
  @Mutation(() => UpdateProfileOutput)
  async updateMeAsCustomer(@GraphqlAuthUser() authUser: User, @Args("input") input: UpdateProfileInput): Promise<UpdateProfileOutput> {
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
