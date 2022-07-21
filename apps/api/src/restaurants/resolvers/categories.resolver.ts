import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql"
import { DecodedIdToken } from "firebase-admin/auth"
import { GraphqlAuthUser } from "src/auth/graphql-auth-user.decorator"
import { Roles } from "src/auth/role.decorator"
import { DeleteCategoryArgs, DeleteCategoryOutput } from "src/restaurants/dtos"
import {
  AllCategoriesOutput,
  PaginatedCategoryRestaurantOutput,
  PaginationCategoryRestaurantArgs,
} from "src/restaurants/dtos/categories.dto"
import { Category } from "src/restaurants/entities/category.entity"
import { RestaurantService } from "src/restaurants/restaurants.service"
import { UserRole } from "src/users/entities/user.entity"

@Resolver(of => Category)
export class CategoryResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @ResolveField(returns => Int)
  restaurantCount(@Parent() category: Category): Promise<number> {
    return this.restaurantService.countRestaurantsByCategory(category)
  }

  @Query(returns => AllCategoriesOutput)
  allCategories(): Promise<AllCategoriesOutput> {
    return this.restaurantService.allCategories()
  }

  @Query(returns => PaginatedCategoryRestaurantOutput)
  categoryRestaurantBySlug(@Args() args: PaginationCategoryRestaurantArgs): Promise<PaginatedCategoryRestaurantOutput> {
    return this.restaurantService.findRestaurantsByCategorySlug(args)
  }

  @Mutation(returns => DeleteCategoryOutput)
  @Roles(UserRole.Admin)
  deleteCategory(@GraphqlAuthUser() decodedIdToken: DecodedIdToken, @Args() args: DeleteCategoryArgs): Promise<DeleteCategoryOutput> {
    return this.restaurantService.deleteCategory(decodedIdToken.uid, args)
  }
}
