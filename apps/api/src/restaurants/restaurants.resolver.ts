import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { DecodedIdToken } from "firebase-admin/auth"
import { GraphqlAuthUser } from "src/auth/graphql-auth-user.decorator"
import { Roles } from "src/auth/role.decorator"
import { IdArg } from "src/common/dtos/id.dto"
import { CoreOutput } from "src/common/dtos/output.dto"
import { PaginationWithSearchArgs } from "src/common/dtos/pagination.dto"
import {
  AdminCreateRestaurantInput,
  AdminUpdateRestaurantInput,
  PaginatedCategoryRestaurantsOutput,
  PaginatedCityRestaurantsOutput,
  PaginatedRestaurantsOutput,
  PaginationCategoryRestaurantsArgs,
  PaginationCityRestaurantsArgs,
  RestaurantOutput,
  VendorCreateRestaurantInput,
  VendorUpdateRestaurantInput,
} from "src/restaurants/dtos"
import { RestaurantService } from "src/restaurants/restaurants.service"
import { UserRole } from "src/users/entities/user.entity"

@Resolver()
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(returns => RestaurantOutput)
  @Roles(UserRole.Vendor)
  async vendorCreateRestaurant(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args("input") input: VendorCreateRestaurantInput,
  ): Promise<RestaurantOutput> {
    return await this.restaurantService.createRestaurantByVendor(decodedIdToken.uid, input)
  }

  @Mutation(returns => RestaurantOutput)
  @Roles(UserRole.Admin)
  async adminCreateRestaurant(
    @GraphqlAuthUser() admin: DecodedIdToken,
    @Args("input") input: AdminCreateRestaurantInput,
  ): Promise<RestaurantOutput> {
    return await this.restaurantService.createRestaurantByAdmin(admin, input)
  }

  @Query(returns => PaginatedRestaurantsOutput)
  @Roles(UserRole.Vendor)
  myRestaurants(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args() args: PaginationWithSearchArgs,
  ): Promise<PaginatedRestaurantsOutput> {
    return this.restaurantService.getRestaurantsByVendor(decodedIdToken.uid, args)
  }

  @Query(returns => RestaurantOutput)
  @Roles(UserRole.Vendor)
  myRestaurantById(@GraphqlAuthUser() decodedIdToken: DecodedIdToken, @Args() arg: IdArg): Promise<RestaurantOutput> {
    return this.restaurantService.getRestaurantByIdAndVendorId(decodedIdToken.uid, arg.id)
  }

  @Query(returns => PaginatedRestaurantsOutput)
  @Roles(UserRole.Admin)
  adminGetRestaurants(@Args() args: PaginationWithSearchArgs): Promise<PaginatedRestaurantsOutput> {
    return this.restaurantService.getRestaurantsByAdmin(args)
  }

  @Query(returns => PaginatedCategoryRestaurantsOutput)
  restaurantsByCategorySlug(@Args() args: PaginationCategoryRestaurantsArgs): Promise<PaginatedCategoryRestaurantsOutput> {
    return this.restaurantService.findRestaurantsByCategorySlug(args)
  }

  @Query(returns => PaginatedCityRestaurantsOutput)
  restaurantsByCitySlug(@Args() args: PaginationCityRestaurantsArgs): Promise<PaginatedCityRestaurantsOutput> {
    return this.restaurantService.findRestaurantsByCitySlug(args)
  }

  @Mutation(returns => RestaurantOutput)
  @Roles(UserRole.Vendor)
  vendorUpdateRestaurant(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args("input") input: VendorUpdateRestaurantInput,
  ): Promise<RestaurantOutput> {
    return this.restaurantService.updateRestaurantByVendor(decodedIdToken.uid, input)
  }

  @Mutation(returns => RestaurantOutput)
  @Roles(UserRole.Admin)
  adminUpdateRestaurant(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args("input") input: AdminUpdateRestaurantInput,
  ): Promise<RestaurantOutput> {
    return this.restaurantService.updateRestaurantByAdmin(input)
  }

  @Mutation(returns => CoreOutput)
  @Roles(UserRole.Vendor, UserRole.Admin)
  deleteRestaurant(@GraphqlAuthUser() decodedIdToken: DecodedIdToken, @Args() arg: IdArg): Promise<CoreOutput> {
    return this.restaurantService.deleteRestaurant(decodedIdToken, arg.id)
  }

  @Query(returns => PaginatedRestaurantsOutput)
  getRestaurants(@Args() args: PaginationWithSearchArgs): Promise<PaginatedRestaurantsOutput> {
    return this.restaurantService.getRestaurants(args)
  }

  @Query(returns => RestaurantOutput)
  getRestaurantById(@Args() arg: IdArg): Promise<RestaurantOutput> {
    return this.restaurantService.getRestaurantById(arg.id)
  }
}
