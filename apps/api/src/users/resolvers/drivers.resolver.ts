import { Args, Mutation, Resolver } from "@nestjs/graphql"
import { SignUpAccountInput, SignUpAccountOutput } from "src/users/users.dto"
import { UserService } from "src/users/users.service"

@Resolver()
export class DriverResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(returns => SignUpAccountOutput)
  async driverSignUp(@Args("input") input: SignUpAccountInput): Promise<SignUpAccountOutput> {
    return this.userService.signUpDriver(input)
  }
}
