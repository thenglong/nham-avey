import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { DecodedIdToken } from "firebase-admin/auth"
import { GraphqlAuthUser } from "src/auth/graphql-auth-user.decorator"
import { Roles } from "src/auth/role.decorator"
import {
  AdminCreateRestaurantInput,
  AdminUpdateRestaurantInput,
  CreateRestaurantOutput,
  DeleteRestaurantOutput,
  MyRestaurantOutput,
  PaginatedRestaurantsOutput,
  PaginationRestaurantsArgs,
  RestaurantArgs,
  RestaurantOutput,
  UpdateRestaurantOutput,
  VendorCreateRestaurantInput,
  VendorUpdateRestaurantInput,
} from "src/restaurants/dtos"
import { RestaurantService } from "src/restaurants/restaurants.service"
import { UserRole } from "src/users/entities/user.entity"

@Resolver()
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(returns => CreateRestaurantOutput)
  @Roles(UserRole.Vendor)
  async vendorCreateRestaurant(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args("input") input: VendorCreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    return await this.restaurantService.createRestaurantByVendor(decodedIdToken.uid, input)
  }

  @Mutation(returns => CreateRestaurantOutput)
  @Roles(UserRole.Admin)
  async adminCreateRestaurant(
    @GraphqlAuthUser() admin: DecodedIdToken,
    @Args("input") input: AdminCreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    return await this.restaurantService.createRestaurantByAdmin(admin, input)
  }

  @Query(returns => PaginatedRestaurantsOutput)
  @Roles(UserRole.Vendor)
  getMyRestaurants(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args() args: PaginationRestaurantsArgs,
  ): Promise<PaginatedRestaurantsOutput> {
    return this.restaurantService.getRestaurantsByVendor(decodedIdToken.uid, args)
  }

  @Query(returns => MyRestaurantOutput)
  @Roles(UserRole.Vendor)
  getMyRestaurantById(@GraphqlAuthUser() decodedIdToken: DecodedIdToken, @Args() args: RestaurantArgs): Promise<MyRestaurantOutput> {
    return this.restaurantService.findRestaurantByIdAndVendorId(decodedIdToken.uid, args.restaurantId)
  }

  @Query(returns => PaginatedRestaurantsOutput)
  @Roles(UserRole.Admin)
  adminGetRestaurants(@Args() args: PaginationRestaurantsArgs): Promise<PaginatedRestaurantsOutput> {
    return this.restaurantService.getRestaurantsByAdmin(args)
  }

  @Mutation(returns => UpdateRestaurantOutput)
  @Roles(UserRole.Vendor)
  vendorUpdateRestaurant(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args("input") input: VendorUpdateRestaurantInput,
  ): Promise<UpdateRestaurantOutput> {
    return this.restaurantService.updateRestaurantByVendor(decodedIdToken.uid, input)
  }

  @Mutation(returns => UpdateRestaurantOutput)
  @Roles(UserRole.Admin)
  adminUpdateRestaurant(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args("input") input: AdminUpdateRestaurantInput,
  ): Promise<UpdateRestaurantOutput> {
    return this.restaurantService.updateRestaurantByAdmin(input)
  }

  @Mutation(returns => DeleteRestaurantOutput)
  @Roles(UserRole.Vendor, UserRole.Admin)
  deleteRestaurant(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args() { restaurantId }: RestaurantArgs,
  ): Promise<DeleteRestaurantOutput> {
    return this.restaurantService.deleteRestaurant(decodedIdToken, restaurantId)
  }

  @Query(returns => PaginatedRestaurantsOutput)
  pubicGetRestaurants(@Args() args: PaginationRestaurantsArgs): Promise<PaginatedRestaurantsOutput> {
    return this.restaurantService.getRestaurantsByPublic(args)
  }

  @Query(returns => RestaurantOutput)
  publicGetRestaurantById(@Args() { restaurantId }: RestaurantArgs): Promise<RestaurantOutput> {
    return this.restaurantService.findRestaurantById(restaurantId)
  }
}
