import { Args, Mutation, Resolver } from "@nestjs/graphql"
import { DecodedIdToken } from "firebase-admin/auth"
import { GraphqlAuthUser } from "src/auth/graphql-auth-user.decorator"
import { Roles } from "src/auth/role.decorator"
import {
  CreateDishInput,
  CreateDishOutput,
  DeleteDishArgs,
  DeleteDishOutput,
  UpdateDishInput,
  UpdateDishOutput,
} from "src/restaurants/dtos/dishes.dto"
import { RestaurantService } from "src/restaurants/restaurants.service"
import { UserRole } from "src/users/entities/user.entity"

@Resolver()
export class DishResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(() => CreateDishOutput)
  @Roles(UserRole.Vendor)
  vendorCreateDish(@GraphqlAuthUser() decodedIdToken: DecodedIdToken, @Args("input") input: CreateDishInput): Promise<CreateDishOutput> {
    return this.restaurantService.createDishByVendor(decodedIdToken.uid, input)
  }

  @Mutation(() => CreateDishOutput)
  @Roles(UserRole.Admin)
  adminCreateDish(@GraphqlAuthUser() decodedIdToken: DecodedIdToken, @Args("input") input: CreateDishInput): Promise<CreateDishOutput> {
    return this.restaurantService.createDishByAdmin(decodedIdToken.uid, input)
  }

  @Mutation(() => UpdateDishOutput)
  @Roles(UserRole.Vendor)
  vendorUpdateDish(@GraphqlAuthUser() decodedIdToken: DecodedIdToken, @Args("input") input: UpdateDishInput): Promise<UpdateDishOutput> {
    return this.restaurantService.updateDishByVendor(decodedIdToken.uid, input)
  }

  @Mutation(() => UpdateDishOutput)
  @Roles(UserRole.Admin)
  adminUpdateDish(@GraphqlAuthUser() decodedIdToken: DecodedIdToken, @Args("input") input: UpdateDishInput): Promise<UpdateDishOutput> {
    return this.restaurantService.updateDishByAdmin(decodedIdToken.uid, input)
  }

  @Mutation(() => DeleteDishOutput)
  @Roles(UserRole.Vendor)
  vendorDeleteDish(@GraphqlAuthUser() decodedIdToken: DecodedIdToken, @Args() args: DeleteDishArgs): Promise<DeleteDishOutput> {
    return this.restaurantService.deleteDishByVendor(decodedIdToken.uid, args)
  }

  @Mutation(() => DeleteDishOutput)
  @Roles(UserRole.Admin)
  adminDeleteDish(@GraphqlAuthUser() decodedIdToken: DecodedIdToken, @Args() args: DeleteDishArgs): Promise<DeleteDishOutput> {
    return this.restaurantService.deleteDishByAdmin(decodedIdToken.uid, args)
  }
}
