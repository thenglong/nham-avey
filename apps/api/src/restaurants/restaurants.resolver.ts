import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { DecodedIdToken } from "firebase-admin/auth"
import { GraphqlAuthUser } from "src/auth/graphql-auth-user.decorator"
import { Roles } from "src/auth/role.decorator"
import { IdArg } from "src/common/dtos/id.dto"
import { CoreOutput } from "src/common/dtos/output.dto"
import { PaginationWithSearchArgs } from "src/common/dtos/pagination.dto"
import { SlugArg } from "src/common/dtos/slug.dto"
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
import { AllRestaurantsSlugArgs, AllRestaurantsSlugOutput } from "src/restaurants/dtos/all-restaurants-slug.dto"
import { RestaurantService } from "src/restaurants/restaurants.service"
import { UserRole } from "src/users/entities/user.entity"

@Resolver()
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Query(returns => AllRestaurantsSlugOutput)
  allRestaurantsSlug(@Args() args: AllRestaurantsSlugArgs): Promise<AllRestaurantsSlugOutput> {
    return this.restaurantService.findAllRestaurantsSlug(args)
  }

  @Query(returns => PaginatedRestaurantsOutput)
  restaurants(@Args() args: PaginationWithSearchArgs): Promise<PaginatedRestaurantsOutput> {
    return this.restaurantService.findRestaurants(args)
  }

  @Query(returns => RestaurantOutput)
  restaurant(@Args() arg: IdArg): Promise<RestaurantOutput> {
    return this.restaurantService.findRestaurantById(arg.id)
  }

  @Query(returns => RestaurantOutput)
  restaurantBySlug(@Args() arg: SlugArg): Promise<RestaurantOutput> {
    return this.restaurantService.findRestaurantBySlug(arg.slug)
  }

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
    return this.restaurantService.findRestaurantsByVendor(decodedIdToken.uid, args)
  }

  @Query(returns => RestaurantOutput)
  @Roles(UserRole.Vendor)
  myRestaurant(@GraphqlAuthUser() decodedIdToken: DecodedIdToken, @Args() arg: IdArg): Promise<RestaurantOutput> {
    return this.restaurantService.findRestaurantByIdAndVendorId(decodedIdToken.uid, arg.id)
  }

  @Query(returns => PaginatedRestaurantsOutput)
  @Roles(UserRole.Admin)
  adminGetRestaurants(@Args() args: PaginationWithSearchArgs): Promise<PaginatedRestaurantsOutput> {
    return this.restaurantService.findRestaurantsByAdmin(args)
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
}
