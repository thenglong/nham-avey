import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { DecodedIdToken } from "firebase-admin/auth"
import { GraphqlAuthUser } from "src/auth/graphql-auth-user.decorator"
import { Roles } from "src/auth/role.decorator"
import { AdminCreateRestaurantInput, CreateRestaurantOutput, VendorCreateRestaurantInput } from "src/restaurants/dtos/create-restaurant.dto"
import { DeleteRestaurantOutput } from "src/restaurants/dtos/delete-restaurant.dto"
import { AdminUpdateRestaurantInput, UpdateRestaurantOutput, VendorUpdateRestaurantInput } from "src/restaurants/dtos/edit.restaurant.dto"
import { MyRestaurantOutput } from "src/restaurants/dtos/my-restaurant"
import { PaginatedRestaurantsOutput } from "src/restaurants/dtos/my-restaurants.dto"
import { RestaurantArgs, RestaurantOutput } from "src/restaurants/dtos/restaurant.dto"
import { PaginationRestaurantsArgs } from "src/restaurants/dtos/restaurants.dto"
import { RestaurantService } from "src/restaurants/restaurants.service"
import { UserRole } from "src/users/entities/user.entity"

@Resolver()
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(() => CreateRestaurantOutput)
  @Roles(UserRole.Vendor)
  async vendorCreateRestaurant(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args("input") input: VendorCreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    return await this.restaurantService.createRestaurantByVendor(decodedIdToken.uid, input)
  }

  @Mutation(() => CreateRestaurantOutput)
  @Roles(UserRole.Admin)
  async adminCreateRestaurant(
    @GraphqlAuthUser() admin: DecodedIdToken,
    @Args("input") input: AdminCreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    return await this.restaurantService.createRestaurantByAdmin(admin, input)
  }

  @Query(() => PaginatedRestaurantsOutput)
  @Roles(UserRole.Vendor)
  myRestaurants(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args() args: PaginationRestaurantsArgs,
  ): Promise<PaginatedRestaurantsOutput> {
    return this.restaurantService.getRestaurantsByVendor(decodedIdToken.uid, args)
  }

  @Query(() => MyRestaurantOutput)
  @Roles(UserRole.Vendor)
  myRestaurantById(@GraphqlAuthUser() decodedIdToken: DecodedIdToken, @Args() args: RestaurantArgs): Promise<MyRestaurantOutput> {
    return this.restaurantService.findRestaurantByIdAndVendorId(decodedIdToken.uid, args.restaurantId)
  }

  @Query(() => PaginatedRestaurantsOutput)
  @Roles(UserRole.Admin)
  adminGetRestaurants(@Args() args: PaginationRestaurantsArgs): Promise<PaginatedRestaurantsOutput> {
    return this.restaurantService.getRestaurantsByAdmin(args)
  }

  @Mutation(() => UpdateRestaurantOutput)
  @Roles(UserRole.Vendor)
  vendorUpdateRestaurant(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args("input") input: VendorUpdateRestaurantInput,
  ): Promise<UpdateRestaurantOutput> {
    return this.restaurantService.updateRestaurantByVendor(decodedIdToken.uid, input)
  }

  @Mutation(() => UpdateRestaurantOutput)
  @Roles(UserRole.Admin)
  adminUpdateRestaurant(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args("input") input: AdminUpdateRestaurantInput,
  ): Promise<UpdateRestaurantOutput> {
    return this.restaurantService.updateRestaurantByAdmin(input)
  }

  @Mutation(() => DeleteRestaurantOutput)
  @Roles(UserRole.Vendor, UserRole.Admin)
  deleteRestaurant(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args() { restaurantId }: RestaurantArgs,
  ): Promise<DeleteRestaurantOutput> {
    return this.restaurantService.deleteRestaurant(decodedIdToken, restaurantId)
  }

  @Query(() => PaginatedRestaurantsOutput)
  pubicGetRestaurants(@Args() args: PaginationRestaurantsArgs): Promise<PaginatedRestaurantsOutput> {
    return this.restaurantService.getRestaurantsByPublic(args)
  }

  @Query(() => RestaurantOutput)
  publicGetRestaurantById(@Args() { restaurantId }: RestaurantArgs): Promise<RestaurantOutput> {
    return this.restaurantService.findRestaurantById(restaurantId)
  }
}
