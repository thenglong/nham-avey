import { Args, Mutation, Resolver } from "@nestjs/graphql"
import { SignUpAccountInput, SignUpAccountOutput } from "src/users/dtos/create-account.dto"
import { User } from "src/users/entities/user.entity"
import { UserService } from "src/users/users.service"

@Resolver(() => User)
export class VendorsResolver {
  constructor(private readonly UserService: UserService) {}

  @Mutation(() => SignUpAccountOutput)
  async signUpVendor(@Args("input") signUpAccountInput: SignUpAccountInput): Promise<SignUpAccountOutput> {
    return this.UserService.signUpVendor(signUpAccountInput)
  }
}
