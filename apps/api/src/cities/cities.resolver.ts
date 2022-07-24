import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql"
import { DecodedIdToken } from "firebase-admin/auth"
import { GraphqlAuthUser } from "src/auth/graphql-auth-user.decorator"
import { Roles } from "src/auth/role.decorator"
import { CityService } from "src/cities/cities.service"
import { City } from "src/cities/city.entity"
import {
  PaginationCitiesOutput,
  AdminCreateCityOutput,
  AdminCreateCityInput,
  AdminUpdateCityOutput,
  AllCitiesOutput,
  AdminUpdateCityInput,
} from "src/cities/dtos"
import { IdArg } from "src/common/dtos/id.dto"
import { CoreOutput } from "src/common/dtos/output.dto"
import { PaginationWithSearchArgs } from "src/common/dtos/pagination.dto"
import { UserRole } from "src/users/entities/user.entity"

@Resolver(of => City)
export class CityResolver {
  constructor(private readonly cityService: CityService) {}

  @ResolveField(returns => Int)
  restaurantCount(@Parent() city: City): Promise<number> {
    return this.cityService.countRestaurantsByCity(city)
  }

  @Query(returns => AllCitiesOutput)
  allCities(): Promise<AllCitiesOutput> {
    return this.cityService.getAllCities()
  }

  @Query(returns => PaginationCitiesOutput)
  cities(@Args() args: PaginationWithSearchArgs): Promise<PaginationCitiesOutput> {
    return this.cityService.getCities(args)
  }

  @Mutation(returns => CoreOutput)
  @Roles(UserRole.Admin)
  adminDeleteCity(@GraphqlAuthUser() decodedIdToken: DecodedIdToken, @Args() arg: IdArg): Promise<CoreOutput> {
    return this.cityService.deleteCityByAdmin(decodedIdToken.uid, arg.id)
  }
  @Mutation(returns => AdminCreateCityOutput)
  @Roles(UserRole.Admin)
  adminCreateCity(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args("input") input: AdminCreateCityInput,
  ): Promise<AdminCreateCityOutput> {
    return this.cityService.createCityByAdmin(decodedIdToken.uid, input)
  }

  @Mutation(returns => AdminUpdateCityOutput)
  @Roles(UserRole.Admin)
  adminUpdateCity(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args("input") input: AdminUpdateCityInput,
  ): Promise<AdminUpdateCityOutput> {
    return this.cityService.updateCityByAdmin(decodedIdToken.uid, input)
  }
}
