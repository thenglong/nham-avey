import { Args, Mutation, Resolver } from "@nestjs/graphql"
import { SignUpAccountInput, SignUpAccountOutput } from "src/users/users.dto"
import { UserService } from "src/users/users.service"

@Resolver()
export class CustomerResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(returns => SignUpAccountOutput)
  async customerSignUp(@Args("input") input: SignUpAccountInput): Promise<SignUpAccountOutput> {
    return this.userService.signUpCustomer(input)
  }
}
