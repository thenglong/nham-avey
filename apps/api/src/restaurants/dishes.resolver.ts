import { Args, Mutation, Resolver } from "@nestjs/graphql"
import { DecodedIdToken } from "firebase-admin/auth"
import { GraphqlAuthUser } from "src/auth/graphql-auth-user.decorator"
import { Roles } from "src/auth/role.decorator"
import {
  CreateDishInput,
  CreateDishOutput,
  DeleteDishInput,
  DeleteDishOutput,
  EditDishInput,
  EditDishOutput,
} from "src/restaurants/dtos/dishes.dto"
import { RestaurantService } from "src/restaurants/restaurants.service"
import { UserRole } from "src/users/entities/user.entity"

@Resolver()
export class DishResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(() => CreateDishOutput)
  @Roles(UserRole.Vendor)
  createDish(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args("input") createDishInput: CreateDishInput,
  ): Promise<CreateDishOutput> {
    return this.restaurantService.createDish(decodedIdToken.uid, createDishInput)
  }

  @Mutation(() => EditDishOutput)
  @Roles(UserRole.Vendor)
  editDish(@GraphqlAuthUser() decodedIdToken: DecodedIdToken, @Args("input") editDishInput: EditDishInput): Promise<EditDishOutput> {
    return this.restaurantService.editDish(decodedIdToken.uid, editDishInput)
  }

  @Mutation(() => DeleteDishOutput)
  @Roles(UserRole.Vendor)
  deleteDish(@GraphqlAuthUser() decodedIdToken: DecodedIdToken, @Args("input") deleteDishInput: DeleteDishInput): Promise<EditDishOutput> {
    return this.restaurantService.deleteDish(decodedIdToken.uid, deleteDishInput)
  }
}
