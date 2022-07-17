import { UseGuards } from "@nestjs/common"
import { Query, Resolver } from "@nestjs/graphql"
import { DecodedIdToken } from "firebase-admin/auth"
import { GraphqlAuthGuard } from "src/auth/graphql-auth-guard.service"
import { GraphqlAuthUser } from "src/auth/graphql-auth-user.decorator"
import { User } from "src/users/entities/user.entity"
import { UserService } from "src/users/users.service"

@Resolver(() => User)
export class CommonUsersResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(GraphqlAuthGuard)
  getMe(@GraphqlAuthUser() authUser: DecodedIdToken): Promise<User | null> {
    return this.userService.findUserById(authUser.uid)
  }
}
