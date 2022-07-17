import { Args, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql"
import { AllCategoriesOutput } from "src/restaurants/dtos/all-categories.dto"
import { CategoryInput, CategoryOutput } from "src/restaurants/dtos/category.dto"
import { Category } from "src/restaurants/entities/category.entity"
import { RestaurantService } from "src/restaurants/restaurants.service"

@Resolver(of => Category)
export class CategoryResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @ResolveField(returns => Int)
  restaurantCount(@Parent() category: Category): Promise<number> {
    return this.restaurantService.countRestaurants(category)
  }

  @Query(returns => AllCategoriesOutput)
  allCategories(): Promise<AllCategoriesOutput> {
    return this.restaurantService.allCategories()
  }

  @Query(() => CategoryOutput)
  category(@Args() categoryInput: CategoryInput): Promise<CategoryOutput> {
    return this.restaurantService.findCategoryBySlug(categoryInput)
  }
}
