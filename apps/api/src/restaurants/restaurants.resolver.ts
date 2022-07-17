import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { DecodedIdToken } from "firebase-admin/auth"
import { GraphqlAuthUser } from "src/auth/graphql-auth-user.decorator"
import { Roles } from "src/auth/role.decorator"
import {
  AdminCreateRestaurantByInput,
  CreateRestaurantOutput,
  VendorCreateRestaurantInput,
} from "src/restaurants/dtos/create-restaurant.dto"
import { DeleteRestaurantOutput } from "src/restaurants/dtos/delete-restaurant.dto"
import { UpdateRestaurantInput, UpdateRestaurantOutput } from "src/restaurants/dtos/edit.restaurant.dto"
import { MyRestaurantOutput } from "src/restaurants/dtos/my-restaurant"
import { PaginatedRestaurantsOutput } from "src/restaurants/dtos/my-restaurants.dto"
import { RestaurantArgs, RestaurantOutput } from "src/restaurants/dtos/restaurant.dto"
import { RestaurantsArgs } from "src/restaurants/dtos/restaurants.dto"
import { SearchRestaurantArgs, SearchRestaurantOutput } from "src/restaurants/dtos/search-restaurant.dto"
import { RestaurantService } from "src/restaurants/restaurants.service"
import { UserRole } from "src/users/entities/user.entity"

@Resolver()
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(() => CreateRestaurantOutput)
  @Roles(UserRole.Vendor)
  async vendorCreateRestaurant(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args("input") createRestaurantInput: VendorCreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    return await this.restaurantService.createRestaurant(decodedIdToken.uid, createRestaurantInput)
  }

  @Mutation(() => CreateRestaurantOutput)
  @Roles(UserRole.Admin)
  async adminCreateRestaurant(
    @GraphqlAuthUser() admin: DecodedIdToken,
    @Args("input") createRestaurantByAdminInput: AdminCreateRestaurantByInput,
  ): Promise<CreateRestaurantOutput> {
    return await this.restaurantService.createRestaurantByAdmin(admin, createRestaurantByAdminInput)
  }

  @Query(() => PaginatedRestaurantsOutput)
  @Roles(UserRole.Vendor)
  myRestaurants(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args() restaurantsArgs: RestaurantsArgs,
  ): Promise<PaginatedRestaurantsOutput> {
    return this.restaurantService.getRestaurantsByVendor(decodedIdToken.uid, restaurantsArgs)
  }

  @Query(() => MyRestaurantOutput)
  @Roles(UserRole.Vendor)
  myRestaurantById(@GraphqlAuthUser() decodedIdToken: DecodedIdToken, @Args() restaurantArgs: RestaurantArgs): Promise<MyRestaurantOutput> {
    return this.restaurantService.findRestaurantByIdAndVendorId(decodedIdToken.uid, restaurantArgs.restaurantId)
  }

  @Query(() => PaginatedRestaurantsOutput)
  @Roles(UserRole.Admin)
  adminGetRestaurants(@Args() restaurantsArgs: RestaurantsArgs): Promise<PaginatedRestaurantsOutput> {
    return this.restaurantService.getRestaurantsByAdmin(restaurantsArgs)
  }

  @Mutation(() => UpdateRestaurantOutput)
  @Roles(UserRole.Vendor)
  vendorUpdateRestaurant(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args("input") restaurantInput: UpdateRestaurantInput,
  ): Promise<UpdateRestaurantOutput> {
    return this.restaurantService.updateRestaurantByVendor(decodedIdToken.uid, restaurantInput)
  }

  @Mutation(() => UpdateRestaurantOutput)
  @Roles(UserRole.Admin)
  adminUpdateRestaurant(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args("input") restaurantInput: UpdateRestaurantInput,
  ): Promise<UpdateRestaurantOutput> {
    return this.restaurantService.updateRestaurant(restaurantInput)
  }

  @Mutation(() => DeleteRestaurantOutput)
  @Roles(UserRole.Vendor, UserRole.Admin)
  deleteRestaurant(@GraphqlAuthUser() decodedIdToken: DecodedIdToken, @Args("id") restaurantId: number): Promise<DeleteRestaurantOutput> {
    return this.restaurantService.deleteRestaurant(decodedIdToken, restaurantId)
  }

  @Query(() => PaginatedRestaurantsOutput)
  pubicGetRestaurants(@Args() restaurantsArgs: RestaurantsArgs): Promise<PaginatedRestaurantsOutput> {
    return this.restaurantService.getRestaurantsByPublic(restaurantsArgs)
  }

  @Query(() => RestaurantOutput)
  publicGetRestaurantById(@Args() restaurantArgs: RestaurantArgs): Promise<RestaurantOutput> {
    return this.restaurantService.findRestaurantById(restaurantArgs)
  }

  @Query(() => SearchRestaurantOutput)
  searchRestaurant(@Args() searchRestaurantArgs: SearchRestaurantArgs): Promise<SearchRestaurantOutput> {
    return this.restaurantService.searchRestaurantByName(searchRestaurantArgs)
  }
}
