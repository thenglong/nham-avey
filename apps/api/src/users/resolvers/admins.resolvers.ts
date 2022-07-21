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
export class AdminsResolver {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRole.Admin)
  @Mutation(() => CreateAccountOutput)
  async createAdmin(@Args("input") input: CreateAccountInput): Promise<CreateAccountOutput> {
    return this.userService.createAdmin(input)
  }

  @Roles(UserRole.Admin)
  @Mutation(() => DeleteAccountOutput)
  async deleteUser(@Args() { userId }: UserArgs): Promise<DeleteAccountOutput> {
    return this.userService.deleteUser(userId)
  }

  @Roles(UserRole.Admin)
  @Mutation(() => DeleteAccountOutput)
  async updateUser(@Args("input") input: AdminUpdateUserInput): Promise<AdminUpdateUserOutput> {
    return this.userService.updateUserByAdmin(input)
  }

  @Query(() => PaginatedUsersOutput)
  @Roles(UserRole.Admin)
  adminGetUsers(@Args() args: PaginationUserArgs): Promise<PaginatedUsersOutput> {
    return this.userService.getUsersByAdmin(args)
  }
}
