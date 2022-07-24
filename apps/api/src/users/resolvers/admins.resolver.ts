import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { Roles } from "src/auth/role.decorator"
import { UserRole } from "src/users/entities/user.entity"
import {
  AdminUpdateUserInput,
  AdminUpdateUserOutput,
  CreateAccountInput,
  CreateAccountOutput,
  DeleteAccountOutput,
  PaginatedUsersOutput,
  PaginationUserArgs,
  UserArgs,
} from "src/users/users.dto"
import { UserService } from "src/users/users.service"

@Resolver()
export class AdminResolver {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRole.Admin)
  @Mutation(returns => CreateAccountOutput)
  async adminCreateAdmin(@Args("input") input: CreateAccountInput): Promise<CreateAccountOutput> {
    return this.userService.createAdmin(input)
  }

  @Roles(UserRole.Admin)
  @Mutation(returns => DeleteAccountOutput)
  async adminDeleteUser(@Args() { userId }: UserArgs): Promise<DeleteAccountOutput> {
    return this.userService.deleteUser(userId)
  }

  @Roles(UserRole.Admin)
  @Mutation(returns => AdminUpdateUserOutput)
  async adminUpdateUser(@Args("input") input: AdminUpdateUserInput): Promise<AdminUpdateUserOutput> {
    return this.userService.updateUserByAdmin(input)
  }

  @Query(returns => PaginatedUsersOutput)
  @Roles(UserRole.Admin)
  adminGetUsers(@Args() args: PaginationUserArgs): Promise<PaginatedUsersOutput> {
    return this.userService.getUsersByAdmin(args)
  }
}
